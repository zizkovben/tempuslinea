// astrolabe-rings.js
// CHRONOS — Astrolabe Navigator, Phase 1-5 real build
// Concept: CHRONOS_ASTROLABE_CONCEPT_v3.md
// Depends on: data.js (CIVS, EPOCHS)
// Exposes: window.AstrolabeRings
//
// Ring math + SVG rendering + drag interaction, split from astrolabe-ui.js
// (which owns page wiring, ChronosUI integration, and the info panel)
// per the ~300-line soft limit and the split pattern already established
// by globe-ui.js / globe-ui-pins.js.

const AstrolabeRings = (() => {

  // ─── Geometry constants ───────────────────────────────────────────────────
  const CX = 320, CY = 320;
  const OUTER_R_OUT = 300, OUTER_R_IN = 252;   // epoch ring band
  const ZODIAC_R = 240;                        // thin static band, astrological context
  const MID_R_OUT   = 230, MID_R_IN   = 182;   // year ring band
  const INNER_R_OUT = 174, INNER_R_IN = 118;   // civ ring band
  const HUB_R = 104;

  // ─── Zoom — modest "look closer at the dial" range per v3 doc. Not a
  // semantic time-zoom (that's the middle ring's job) — pinch/wheel/buttons
  // all drive this same clamped value. ──────────────────────────────────
  const MIN_ZOOM = 0.85, MAX_ZOOM = 1.35;
  let zoom = 1;

  // ─── Ambient idle drift — mirrors the Living Atlas globe's existing
  // auto-rotate pattern so this feels familiar rather than novel. Pauses
  // instantly on any interaction. ───────────────────────────────────────
  let idleTimer = null, ambientRAF = null;
  const IDLE_DELAY_MS = 3500;

  // ─── Filtering tolerance — see Bible / v3 doc for why this is derived
  // locally rather than calling into TimelineEngine (no getGranularity()
  // exists there to call) ────────────────────────────────────────────────
  const TOLERANCE_DIVISIONS = 40;  // epoch span / this = base tolerance
  const MIN_TOLERANCE = 5;         // years — floor for dense modern epochs
  const MAX_TOLERANCE = 4000;      // years — ceiling, rarely actually hit
  const MAX_RING_CIVS = 14;        // cap on simultaneously-shown inner-ring items
  const EDGE_FADE_FLOOR = 0.15;    // civs never fully vanish at the tolerance edge

  const DEFAULT_EPOCH_INDEX = 13;  // "Classical Antiquity" — a populated, sensible start

  // ─── State ────────────────────────────────────────────────────────────────
  let svg = null;
  let outerRotation = 0;     // degrees, 0 = segment 0 centered at top
  let middleRotation = 0;    // degrees, 0-360, maps to position within epoch span
  let selectedEpochIdx = DEFAULT_EPOCH_INDEX;
  let selectedCivId = null;
  let onCivSelectCb = null;
  let onYearChangeCb = null;

  const EPOCH_ANGLE = 360 / EPOCHS.length;

  // ─── Angle / polar helpers ────────────────────────────────────────────────
  // angle=0 is straight up (12 o'clock), increasing clockwise — standard
  // dial/clock convention, matches "genuine astrolabe" framing better than
  // SVG's native 3-o'clock-zero convention.
  function polar(r, angleDeg) {
    const a = (angleDeg - 90) * Math.PI / 180;
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  }

  function normalizeAngle(a) {
    a = a % 360;
    return a < 0 ? a + 360 : a;
  }

  function arcPath(rOut, rIn, a1, a2) {
    const p1 = polar(rOut, a1), p2 = polar(rOut, a2);
    const p3 = polar(rIn, a2),  p4 = polar(rIn, a1);
    const large = (a2 - a1) % 360 > 180 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${large} 1 ${p2.x} ${p2.y} ` +
           `L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
  }

  function svgEl(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  // ─── Derived values ───────────────────────────────────────────────────────
  function currentEpoch() { return EPOCHS[selectedEpochIdx]; }

  function dialedYear() {
    const ep = currentEpoch();
    const span = ep.e - ep.s;
    return ep.s + (normalizeAngle(middleRotation) / 360) * span;
  }

  // Same conceptual solution as TimelineEngine's tickInterval() — tolerance
  // scales with the working span rather than being a flat number — just
  // re-derived locally since no reusable export exists to call into. See
  // header comment.
  function getTolerance() {
    const span = Math.abs(currentEpoch().e - currentEpoch().s);
    return Math.min(Math.max(span / TOLERANCE_DIVISIONS, MIN_TOLERANCE), MAX_TOLERANCE);
  }

  function getCandidateCivs() {
    const year = dialedYear();
    const tol  = getTolerance();
    const ep   = currentEpoch();
    const source = CIVS;
    const inWindow = source.filter(c =>
      c.e >= year - tol && c.s <= year + tol &&
      c.e >= ep.s && c.s <= ep.e   // stay relevant to the selected epoch band
    );
    inWindow.forEach(c => { c._dist = Math.abs((c.s + c.e) / 2 - year); });
    inWindow.sort((a, b) => a._dist - b._dist);
    return inWindow.slice(0, MAX_RING_CIVS).map(c => {
      const fade = 1 - Math.min(c._dist / tol, 1);
      return { civ: c, opacity: Math.max(fade, EDGE_FADE_FLOOR) };
    });
  }

  // ─── Rendering ────────────────────────────────────────────────────────────
  function render() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const zoomGroup = svgEl('g', {
      id: 'astrolabe-zoom-group',
      transform: `translate(${CX} ${CY}) scale(${zoom}) translate(${-CX} ${-CY})`
    });
    svg.appendChild(zoomGroup);
    const prevSvg = svg;
    svg = zoomGroup; // renderX() functions append to `svg` — temporarily retarget
    renderOuterRing();
    renderZodiacRing();
    renderMiddleRing();
    renderInnerRing();
    renderHub();
    svg = prevSvg;
    if (onYearChangeCb) onYearChangeCb(dialedYear(), currentEpoch());
  }

  // Static, non-interactive — shows astrological context for the dialed
  // year rather than adding a fourth thing to drag. Reuses the real
  // CELESTIAL_DATA zodiac ages (Phase 4) rather than inventing new ranges,
  // so it stays consistent with the Timeline/Globe overlays.
  function renderZodiacRing() {
    const g = svgEl('g', { id: 'ring-zodiac' });
    if (typeof CELESTIAL_DATA === 'undefined') { svg.appendChild(g); return; }

    const year = dialedYear();
    const active = CELESTIAL_DATA.getZodiacAge(year);
    const ages = CELESTIAL_DATA.getZodiacAgesInRange
      ? CELESTIAL_DATA.getZodiacAgesInRange(currentEpoch().s, currentEpoch().e)
      : [];

    g.appendChild(svgEl('circle', {
      cx: CX, cy: CY, r: ZODIAC_R, fill: 'none',
      stroke: 'var(--border-mid, rgba(255,255,255,0.1))', 'stroke-width': 14
    }));

    // Distribute whichever ages overlap the current epoch evenly around
    // the band — illustrative placement, not a literal calendar mapping,
    // same spirit as the outer ring's fixed epoch segments.
    const list = ages.length ? ages : (active ? [active] : []);
    list.forEach((age, i) => {
      const angle = (i / Math.max(list.length, 1)) * 360;
      const p = polar(ZODIAC_R, angle);
      const isActive = active && age.name === active.name;
      const t = svgEl('text', {
        x: p.x, y: p.y, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: isActive ? 'var(--gold, #c8a030)' : 'var(--text-dim, #667799)',
        'fill-opacity': isActive ? 1 : 0.55,
        'font-size': isActive ? 15 : 12,
        'font-family': 'var(--font-display, "Cinzel", serif)'
      });
      t.textContent = age.sym;
      g.appendChild(t);
    });

    svg.appendChild(g);
  }

  function renderOuterRing() {
    const g = svgEl('g', { id: 'ring-outer' });
    EPOCHS.forEach((ep, i) => {
      const a1 = i * EPOCH_ANGLE + outerRotation;
      const a2 = a1 + EPOCH_ANGLE;
      const active = i === selectedEpochIdx;
      const seg = svgEl('path', {
        d: arcPath(OUTER_R_OUT, OUTER_R_IN, a1, a2),
        fill: active ? 'var(--gold, #c8a030)' : (i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'),
        'fill-opacity': active ? 0.35 : 1,
        stroke: 'var(--border-mid, rgba(255,255,255,0.15))',
        'stroke-width': 1,
        style: 'cursor:pointer;'
      });
      seg.addEventListener('click', () => selectEpoch(i));
      g.appendChild(seg);

      // Label — counter-rotated so it stays upright regardless of ring spin
      const midAngle = (a1 + a2) / 2;
      const lp = polar((OUTER_R_OUT + OUTER_R_IN) / 2, midAngle);
      const labelGroup = svgEl('g', { transform: `rotate(${-outerRotation} ${lp.x} ${lp.y})` });
      const text = svgEl('text', {
        x: lp.x, y: lp.y, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: active ? '#1a1204' : 'var(--text-secondary, #9fb0c0)',
        'font-size': 9, 'font-family': 'var(--font-mono, monospace)',
        'letter-spacing': '0.5px', 'pointer-events': 'none'
      });
      text.textContent = ep.n.length > 14 ? ep.n.slice(0, 13) + '…' : ep.n;
      labelGroup.appendChild(text);
      g.appendChild(labelGroup);
    });
    attachDrag(g, 'outer');
    svg.appendChild(g);
  }

  function renderMiddleRing() {
    const g = svgEl('g', { id: 'ring-middle' });
    const bg = svgEl('circle', {
      cx: CX, cy: CY, r: (MID_R_OUT + MID_R_IN) / 2,
      fill: 'none', stroke: 'var(--border-mid, rgba(255,255,255,0.12))',
      'stroke-width': MID_R_OUT - MID_R_IN
    });
    g.appendChild(bg);

    // Tick marks every 5% of the epoch span
    for (let i = 0; i < 20; i++) {
      const a = i * 18 + middleRotation;
      const p1 = polar(MID_R_OUT - 2, a), p2 = polar(MID_R_IN + 2, a);
      g.appendChild(svgEl('line', {
        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
        stroke: 'var(--border-hi, rgba(255,255,255,0.3))', 'stroke-width': 1
      }));
    }

    // Pointer/knob at angle 0 (top) showing current dial position
    const knob = polar((MID_R_OUT + MID_R_IN) / 2, 0);
    g.appendChild(svgEl('circle', {
      cx: knob.x, cy: knob.y, r: 6, fill: 'var(--gold, #c8a030)',
      stroke: '#1a1204', 'stroke-width': 1.5
    }));

    attachDrag(g, 'middle');
    svg.appendChild(g);
  }

  function renderInnerRing() {
    const g = svgEl('g', { id: 'ring-inner' });
    g.appendChild(svgEl('circle', {
      cx: CX, cy: CY, r: (INNER_R_OUT + INNER_R_IN) / 2,
      fill: 'none', stroke: 'var(--border-mid, rgba(255,255,255,0.08))',
      'stroke-width': INNER_R_OUT - INNER_R_IN
    }));

    const items = getCandidateCivs();
    const TYPE_COLOR = {
      confirmed: 'var(--gold, #c8a030)',
      theorized: 'var(--violet, #8b5fbf)',
      debated:   'var(--teal, #2aada0)'
    };
    const r = (INNER_R_OUT + INNER_R_IN) / 2;

    if (!items.length) {
      const empty = svgEl('text', {
        x: CX, y: CY - r, 'text-anchor': 'middle',
        fill: 'var(--text-dim, #667799)', 'font-size': 9,
        'font-family': 'var(--font-mono, monospace)'
      });
      empty.textContent = 'No civilizations at this point — turn the middle ring';
      g.appendChild(empty);
      svg.appendChild(g);
      return;
    }

    // Closest civ at the top selection notch (angle 0), rest alternating
    // outward left/right — a bounded stand-in for a true infinite wrap
    // carousel, sorted by proximity to the dialed year per the v3 spec.
    const STEP = 22;
    items.forEach((item, i) => {
      const offset = i === 0 ? 0 : (i % 2 === 1 ? 1 : -1) * Math.ceil(i / 2) * STEP;
      const angle = offset;
      const p = polar(r, angle);
      const isSel = selectedCivId === item.civ.id;

      const dot = svgEl('circle', {
        cx: p.x, cy: p.y, r: isSel ? 9 : 6,
        fill: TYPE_COLOR[item.civ.t] || TYPE_COLOR.confirmed,
        'fill-opacity': item.opacity,
        stroke: isSel ? '#fff' : 'none', 'stroke-width': isSel ? 1.5 : 0,
        style: 'cursor:pointer;'
      });
      dot.addEventListener('click', () => selectCiv(item.civ));
      g.appendChild(dot);

      if (Math.abs(offset) < 90) {
        const lp = polar(r + 16, angle);
        const label = svgEl('text', {
          x: lp.x, y: lp.y, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
          fill: 'var(--text-secondary, #9fb0c0)', 'fill-opacity': item.opacity,
          'font-size': 8, 'font-family': 'var(--font-mono, monospace)',
          style: 'cursor:pointer;pointer-events:none;'
        });
        const n = item.civ.n;
        label.textContent = n.length > 16 ? n.slice(0, 15) + '…' : n;
        g.appendChild(label);
      }
    });

    svg.appendChild(g);
  }

  function renderHub() {
    const g = svgEl('g', { id: 'ring-hub' });
    g.appendChild(svgEl('circle', {
      cx: CX, cy: CY, r: HUB_R,
      fill: 'var(--bg-void, #05070c)', stroke: 'var(--border-hi, rgba(255,255,255,0.25))',
      'stroke-width': 1.5
    }));

    const civ = selectedCivId ? CIVS.find(c => c.id === selectedCivId) : null;
    const lines = [];
    if (civ) {
      lines.push({ t: civ.n, sz: 13, w: 700, fill: '#fff' });
      lines.push({ t: fmtRange(civ.s, civ.e), sz: 10, w: 400, fill: 'var(--text-secondary, #9fb0c0)' });
      lines.push({ t: civ.t.toUpperCase(), sz: 8, w: 600, fill: 'var(--gold, #c8a030)' });
      lines.push({ t: 'CLICK TO OPEN', sz: 7, w: 400, fill: 'var(--text-dim, #667799)' });
    } else {
      lines.push({ t: currentEpoch().n, sz: 12, w: 600, fill: '#fff' });
      lines.push({ t: fmtYearLabel(dialedYear()), sz: 14, w: 700, fill: 'var(--gold, #c8a030)' });
      const zAge = (typeof CELESTIAL_DATA !== 'undefined') ? CELESTIAL_DATA.getZodiacAge(dialedYear()) : null;
      lines.push({ t: zAge ? zAge.name.toUpperCase() : fmtRange(currentEpoch().s, currentEpoch().e),
        sz: 8, w: 400, fill: 'var(--text-secondary, #9fb0c0)' });
      lines.push({ t: 'TURN THE RINGS', sz: 7, w: 400, fill: 'var(--text-dim, #667799)' });
    }

    const startY = CY - ((lines.length - 1) * 15) / 2;
    lines.forEach((ln, i) => {
      const t = svgEl('text', {
        x: CX, y: startY + i * 15, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: ln.fill, 'font-size': ln.sz, 'font-weight': ln.w,
        'font-family': i === 0 ? 'var(--font-display, "Cinzel", serif)' : 'var(--font-mono, monospace)',
        'letter-spacing': '0.5px'
      });
      t.textContent = ln.t;
      g.appendChild(t);
    });

    if (civ) {
      const hitArea = svgEl('circle', { cx: CX, cy: CY, r: HUB_R, fill: 'transparent', style: 'cursor:pointer;' });
      hitArea.addEventListener('click', () => { if (onCivSelectCb) onCivSelectCb(civ, true); });
      g.appendChild(hitArea);
    }

    svg.appendChild(g);
  }

  function fmtRange(s, e) {
    return `${fmtYearLabel(s)} – ${fmtYearLabel(e)}`;
  }
  function fmtYearLabel(y) {
    y = Math.round(y);
    if (y === 0) return '1 CE';
    return y < 0 ? Math.abs(y).toLocaleString() + ' BCE' : y.toLocaleString() + ' CE';
  }

  // ─── Selection ────────────────────────────────────────────────────────────
  function selectEpoch(idx) {
    selectedEpochIdx = ((idx % EPOCHS.length) + EPOCHS.length) % EPOCHS.length;
    outerRotation = -selectedEpochIdx * EPOCH_ANGLE;
    middleRotation = 0;
    selectedCivId = null;
    render();
  }

  function selectCiv(civ) {
    selectedCivId = civ.id;
    render();
    if (onCivSelectCb) onCivSelectCb(civ, false);
  }

  // ─── Drag interaction (Pointer Events — unifies mouse/touch/pen) ─────────
  // touch-action:none is paired with real pointer handlers here deliberately
  // — the diagnosed cause of the Living Atlas mobile-nav bug was the reverse
  // (touch-action suppressing default behavior with no handler to replace
  // it). Not repeating that here.
  function attachDrag(el, which) {
    let dragging = false, startAngle = 0, startRotation = 0;

    function angleAt(clientX, clientY) {
      const rect = svg.getBoundingClientRect();
      const scale = 640 / rect.width; // svg intrinsic size / rendered size
      const x = (clientX - rect.left) * scale - CX;
      const y = (clientY - rect.top) * scale - CY;
      return Math.atan2(x, -y) * 180 / Math.PI; // matches polar()'s -90/clockwise convention
    }

    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', e => {
      dragging = true;
      startAngle = angleAt(e.clientX, e.clientY);
      startRotation = which === 'outer' ? outerRotation : middleRotation;
      el.setPointerCapture(e.pointerId);
      markInteraction();
    });
    el.addEventListener('pointermove', e => {
      if (!dragging) return;
      const delta = angleAt(e.clientX, e.clientY) - startAngle;
      if (which === 'outer') {
        outerRotation = startRotation + delta;
      } else {
        middleRotation = normalizeAngle(startRotation + delta);
      }
      render();
    });
    el.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      if (which === 'outer') snapOuterToNearest();
    });
  }

  function snapOuterToNearest() {
    const nearest = Math.round(-outerRotation / EPOCH_ANGLE);
    selectEpoch(nearest);
  }

  // ─── Zoom (pinch / wheel / buttons) — clamped modest range, see MIN_ZOOM/
  // MAX_ZOOM above. Pinch uses a Map of active pointers, same technique as
  // the concept-demo prototype this was ported from. ─────────────────────
  const activePointers = new Map();
  let pinchStartDist = null, pinchStartZoom = 1;

  function setZoom(z) {
    zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
    render();
  }
  function zoomBy(delta) { setZoom(zoom + delta); }

  function attachZoom(rootEl) {
    rootEl.addEventListener('pointerdown', e => {
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activePointers.size === 2) {
        const pts = [...activePointers.values()];
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartZoom = zoom;
      }
      markInteraction();
    });
    rootEl.addEventListener('pointermove', e => {
      if (!activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activePointers.size === 2 && pinchStartDist) {
        const pts = [...activePointers.values()];
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        setZoom(pinchStartZoom * (dist / pinchStartDist));
      }
    });
    ['pointerup', 'pointercancel'].forEach(evt =>
      rootEl.addEventListener(evt, e => {
        activePointers.delete(e.pointerId);
        if (activePointers.size < 2) pinchStartDist = null;
      })
    );
    rootEl.addEventListener('wheel', e => {
      e.preventDefault();
      zoomBy(-e.deltaY * 0.001);
      markInteraction();
    }, { passive: false });
  }

  // ─── Ambient idle drift — pauses instantly on any pointer/wheel activity,
  // resumes ~3.5s after the last one. ─────────────────────────────────────
  function markInteraction() {
    clearTimeout(idleTimer);
    if (ambientRAF) cancelAnimationFrame(ambientRAF);
    idleTimer = setTimeout(startAmbientDrift, IDLE_DELAY_MS);
  }
  function startAmbientDrift() {
    function step() {
      middleRotation = normalizeAngle(middleRotation + 0.03);
      render();
      ambientRAF = requestAnimationFrame(step);
    }
    step();
  }

  // ─── Public API ───────────────────────────────────────────────────────────
  function init(svgId, callbacks) {
    svg = document.getElementById(svgId);
    onCivSelectCb = (callbacks && callbacks.onCivSelect) || null;
    onYearChangeCb = (callbacks && callbacks.onYearChange) || null;
    attachZoom(svg);
    selectEpoch(DEFAULT_EPOCH_INDEX);
    markInteraction(); // schedules the first ambient-drift start
  }

  function getState() {
    return { epoch: currentEpoch(), year: dialedYear(), civId: selectedCivId, zoom };
  }

  return { init, selectEpoch, getState, setZoom, zoomBy };
})();

window.AstrolabeRings = AstrolabeRings;

/* ============================================================
   CHRONOS · timeline.js
   Timeline engine: canvas render loop, zoom, pan, click events.
   Phase 5: Ghost bar date challenge render pass.
   Ghost tooltip DOM managed by timeline-ghosts.js (GhostTooltip global).
   Depends on: data.js → data-extended.js → timeline.js → timeline-ghosts.js
   Usage: TimelineEngine.init('canvas-id', 'wrap-id')
   ============================================================ */

const TimelineEngine = (() => {

  // ── STATE ────────────────────────────────────────────────
  let vS = -5000, vE = 2100;
  let CW = 0, CH = 0;
  let drag = false, dx0 = 0, dS0 = vS, dE0 = vE;
  let td0 = null, tmY = null;
  let civRects   = [];   // [{c, x, y, w, h}]
  let ghostRects = [];   // [{dt, civName, x, y, w, h}] — shared with GhostTooltip
  let selCiv = null;
  let votes  = {};
  let activePresetIdx = 2;
  let filteredCivs = null;

  // ── CANVAS REFS ──────────────────────────────────────────
  let wrap, cvs, ctx;

  // ── LAYOUT CONSTANTS ─────────────────────────────────────
  const EPH = 18;               // epoch label band height
  const TCK = 30;               // tick label band height
  const HDR = EPH + TCK;        // total header height
  const LH  = 36;               // lane height
  const LG  = 5;                // lane gap

  // Ghost visual spec (Bible §27)
  const GHOST_ALPHA   = 0.25;
  const GHOST_VIOLET  = '#3a5fa8';   // lapis lazuli (theorized dates)
  const GHOST_TEAL    = '#1a8a80';   // aegean teal (mainstream/debated dates)
  const GHOST_LBL_SZ  = 9;

  // ── TYPE STYLES — Mediterranean Antiquity palette ─────────
  // bar: fill colour · hi: selected fill · lbl: text colour
  const TYPE_STYLES = {
    confirmed: {
      bar: '#8B5E0A',          // hammered bronze / Egyptian gold
      hi:  '#E8A020',          // bright gold when selected
      lbl: '#F5C842',          // warm golden text
    },
    theorized: {
      bar: '#1E3A7A',          // deep lapis lazuli
      hi:  '#4A7FD4',          // bright lapis when selected
      lbl: '#90B8F0',          // pale Aegean sky text
    },
    debated: {
      bar: '#0A5A55',          // deep Aegean teal
      hi:  '#2AADA0',          // bright turquoise when selected
      lbl: '#60D0C8',          // pale turquoise text
    },
  };


  // ── COORD HELPERS ────────────────────────────────────────
  function toX(year)  { return (year - vS) / (vE - vS) * CW; }
  function fromX(px)  { return vS + (px / CW) * (vE - vS); }

  function fmtYear(y) {
    if (y === 0) return '1 CE';
    return y < 0
      ? Math.abs(Math.round(y)).toLocaleString() + ' BCE'
      : Math.round(y).toLocaleString() + ' CE';
  }

  function clampView(s, e) {
    const sp = e - s;
    if (sp < 60)     { const m = (s+e)/2; return { s: m-30, e: m+30 }; }
    if (sp > 120000) return { s: -100000, e: 2100 };
    return { s, e };
  }

  function tickInterval() {
    const sp = vE - vS;
    if (sp > 80000) return 20000;
    if (sp > 30000) return 10000;
    if (sp > 12000) return 5000;
    if (sp > 5000)  return 2000;
    if (sp > 2000)  return 500;
    if (sp > 800)   return 200;
    if (sp > 300)   return 100;
    return 50;
  }

  // ── LANE ASSIGNMENT ──────────────────────────────────────
  function assignLanes(civs) {
    const sorted = [...civs].sort((a, b) => a.s - b.s);
    const laneEnds = [];
    return sorted.map(c => {
      let lane = 0;
      while (laneEnds[lane] !== undefined && laneEnds[lane] > c.s + 30) lane++;
      laneEnds[lane] = c.e;
      return { ...c, lane };
    });
  }

  // ── FILTERED CIV LIST ─────────────────────────────────────
  function getVisible() {
    const source = filteredCivs !== null ? filteredCivs : CIVS;
    return source.filter(c => c.e >= vS && c.s <= vE);
  }

  function setFilteredCivs(list) {
    filteredCivs = list;
    selCiv = null;
    if (window.ChronosUI) window.ChronosUI.hideInfo();
    resize();
  }

  // ── ROUNDED RECT ─────────────────────────────────────────
  function rrect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
  }

  // ── HIT TESTS ────────────────────────────────────────────
  function hitTest(mx, my) {
    return civRects.find(({ x, y, w, h }) =>
      mx >= x && mx <= x + w && my >= y && my <= y + h);
  }

  // ── MAIN RENDER ───────────────────────────────────────────
  function render() {
    ctx.clearRect(0, 0, CW, CH);
    civRects   = [];
    ghostRects = [];

    const visible = getVisible();
    const laned   = assignLanes(visible);

    // — Epoch bands —
    EPOCHS.forEach(ep => {
      const x1 = toX(ep.s), x2 = toX(ep.e);
      if (x2 < 0 || x1 > CW) return;
      const lx = Math.max(0, x1), rx = Math.min(CW, x2);
      ctx.fillStyle = ep.c;
      ctx.fillRect(lx, 0, rx - lx, CH);
      if (rx - lx > 55) {
        ctx.fillStyle = 'rgba(140,155,190,.22)';
        ctx.font = '9px "IBM Plex Mono",monospace';
        ctx.textAlign = 'left';
        ctx.fillText(ep.n, lx + 7, EPH - 4);
      }
      ctx.strokeStyle = 'rgba(15,50,120,.3)';
      ctx.lineWidth = 1; ctx.setLineDash([3, 5]);
      ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx, CH); ctx.stroke();
      ctx.setLineDash([]);
    });

    // — Grid ticks —
    const iv = tickInterval();
    const t0 = Math.ceil(vS / iv) * iv;
    for (let y = t0; y <= vE; y += iv) {
      const x = toX(y);
      ctx.strokeStyle = 'rgba(15,50,120,.18)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, HDR); ctx.lineTo(x, CH); ctx.stroke();
    }

    // — Axis & tick labels —
    ctx.strokeStyle = 'rgba(15,50,100,.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, HDR); ctx.lineTo(CW, HDR); ctx.stroke();
    for (let y = t0; y <= vE; y += iv) {
      const x = toX(y);
      if (x < 8 || x > CW - 8) continue;
      ctx.fillStyle = '#142840';
      ctx.font = '9px "IBM Plex Mono",monospace';
      ctx.textAlign = 'center';
      ctx.fillText(fmtYear(y), x, EPH + TCK - 6);
    }

    // — NOW marker —
    const nx = toX(2025);
    if (nx > 0 && nx < CW) {
      ctx.strokeStyle = 'rgba(180,60,60,.5)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(nx, 0); ctx.lineTo(nx, CH); ctx.stroke();
      ctx.fillStyle = 'rgba(180,60,60,.5)';
      ctx.font = '8px "IBM Plex Mono",monospace'; ctx.textAlign = 'center';
      ctx.fillText('NOW', nx, EPH + 13);
    }

    // ── GHOST BARS — render BEFORE main bars (behind) ───────
    // Semi-transparent date challenge theories per Bible §27.
    laned.forEach(c => {
      if (!c.dateTheories || !c.dateTheories.length) return;
      const by = HDR + c.lane * (LH + LG) + 2;

      c.dateTheories.forEach((dt, idx) => {
        if (dt.e < vS || dt.s > vE) return;
        const x1 = toX(dt.s), x2 = toX(dt.e);
        const bx = Math.max(0, x1), bx2 = Math.min(CW, x2);
        const bw = Math.max(4, bx2 - bx);
        if (bx2 < 0 || bx > CW) return;

        const isMain = dt.label.toLowerCase().includes('mainstream');
        const gc = isMain ? GHOST_TEAL : GHOST_VIOLET;
        const inset = idx * 2;
        const gy = by + inset;
        const gh = Math.max(LH - inset * 2, 8);

        // Fill
        ctx.globalAlpha = GHOST_ALPHA;
        ctx.fillStyle = gc;
        rrect(bx, gy, bw, gh, 3); ctx.fill();

        // Dashed border
        ctx.globalAlpha = GHOST_ALPHA * 1.9;
        ctx.strokeStyle = gc; ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        rrect(bx, gy, bw, gh, 3); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;

        // Researcher micro-label
        if (bw > 50 && dt.researcher) {
          const shortName = dt.researcher.split(/[/,]/)[0].trim().split(' ').slice(-1)[0];
          ctx.save();
          ctx.beginPath(); ctx.rect(bx + 3, gy, bw - 6, gh); ctx.clip();
          ctx.globalAlpha = 0.5; ctx.fillStyle = gc;
          ctx.font = `${GHOST_LBL_SZ}px "IBM Plex Mono",monospace`;
          ctx.textAlign = 'left';
          ctx.fillText(shortName, bx + 5, gy + gh / 2 + 3);
          ctx.globalAlpha = 1; ctx.restore();
        }

        ghostRects.push({ dt, civName: c.n, x: bx, y: gy, w: bw, h: gh });
      });
    });

    // Push ghost rects to GhostTooltip module for hover hit-testing
    if (window.GhostTooltip) GhostTooltip.setRects(ghostRects);

    // ── MAIN CIVILIZATION BARS — on top of ghost bars ───────
    laned.forEach(c => {
      const x1 = toX(c.s), x2 = toX(c.e);
      const bx  = Math.max(0, x1), bx2 = Math.min(CW, x2);
      const bw  = Math.max(4, bx2 - bx);
      if (bx2 < 0 || bx > CW) return;
      const by  = HDR + c.lane * (LH + LG) + 2;
      const bh  = LH;
      const st  = TYPE_STYLES[c.t];
      const sel = selCiv && selCiv.id === c.id;

      ctx.globalAlpha = sel ? 1 : 0.85;
      ctx.fillStyle   = sel ? st.hi : st.bar;
      rrect(bx, by, bw, bh, 4); ctx.fill();

      if (sel) {
        ctx.strokeStyle = st.lbl; ctx.lineWidth = 1.5;
        rrect(bx, by, bw, bh, 4); ctx.stroke();
      }

      // Small violet pip if civ has date challenge theories
      if (c.dateTheories && c.dateTheories.length) {
        ctx.globalAlpha = 0.75; ctx.fillStyle = '#8b41c8';
        ctx.beginPath(); ctx.arc(bx + bw - 6, by + 6, 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (bw > 32) {
        ctx.save();
        ctx.beginPath(); ctx.rect(bx + 3, by, bw - 6, bh); ctx.clip();
        ctx.font = (sel ? '500 ' : '') + '12px "IBM Plex Mono",monospace';
        ctx.textAlign = 'left';
        // Dark backing for readability
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fillText(c.n, bx + 9, by + bh / 2 + 5);
        ctx.fillStyle = sel ? 'rgba(255,255,255,.96)' : st.lbl;
        ctx.fillText(c.n, bx + 8, by + bh / 2 + 4);
        ctx.restore();
      }

      civRects.push({ c, x: bx, y: by, w: bw, h: bh });
    });

    // Phase 4 celestial overlay sync
    if (window.CelestialEngine) CelestialEngine.syncViewport(vS, vE, CW, CH, HDR);
  }

  // ── RESIZE & HEIGHT RECALC ────────────────────────────────
  function resize() {
    const r = wrap.getBoundingClientRect();
    CW = r.width || 680;
    const vis   = getVisible();
    const laned = assignLanes(vis);
    const maxLane = laned.length ? Math.max(...laned.map(c => c.lane)) : 0;
    CH = HDR + (maxLane + 1) * (LH + LG) + 20;
    const dpr = window.devicePixelRatio || 1;
    cvs.width  = CW * dpr; cvs.height = CH * dpr;
    cvs.style.width = CW + 'px'; cvs.style.height = CH + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
    render();
  }

  // ── PRESET ───────────────────────────────────────────────
  function setPreset(idx) {
    const p = PRESETS[idx]; vS = p.s; vE = p.e; activePresetIdx = idx; resize();
  }

  // ── EVENT WIRING ──────────────────────────────────────────
  function wireEvents() {
    cvs.addEventListener('click', e => {
      const r = cvs.getBoundingClientRect();
      const hit = hitTest(e.clientX - r.left, e.clientY - r.top);
      if (hit) { selCiv = hit.c; if (window.ChronosUI) ChronosUI.showInfo(hit.c, votes); }
      else     { selCiv = null;  if (window.ChronosUI) ChronosUI.hideInfo(); }
      render();
    });

    cvs.addEventListener('mousemove', e => {
      if (drag) return;
      const r  = cvs.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const mainHit  = hitTest(mx, my);
      const ghostHit = window.GhostTooltip ? GhostTooltip.hitTest(mx, my) : null;
      if (ghostHit && !mainHit) {
        GhostTooltip.show(ghostHit.dt, ghostHit.civName, e.clientX, e.clientY);
        cvs.style.cursor = 'help';
      } else {
        if (window.GhostTooltip) GhostTooltip.hide();
        cvs.style.cursor = 'grab';
      }
    });

    cvs.addEventListener('mouseleave', () => { if (window.GhostTooltip) GhostTooltip.hide(); });

    cvs.addEventListener('mousedown', e => {
      drag = true; dx0 = e.clientX; dS0 = vS; dE0 = vE;
      cvs.style.cursor = 'grabbing';
      if (window.GhostTooltip) GhostTooltip.hide();
      e.preventDefault();
    });
    window.addEventListener('mousemove', e => {
      if (!drag) return;
      const shift = (e.clientX - dx0) / CW * (dE0 - dS0);
      vS = dS0 - shift; vE = dE0 - shift; render();
    });
    window.addEventListener('mouseup', () => { drag = false; cvs.style.cursor = 'grab'; });

    wrap.addEventListener('wheel', e => {
      e.preventDefault();
      const r = wrap.getBoundingClientRect();
      const py = fromX(e.clientX - r.left);
      const f  = e.deltaY > 0 ? 1.12 : 0.89;
      const { s, e: en } = clampView(py - (py - vS) * f, py + (vE - py) * f);
      vS = s; vE = en; render();
    }, { passive: false });

    wrap.addEventListener('touchstart', e => {
      e.preventDefault();
      if (e.touches.length === 1) {
        drag = true; dx0 = e.touches[0].clientX; dS0 = vS; dE0 = vE; td0 = null;
      } else if (e.touches.length === 2) {
        drag = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        td0 = Math.sqrt(dx*dx + dy*dy);
        const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - wrap.getBoundingClientRect().left;
        tmY = fromX(mx); dS0 = vS; dE0 = vE;
      }
    }, { passive: false });

    wrap.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && drag) {
        const shift = (e.touches[0].clientX - dx0) / CW * (dE0 - dS0);
        vS = dS0 - shift; vE = dE0 - shift; render();
      } else if (e.touches.length === 2 && td0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const nd = Math.sqrt(dx*dx + dy*dy);
        const f  = td0 / nd;
        const { s, e: en } = clampView(tmY - (tmY - dS0) * f, tmY + (dE0 - tmY) * f);
        vS = s; vE = en; render();
      }
    }, { passive: false });

    wrap.addEventListener('touchend', () => { drag = false; td0 = null; });
    window.addEventListener('resize', resize);
  }

  // ── INIT ──────────────────────────────────────────────────
  function init(canvasId, wrapperId) {
    cvs  = document.getElementById(canvasId);
    wrap = document.getElementById(wrapperId);
    ctx  = cvs.getContext('2d');
    cvs.style.cursor = 'grab';
    wireEvents();
    document.fonts.ready.then(resize);
    setTimeout(resize, 120);
  }

  // ── VOTE ─────────────────────────────────────────────────
  function registerVote(civId, type) {
    const prev = votes[civId] || {};
    votes[civId] = prev[type] ? {} : { up: type === 'up', dn: type === 'dn' };
    if (selCiv && selCiv.id === civId && window.ChronosUI) ChronosUI.showInfo(selCiv, votes);
    render();
  }

  return { init, resize, setFilteredCivs, setPreset, registerVote, fmtYear };

})();

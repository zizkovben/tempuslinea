/* ============================================================
   CHRONOS · celestial.js  (Phase 4)
   Celestial Layer — canvas overlay for the timeline.
   Renders zodiac age bands, solstice/equinox alignment
   markers, planetary conjunction dots, and precession arc.
   Attaches as a second canvas layered over the timeline.
   Depends on: celestial-data.js, timeline.js (for coord helpers)
   Exposes: CelestialEngine (global)
   ============================================================ */

const CelestialEngine = (() => {

  // ── STATE ─────────────────────────────────────────────────
  let overlayCanvas = null;
  let ctx           = null;
  let wrapEl        = null;
  let isVisible     = false;
  let _vS = -5000, _vE = 2100;   // viewport — synced from TimelineEngine
  let _CW = 0, _CH = 0;
  let _HDR = 48;                  // header height — matches timeline.js EPH+TCK

  // Hover state for tooltips
  let hoveredMarker = null;
  let tooltipEl     = null;

  // ── INIT ──────────────────────────────────────────────────
  function init(canvasId, wrapperId) {
    wrapEl = document.getElementById(wrapperId);
    if (!wrapEl) return;

    // Create overlay canvas stacked above timeline canvas
    overlayCanvas = document.createElement('canvas');
    overlayCanvas.id    = 'celestial-canvas';
    overlayCanvas.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:5;display:none;';
    wrapEl.appendChild(overlayCanvas);
    ctx = overlayCanvas.getContext('2d');

    // Tooltip element
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'celestial-tooltip';
    tooltipEl.style.cssText =
      'position:fixed;pointer-events:none;z-index:200;' +
      'background:rgba(3,6,18,.97);border:1px solid rgba(220,150,40,.4);' +
      'color:rgba(230,195,80,.9);font-family:"IBM Plex Mono",monospace;' +
      'font-size:10px;letter-spacing:.8px;padding:6px 12px;border-radius:3px;' +
      'opacity:0;transition:opacity .15s;max-width:280px;line-height:1.6;';
    document.body.appendChild(tooltipEl);

    // Enable pointer events on overlay for hover
    overlayCanvas.style.pointerEvents = 'auto';
    overlayCanvas.addEventListener('mousemove', _onHover);
    overlayCanvas.addEventListener('mouseleave', _onLeave);

    window.addEventListener('resize', resize);
    resize();
  }

  // ── VISIBILITY ────────────────────────────────────────────
  function setVisible(v) {
    isVisible = v;
    if (overlayCanvas) {
      overlayCanvas.style.display = v ? 'block' : 'none';
    }
    if (v) render();
  }

  function toggle() {
    setVisible(!isVisible);
    return isVisible;
  }

  // ── SYNC FROM TIMELINE ────────────────────────────────────
  // Called by TimelineEngine after every render pass.
  function syncViewport(viewStart, viewEnd, canvasW, canvasH, headerH) {
    _vS  = viewStart;
    _vE  = viewEnd;
    _CW  = canvasW;
    _CH  = canvasH;
    _HDR = headerH;

    if (overlayCanvas) {
      const dpr = window.devicePixelRatio || 1;
      overlayCanvas.width  = canvasW * dpr;
      overlayCanvas.height = canvasH * dpr;
      overlayCanvas.style.width  = canvasW + 'px';
      overlayCanvas.style.height = canvasH + 'px';
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
    }

    if (isVisible) render();
  }

  // ── COORD HELPERS ─────────────────────────────────────────
  function toX(year) {
    return (year - _vS) / (_vE - _vS) * _CW;
  }

  // ── MAIN RENDER ───────────────────────────────────────────
  function render() {
    if (!ctx || !isVisible) return;
    ctx.clearRect(0, 0, _CW, _CH);

    _renderZodiacBands();
    _renderPrecessArc();
    _renderSolsticeMarkers();
    _renderConjunctions();
  }

  // ── ZODIAC AGE BANDS ──────────────────────────────────────
  // Renders as subtle coloured bands behind the epoch bands.
  // Only visible in the epoch band row (top HDR area) to keep
  // the civ bar area clean.
  function _renderZodiacBands() {
    const ages = CELESTIAL_DATA.getZodiacAgesInRange(_vS, _vE);

    ages.forEach(age => {
      const x1 = toX(age.s), x2 = toX(age.e);
      const lx = Math.max(0, x1), rx = Math.min(_CW, x2);
      if (rx <= lx) return;

      // Band spans full canvas height but at low opacity
      ctx.fillStyle = age.color;
      ctx.fillRect(lx, 0, rx - lx, _CH);

      // Age label in the epoch band area
      const bandW = rx - lx;
      if (bandW > 40) {
        const cx = lx + bandW / 2;
        ctx.save();
        ctx.fillStyle   = age.labelColor;
        ctx.font        = `${bandW > 100 ? 9 : 7}px "IBM Plex Mono",monospace`;
        ctx.textAlign   = 'center';
        ctx.letterSpacing = '1px';
        // Symbol + abbreviated name if wide enough
        const label = bandW > 80
          ? age.sym + ' ' + age.name.replace('Age of ','')
          : age.sym;
        ctx.fillText(label, cx, _HDR - 6);
        ctx.restore();
      }

      // Age boundary tick
      if (x1 > 0 && x1 < _CW) {
        ctx.strokeStyle = age.labelColor.replace(/[\d.]+\)$/, '0.3)');
        ctx.lineWidth   = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(x1, 0);
        ctx.lineTo(x1, _HDR);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  }

  // ── PRECESSION ARC ────────────────────────────────────────
  // Draws a subtle sine wave in the epoch band indicating the
  // position in the precession cycle across the visible range.
  function _renderPrecessArc() {
    if (_vE - _vS > 30000) return;   // too zoomed out to be meaningful

    const arcY  = _HDR - 3;
    const arcH  = 4;                 // amplitude

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(220,150,40,0.35)';
    ctx.lineWidth   = 1.5;

    let first = true;
    for (let px = 0; px <= _CW; px += 2) {
      const year   = _vS + (px / _CW) * (_vE - _vS);
      const angle  = CELESTIAL_DATA.getPrecessAngle(year);
      const sinVal = Math.sin(angle * Math.PI / 180);
      const y      = arcY - sinVal * arcH;
      if (first) { ctx.moveTo(px, y); first = false; }
      else          ctx.lineTo(px, y);
    }
    ctx.stroke();
  }

  // ── SOLSTICE / EQUINOX MARKERS ────────────────────────────
  // Vertical lines with labelled diamonds where key astronomical
  // alignments were built or observed.
  function _renderSolsticeMarkers() {
    const markers = CELESTIAL_DATA.getSolsticeMarkers(_vS, _vE);
    const stored  = [];   // for hover detection

    markers.forEach(m => {
      const x = toX(m.year);
      if (x < 0 || x > _CW) return;

      // Vertical dashed line — full canvas height
      ctx.strokeStyle = m.color;
      ctx.lineWidth   = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, _HDR);
      ctx.lineTo(x, _CH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Diamond marker at top of civ bar area
      const dy = _HDR + 6;
      const ds = 5;
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.moveTo(x,    dy - ds);
      ctx.lineTo(x+ds, dy);
      ctx.lineTo(x,    dy + ds);
      ctx.lineTo(x-ds, dy);
      ctx.closePath();
      ctx.fill();

      // Short label below diamond
      const span = _vE - _vS;
      if (span < 8000) {
        ctx.save();
        ctx.fillStyle  = m.color;
        ctx.font       = '7px "IBM Plex Mono",monospace';
        ctx.textAlign  = 'center';
        ctx.translate(x + 8, dy + 18);
        ctx.rotate(Math.PI / 4);
        const short = m.label.split(' — ')[0].substring(0, 22);
        ctx.fillText(short, 0, 0);
        ctx.restore();
      }

      stored.push({ x, m });
    });

    overlayCanvas._solsticeMarkers = stored;
  }

  // ── CONJUNCTION DOTS ──────────────────────────────────────
  // Small coloured dots at the top of the epoch band.
  function _renderConjunctions() {
    const conjs = CELESTIAL_DATA.getConjunctions(_vS, _vE);
    const stored = [];

    conjs.forEach(c => {
      const x = toX(c.year);
      if (x < 4 || x > _CW - 4) return;

      const dotY = 8;
      const dotR = c.type === 'precession' ? 4 : 3;

      // Outer glow
      const grd = ctx.createRadialGradient(x, dotY, 0, x, dotY, dotR * 3);
      grd.addColorStop(0, c.color);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, dotY, dotR * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(x, dotY, dotR, 0, Math.PI * 2);
      ctx.fill();

      stored.push({ x, y: dotY, r: dotR * 4, c });
    });

    overlayCanvas._conjunctions = stored;
  }

  // ── HOVER DETECTION ───────────────────────────────────────
  function _onHover(e) {
    const rect = overlayCanvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left;
    const my   = e.clientY - rect.top;

    let found = null;

    // Check solstice markers (vertical line proximity)
    const markers = overlayCanvas._solsticeMarkers || [];
    for (const { x, m } of markers) {
      if (Math.abs(mx - x) < 8) { found = { type:'marker', data:m }; break; }
    }

    // Check conjunction dots
    if (!found) {
      const conjs = overlayCanvas._conjunctions || [];
      for (const { x, y, r, c } of conjs) {
        const d = Math.sqrt((mx-x)**2 + (my-y)**2);
        if (d < r) { found = { type:'conjunction', data:c }; break; }
      }
    }

    if (found) {
      const d = found.data;
      const label = d.label || d.name || '';
      const src   = d.source || '';
      tooltipEl.innerHTML =
        `<div style="font-size:8px;letter-spacing:2px;color:rgba(220,150,40,.6);` +
        `margin-bottom:3px;">${(d.type||'').toUpperCase().replace('-',' ')} · ` +
        `${d.year < 0 ? Math.abs(d.year).toLocaleString()+' BCE' : d.year+' CE'}</div>` +
        `<div>${label}</div>` +
        (src ? `<div style="font-size:9px;color:rgba(100,140,160,.7);margin-top:3px;">` +
               `${src.substring(0,80)}</div>` : '');
      tooltipEl.style.left    = (e.clientX + 14) + 'px';
      tooltipEl.style.top     = (e.clientY - 8)  + 'px';
      tooltipEl.style.opacity = '1';
      overlayCanvas.style.cursor = 'crosshair';
    } else {
      _onLeave();
    }
  }

  function _onLeave() {
    if (tooltipEl) tooltipEl.style.opacity = '0';
    if (overlayCanvas) overlayCanvas.style.cursor = 'default';
  }

  // ── RESIZE ────────────────────────────────────────────────
  function resize() {
    if (!wrapEl || !overlayCanvas) return;
    const r   = wrapEl.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    _CW = r.width  || 680;
    _CH = r.height || 400;   // use actual wrapper height, not style string
    overlayCanvas.width  = _CW * dpr;
    overlayCanvas.height = _CH * dpr;
    overlayCanvas.style.width  = _CW + 'px';
    overlayCanvas.style.height = _CH + 'px';
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
    if (isVisible) render();
  }

  // ── QUERY HELPERS ─────────────────────────────────────────
  function getZodiacAge(year)       { return CELESTIAL_DATA.getZodiacAge(year); }
  function getPrecessAngle(year)    { return CELESTIAL_DATA.getPrecessAngle(year); }
  function getSolsticeMarkers(s, e) { return CELESTIAL_DATA.getSolsticeMarkers(s, e); }
  function getConjunctions(s, e)    { return CELESTIAL_DATA.getConjunctions(s, e); }

  // ── PUBLIC API ────────────────────────────────────────────
  return {
    init,
    setVisible,
    toggle,
    syncViewport,
    render,
    resize,
    getZodiacAge,
    getPrecessAngle,
    getSolsticeMarkers,
    getConjunctions,
  };

})();

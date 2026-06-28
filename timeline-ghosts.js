/* ============================================================
   CHRONOS · timeline-ghosts.js
   Ghost bar tooltip manager and hit-test registry for date
   challenge bars on the timeline canvas.
   Phase 5 addition. Load AFTER timeline.js.
   Exposes: GhostTooltip (global)
   ============================================================ */

const GhostTooltip = (() => {

  let tooltipEl = null;
  let rects = [];     // [{dt, civName, x, y, w, h}]

  // ── DOM SETUP ────────────────────────────────────────────
  function _ensure() {
    if (tooltipEl) return;
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'ghost-tooltip';
    tooltipEl.style.cssText = [
      'position:fixed',
      'z-index:9999',
      'pointer-events:none',
      'display:none',
      'background:rgba(8,10,22,.95)',
      'border:1px solid rgba(107,33,168,.5)',
      'border-radius:5px',
      'padding:9px 13px',
      'max-width:290px',
      'font-family:"IBM Plex Mono",monospace',
      'font-size:10px',
      'line-height:1.65',
      'color:#8899aa',
      'box-shadow:0 4px 28px rgba(0,0,0,.65)',
    ].join(';');
    document.body.appendChild(tooltipEl);
  }

  // ── PUBLIC: SET RECTS (called by timeline render) ─────────
  function setRects(newRects) {
    rects = newRects;
  }

  // ── HIT TEST ─────────────────────────────────────────────
  function hitTest(mx, my) {
    for (let i = rects.length - 1; i >= 0; i--) {
      const { x, y, w, h } = rects[i];
      if (mx >= x && mx <= x + w && my >= y && my <= y + h) return rects[i];
    }
    return null;
  }

  // ── SHOW ─────────────────────────────────────────────────
  function show(dt, civName, clientX, clientY) {
    _ensure();

    // Colour: violet for alternative, teal if label says mainstream
    const isMain = dt.label.toLowerCase().includes('mainstream');
    const color  = isMain ? '#1a9a99' : '#8b41c8';

    const upTotal = (dt.up || 0) + (dt.dn || 0);
    const pct     = upTotal > 0 ? Math.round(((dt.up || 0) / upTotal) * 100) : 50;

    // Format date range
    const fmtY = y => {
      if (y === 0) return '1 CE';
      return y < 0
        ? Math.abs(Math.round(y)).toLocaleString() + ' BCE'
        : Math.round(y).toLocaleString() + ' CE';
    };

    tooltipEl.innerHTML = `
      <div style="color:${color};letter-spacing:2px;font-size:8px;margin-bottom:5px;">
        ◈ DATE CHALLENGE · ${civName.toUpperCase()}
      </div>
      <div style="color:#c8d8e8;font-size:11px;margin-bottom:5px;line-height:1.45;">
        ${dt.label}
      </div>
      <div style="color:#445566;font-size:9px;margin-bottom:5px;">
        ${fmtY(dt.s)} → ${fmtY(dt.e)}
      </div>
      ${dt.researcher ? `
      <div style="color:${color};font-size:9px;margin-bottom:4px;opacity:.85;">
        ⬡ ${dt.researcher}
      </div>` : ''}
      <div style="color:#334455;font-size:8px;margin-bottom:7px;font-style:italic;line-height:1.5;">
        ${dt.source}
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="color:#3a8a5a;font-size:9px;">▲ ${(dt.up || 0).toLocaleString()}</span>
        <span style="color:#8a3a3a;font-size:9px;">▼ ${(dt.dn || 0).toLocaleString()}</span>
        <div style="flex:1;height:2px;background:rgba(15,50,80,.5);border-radius:1px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${color};transition:width .3s;"></div>
        </div>
        <span style="color:#445566;font-size:8px;">${pct}% plausibility</span>
      </div>`;

    tooltipEl.style.display = 'block';

    // Smart positioning — stay in viewport
    const tw = 290, th = tooltipEl.offsetHeight || 130;
    const vw = window.innerWidth, vh = window.innerHeight;
    let tx = clientX + 16, ty = clientY - 12;
    if (tx + tw > vw - 16) tx = clientX - tw - 16;
    if (ty + th > vh - 16) ty = clientY - th - 12;
    tooltipEl.style.left = tx + 'px';
    tooltipEl.style.top  = ty + 'px';
  }

  // ── HIDE ─────────────────────────────────────────────────
  function hide() {
    if (tooltipEl) tooltipEl.style.display = 'none';
  }

  return { setRects, hitTest, show, hide };

})();

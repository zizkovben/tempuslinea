// globe-borders-ui.js
// CHRONOS Phase 6 — Dynamic Borders UI controls and legend
// Depends on: globe-borders.js, globe-borders-data.js, globe-borders-styles.js
// Exposes: window.GlobeBordersUI

const GlobeBordersUI = (() => {
  // ─── State ───────────────────────────────────────────────────────────────
  let _bordersOn  = true;
  let _legendOpen = false;
  let _opacity    = 0.85;
  let _yearGetter = () => 2024;

  // ─── DOM refs ────────────────────────────────────────────────────────────
  let _toggleBtn   = null;
  let _opacityWrap = null;
  let _legendPanel = null;

  // ─── Slider track helper ─────────────────────────────────────────────────

  function updateSliderTrack(slider) {
    const pct = slider.value + '%';
    slider.style.background =
      `linear-gradient(to right, var(--teal,#0c6a69) 0%, var(--teal,#0c6a69) ${pct}, rgba(100,120,160,0.2) ${pct})`;
  }

  // ─── Build controls bar ──────────────────────────────────────────────────

  function buildControls() {
    const container = document.createElement('div');
    container.id = 'gb-controls';

    _toggleBtn = document.createElement('button');
    _toggleBtn.id = 'gb-toggle';
    _toggleBtn.textContent = '◈ BORDERS';
    _toggleBtn.title = 'Toggle political borders overlay';
    _toggleBtn.addEventListener('click', toggleBorders);

    _opacityWrap = document.createElement('div');
    _opacityWrap.id = 'gb-opacity-wrap';

    const opLabel = document.createElement('span');
    opLabel.id = 'gb-opacity-label';
    opLabel.textContent = 'opacity';

    const opSlider = document.createElement('input');
    opSlider.type = 'range';
    opSlider.id = 'gb-opacity';
    opSlider.min = 0;
    opSlider.max = 100;
    opSlider.value = Math.round(_opacity * 100);
    opSlider.addEventListener('input', e => {
      _opacity = e.target.value / 100;
      updateSliderTrack(e.target);
      GlobeBorders.setOpacity(_opacity);
    });

    _opacityWrap.appendChild(opLabel);
    _opacityWrap.appendChild(opSlider);

    const legendBtn = document.createElement('button');
    legendBtn.id = 'gb-legend-btn';
    legendBtn.textContent = '▾ legend';
    legendBtn.title = 'Border type legend';
    legendBtn.addEventListener('click', toggleLegend);

    container.appendChild(_toggleBtn);
    container.appendChild(_opacityWrap);
    container.appendChild(legendBtn);

    const toolbar = document.querySelector('#globe-toolbar, .globe-toolbar, #globe-controls, .globe-controls');
    if (toolbar) {
      toolbar.parentNode.insertBefore(container, toolbar.nextSibling);
    } else {
      const host = document.getElementById('globe-container') || document.body;
      host.appendChild(container);
    }
  }

  // ─── Build legend panel ──────────────────────────────────────────────────

  function buildLegend() {
    _legendPanel = document.createElement('div');
    _legendPanel.id = 'gb-legend';
    _legendPanel.innerHTML = `
      <h4>Border certainty</h4>
      <div class="gb-legend-row">
        <div class="gb-legend-line" style="background:#1a9a99;"></div>
        <div class="gb-legend-text">Confirmed
          <span class="gb-legend-sub">Documented, archaeological consensus</span>
        </div>
      </div>
      <div class="gb-legend-row">
        <div class="gb-legend-line" style="border-top:2px dashed #9a6e08;height:0;background:none;"></div>
        <div class="gb-legend-text">Estimated
          <span class="gb-legend-sub">Scholarly approximation, pre-500 BCE</span>
        </div>
      </div>
      <div class="gb-legend-row">
        <div class="gb-legend-line" style="border-top:2px dotted #8b41c8;height:0;background:none;"></div>
        <div class="gb-legend-text">Theorized
          <span class="gb-legend-sub">Alternative / disputed — community ranked</span>
        </div>
      </div>
      <div id="gb-active-list">
        <h5>Visible at this time</h5>
        <div id="gb-active-items"></div>
      </div>
    `;

    const wrap = document.getElementById('globe-wrapper') ||
                 document.getElementById('globe-container') || document.body;
    wrap.style.position = 'relative';
    wrap.appendChild(_legendPanel);
  }

  // ─── Active entity list ───────────────────────────────────────────────────

  function updateActiveLegend(year) {
    const listEl = document.getElementById('gb-active-items');
    if (!listEl) return;
    const active = GlobeBorders.getEntityAtYear(year);
    if (!active.length) {
      listEl.innerHTML = '<div class="gb-active-item" style="color:var(--text-secondary)">None</div>';
      return;
    }
    const DOT = { confirmed: '#1a9a99', estimated: '#9a6e08', theorized: '#8b41c8' };
    listEl.innerHTML = active.slice(0, 12).map(e =>
      `<div class="gb-active-item">
        <div class="gb-dot" style="background:${DOT[e.type]||'#445566'};opacity:${e.type==='theorized'?0.5:0.9};"></div>
        ${e.label}
      </div>`
    ).join('');
    if (active.length > 12) {
      listEl.innerHTML += `<div class="gb-active-item" style="color:var(--text-secondary)">+${active.length-12} more</div>`;
    }
  }

  // ─── Interaction ──────────────────────────────────────────────────────────

  function toggleBorders() {
    _bordersOn = !_bordersOn;
    GlobeBorders.setVisible(_bordersOn);
    _toggleBtn.classList.toggle('off', !_bordersOn);
    _opacityWrap.classList.toggle('hidden', !_bordersOn);
    if (!_bordersOn && _legendOpen) toggleLegend();
  }

  function toggleLegend() {
    _legendOpen = !_legendOpen;
    if (_legendPanel) _legendPanel.classList.toggle('open', _legendOpen);
    const btn = document.getElementById('gb-legend-btn');
    if (btn) btn.textContent = (_legendOpen ? '▴' : '▾') + ' legend';
    if (_legendOpen) updateActiveLegend(_yearGetter());
  }

  // ─── Year sync ────────────────────────────────────────────────────────────

  function onYearChange(year) {
    GlobeBorders.updateYear(year);
    if (_legendOpen) updateActiveLegend(year);
  }

  function hookYearEvents() {
    document.addEventListener('chronos-year-change', e => {
      if (e.detail && e.detail.year !== undefined) onYearChange(e.detail.year);
    });
    document.addEventListener('input', e => {
      if (e.target && e.target.id === 'epoch-scrubber') {
        const y = parseInt(e.target.value, 10);
        if (!isNaN(y)) onYearChange(y);
      }
    });
    document.addEventListener('chronos-glacial-start', () => GlobeBorders.setGlacialMode(true));
    document.addEventListener('chronos-glacial-end',   () => GlobeBorders.setGlacialMode(false));
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  function init() {
    GlobeBordersStyles.inject();
    buildControls();
    buildLegend();
    hookYearEvents();
    GlobeBorders.setOpacity(_opacity);
    console.log('GlobeBordersUI: initialised');
  }

  function setYearGetter(fn) { _yearGetter = fn; }

  return { init, setYearGetter, onYearChange };
})();

window.GlobeBordersUI = GlobeBordersUI;

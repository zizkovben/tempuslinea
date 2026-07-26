// globe-borders-ui.js
// CHRONOS Phase 6 — Dynamic Borders UI controls and legend
// Depends on: globe-borders.js, globe-borders-data.js, globe-borders-styles.js
// Exposes: window.GlobeBordersUI

const GlobeBordersUI = (() => {
  // ─── State ───────────────────────────────────────────────────────────────
  let _bordersOn  = true;
  // Was false — the "visible now" legend, which is the only thing that
  // actually explains what the border lines are, was hidden behind a
  // small toggle a first-time visitor had no reason to click. Opens by
  // default now; still collapsible via the legend button.
  let _legendOpen = true;
  let _opacity    = 0.85;
  let _yearGetter = () => 2024;

  // ─── DOM refs ────────────────────────────────────────────────────────────
  let _toggleBtn   = null;
  let _opacityWrap = null;
  let _legendPanel = null;
  let _toggleGroup = null;

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

    // Honest disclosure: only ~20 entities exist right now, concentrated
    // in the Old World. Without this, an empty region reads as "nothing
    // was here" rather than "not mapped yet" — worth a few characters of
    // permanent, low-key text rather than letting the overlay imply more
    // completeness than it has.
    const coverageTag = document.createElement('span');
    coverageTag.id = 'gb-coverage-tag';
    coverageTag.textContent = 'partial coverage · Old World';
    coverageTag.title = 'Border data currently covers a limited set of major Old World empires. ' +
      'Most regions and all modern nation-states are not yet mapped — a marker with no ' +
      'border line just means that entity hasn\'t been drawn yet, not that nothing was there.';
    coverageTag.style.cssText =
      'font-size:10px;letter-spacing:0.03em;color:rgba(200,215,220,0.55);' +
      'margin-left:8px;cursor:help;white-space:nowrap;align-self:center;';

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
    // Restyled from a plain text link ("▴/▾ legend") to a bordered pill
    // matching gb-toggle's visual language — was easy to miss as an
    // interactive control at all when it just looked like stray label
    // text. Icon-only now (caret), title attribute carries the label.
    legendBtn.textContent = _legendOpen ? '▴' : '▾';
    legendBtn.title = 'Legend — which empires are visible now';
    legendBtn.setAttribute('aria-label', 'Toggle legend');
    legendBtn.addEventListener('click', toggleLegend);

    // BORDERS + legend button now share one grouped cluster instead of
    // sitting at opposite ends of the control bar (BORDERS far left,
    // "legend" far right) — moved next to each other per owner feedback:
    // the legend toggle read as "lonely and disconnected" out on its own.
    // This group is also what the legend panel docks directly under (see
    // buildLegend()), so the button that opens the panel and the panel
    // itself are now both spatially and visually one unit.
    _toggleGroup = document.createElement('div');
    _toggleGroup.id = 'gb-toggle-group';
    _toggleGroup.appendChild(_toggleBtn);
    _toggleGroup.appendChild(legendBtn);

    container.appendChild(_toggleGroup);
    container.appendChild(coverageTag);
    container.appendChild(_opacityWrap);

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
    // "Border certainty" section (solid/dashed/dotted line-pattern legend)
    // removed this session — owner decision: certainty is the civ-marker
    // dots' job exclusively; border lines are pure empire-identity color
    // now, so a legend explaining a line-pattern system no longer applies.
    // Type legend (confirmed/theorized/debated) moved here from its old
    // standalone spot in the bottom-right corner of globe.html — owner
    // feedback: it explains the civ-marker dot colors that this same
    // panel's note already references, so it reads more clearly stacked
    // directly underneath the empire list than floating disconnected
    // elsewhere on the page. Same class names (.globe-legend /
    // .globe-legend-item / .globe-legend-dot) as before so any existing
    // styles.css rules for cosmetics (padding, font, dot shape) still
    // apply — only position/layout properties are overridden inline
    // below, since this instance now needs to sit inside a panel rather
    // than be independently absolute-positioned on the page.
    _legendPanel.innerHTML = `
      <h4>Empires visible now</h4>
      <div class="gb-legend-note">Color identifies which empire — certainty
        (confirmed / theorized / debated) is shown by the civ marker dots.
        Use the toggle to hide/show that empire's border.</div>
      <div id="gb-active-list">
        <div id="gb-active-items"></div>
      </div>
      <div class="globe-legend" id="gb-type-legend" style="position:static;
        top:auto;right:auto;bottom:auto;left:auto;display:flex;
        flex-direction:column;gap:6px;margin:10px 0 0;padding-top:10px;
        border-top:1px solid rgba(100,120,160,.15);">
        <div class="globe-legend-item">
          <div class="globe-legend-dot" style="background:#d4a017;"></div>
          <span style="color:rgba(230,195,80,.9);">CONFIRMED</span>
        </div>
        <div class="globe-legend-item">
          <div class="globe-legend-dot" style="background:#8b41c8;"></div>
          <span style="color:rgba(185,130,235,.9);">THEORIZED</span>
        </div>
        <div class="globe-legend-item">
          <div class="globe-legend-dot" style="background:#1a9a99;"></div>
          <span style="color:rgba(80,200,200,.9);">DEBATED</span>
        </div>
      </div>
    `;
    _legendPanel.querySelectorAll('.gb-legend-note').forEach(el => {
      el.style.cssText = 'font-size:10px;color:rgba(200,215,220,0.5);margin:2px 0 8px;line-height:1.4;';
    });

    // Docked directly under the BORDERS+legend button cluster (see the
    // _toggleGroup wrapper in buildControls()) rather than the whole
    // control bar — now that those two buttons sit next to each other,
    // the panel should hug that specific pair, not float under wherever
    // the opacity slider happens to end. A small connector arrow (added
    // via CSS, see globe-borders-styles.js) points from the panel back up
    // toward the legend button for extra visual continuity.
    _toggleGroup.style.position = 'relative';
    _toggleGroup.appendChild(_legendPanel);
    if (_legendOpen) _legendPanel.classList.add('open');

    // Delegated click handler for the per-empire opacity toggle in
    // updateActiveLegend() below — delegated because #gb-active-items is
    // rebuilt via innerHTML on every year change, so per-row listeners
    // would be lost each time; one listener on the stable parent survives
    // re-renders.
    //
    // Was a separate visible button next to the color dot (two dots per
    // row). Collapsed into the dot itself this session, per owner
    // feedback once the toggle was live and in use — the earlier
    // reasoning against overloading the dot (a first-time visitor has no
    // reason to expect a color swatch is clickable) was about *initial*
    // discoverability, not a permanent objection. Now that the feature is
    // established, an explicit off-state style (hollow ring instead of a
    // solid fill, see .gb-dot.off in globe-borders-styles.js) plus a
    // title/cursor still give a first-time visitor something to notice.
    _legendPanel.addEventListener('click', e => {
      const dot = e.target.closest('.gb-dot');
      if (dot && dot.dataset.entityId) {
        const id = dot.dataset.entityId;
        const isOn = GlobeBorders.getEntityOpacity(id) > 0;
        GlobeBorders.setEntityOpacity(id, isOn ? 0 : 1);
        updateActiveLegend(_yearGetter());
        return;
      }

      // Clicking the empire's name (not its dot) rotates the globe to
      // center on it — reads the entity's current-year polygon centroid
      // from GlobeBorders and hands it to GlobeEngine's generic
      // rotate-to-lat/lng, the same tween civ selection uses.
      const label = e.target.closest('.gb-label');
      if (label && label.dataset.entityId) {
        const center = GlobeBorders.getEntityCenter(label.dataset.entityId, _yearGetter());
        if (center && window.GlobeEngine && typeof GlobeEngine.rotateToLatLng === 'function') {
          GlobeEngine.rotateToLatLng(center.lat, center.lng);
        }
      }
    });
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
    listEl.innerHTML = active.slice(0, 12).map(e => {
      const isOn = GlobeBorders.getEntityOpacity(e.id) > 0;
      // Single dot now doubles as the toggle — a real <button> for
      // accessibility/semantics, styled as a filled circle when on and a
      // hollow ring when off, colored by empire identity either way.
      const dimForType = e.type === 'theorized' ? 0.6 : 0.95;
      // Label is now its own clickable span, separate from the dot —
      // the dot keeps its existing job (show/hide toggle), clicking the
      // name spins the globe to center on that empire. Kept as two
      // distinct targets rather than overloading one control with two
      // behaviors again, the same reasoning that led to giving the dot
      // its own single job when it was split from the old two-dot row.
      return `<div class="gb-active-item">
        <button class="gb-dot ${isOn ? 'on' : 'off'}" data-entity-id="${e.id}"
          style="${isOn ? `background:${e.color};opacity:${dimForType};` : `border-color:${e.color};`}"
          title="${isOn ? 'Hide' : 'Show'} ${e.label}'s border" aria-pressed="${isOn}"></button>
        <span class="gb-label" data-entity-id="${e.id}" title="Rotate globe to ${e.label}"
          style="cursor:pointer;">${e.label}</span>
      </div>`;
    }).join('');
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
    if (btn) {
      btn.textContent = _legendOpen ? '▴' : '▾';
      btn.setAttribute('aria-pressed', _legendOpen);
    }
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

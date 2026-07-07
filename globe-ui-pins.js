/* ============================================================
   CHRONOS · globe-ui-pins.js
   Split out of globe-ui.js (Bible v23 line-count cleanup) — both
   files were over the ~300-line soft limit; this is a fully
   self-contained module with no dependency on globe-ui.js's other
   internals, making it a clean extraction point.

   Pin panel: shown for Type B (debated location) and Type C
   (heat-map-only) civs. Renders all seed + user pins with voting
   and the "add your own theory" form. Unrelated to the shared
   ChronosUI side panel — this is the Living Atlas–specific
   location-theories panel that opens alongside it.

   Depends on: data.js, data-extended.js (CIV_META), globe-pins.js
   (GlobePins data layer), globe.js (GlobeEngine).
   Exposes: GlobePinPanel (global)

   Must load AFTER globe-pins.js and BEFORE globe-ui.js in the
   script order, since globe-ui.js's init() calls
   GlobePinPanel.init() and passes GlobePinPanel.onPinClick as a
   callback into GlobeEngine.init().
   ============================================================ */

window.GlobePinPanel = (() => {

  let _activePinCivId = null;
  let _pinVotes = {};   // pinId → 'up'|'dn'

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    const closeBtn = document.getElementById('pin-panel-close');
    if (closeBtn) closeBtn.addEventListener('click', hidePinPanel);

    const submitBtn = document.getElementById('pin-submit-btn');
    if (submitBtn) submitBtn.addEventListener('click', _handlePinSubmit);

    // Listen for pin-placed events from GlobeEngine click in pin-place mode
    document.addEventListener('pin-placed', e => {
      const coord = document.getElementById('pin-coord-display');
      if (coord) {
        const d = e.detail;
        coord.textContent = `${d.lat > 0 ? d.lat+'°N' : Math.abs(d.lat)+'°S'}  ` +
                            `${d.lng > 0 ? d.lng+'°E' : Math.abs(d.lng)+'°W'}`;
        coord.style.color = 'var(--teal-text)';
      }
    });
  }

  function showPinPanel(civId) {
    _activePinCivId = civId;
    const panel = document.getElementById('pin-panel');
    const inner = document.getElementById('pin-panel-inner');
    if (!panel || !inner) return;

    const civ  = CIVS.find(c => c.id === civId);
    const pins = window.GlobePins ? GlobePins.getPinsForCiv(civId) : [];
    const meta = (window.CIV_META && window.CIV_META[civId]) || {};
    const locType = meta.locationType || 'A';

    // Reset form
    const theoryInput = document.getElementById('pin-theory-input');
    const sourceInput = document.getElementById('pin-source-input');
    const coordDisp   = document.getElementById('pin-coord-display');
    if (theoryInput) theoryInput.value = '';
    if (sourceInput) sourceInput.value = '';
    if (coordDisp)   { coordDisp.textContent = 'NO LOCATION SET'; coordDisp.style.color = ''; }
    GlobeEngine.clearPendingPin();

    // Header label
    const typeLabel = locType === 'C'
      ? 'HEAT MAP — NO CONFIRMED LOCATION'
      : 'DEBATED LOCATION — COMPETING PROPOSALS';

    inner.innerHTML = '';

    if (!pins.length) {
      inner.innerHTML = `<div style="font-size:10px;color:var(--text-dim);
        padding:10px 0;">No location theories yet. Be the first to propose one.</div>`;
    } else {
      pins.forEach(pin => {
        const v       = _pinVotes[pin.id] || null;
        const upCount = pin.up + (v === 'up' ? 1 : 0);
        const dnCount = pin.dn + (v === 'dn' ? 1 : 0);
        const total   = upCount + dnCount;
        const pct     = total > 0 ? Math.round((upCount / total) * 100) : 50;

        const item = document.createElement('div');
        item.className = 'pin-item';
        item.innerHTML = `
          ${pin.isResearcherPin ? `
            <div class="pin-researcher">◈ ${pin.researcher || 'Researcher'}</div>` : ''}
          <div class="pin-label">${pin.label}</div>
          <div style="font-size:9px;color:var(--text-dim);line-height:1.6;
               margin-bottom:5px;max-height:52px;overflow:hidden;">
            ${pin.theory ? pin.theory.substring(0, 160) + (pin.theory.length > 160 ? '…' : '') : ''}
          </div>
          ${pin.source ? `<div style="font-size:8px;color:#2a5070;
            letter-spacing:.5px;margin-bottom:5px;">SOURCE: ${pin.source.substring(0,80)}</div>` : ''}
          <div class="pin-votes">
            <button class="pin-vote-btn ${v==='up'?'voted-up':''}"
              data-pin-id="${pin.id}" data-dir="up">▲ ${upCount}</button>
            <button class="pin-vote-btn ${v==='dn'?'voted-dn':''}"
              data-pin-id="${pin.id}" data-dir="dn">▼ ${dnCount}</button>
            <div style="flex:1;height:2px;background:rgba(15,50,80,.4);
                 border-radius:1px;overflow:hidden;">
              <div style="width:${pct}%;height:100%;
                   background:var(--teal);"></div>
            </div>
          </div>`;
        inner.appendChild(item);
      });

      // Wire vote buttons
      inner.querySelectorAll('.pin-vote-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const pinId = parseInt(btn.dataset.pinId, 10);
          const dir   = btn.dataset.dir;
          if (_pinVotes[pinId]) return;   // one vote per session
          _pinVotes[pinId] = dir;
          if (window.GlobePins) GlobePins.votePin(pinId, dir);
          showPinPanel(civId);            // re-render with updated count
        });
      });
    }

    // Show/hide add form based on locType
    const form = document.getElementById('pin-add-form');
    if (form) form.style.display = (locType === 'C' || locType === 'B') ? 'block' : 'none';

    panel.classList.add('visible');

    // Enable pin-place mode on the globe
    GlobeEngine.setPinPlaceMode(true);
  }

  function hidePinPanel() {
    const panel = document.getElementById('pin-panel');
    if (panel) panel.classList.remove('visible');
    GlobeEngine.setPinPlaceMode(false);
    _activePinCivId = null;
  }

  function _handlePinSubmit() {
    if (!_activePinCivId) return;
    const pending = GlobeEngine.getPendingPin();
    if (!pending) {
      alert('Click the globe to place your pin location first.');
      return;
    }
    const theory = (document.getElementById('pin-theory-input') || {}).value || '';
    const source = (document.getElementById('pin-source-input') || {}).value || '';
    if (!theory.trim()) {
      alert('Please describe your location theory before submitting.');
      return;
    }
    if (window.GlobePins) {
      GlobePins.addUserPin(_activePinCivId, pending.lat, pending.lng, theory, source);
      GlobeEngine.clearPendingPin();
      GlobeEngine.loadCivPins(_activePinCivId);
      showPinPanel(_activePinCivId);   // refresh list
    }
  }

  function onPinClick(pin) {
    // A pin dot was clicked on the globe — highlight it in the panel
    const panel = document.getElementById('pin-panel');
    if (panel && !panel.classList.contains('visible') && _activePinCivId) {
      showPinPanel(_activePinCivId);
    }
  }

  return { init, showPinPanel, hidePinPanel, onPinClick };

})();

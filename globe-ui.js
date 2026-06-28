/* ============================================================
   CHRONOS · globe-ui.js  (Phase 2b updated)
   Globe UI: epoch scrubber, info panel, tooltip, controls.
   Phase 2b adds: YD boundary detection, GlobeTerrain morph
   calls, earth-state-indicator badge, sea level label.
   Depends on: data.js, globe-data.js, globe-terrain.js, globe.js
   Exposes: GlobeUI (global)
   ============================================================ */

window.GlobeUI = (() => {

  // ── STATE ─────────────────────────────────────────────────
  let currentSnapshotIdx = 4;   // default: Classical World (~500 BCE)
  let isRotating         = true;

  // YD boundary: crossing year -10800 triggers morph
  const YD_BOUNDARY = -10800;

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    buildEpochScrubber();
    buildInfoPanel();
    buildTooltip();
    buildControls();
    buildPinPanel();

    GlobeEngine.init('globe-container', onCivSelect, onCivHover, onPinClick);
    loadSnapshot(currentSnapshotIdx);
  }

  // ── EPOCH SCRUBBER ────────────────────────────────────────
  function buildEpochScrubber() {
    const el = document.getElementById('epoch-scrubber');
    if (!el) return;
    const snaps = GLOBE_DATA.EPOCH_SNAPSHOTS;
    el.innerHTML = '';
    snaps.forEach((snap, i) => {
      const btn = document.createElement('button');
      btn.className   = 'epoch-btn' + (i === currentSnapshotIdx ? ' active' : '');
      btn.dataset.idx = i;
      btn.innerHTML   = `
        <span class="epoch-year">${formatYear(snap.year)}</span>
        <span class="epoch-label">${snap.label}</span>
      `;
      btn.addEventListener('click', () => loadSnapshot(i));
      el.appendChild(btn);
    });
    updateTrackProgress();
  }

  // ── LOAD SNAPSHOT ─────────────────────────────────────────
  function loadSnapshot(idx) {
    const prevIdx  = currentSnapshotIdx;
    const prevSnap = GLOBE_DATA.EPOCH_SNAPSHOTS[prevIdx];
    const snap     = GLOBE_DATA.EPOCH_SNAPSHOTS[idx];
    currentSnapshotIdx = idx;

    // ── YD boundary detection ──────────────────────────────
    // Did we cross the -10800 BCE line between prev and new epoch?
    const prevYear = prevSnap ? prevSnap.year : 0;
    const newYear  = snap.year;
    const crossedYD = (prevYear > YD_BOUNDARY && newYear <= YD_BOUNDARY) ||
                      (prevYear <= YD_BOUNDARY && newYear > YD_BOUNDARY);

    if (crossedYD && window.GlobeTerrain) {
      // Fire the vignette flash event for globe.html to catch
      document.dispatchEvent(new CustomEvent('yd-crossing'));
      _triggerYDTransition(newYear <= YD_BOUNDARY);
    } else if (window.GlobeTerrain) {
      // Instant state set — no animation (same side of boundary)
      const isGlacial = newYear <= YD_BOUNDARY;
      GlobeTerrain.setEarthState(isGlacial ? 'glacial' : 'holocene');
      _updateStateIndicator(isGlacial ? 'glacial' : 'holocene');
    }

    // Update button states
    document.querySelectorAll('.epoch-btn').forEach((b, i) =>
      b.classList.toggle('active', i === idx)
    );

    // Update description
    const desc = document.getElementById('epoch-desc');
    if (desc) {
      desc.style.opacity = 0;
      setTimeout(() => {
        desc.innerHTML = `
          <span class="epoch-year-lg">${formatYear(snap.year)}</span>
          <span class="epoch-desc-text">${snap.desc}</span>
        `;
        desc.style.opacity = 1;
      }, 200);
    }

    updateTrackProgress();
    GlobeEngine.loadEpoch(snap.key);
    hideInfo();

    // Update civ count badge
    const badge = document.getElementById('globe-badge');
    if (badge) {
      const civs = GLOBE_DATA.getSnapshotCivs(snap);
      badge.textContent = `${civs.length} CIVILIZATIONS · ${snap.label.toUpperCase()}`;
    }
  }

  // ── YD TRANSITION SEQUENCE ────────────────────────────────
  // Follows the spec in Bible §25 — timed sequence of state changes
  function _triggerYDTransition(toGlacial) {
    const indicator = document.getElementById('earth-state-indicator');
    const rotBtn    = document.getElementById('btn-autorotate');

    // t=0: badge → MORPHING
    _updateStateIndicator('morphing');

    // t=0.1s: pause auto-rotate
    setTimeout(() => {
      GlobeEngine.setAutoRotate(false);
      if (rotBtn) {
        rotBtn.textContent = '⟳ AUTO-ROTATE OFF';
        rotBtn.classList.remove('active');
      }
      isRotating = false;
    }, 100);

    // t=0.2s: sea level label appears
    setTimeout(() => {
      if (indicator) {
        const seaLabel = indicator.querySelector('.sea-label');
        if (seaLabel) {
          seaLabel.textContent = toGlacial ? 'SEA LEVEL DROPPING…' : 'SEA LEVEL RISING…';
          seaLabel.style.opacity = 1;
        }
      }
    }, 200);

    // t=0.3s: start the actual morph
    setTimeout(() => {
      if (window.GlobeTerrain) {
        if (toGlacial) {
          GlobeTerrain.morphToGlacial(2000);
        } else {
          GlobeTerrain.morphToHolocene(2000);
        }
        // Register completion callback
        GlobeTerrain.onMorphComplete(state => {
          _onMorphComplete(state);
        });
      }
    }, 300);
  }

  // ── MORPH COMPLETE CALLBACK ───────────────────────────────
  function _onMorphComplete(state) {
    const rotBtn = document.getElementById('btn-autorotate');
    _updateStateIndicator(state);

    // Resume auto-rotate
    setTimeout(() => {
      GlobeEngine.setAutoRotate(true);
      isRotating = true;
      if (rotBtn) {
        rotBtn.textContent = '⟳ AUTO-ROTATE ON';
        rotBtn.classList.add('active');
      }
    }, 100);
  }

  // ── STATE INDICATOR UPDATE ────────────────────────────────
  function _updateStateIndicator(state, forceGlacial) {
    const el = document.getElementById('earth-state-indicator');
    if (!el) return;

    // Determine from GlobeTerrain if available
    const currentState = window.GlobeTerrain
      ? GlobeTerrain.getCurrentState()
      : (forceGlacial ? 'glacial' : 'holocene');

    const resolvedState = state || currentState;

    el.className = 'earth-state ' + resolvedState;

    const labelEl   = el.querySelector('.state-label');
    const seaLabel  = el.querySelector('.sea-label');

    if (resolvedState === 'glacial') {
      if (labelEl)  labelEl.textContent  = 'GLACIAL EARTH';
      if (seaLabel) {
        seaLabel.textContent = 'SEA LEVEL −120m';
        seaLabel.style.opacity = 1;
      }
    } else if (resolvedState === 'morphing') {
      if (labelEl)  labelEl.textContent  = 'MORPHING…';
      if (seaLabel) seaLabel.style.opacity = 0.7;
    } else {
      if (labelEl)  labelEl.textContent  = 'HOLOCENE EARTH';
      if (seaLabel) {
        seaLabel.textContent = 'SEA LEVEL ±0m';
        seaLabel.style.opacity = 0;
      }
    }
  }

  function updateTrackProgress() {
    const track = document.getElementById('scrubber-track-fill');
    if (!track) return;
    const pct = (currentSnapshotIdx / (GLOBE_DATA.EPOCH_SNAPSHOTS.length - 1)) * 100;
    track.style.width = pct + '%';
  }

  // ── KEYBOARD NAV ──────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      loadSnapshot(Math.min(currentSnapshotIdx + 1, GLOBE_DATA.EPOCH_SNAPSHOTS.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      loadSnapshot(Math.max(currentSnapshotIdx - 1, 0));
    }
  });

  // ── CIV INFO PANEL ────────────────────────────────────────
  function buildInfoPanel() {
    const close = document.getElementById('globe-info-close');
    if (close) close.addEventListener('click', hideInfo);
  }

  function onCivSelect(civ) {
    if (!civ) return;
    GlobeEngine.highlightCiv(civ.id);
    showInfo(civ);

    // Type B or C → also open pin panel
    const meta    = (window.CIV_META && window.CIV_META[civ.id]) || {};
    const locType = meta.locationType || 'A';
    if (locType === 'B' || locType === 'C') {
      GlobeEngine.loadCivPins(civ.id);
      showPinPanel(civ.id);
    } else {
      hidePinPanel();
    }
  }

  function onCivHover(civ) {
    const tt = document.getElementById('globe-tooltip');
    if (!tt) return;
    if (!civ) { tt.style.opacity = 0; return; }
    tt.textContent  = civ.n;
    tt.style.opacity = 1;
  }

  function showInfo(civ) {
    const panel = document.getElementById('globe-info-panel');
    const inner = document.getElementById('globe-info-inner');
    if (!panel || !inner) return;
    const tc  = { confirmed:'#c09010', theorized:'#9a60c0', debated:'#3aabb0' }[civ.t];
    const dur = Math.abs(civ.e - civ.s);
    inner.innerHTML = `
      <div style="margin-bottom:12px;">
        <div style="font-size:9px;letter-spacing:2px;color:${tc};margin-bottom:4px;">
          ◈ ${civ.t.toUpperCase()} · ${civ.r}</div>
        <div style="font-family:'Cinzel',serif;font-size:17px;color:${tc};
             font-weight:700;letter-spacing:2px;margin-bottom:4px;">${civ.n}</div>
        <div style="font-size:10px;color:#445566;letter-spacing:.5px;margin-bottom:10px;">
          ${formatYear(civ.s)} → ${formatYear(civ.e)}
          <span style="color:#1a3040;margin-left:8px;">(${dur.toLocaleString()} years)</span>
        </div>
        ${civ.lang && civ.lang !== 'unknown' ? `
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px;">
          <div style="font-size:9px;letter-spacing:1px;">
            <span style="color:#1a3040;">LANG · </span>
            <span style="color:#4a8ab8;">${civ.lang.replace(/-/g,' ').toUpperCase()}</span>
          </div>
          ${civ.gov && civ.gov !== 'unknown' ? `
          <div style="font-size:9px;letter-spacing:1px;">
            <span style="color:#1a3040;">GOV · </span>
            <span style="color:#4a8ab8;">${civ.gov.toUpperCase()}</span>
          </div>` : ''}
        </div>` : ''}
        <p style="font-size:11px;color:#4a6080;line-height:1.8;margin:0;">${civ.d}</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;
           padding-top:10px;border-top:1px solid rgba(12,35,80,.3);">
        <div style="font-size:9px;color:#1a3040;letter-spacing:1px;">
          ▲ ${civ.up.toLocaleString()} · ▼ ${civ.dn.toLocaleString()}</div>
        <a href="index.html" style="font-size:9px;color:#3aabb0;text-decoration:none;
           letter-spacing:1px;border:1px solid rgba(58,171,176,.3);padding:4px 10px;
           border-radius:3px;">VIEW ON TIMELINE →</a>
      </div>`;
    panel.classList.add('visible');
  }

  function hideInfo() {
    const panel = document.getElementById('globe-info-panel');
    if (panel) panel.classList.remove('visible');
    hidePinPanel();
  }

  // ── TOOLTIP ───────────────────────────────────────────────
  function buildTooltip() {
    document.addEventListener('mousemove', e => {
      const tt = document.getElementById('globe-tooltip');
      if (tt && parseFloat(tt.style.opacity) > 0) {
        tt.style.left = (e.clientX + 14) + 'px';
        tt.style.top  = (e.clientY - 8)  + 'px';
      }
    });
  }

  // ── CONTROLS ─────────────────────────────────────────────
  function buildControls() {
    const rotBtn = document.getElementById('btn-autorotate');
    if (rotBtn) {
      rotBtn.addEventListener('click', () => {
        isRotating = !isRotating;
        GlobeEngine.setAutoRotate(isRotating);
        rotBtn.textContent = isRotating ? '⟳ AUTO-ROTATE ON' : '⟳ AUTO-ROTATE OFF';
        rotBtn.classList.toggle('active', isRotating);
      });
    }
    const prevBtn = document.getElementById('btn-epoch-prev');
    const nextBtn = document.getElementById('btn-epoch-next');
    if (prevBtn) prevBtn.addEventListener('click', () =>
      loadSnapshot(Math.max(currentSnapshotIdx - 1, 0)));
    if (nextBtn) nextBtn.addEventListener('click', () =>
      loadSnapshot(Math.min(currentSnapshotIdx + 1, GLOBE_DATA.EPOCH_SNAPSHOTS.length - 1)));
  }

  // ── FORMAT YEAR ──────────────────────────────────────────
  function formatYear(y) {
    if (y === 0) return '1 CE';
    return y < 0
      ? Math.abs(y).toLocaleString() + ' BCE'
      : y.toLocaleString() + ' CE';
  }

  // ── PIN PANEL ─────────────────────────────────────────────
  // Shown for Type B (debated location) and Type C (user-mapped) civs.
  // Renders all seed + user pins with voting and the add-pin form.

  let _activePinCivId = null;
  let _pinVotes = {};   // pinId → 'up'|'dn'

  function buildPinPanel() {
    const closeBtn = document.getElementById('pin-panel-close');
    if (closeBtn) closeBtn.addEventListener('click', hidePinPanel);

    // Submit button
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

  return { init, loadSnapshot, showInfo, hideInfo, showPinPanel, hidePinPanel };

})();

document.addEventListener('DOMContentLoaded', GlobeUI.init);

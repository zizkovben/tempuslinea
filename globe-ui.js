/* ============================================================
   CHRONOS · globe-ui.js  (Phase 2b updated)
   Globe UI: epoch scrubber, info panel, tooltip, controls.
   Phase 2b adds: YD boundary detection, GlobeTerrain morph
   calls, earth-state-indicator badge, sea level label.
   Globe side panel phase: civ-click now opens the shared
   ChronosUI right-edge side panel (same as Timeline) instead of
   the old bespoke #globe-info-panel, which has been retired.
   Line-count cleanup: the pin panel (location theories for Type
   B/C civs) has been extracted to globe-ui-pins.js — this file
   now delegates to GlobePinPanel for all of that. Behaviour is
   unchanged; only the file the code lives in has moved.
   Depends on: data.js, globe-data.js, globe-terrain.js, globe.js,
   globe-ui-pins.js, ui.js
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
    buildTooltip();
    buildControls();
    GlobePinPanel.init();

    GlobeEngine.init('globe-container', onCivSelect, onCivHover, GlobePinPanel.onPinClick);
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

    // Border sync — tell globe-borders-ui.js the year changed
    document.dispatchEvent(new CustomEvent('chronos-year-change', { detail: { year: snap.year } }));

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

    // Border sync — glacial-era borders differ; skip during transient 'morphing'
    if (resolvedState === 'glacial') {
      document.dispatchEvent(new CustomEvent('chronos-glacial-start'));
    } else if (resolvedState === 'holocene') {
      document.dispatchEvent(new CustomEvent('chronos-glacial-end'));
    }

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
  // Opens the shared ChronosUI right-edge side panel — same panel,
  // same cross-links, same behaviour as the timeline.

  function onCivSelect(civ) {
    if (!civ) return;
    GlobeEngine.highlightCiv(civ.id);
    if (window.ChronosUI) ChronosUI.showInfo(civ, ChronosUI.getVotes());

    // Type B or C → also open pin panel
    const meta    = (window.CIV_META && window.CIV_META[civ.id]) || {};
    const locType = meta.locationType || 'A';
    if (locType === 'B' || locType === 'C') {
      GlobeEngine.loadCivPins(civ.id);
      GlobePinPanel.showPinPanel(civ.id);
    } else {
      GlobePinPanel.hidePinPanel();
    }
  }

  function onCivHover(civ) {
    const tt = document.getElementById('globe-tooltip');
    if (!tt) return;
    if (!civ) { tt.style.opacity = 0; return; }
    tt.textContent  = civ.n;
    tt.style.opacity = 1;
  }

  function hideInfo() {
    if (window.ChronosUI) ChronosUI.hideInfo();
    GlobePinPanel.hidePinPanel();
    document.dispatchEvent(new CustomEvent('chronos-civ-deselected'));
  }

  // ── CURRENT YEAR (for globe-borders-init.js's year-getter hookup) ──
  function getCurrentYear() {
    const snap = GLOBE_DATA.EPOCH_SNAPSHOTS[currentSnapshotIdx];
    return snap ? snap.year : 0;
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
  // Moved to globe-ui-pins.js (GlobePinPanel) — see file header.

  return {
    init, loadSnapshot, hideInfo, getCurrentYear,
    // Backward-compatible facade: anything still calling
    // GlobeUI.showPinPanel / GlobeUI.hidePinPanel directly keeps working.
    showPinPanel: (civId) => GlobePinPanel.showPinPanel(civId),
    hidePinPanel: () => GlobePinPanel.hidePinPanel(),
  };

})();

document.addEventListener('DOMContentLoaded', GlobeUI.init);

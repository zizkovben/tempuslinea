// astrolabe-ui.js
// CHRONOS — Astrolabe Navigator, page-level wiring
// Depends on: data.js, astrolabe-rings.js, ui.js (optional — degrades
// gracefully if ChronosUI isn't present, same defensive pattern used
// throughout the border system)
// Exposes: window.AstrolabeUI

const AstrolabeUI = (() => {

  function updateReadout(year, epoch) {
    const el = document.getElementById('astrolabe-readout');
    if (!el) return;
    const y = Math.round(year);
    const label = y === 0 ? '1 CE' : (y < 0 ? Math.abs(y).toLocaleString() + ' BCE'
                                              : y.toLocaleString() + ' CE');
    el.textContent = `${epoch.n} · ${label}`;
  }

  function handleCivSelect(civ, openPanel) {
    if (!openPanel) return; // ring click just selects/highlights — hub click opens
    if (window.ChronosUI && typeof ChronosUI.showInfo === 'function') {
      const votes = (window.TimelineEngine && typeof TimelineEngine.getVotes === 'function')
        ? TimelineEngine.getVotes() : {};
      ChronosUI.showInfo(civ, votes);
    } else {
      console.warn('AstrolabeUI: ChronosUI not found — expected ui.js to expose ' +
        'window.ChronosUI.showInfo(). The ring selection still works, just no side panel.');
    }
  }

  function init() {
    if (typeof CIVS === 'undefined' || typeof EPOCHS === 'undefined') {
      console.error('AstrolabeUI: CIVS/EPOCHS not found — data.js must load before this file.');
      return;
    }
    AstrolabeRings.init('astrolabe-svg', {
      onCivSelect: handleCivSelect,
      onYearChange: updateReadout
    });

    const zoomInBtn = document.getElementById('astrolabe-zoom-in');
    const zoomOutBtn = document.getElementById('astrolabe-zoom-out');
    const resetBtn = document.getElementById('astrolabe-reset');
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => AstrolabeRings.zoomBy(0.12));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => AstrolabeRings.zoomBy(-0.12));
    if (resetBtn) resetBtn.addEventListener('click', () => AstrolabeRings.reset());
  }

  return { init };
})();

window.AstrolabeUI = AstrolabeUI;
document.addEventListener('DOMContentLoaded', AstrolabeUI.init);

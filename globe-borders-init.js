// globe-borders-init.js
// CHRONOS Phase 6 — Borders integration shim
// This file wires GlobeBorders into the existing globe engine
// WITHOUT requiring any changes to globe.js.
//
// Load order: after globe-ui.js, before celestial-data.js
// Add this single script tag to globe.html after globe-ui.js:
//   <script src="globe-borders-init.js"></script>

(function() {
  function initBorders() {
    // Wait until Three.js scene is available via GlobeEngine
    // GlobeEngine exposes its scene via GlobeEngine._scene or the init callback
    // We poll briefly on startup then hand off to event-driven updates

    let attempts = 0;
    const MAX_ATTEMPTS = 40; // 4 seconds max wait

    function tryInit() {
      // Check for scene — GlobeEngine may expose it differently per implementation
      // Try common patterns
      const scene = (window.GlobeEngine && window.GlobeEngine._scene) ||
                    (window._chronosScene) ||
                    null;

      // Also check if Three.js is loaded
      if (!window.THREE) {
        if (++attempts < MAX_ATTEMPTS) { setTimeout(tryInit, 100); return; }
        console.warn('GlobeBordersInit: THREE.js not found after 4s — aborting');
        return;
      }

      if (!scene) {
        if (++attempts < MAX_ATTEMPTS) { setTimeout(tryInit, 100); return; }
        // Fallback: create a deferred init that globe.js triggers via event
        console.warn('GlobeBordersInit: scene not found via GlobeEngine — waiting for chronos-scene-ready event');
        document.addEventListener('chronos-scene-ready', e => {
          if (e.detail && e.detail.scene) {
            finishInit(e.detail.scene, e.detail.radius || 1.0);
          }
        }, { once: true });
        return;
      }

      const radius = (window.GlobeEngine && window.GlobeEngine._radius) || 1.0;
      finishInit(scene, radius);
    }

    function finishInit(scene, radius) {
      // Initialise the border renderer
      GlobeBorders.init(scene, radius);

      // Initialise the UI controls
      GlobeBordersUI.init();

      // Hook year getter to GlobeUI if available
      if (window.GlobeUI && typeof GlobeUI.getCurrentYear === 'function') {
        GlobeBordersUI.setYearGetter(GlobeUI.getCurrentYear);
      }

      // Hook civ selection for border highlighting
      // GlobeEngine fires 'chronos-civ-selected' with { detail: { civ } }
      document.addEventListener('chronos-civ-selected', e => {
        if (e.detail && e.detail.civ) {
          GlobeBorders.highlightCiv(e.detail.civ.id);
        } else {
          GlobeBorders.clearHighlight();
        }
      });

      // Hook deselect
      document.addEventListener('chronos-civ-deselected', () => {
        GlobeBorders.clearHighlight();
      });

      console.log('GlobeBordersInit: borders fully wired into globe engine');
    }

    tryInit();
  }

  // Run after all scripts have loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBorders);
  } else {
    initBorders();
  }
})();

/* ============================================================
   CHRONOS · mobile-nav.js
   Mobile chrome controller — hamburger/drawer/scrim, zoom stack,
   epoch pill, and (on pages that have one) the search overlay.
   Built against the owner-approved mobile-ui-mockup.html reference.
   Page-agnostic, same pattern as ui.js: every element lookup is
   guarded, so this one file works on both index.html and globe.html
   without branching on which page it's running on. Depends on
   nothing except whichever of TimelineEngine / GlobeEngine happens
   to already be loaded on the page — both calls are optional.
   Phase 1 of the mobile overhaul: Timeline + Living Atlas only.
   ============================================================ */

window.MobileNav = (() => {

  let epochPollId = null;

  // ── DRAWER + SCRIM ────────────────────────────────────────
  function _wireDrawer() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer  = document.getElementById('mobile-nav-drawer');
    const scrim   = document.getElementById('mobile-scrim');
    if (!menuBtn || !drawer || !scrim) return;

    function closeDrawer() {
      drawer.classList.remove('open');
      scrim.classList.remove('show');
    }

    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      scrim.classList.toggle('show');
    });
    scrim.addEventListener('click', () => {
      closeDrawer();
      // The scrim also sits behind the search overlay and (via
      // info-panel-backdrop, wired separately in each page) the
      // bottom sheet, so a tap outside any of them should dismiss
      // whichever is open rather than just the drawer.
      const search = document.getElementById('mobile-search-overlay');
      if (search) search.classList.remove('open');
    });
  }

  // ── SEARCH OVERLAY (Timeline only — Globe's search is a disabled
  // Phase-3 placeholder on desktop too, so no overlay is wired there
  // unless the page provides the markup) ───────────────────────
  function _wireSearch() {
    const btn     = document.getElementById('mobile-search-btn');
    const overlay = document.getElementById('mobile-search-overlay');
    const input   = document.getElementById('mobile-search-input');
    const desktopBox = document.getElementById('search-box');
    if (!btn || !overlay || !input) return;

    btn.addEventListener('click', () => {
      overlay.classList.toggle('open');
      if (overlay.classList.contains('open')) setTimeout(() => input.focus(), 50);
    });

    // Mirror into the existing #search-box so filters.js's own
    // 'input' listener (already wired there) does the actual work —
    // no search logic is duplicated here.
    input.addEventListener('input', () => {
      if (!desktopBox) return;
      desktopBox.value = input.value;
      desktopBox.dispatchEvent(new Event('input'));
    });
  }

  // ── ZOOM STACK (+/-) ──────────────────────────────────────
  function _wireZoom() {
    const inBtn  = document.getElementById('mobile-zoom-in');
    const outBtn = document.getElementById('mobile-zoom-out');
    if (!inBtn || !outBtn) return;

    const engine = window.TimelineEngine || window.GlobeEngine;
    if (!engine || !engine.zoomStep) return;

    inBtn.addEventListener('click', () => engine.zoomStep('in'));
    outBtn.addEventListener('click', () => engine.zoomStep('out'));
  }

  // ── EPOCH PILL ────────────────────────────────────────────
  // Polled rather than event-driven: Timeline's view changes on
  // every drag/pinch/wheel frame and Globe's epoch label is owned
  // by globe-ui.js's own scrubber code, so polling is the one hook
  // that doesn't require wiring into either page's render loop.
  function _wireEpochPill() {
    const pill = document.getElementById('mobile-epoch-pill');
    if (!pill) return;

    epochPollId = setInterval(() => {
      if (window.TimelineEngine && TimelineEngine.getViewCenterLabel) {
        pill.textContent = TimelineEngine.getViewCenterLabel();
      } else {
        const live = document.querySelector('.epoch-year-lg');
        if (live) pill.textContent = live.textContent;
      }
    }, 250);
  }

  function init() {
    _wireDrawer();
    _wireSearch();
    _wireZoom();
    _wireEpochPill();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => MobileNav.init());

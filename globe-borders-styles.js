// globe-borders-styles.js
// CHRONOS Phase 6 — Border UI styles injection
// Depends on: nothing
// Exposes: window.GlobeBordersStyles (called by GlobeBordersUI.init)
// Load order: before globe-borders-ui.js

const GlobeBordersStyles = (() => {
  function inject() {
    if (document.getElementById('gb-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'gb-ui-styles';
    style.textContent = `
      #gb-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: var(--bg-panel, #0a0d18);
        border: 1px solid rgba(100,120,160,0.15);
        border-radius: 8px;
        margin-top: 8px;
      }
      #gb-toggle-group {
        display: flex;
        align-items: stretch;
      }
      #gb-toggle {
        font-family: var(--font-mono, monospace);
        font-size: 11px;
        letter-spacing: 0.08em;
        color: var(--teal-hi, #1a9a99);
        background: transparent;
        border: 1px solid var(--teal, #0c6a69);
        border-radius: 5px 0 0 5px;
        border-right: none;
        padding: 4px 10px;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        white-space: nowrap;
      }
      #gb-toggle.off {
        color: var(--text-secondary, #445566);
        border-color: rgba(100,120,160,0.2);
      }
      #gb-toggle:hover { background: rgba(26,154,153,0.1); }
      #gb-opacity-wrap {
        display: flex;
        align-items: center;
        gap: 6px;
        transition: opacity 0.3s;
      }
      #gb-opacity-wrap.hidden { opacity: 0; pointer-events: none; }
      #gb-opacity-label {
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        color: var(--text-secondary, #445566);
        white-space: nowrap;
      }
      #gb-opacity {
        -webkit-appearance: none;
        width: 72px;
        height: 3px;
        border-radius: 2px;
        background: linear-gradient(to right, var(--teal,#0c6a69) 0%, var(--teal,#0c6a69) 85%, rgba(100,120,160,0.2) 85%);
        outline: none;
        cursor: pointer;
      }
      #gb-opacity::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 11px; height: 11px;
        border-radius: 50%;
        background: var(--teal-hi, #1a9a99);
        cursor: pointer;
      }
      /* Legend button restyled from a bare text link to a bordered pill
         fused directly onto BORDERS' right edge (shared border, no gap,
         rounded only on the outer corner) — reads as "one control with
         two parts" rather than two unrelated buttons, per owner feedback
         that the old far-right text link felt lonely and disconnected. */
      #gb-legend-btn {
        font-family: var(--font-mono, monospace);
        font-size: 11px;
        color: var(--teal-hi, #1a9a99);
        background: transparent;
        border: 1px solid var(--teal, #0c6a69);
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        padding: 4px 8px;
        white-space: nowrap;
        line-height: 1;
      }
      #gb-legend-btn:hover { background: rgba(26,154,153,0.1); }
      #gb-legend-btn[aria-pressed="true"] { background: rgba(26,154,153,0.15); }
      #gb-legend {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 10px;
        z-index: 20;
        background: var(--bg-panel, #0a0d18);
        border: 1px solid rgba(100,120,160,0.18);
        border-radius: 8px;
        padding: 12px 14px;
        min-width: 240px;
        display: none;
      }
      #gb-legend.open { display: block; }
      /* Small connector arrow — visually ties the panel back to the
         BORDERS+legend button cluster it dropped down from, instead of it
         reading as a disconnected floating box. */
      #gb-legend::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 16px;
        width: 10px;
        height: 10px;
        background: var(--bg-panel, #0a0d18);
        border-left: 1px solid rgba(100,120,160,0.18);
        border-top: 1px solid rgba(100,120,160,0.18);
        transform: rotate(45deg);
      }
      #gb-legend h4 {
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        letter-spacing: 0.1em;
        color: var(--text-secondary, #445566);
        margin: 0 0 10px 0;
        text-transform: uppercase;
      }
      .gb-legend-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }
      .gb-legend-line {
        width: 32px;
        height: 2px;
        flex-shrink: 0;
        border-radius: 1px;
      }
      .gb-legend-text {
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        color: var(--text-primary, #8899aa);
        line-height: 1.4;
      }
      .gb-legend-sub {
        font-size: 9px;
        color: var(--text-secondary, #445566);
        display: block;
      }
      #gb-active-list {
        margin-top: 12px;
        border-top: 1px solid rgba(100,120,160,0.12);
        padding-top: 10px;
      }
      #gb-active-list h5 {
        font-family: var(--font-mono, monospace);
        font-size: 9px;
        color: var(--text-secondary, #445566);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 0 0 6px 0;
      }
      .gb-active-item {
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        color: var(--text-primary, #8899aa);
        padding: 2px 0;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      /* The color dot IS the toggle now — was two separate dots (a fixed
         identity-color swatch plus a distinct teal on/off control next to
         it). Collapsed into one this session per owner feedback, once the
         toggle was live and established: a real <button>, sized up
         slightly from the old 6px pure-swatch dot for a comfortable click
         target, reset of default button chrome, filled with the entity's
         own color when on, a hollow ring in that same color when off —
         so it never loses the identity-color meaning, just adds an
         interactive on/off state to it. */
      .gb-dot {
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        border-radius: 50%;
        border: 1.5px solid transparent;
        padding: 0;
        cursor: pointer;
        transition: opacity 0.15s, border-color 0.15s, transform 0.1s;
      }
      .gb-dot.off {
        background: transparent !important;
        opacity: 1;
      }
      .gb-dot:hover {
        transform: scale(1.15);
      }

      /* #gb-controls renders in normal document flow near the top of
         #globe-container — unlike the hamburger/bell/PREV-NEXT row
         above it, which are all position:fixed to the viewport. On
         mobile that meant this panel sat right underneath the fixed
         icon row instead of below it. Push it down to clear that row,
         and drop the two purely-decorative text bits (coverage tag,
         "opacity" label) — both still have title tooltips for anyone
         who taps for detail, so nothing explanatory is actually lost. */
      @media (max-width: 600px) {
        #gb-controls { margin-top: 106px; flex-wrap: wrap; }
        #gb-coverage-tag { display: none; }
        #gb-opacity-label { display: none; }
      }
    `;
    document.head.appendChild(style);
  }

  return { inject };
})();


window.GlobeBordersStyles = GlobeBordersStyles;

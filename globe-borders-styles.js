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
      #gb-toggle {
        font-family: var(--font-mono, monospace);
        font-size: 11px;
        letter-spacing: 0.08em;
        color: var(--teal-hi, #1a9a99);
        background: transparent;
        border: 1px solid var(--teal, #0c6a69);
        border-radius: 5px;
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
      #gb-legend-btn {
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        color: var(--text-secondary, #445566);
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 2px 4px;
        white-space: nowrap;
      }
      #gb-legend-btn:hover { color: var(--text-primary, #8899aa); }
      #gb-legend {
        position: absolute;
        bottom: 56px;
        left: 12px;
        z-index: 20;
        background: var(--bg-panel, #0a0d18);
        border: 1px solid rgba(100,120,160,0.18);
        border-radius: 8px;
        padding: 12px 14px;
        min-width: 220px;
        display: none;
      }
      #gb-legend.open { display: block; }
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
      .gb-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);
  }

  return { inject };
})();

window.GlobeBordersStyles = GlobeBordersStyles;

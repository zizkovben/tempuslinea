// ============================================================
// CHRONOS — share-ui-styles.js
// Phase 8: Share UI styles
// CSS injection for share panel, milestone toast, copy toast
// Global: ShareUIStyles
// Depends on: styles.css design tokens (--bg-card, --gold, etc.)
// Loaded after share.js, before share-ui.js
// ============================================================

const ShareUIStyles = (() => {

  function inject() {
    if (document.getElementById('share-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'share-ui-styles';
    style.textContent = `

/* ── SHARE OVERLAY ──────────────────────────────────────── */
#share-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 8, 18, .72);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity .22s ease;
}
#share-overlay.open {
  opacity: 1;
  pointer-events: all;
}

/* ── SHARE PANEL ────────────────────────────────────────── */
#share-panel {
  width: min(420px, 94vw);
  background: var(--bg-card);
  border: 1px solid rgba(20, 55, 130, .45);
  border-radius: 4px;
  padding: 0;
  box-shadow: 0 24px 60px rgba(0,0,0,.6);
  transform: translateY(12px);
  transition: transform .22s ease;
  overflow: hidden;
}
#share-overlay.open #share-panel {
  transform: translateY(0);
}

/* ── PANEL HEADER ───────────────────────────────────────── */
.share-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 12px;
  border-bottom: 1px solid rgba(20,55,130,.3);
}
.share-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.share-icon-glyph {
  font-size: 18px;
  color: var(--gold);
  line-height: 1;
}
.share-title {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--text-primary);
  text-transform: uppercase;
}
.share-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 2px;
  line-height: 1;
  transition: color .15s;
}
.share-close:hover { color: var(--text-primary); }

/* ── SHARE TEXT PREVIEW ─────────────────────────────────── */
.share-preview {
  margin: 14px 18px 10px;
  padding: 12px 14px;
  background: var(--bg-panel);
  border: 1px solid rgba(20,55,130,.25);
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-primary);
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 54px;
}
.share-char-count {
  font-size: 9px;
  color: var(--text-dim);
  text-align: right;
  padding: 0 18px 10px;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}
.share-char-count.over { color: #c0392b; }

/* ── PLATFORM BUTTONS ───────────────────────────────────── */
.share-platforms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 4px 18px 14px;
}
.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid rgba(20,55,130,.35);
  border-radius: 3px;
  background: var(--bg-panel);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: border-color .15s, background .15s, color .15s;
}
.share-btn:hover {
  border-color: var(--gold-dim);
  background: var(--bg-hover);
  color: var(--gold);
}
.share-btn.native-btn {
  grid-column: 1 / -1;
  background: rgba(212,160,23,.08);
  border-color: rgba(212,160,23,.3);
  color: var(--gold);
}
.share-btn.native-btn:hover {
  background: rgba(212,160,23,.14);
  border-color: var(--gold);
}
.share-btn.copy-btn.copied {
  border-color: var(--teal-hi);
  color: var(--teal-hi);
}
.share-btn-icon { font-size: 14px; line-height: 1; }

/* ── FOOTER LABEL ───────────────────────────────────────── */
.share-footer-note {
  padding: 8px 18px 14px;
  font-size: 9px;
  color: var(--text-dim);
  font-family: var(--font-mono);
  letter-spacing: 1px;
  border-top: 1px solid rgba(20,55,130,.2);
  text-align: center;
}

/* ── MILESTONE TOAST ────────────────────────────────────── */
#share-milestone-toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--bg-card);
  border: 1px solid var(--gold-dim);
  border-radius: 3px;
  padding: 10px 20px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--gold);
  letter-spacing: 2px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  z-index: 9100;
  transition: opacity .3s ease, transform .3s ease;
  box-shadow: 0 4px 24px rgba(0,0,0,.5);
}
#share-milestone-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ── COPY FEEDBACK TOAST ────────────────────────────────── */
#share-copy-toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(10,106,105,.85);
  border: 1px solid var(--teal-hi);
  border-radius: 3px;
  padding: 7px 16px;
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--teal-hi);
  letter-spacing: 2px;
  pointer-events: none;
  opacity: 0;
  z-index: 9200;
  transition: opacity .25s, transform .25s;
}
#share-copy-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
    `;
    document.head.appendChild(style);
  }

  return { inject };

})();

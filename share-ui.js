// ============================================================
// CHRONOS — share-ui.js
// Phase 8: Share UI
// Handles: share panel DOM, platform buttons, copy feedback,
//          milestone toast, milestone banner
// Global: ShareUI
// Depends on: share.js (ShareEngine), share-ui-styles.js (ShareUIStyles)
// Loaded after share-ui-styles.js, before clio-prompt.js
// ============================================================

const ShareUI = (() => {

  // ── DOM BUILDER ───────────────────────────────────────────

  function buildDOM() {
    if (document.getElementById('share-overlay')) return;

    // Overlay + panel
    const overlay = document.createElement('div');
    overlay.id = 'share-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Share');

    overlay.innerHTML = `
      <div id="share-panel">
        <div class="share-header">
          <div class="share-header-left">
            <span class="share-icon-glyph">◈</span>
            <span class="share-title">SHARE YOUR CONTRIBUTION</span>
          </div>
          <button class="share-close" id="share-close-btn" aria-label="Close">✕</button>
        </div>
        <div id="share-text-preview" class="share-preview"></div>
        <div id="share-char-count" class="share-char-count"></div>
        <div class="share-platforms" id="share-platform-btns"></div>
        <div class="share-footer-note">
          Tempus Linea · tempuslinea.com · The world's definitive civilization archive
        </div>
      </div>`;

    document.body.appendChild(overlay);

    // Milestone toast
    const mToast = document.createElement('div');
    mToast.id = 'share-milestone-toast';
    document.body.appendChild(mToast);

    // Copy toast
    const cToast = document.createElement('div');
    cToast.id = 'share-copy-toast';
    cToast.textContent = '✓ COPIED TO CLIPBOARD';
    document.body.appendChild(cToast);

    // Close handlers
    document.getElementById('share-close-btn').addEventListener('click', hidePanel);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) hidePanel();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') hidePanel();
    });
  }

  // ── PANEL SHOW / HIDE ─────────────────────────────────────

  let _currentText = '';
  let _currentUrl  = '';

  function showPanel(ctx, text, url) {
    _currentText = text || '';
    _currentUrl  = url  || 'https://tempuslinea.com';

    _updatePreview();
    _buildButtons(ctx);

    const overlay = document.getElementById('share-overlay');
    if (overlay) overlay.classList.add('open');
  }

  function hidePanel() {
    const overlay = document.getElementById('share-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  // ── PREVIEW ───────────────────────────────────────────────

  function _updatePreview() {
    const preview = document.getElementById('share-text-preview');
    const counter = document.getElementById('share-char-count');
    if (!preview) return;
    const full = _currentText + '\n' + _currentUrl;
    preview.textContent = full;
    const len = _currentText.length;
    if (counter) {
      counter.textContent = `${len} / 240 CHARACTERS`;
      counter.classList.toggle('over', len > 240);
    }
  }

  // ── PLATFORM BUTTONS ──────────────────────────────────────

  function _buildButtons(ctx) {
    const container = document.getElementById('share-platform-btns');
    if (!container) return;
    container.innerHTML = '';

    const hasNative = !!navigator.share;

    // Native (mobile Web Share API) — shown if available
    if (hasNative) {
      const btn = _makeBtn('native-btn', '⤴', 'SHARE VIA…', () => {
        ShareEngine.dispatch('native', _currentText, _currentUrl);
        hidePanel();
      });
      container.appendChild(btn);
    }

    // Twitter/X
    container.appendChild(_makeBtn('twitter-btn', '𝕏', 'TWITTER / X', () => {
      ShareEngine.dispatch('twitter', _currentText, _currentUrl);
    }));

    // Facebook
    container.appendChild(_makeBtn('facebook-btn', 'f', 'FACEBOOK', () => {
      ShareEngine.dispatch('facebook', _currentText, _currentUrl);
    }));

    // Reddit
    container.appendChild(_makeBtn('reddit-btn', '⬆', 'REDDIT', () => {
      ShareEngine.dispatch('reddit', _currentText, _currentUrl);
    }));

    // Copy to clipboard (always present)
    const copyBtn = _makeBtn('copy-btn', '⎘', 'COPY LINK', () => {
      ShareEngine.dispatch('copy', _currentText, _currentUrl);
      copyBtn.querySelector('.share-btn-label').textContent = 'COPIED';
      copyBtn.classList.add('copied');
      _showCopyToast();
      setTimeout(() => {
        copyBtn.querySelector('.share-btn-label').textContent = 'COPY LINK';
        copyBtn.classList.remove('copied');
      }, 2200);
    });
    container.appendChild(copyBtn);
  }

  function _makeBtn(cls, icon, label, handler) {
    const btn = document.createElement('button');
    btn.className = `share-btn ${cls}`;
    btn.innerHTML = `<span class="share-btn-icon">${icon}</span><span class="share-btn-label">${label}</span>`;
    btn.addEventListener('click', handler);
    return btn;
  }

  // ── TOASTS ────────────────────────────────────────────────

  function showMilestoneToast(n, civName) {
    const el = document.getElementById('share-milestone-toast');
    if (!el) return;
    el.textContent = `◈ MILESTONE: ${Number(n).toLocaleString()} VOTES ON "${(civName||'YOUR THEORY').toUpperCase()}"`;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 4000);
  }

  function _showCopyToast() {
    const el = document.getElementById('share-copy-toast');
    if (!el) return;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2000);
  }

  // ── INIT ──────────────────────────────────────────────────

  function init() {
    if (typeof ShareUIStyles !== 'undefined') ShareUIStyles.inject();
    buildDOM();
  }

  document.addEventListener('DOMContentLoaded', init);

  // ── PUBLIC API ────────────────────────────────────────────

  return {
    init,
    showPanel,
    hidePanel,
    showMilestoneToast,
  };

})();

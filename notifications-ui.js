// ============================================================
// CHRONOS — notifications-ui.js
// Phase 9: Follow & Insights System — UI layer
// Bell FAB, slide-in notification panel, CSS injection.
// Depends on: notifications.js (NotificationsEngine)
// Global: NotificationsUI
// ============================================================

const NotificationsUI = (() => {

  // ── CSS INJECTION ─────────────────────────────────────────
  function _injectStyles() {
    if (document.getElementById('chronos-notif-styles')) return;
    const style = document.createElement('style');
    style.id = 'chronos-notif-styles';
    style.textContent = `
      /* ── NOTIFICATION BELL FAB ─────────────────────────── */
      #notif-bell-fab {
        position: fixed;
        top: 14px;
        right: 64px;
        z-index: 1200;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--bg-card, #0d1120);
        border: 1px solid rgba(107,33,168,.3);
        color: var(--text-dim, #1a3040);
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color .2s, color .2s;
        box-shadow: 0 2px 12px rgba(0,0,0,.4);
      }
      #notif-bell-fab:hover {
        border-color: var(--violet-hi, #8b41c8);
        color: var(--violet-hi, #8b41c8);
      }
      #notif-bell-fab.has-unread {
        border-color: var(--violet, #6b21a8);
        color: var(--text-primary, #8899aa);
      }

      /* Unread badge */
      #notif-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        min-width: 16px;
        height: 16px;
        border-radius: 8px;
        background: var(--violet, #6b21a8);
        color: #fff;
        font-family: var(--font-mono, monospace);
        font-size: 8px;
        line-height: 16px;
        text-align: center;
        padding: 0 3px;
        display: none;
      }
      #notif-badge.visible { display: block; }

      /* ── NOTIFICATION PANEL ─────────────────────────────── */
      #notif-panel {
        position: fixed;
        top: 56px;
        right: -340px;
        width: 320px;
        max-height: calc(100vh - 80px);
        background: var(--bg-panel, #0a0d18);
        border: 1px solid rgba(107,33,168,.25);
        border-radius: 5px;
        z-index: 1100;
        display: flex;
        flex-direction: column;
        box-shadow: -4px 4px 24px rgba(0,0,0,.6);
        transition: right .28s cubic-bezier(.4,0,.2,1);
        overflow: hidden;
      }
      #notif-panel.open { right: 10px; }

      /* Panel header */
      .notif-panel-header {
        padding: 10px 14px 8px;
        border-bottom: 1px solid rgba(107,33,168,.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      .notif-panel-title {
        font-family: var(--font-mono, monospace);
        font-size: 9px;
        letter-spacing: 2.5px;
        color: var(--violet-hi, #8b41c8);
      }
      .notif-panel-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .notif-mark-read-btn {
        background: transparent;
        border: 1px solid rgba(107,33,168,.25);
        color: var(--text-dim, #1a3040);
        font-family: var(--font-mono, monospace);
        font-size: 8px;
        letter-spacing: 1px;
        padding: 3px 8px;
        border-radius: 2px;
        cursor: pointer;
        transition: color .15s, border-color .15s;
      }
      .notif-mark-read-btn:hover {
        color: var(--violet-hi, #8b41c8);
        border-color: rgba(107,33,168,.5);
      }
      .notif-close-btn {
        background: transparent;
        border: none;
        color: var(--text-dim, #1a3040);
        font-size: 13px;
        cursor: pointer;
        padding: 0 2px;
        line-height: 1;
        transition: color .15s;
      }
      .notif-close-btn:hover { color: var(--text-primary, #8899aa); }

      /* Panel feed */
      #notif-feed {
        overflow-y: auto;
        flex: 1;
        scrollbar-width: thin;
        scrollbar-color: rgba(107,33,168,.2) transparent;
      }

      /* Empty state */
      .notif-empty {
        padding: 32px 20px;
        text-align: center;
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        color: var(--text-dim, #1a3040);
        letter-spacing: .5px;
        line-height: 1.8;
      }
      .notif-empty-icon {
        font-size: 24px;
        color: rgba(107,33,168,.2);
        margin-bottom: 10px;
      }

      /* Notification items */
      .notif-item {
        padding: 10px 14px;
        border-bottom: 1px solid rgba(12,35,80,.25);
        display: flex;
        gap: 10px;
        align-items: flex-start;
        transition: background .12s;
      }
      .notif-item:hover { background: var(--bg-hover, #111828); }
      .notif-item.unread { background: rgba(107,33,168,.05); }

      .notif-icon {
        font-size: 13px;
        color: var(--violet-hi, #8b41c8);
        flex-shrink: 0;
        margin-top: 1px;
        width: 16px;
        text-align: center;
      }
      .notif-body { flex: 1; min-width: 0; }
      .notif-message {
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        color: var(--text-secondary, #445566);
        line-height: 1.55;
        margin-bottom: 3px;
      }
      .notif-time {
        font-size: 8px;
        color: var(--text-dim, #1a3040);
        letter-spacing: 1px;
      }

      /* Follow button (injected into thread headers, civ panels, pin popups) */
      .notif-follow-btn {
        background: transparent;
        border: 1px solid rgba(107,33,168,.25);
        color: var(--text-dim, #1a3040);
        font-family: var(--font-mono, monospace);
        font-size: 8px;
        letter-spacing: 1.5px;
        padding: 3px 9px;
        border-radius: 2px;
        cursor: pointer;
        transition: all .15s;
        white-space: nowrap;
      }
      .notif-follow-btn:hover {
        border-color: rgba(107,33,168,.5);
        color: var(--violet-hi, #8b41c8);
      }
      .notif-follow-btn.following {
        border-color: var(--violet, #6b21a8);
        color: var(--violet-hi, #8b41c8);
        background: rgba(107,33,168,.08);
      }

      /* Responsive */
      @media (max-width: 480px) {
        #notif-panel { width: calc(100vw - 20px); right: -110vw; }
        #notif-panel.open { right: 10px; }
        #notif-bell-fab { right: 54px; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── BUILD BELL FAB ────────────────────────────────────────
  function _buildBell() {
    if (document.getElementById('notif-bell-fab')) return;

    const fab = document.createElement('button');
    fab.id = 'notif-bell-fab';
    fab.setAttribute('aria-label', 'Notifications');
    fab.innerHTML = `🔔<span id="notif-badge"></span>`;
    fab.addEventListener('click', togglePanel);
    document.body.appendChild(fab);
  }

  // ── BUILD SLIDE-IN PANEL ──────────────────────────────────
  function _buildPanel() {
    if (document.getElementById('notif-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'notif-panel';
    panel.innerHTML = `
      <div class="notif-panel-header">
        <span class="notif-panel-title">◈ NOTIFICATIONS</span>
        <div class="notif-panel-actions">
          <button class="notif-mark-read-btn" id="notif-mark-read">
            MARK ALL READ
          </button>
          <button class="notif-close-btn" id="notif-close">✕</button>
        </div>
      </div>
      <div id="notif-feed"></div>
    `;
    document.body.appendChild(panel);

    document.getElementById('notif-mark-read').addEventListener('click', () => {
      NotificationsEngine.markAllRead();
      _renderFeed();
    });
    document.getElementById('notif-close').addEventListener('click', hidePanel);
  }

  // ── RENDER FEED ───────────────────────────────────────────
  function _renderFeed() {
    const feed = document.getElementById('notif-feed');
    if (!feed) return;

    const all = NotificationsEngine.getAll();

    if (!all.length) {
      feed.innerHTML = `
        <div class="notif-empty">
          <div class="notif-empty-icon">🔔</div>
          No notifications yet.<br>
          Start contributing to get updates.
        </div>`;
      return;
    }

    feed.innerHTML = all.slice(0, 20).map(n => {
      const d    = new Date(n.ts);
      const time = d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
      const date = d.toLocaleDateString([], { day:'numeric', month:'short' });
      return `<div class="notif-item ${n.read ? '' : 'unread'}">
        <div class="notif-icon">${n.icon || '◈'}</div>
        <div class="notif-body">
          <div class="notif-message">${_escHtml(n.message)}</div>
          <div class="notif-time">${date} · ${time}</div>
        </div>
      </div>`;
    }).join('');
  }

  // ── TOGGLE / SHOW / HIDE ──────────────────────────────────
  function togglePanel() {
    const panel = document.getElementById('notif-panel');
    if (!panel) return;
    if (panel.classList.contains('open')) {
      hidePanel();
    } else {
      showPanel();
    }
  }

  function showPanel() {
    const panel = document.getElementById('notif-panel');
    if (!panel) return;
    panel.classList.add('open');
    _renderFeed();
    // Mark all read when the panel opens
    NotificationsEngine.markAllRead();
    updateBadge(0);
  }

  function hidePanel() {
    const panel = document.getElementById('notif-panel');
    if (panel) panel.classList.remove('open');
  }

  // ── UPDATE BADGE ──────────────────────────────────────────
  function updateBadge(count) {
    const fab   = document.getElementById('notif-bell-fab');
    const badge = document.getElementById('notif-badge');
    if (!badge) return;

    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.classList.add('visible');
      fab && fab.classList.add('has-unread');
    } else {
      badge.classList.remove('visible');
      fab && fab.classList.remove('has-unread');
    }
  }

  // ── FOLLOW BUTTON HELPER ──────────────────────────────────
  // Creates a styled Follow/Following toggle button.
  // type = 'thread' | 'civ' | 'pin' | 'collection'

  function makeFollowButton(type, id, label) {
    const btn = document.createElement('button');
    btn.className = 'notif-follow-btn';
    const following = NotificationsEngine.isFollowing(type, id);
    btn.textContent = following ? '✓ FOLLOWING' : '+ FOLLOW';
    if (following) btn.classList.add('following');

    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (NotificationsEngine.isFollowing(type, id)) {
        NotificationsEngine.unfollow(type, id);
        btn.textContent = '+ FOLLOW';
        btn.classList.remove('following');
      } else {
        NotificationsEngine.follow(type, id, label);
        btn.textContent = '✓ FOLLOWING';
        btn.classList.add('following');
      }
    });
    return btn;
  }

  // ── INTERNAL CALLBACKS ────────────────────────────────────
  // Called by NotificationsEngine when follow state changes
  function _onFollowChange() {
    // Could refresh panel or update follow button states here
    // Currently a no-op placeholder for Phase 3b server extension
  }

  // ── SAFETY HTML ESCAPE ────────────────────────────────────
  function _escHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    _injectStyles();
    _buildBell();
    _buildPanel();
    // Tell engine the UI is ready to receive badge updates
    NotificationsEngine.setUIReady();
    // Set initial badge
    updateBadge(NotificationsEngine.getUnreadCount());
  }

  // ── PUBLIC API ────────────────────────────────────────────
  return {
    init,
    showPanel,
    hidePanel,
    togglePanel,
    updateBadge,
    makeFollowButton,
    _onFollowChange,
    _renderFeed,
  };

})();

document.addEventListener('DOMContentLoaded', () => NotificationsUI.init());

// ============================================================
// CHRONOS — portal.js
// Phase 3b: Portal core — state, storage, navigation, profile, overview
// Depends on: data.js, data-extended.js
// Companion: portal-panels.js (panel renderers)
// Global: PortalEngine
// ============================================================

const PortalEngine = (() => {

  // ── STORAGE HELPERS ───────────────────────────────────────────────

  const KEY = k => 'chronos_portal_' + k;

  function _load(k, fallback) {
    try {
      const raw = sessionStorage.getItem(KEY(k));
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function _save(k, v) {
    try { sessionStorage.setItem(KEY(k), JSON.stringify(v)); } catch {}
  }

  // ── STATE ─────────────────────────────────────────────────────────

  const state = {
    profile:     _load('profile',     { name:'', username:'', bio:'', quals:'', works:'', link:'' }),
    saved:       _load('saved',       []),
    collections: _load('collections', []),
    notes:       _load('notes',       []),
    queue:       _load('queue',       []),
    bookmarks:   _load('bookmarks',   []),
    activity:    _load('activity',    []),
    activePanel: 'overview',
    activeNote:  null,
  };

  // ── ACTIVITY LOG ──────────────────────────────────────────────────

  function logActivity(text, color) {
    color = color || 'var(--teal-hi)';
    state.activity.unshift({ ts: Date.now(), text, color });
    if (state.activity.length > 40) state.activity.length = 40;
    _save('activity', state.activity);
    if (state.activePanel === 'overview') renderActivity();
  }

  // ── TOAST ─────────────────────────────────────────────────────────

  function toast(msg) {
    const el = document.getElementById('portalToast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ── BADGES ────────────────────────────────────────────────────────

  function updateBadges() {
    const map = {
      'badge-saved': state.saved.length,
      'badge-notes': state.notes.length,
      'badge-collections': state.collections.length,
      'badge-queue': state.queue.length,
      'badge-bookmarks': state.bookmarks.length,
    };
    Object.entries(map).forEach(([id, n]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = n;
    });
  }

  // ── PANEL NAVIGATION ──────────────────────────────────────────────

  function switchPanel(name) {
    document.querySelectorAll('.portal-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav-item').forEach(n => n.classList.remove('active'));
    const panel = document.getElementById('panel-' + name);
    if (panel) panel.classList.add('active');
    const navItem = document.querySelector(`[data-panel="${name}"]`);
    if (navItem) navItem.classList.add('active');
    state.activePanel = name;
    // Delegate to PortalPanels for non-core panels
    if (name === 'overview') { renderOverview(); }
    else if (name === 'profile') { renderProfile(); }
    else if (typeof PortalPanels !== 'undefined') { PortalPanels.render(name); }
  }

  // ── OVERVIEW ──────────────────────────────────────────────────────

  function renderOverview() {
    ['saved','notes','collections','queue'].forEach(k => {
      const el = document.getElementById('stat-' + k);
      if (el) el.textContent = state[k].length;
    });
    renderActivity();
    updateUserChip();
  }

  function renderActivity() {
    const list = document.getElementById('activityList');
    if (!list) return;
    if (!state.activity.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">◈</div><div class="empty-title">No activity yet</div><div class="empty-body">Save civilisations from the Timeline or Atlas to begin building your research archive.</div></div>`;
      return;
    }
    list.innerHTML = state.activity.slice(0, 15).map(a => {
      const d = new Date(a.ts);
      const time = d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
      return `<div class="activity-item">
        <span class="activity-dot" style="background:${a.color}"></span>
        <span class="activity-time">${time}</span>
        <span>${a.text}</span>
      </div>`;
    }).join('');
  }

  // ── PROFILE ───────────────────────────────────────────────────────

  function renderProfile() {
    const p = state.profile;
    ['Name','Username','Bio','Quals','Works','Link'].forEach(f => {
      const el = document.getElementById('profile' + f);
      if (el) el.value = p[f.toLowerCase()] || '';
    });
    updateUserChip();
  }

  function saveProfile() {
    state.profile = {
      name:     document.getElementById('profileName')?.value     || '',
      username: document.getElementById('profileUsername')?.value || '',
      bio:      document.getElementById('profileBio')?.value      || '',
      quals:    document.getElementById('profileQuals')?.value    || '',
      works:    document.getElementById('profileWorks')?.value    || '',
      link:     document.getElementById('profileLink')?.value     || '',
    };
    _save('profile', state.profile);
    updateUserChip();
    logActivity('Profile updated', 'var(--gold)');
    toast('Profile saved');
  }

  function updateUserChip() {
    const p = state.profile;
    const nameEl   = document.getElementById('userNameDisplay');
    const avatarEl = document.getElementById('userAvatar');
    if (nameEl)   nameEl.textContent   = p.username || p.name || 'Guest';
    if (avatarEl) avatarEl.textContent = (p.username || p.name || '?')[0].toUpperCase();
  }

  // ── INIT ──────────────────────────────────────────────────────────

  function init() {
    document.querySelectorAll('.sidebar-nav-item[data-panel]').forEach(item => {
      item.addEventListener('click', () => switchPanel(item.dataset.panel));
    });
    document.getElementById('clioLaunchBtn')?.addEventListener('click', () => {
      if (typeof CLIO !== 'undefined' && CLIO.toggle) CLIO.toggle();
    });
    document.getElementById('saveProfileBtn')?.addEventListener('click', saveProfile);
    document.getElementById('clearProfileBtn')?.addEventListener('click', () => {
      ['profileName','profileUsername','profileBio','profileQuals','profileWorks','profileLink']
        .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      toast('Fields cleared');
    });
    document.getElementById('collectionModal')?.addEventListener('click', e => {
      if (e.target.id === 'collectionModal')
        document.getElementById('collectionModal').classList.remove('open');
    });
    updateUserChip();
    updateBadges();
    renderOverview();
  }

  // ── PUBLIC API ────────────────────────────────────────────────────

  return {
    init, switchPanel, toast, updateBadges, logActivity, updateUserChip,
    state, _load, _save,
    fmtDate(ts) {
      if (!ts) return '';
      return new Date(ts).toLocaleDateString([], { day:'numeric', month:'short' });
    },
    saveCiv(civ) {
      if (state.saved.find(c => c.id === civ.id)) { toast('Already saved'); return; }
      state.saved.push({ id:civ.id, n:civ.n, t:civ.t, r:civ.r, cont:civ.cont, note:'' });
      _save('saved', state.saved);
      logActivity(`Saved: ${civ.n}`, 'var(--teal-hi)');
      toast(`Saved: ${civ.n}`);
      updateBadges();
      if (typeof ShareEngine !== 'undefined') {
        ShareEngine.triggerShare({ type: 'save', civId: civ.id, civName: civ.n });
      }
    },
    addBookmark(label, url, type) {
      state.bookmarks.push({ id:Date.now(), label, url, type:type||'link', created:Date.now() });
      _save('bookmarks', state.bookmarks);
      logActivity(`Bookmarked: ${label}`, 'var(--teal-hi)');
      toast('Bookmarked');
      updateBadges();
    },
    saveFromTimeline(civId) {
      if (typeof CIVS === 'undefined') return;
      const civ = CIVS.find(c => c.id === civId);
      if (civ) this.saveCiv(civ);
    },
  };

})();

document.addEventListener('DOMContentLoaded', () => PortalEngine.init());

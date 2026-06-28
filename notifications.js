// ============================================================
// CHRONOS — notifications.js
// Phase 9: Follow & Insights System — engine layer
// Manages follow state (localStorage), notification queue,
// badge counter, and synthetic event generation.
// Pre-Phase 3b: all storage is localStorage only — resets on
// browser clear. No server-side push.
// Depends on: (none — loads before clio-prompt.js)
// Companion: notifications-ui.js (bell FAB + panel DOM)
// Global: NotificationsEngine
// ============================================================

const NotificationsEngine = (() => {

  // ── STORAGE KEYS ─────────────────────────────────────────
  const KEY_FOLLOWS = 'chronos_follows';
  const KEY_NOTIFS  = 'chronos_notifications';
  const KEY_UNREAD  = 'chronos_notif_unread';

  // ── STATE ─────────────────────────────────────────────────
  let _follows      = {};    // { "thread:12": { label, followedAt }, ... }
  let _notifications = [];   // array of event objects, newest first
  let _unreadCount  = 0;
  let _uiReady      = false; // set to true by NotificationsUI.init()

  // ── STORAGE HELPERS ───────────────────────────────────────
  function _loadState() {
    try {
      const f = localStorage.getItem(KEY_FOLLOWS);
      _follows = f ? JSON.parse(f) : {};
    } catch { _follows = {}; }

    try {
      const n = localStorage.getItem(KEY_NOTIFS);
      _notifications = n ? JSON.parse(n) : [];
    } catch { _notifications = []; }

    try {
      _unreadCount = parseInt(localStorage.getItem(KEY_UNREAD) || '0', 10);
    } catch { _unreadCount = 0; }
  }

  function _saveFollows() {
    try { localStorage.setItem(KEY_FOLLOWS, JSON.stringify(_follows)); } catch {}
  }

  function _saveNotifs() {
    // Keep last 50 only
    if (_notifications.length > 50) _notifications.length = 50;
    try { localStorage.setItem(KEY_NOTIFS, JSON.stringify(_notifications)); } catch {}
    try { localStorage.setItem(KEY_UNREAD, String(_unreadCount)); } catch {}
  }

  // ── FOLLOW / UNFOLLOW ─────────────────────────────────────
  // type = 'thread' | 'civ' | 'pin' | 'collection'
  // id   = thread id, civ id, pin id, or collection id (string or int)
  // label = human-readable name shown in notifications

  function follow(type, id, label) {
    const key = `${type}:${id}`;
    if (_follows[key]) return; // already following
    _follows[key] = { type, id, label: label || String(id), followedAt: Date.now() };
    _saveFollows();
    _uiReady && typeof NotificationsUI !== 'undefined' && NotificationsUI._onFollowChange();
  }

  function unfollow(type, id) {
    const key = `${type}:${id}`;
    delete _follows[key];
    _saveFollows();
    _uiReady && typeof NotificationsUI !== 'undefined' && NotificationsUI._onFollowChange();
  }

  function isFollowing(type, id) {
    return !!_follows[`${type}:${id}`];
  }

  function getFollows() {
    return Object.values(_follows);
  }

  // ── PUSH NOTIFICATION ─────────────────────────────────────
  // event = {
  //   type:      string  — 'vote_up' | 'vote_dn' | 'reply' | 'new_post' |
  //                         'pin_vote' | 'milestone' | 'nearby_pin'
  //   subject:   string  — human-readable subject (civ name, thread title…)
  //   subjectId: string  — e.g. 'thread:12', 'civ:88', 'pin:1001'
  //   message:   string  — full notification sentence
  //   icon:      string  — emoji icon for the notification
  // }

  function push(event) {
    const notif = {
      id:        Date.now() + Math.random(),
      ts:        Date.now(),
      read:      false,
      type:      event.type      || 'general',
      subject:   event.subject   || '',
      subjectId: event.subjectId || '',
      message:   event.message   || '',
      icon:      event.icon      || '◈',
    };

    _notifications.unshift(notif);
    _unreadCount++;
    _saveNotifs();

    // Update bell badge immediately if UI is ready
    if (_uiReady && typeof NotificationsUI !== 'undefined') {
      NotificationsUI.updateBadge(_unreadCount);
    }

    return notif;
  }

  // ── MARK ALL READ ─────────────────────────────────────────
  function markAllRead() {
    _notifications.forEach(n => { n.read = true; });
    _unreadCount = 0;
    _saveNotifs();
    if (_uiReady && typeof NotificationsUI !== 'undefined') {
      NotificationsUI.updateBadge(0);
    }
  }

  // ── GETTERS ───────────────────────────────────────────────
  function getUnreadCount() { return _unreadCount; }
  function getAll()         { return _notifications.slice(); }

  // ── SYNTHETIC EVENT GENERATORS ────────────────────────────
  // These are called by the integration points in other files
  // (ui.js, globe-pins.js, community.html, portal-panels.js)
  // when a user action occurs that should notify followers.

  // Called from ui.js handleVote — notifies if user follows this civ theory
  function onCivVote(civId, civName, direction) {
    // Auto-follow the civ when voting (per Phase 9 spec)
    follow('civ', civId, civName);
    // Push a local event for the activity feed
    push({
      type:      direction === 'up' ? 'vote_up' : 'vote_dn',
      subject:   civName,
      subjectId: `civ:${civId}`,
      message:   direction === 'up'
        ? `You supported the ${civName} theory.`
        : `You challenged the ${civName} theory.`,
      icon: direction === 'up' ? '▲' : '▼',
    });
  }

  // Called from community.html thread vote handler
  function onThreadVote(threadId, threadTitle, civId, civName, direction) {
    follow('thread', threadId, threadTitle);
    push({
      type:      direction === 'up' ? 'vote_up' : 'vote_dn',
      subject:   threadTitle,
      subjectId: `thread:${threadId}`,
      message:   direction === 'up'
        ? `You upvoted the thread: "${threadTitle}"`
        : `You downvoted the thread: "${threadTitle}"`,
      icon: direction === 'up' ? '▲' : '▼',
    });
  }

  // Called from community.html thread submit
  function onThreadPost(threadId, threadTitle, civName) {
    follow('thread', threadId, threadTitle);
    push({
      type:      'reply',
      subject:   threadTitle,
      subjectId: `thread:${threadId}`,
      message:   `You posted in the thread: "${threadTitle}" (${civName})`,
      icon:      '✦',
    });
  }

  // Called from globe-pins.js addUserPin
  function onPinPlaced(pinId, civId, civName, lat, lng) {
    follow('pin', pinId, `${civName} pin`);
    push({
      type:      'new_post',
      subject:   civName,
      subjectId: `pin:${pinId}`,
      message:   `You placed a theory pin for ${civName} at ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
      icon:      '◉',
    });

    // Check for nearby pins (Haversine) — requires GlobePins to be loaded
    _checkNearbyPins(pinId, civId, civName, lat, lng);
  }

  // Called from portal-panels.js markCollectionComplete
  function onCollectionComplete(collectionId, collectionName) {
    follow('collection', collectionId, collectionName);
    push({
      type:      'milestone',
      subject:   collectionName,
      subjectId: `collection:${collectionId}`,
      message:   `Research collection complete: "${collectionName}"`,
      icon:      '✓',
    });
  }

  // Called from share.js _checkMilestone (or ShareEngine)
  function onMilestone(civId, civName, n) {
    push({
      type:      'milestone',
      subject:   civName,
      subjectId: `civ:${civId}`,
      message:   `Your contribution to ${civName} just reached ${n.toLocaleString()} upvotes.`,
      icon:      '★',
    });
  }

  // ── NEARBY PIN DETECTION (Haversine) ─────────────────────
  // Fires if another pin exists within ~50km of the newly placed pin.
  function _checkNearbyPins(newPinId, civId, civName, lat, lng) {
    if (typeof GlobePins === 'undefined') return;

    const existingPins = GlobePins.getPinsForCiv(civId) || [];
    const THRESHOLD_KM = 50;

    existingPins.forEach(p => {
      if (p.id === newPinId) return; // skip the pin just placed
      const dist = _haversineKm(lat, lng, p.lat, p.lng);
      if (dist <= THRESHOLD_KM) {
        push({
          type:      'nearby_pin',
          subject:   civName,
          subjectId: `pin:${p.id}`,
          message:   `A theory pin for ${civName} exists ${Math.round(dist)} km from your new pin.`,
          icon:      '◎',
        });
      }
    });
  }

  function _haversineKm(lat1, lng1, lat2, lng2) {
    const R  = 6371;
    const dL = (lat2 - lat1) * Math.PI / 180;
    const dN = (lng2 - lng1) * Math.PI / 180;
    const a  = Math.sin(dL/2) * Math.sin(dL/2) +
               Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
               Math.sin(dN/2) * Math.sin(dN/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  // ── INSIGHTS DATA ─────────────────────────────────────────
  // Returns a summary object for the Insights panel in portal-panels.js.
  // All data is derived from localStorage notifications + follows.

  function getInsightsSummary() {
    const notifs = _notifications;

    const votesCast     = notifs.filter(n => n.type === 'vote_up' || n.type === 'vote_dn').length;
    const pinsPlaced    = notifs.filter(n => n.type === 'new_post' && n.subjectId.startsWith('pin:')).length;
    const postsCreated  = notifs.filter(n => n.type === 'reply').length;
    const following     = Object.keys(_follows).length;

    // Group by subjectId to find most active
    const subjectCounts = {};
    notifs.forEach(n => {
      if (!n.subjectId) return;
      subjectCounts[n.subjectId] = subjectCounts[n.subjectId] || { subject: n.subject, up: 0, dn: 0, count: 0 };
      if (n.type === 'vote_up')  subjectCounts[n.subjectId].up++;
      if (n.type === 'vote_dn')  subjectCounts[n.subjectId].dn++;
      subjectCounts[n.subjectId].count++;
    });

    const subjects   = Object.values(subjectCounts);
    const topSupport = subjects.sort((a,b) => b.up - a.up)[0] || null;
    const topDebate  = subjects.sort((a,b) => b.dn - a.dn)[0] || null;

    // Milestone badges
    const badges = [];
    if (votesCast  >= 1)   badges.push({ icon:'▲', label:'First Vote',    desc:'You cast your first plausibility vote.' });
    if (votesCast  >= 10)  badges.push({ icon:'◈', label:'10 Votes',      desc:'10 theory votes cast.' });
    if (votesCast  >= 100) badges.push({ icon:'★', label:'100 Votes',     desc:'100 theory votes cast — serious researcher.' });
    if (pinsPlaced >= 1)   badges.push({ icon:'◉', label:'Globe Pioneer', desc:'You placed your first theory pin on the Living Atlas.' });
    if (postsCreated >= 1) badges.push({ icon:'✦', label:'Contributor',   desc:'You posted a debate thread.' });
    const totalContribs = votesCast + pinsPlaced + postsCreated;
    if (totalContribs >= 10) badges.push({ icon:'⬡', label:'Prolific', desc:'10+ contributions to the archive.' });

    return {
      votesCast,
      pinsPlaced,
      postsCreated,
      following,
      topSupport,
      topDebate,
      badges,
      recentActivity: notifs.slice(0, 30),
    };
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    _loadState();
    // NotificationsUI will call setUIReady() once its FAB is in the DOM
  }

  function setUIReady() {
    _uiReady = true;
    if (typeof NotificationsUI !== 'undefined') {
      NotificationsUI.updateBadge(_unreadCount);
    }
  }

  // ── PUBLIC API ────────────────────────────────────────────
  return {
    init,
    setUIReady,
    follow,
    unfollow,
    isFollowing,
    getFollows,
    push,
    markAllRead,
    getUnreadCount,
    getAll,
    getInsightsSummary,
    // Synthetic event helpers called by integration points
    onCivVote,
    onThreadVote,
    onThreadPost,
    onPinPlaced,
    onCollectionComplete,
    onMilestone,
  };

})();

// Auto-init on load
(function() { NotificationsEngine.init(); })();

// ============================================================
// CHRONOS — share.js
// Phase 8: Share Engine
// Handles: text generation, platform URL building, Web Share
//          API dispatch, milestone tracking
// Global: ShareEngine
// Depends on: data.js (CIVS)
// Loaded before: clio-prompt.js in all HTML files
// ============================================================

const ShareEngine = (() => {

  // ── CONSTANTS ─────────────────────────────────────────────

  const BASE_URL  = 'https://tempuslinea.com';
  const MILESTONES = [50, 100, 500, 1000];

  // sessionStorage key prefix
  const KEY = k => 'chronos_share_' + k;

  // ── STORAGE ───────────────────────────────────────────────

  function _load(k, fallback) {
    try {
      const raw = sessionStorage.getItem(KEY(k));
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function _save(k, v) {
    try { sessionStorage.setItem(KEY(k), JSON.stringify(v)); } catch {}
  }

  // milestone log: { civId, threadId, pinId, milestonesHit[] }
  const _milestones = _load('milestones', {});

  // ── TEXT GENERATION ───────────────────────────────────────

  /**
   * Build share text from a context object.
   * context shape:
   * {
   *   type:      'vote'|'comment'|'pin'|'save'|'milestone'|'collection',
   *   civId:     number,          // optional
   *   civName:   string,          // optional — fallback if CIVS not available
   *   threadId:  number,          // optional
   *   threadTitle: string,        // optional
   *   voteCount: number,          // optional — total up votes
   *   dnCount:   number,          // optional — total dn votes
   *   pinLat:    number,          // optional
   *   pinLng:    number,          // optional
   *   milestone: number,          // optional — the milestone number hit
   *   collectionName: string,     // optional
   * }
   * Returns: string (under 240 chars)
   */
  function generateText(ctx) {
    const name   = _civName(ctx);
    const counts = _voteCounts(ctx);
    const url    = _buildUrl(ctx);

    switch (ctx.type) {

      case 'vote': {
        const tally = counts
          ? `${ctx.voteCount.toLocaleString()} researchers agree. ${ctx.dnCount.toLocaleString()} don't. Where do you stand?`
          : '';
        return _trim(
          `I've weighed in on ${name} on Tempus Linea. ${tally} ${url}`
        );
      }

      case 'comment': {
        const thread = ctx.threadTitle || name;
        return _trim(
          `I've contributed to the ${thread} debate on Tempus Linea. ${counts} ${url}`
        );
      }

      case 'pin': {
        const loc = _formatCoords(ctx.pinLat, ctx.pinLng);
        return _trim(
          `I've mapped my ${name} theory to ${loc} on the Tempus Linea Living Atlas. ${url}`
        );
      }

      case 'save': {
        return _trim(
          `I've added ${name} to my research archive on Tempus Linea. ${url}`
        );
      }

      case 'milestone': {
        const n = ctx.milestone || ctx.voteCount || '?';
        const thread = ctx.threadTitle || name;
        return _trim(
          `My theory about ${thread} just hit ${n.toLocaleString()} votes on Tempus Linea. ${url}`
        );
      }

      case 'collection': {
        const col = ctx.collectionName || 'research collection';
        return _trim(
          `I've built a "${col}" research set on Tempus Linea. ${url}`
        );
      }

      default:
        return _trim(`Exploring civilizations on Tempus Linea. ${BASE_URL}`);
    }
  }

  // ── URL BUILDER ───────────────────────────────────────────

  function _buildUrl(ctx) {
    if (ctx.type === 'pin') return `${BASE_URL}/globe`;
    if (ctx.type === 'portal' || ctx.type === 'save' || ctx.type === 'collection')
      return `${BASE_URL}/portal`;
    if (ctx.civId && (ctx.type === 'save'))
      return `${BASE_URL}/civ/${ctx.civId}`;
    if (ctx.threadId) {
      const slug = _threadSlug(ctx.threadTitle);
      return slug
        ? `${BASE_URL}/debate/${slug}`
        : `${BASE_URL}/community`;
    }
    if (ctx.civId) return `${BASE_URL}/civ/${ctx.civId}`;
    return BASE_URL;
  }

  // ── PLATFORM DISPATCH ─────────────────────────────────────

  /**
   * dispatch(platform, text, url)
   * platform: 'native'|'twitter'|'facebook'|'reddit'|'copy'
   */
  function dispatch(platform, text, url) {
    url  = url  || BASE_URL;
    text = text || '';

    switch (platform) {
      case 'native':
        if (navigator.share) {
          navigator.share({ title: 'Tempus Linea', text, url })
            .catch(() => {}); // user dismissed — silent
        }
        break;

      case 'twitter': {
        const full = encodeURIComponent(text.length > 240 ? text.slice(0, 237) + '…' : text);
        _openWindow(`https://twitter.com/intent/tweet?text=${full}`);
        break;
      }

      case 'facebook': {
        const u = encodeURIComponent(url);
        _openWindow(`https://www.facebook.com/sharer/sharer.php?u=${u}`);
        break;
      }

      case 'reddit': {
        const u = encodeURIComponent(url);
        const t = encodeURIComponent(text.slice(0, 300));
        _openWindow(`https://reddit.com/submit?url=${u}&title=${t}`);
        break;
      }

      case 'copy':
      default:
        _copyToClipboard(text + '\n' + url);
        break;
    }
  }

  // ── TRIGGER (main public entry point) ─────────────────────

  /**
   * triggerShare(context)
   * Called by ui.js, globe-pins.js, portal.js, community.html
   * Fires ShareUI.showPanel if available, otherwise falls back to native/copy.
   */
  function triggerShare(ctx) {
    if (!ctx || !ctx.type) return;

    // Check milestone before generating text
    _checkMilestone(ctx);

    const text = generateText(ctx);
    const url  = _buildUrl(ctx);

    if (typeof ShareUI !== 'undefined' && ShareUI.showPanel) {
      ShareUI.showPanel(ctx, text, url);
    } else if (navigator.share) {
      dispatch('native', text, url);
    } else {
      dispatch('copy', text, url);
    }
  }

  // ── MILESTONE TRACKER ─────────────────────────────────────

  function _checkMilestone(ctx) {
    if (!ctx.civId || !ctx.voteCount) return;
    const key  = String(ctx.civId);
    const seen = _milestones[key] || [];
    MILESTONES.forEach(m => {
      if (ctx.voteCount >= m && !seen.includes(m)) {
        seen.push(m);
        _milestones[key] = seen;
        _save('milestones', _milestones);
        // Fire milestone share prompt
        setTimeout(() => {
          triggerShare({ ...ctx, type: 'milestone', milestone: m });
        }, 400);
      }
    });
  }

  // ── HELPERS ───────────────────────────────────────────────

  function _civName(ctx) {
    if (ctx.civName) return ctx.civName;
    if (ctx.civId && typeof CIVS !== 'undefined') {
      const c = CIVS.find(x => x.id === ctx.civId);
      if (c) return c.n;
    }
    return 'this civilization';
  }

  function _voteCounts(ctx) {
    if (ctx.voteCount == null) return '';
    const up = Number(ctx.voteCount).toLocaleString();
    const dn = ctx.dnCount != null ? Number(ctx.dnCount).toLocaleString() : null;
    return dn ? `${up} researchers agree. ${dn} don't.` : `${up} votes recorded.`;
  }

  function _formatCoords(lat, lng) {
    if (lat == null || lng == null) return 'a new location';
    const ns = lat >= 0 ? 'N' : 'S';
    const ew = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(1)}°${ns} ${Math.abs(lng).toFixed(1)}°${ew}`;
  }

  function _threadSlug(title) {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);
  }

  function _trim(str) {
    // Collapse multiple spaces, trim to 240 chars
    return str.replace(/\s+/g, ' ').trim().slice(0, 240);
  }

  function _openWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  }

  function _copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => _legacyCopy(text));
    } else {
      _legacyCopy(text);
    }
  }

  function _legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(ta);
  }

  // ── PUBLIC API ────────────────────────────────────────────

  return {
    triggerShare,
    generateText,
    dispatch,
  };

})();

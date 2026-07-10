/* ============================================================
   CHRONOS · ui.js
   UI layer: toolbar, preset buttons, info panel, vote interactions.
   Phase 5: Date Challenge Theories section added to info panel.
   Phase 8b: civ-theory votes now trigger ShareEngine.triggerShare().
   Phase 9: handleVote now calls NotificationsEngine.onCivVote().
            Follow button added to info panel footer.
   Phase — Cross-page share-out: ChronosUI is now page-agnostic so
            globe.html and community.html can reuse the same fixed
            right-edge side panel as the timeline. All TimelineEngine
            calls are optional/guarded — on pages without timeline.js,
            ChronosUI falls back to its own internal year formatter
            and a local (page-lifetime) vote store via getVotes().
   Depends on: data.js. TimelineEngine (timeline.js) is OPTIONAL —
   used when present, gracefully skipped otherwise.
   ============================================================ */

window.ChronosUI = (() => {

  // ── STATE (cached from last showInfo call, used by handleVote) ──
  let _lastCiv   = null;
  let _lastVotes = null;

  // ── LOCAL VOTE STORE ──────────────────────────────────────
  // Used on any page where TimelineEngine isn't loaded (globe.html,
  // community.html). Persists for the page's lifetime only — matches
  // the existing "votes reset on reload" behaviour (Known Issues).
  const _localVotes = {};

  function getVotes() {
    if (window.TimelineEngine && TimelineEngine.getVotes) return TimelineEngine.getVotes();
    return _localVotes;
  }

  function _registerLocalVote(civId, direction) {
    if (!_localVotes[civId]) _localVotes[civId] = {};
    if (direction === 'up') {
      _localVotes[civId].up = !_localVotes[civId].up;
      if (_localVotes[civId].up) _localVotes[civId].dn = false;
    } else {
      _localVotes[civId].dn = !_localVotes[civId].dn;
      if (_localVotes[civId].dn) _localVotes[civId].up = false;
    }
  }

  // ── YEAR FORMAT (no longer depends on TimelineEngine) ──────
  function _fmtYear(y) {
    if (y === 0) return '1 CE';
    return y < 0
      ? Math.abs(Math.round(y)).toLocaleString() + ' BCE'
      : Math.round(y).toLocaleString() + ' CE';
  }

  // ── BUILD TOOLBAR ─────────────────────────────────────────
  function buildPresets() {
    const el = document.getElementById('preset-btns');
    if (!el) return;
    PRESETS.forEach((p, i) => {
      const b = document.createElement('button');
      b.className = 'btn' + (i === 2 ? ' active' : '');
      b.textContent = p.l;
      b.addEventListener('click', () => {
        document.querySelectorAll('#preset-btns .btn')
          .forEach((bt, j) => bt.classList.toggle('active', j === i));
        TimelineEngine.setPreset(i);
      });
      el.appendChild(b);
    });
  }

  // ── DATE CHALLENGE THEORIES PANEL ─────────────────────────
  // Renders the dateTheories[] for a civ inside the info panel.
  // Each theory shows its date range, researcher, source, and community vote bar.
  function _buildDateChallenges(civ) {
    if (!civ.dateTheories || !civ.dateTheories.length) return '';

    const rows = civ.dateTheories.map((dt, i) => {
      const isMain   = dt.label.toLowerCase().includes('mainstream');
      const color    = isMain ? '#1a9a99' : '#8b41c8';
      const upTotal  = (dt.up || 0) + (dt.dn || 0);
      const pct      = upTotal > 0 ? Math.round(((dt.up || 0) / upTotal) * 100) : 50;
      const fmtY     = y => {
        if (y === 0) return '1 CE';
        return y < 0
          ? Math.abs(Math.round(y)).toLocaleString() + ' BCE'
          : Math.round(y).toLocaleString() + ' CE';
      };

      return `
        <div style="padding:8px 10px;border-radius:4px;margin-bottom:6px;
                    background:rgba(10,13,28,.6);border:1px solid ${color}28;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;
                      margin-bottom:3px;gap:8px;flex-wrap:wrap;">
            <div style="font-size:9px;color:${color};letter-spacing:1.5px;flex-shrink:0;">
              ${isMain ? '◆ MAINSTREAM' : '◈ ALTERNATIVE'}
            </div>
            <div style="font-size:9px;color:#4a6a8a;white-space:nowrap;">
              ${fmtY(dt.s)} → ${fmtY(dt.e)}
            </div>
          </div>
          <div style="font-size:10px;color:#aab8c8;line-height:1.5;margin-bottom:4px;">
            ${dt.label}
          </div>
          ${dt.researcher ? `<div style="font-size:9px;color:${color};opacity:.8;margin-bottom:3px;">
            ⬡ ${dt.researcher}
          </div>` : ''}
          <div style="font-size:8px;color:#334455;font-style:italic;margin-bottom:6px;line-height:1.5;">
            ${dt.source}
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span style="font-size:9px;color:#3a7a5a;">▲ ${(dt.up||0).toLocaleString()}</span>
            <span style="font-size:9px;color:#7a3a3a;">▼ ${(dt.dn||0).toLocaleString()}</span>
            <div style="flex:1;height:2px;background:rgba(15,50,80,.45);border-radius:1px;overflow:hidden;">
              <div style="width:${pct}%;height:100%;background:${color};transition:width .4s;"></div>
            </div>
            <span style="font-size:8px;color:#445566;">${pct}%</span>
          </div>
        </div>`;
    });

    return `
      <div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(107,33,168,.2);">
        <div style="font-size:9px;letter-spacing:2px;color:#6b21a8;margin-bottom:8px;">
          ◈ DATE CHALLENGE THEORIES (${civ.dateTheories.length})
        </div>
        ${rows.join('')}
        <div style="font-size:8px;color:#223344;letter-spacing:1px;text-align:right;margin-top:2px;">
          HOVER GHOST BARS ON TIMELINE TO EXPLORE · VOTE IN PHASE 3b
        </div>
      </div>`;
  }

  // ── INFO PANEL ────────────────────────────────────────────
  function showInfo(civ, votes) {
    const panel = document.getElementById('info-panel');
    const inner = document.getElementById('info-inner');
    if (!panel || !inner) return;

    // Cache for handleVote() — registerVote() mutates `votes` in place,
    // so re-reading _lastVotes after the vote reflects the new state.
    _lastCiv   = civ;
    _lastVotes = votes;

    const v  = votes[civ.id] || {};
    const tc = { confirmed: '#c09010', theorized: '#9a60c0', debated: '#3aabb0' }[civ.t];
    const dur = Math.abs(civ.e - civ.s);
    const upCount = civ.up + (v.up ? 1 : 0);
    const dnCount = civ.dn + (v.dn ? 1 : 0);
    const total   = upCount + dnCount;
    const pct     = total > 0 ? Math.round((upCount / total) * 100) : 50;

    // Stub entry banner
    const stubBanner = civ.stub ? `
      <div style="margin:10px 0 4px;padding:10px 14px;border:1px solid rgba(100,80,20,.35);
                  border-radius:4px;background:rgba(30,20,5,.5);">
        <div style="font-size:9px;color:#c09010;letter-spacing:2px;margin-bottom:4px;">
          ✦ STUB ENTRY — CONTRIBUTIONS WELCOME
        </div>
        <div style="font-size:11px;color:#8a9aaa;line-height:1.7;">
          This entry is a stub. <strong style="color:#c09010">${civ.n}</strong>
          deserves a fuller record. Community contributions, verified citations and expert
          analysis are welcome.
          <span style="color:#3aabb0;cursor:pointer;"
            onclick="window.location.href='community.html'">
            → Contribute to this entry
          </span>
        </div>
      </div>` : '';

    // Date challenge section (only for civs that have dateTheories[])
    const dateChallenges = _buildDateChallenges(civ);

    // CLIO integration — calls setActiveCiv on panel show
    if (window.CLIO) CLIO.setActiveCiv(civ);

    inner.innerHTML = `
      <div style="flex:1;min-width:180px;">
        <div class="civ-type-tag" style="color:${tc}">
          ◈ ${civ.t.toUpperCase()} · ${civ.r}
        </div>
        <div class="civ-name" style="color:${tc}">${civ.n}</div>
        <div class="civ-dates">
          ${_fmtYear(civ.s)} → ${_fmtYear(civ.e)}
          <span style="color:var(--text-dim);margin-left:8px;">(${dur.toLocaleString()} years)</span>
        </div>
        ${civ.lang && civ.lang !== 'unknown' ? `
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;">
          <div style="font-size:9px;letter-spacing:1px;">
            <span style="color:var(--text-dim);">LANGUAGE · </span>
            <span style="color:#4a8ab8;">${civ.lang.replace(/-/g,' ').toUpperCase()}</span>
          </div>
          ${civ.gov && civ.gov !== 'unknown' ? `<div style="font-size:9px;letter-spacing:1px;">
            <span style="color:var(--text-dim);">GOVERNANCE · </span>
            <span style="color:#4a8ab8;">${civ.gov.toUpperCase()}</span>
          </div>` : ''}
          ${civ.rel && civ.rel !== 'unknown' ? `<div style="font-size:9px;letter-spacing:1px;">
            <span style="color:var(--text-dim);">BELIEF · </span>
            <span style="color:#4a8ab8;">${civ.rel.toUpperCase()}</span>
          </div>` : ''}
        </div>` : ''}
        <p class="civ-desc">${civ.d}</p>
        ${stubBanner}
        ${dateChallenges}
      </div>
      <div class="vote-section">
        <button class="btn-close" onclick="ChronosUI.hideInfo()">✕ CLOSE</button>
        <div>
          <div class="vote-label">COMMUNITY RATING</div>
          <div class="vote-buttons">
            <button id="btn-up" class="btn-vote ${v.up ? 'up-active' : ''}"
              onclick="ChronosUI.handleVote(${civ.id},'up')">
              ▲ ${upCount.toLocaleString()}
            </button>
            <button id="btn-dn" class="btn-vote ${v.dn ? 'dn-active' : ''}"
              onclick="ChronosUI.handleVote(${civ.id},'dn')">
              ▼ ${dnCount.toLocaleString()}
            </button>
          </div>
        </div>
        <div style="width:100%;margin-top:4px;">
          <div style="height:3px;background:rgba(15,50,80,.4);border-radius:2px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:${tc};transition:width .3s;"></div>
          </div>
          <div style="font-size:9px;color:var(--text-dim);margin-top:3px;text-align:right;
                      letter-spacing:1px;">
            ${pct}% PLAUSIBILITY SCORE
          </div>
        </div>
        ${civ.dateTheories && civ.dateTheories.length ? `
        <div style="font-size:9px;color:#6b21a8;letter-spacing:1px;text-align:right;margin-top:6px;">
          ◈ ${civ.dateTheories.length} DATE CHALLENGE${civ.dateTheories.length > 1 ? 'S' : ''}
        </div>` : ''}
        <div style="font-size:9px;color:var(--text-dim);letter-spacing:1px;text-align:right;margin-top:4px;">
          COMMENTS & SOURCES → PHASE 3b
        </div>
        <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(107,33,168,.12);
                    display:flex;justify-content:flex-end;">
          <button id="btn-follow-civ"
            style="background:transparent;border:1px solid rgba(107,33,168,.28);
                   color:var(--text-dim);font-family:var(--font-mono);font-size:8px;
                   letter-spacing:1.5px;padding:3px 10px;border-radius:2px;cursor:pointer;
                   transition:all .15s;"
            onclick="ChronosUI.toggleFollowCiv(${civ.id},'${civ.n.replace(/'/g,"\\'")}')">
            ${(typeof NotificationsEngine !== 'undefined' && NotificationsEngine.isFollowing('civ', civ.id))
              ? '✓ FOLLOWING' : '+ FOLLOW'}
          </button>
        </div>
      </div>`;

    panel.classList.add('visible');
    const backdrop = document.getElementById('info-panel-backdrop');
    if (backdrop) backdrop.classList.add('visible');
    // Mobile hook: pages can key off body.panel-open to collapse other
    // columns (e.g. community.html's list) while the panel is showing.
    document.body.classList.add('panel-open');
  }

  function hideInfo() {
    const panel = document.getElementById('info-panel');
    if (panel) panel.classList.remove('visible');
    const backdrop = document.getElementById('info-panel-backdrop');
    if (backdrop) backdrop.classList.remove('visible');
    document.body.classList.remove('panel-open');
    if (window.CLIO) CLIO.setActiveCiv(null);
  }

  // ── DEEP LINK — open a civ panel from ?civ=ID in the URL ───
  function openFromURL() {
    const params = new URLSearchParams(window.location.search);
    const civId = parseInt(params.get('civ'), 10);
    if (!civId || !window.CIVS) return;
    const civ = CIVS.find(c => c.id === civId);
    if (!civ) return;
    // Pan timeline to the civ and open its panel (timeline page only)
    if (window.TimelineEngine && TimelineEngine.focusCiv) {
      TimelineEngine.focusCiv(civId);
    }
    showInfo(civ, getVotes());
  }

  // ── VOTE HANDLER (Phase 8b / Phase 9) ─────────────────────
  // Registers the vote with TimelineEngine as before, then fires the
  // Phase 8 share prompt and Phase 9 notifications follow event.
  function handleVote(civId, direction) {
    if (window.TimelineEngine && TimelineEngine.registerVote) {
      TimelineEngine.registerVote(civId, direction);
    } else {
      _registerLocalVote(civId, direction);
    }

    // Refresh the open panel so vote counts/percentage reflect the new
    // state immediately — needed on pages without TimelineEngine's own
    // re-render loop (globe.html, community.html); harmless on the
    // timeline page too, since it re-renders the same cached civ/votes.
    if (_lastCiv && _lastCiv.id === civId) showInfo(_lastCiv, _lastVotes);

    // Phase 9: auto-follow the civ and push a notification event
    if (window.NotificationsEngine && _lastCiv && _lastCiv.id === civId) {
      NotificationsEngine.onCivVote(civId, _lastCiv.n, direction);
      // Refresh the follow button label in the open panel
      const btn = document.getElementById('btn-follow-civ');
      if (btn) {
        btn.textContent = '✓ FOLLOWING';
        btn.style.borderColor = 'var(--violet)';
        btn.style.color = 'var(--violet-hi)';
      }
    }

    if (!window.ShareEngine) return;
    if (!_lastCiv || _lastCiv.id !== civId) return;

    const civ = _lastCiv;
    const v   = (_lastVotes && _lastVotes[civId]) || {};
    const upCount = civ.up + (v.up ? 1 : 0);
    const dnCount = civ.dn + (v.dn ? 1 : 0);

    ShareEngine.triggerShare({
      type:      'vote',
      civId:     civ.id,
      civName:   civ.n,
      voteCount: upCount,
      dnCount:   dnCount,
    });
  }

  // ── FOLLOW TOGGLE (Phase 9) ────────────────────────────────
  function toggleFollowCiv(civId, civName) {
    if (typeof NotificationsEngine === 'undefined') return;
    const btn = document.getElementById('btn-follow-civ');
    if (NotificationsEngine.isFollowing('civ', civId)) {
      NotificationsEngine.unfollow('civ', civId);
      if (btn) {
        btn.textContent = '+ FOLLOW';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.style.background = '';
      }
    } else {
      NotificationsEngine.follow('civ', civId, civName);
      if (btn) {
        btn.textContent = '✓ FOLLOWING';
        btn.style.borderColor = 'var(--violet)';
        btn.style.color = 'var(--violet-hi)';
        btn.style.background = 'rgba(107,33,168,.08)';
      }
    }
  }

  // ── SEARCH ────────────────────────────────────────────────
  function buildSearch() {
    const el = document.getElementById('search-box');
    if (!el) return;
    el.addEventListener('input', () => {
      const q = el.value.toLowerCase().trim();
      const hint = document.getElementById('search-hint');
      if (!hint) return;
      if (!q) { hint.textContent = ''; return; }
      const matches = CIVS.filter(c =>
        c.n.toLowerCase().includes(q) ||
        c.r.toLowerCase().includes(q) ||
        (c.d && c.d.toLowerCase().includes(q))
      );
      hint.textContent = `${matches.length} result${matches.length !== 1 ? 's' : ''}`;
      if (window.FilterEngine) FilterEngine.setSearch(q);
    });
  }

  // ── ESCAPE KEY CLOSES PANEL ──────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideInfo();
  });

  // ── ROW LIMIT CONTROL ────────────────────────────────────
  function buildRowLimit() {
    const sel = document.getElementById('row-limit-select');
    if (!sel) return;
    sel.addEventListener('change', () => {
      TimelineEngine.setRowLimit(parseInt(sel.value, 10));
    });
  }

  // ── OVERFLOW DRAWER ───────────────────────────────────────
  // Called by timeline.js after every render with the list of civs
  // bumped out of view by the row limit.
  const TYPE_COLOR = { confirmed: '#E8A020', theorized: '#4A7FD4', debated: '#2AADA0' };

  function updateOverflowDrawer(overflow) {
    const drawer = document.getElementById('overflow-drawer');
    const list   = document.getElementById('overflow-list');
    const count  = document.getElementById('overflow-count');
    if (!drawer || !list || !count) return;

    if (!overflow || overflow.length === 0) {
      drawer.style.display = 'none';
      return;
    }

    drawer.style.display = 'block';
    count.textContent = overflow.length;

    // Only rebuild rows if the count changed, to avoid thrashing the DOM
    // on every render call while panning/zooming.
    if (list.dataset.count === String(overflow.length) && list.children.length) return;
    list.dataset.count = String(overflow.length);

    list.innerHTML = overflow.map(c => `
      <div class="overflow-row" onclick="ChronosUI.openOverflowCiv(${c.id})">
        <span class="overflow-row-dot" style="background:${TYPE_COLOR[c.t]}"></span>
        <span class="overflow-row-name">${c.n}</span>
        <span class="overflow-row-dates">${_fmtYear(c.s)} → ${_fmtYear(c.e)}</span>
      </div>
    `).join('');
  }

  // Only ever called from the overflow drawer, which only exists on the
  // timeline page — TimelineEngine is guaranteed present here, but the
  // guards are kept for safety/consistency with the rest of the file.
  function openOverflowCiv(civId) {
    const civ = CIVS.find(c => c.id === civId);
    if (!civ) return;
    showInfo(civ, getVotes());
    if (window.TimelineEngine && TimelineEngine.focusCiv) TimelineEngine.focusCiv(civId);
  }

  function toggleOverflowDrawer() {
    const drawer = document.getElementById('overflow-drawer');
    if (drawer) drawer.classList.toggle('open');
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    buildPresets();
    buildSearch();
    buildRowLimit();

    // Timeline-canvas setup only runs on index.html — globe.html and
    // community.html load ui.js purely for the shared side panel and
    // don't have a #timeline-canvas element.
    if (document.getElementById('timeline-canvas') && window.TimelineEngine) {
      TimelineEngine.init('timeline-canvas', 'timeline-wrap');
      if (window.CelestialEngine) CelestialEngine.init('timeline-canvas', 'timeline-wrap');
    }

    const overflowToggle = document.getElementById('overflow-toggle');
    if (overflowToggle) overflowToggle.addEventListener('click', toggleOverflowDrawer);

    // Clicking the backdrop closes the panel — wired once, works on
    // every page that includes the #info-panel-backdrop element.
    const backdrop = document.getElementById('info-panel-backdrop');
    if (backdrop && !backdrop.dataset.wired) {
      backdrop.dataset.wired = '1';
      backdrop.addEventListener('click', hideInfo);
    }

    // Allow layout to settle before honouring a ?civ=ID deep link
    setTimeout(openFromURL, 150);
  }

  return {
    init, showInfo, hideInfo, handleVote, toggleFollowCiv, openFromURL,
    updateOverflowDrawer, openOverflowCiv, toggleOverflowDrawer, getVotes,
  };

})();

document.addEventListener('DOMContentLoaded', ChronosUI.init);

// ============================================================
// CHRONOS — portal-panels.js
// Phase 3b: Portal panel renderers
// Phase 8b: "Mark Complete" on a collection triggers
//           ShareEngine.triggerShare() — see Bible §Phase 8.
// Phase 9:  Insights panel (8th panel) added.
//           markCollectionComplete now fires NotificationsEngine.onCollectionComplete().
// Depends on: portal.js (PortalEngine must be loaded first)
//             notifications.js (NotificationsEngine — optional guard)
// Global: PortalPanels
// ============================================================

const PortalPanels = (() => {

  // Convenience aliases into PortalEngine
  const S    = () => PortalEngine.state;
  const save = (k, v) => PortalEngine._save(k, v);
  const log  = (t, c) => PortalEngine.logActivity(t, c);
  const t    = msg   => PortalEngine.toast(msg);
  const fmt  = ts    => PortalEngine.fmtDate(ts);

  // ── DISPATCHER ────────────────────────────────────────────────────

  function render(name) {
    switch (name) {
      case 'collections': renderCollections(); break;
      case 'saved':       renderSaved();       break;
      case 'notes':       renderNotes();       break;
      case 'queue':       renderQueue();       break;
      case 'bookmarks':   renderBookmarks();   break;
      case 'insights':    renderInsights();    break;
    }
  }

  // ── COLLECTIONS ───────────────────────────────────────────────────

  function renderCollections() {
    const grid   = document.getElementById('collectionGrid');
    if (!grid) return;
    const search = (document.getElementById('collectionSearch')?.value || '').toLowerCase();
    const filtered = S().collections.filter(c =>
      !search || c.name.toLowerCase().includes(search) || (c.desc||'').toLowerCase().includes(search)
    );
    let html = filtered.map(c => {
      const tags = c.civIds.slice(0,3).map(id => {
        const civ = typeof CIVS !== 'undefined' ? CIVS.find(x => x.id === id) : null;
        return civ ? `<span class="coll-tag">${civ.n}</span>` : '';
      }).join('');
      const extra = c.civIds.length > 3 ? `<span class="coll-tag">+${c.civIds.length-3}</span>` : '';
      const completeControl = c.completed
        ? `<span class="coll-tag" style="background:var(--teal-hi);color:#06080f;">✓ Completed</span>`
        : `<button class="btn-secondary" style="font-size:0.65rem;padding:3px 10px;margin-top:8px;"
                   data-complete="${c.id}">Mark Complete</button>`;
      return `<div class="collection-card" data-id="${c.id}">
        <div class="collection-card-name">${c.name}</div>
        <div class="collection-card-meta">${c.civIds.length} civs · ${fmt(c.created)}</div>
        <div class="collection-card-tags">${tags}${extra}</div>
        ${c.desc ? `<div style="font-size:0.68rem;color:var(--text-dim);margin-top:6px">${c.desc}</div>` : ''}
        ${completeControl}
      </div>`;
    }).join('');
    html += `<button class="new-collection-btn" id="newCollectionBtnGrid">+ New Collection</button>`;
    grid.innerHTML = html;
    grid.querySelectorAll('.collection-card').forEach(card =>
      card.addEventListener('click', () => t(`Collection: ${S().collections.find(c=>c.id==card.dataset.id)?.name}`))
    );
    grid.querySelectorAll('[data-complete]').forEach(btn =>
      btn.addEventListener('click', e => {
        e.stopPropagation();
        markCollectionComplete(btn.dataset.complete);
      })
    );
    document.getElementById('newCollectionBtnGrid')?.addEventListener('click', openCollectionModal);
    PortalEngine.updateBadges();
  }

  // Phase 8b: marks a collection as complete and fires the Phase 8
  // "I've built a [Collection name] research set on Tempus Linea" share
  // prompt (medium priority trigger from Bible §Phase 8).
  function markCollectionComplete(id) {
    const coll = S().collections.find(c => c.id == id);
    if (!coll) return;
    if (coll.completed) return;

    coll.completed   = true;
    coll.completedAt = Date.now();
    save('collections', S().collections);

    log(`Completed collection: ${coll.name}`, 'var(--teal-hi)');
    t('Collection marked complete');

    if (window.ShareEngine) {
      ShareEngine.triggerShare({
        type:           'collection',
        collectionName: coll.name,
      });
    }

    // Phase 9: auto-follow the collection and push a completion notification
    if (window.NotificationsEngine) {
      NotificationsEngine.onCollectionComplete(coll.id, coll.name);
    }

    renderCollections();
    PortalEngine.updateBadges();
  }

  function openCollectionModal() {
    document.getElementById('collectionModal')?.classList.add('open');
    document.getElementById('newCollectionName')?.focus();
  }

  function createCollection() {
    const name = document.getElementById('newCollectionName')?.value.trim();
    const desc = document.getElementById('newCollectionDesc')?.value.trim();
    if (!name) { t('Please enter a collection name'); return; }
    S().collections.push({ id: Date.now(), name, desc, civIds:[], created: Date.now(), completed: false });
    save('collections', S().collections);
    document.getElementById('collectionModal')?.classList.remove('open');
    if (document.getElementById('newCollectionName')) document.getElementById('newCollectionName').value = '';
    if (document.getElementById('newCollectionDesc')) document.getElementById('newCollectionDesc').value = '';
    log(`Created collection: ${name}`, 'var(--gold)');
    t('Collection created');
    renderCollections();
    PortalEngine.updateBadges();
  }

  // ── SAVED CIVS ────────────────────────────────────────────────────

  function renderSaved() {
    const list   = document.getElementById('savedList');
    if (!list) return;
    const search = (document.getElementById('savedSearch')?.value || '').toLowerCase();
    const filter = document.querySelector('.filter-chip.active')?.dataset.filter || 'all';
    const civs   = S().saved.filter(c => {
      const mf = filter === 'all' || c.t === filter;
      const ms = !search || c.n.toLowerCase().includes(search) || (c.r||'').toLowerCase().includes(search);
      return mf && ms;
    });
    if (!civs.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">◇</div><div class="empty-title">No saved civilisations</div><div class="empty-body">Use the Timeline or Living Atlas to save civs to your portal.</div></div>`;
      return;
    }
    list.innerHTML = civs.map(c =>
      `<div class="saved-civ-row">
        <span class="civ-type-dot dot-${c.t}"></span>
        <span class="saved-civ-name">${c.n}</span>
        <span class="saved-civ-region">${c.r||''}</span>
        ${c.note ? '<span class="saved-civ-note-indicator">✦ note</span>' : ''}
        <button class="saved-civ-remove" data-id="${c.id}" title="Remove">×</button>
      </div>`
    ).join('');
    list.querySelectorAll('.saved-civ-remove').forEach(btn =>
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const civ = S().saved.find(c => c.id == btn.dataset.id);
        S().saved.splice(S().saved.findIndex(c => c.id == btn.dataset.id), 1);
        save('saved', S().saved);
        if (civ) log(`Removed: ${civ.n}`, 'var(--text-dim)');
        t('Removed');
        renderSaved();
        PortalEngine.updateBadges();
      })
    );
    PortalEngine.updateBadges();
  }

  // ── NOTES ─────────────────────────────────────────────────────────

  function renderNotes() {
    const list = document.getElementById('notesList');
    if (!list) return;
    if (!S().notes.length) {
      list.innerHTML = `<div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);padding:12px 0">No notes yet. Create one →</div>`;
    } else {
      list.innerHTML = S().notes.map(n =>
        `<div class="note-item${S().activeNote===n.id?' active':''}" data-id="${n.id}">
          <div class="note-item-title">${n.title||'(untitled)'}</div>
          <div class="note-item-meta">${fmt(n.updated||n.created)}</div>
        </div>`
      ).join('');
      list.querySelectorAll('.note-item').forEach(item =>
        item.addEventListener('click', () => openNote(parseInt(item.dataset.id)))
      );
    }
    const note = S().notes.find(n => n.id === S().activeNote);
    if (note) _showNoteEditor(note);
    else {
      document.getElementById('noteEditor').style.display    = 'none';
      document.getElementById('noteEmptyState').style.display = 'flex';
    }
    PortalEngine.updateBadges();
  }

  function openNote(id) {
    S().activeNote = id;
    const note = S().notes.find(n => n.id === id);
    if (note) _showNoteEditor(note);
    renderNotes();
  }

  function _showNoteEditor(note) {
    document.getElementById('noteEmptyState').style.display = 'none';
    document.getElementById('noteEditor').style.display     = 'flex';
    if (document.getElementById('noteTitleInput')) document.getElementById('noteTitleInput').value = note.title||'';
    if (document.getElementById('noteLinkInput'))  document.getElementById('noteLinkInput').value  = note.link ||'';
    if (document.getElementById('noteBodyInput'))  document.getElementById('noteBodyInput').value  = note.body ||'';
  }

  function newNote() {
    const note = { id:Date.now(), title:'', link:'', body:'', created:Date.now(), updated:Date.now() };
    S().notes.unshift(note);
    save('notes', S().notes);
    S().activeNote = note.id;
    log('Created new note', 'var(--violet-hi)');
    renderNotes();
    _showNoteEditor(note);
    document.getElementById('noteTitleInput')?.focus();
    PortalEngine.updateBadges();
  }

  function saveNote() {
    const note = S().notes.find(n => n.id === S().activeNote);
    if (!note) return;
    note.title   = document.getElementById('noteTitleInput')?.value || '';
    note.link    = document.getElementById('noteLinkInput')?.value  || '';
    note.body    = document.getElementById('noteBodyInput')?.value  || '';
    note.updated = Date.now();
    save('notes', S().notes);
    log(`Note saved: ${note.title||'(untitled)'}`, 'var(--violet-hi)');
    t('Note saved');
    renderNotes();
  }

  function deleteNote() {
    const note = S().notes.find(n => n.id === S().activeNote);
    S().notes.splice(S().notes.findIndex(n => n.id === S().activeNote), 1);
    save('notes', S().notes);
    S().activeNote = null;
    if (note) log(`Deleted note: ${note.title||'(untitled)'}`, 'var(--text-dim)');
    t('Note deleted');
    document.getElementById('noteEditor').style.display    = 'none';
    document.getElementById('noteEmptyState').style.display = 'flex';
    renderNotes();
    PortalEngine.updateBadges();
  }

  // ── DRAFT QUEUE ───────────────────────────────────────────────────

  function renderQueue() {
    const list = document.getElementById('queueList');
    if (!list) return;
    if (!S().queue.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">⟐</div><div class="empty-title">No drafts yet</div><div class="empty-body">Draft a new civilisation entry, date theory, or thread post to stage it for community submission.</div></div>`;
      return;
    }
    list.innerHTML = S().queue.map(q =>
      `<div class="queue-item">
        <div class="queue-item-header">
          <span class="queue-status ${q.status}">${q.status.toUpperCase()}</span>
          <span class="queue-item-title">${q.title||'(untitled draft)'}</span>
        </div>
        <div class="queue-item-body">${(q.body||'').slice(0,180)}${(q.body||'').length>180?'…':''}</div>
        <div class="queue-item-actions">
          <button class="btn-secondary" style="font-size:0.68rem;padding:4px 10px" data-delete="${q.id}">Delete</button>
          ${q.status==='draft'?`<button class="btn-primary" style="font-size:0.68rem;padding:4px 10px" data-ready="${q.id}">Mark Ready</button>`:''}
        </div>
      </div>`
    ).join('');
    list.querySelectorAll('[data-delete]').forEach(btn =>
      btn.addEventListener('click', () => {
        S().queue.splice(S().queue.findIndex(q=>q.id==btn.dataset.delete),1);
        save('queue', S().queue);
        t('Draft deleted'); renderQueue(); PortalEngine.updateBadges();
      })
    );
    list.querySelectorAll('[data-ready]').forEach(btn =>
      btn.addEventListener('click', () => {
        const item = S().queue.find(q=>q.id==btn.dataset.ready);
        if (item) { item.status='ready'; save('queue',S().queue); }
        log(`Draft ready: ${item?.title||''}`, 'var(--teal-hi)');
        t('Marked as ready'); renderQueue();
      })
    );
    PortalEngine.updateBadges();
  }

  function newDraft() {
    S().queue.push({ id:Date.now(), type:'civ', title:'New Draft Entry', body:'', status:'draft', created:Date.now() });
    save('queue', S().queue);
    log('Created draft entry','var(--gold)');
    t('Draft created'); renderQueue(); PortalEngine.updateBadges();
  }

  // ── BOOKMARKS ─────────────────────────────────────────────────────

  function renderBookmarks() {
    const list = document.getElementById('bookmarkList');
    if (!list) return;
    if (!S().bookmarks.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">◈</div><div class="empty-title">No bookmarks yet</div><div class="empty-body">Bookmark community threads, researcher pages, or external sources to collect them here.</div></div>`;
      return;
    }
    list.innerHTML = S().bookmarks.map(b =>
      `<div class="saved-civ-row">
        <span class="civ-type-dot" style="background:var(--teal-hi)"></span>
        <span class="saved-civ-name">${b.label}</span>
        <span class="saved-civ-region">${b.type||'link'}</span>
        <button class="saved-civ-remove" data-id="${b.id}" title="Remove">×</button>
      </div>`
    ).join('');
    list.querySelectorAll('.saved-civ-remove').forEach(btn =>
      btn.addEventListener('click', () => {
        S().bookmarks.splice(S().bookmarks.findIndex(b=>b.id==btn.dataset.id),1);
        save('bookmarks',S().bookmarks);
        t('Bookmark removed'); renderBookmarks(); PortalEngine.updateBadges();
      })
    );
    PortalEngine.updateBadges();
  }

  // ── INSIGHTS PANEL (Phase 9 — 8th panel) ─────────────────────────

  function renderInsights() {
    const panel = document.getElementById('panel-insights');
    if (!panel) return;

    if (typeof NotificationsEngine === 'undefined') {
      panel.innerHTML = `<div class="empty-state">
        <div class="empty-icon">◈</div>
        <div class="empty-title">Insights unavailable</div>
        <div class="empty-body">Notifications engine not loaded.</div>
      </div>`;
      return;
    }

    const ins = NotificationsEngine.getInsightsSummary();

    // ── Summary strip ──────────────────────────────────────
    const summaryHtml = `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;
                  margin-bottom:20px;">
        ${[
          { val: ins.votesCast,    label: 'VOTES CAST',   color: 'var(--teal-hi)' },
          { val: ins.pinsPlaced,   label: 'PINS PLACED',  color: 'var(--gold)' },
          { val: ins.postsCreated, label: 'POSTS',        color: 'var(--violet-hi)' },
          { val: ins.following,    label: 'FOLLOWING',    color: 'var(--text-secondary)' },
        ].map(s => `
          <div style="background:var(--bg-card);border:1px solid var(--border-dim);
                      border-radius:4px;padding:12px 10px;text-align:center;">
            <div style="font-size:22px;color:${s.color};font-family:var(--font-mono);
                        font-weight:700;margin-bottom:4px;">${s.val}</div>
            <div style="font-size:7px;letter-spacing:2px;color:var(--text-dim);">${s.label}</div>
          </div>`).join('')}
      </div>`;

    // ── Top contributions ──────────────────────────────────
    const topHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
        <div style="background:var(--bg-card);border:1px solid rgba(26,154,153,.2);
                    border-radius:4px;padding:12px;">
          <div style="font-size:8px;letter-spacing:2px;color:var(--teal-hi);margin-bottom:6px;">
            ▲ MOST SUPPORTED
          </div>
          ${ins.topSupport
            ? `<div style="font-size:11px;color:var(--text-primary);">${_escHtml(ins.topSupport.subject)}</div>
               <div style="font-size:9px;color:var(--teal-hi);margin-top:3px;">
                 ${ins.topSupport.up} up · ${ins.topSupport.dn} down</div>`
            : `<div style="font-size:10px;color:var(--text-dim);">No data yet</div>`}
        </div>
        <div style="background:var(--bg-card);border:1px solid rgba(107,33,168,.2);
                    border-radius:4px;padding:12px;">
          <div style="font-size:8px;letter-spacing:2px;color:var(--violet-hi);margin-bottom:6px;">
            ◈ MOST DEBATED
          </div>
          ${ins.topDebate
            ? `<div style="font-size:11px;color:var(--text-primary);">${_escHtml(ins.topDebate.subject)}</div>
               <div style="font-size:9px;color:var(--violet-hi);margin-top:3px;">
                 ${ins.topDebate.up} up · ${ins.topDebate.dn} down</div>`
            : `<div style="font-size:10px;color:var(--text-dim);">No data yet</div>`}
        </div>
      </div>`;

    // ── Milestone badges ───────────────────────────────────
    const badgesHtml = ins.badges.length ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:8px;letter-spacing:2px;color:var(--text-dim);margin-bottom:10px;">
          ◈ MILESTONE BADGES
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${ins.badges.map(b => `
            <div style="background:var(--bg-card);border:1px solid rgba(212,160,23,.25);
                        border-radius:4px;padding:8px 12px;display:flex;gap:8px;
                        align-items:center;min-width:140px;">
              <span style="font-size:16px;color:var(--gold);">${b.icon}</span>
              <div>
                <div style="font-size:10px;color:var(--gold);letter-spacing:.5px;">
                  ${_escHtml(b.label)}</div>
                <div style="font-size:8px;color:var(--text-dim);margin-top:2px;line-height:1.4;">
                  ${_escHtml(b.desc)}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>` : `
      <div style="margin-bottom:20px;padding:12px;background:var(--bg-card);
                  border:1px solid var(--border-dim);border-radius:4px;
                  font-size:10px;color:var(--text-dim);text-align:center;">
        ◈ No badges yet — start contributing to earn them.
      </div>`;

    // ── Activity feed ──────────────────────────────────────
    const feedHtml = `
      <div>
        <div style="font-size:8px;letter-spacing:2px;color:var(--text-dim);margin-bottom:10px;">
          ◈ RECENT ACTIVITY
        </div>
        ${ins.recentActivity.length ? ins.recentActivity.slice(0,15).map(n => {
          const d    = new Date(n.ts);
          const time = d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
          const date = d.toLocaleDateString([], { day:'numeric', month:'short' });
          const iconColor = {
            vote_up:    'var(--teal-hi)',
            vote_dn:    'var(--text-dim)',
            reply:      'var(--violet-hi)',
            new_post:   'var(--gold)',
            milestone:  'var(--gold)',
            nearby_pin: 'var(--teal-hi)',
          }[n.type] || 'var(--text-dim)';
          return `<div style="display:flex;gap:10px;padding:8px 0;
                              border-bottom:1px solid rgba(12,35,80,.2);align-items:flex-start;">
            <span style="font-size:12px;color:${iconColor};width:16px;
                         text-align:center;flex-shrink:0;">${n.icon || '◈'}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-size:10px;color:var(--text-secondary);
                          line-height:1.5;">${_escHtml(n.message)}</div>
              <div style="font-size:8px;color:var(--text-dim);margin-top:2px;
                          letter-spacing:1px;">${date} · ${time}</div>
            </div>
          </div>`;
        }).join('') : `<div style="font-size:10px;color:var(--text-dim);padding:12px 0;">
          No activity recorded yet.</div>`}
      </div>`;

    panel.innerHTML = `
      <div style="padding:0 0 16px;">
        <div style="font-size:9px;letter-spacing:2px;color:var(--text-dim);
                    margin-bottom:16px;">◈ YOUR RESEARCH INSIGHTS</div>
        ${summaryHtml}
        ${topHtml}
        ${badgesHtml}
        ${feedHtml}
      </div>`;
  }

  // ── HTML ESCAPE HELPER ────────────────────────────────────────────
  function _escHtml(str) {
    return String(str || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── BIND PANEL-SPECIFIC EVENTS (called once from portal.js init) ──

  function bindEvents() {
    document.getElementById('newCollectionBtn')?.addEventListener('click', openCollectionModal);
    document.getElementById('confirmCollectionBtn')?.addEventListener('click', createCollection);
    document.getElementById('cancelCollectionBtn')?.addEventListener('click', () =>
      document.getElementById('collectionModal')?.classList.remove('open')
    );
    document.getElementById('collectionSearch')?.addEventListener('input', renderCollections);
    document.getElementById('savedSearch')?.addEventListener('input', renderSaved);
    document.querySelectorAll('.filter-chip').forEach(chip =>
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderSaved();
      })
    );
    document.getElementById('newNoteBtn')?.addEventListener('click', newNote);
    document.getElementById('saveNoteBtn')?.addEventListener('click', saveNote);
    document.getElementById('deleteNoteBtn')?.addEventListener('click', deleteNote);
    document.getElementById('newDraftBtn')?.addEventListener('click', newDraft);
  }

  return { render, bindEvents, markCollectionComplete, renderInsights };

})();

// Bind panel events after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof PortalPanels !== 'undefined') PortalPanels.bindEvents();
});

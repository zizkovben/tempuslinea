/* ============================================================
   CHRONOS · filters.js
   Multi-dimensional filter engine + collapsible filter drawer UI.
   Depends on: data.js, data-extended.js, timeline.js
   Exposes: FilterEngine (global)
   ============================================================ */

const FilterEngine = (() => {

  // ── FILTER STATE ─────────────────────────────────────────
  // Each key maps to a Set of active option keys.
  // Empty Set = "show all" for that dimension.
  const state = {
    status:     new Set(),
    era:        new Set(),
    continent:  new Set(),
    language:   new Set(),
    religion:   new Set(),
    governance: new Set(),
    population: new Set(),
  };

  // Map FILTER_DEFS group names to CIVS field names
  const FIELD_MAP = {
    status:     't',
    era:        'era',
    continent:  'cont',
    language:   'lang',
    religion:   'rel',
    governance: 'gov',
    population: 'pop',
  };

  // Text search string
  let searchQuery = '';

  // ── FILTER LOGIC ─────────────────────────────────────────
  // Returns filtered CIVS array applying all active filters.
  // Within a group: OR (civ matches any checked option).
  // Between groups: AND (civ must pass every active group).
  function getFiltered() {
    return CIVS.filter(c => {
      // Text search across name, description, region, tags
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const hay = [c.n, c.d, c.r, ...(c.tags || [])].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      // Dimensional filters
      for (const [group, fieldKey] of Object.entries(FIELD_MAP)) {
        const active = state[group];
        if (active.size === 0) continue;         // no filter = show all
        const val = c[fieldKey];
        if (!active.has(val)) return false;       // must match one active key
      }
      return true;
    });
  }

  // ── ACTIVE FILTER COUNT ───────────────────────────────────
  function activeCount() {
    return Object.values(state).reduce((n, s) => n + s.size, 0) +
           (searchQuery ? 1 : 0);
  }

  // ── TOGGLE A SINGLE OPTION ────────────────────────────────
  function toggle(group, key) {
    if (state[group].has(key)) state[group].delete(key);
    else state[group].add(key);
    refresh();
  }

  // ── CLEAR ALL ────────────────────────────────────────────
  function clearAll() {
    Object.values(state).forEach(s => s.clear());
    searchQuery = '';
    const sb = document.getElementById('search-box');
    if (sb) sb.value = '';
    rebuildChips();
    updateBadge();
    rebuildCheckboxStates();
    if (window.TimelineEngine) TimelineEngine.setFilteredCivs(getFiltered());
  }

  // ── SEARCH ───────────────────────────────────────────────
  function setSearch(q) {
    searchQuery = q.trim().toLowerCase();
    refresh();
  }

  // ── REFRESH (apply + redraw) ─────────────────────────────
  function refresh() {
    rebuildChips();
    updateBadge();
    if (window.TimelineEngine) TimelineEngine.setFilteredCivs(getFiltered());
  }

  // ── CHIP STRIP ───────────────────────────────────────────
  function rebuildChips() {
    const strip = document.getElementById('filter-chips');
    if (!strip) return;
    strip.innerHTML = '';
    const cnt = activeCount();
    strip.style.display = cnt > 0 ? 'flex' : 'none';
    if (cnt === 0) return;

    // Text search chip
    if (searchQuery) {
      strip.appendChild(makeChip(`"${searchQuery}"`, () => {
        searchQuery = '';
        const sb = document.getElementById('search-box');
        if (sb) sb.value = '';
        refresh();
      }, '#334466'));
    }

    // Dimensional chips
    Object.entries(state).forEach(([group, activeSet]) => {
      if (activeSet.size === 0) return;
      const def = FILTER_DEFS[group];
      activeSet.forEach(key => {
        const opt = def.options.find(o => o.key === key);
        if (!opt) return;
        strip.appendChild(makeChip(
          `${def.label}: ${opt.label}`,
          () => { toggle(group, key); uncheckBox(group, key); },
          opt.color || '#1a4060'
        ));
      });
    });

    // Clear all
    if (cnt > 1) {
      const ca = document.createElement('button');
      ca.style.cssText = 'background:transparent;border:1px solid rgba(180,60,60,.3);' +
        'color:rgba(220,100,100,.7);font-size:9px;letter-spacing:1px;padding:3px 9px;' +
        'cursor:pointer;border-radius:3px;font-family:var(--font-mono);white-space:nowrap;';
      ca.textContent = '✕ CLEAR ALL';
      ca.addEventListener('click', clearAll);
      strip.appendChild(ca);
    }
  }

  function makeChip(label, onRemove, color) {
    const chip = document.createElement('span');
    chip.style.cssText = `display:inline-flex;align-items:center;gap:5px;` +
      `background:rgba(10,20,40,.7);border:1px solid ${color || '#1a4060'};` +
      `color:${color || '#4488aa'};font-size:9px;letter-spacing:.8px;` +
      `padding:3px 8px 3px 10px;border-radius:3px;white-space:nowrap;`;
    chip.innerHTML = `${label} <span style="cursor:pointer;opacity:.7;font-size:11px;"
      onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.7">×</span>`;
    chip.querySelector('span').addEventListener('click', onRemove);
    return chip;
  }

  // ── UPDATE BADGE ─────────────────────────────────────────
  function updateBadge() {
    const badge = document.getElementById('filter-badge');
    if (!badge) return;
    const n = activeCount();
    badge.textContent = n > 0 ? ` (${n} active)` : '';
    badge.style.color  = n > 0 ? '#c09010' : 'var(--text-dim)';
  }

  // ── SYNC CHECKBOX VISUAL STATE ────────────────────────────
  function rebuildCheckboxStates() {
    Object.entries(state).forEach(([group, activeSet]) => {
      document.querySelectorAll(`[data-filter-group="${group}"]`).forEach(cb => {
        cb.checked = activeSet.has(cb.dataset.filterKey);
        updateCheckLabel(cb);
      });
    });
  }

  function uncheckBox(group, key) {
    const cb = document.querySelector(
      `[data-filter-group="${group}"][data-filter-key="${key}"]`);
    if (cb) { cb.checked = false; updateCheckLabel(cb); }
  }

  function updateCheckLabel(cb) {
    const lbl = cb.closest('label');
    if (lbl) lbl.style.color = cb.checked ? '#c8a030' : 'var(--text-secondary)';
  }

  // ── BUILD PANEL HTML ──────────────────────────────────────
  function buildPanel() {
    const el = document.getElementById('filter-panel');
    if (!el) return;

    const groups = Object.entries(FILTER_DEFS);
    const cols = groups.map(([group, def]) => {
      const rows = def.options.map(opt => {
        const isActive = state[group] && state[group].has(opt.key);
        const dot = opt.color
          ? `<span style="display:inline-block;width:9px;height:9px;border-radius:2px;
               background:${opt.color};flex-shrink:0;"></span>`
          : '';
        return `<label style="display:flex;align-items:center;gap:7px;cursor:pointer;
                  padding:3px 0;color:${isActive?'#c8a030':'var(--text-secondary)'};
                  font-size:10px;letter-spacing:.5px;transition:color .15s;">
          <input type="checkbox" data-filter-group="${group}" data-filter-key="${opt.key}"
            ${isActive?'checked':''} style="accent-color:#c09010;cursor:pointer;flex-shrink:0;">
          ${dot}${opt.label}
        </label>`;
      }).join('');

      return `<div style="min-width:160px;">
        <div style="font-size:8px;letter-spacing:2px;color:var(--text-dim);
             margin-bottom:8px;border-bottom:1px solid rgba(12,35,80,.5);
             padding-bottom:4px;">${def.label}</div>
        ${rows}
      </div>`;
    }).join('');

    el.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));
           gap:18px 24px;padding:14px 20px 16px;background:var(--bg-card);
           border-bottom:1px solid var(--border-dim);">
        ${cols}
      </div>`;

    // Wire checkbox events
    el.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', () => {
        toggle(cb.dataset.filterGroup, cb.dataset.filterKey);
        updateCheckLabel(cb);
      });
    });
  }

  // ── INIT ─────────────────────────────────────────────────
  function init() {
    // Wire search box
    const sb = document.getElementById('search-box');
    if (sb) {
      sb.addEventListener('input', () => setSearch(sb.value));
    }

    // Wire filter toggle button
    const toggleBtn = document.getElementById('filter-toggle');
    const panel     = document.getElementById('filter-panel');
    if (toggleBtn && panel) {
      toggleBtn.addEventListener('click', () => {
        const open = panel.style.display !== 'none';
        panel.style.display = open ? 'none' : 'block';
        toggleBtn.classList.toggle('active', !open);
        if (!open) buildPanel();
      });
    }

    // Initial badge
    updateBadge();

    // Tell TimelineEngine to use our filter
    if (window.TimelineEngine) {
      TimelineEngine.setFilteredCivs(getFiltered());
    }
  }

  // ── PUBLIC API ────────────────────────────────────────────
  return { init, getFiltered, toggle, clearAll, setSearch, activeCount };

})();

document.addEventListener('DOMContentLoaded', FilterEngine.init);

// globe-borders.js
// CHRONOS Phase 6 — Dynamic Borders renderer and public API
// Depends on: three.min.js, globe-borders-data.js, globe-borders-geom.js
// The soft influence-glow module (globe-borders-glow.js) was removed this
// session — owner reviewed it live and didn't want it. All glow build/
// update/dispose calls that used to live here are gone; this file no
// longer references window.GlobeBordersGlow at all.
// Exposes: window.GlobeBorders

const GlobeBorders = (() => {
  // ─── State ───────────────────────────────────────────────────────────────
  let _scene       = null;
  let _radius      = 1.0;
  let _visible     = true;
  let _opacity     = 1.0;
  let _glacial     = false;
  let _currentYear = 2024;
  let _highlighted = null;

  // All border lines live under this group instead of directly under
  // _scene. Previously they were added straight to _scene and never
  // received any rotation update, so they stayed fixed in place while
  // the terrain/ice/markers spun underneath them (auto-rotate, manual
  // drag, epoch changes — all of it). This group's rotation is kept in
  // sync with the globe every frame — see _startRotationSync().
  let _group = null;
  let _rotationSyncRunning = false;

  // entityId → { meshes: [THREE.Line], entity }
  const _objects = {};

  // Per-entity opacity override, layered on top of the global _opacity
  // slider — added this session so an individual empire can be faded/
  // hidden (e.g. Rome down to see Han underneath it) without touching
  // every other border. 1 = full, matches the entity's normal computed
  // opacity; 0 = fully hidden. Defaults to 1 for every entity (no override)
  // until the UI's per-empire toggle sets one. Stored separately from
  // _opacity so the two multiply together rather than one replacing the
  // other — see updateEntityGeometry().
  const _entityOpacityOverride = {};

  // ─── Visual style config ─────────────────────────────────────────────────
  const STYLE = {
    confirmed: { color: 0x1a9a99, baseOpacity: 0.80 },
    estimated: { color: 0x9a6e08, baseOpacity: 0.45 },
    theorized: { color: 0x8b41c8, baseOpacity: 0.28 },
    highlight: { color: 0xd4a017 }
  };

  const ANCIENT_THRESHOLD = -500;
  const ANCIENT_DIM       = 0.65;
  const SURFACE_OFFSET    = 1.003;

  // ─── Per-entity color ────────────────────────────────────────────────────
  // Previously every "confirmed" entity shared the exact same teal, so two
  // or three empires visible at once (e.g. Rome + Han + Maurya at 100 CE)
  // were indistinguishable blobs. This gives each entity a stable, distinct
  // color — deterministic so it doesn't shift between reloads, automatic so
  // new entities don't need a color hand-picked for them.
  //
  // This is a curated palette, not randomly-generated hues. An earlier
  // version picked a random hue per entity via hashing, but HSL lightness
  // isn't perceptually uniform across hues — blues and purples read
  // noticeably darker than yellows and greens at the exact same lightness
  // value, which is why some borders were hard to see against the dark
  // background. Every color below has been chosen to read clearly on
  // --bg-void; none of them need special-casing.
  //
  // Rebuilt this session — two real problems with the previous 24-color
  // version, found from a live screenshot: (1) it had only 24 colors for
  // 28 live entities, so four were guaranteed to collide via the linear-
  // probing fallback below, and (2) of those 24, eight sat in the same
  // yellow/orange family with barely any lightness separation (that's
  // exactly what made Babylonian Empire and Kingdom of Kush look like
  // the same color in the screenshot). This palette has 34 entries —
  // headroom past the current 28 so new entities don't immediately
  // force collisions again — generated at even ~10.6° hue steps around
  // the full color wheel, with lightness compensated per-hue (darker in
  // the yellow/green band, lighter in the blue/violet band) so every
  // color reads with roughly equal visual weight, not just evenly-spaced
  // hue values that still look uneven once rendered.
  const ENTITY_PALETTE = [
    '#e84646', '#e47c66', '#dc7339', '#e99e4a', '#d9a427',
    '#decb42', '#cad51a', '#b5dc37', '#82c423', '#77e52a',
    '#49c423', '#41dc37', '#1ad530', '#42de70', '#27d97b',
    '#4be9b1', '#3adcc0', '#67e4e4', '#46cce8', '#7bc1e8',
    '#629fe3', '#88a7f0', '#7380e6', '#a09ced', '#9377ee',
    '#c0a0ee', '#be81e9', '#de9bf3', '#e27de8', '#ed9be4',
    '#ed6cc7', '#eb8dbf', '#e3628f', '#ee758a'
  ];

  // Color is a pure identity signal (which empire) — unchanged this session.
  // Certainty (confirmed/estimated/theorized) used to also be carried by
  // line pattern (solid/dashed/dotted) via makeMaterial() in
  // globe-borders-geom.js. Owner decision this session: retire that —
  // certainty is the civ-marker dots' job, borders are just solid identity
  // color now. makeMaterial() has been updated accordingly (always returns
  // LineBasicMaterial, no more type-based dash branching).
  //
  // A plain hash % palette.length was tried first and produced real
  // collisions on the actual 20-entity dataset (7 of them) — the birthday
  // paradox bites hard once you're past ~15 items into a 24-slot palette.
  // A 34-color, hue-spread palette (see above) fixed the collision count,
  // but a live screenshot then surfaced a deeper problem with the hash
  // approach itself: it picks each entity's color in total isolation, with
  // no idea which entities actually appear on screen together. At 500 BCE,
  // Babylonian Empire (hash → 85°), Kingdom of Kush (106°), and Assyrian
  // Empire (74°) all independently landed in the same yellow-green band —
  // a well-spread palette doesn't help if the handful of entities visible
  // at once all happen to hash near each other, which with only ~4-12
  // entities on screen out of a 34-color wheel is a real possibility, not
  // an edge case.
  //
  // Rebuilt as a co-occurrence-aware greedy assignment instead. For each
  // entity, in chronological order (earliest active year first), the
  // colors already used by every entity it could actually appear alongside
  // are found, and the palette color that maximizes the *minimum* hue
  // distance to all of them is chosen — a classic farthest-point greedy.
  // Entities that never overlap in time are free to reuse any color; nudge
  // is spent only where it actually matters (contemporaries), not force-
  // spread across the whole dataset the way linear probing did.
  //
  // Co-occurrence is approximated from each entity's own snapshot years
  // (min/max, ± a fade buffer) rather than the exact fade window
  // GlobeBordersGeom.resolveBlend() computes internally — good enough for
  // "could these two ever be visible together," not pixel-exact, but far
  // better than no time-awareness at all. Deterministic and stable: same
  // input data always produces the same colors, and adding a new entity
  // only affects colors chosen after it in chronological order.
  let _entityColorMap = null;

  const CO_OCCURRENCE_FADE_BUFFER = 300; // years, on each side of an entity's own min/max snapshot year

  function _hexToHue(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max === min) return 0;
    const d = max - min;
    let h;
    if (max === r)      h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = (b - r) / d + 2;
    else                 h = (r - g) / d + 4;
    return h * 60;
  }

  function _hueDistance(h1, h2) {
    const d = Math.abs(h1 - h2) % 360;
    return d > 180 ? 360 - d : d;
  }

  function _buildEntityColorMap() {
    _entityColorMap = {};
    if (BORDER_ENTITIES.length > ENTITY_PALETTE.length) {
      console.warn('GlobeBorders: ' + BORDER_ENTITIES.length + ' entities but only ' +
        ENTITY_PALETTE.length + ' palette colors — some entities will share a color. ' +
        'Add more colors to ENTITY_PALETTE.');
    }

    const paletteHues = ENTITY_PALETTE.map(_hexToHue);

    // Each entity's approximate active window, from its own snapshot years.
    const windows = {};
    BORDER_ENTITIES.forEach(entity => {
      const years = Object.keys(entity.snapshots).map(Number);
      windows[entity.id] = {
        min: Math.min(...years) - CO_OCCURRENCE_FADE_BUFFER,
        max: Math.max(...years) + CO_OCCURRENCE_FADE_BUFFER,
      };
    });
    function overlaps(idA, idB) {
      return windows[idA].min <= windows[idB].max && windows[idB].min <= windows[idA].max;
    }

    // Chronological order — earlier-appearing entities claim colors first,
    // later ones are chosen to stay maximally distinct from whichever of
    // their real contemporaries are already assigned.
    const sorted = [...BORDER_ENTITIES].sort((a, b) =>
      windows[a.id].min - windows[b.id].min || a.id.localeCompare(b.id));

    sorted.forEach(entity => {
      const conflictHues = sorted
        .filter(o => o.id !== entity.id && _entityColorMap[o.id] !== undefined && overlaps(entity.id, o.id))
        .map(o => _hexToHue(_entityColorMap[o.id]));

      // Deterministic tie-break / starting point so entities with no
      // contemporaries yet still spread out across the palette instead of
      // all defaulting to index 0.
      let h = 0;
      for (let i = 0; i < entity.id.length; i++) h = (h * 31 + entity.id.charCodeAt(i)) >>> 0;
      const startOffset = h % ENTITY_PALETTE.length;

      let bestIdx = startOffset, bestScore = -1;
      for (let k = 0; k < ENTITY_PALETTE.length; k++) {
        const idx = (startOffset + k) % ENTITY_PALETTE.length;
        const score = conflictHues.length
          ? Math.min(...conflictHues.map(ch => _hueDistance(paletteHues[idx], ch)))
          : 0; // no contemporaries assigned yet — first candidate is fine
        if (score > bestScore) { bestScore = score; bestIdx = idx; }
      }
      _entityColorMap[entity.id] = ENTITY_PALETTE[bestIdx];
    });
  }

  function _entityColor(entity) {
    if (!_entityColorMap) _buildEntityColorMap();
    return new THREE.Color(_entityColorMap[entity.id] || ENTITY_PALETTE[0]);
  }

  // ─── Object construction ─────────────────────────────────────────────────

  function buildEntityObjects(entity) {
    const color = _entityColor(entity);
    const mat   = GlobeBordersGeom.makeMaterial(entity, STYLE, color);
    const years = GlobeBordersGeom.getSnapshotYears(entity);
    if (!years.length) return;

    const firstPoly = entity.snapshots[years[0]];
    const multi     = GlobeBordersGeom.isMultiPart(firstPoly);
    const parts     = multi ? firstPoly : [firstPoly];

    const meshes = parts.map(poly => {
      const pts  = GlobeBordersGeom.polygonToPoints(poly, _radius * SURFACE_OFFSET);
      const geo  = GlobeBordersGeom.buildLineGeometry(pts);
      const line = new THREE.Line(geo, mat.clone());
      line.renderOrder = 1;
      line.userData.entityId = entity.id;
      _group.add(line);
      return line;
    });

    _objects[entity.id] = { meshes, entity, color };
  }

  // ─── Per-entity geometry update ───────────────────────────────────────────

  function updateEntityGeometry(entityId, year) {
    const obj = _objects[entityId];
    if (!obj) return;

    const { entity } = obj;
    const blend = GlobeBordersGeom.resolveBlend(entity, year);

    if (!blend.entityActive) {
      // Bug fix: previously only mesh.visible was set to false here,
      // leaving material.opacity at whatever value it had from the last
      // epoch this entity WAS active. setVisible() (used by the BORDERS
      // on/off toggle) decides visibility purely from that opacity number
      // — so toggling borders off and back on was resurrecting every
      // entity that had ever been active this session, not just the ones
      // active at the current year. Zeroing opacity here keeps that check
      // honest regardless of what toggled it.
      obj.meshes.forEach(m => { m.visible = false; m.material.opacity = 0; });
      return;
    }

    const style   = STYLE[entity.type] || STYLE.confirmed;
    const ancient = year < ANCIENT_THRESHOLD && entity.type === 'confirmed';
    const dimMul  = ancient ? ANCIENT_DIM : 1.0;
    const entityMul = _entityOpacityOverride[entityId] !== undefined ? _entityOpacityOverride[entityId] : 1;
    const opacity = style.baseOpacity * (1 - entity.dissolve) * dimMul * (blend.fadeIn || 1) * _opacity * entityMul;

    const multi  = GlobeBordersGeom.isMultiPart(blend.polyA);
    const partsA = multi ? blend.polyA : [blend.polyA];
    const partsB = multi ? blend.polyB : [blend.polyB];

    obj.meshes.forEach((mesh, pi) => {
      // Same fix as the two branches above — a part that doesn't exist in
      // this frame's polygon (rare: only happens if a multi-part entity's
      // part count changes between snapshots) needs its opacity zeroed
      // too, not just visible=false, for the same setVisible() reason.
      if (pi >= partsA.length) { mesh.visible = false; mesh.material.opacity = 0; return; }
      const lerped = GlobeBordersGeom.lerpPolygons(partsA[pi], partsB[pi], blend.t);
      GlobeBordersGeom.updateLineGeometry(mesh, lerped, _radius * SURFACE_OFFSET);
      mesh.material.opacity = opacity;
      mesh.material.color.set(
        _highlighted === entity.id ? STYLE.highlight.color : obj.color
      );
      mesh.visible = _visible && opacity > 0.01;
    });
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  function init(scene, globeRadius) {
    _scene  = scene;
    _radius = globeRadius;
    _group  = new THREE.Group();
    _group.name = 'borderGroup';
    _scene.add(_group);
    BORDER_ENTITIES.forEach(entity => {
      try { buildEntityObjects(entity); }
      catch (e) { console.warn('GlobeBorders: failed to build', entity.id, e); }
    });
    updateYear(_currentYear);
    _startRotationSync();
    _startHoverPicking();
    console.log('GlobeBorders: initialised —', BORDER_ENTITIES.length, 'entities');
  }

  // Self-contained: doesn't require globe.js to call anything new.
  // Polls GlobeTerrain's last-applied rotation (exposed via
  // getRotation(), added alongside this fix) once per frame and
  // mirrors it onto _group. Falls back gracefully — if GlobeTerrain
  // isn't present for some reason, borders simply stay at their
  // built orientation instead of throwing.
  function _startRotationSync() {
    if (_rotationSyncRunning) return;
    _rotationSyncRunning = true;
    function loop() {
      if (!_rotationSyncRunning) return;
      if (_group && window.GlobeTerrain && typeof GlobeTerrain.getRotation === 'function') {
        const r = GlobeTerrain.getRotation();
        _group.rotation.y = r.y;
        _group.rotation.x = r.x;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // ─── Hover tooltip + click-to-select on the border lines themselves ──────
  // Self-contained, like the rotation sync above — doesn't require globe.js
  // to wire anything new in. Needs a camera reference, which isn't
  // currently exposed the way _scene/_radius are; this looks for common
  // patterns and degrades gracefully (no tooltip, but nothing breaks) if
  // it can't find one. See console for a warning if that happens.
  let _camera  = null;
  let _canvas  = null;
  let _raycaster = null;
  let _tooltipEl = null;

  function _findCamera() {
    return (window.GlobeEngine && (
      window.GlobeEngine._camera ||
      (typeof window.GlobeEngine.getCamera === 'function' && window.GlobeEngine.getCamera())
    )) || window._chronosCamera || null;
  }

  function _findCanvas() {
    const host = document.getElementById('globe-container');
    return (host && host.querySelector('canvas')) || document.querySelector('canvas');
  }

  function _ensureTooltip() {
    if (_tooltipEl) return _tooltipEl;
    const el = document.createElement('div');
    el.id = 'gb-hover-tooltip';
    el.style.cssText =
      'position:fixed;pointer-events:none;z-index:9999;padding:4px 10px;font-size:12px;' +
      'font-family:inherit;color:#eef4f4;background:rgba(10,18,24,0.92);' +
      'border:1px solid rgba(120,200,200,0.4);border-radius:4px;opacity:0;' +
      'transition:opacity 0.12s ease;white-space:nowrap;letter-spacing:0.02em;';
    document.body.appendChild(el);
    _tooltipEl = el;
    return el;
  }

  function _pickBorderAt(clientX, clientY) {
    const rect = _canvas.getBoundingClientRect();
    const ndc  = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    _raycaster.setFromCamera(ndc, _camera);
    const hits = _raycaster.intersectObjects(_group.children, false);
    return hits.find(h => h.object.visible && h.object.material.opacity > 0.05) || null;
  }

  function _startHoverPicking() {
    _camera = _findCamera();
    _canvas = _findCanvas();
    if (!_camera || !_canvas) {
      console.warn('GlobeBorders: hover tooltips disabled — no camera reference found ' +
        '(expected window.GlobeEngine._camera or window._chronosCamera). Borders still ' +
        'render and rotate correctly; only the hover/click label is unavailable.');
      return;
    }
    _raycaster = new THREE.Raycaster();
    _raycaster.params.Line = { threshold: _radius * 0.015 };
    const tooltip = _ensureTooltip();

    _canvas.addEventListener('mousemove', e => {
      if (!_visible || !_group) { tooltip.style.opacity = 0; return; }
      const hit = _pickBorderAt(e.clientX, e.clientY);
      if (hit) {
        const obj = _objects[hit.object.userData.entityId];
        tooltip.textContent   = obj ? obj.entity.label : '';
        tooltip.style.left    = (e.clientX + 14) + 'px';
        tooltip.style.top     = (e.clientY - 10) + 'px';
        tooltip.style.opacity = 1;
        _canvas.style.cursor  = 'pointer';
      } else {
        tooltip.style.opacity = 0;
        _canvas.style.cursor  = '';
      }
    });
    _canvas.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
      _canvas.style.cursor  = '';
    });
    _canvas.addEventListener('click', e => {
      if (!_visible || !_group) return;
      const hit = _pickBorderAt(e.clientX, e.clientY);
      if (hit) {
        _highlighted = hit.object.userData.entityId;
        updateYear(_currentYear);
      }
    });

    console.log('GlobeBorders: hover tooltips + click-to-select enabled');
  }

  function updateYear(year) {
    _currentYear = year;
    Object.keys(_objects).forEach(id => updateEntityGeometry(id, year));
  }

  function setVisible(bool) {
    _visible = bool;
    Object.values(_objects).forEach(obj =>
      obj.meshes.forEach(m => { m.visible = bool && m.material.opacity > 0.01; })
    );
  }

  function setOpacity(val) {
    _opacity = Math.max(0, Math.min(1, val));
    updateYear(_currentYear);
  }

  // Per-empire opacity control — added this session. Independent of the
  // global slider above; an entity toggled to 0 here stays hidden even at
  // full global opacity, and vice versa. Clamped the same way as the
  // global slider for consistency.
  function setEntityOpacity(entityId, val) {
    _entityOpacityOverride[entityId] = Math.max(0, Math.min(1, val));
    updateEntityGeometry(entityId, _currentYear);
  }

  function getEntityOpacity(entityId) {
    return _entityOpacityOverride[entityId] !== undefined ? _entityOpacityOverride[entityId] : 1;
  }

  function setGlacialMode(bool) {
    _glacial = bool;
    BORDER_ENTITIES.forEach(entity => {
      const obj   = _objects[entity.id];
      if (!obj) return;
      const years = GlobeBordersGeom.getSnapshotYears(entity);
      if (bool && years.length && years[0] > -9600) {
        // Same fix as the entityActive=false branch above — zero opacity,
        // not just visible, so a BORDERS toggle while in glacial mode
        // can't resurrect these from stale opacity values either.
        obj.meshes.forEach(m => { m.visible = false; m.material.opacity = 0; });
      } else {
        updateEntityGeometry(entity.id, _currentYear);
      }
    });
  }

  function highlightCiv(civId) {
    _highlighted = null;
    BORDER_ENTITIES.forEach(e => { if (e.parentCiv === civId) _highlighted = e.id; });
    updateYear(_currentYear);
  }

  function clearHighlight() {
    _highlighted = null;
    updateYear(_currentYear);
  }

  function getEntityAtYear(year) {
    return BORDER_ENTITIES
      .filter(e => GlobeBordersGeom.resolveBlend(e, year).entityActive)
      .map(e => {
        const obj = _objects[e.id];
        const hex = obj ? '#' + obj.color.getHexString() : '#445566';
        return { id: e.id, label: e.label, type: e.type, color: hex };
      });
  }

  // ─── Entity center (for "click legend row → rotate to it") ───────────────
  // Simple average of the currently-active polygon's points — not a true
  // geographic centroid (doesn't area-weight), but plenty accurate for
  // "spin the globe roughly toward this empire," which is all this is
  // for. Uses the first part of a multi-part entity (islands/exclaves)
  // since that's the natural "main body" to center on.
  function getEntityCenter(entityId, year) {
    const obj = _objects[entityId];
    if (!obj) return null;
    const blend = GlobeBordersGeom.resolveBlend(obj.entity, year != null ? year : _currentYear);
    if (!blend.entityActive) return null;
    const multi = GlobeBordersGeom.isMultiPart(blend.polyA);
    const poly  = multi ? blend.polyA[0] : blend.polyA;
    if (!poly || !poly.length) return null;
    let sumLat = 0, sumLng = 0;
    poly.forEach(pt => { sumLat += pt[0]; sumLng += pt[1]; });
    return { lat: sumLat / poly.length, lng: sumLng / poly.length };
  }

  function dispose() {
    Object.values(_objects).forEach(obj => {
      obj.meshes.forEach(m => {
        m.geometry.dispose();
        m.material.dispose();
        if (_group) _group.remove(m);
      });
    });
    Object.keys(_objects).forEach(k => delete _objects[k]);
    if (_group && _scene) {
      _scene.remove(_group);
      _group = null;
    }
    if (_tooltipEl) {
      _tooltipEl.remove();
      _tooltipEl = null;
    }
    Object.keys(_entityOpacityOverride).forEach(k => delete _entityOpacityOverride[k]);
    _rotationSyncRunning = false;
  }

  return { init, updateYear, setVisible, setOpacity, setEntityOpacity, getEntityOpacity, setGlacialMode, highlightCiv, clearHighlight, getEntityAtYear, getEntityCenter, dispose };
})();

window.GlobeBorders = GlobeBorders;

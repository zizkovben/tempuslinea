// globe-borders-glow.js
// CHRONOS Phase 6 — Soft Influence Glow for theorized border zones
// Concept: CHRONOS_INFLUENCE_GLOW_CONCEPT_v1.md — Option B (surface-tangent glow plane)
// Depends on: three.min.js, globe-borders-geom.js
// Applies automatically to any BORDER_ENTITIES record with type: "theorized" —
// not hardcoded to Atlantis / Younger Dryas / Lemuria specifically. Called
// from globe-borders.js, which already owns the rotation-synced group these
// meshes get added to (see _group in globe-borders.js) — zero new rotation
// code needed here.
// Exposes: window.GlobeBordersGlow

const GlobeBordersGlow = (() => {

  // ─── Tuning constants ─────────────────────────────────────────────────────

  // Spec's recommended range was 1.3–1.8x the polygon's own bounding radius,
  // so the soft edge visibly bleeds past the precise boundary rather than
  // stopping exactly at it. 1.5 is the midpoint — no strong reason to lean
  // either direction without seeing it live against real data.
  const GLOW_SCALE = 1.5;

  // Glow sits just above the real terrain (radius 1.0) but below the border
  // line's own offset (1.003, SURFACE_OFFSET in globe-borders.js) so the
  // dotted line always renders as the sharper layer on top of the haze —
  // consistent with the spec's "additive, not a replacement" framing.
  const GLOW_SURFACE_OFFSET = 1.0015;

  // The glow tracks the same computed line opacity every frame (see
  // updateEntity() below, called from updateEntityGeometry() in
  // globe-borders.js) rather than getting a separate slider — per the
  // spec's own leaning for v1. But theorized-entity line opacity is already
  // quite low (STYLE.theorized.baseOpacity = 0.28, further cut by each
  // entity's dissolve value), so using that number unmodified would make
  // the glow nearly invisible. This multiplier restores it to something
  // that actually reads as a haze; the cap keeps it from ever washing out
  // the dotted line it surrounds.
  const GLOW_OPACITY_MULTIPLIER = 2.4;
  const GLOW_OPACITY_CAP        = 0.55;

  // Spec left the pulse as "build it, then decide by looking at it," not a
  // paper decision. Defaulting OFF: the concept doc itself flags the risk
  // of reading as gimmicky against Tempus Linea's "high-tech sophisticated
  // archive" tone rather than a fantasy game, and a static glow is the
  // safer baseline to judge first. The pulse code path is fully built below
  // — flip it live via GlobeBordersGlow.setPulseEnabled(true) in the
  // browser console to see it without a redeploy.
  let _pulseEnabled = false;

  // ─── State ────────────────────────────────────────────────────────────────

  let _texture = null;
  const _glows = {}; // entityId -> { mesh }

  // ─── Procedural gradient texture ─────────────────────────────────────────
  // Generated at runtime via CanvasTexture rather than a hand-authored PNG.
  // Unlike the terrain (real Blue Marble imagery, no procedural substitute
  // exists for actual coastlines), there's no equivalent "real" asset for a
  // glow — procedural keeps this consistent with the no-external-asset
  // default rather than introducing one image file for a single gradient.

  function _buildTexture() {
    if (_texture) return _texture;
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    grad.addColorStop(0.0,  'rgba(255,255,255,1.0)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.65)');
    grad.addColorStop(0.7,  'rgba(255,255,255,0.18)');
    grad.addColorStop(1.0,  'rgba(255,255,255,0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    _texture = new THREE.CanvasTexture(canvas);
    return _texture;
  }

  // ─── Centroid + bounding radius ──────────────────────────────────────────
  // Works from the entity's first recorded snapshot only — see the comment
  // on buildForEntity() below for why that's a reasonable call rather than
  // recomputing every frame as the border line interpolates.

  function _firstPolygon(entity) {
    const years = GlobeBordersGeom.getSnapshotYears(entity);
    if (!years.length) return null;
    const poly = entity.snapshots[years[0]];
    if (GlobeBordersGeom.isMultiPart(poly)) {
      console.warn('GlobeBordersGlow: ' + entity.id + ' is multi-part — glow uses ' +
        'only the first part as an approximation.');
      return poly[0];
    }
    return poly;
  }

  function _centroidAndBoundRadius(poly, radius) {
    const pts = GlobeBordersGeom.polygonToPoints(poly, radius);
    const centroidUnit = new THREE.Vector3();
    pts.forEach(p => centroidUnit.add(p));
    centroidUnit.divideScalar(pts.length).normalize();
    const centroidPos = centroidUnit.clone().multiplyScalar(radius);
    let boundRadius = 0;
    pts.forEach(p => {
      const d = p.distanceTo(centroidPos);
      if (d > boundRadius) boundRadius = d;
    });
    return { normal: centroidUnit, boundRadius };
  }

  // ─── Object construction ─────────────────────────────────────────────────

  // Positioned once, from the entity's first snapshot — not recomputed as
  // the border line interpolates between snapshots over time. Of the three
  // current theorized entities, two (Atlantis, Lemuria) only have a single
  // snapshot anyway, so this is exact for them. younger-dryas-culture-zone
  // has two (-10800, -9600) whose centroids differ modestly — well within
  // the glow's own 1.5x soft-edge bleed, so a static placement still reads
  // as covering both without per-frame recomputation. Worth revisiting only
  // if a future theorized entity has snapshots whose centroids drift by
  // more than the glow radius itself.
  function buildForEntity(entity, radius, group, color) {
    if (entity.type !== 'theorized') return null;
    const poly = _firstPolygon(entity);
    if (!poly) return null;

    const { normal, boundRadius } = _centroidAndBoundRadius(poly, radius);
    const glowRadius = Math.max(boundRadius * GLOW_SCALE, radius * 0.04);

    const geo = new THREE.PlaneGeometry(glowRadius * 2, glowRadius * 2);
    const mat = new THREE.MeshBasicMaterial({
      map: _buildTexture(),
      color: color,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, mat);

    // Surface-tangent placement: position at the centroid's radial point,
    // orient the plane's own normal to match the surface normal there
    // (which, on a sphere, is just the normalized centroid direction
    // itself). This is what makes the patch hug the globe's curvature and
    // rotate naturally with it, instead of behaving like a camera-facing
    // billboard that flattens out at grazing viewing angles (Option A's
    // problem, per the spec).
    mesh.position.copy(normal.clone().multiplyScalar(radius * GLOW_SURFACE_OFFSET));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

    mesh.renderOrder = 0; // under the border line (renderOrder 1) — haze first, sharp dotted line on top
    mesh.userData.entityId = entity.id;
    group.add(mesh);

    _glows[entity.id] = { mesh };
    return mesh;
  }

  // ─── Per-frame update ─────────────────────────────────────────────────────
  // Called from globe-borders.js's updateEntityGeometry() with the exact
  // same opacity value already computed for that entity's line (baseOpacity
  // × dissolve × ancient-dim × fadeIn × the global opacity slider) — so the
  // glow fades in/out in lockstep with its own line rather than on a
  // separate timeline, per the spec's stated intent.

  function updateEntity(entityId, lineOpacity, visible) {
    const rec = _glows[entityId];
    if (!rec) return;

    let opacity = Math.min(lineOpacity * GLOW_OPACITY_MULTIPLIER, GLOW_OPACITY_CAP);

    if (_pulseEnabled && visible && opacity > 0) {
      const t = performance.now() / 1000;
      opacity *= (0.85 + 0.15 * Math.sin(t * 0.5)); // ~8s cycle, per spec
    }

    rec.mesh.material.opacity = visible ? Math.max(0, opacity) : 0;
    rec.mesh.visible = visible && opacity > 0.01;
  }

  // ─── Pulse toggle (see _pulseEnabled comment above) ───────────────────────

  function setPulseEnabled(bool) {
    _pulseEnabled = !!bool;
    console.log('GlobeBordersGlow: pulse', _pulseEnabled ? 'enabled' : 'disabled');
  }

  // ─── Cleanup ──────────────────────────────────────────────────────────────

  function dispose() {
    Object.values(_glows).forEach(rec => {
      rec.mesh.geometry.dispose();
      rec.mesh.material.dispose();
    });
    Object.keys(_glows).forEach(k => delete _glows[k]);
  }

  return { buildForEntity, updateEntity, setPulseEnabled, dispose };
})();

window.GlobeBordersGlow = GlobeBordersGlow;

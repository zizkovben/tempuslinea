// globe-borders-geom.js
// CHRONOS Phase 6 — Border geometry helpers and snapshot interpolation
// Depends on: three.min.js, globe-borders-data.js
// Exposes: window.GlobeBordersGeom (used internally by globe-borders.js)

const GlobeBordersGeom = (() => {

  // ─── Coordinate conversion ────────────────────────────────────────────────

  function latLngToVec3(lat, lng, r) {
    const phi   = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  function lerpLatLng(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  }

  function polygonToPoints(polygon, r) {
    return polygon.map(([lat, lng]) => latLngToVec3(lat, lng, r));
  }

  function lerpPolygons(polyA, polyB, t) {
    if (!polyA || !polyB || polyA.length !== polyB.length) return polyA;
    return polyA.map((ptA, i) => lerpLatLng(ptA, polyB[i], t));
  }

  function isMultiPart(poly) {
    return Array.isArray(poly[0][0]);
  }

  // ─── Snapshot resolution ─────────────────────────────────────────────────

  function getSnapshotYears(entity) {
    return Object.keys(entity.snapshots).map(Number).sort((a, b) => a - b);
  }

  function resolveBlend(entity, year) {
    const years = getSnapshotYears(entity);
    if (!years.length) return { entityActive: false };

    const firstYear = years[0];
    const lastYear  = years[years.length - 1];

    if (year < firstYear - 500 || year > lastYear + 500) {
      return { entityActive: false };
    }

    if (years.length === 1 || year <= firstYear) {
      const fadeT = year < firstYear
        ? Math.max(0, 1 - (firstYear - year) / 500) : 1;
      return {
        entityActive: true,
        polyA: entity.snapshots[firstYear],
        polyB: entity.snapshots[firstYear],
        t: 0, fadeIn: fadeT
      };
    }

    if (year >= lastYear) {
      const fadeT = year > lastYear
        ? Math.max(0, 1 - (year - lastYear) / 500) : 1;
      return {
        entityActive: true,
        polyA: entity.snapshots[lastYear],
        polyB: entity.snapshots[lastYear],
        t: 0, fadeIn: fadeT
      };
    }

    let lowerYear = years[0], upperYear = years[1];
    for (let i = 0; i < years.length - 1; i++) {
      if (year >= years[i] && year <= years[i + 1]) {
        lowerYear = years[i]; upperYear = years[i + 1]; break;
      }
    }

    return {
      entityActive: true,
      polyA: entity.snapshots[lowerYear],
      polyB: entity.snapshots[upperYear],
      t: (year - lowerYear) / (upperYear - lowerYear),
      fadeIn: 1
    };
  }

  // ─── THREE geometry builders ──────────────────────────────────────────────

  function buildLineGeometry(points) {
    const positions = [];
    points.forEach(p => positions.push(p.x, p.y, p.z));
    if (points.length > 0) positions.push(points[0].x, points[0].y, points[0].z);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }

  function updateLineGeometry(mesh, lerpedPoly, radius) {
    const pts    = polygonToPoints(lerpedPoly, radius);
    const posArr = [];
    pts.forEach(p => posArr.push(p.x, p.y, p.z));
    if (pts.length) posArr.push(pts[0].x, pts[0].y, pts[0].z);

    const pos = mesh.geometry.attributes.position;
    if (pos && pos.count === pts.length + 1) {
      for (let i = 0; i < posArr.length; i++) pos.array[i] = posArr[i];
      pos.needsUpdate = true;
    } else {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(posArr, 3));
      mesh.geometry.dispose();
      mesh.geometry = geo;
    }
  }

  function makeMaterial(entity, STYLE) {
    const style = STYLE[entity.type] || STYLE.confirmed;
    return new THREE.LineBasicMaterial({
      color: style.color,
      transparent: true,
      opacity: style.baseOpacity * (1 - entity.dissolve),
      depthWrite: false,
      linewidth: 1
    });
  }

  return {
    latLngToVec3,
    lerpLatLng,
    polygonToPoints,
    lerpPolygons,
    isMultiPart,
    getSnapshotYears,
    resolveBlend,
    buildLineGeometry,
    updateLineGeometry,
    makeMaterial
  };
})();

window.GlobeBordersGeom = GlobeBordersGeom;

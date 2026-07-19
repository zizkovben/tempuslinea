/* ============================================================
   CHRONOS · globe-terrain.js
   Phase 2b: Two-state Earth geometry + Younger Dryas morph.
   Holocene mesh (modern coastlines) and Glacial mesh
   (sea level -120m, exposed shelves, expanded ice sheets).
   The morph is a GLSL mix() driven by uMorphT uniform.
   Depends on: Three.js (r128), globe.js scene reference
   Exposes: GlobeTerrain (global)
   ============================================================ */
 
const GlobeTerrain = (() => {
 
  // ── STATE ─────────────────────────────────────────────────
  let _scene        = null;
  let terrainMesh   = null;   // single mesh, morphs via shader
  let iceSheet      = null;   // separate ice overlay mesh
  let morphState    = 'holocene';  // 'holocene' | 'glacial' | 'morphing'
  let morphTween    = null;        // active tween { start, end, duration, from, to }
 
  // ── CONSTANTS ─────────────────────────────────────────────
  const EARTH_R   = 1.0;
  const ICE_R     = 1.002;        // just above Earth surface
  const SEG       = 96;           // sphere segments (higher = smoother morph)
 
  // Glacial sea level offset as a fraction of radius
  // -120m real world = ~0.019 radius units on a unit sphere
  const GLACIAL_SEA_DROP = 0.019;
 
  // ── INIT ──────────────────────────────────────────────────
  function init(scene) {
    _scene = scene;
    _buildTerrainMesh();
    _buildIceSheet();
  }
 
  // ── TERRAIN MESH (two-state shader) ──────────────────────
  // Uses a single SphereGeometry. The vertex shader morphs
  // between holocene and glacial vertex positions using uMorphT.
  // Glacial positions are derived by pushing ocean vertices inward
  // (dropping sea level) and exposing continental shelves.
  // Real Earth imagery — CORS-friendly CDN copies of the well-known
  // three-globe example assets (used unmodified by countless three.js
  // globe demos). uDayTex gives real coastlines/colour; uWaterMask is a
  // white=ocean/black=land mask used to derive landM precisely instead
  // of guessing at continents with noise.
  const TERRAIN_TEX_BASE = 'https://cdn.jsdelivr.net/npm/three-globe/example/img/';
 
  function _buildTerrainMesh() {
    const geo = new THREE.SphereGeometry(EARTH_R, SEG, SEG);
 
    // Bake glacial vertex positions AND real-world shelf-exposure as
    // custom per-vertex attributes in one pass. For each vertex: if
    // it's in a named "ocean shelf" zone (Doggerland, Sunda Shelf,
    // etc. — see _shelfExposureFactor), pull it inward by
    // GLACIAL_SEA_DROP to expose the shelf, and record that same
    // exposure value so the fragment shader can colour it accurately
    // instead of guessing with noise.
    const posAttr    = geo.attributes.position;
    const count      = posAttr.count;
    const glacialPos = new Float32Array(count * 3);
    const shelfAttr  = new Float32Array(count);
 
    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
 
      // Convert to lat/lng for shelf detection
      const lat = Math.asin(y / EARTH_R) * (180 / Math.PI);
      const lng = Math.atan2(z, -x) * (180 / Math.PI);
 
      // Determine if this vertex is on a shallow shelf zone
      // that would be exposed at -120m sea level
      const exposure = _shelfExposureFactor(lat, lng);
      shelfAttr[i] = exposure;
 
      // In glacial mode, exposed shelf vertices are at a slightly
      // reduced radius (they become dry land at sea level -120m)
      const glacialR = EARTH_R - GLACIAL_SEA_DROP * (1.0 - exposure);
 
      const scale = glacialR / EARTH_R;
      glacialPos[i * 3]     = x * scale;
      glacialPos[i * 3 + 1] = y * scale;
      glacialPos[i * 3 + 2] = z * scale;
    }
 
    geo.setAttribute(
      'positionGlacial',
      new THREE.BufferAttribute(glacialPos, 3)
    );
    geo.setAttribute(
      'shelfExposure',
      new THREE.BufferAttribute(shelfAttr, 1)
    );
 
    // ── Real Earth textures ──────────────────────────────────
    const texLoader = new THREE.TextureLoader();
    texLoader.crossOrigin = 'anonymous';
    const dayTex   = texLoader.load(TERRAIN_TEX_BASE + 'earth-blue-marble.jpg');
    const waterTex = texLoader.load(TERRAIN_TEX_BASE + 'earth-water.png');
 
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uMorphT:      { value: 0.0 },    // 0=holocene, 1=glacial
        uSeaLevel:    { value: 0.0 },    // metres: 0 to -120
        uTime:        { value: 0.0 },
        uSunDir:      { value: new THREE.Vector3(1, 0.5, 1).normalize() },
        uDayTex:      { value: dayTex },
        uWaterMask:   { value: waterTex },
 
        // Holocene ocean tint (real land colour comes from uDayTex)
        uOceanCol:    { value: new THREE.Color(0x062244) },
        uIceCapCol:   { value: new THREE.Color(0xaaccdd) },
 
        // Glacial-specific colours
        uGlacialOcean:{ value: new THREE.Color(0x041830) },
        uExposedShelf:{ value: new THREE.Color(0x6b5a3a) },
      },
 
      vertexShader: `
        attribute vec3  positionGlacial;
        attribute float shelfExposure;
        uniform float uMorphT;
        uniform float uSeaLevel;
        varying vec3  vNormal;
        varying vec3  vPosition;
        varying vec3  vWorldPos;
        varying vec2  vUv;
        varying float vMorphT;
        varying float vShelf;
 
        void main() {
          // Lerp between holocene and glacial vertex positions
          vec3 finalPos = mix(position, positionGlacial, uMorphT);
          vPosition   = finalPos;
          vMorphT     = uMorphT;
          vUv         = uv;
          vShelf      = shelfExposure;
 
          // Recompute normal from morphed position
          vNormal     = normalize(normalMatrix * normalize(finalPos));
          vWorldPos   = (modelMatrix * vec4(finalPos, 1.0)).xyz;
 
          gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
        }
      `,
 
      fragmentShader: `
        uniform sampler2D uDayTex;
        uniform sampler2D uWaterMask;
        uniform vec3  uOceanCol;
        uniform vec3  uIceCapCol;
        uniform vec3  uGlacialOcean;
        uniform vec3  uExposedShelf;
        uniform vec3  uSunDir;
        uniform float uTime;
        uniform float uMorphT;
        uniform float uSeaLevel;
 
        varying vec3  vNormal;
        varying vec3  vPosition;
        varying vec3  vWorldPos;
        varying vec2  vUv;
        varying float vMorphT;
        varying float vShelf;
 
        // ── Noise utilities (style detail only — shimmer, city
        // glow, ice-edge softening. Real coastlines now come from
        // uDayTex/uWaterMask, not from noise.) ──────────────────
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          f = f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                     mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
        }
        float fbm(vec2 p) {
          float v=0.0; float a=0.5;
          for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
          return v;
        }
 
        void main() {
          float lat = asin(vPosition.y / length(vPosition)) / 3.14159 * 2.0;
          vec2 coord = vec2(vUv.x * 6.0, vUv.y * 5.0); // for noise detail only
 
          // ── Real land/ocean mask (white=ocean in the source image) ──
          vec3  dayColor = texture2D(uDayTex, vUv).rgb;
          float landM    = 1.0 - texture2D(uWaterMask, vUv).r;
 
          // Shelf exposure — real named zones (Doggerland, Sunda Shelf,
          // Persian Gulf, Bering, Bahama Banks, English Channel — see
          // _shelfExposureFactor), only applied over what's ocean today
          float shelfM = vShelf * (1.0 - landM);
 
          // Ice caps — expanded in glacial mode
          float iceBase   = smoothstep(0.72, 0.88, abs(lat));
          float iceGlacial= smoothstep(0.58, 0.78, abs(lat));   // larger caps
          float iceM      = mix(iceBase, iceGlacial, vMorphT);
          iceM = clamp(iceM + fbm(coord*4.0)*0.15, 0.0, 1.0);
 
          // ── Holocene colour — real Earth texture, tinted ocean ──
          vec3 holoCol = mix(uOceanCol, dayColor, landM);
          holoCol = mix(holoCol, uIceCapCol, iceM);
 
          // ── Glacial colour ─────────────────────────────────
          // Ocean is deeper/darker. Exposed shelves show as brownish land.
          vec3 glacCol = mix(uGlacialOcean, dayColor, landM);
          glacCol = mix(glacCol, uExposedShelf, shelfM * 0.9);
          glacCol = mix(glacCol, uIceCapCol, iceM);
          glacCol = mix(glacCol, uGlacialOcean*0.4, (1.0-landM)*(1.0-shelfM)*0.5);
 
          // ── Blend based on morph ──────────────────────────
          vec3 col = mix(holoCol, glacCol, vMorphT);
 
          // ── Ocean shimmer ─────────────────────────────────
          float shimmer = noise(coord*18.0+uTime*0.1)*0.04*(1.0-landM)*(1.0-shelfM*vMorphT);
          col += shimmer;
 
          // ── Lighting ──────────────────────────────────────
          float diff  = max(dot(vNormal, uSunDir), 0.0);
          float amb   = 0.18;
          col *= (amb + (1.0-amb)*diff);
 
          // Specular on ocean
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          vec3 halfV   = normalize(uSunDir + viewDir);
          float spec   = pow(max(dot(vNormal,halfV),0.0),80.0)*(1.0-landM)*0.3;
          col += spec;
 
          // Terminator
          float night = smoothstep(0.0,-0.25,dot(vNormal,uSunDir));
          col *= (1.0-night*0.7);
 
          // City glow on land at night
          float cityGlow = fbm(coord*6.0)*night*landM*0.15*(1.0-vMorphT*0.8);
          col += vec3(0.4,0.35,0.2)*cityGlow;
 
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
 
    terrainMesh = new THREE.Mesh(geo, mat);
    terrainMesh.name = 'terrain';
    _scene.add(terrainMesh);
  }
 
  // ── SHELF EXPOSURE FACTOR ─────────────────────────────────
  // Returns 1.0 for exposed land, 0.0 for deep ocean.
  // Used to decide how much to pull glacial vertices inward.
  function _shelfExposureFactor(lat, lng) {
    // Key glacial exposure zones — these match the visual shader zones
    // Doggerland (North Sea) — between Britain and mainland Europe
    if (lat > 51 && lat < 59 && lng > -5 && lng < 10)  return 0.85;
    // Sunda Shelf — SE Asia connecting Borneo/Java/Sumatra
    if (lat > -10 && lat < 10 && lng > 100 && lng < 120) return 0.90;
    // Persian Gulf — mostly dry at -120m
    if (lat > 24 && lat < 30 && lng > 48 && lng < 57)   return 0.80;
    // Bering Land Bridge
    if (lat > 60 && lat < 68 && (lng > 170 || lng < -165)) return 0.75;
    // Bahama Banks
    if (lat > 22 && lat < 27 && lng > -80 && lng < -72) return 0.70;
    // English Channel
    if (lat > 49 && lat < 52 && lng > -2 && lng < 2)    return 0.70;
    // Default: taper based on proximity to land (approximated by fbm-style)
    return 0.0;
  }
 
  // ── ICE SHEET OVERLAY ─────────────────────────────────────
  // Semi-transparent blue-white mesh covering glacial ice sheets.
  // Fades in as uMorphT → 1.
  function _buildIceSheet() {
    const geo = new THREE.SphereGeometry(ICE_R, SEG, SEG);
 
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite:  false,
      side:        THREE.FrontSide,
      uniforms: {
        uMorphT:   { value: 0.0 },
        uGlacierCol: { value: new THREE.Color(0xa8d4e8) },
        uGlowCol:    { value: new THREE.Color(0xd4eef8) },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition   = position;
          vNormal     = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uMorphT;
        uniform vec3  uGlacierCol;
        uniform vec3  uGlowCol;
        varying vec3  vPosition;
        varying vec3  vNormal;
 
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){
          vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                     mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
        }
        float fbm(vec2 p){float v=0.0;float a=0.5;
          for(int i=0;i<4;i++){v+=a*noise(p);p*=2.1;a*=0.5;}return v;}
 
        void main() {
          // Lat from position
          float lat = asin(vPosition.y / length(vPosition)) * (180.0 / 3.14159);
          float lng = atan(vPosition.z, -vPosition.x) * (180.0/3.14159);
          vec2 coord = vec2(lng/60.0, lat/30.0);
 
          // Ice sheet coverage — north pole + Canada + N.Europe + expanded Antarctica
          float northIce = smoothstep(55.0, 72.0, lat)
                         + smoothstep(48.0, 62.0, lat) * fbm(coord*1.5) * 0.7;
          // Canada / Laurentide
          float canadaIce = smoothstep(48.0, 65.0, lat) *
                            smoothstep(-110.0,-55.0,lng)*smoothstep(-40.0,-115.0,lng)
                            * 0.9;
          // Antarctica (expanded)
          float southIce  = smoothstep(-62.0, -75.0, lat);
          // Scandinavia / British Isles
          float scandIce  = smoothstep(52.0,65.0,lat)*smoothstep(-5.0,30.0,lng)*
                            smoothstep(35.0,-5.0,lng)*0.8;
 
          float coverage = clamp(northIce + canadaIce + southIce + scandIce, 0.0, 1.0);
 
          // Add noise edge softening
          coverage = coverage * (0.7 + 0.3*fbm(coord*3.0));
          coverage = smoothstep(0.25, 0.65, coverage);
 
          // Edge glow
          float rim = 1.0 - abs(dot(vNormal, normalize(cameraPosition)));
          rim = pow(rim, 2.5);
 
          vec3 col   = mix(uGlacierCol, uGlowCol, rim * 0.5 + coverage * 0.3);
          float alpha = coverage * uMorphT * 0.65 + rim * coverage * uMorphT * 0.2;
 
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
 
    iceSheet = new THREE.Mesh(geo, mat);
    iceSheet.name = 'iceSheet';
    iceSheet.visible = false;
    _scene.add(iceSheet);
  }
 
  // ── MORPH ANIMATION ──────────────────────────────────────
  function morphToGlacial(durationMs) {
    if (morphState === 'glacial') return;
    _startMorph(0.0, 1.0, durationMs || 2500);
  }
 
  function morphToHolocene(durationMs) {
    if (morphState === 'holocene') return;
    _startMorph(1.0, 0.0, durationMs || 2500);
  }
 
  function _startMorph(fromT, toT, durationMs) {
    morphState = 'morphing';
    iceSheet.visible = true;
 
    morphTween = {
      startTime: Date.now(),
      duration:  durationMs,
      fromT,
      toT,
    };
  }
 
  // ── TICK (called every frame from globe.js animate loop) ──
  function tick(time) {
    // Update shader time on terrain
    if (terrainMesh && terrainMesh.material.uniforms) {
      terrainMesh.material.uniforms.uTime.value = time;
    }
 
    if (!morphTween) return;
 
    const elapsed = Date.now() - morphTween.startTime;
    let t = Math.min(elapsed / morphTween.duration, 1.0);
 
    // Ease in-out cubic
    t = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
 
    const morphT = morphTween.fromT + (morphTween.toT - morphTween.fromT) * t;
 
    // Apply to terrain mesh
    if (terrainMesh && terrainMesh.material.uniforms) {
      terrainMesh.material.uniforms.uMorphT.value = morphT;
      const sl = morphT * -120;
      terrainMesh.material.uniforms.uSeaLevel.value = sl;
    }
    // Apply to ice sheet
    if (iceSheet && iceSheet.material.uniforms) {
      iceSheet.material.uniforms.uMorphT.value = morphT;
    }
 
    // Morph complete
    if (t >= 1.0) {
      morphState = morphTween.toT > 0.5 ? 'glacial' : 'holocene';
      morphTween = null;
      if (morphState === 'holocene') iceSheet.visible = false;
 
      // Fire completion callback if registered
      if (_onMorphComplete) {
        _onMorphComplete(morphState);
        _onMorphComplete = null;
      }
    }
  }
 
  // ── MORPH COMPLETE CALLBACK ───────────────────────────────
  let _onMorphComplete = null;
  function onMorphComplete(cb) { _onMorphComplete = cb; }
 
  // ── INSTANT STATE SWITCH (no animation) ──────────────────
  function setEarthState(state) {
    const t = state === 'glacial' ? 1.0 : 0.0;
    morphState = state;
    morphTween = null;
    if (terrainMesh && terrainMesh.material.uniforms) {
      terrainMesh.material.uniforms.uMorphT.value   = t;
      terrainMesh.material.uniforms.uSeaLevel.value = t * -120;
    }
    if (iceSheet && iceSheet.material.uniforms) {
      iceSheet.material.uniforms.uMorphT.value = t;
      iceSheet.visible = (t > 0);
    }
  }
 
  // ── SEA LEVEL DIRECT CONTROL ──────────────────────────────
  function setSeaLevel(metres) {
    const t = Math.abs(metres) / 120;   // 0 → 1
    if (terrainMesh && terrainMesh.material.uniforms) {
      terrainMesh.material.uniforms.uSeaLevel.value = metres;
      terrainMesh.material.uniforms.uMorphT.value   = t;
    }
    if (iceSheet && iceSheet.material.uniforms) {
      iceSheet.material.uniforms.uMorphT.value = t;
      iceSheet.visible = (t > 0.01);
    }
  }
 
  // ── SYNC ROTATION WITH GLOBE ──────────────────────────────
  // Called by globe.js after it updates globe.rotation
  function syncRotation(rotY, rotX) {
    if (terrainMesh) {
      terrainMesh.rotation.y = rotY;
      terrainMesh.rotation.x = rotX;
    }
    if (iceSheet) {
      iceSheet.rotation.y = rotY;
      iceSheet.rotation.x = rotX;
    }
  }
 
  // ── PUBLIC API ────────────────────────────────────────────
  function getCurrentState() { return morphState; }
 
  return {
    init,
    tick,
    syncRotation,
    morphToGlacial,
    morphToHolocene,
    setEarthState,
    setSeaLevel,
    getCurrentState,
    onMorphComplete,
  };
 
})();
 
window.GlobeTerrain = GlobeTerrain;
 

'use client';

// Coin3D — the "O" in the TOKENS wordmark, rebuilt as real 3D geometry so it
// shows genuine depth as it spins (a flat SVG can't). The body is the coin's OWN
// outline extruded (via SVGLoader on coin.svg), so the silhouette + edge keep the
// pixel-art stepped contour rather than a smoothed octagon; the detailed art is
// textured on the two faces, and the extruded rim is lit gold. Lives only on this
// code-split, unlisted deck route, so three.js never touches the rest of the site.
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

const COIN_URL = '/decks/mousepower/coin.svg';
const DEPTH_SVG = 64; // extrude depth in SVG units (~0.16 of the coin's ~400 size)

// Pixel sparkles around the coin (positions/sizes mapped from the Figma source,
// nodes 52:988/1004/1015/1021/1031 — relative to the coin box). Each pops in/out
// with a grow as the coin spins; `phase` staggers them around the turn.
const SPARKLES = [
  { left: '24%', top: '16%', size: '0.155em', phase: 0 },
  { left: '54%', top: '86%', size: '0.155em', phase: 2.5 },
  { left: '76%', top: '20%', size: '0.095em', phase: 1.25 },
  { left: '22%', top: '72%', size: '0.095em', phase: 3.75 },
  { left: '80%', top: '70%', size: '0.095em', phase: 5.0 },
];

// A tiny equirectangular "studio" — warm-dark with a few bright vertical strips.
// The coin reflects it, so glints sweep across the faces + rim as it spins (the
// shimmer). Reflections only; the canvas background stays transparent.
function buildEnvTexture() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext('2d')!;
  const base = ctx.createLinearGradient(0, 0, 0, 512);
  base.addColorStop(0, '#4a3a16');
  base.addColorStop(0.5, '#241b07');
  base.addColorStop(1, '#0c0802');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 1024, 512);
  // Strips sit away from azimuth 180° (x≈512, where a face-on coin reflects), so
  // the face stays clean head-on and the glint sweeps in as it turns.
  for (const [x, a, w] of [
    [250, 1.0, 60],
    [770, 0.95, 52],
  ] as const) {
    const strip = ctx.createLinearGradient(x - w, 0, x + w, 0);
    strip.addColorStop(0, 'rgba(255,250,235,0)');
    strip.addColorStop(0.5, `rgba(255,252,242,${a})`);
    strip.addColorStop(1, 'rgba(255,250,235,0)');
    ctx.fillStyle = strip;
    ctx.fillRect(x - w, 0, w * 2, 512);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Rasterize the (vector) coin to a CanvasTexture for the faces — three can't
// sample an SVG directly. High res so the pixel-art detail stays crisp.
function useCoinTexture(size = 1024) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.flipY = false; // matches the y-down SVG geometry below
      texture.needsUpdate = true;
      setTex(texture);
    };
    img.src = COIN_URL;
    return () => {
      cancelled = true;
    };
  }, [size]);
  return tex;
}

// Extrude the coin's outer outline into 3D, normalized to ~2 units across, with
// cap UVs remapped to 0..1 so the face texture lines up with the silhouette.
function useCoinGeometry() {
  const [geo, setGeo] = useState<THREE.ExtrudeGeometry | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(COIN_URL)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        const data = new SVGLoader().parse(text);
        const shapes = data.paths[0].toShapes(); // path 0 = the coin's solid outline
        const g = new THREE.ExtrudeGeometry(shapes, { depth: DEPTH_SVG, bevelEnabled: false, steps: 1 });
        g.center();
        g.computeBoundingBox();
        const bb = g.boundingBox!;
        const scale = 2 / Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y);
        g.scale(scale, scale, scale);

        // Remap UVs to the XY bounding box so the cap texture maps onto the
        // silhouette (the rim uses the gold material, where UVs don't matter).
        g.computeBoundingBox();
        const b = g.boundingBox!;
        const w = b.max.x - b.min.x;
        const h = b.max.y - b.min.y;
        const pos = g.attributes.position;
        const uv = g.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
          uv.setXY(i, (pos.getX(i) - b.min.x) / w, (pos.getY(i) - b.min.y) / h);
        }
        uv.needsUpdate = true;
        g.computeVertexNormals();
        setGeo(g);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return geo;
}

function Coin({
  glowRef,
  sparkleRefs,
}: {
  glowRef: React.RefObject<HTMLSpanElement | null>;
  sparkleRefs: React.RefObject<(HTMLImageElement | null)[]>;
}) {
  const group = useRef<THREE.Group>(null);
  const tex = useCoinTexture();
  const geo = useCoinGeometry();
  const { gl, scene } = useThree();

  // Build a PMREM environment from the studio strips → metallic reflections.
  useEffect(() => {
    const env = buildEnvTexture();
    const pmrem = new THREE.PMREMGenerator(gl);
    const rt = pmrem.fromEquirectangular(env);
    scene.environment = rt.texture;
    env.dispose();
    pmrem.dispose();
    return () => {
      rt.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.95; // gentle spin → slower shimmer sweep
    const rot = group.current.rotation.y;
    // Pulse the glow with the spin: |cos| is 1 when a face is toward the viewer,
    // 0 edge-on — so the halo expands + brightens on each face pass.
    if (glowRef.current) {
      const f = Math.abs(Math.cos(rot));
      glowRef.current.style.transform = `translate(-50%, -50%) scale(${0.78 + 0.27 * f})`;
      glowRef.current.style.opacity = `${0.4 + 0.6 * f}`;
    }
    // Sparkles pop in/out with a grow as the coin turns — each on its own phase.
    const sparkles = sparkleRefs.current;
    if (sparkles) {
      for (let i = 0; i < sparkles.length; i++) {
        const el = sparkles[i];
        if (!el) continue;
        const raw = Math.sin(rot * 1.5 + SPARKLES[i].phase);
        const s = raw > 0 ? raw * raw : 0; // grow in → peak → grow out, then rest
        el.style.transform = `translate(-50%, -50%) scale(${s})`;
      }
    }
  });

  // Physical material with a glossy clearcoat: a sharp specular glint rides over
  // the gold art and sweeps across each face as the coin turns — the shimmer.
  const capMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0.1,
        roughness: 0.62,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.6,
        side: THREE.DoubleSide,
      }),
    [],
  );
  // Less metal + a gold emissive floor so the rim never sinks to near-black in
  // shadow (which read inconsistent next to the self-lit gold face).
  const sideMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e3a514',
        metalness: 0.6,
        roughness: 0.34,
        envMapIntensity: 1.2,
        emissive: new THREE.Color('#9a6a12'),
        emissiveIntensity: 0.4,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useEffect(() => {
    if (tex) {
      capMat.map = tex;
      capMat.emissiveMap = tex;
      capMat.emissive = new THREE.Color('#ffffff');
      capMat.emissiveIntensity = 0.32;
      capMat.needsUpdate = true;
    }
  }, [tex, capMat]);

  if (!geo) return null;

  return (
    <group ref={group}>
      {/* scale.y = -1 corrects the y-down SVG; material order is [caps, rim]. */}
      <mesh geometry={geo} material={[capMat, sideMat]} scale={[1, -1, 1]} />
    </group>
  );
}

export function Coin3D() {
  const glowRef = useRef<HTMLSpanElement>(null);
  const sparkleRefs = useRef<(HTMLImageElement | null)[]>([]);
  return (
    <span className="tokens-coin">
      {/* Warm radial glow behind the coin + text (reference node 52:985); its
          scale/opacity are animated from the coin's rotation in <Coin>. */}
      <span className="tokens-coin-glow" ref={glowRef} aria-hidden="true" />
      {/* Pixel sparkles around the coin, popped in/out from the rotation. */}
      {SPARKLES.map((sp, i) => (
        <img
          key={i}
          ref={(el) => {
            sparkleRefs.current[i] = el;
          }}
          className="tokens-sparkle"
          src="/decks/mousepower/sparkle.svg"
          alt=""
          aria-hidden="true"
          style={{ left: sp.left, top: sp.top, width: sp.size, height: sp.size }}
        />
      ))}
      <Canvas
        camera={{ position: [0, 0, 6.7], fov: 20 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ overflow: 'visible' }}
      >
        <hemisphereLight args={['#fff6dc', '#7a4a08', 1.0]} />
        <directionalLight position={[3, 4, 6]} intensity={1.6} />
        <directionalLight position={[-4, -1, 3]} intensity={0.6} color="#ffd98a" />
        <Coin glowRef={glowRef} sparkleRefs={sparkleRefs} />
      </Canvas>
    </span>
  );
}

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type Window3DProps = {
  shutters: 2 | 3;
  net: boolean;
  /** Drag-to-rotate. Off on touch so the page still scrolls. */
  interactive?: boolean;
  onReady?: () => void;
};

// Same 60 × 48 proportions as the SVG elevation, so the hand-off from 2D is seamless.
const W = 3.2;
const H = W / 1.25;
const FRAME = 0.11; // outer frame face width
const DEPTH = 0.42; // frame depth (rails live inside)
const SH_FRAME = 0.085;
const SH_DEPTH = 0.06;

/**
 * Camera framing that puts the frame exactly where the SVG drawing sits in the
 * hero plate: frame height = 75% of the plate height, viewed straight on.
 */
const FOV = 30;
const CAM_Z = H / 0.75 / (2 * Math.tan(((FOV / 2) * Math.PI) / 180));

/** 0 → 1 ease that starts once the 3D view has taken over from the drawing. */
const INTRO_DELAY = 0.7;
const INTRO_LENGTH = 2.2;
function introAmount(t: number) {
  const x = Math.min(1, Math.max(0, (t - INTRO_DELAY) / INTRO_LENGTH));
  return x * x * (3 - 2 * x);
}

function useAluminium() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color: "#a6b2c2", metalness: 0.45, roughness: 0.42, envMapIntensity: 1 }),
    [],
  );
}

function Bar({ args, position, material }: { args: [number, number, number]; position: [number, number, number]; material: THREE.Material }) {
  return (
    <mesh position={position} material={material} castShadow>
      <boxGeometry args={args} />
    </mesh>
  );
}

function meshTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, 64, 64);
  g.strokeStyle = "rgba(40,48,62,0.7)";
  g.lineWidth = 1;
  for (let i = 0; i <= 64; i += 8) {
    g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, 64); g.stroke();
    g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(64, i + 0.5); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(6, 9);
  t.anisotropy = 4;
  return t;
}

/** One sliding shutter: four aluminium bars with a pane (glass or mesh). */
function Shutter({
  width,
  targetX,
  z,
  kind,
  alu,
  slide = false,
  handle,
}: {
  width: number;
  targetX: number;
  z: number;
  kind: "glass" | "net";
  alu: THREE.Material;
  slide?: boolean;
  handle?: "left" | "right";
}) {
  const ref = useRef<THREE.Group>(null);
  const h = H - FRAME * 2 - 0.02;
  const pane = useMemo(() => {
    if (kind === "net") {
      return new THREE.MeshStandardMaterial({
        map: meshTexture(),
        transparent: true,
        opacity: 0.6,
        color: "#8592a6",
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    }
    // Tinted like the 2D drawing's glass so the hand-off reads as the same window.
    // Unlit tint: the same blue as the 2D drawing's glass from every angle,
    // so the hand-off from the drawing reads as one window.
    return new THREE.MeshBasicMaterial({
      color: "#b2cff3",
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [kind]);

  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // After the intro, gently slide one shutter open and closed (starts closed, like the drawing).
    const k = introAmount(t);
    const offset = slide ? ((1 - Math.cos(Math.max(0, t - INTRO_DELAY) * 0.6)) / 2) * width * 0.42 * k : 0;
    g.position.x = THREE.MathUtils.damp(g.position.x, targetX - offset, 6, dt);
  });

  return (
    <group ref={ref} position={[targetX, 0, z]}>
      <Bar args={[width, SH_FRAME, SH_DEPTH]} position={[0, h / 2 - SH_FRAME / 2, 0]} material={alu} />
      <Bar args={[width, SH_FRAME, SH_DEPTH]} position={[0, -h / 2 + SH_FRAME / 2, 0]} material={alu} />
      <Bar args={[SH_FRAME, h, SH_DEPTH]} position={[-width / 2 + SH_FRAME / 2, 0, 0]} material={alu} />
      <Bar args={[SH_FRAME, h, SH_DEPTH]} position={[width / 2 - SH_FRAME / 2, 0, 0]} material={alu} />
      {handle && (
        <mesh position={[(handle === "left" ? -1 : 1) * (width / 2 - SH_FRAME / 2), 0, SH_DEPTH / 2 + 0.02]}>
          <boxGeometry args={[0.035, 0.32, 0.04]} />
          <meshStandardMaterial color="#2b3340" metalness={0.3} roughness={0.5} />
        </mesh>
      )}
      <mesh material={pane} renderOrder={2}>
        <planeGeometry args={[width - SH_FRAME * 2, h - SH_FRAME * 2]} />
      </mesh>
    </group>
  );
}

function WindowModel({ shutters, net, onReady }: { shutters: 2 | 3; net: boolean; onReady?: () => void }) {
  const alu = useAluminium();
  const group = useRef<THREE.Group>(null);
  const frames = useRef(0);
  const tracks = shutters + (net ? 1 : 0);
  const innerW = W - FRAME * 2;
  const overlap = 0.08;
  const shW = innerW / shutters + overlap;
  const railGap = (DEPTH - 0.08) / Math.max(tracks, 2);

  useFrame((state) => {
    if (!group.current) return;
    // Tell the page once real frames are on screen, so the crossfade never shows a blank canvas.
    if (frames.current < 3 && ++frames.current === 3) onReady?.();
    // Front-on at first (matching the 2D drawing), then ease into a slow sway and slight tilt.
    const t = state.clock.elapsedTime;
    const k = introAmount(t);
    group.current.rotation.y = Math.sin(Math.max(0, t - INTRO_DELAY) * 0.25 + 0.9) * 0.38 * k;
    group.current.rotation.x = 0.06 * k;
  });

  const zFor = (track: number) => -DEPTH / 2 + 0.06 + track * railGap;

  return (
    <group ref={group} position={[0, 0, -DEPTH / 2]}>
      {/* outer frame */}
      <Bar args={[W, FRAME, DEPTH]} position={[0, H / 2 - FRAME / 2, 0]} material={alu} />
      <Bar args={[W, FRAME, DEPTH]} position={[0, -H / 2 + FRAME / 2, 0]} material={alu} />
      <Bar args={[FRAME, H, DEPTH]} position={[-W / 2 + FRAME / 2, 0, 0]} material={alu} />
      <Bar args={[FRAME, H, DEPTH]} position={[W / 2 - FRAME / 2, 0, 0]} material={alu} />
      {/* track rails (bottom) */}
      {Array.from({ length: tracks }, (_, i) => (
        <Bar key={`r${i}`} args={[innerW, 0.025, 0.012]} position={[0, -H / 2 + FRAME + 0.012, zFor(i) - 0.04]} material={alu} />
      ))}

      {Array.from({ length: shutters }, (_, i) => {
        const step = (innerW - shW) / (shutters - 1);
        const x = -innerW / 2 + shW / 2 + i * step;
        return (
          <Shutter
            key={`${shutters}-${i}`}
            width={shW}
            targetX={x}
            z={zFor(i)}
            kind="glass"
            alu={alu}
            slide={i === shutters - 1}
            handle={i === 0 ? "left" : i === shutters - 1 ? "right" : undefined}
          />
        );
      })}
      {net && (
        <Shutter
          key={`net-${shutters}`}
          width={shW}
          targetX={innerW / 2 - shW / 2}
          z={zFor(tracks - 1) + 0.02}
          kind="net"
          alu={alu}
        />
      )}
    </group>
  );
}

export default function Window3D({ shutters, net, onReady, interactive = true }: Window3DProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      shadows={false}
      aria-hidden="true"
      style={interactive ? { cursor: "grab" } : { touchAction: "pan-y", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#b8c4d6", 0.9]} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, 2, 3]} intensity={0.7} />
      <WindowModel shutters={shutters} net={net} onReady={onReady} />
      <ContactShadows position={[0, -H / 2 - 0.12, -DEPTH / 2]} opacity={0.35} scale={7} blur={2.6} far={2} />
      {/* Lightformers keep reflections self-contained (no HDR download). */}
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[10, 3, 1]} />
        <Lightformer intensity={2} position={[0, 0, 6]} scale={[10, 8, 1]} />
        <Lightformer intensity={1.2} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color="#cfe0ff" />
        <Lightformer intensity={1.4} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer intensity={0.6} position={[0, -3, 3]} scale={[8, 1, 1]} color="#8fb2ff" />
      </Environment>
      <OrbitControls
        enabled={interactive}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2 - 0.45}
        maxPolarAngle={Math.PI / 2 + 0.25}
        minAzimuthAngle={-0.9}
        maxAzimuthAngle={0.9}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}

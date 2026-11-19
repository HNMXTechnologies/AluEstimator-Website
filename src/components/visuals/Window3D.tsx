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

const W = 3.2;
const H = 2.4;
const FRAME = 0.11; // outer frame face width
const DEPTH = 0.42; // frame depth (rails live inside)
const SH_FRAME = 0.085;
const SH_DEPTH = 0.06;

function useAluminium() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color: "#dfe5ee", metalness: 0.55, roughness: 0.38, envMapIntensity: 1.6 }),
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
  g.strokeStyle = "rgba(40,48,62,0.85)";
  g.lineWidth = 1;
  for (let i = 0; i <= 64; i += 4) {
    g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, 64); g.stroke();
    g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(64, i + 0.5); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(10, 16);
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
}: {
  width: number;
  targetX: number;
  z: number;
  kind: "glass" | "net";
  alu: THREE.Material;
  slide?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const h = H - FRAME * 2 - 0.02;
  const pane = useMemo(() => {
    if (kind === "net") {
      return new THREE.MeshStandardMaterial({
        map: meshTexture(),
        transparent: true,
        opacity: 0.9,
        color: "#5a6680",
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    }
    return new THREE.MeshPhysicalMaterial({
      color: "#a9cdf5",
      metalness: 0.1,
      roughness: 0.04,
      transparent: true,
      opacity: 0.32,
      reflectivity: 0.9,
      clearcoat: 1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [kind]);

  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // gently slide one shutter open and closed to show it is a sliding window
    const offset = slide ? (Math.sin(t * 0.6) * 0.5 + 0.5) * width * 0.42 : 0;
    const goal = targetX - offset;
    g.position.x = THREE.MathUtils.damp(g.position.x, goal, 6, dt);
    g.scale.y = THREE.MathUtils.damp(g.scale.y, 1, 8, dt);
  });

  return (
    <group ref={ref} position={[targetX, 0, z]} scale={[1, 0.001, 1]}>
      <Bar args={[width, SH_FRAME, SH_DEPTH]} position={[0, h / 2 - SH_FRAME / 2, 0]} material={alu} />
      <Bar args={[width, SH_FRAME, SH_DEPTH]} position={[0, -h / 2 + SH_FRAME / 2, 0]} material={alu} />
      <Bar args={[SH_FRAME, h, SH_DEPTH]} position={[-width / 2 + SH_FRAME / 2, 0, 0]} material={alu} />
      <Bar args={[SH_FRAME, h, SH_DEPTH]} position={[width / 2 - SH_FRAME / 2, 0, 0]} material={alu} />
      <mesh material={pane} renderOrder={2}>
        <planeGeometry args={[width - SH_FRAME * 2, h - SH_FRAME * 2]} />
      </mesh>
    </group>
  );
}

function WindowModel({ shutters, net }: { shutters: 2 | 3; net: boolean }) {
  const alu = useAluminium();
  const group = useRef<THREE.Group>(null);
  const tracks = shutters + (net ? 1 : 0);
  const innerW = W - FRAME * 2;
  const overlap = 0.08;
  const shW = innerW / shutters + overlap;
  const railGap = (DEPTH - 0.08) / Math.max(tracks, 2);

  useFrame((state) => {
    if (!group.current) return;
    // slow idle sway; OrbitControls handles user rotation on top
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.35;
  });

  const zFor = (track: number) => -DEPTH / 2 + 0.06 + track * railGap;

  return (
    <group ref={group}>
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
      camera={{ position: [0, 0.3, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={() => onReady?.()}
      shadows={false}
      aria-hidden="true"
      style={interactive ? { cursor: "grab" } : { touchAction: "pan-y", pointerEvents: "none" }}
    >
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#ffffff", "#b8c4d6", 0.9]} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, 2, 3]} intensity={0.7} />
      <WindowModel shutters={shutters} net={net} />
      <ContactShadows position={[0, -H / 2 - 0.25, 0]} opacity={0.35} scale={7} blur={2.6} far={2} />
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

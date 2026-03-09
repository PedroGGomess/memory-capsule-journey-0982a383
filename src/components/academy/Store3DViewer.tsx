import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment, Float, RoundedBox } from "@react-three/drei";
import { Suspense, useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layers, Eye, ChevronUp, ChevronDown } from "lucide-react";

import plantaMinus1 from "@/assets/planta-piso-minus1.jpg";
import plantaPiso0 from "@/assets/planta-piso0.jpg";
import plantaPiso1 from "@/assets/planta-piso1.jpg";

/* ─── Animated Floor Plate ─── */
function FloorPlate({
  textureUrl,
  targetY,
  isActive,
  isFaded,
  onClick,
}: {
  textureUrl: string;
  targetY: number;
  isActive: boolean;
  isFaded: boolean;
  onClick: () => void;
}) {
  const texture = useTexture(textureUrl);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const currentY = useRef(targetY);
  const [hovered, setHovered] = useState(false);

  const W = 9;
  const D = 7;
  const T = 0.12;

  // Smooth vertical animation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, delta * 3);
    groupRef.current.position.y = currentY.current;

    // Glow pulse
    if (glowRef.current && isActive) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.08 + Math.sin(Date.now() * 0.003) * 0.04;
    }
  });

  const targetOpacity = isFaded ? 0.25 : isActive ? 1 : 0.55;

  return (
    <group ref={groupRef} position={[0, targetY, 0]}>
      {/* Main slab */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[W, T, D]} />
        <meshPhysicalMaterial
          color={isActive ? "#2d2820" : "#1c1a16"}
          transparent
          opacity={targetOpacity}
          roughness={0.6}
          metalness={0.15}
          clearcoat={isActive ? 0.3 : 0}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Floor plan texture */}
      <mesh position={[0, T / 2 + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W * 0.93, D * 0.93]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={targetOpacity * (isActive ? 0.95 : 0.5)}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Gold edge glow for active */}
      {isActive && (
        <mesh ref={glowRef}>
          <boxGeometry args={[W + 0.1, T + 0.06, D + 0.1]} />
          <meshStandardMaterial
            color="#c8a55a"
            transparent
            opacity={0.1}
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
      )}

      {/* Hover highlight */}
      {hovered && !isActive && (
        <mesh>
          <boxGeometry args={[W + 0.06, T + 0.03, D + 0.06]} />
          <meshStandardMaterial color="#c8a55a" transparent opacity={0.06} />
        </mesh>
      )}

      {/* Edge wireframe */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(W, T, D)]} />
        <lineBasicMaterial
          color={isActive ? "#c8a55a" : hovered ? "#8a7a5a" : "#333"}
          transparent
          opacity={isActive ? 0.6 : 0.2}
        />
      </lineSegments>

      {/* Glass walls (subtle) */}
      {isActive && <GlassWalls width={W} depth={D} height={2.2} />}
    </group>
  );
}

/* ─── Semi-transparent glass walls ─── */
function GlassWalls({ width, depth, height }: { width: number; depth: number; height: number }) {
  const wallMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#c8a55a",
    transparent: true,
    opacity: 0.04,
    roughness: 0.1,
    metalness: 0.3,
    transmission: 0.9,
    side: THREE.DoubleSide,
  }), []);

  return (
    <group position={[0, height / 2 + 0.06, 0]}>
      {/* Front */}
      <mesh position={[0, 0, depth / 2]} material={wallMat}>
        <planeGeometry args={[width, height]} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0, -depth / 2]} rotation={[0, Math.PI, 0]} material={wallMat}>
        <planeGeometry args={[width, height]} />
      </mesh>
      {/* Left */}
      <mesh position={[-width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[depth, height]} />
      </mesh>
      {/* Right */}
      <mesh position={[width / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[depth, height]} />
      </mesh>
    </group>
  );
}

/* ─── Hotspot marker with label ─── */
function Hotspot({ pos, label, color, isActive }: {
  pos: [number, number, number];
  label: string;
  color: string;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !isActive) return;
    meshRef.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 1.8 + pos[0] * 2) * 0.06;
    if (ringRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3 + pos[0]) * 0.15;
      ringRef.current.scale.set(s, s, 1);
    }
  });

  if (!isActive) return null;

  return (
    <group>
      {/* Vertical line from floor to dot */}
      <mesh position={[pos[0], pos[1] / 2, pos[2]]}>
        <cylinderGeometry args={[0.008, 0.008, pos[1], 4]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Glowing sphere */}
      <mesh
        ref={meshRef}
        position={pos}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.14 : 0.1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.5}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>

      {/* Animated ring */}
      <mesh ref={ringRef} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.22, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Label (always shown when hovered) */}
      {hovered && (
        <group position={[pos[0], pos[1] + 0.35, pos[2]]}>
          <mesh>
            <planeGeometry args={[label.length * 0.09 + 0.4, 0.28]} />
            <meshBasicMaterial color="#0a0908" transparent opacity={0.92} />
          </mesh>
          {/* Gold border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(label.length * 0.09 + 0.4, 0.28)]} />
            <lineBasicMaterial color="#c8a55a" transparent opacity={0.6} />
          </lineSegments>
        </group>
      )}
    </group>
  );
}

/* ─── Vertical connectors between floors ─── */
function VerticalConnectors({ spacing, activeFloor }: { spacing: number; activeFloor: number }) {
  const positions: [number, number][] = [[-3.8, -2.8], [3.8, -2.8], [-3.8, 2.8], [3.8, 2.8]];
  const totalH = spacing * 2 + 0.5;

  return (
    <group>
      {positions.map((p, i) => (
        <group key={i}>
          <mesh position={[p[0], spacing, p[1]]}>
            <cylinderGeometry args={[0.03, 0.03, totalH, 6]} />
            <meshStandardMaterial
              color="#c8a55a"
              transparent
              opacity={0.08}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
          {/* Corner glow */}
          <pointLight
            position={[p[0], activeFloor * spacing, p[1]]}
            color="#c8a55a"
            intensity={0.1}
            distance={2}
          />
        </group>
      ))}

      {/* Staircase indicator */}
      <group position={[-3.2, spacing, -1.8]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, i * (spacing * 2) / 8 - spacing + 0.2, i * 0.12]}>
            <boxGeometry args={[0.4, 0.04, 0.15]} />
            <meshStandardMaterial color="#c8a55a" transparent opacity={0.06} metalness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── Smooth camera ─── */
function SmoothCamera({ activeFloor, spacing }: { activeFloor: number; spacing: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(12, 10, 12));
  const targetLook = useRef(new THREE.Vector3(0, spacing, 0));

  useFrame((_, delta) => {
    const floorY = activeFloor * spacing;

    targetPos.current.set(12, floorY + 6, 12);
    targetLook.current.set(0, floorY, 0);

    camera.position.lerp(targetPos.current, delta * 2);
  });

  return null;
}

/* ─── Main Scene ─── */
function Scene({ activeFloor, setActiveFloor, exploded }: {
  activeFloor: number;
  setActiveFloor: (f: number) => void;
  exploded: boolean;
}) {
  const { language } = useLanguage();
  const isEN = language === "en";

  const spacing = exploded ? 4.5 : 2.8;

  const floorsData = useMemo(() => [
    {
      texture: plantaMinus1,
      hotspots: [
        { label: isEN ? "Storage 18.36m²" : "Armazenamento 18.36m²", pos: [1.2, 0.6] as [number, number], color: "#c8a55a" },
        { label: isEN ? "Interactive Box" : "Box Interativa", pos: [-2.2, -1.2] as [number, number], color: "#e8a040" },
        { label: isEN ? "Back Office" : "Back Office", pos: [-0.8, 1.2] as [number, number], color: "#8a7a5a" },
        { label: isEN ? "Safe Room" : "Área Cofre", pos: [-3.0, 1.5] as [number, number], color: "#d44" },
        { label: isEN ? "Staff" : "Staff", pos: [2.8, -1.8] as [number, number], color: "#6b9fff" },
      ],
    },
    {
      texture: plantaPiso0,
      hotspots: [
        { label: isEN ? "Shop Windows" : "Montras", pos: [-2.8, 2.2] as [number, number], color: "#c8a55a" },
        { label: isEN ? "Product Zone 14.87m²" : "Zona Produto 14.87m²", pos: [0.6, -0.6] as [number, number], color: "#e8a040" },
        { label: isEN ? "TRADITION 26.65m²" : "TRADITION 26.65m²", pos: [-1.4, 0.4] as [number, number], color: "#c8a55a" },
        { label: isEN ? "Interactive" : "Interativa", pos: [1.8, -1.8] as [number, number], color: "#6bffc8" },
        { label: isEN ? "Entrance" : "Entrada", pos: [3.2, -2.2] as [number, number], color: "#d44" },
      ],
    },
    {
      texture: plantaPiso1,
      hotspots: [
        { label: isEN ? "Tasting 22.56m²" : "Provas 22.56m²", pos: [1.2, -1.6] as [number, number], color: "#c8a55a" },
        { label: isEN ? "Cylinder Forest" : "Floresta Cilindros", pos: [-2.0, 0.6] as [number, number], color: "#6bffc8" },
        { label: isEN ? "Sales Counter" : "Balcão", pos: [1.2, 0.2] as [number, number], color: "#e8a040" },
        { label: isEN ? "Premium" : "Premium", pos: [2.2, 0.8] as [number, number], color: "#d44" },
        { label: isEN ? "Second Life" : "Segunda Vida", pos: [-2.6, 1.8] as [number, number], color: "#c8a55a" },
      ],
    },
  ], [isEN]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.35} color="#f5e6cc" />
      <directionalLight
        position={[8, 15, 8]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#fff8ee"
      />
      <directionalLight position={[-6, 8, -4]} intensity={0.25} color="#c8a55a" />
      <pointLight position={[0, activeFloor * spacing + 3, 0]} intensity={0.5} color="#c8a55a" distance={10} />

      {/* Environment reflections */}
      <fog attach="fog" args={["#0a0908", 18, 35]} />

      {/* Floor plates */}
      {floorsData.map((floor, i) => (
        <group key={i}>
          <FloorPlate
            textureUrl={floor.texture}
            targetY={i * spacing}
            isActive={activeFloor === i}
            isFaded={Math.abs(activeFloor - i) > 1}
            onClick={() => setActiveFloor(i)}
          />
          {/* Hotspots */}
          {floor.hotspots.map((h, hi) => (
            <Hotspot
              key={hi}
              pos={[h.pos[0], i * spacing + 0.25, h.pos[1]]}
              label={h.label}
              color={h.color}
              isActive={activeFloor === i}
            />
          ))}
        </group>
      ))}

      {/* Vertical structure */}
      <VerticalConnectors spacing={spacing} activeFloor={activeFloor} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a0908" roughness={1} />
      </mesh>

      <SmoothCamera activeFloor={activeFloor} spacing={spacing} />

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={8}
        maxDistance={22}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.3}
        autoRotate
        autoRotateSpeed={0.4}
        target={[0, activeFloor * spacing, 0]}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

/* ─── Main Export ─── */
export default function Store3DViewer() {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [activeFloor, setActiveFloor] = useState(1);
  const [exploded, setExploded] = useState(true);

  const floors = useMemo(() => [
    {
      id: -1,
      label: isEN ? "Floor −1" : "Piso −1",
      sub: isEN ? "Back of House" : "Bastidores",
      color: "#6b9fff",
      desc: isEN
        ? "Storage · Interactive Boxes · Back Office · Staff"
        : "Armazém · Boxes Interativas · Back Office · Staff",
      stats: isEN ? ["1 350 products", "3 VIP boxes", "Safe room"] : ["1 350 produtos", "3 boxes VIP", "Área cofre"],
    },
    {
      id: 0,
      label: isEN ? "Floor 0" : "Piso 0",
      sub: isEN ? "Main Stage" : "Palco Principal",
      color: "#e8a040",
      desc: isEN
        ? "Entrance · Shop Windows · TRADITION · Interactive"
        : "Entrada · Montras · TRADITION · Interativas",
      stats: isEN ? ["2 entrances", "26.65 m² TRADITION", "2 shop windows"] : ["2 entradas", "26.65 m² TRADITION", "2 montras"],
    },
    {
      id: 1,
      label: isEN ? "Floor 1" : "Piso 1",
      sub: isEN ? "Premium" : "Premium",
      color: "#c8a55a",
      desc: isEN
        ? "Tastings · Cylinder Forest · Sales Counter · VIP"
        : "Provas · Floresta Cilindros · Balcão · VIP",
      stats: isEN ? ["22.56 m² tasting", "Cylinder Forest 8.9 m²", "100-year bottles"] : ["22.56 m² provas", "Floresta 8.9 m²", "Garrafas 100 anos"],
    },
  ], [isEN]);

  const activeFloorData = floors[activeFloor];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0c0b09 0%, #0a0908 60%, #0d0b09 100%)",
        boxShadow: "0 0 0 1px rgba(200,165,90,0.15), 0 0 40px rgba(200,165,90,0.04)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #c8a55a 30%, #c8a55a 70%, transparent)" }}
      />

      {/* Header */}
      <div
        className="relative flex items-center justify-between px-6 py-5 border-b"
        style={{
          borderColor: "rgba(200,165,90,0.12)",
          background: "linear-gradient(90deg, rgba(200,165,90,0.06) 0%, transparent 70%)",
        }}
      >
        {/* Left gold bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(180deg, transparent, #c8a55a 40%, #c8a55a 60%, transparent)" }}
        />

        <div className="flex items-center gap-4">
          <div
            className="relative p-2.5"
            style={{ border: "1px solid rgba(200,165,90,0.25)", background: "rgba(200,165,90,0.06)" }}
          >
            <Layers className="w-5 h-5 text-primary" />
            {/* Pulsing live indicator */}
            <span
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#c8a55a", boxShadow: "0 0 6px #c8a55a" }}
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <p className="text-[11px] font-light text-primary tracking-[0.3em] uppercase">
                {isEN ? "Interactive 3D Store Map" : "Mapa 3D Interativo da Loja"}
              </p>
              <span
                className="px-1.5 py-0.5 text-[8px] tracking-[0.2em] uppercase"
                style={{
                  border: "1px solid rgba(200,165,90,0.30)",
                  color: "rgba(200,165,90,0.7)",
                  background: "rgba(200,165,90,0.06)",
                }}
              >
                LIVE
              </span>
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
              {isEN ? "Drag · Scroll to zoom · Click floor to focus" : "Arrastar · Scroll para zoom · Clicar para focar"}
            </p>
          </div>
        </div>

        {/* Exploded view toggle */}
        <button
          onClick={() => setExploded(!exploded)}
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
          style={{
            border: "1px solid rgba(200,165,90,0.20)",
            color: exploded ? "rgba(200,165,90,0.8)" : "rgba(255,255,255,0.35)",
            background: exploded ? "rgba(200,165,90,0.07)" : "transparent",
            padding: "6px 14px",
          }}
        >
          <Eye className="w-3 h-3" />
          {exploded
            ? (isEN ? "Compact View" : "Vista Compacta")
            : (isEN ? "Exploded View" : "Vista Expandida")}
        </button>
      </div>

      {/* Canvas area */}
      <div className="relative" style={{ height: "clamp(480px, 60vh, 680px)" }}>
        <Canvas
          camera={{ position: [12, 10, 12], fov: 40 }}
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{ background: "#0a0908" }}
        >
          <Suspense fallback={null}>
            <Scene activeFloor={activeFloor} setActiveFloor={setActiveFloor} exploded={exploded} />
          </Suspense>
        </Canvas>

        {/* Corner bracket decorations */}
        {(["tl", "tr", "bl", "br"] as const).map((corner) => (
          <div
            key={corner}
            className="absolute pointer-events-none"
            style={{
              top: corner.startsWith("t") ? 12 : undefined,
              bottom: corner.startsWith("b") ? 12 : undefined,
              left: corner.endsWith("l") ? 12 : undefined,
              right: corner.endsWith("r") ? 12 : undefined,
              width: 18,
              height: 18,
              borderTop: corner.startsWith("t") ? "1.5px solid rgba(200,165,90,0.5)" : undefined,
              borderBottom: corner.startsWith("b") ? "1.5px solid rgba(200,165,90,0.5)" : undefined,
              borderLeft: corner.endsWith("l") ? "1.5px solid rgba(200,165,90,0.5)" : undefined,
              borderRight: corner.endsWith("r") ? "1.5px solid rgba(200,165,90,0.5)" : undefined,
            }}
          />
        ))}

        {/* Active floor info panel (top-left) */}
        <div
          className="absolute top-4 left-4 pointer-events-none"
          style={{
            background: "rgba(10,9,8,0.82)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,165,90,0.18)",
            padding: "14px 16px",
            maxWidth: 220,
            borderLeft: `3px solid ${activeFloorData.color}`,
          }}
        >
          {/* Floor label row */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: activeFloorData.color }}
            />
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-light"
              style={{ color: activeFloorData.color }}
            >
              {activeFloorData.label}
            </p>
          </div>

          <p className="text-[9px] tracking-[0.12em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>
            {activeFloorData.sub}
          </p>

          <p className="text-[10px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            {activeFloorData.desc}
          </p>

          {/* Divider */}
          <div className="mb-2" style={{ height: 1, background: "rgba(200,165,90,0.12)" }} />

          {/* Stats */}
          <div className="space-y-1">
            {activeFloorData.stats.map((stat, si) => (
              <div key={si} className="flex items-center gap-2">
                <span className="w-0.5 h-0.5 rounded-full" style={{ background: activeFloorData.color, flexShrink: 0 }} />
                <p className="text-[9px] tracking-wide" style={{ color: "rgba(255,255,255,0.30)" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floor selector (bottom centre) */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-stretch gap-px"
          style={{
            background: "rgba(10,9,8,0.88)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(200,165,90,0.18)",
            padding: "4px",
          }}
        >
          {floors.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveFloor(i)}
              className="relative flex flex-col items-center transition-all duration-500"
              style={{
                padding: "8px 20px",
                background: activeFloor === i ? "rgba(200,165,90,0.10)" : "transparent",
                borderLeft: activeFloor === i ? `2px solid ${f.color}` : "2px solid transparent",
                minWidth: 80,
              }}
            >
              {/* Active indicator dot */}
              {activeFloor === i && (
                <span
                  className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: f.color }}
                />
              )}
              <span
                className="block text-[10px] tracking-[0.2em] uppercase font-light"
                style={{ color: activeFloor === i ? f.color : "rgba(255,255,255,0.30)" }}
              >
                {f.label}
              </span>
              <span
                className="block text-[8px] mt-0.5 tracking-wider"
                style={{ color: activeFloor === i ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)" }}
              >
                {f.sub}
              </span>
            </button>
          ))}
        </div>

        {/* Floor navigation arrows (right side) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
          <button
            onClick={() => setActiveFloor(Math.min(2, activeFloor + 1))}
            disabled={activeFloor === 2}
            className="flex items-center justify-center transition-all duration-300 disabled:opacity-15"
            style={{
              width: 32,
              height: 32,
              border: "1px solid rgba(200,165,90,0.25)",
              background: "rgba(10,9,8,0.80)",
              backdropFilter: "blur(8px)",
              color: activeFloor < 2 ? "rgba(200,165,90,0.8)" : undefined,
            }}
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Progress pip track */}
          <div className="flex flex-col items-center gap-1 py-1">
            {floors.map((_, pi) => (
              <button
                key={pi}
                onClick={() => setActiveFloor(pi)}
                className="transition-all duration-300"
                style={{
                  width: activeFloor === pi ? 6 : 4,
                  height: activeFloor === pi ? 6 : 4,
                  borderRadius: "50%",
                  background: activeFloor === pi ? floors[pi].color : "rgba(255,255,255,0.18)",
                  boxShadow: activeFloor === pi ? `0 0 6px ${floors[pi].color}` : undefined,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveFloor(Math.max(0, activeFloor - 1))}
            disabled={activeFloor === 0}
            className="flex items-center justify-center transition-all duration-300 disabled:opacity-15"
            style={{
              width: 32,
              height: 32,
              border: "1px solid rgba(200,165,90,0.25)",
              background: "rgba(10,9,8,0.80)",
              backdropFilter: "blur(8px)",
              color: activeFloor > 0 ? "rgba(200,165,90,0.8)" : undefined,
            }}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer status bar */}
      <div
        className="flex items-center justify-between px-6 py-3 border-t"
        style={{
          borderColor: "rgba(200,165,90,0.10)",
          background: "rgba(200,165,90,0.03)",
        }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(200,165,90,0.40)" }}>
            {isEN ? "3 floors · Porto" : "3 pisos · Porto"}
          </span>
          <span style={{ color: "rgba(200,165,90,0.15)" }}>·</span>
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.20)" }}>
            {isEN
              ? `${floors[activeFloor].stats.length} key areas active`
              : `${floors[activeFloor].stats.length} áreas ativas`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "rgba(200,165,90,0.6)" }}
          />
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(200,165,90,0.40)" }}>
            {isEN ? "Real-time 3D" : "3D em tempo real"}
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,165,90,0.25) 30%, rgba(200,165,90,0.25) 70%, transparent)" }}
      />
    </div>
  );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { Suspense, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
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
  floorColor,
  onClick,
}: {
  textureUrl: string;
  targetY: number;
  isActive: boolean;
  isFaded: boolean;
  floorColor: string;
  onClick: () => void;
}) {
  const texture = useTexture(textureUrl);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const currentY = useRef(targetY);
  const [hovered, setHovered] = useState(false);

  const W = 9;
  const D = 7;
  const T = 0.18;

  // Memoised geometry to avoid per-render allocation
  const slabGeo = useMemo(() => new THREE.BoxGeometry(W, T, D), []);
  const planeGeo = useMemo(() => new THREE.PlaneGeometry(W * 0.93, D * 0.93), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(W, T, D)), []);
  const glowGeo = useMemo(() => new THREE.BoxGeometry(W + 0.14, T + 0.08, D + 0.14), []);
  const hoverGeo = useMemo(() => new THREE.BoxGeometry(W + 0.08, T + 0.04, D + 0.08), []);

  // Smooth vertical animation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, delta * 3.5);
    groupRef.current.position.y = currentY.current;

    // Subtle glow pulse on active floor
    if (glowRef.current && isActive) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.14 + Math.sin(Date.now() * 0.002) * 0.06;
    }
  });

  // More visible opacity values so floors are clearly seen
  const slabOpacity = isFaded ? 0.35 : isActive ? 1 : 0.75;
  const texOpacity = isFaded ? 0.4 : isActive ? 1.0 : 0.72;

  return (
    <group ref={groupRef} position={[0, targetY, 0]}>
      {/* Main slab — distinctly visible base */}
      <mesh
        geometry={slabGeo}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={isActive ? "#3a3228" : "#252018"}
          transparent
          opacity={slabOpacity}
          roughness={0.55}
          metalness={0.2}
        />
      </mesh>

      {/* Floor plan texture — clearly visible */}
      <mesh geometry={planeGeo} position={[0, T / 2 + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={texOpacity}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Coloured edge glow for active floor */}
      {isActive && (
        <mesh ref={glowRef} geometry={glowGeo}>
          <meshStandardMaterial
            color={floorColor}
            transparent
            opacity={0.18}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      )}

      {/* Hover highlight */}
      {hovered && !isActive && (
        <mesh geometry={hoverGeo}>
          <meshStandardMaterial color={floorColor} transparent opacity={0.08} />
        </mesh>
      )}

      {/* Edge wireframe */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial
          color={isActive ? floorColor : hovered ? "#8a7a5a" : "#555"}
          transparent
          opacity={isActive ? 0.85 : hovered ? 0.4 : 0.25}
        />
      </lineSegments>

      {/* Glass walls (subtle) */}
      {isActive && <GlassWalls width={W} depth={D} height={2.2} floorColor={floorColor} />}
    </group>
  );
}

/* ─── Semi-transparent glass walls ─── */
function GlassWalls({ width, depth, height, floorColor }: { width: number; depth: number; height: number; floorColor: string }) {
  const wallMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: floorColor,
    transparent: true,
    opacity: 0.05,
    roughness: 0.05,
    metalness: 0.2,
    transmission: 0.92,
    side: THREE.DoubleSide,
  }), [floorColor]);

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

  // Memoised geometries
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.11, 16, 16), []);
  const sphereHovGeo = useMemo(() => new THREE.SphereGeometry(0.15, 16, 16), []);
  const ringGeo = useMemo(() => new THREE.RingGeometry(0.17, 0.25, 32), []);
  const stemGeo = useMemo(() => new THREE.CylinderGeometry(0.008, 0.008, pos[1], 4), [pos[1]]);

  useFrame((state) => {
    if (!meshRef.current || !isActive) return;
    meshRef.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 1.8 + pos[0] * 2) * 0.07;
    if (ringRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3 + pos[0]) * 0.18;
      ringRef.current.scale.set(s, s, 1);
    }
  });

  if (!isActive) return null;

  return (
    <group>
      {/* Vertical stem */}
      <mesh geometry={stemGeo} position={[pos[0], pos[1] / 2, pos[2]]}>
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      {/* Glowing sphere */}
      <mesh
        ref={meshRef}
        geometry={hovered ? sphereHovGeo : sphereGeo}
        position={pos}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.4 : 0.7}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>

      {/* Animated ring */}
      <mesh ref={ringRef} geometry={ringGeo} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML label — always visible above the dot, highlighted when hovered */}
      <Html
        position={[pos[0], pos[1] + 0.45, pos[2]]}
        center
        distanceFactor={12}
        occlude={false}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: hovered ? "rgba(10,9,8,0.97)" : "rgba(10,9,8,0.82)",
            border: `1px solid ${hovered ? color : "rgba(200,165,90,0.30)"}`,
            color: hovered ? color : "rgba(255,255,255,0.75)",
            padding: "3px 7px",
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
            lineHeight: 1.4,
            boxShadow: hovered ? `0 0 8px ${color}44` : "none",
            transition: "all 0.2s ease",
          }}
        >
          {label}
        </div>
      </Html>
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

/* ─── Camera controller — lerps OrbitControls target to active floor ─── */
function CameraController({ activeFloor, spacing }: { activeFloor: number; spacing: number }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const currentTargetY = useRef(activeFloor * spacing);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;
    const targetY = activeFloor * spacing;
    currentTargetY.current = THREE.MathUtils.lerp(currentTargetY.current, targetY, delta * 3.5);
    controlsRef.current.target.y = currentTargetY.current;
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={8}
      maxDistance={24}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2.1}
      autoRotate
      autoRotateSpeed={0.35}
      dampingFactor={0.06}
      enableDamping
    />
  );
}

/* ─── Main Scene ─── */
function Scene({ activeFloor, setActiveFloor, exploded }: {
  activeFloor: number;
  setActiveFloor: (f: number) => void;
  exploded: boolean;
}) {
  const { language } = useLanguage();
  const isEN = language === "en";

  const spacing = exploded ? 5.0 : 3.0;

  const floorColors = ["#6b9fff", "#e8a040", "#c8a55a"];

  const floorsData = useMemo(() => [
    {
      texture: plantaMinus1,
      hotspots: [
        { label: isEN ? "Storage 18.36m²" : "Armazenamento 18.36m²", pos: [1.2, 0.6] as [number, number], color: "#c8a55a" },
        { label: isEN ? "Interactive Box" : "Box Interativa", pos: [-2.2, -1.2] as [number, number], color: "#e8a040" },
        { label: isEN ? "Back Office" : "Back Office", pos: [-0.8, 1.2] as [number, number], color: "#8ab4ff" },
        { label: isEN ? "Safe Room" : "Área Cofre", pos: [-3.0, 1.5] as [number, number], color: "#ff6b6b" },
        { label: isEN ? "Staff" : "Staff", pos: [2.8, -1.8] as [number, number], color: "#6b9fff" },
      ],
    },
    {
      texture: plantaPiso0,
      hotspots: [
        { label: isEN ? "Shop Windows" : "Montras", pos: [-2.8, 2.2] as [number, number], color: "#c8a55a" },
        { label: isEN ? "Product Zone 14.87m²" : "Zona Produto 14.87m²", pos: [0.6, -0.6] as [number, number], color: "#e8a040" },
        { label: isEN ? "TRADITION 26.65m²" : "TRADITION 26.65m²", pos: [-1.4, 0.4] as [number, number], color: "#ffd580" },
        { label: isEN ? "Interactive" : "Interativa", pos: [1.8, -1.8] as [number, number], color: "#6bffc8" },
        { label: isEN ? "Entrance" : "Entrada", pos: [3.2, -2.2] as [number, number], color: "#ff6b6b" },
      ],
    },
    {
      texture: plantaPiso1,
      hotspots: [
        { label: isEN ? "Tasting 22.56m²" : "Provas 22.56m²", pos: [1.2, -1.6] as [number, number], color: "#c8a55a" },
        { label: isEN ? "Cylinder Forest" : "Floresta Cilindros", pos: [-2.0, 0.6] as [number, number], color: "#6bffc8" },
        { label: isEN ? "Sales Counter" : "Balcão", pos: [1.2, 0.2] as [number, number], color: "#e8a040" },
        { label: isEN ? "Premium VIP" : "Premium VIP", pos: [2.2, 0.8] as [number, number], color: "#ff6b6b" },
        { label: isEN ? "Second Life" : "Segunda Vida", pos: [-2.6, 1.8] as [number, number], color: "#c8a55a" },
      ],
    },
  ], [isEN]);

  return (
    <>
      {/* Lighting — bright enough to clearly see all floor plates */}
      <ambientLight intensity={1.1} color="#f0e8d8" />
      <directionalLight
        position={[10, 18, 10]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#fff8ee"
      />
      <directionalLight position={[-8, 10, -6]} intensity={0.7} color="#c8d8ff" />
      {/* Per-floor accent lights so each slab reads clearly */}
      {floorColors.map((col, i) => (
        <pointLight key={i} position={[0, i * spacing + 1.5, 0]} intensity={0.6} color={col} distance={8} />
      ))}
      {/* Active floor spotlight */}
      <pointLight position={[0, activeFloor * spacing + 4, 0]} intensity={1.0} color={floorColors[activeFloor]} distance={12} />

      {/* Soft background fog */}
      <fog attach="fog" args={["#0a0c10", 22, 42]} />

      {/* Floor plates */}
      {floorsData.map((floor, i) => (
        <group key={i}>
          <FloorPlate
            textureUrl={floor.texture}
            targetY={i * spacing}
            isActive={activeFloor === i}
            isFaded={Math.abs(activeFloor - i) > 1}
            floorColor={floorColors[i]}
            onClick={() => setActiveFloor(i)}
          />
          {/* Hotspots */}
          {floor.hotspots.map((h, hi) => (
            <Hotspot
              key={hi}
              pos={[h.pos[0], i * spacing + 0.3, h.pos[1]]}
              label={h.label}
              color={h.color}
              isActive={activeFloor === i}
            />
          ))}
        </group>
      ))}

      {/* Vertical structure */}
      <VerticalConnectors spacing={spacing} activeFloor={activeFloor} />

      {/* Ground shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#080a0d" roughness={1} />
      </mesh>

      <CameraController activeFloor={activeFloor} spacing={spacing} />
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
      <div className="relative" style={{ height: "clamp(500px, 62vh, 700px)" }}>
        <Canvas
          camera={{ position: [14, 12, 14], fov: 38 }}
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{ background: "linear-gradient(180deg, #0d0f14 0%, #0a0c10 100%)" }}
        >
          <Suspense fallback={null}>
            <Scene activeFloor={activeFloor} setActiveFloor={setActiveFloor} exploded={exploded} />
          </Suspense>
        </Canvas>

        {/* Loading overlay — shown until scene is ready */}
        <div
          id="canvas-loader"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ background: "#0a0c10", opacity: 0, transition: "opacity 0.8s", zIndex: 2 }}
        />

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
            background: "rgba(8,10,14,0.92)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.10)",
            padding: "14px 16px",
            maxWidth: 230,
            borderLeft: `3px solid ${activeFloorData.color}`,
            boxShadow: `0 0 20px ${activeFloorData.color}22`,
          }}
        >
          {/* Floor label row */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
              style={{ background: activeFloorData.color, boxShadow: `0 0 6px ${activeFloorData.color}` }}
            />
            <p
              className="text-[11px] tracking-[0.25em] uppercase font-semibold"
              style={{ color: activeFloorData.color }}
            >
              {activeFloorData.label}
            </p>
          </div>

          <p className="text-[10px] tracking-[0.12em] uppercase mb-2 font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
            {activeFloorData.sub}
          </p>

          <p className="text-[10px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
            {activeFloorData.desc}
          </p>

          {/* Divider */}
          <div className="mb-2" style={{ height: 1, background: `${activeFloorData.color}33` }} />

          {/* Stats */}
          <div className="space-y-1.5">
            {activeFloorData.stats.map((stat, si) => (
              <div key={si} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: activeFloorData.color }} />
                <p className="text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.60)" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floor selector (bottom centre) */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-stretch gap-0.5"
          style={{
            background: "rgba(8,10,14,0.92)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.10)",
            padding: "4px",
          }}
        >
          {floors.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveFloor(i)}
              className="relative flex flex-col items-center transition-all duration-300"
              style={{
                padding: "9px 22px",
                background: activeFloor === i ? `${f.color}18` : "transparent",
                borderBottom: activeFloor === i ? `2px solid ${f.color}` : "2px solid transparent",
                minWidth: 88,
              }}
            >
              {/* Active indicator dot */}
              {activeFloor === i && (
                <span
                  className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: f.color, boxShadow: `0 0 4px ${f.color}` }}
                />
              )}
              <span
                className="block text-[10px] tracking-[0.2em] uppercase font-medium"
                style={{ color: activeFloor === i ? f.color : "rgba(255,255,255,0.45)" }}
              >
                {f.label}
              </span>
              <span
                className="block text-[9px] mt-0.5 tracking-wider"
                style={{ color: activeFloor === i ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.28)" }}
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
            className="flex items-center justify-center transition-all duration-300 disabled:opacity-20"
            style={{
              width: 34,
              height: 34,
              border: "1px solid rgba(200,165,90,0.30)",
              background: "rgba(8,10,14,0.85)",
              backdropFilter: "blur(8px)",
              color: activeFloor < 2 ? "rgba(200,165,90,0.9)" : "rgba(255,255,255,0.2)",
            }}
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Progress pip track */}
          <div className="flex flex-col items-center gap-1.5 py-1">
            {floors.map((_, pi) => (
              <button
                key={pi}
                onClick={() => setActiveFloor(pi)}
                className="transition-all duration-300"
                style={{
                  width: activeFloor === pi ? 8 : 5,
                  height: activeFloor === pi ? 8 : 5,
                  borderRadius: "50%",
                  background: activeFloor === pi ? floors[pi].color : "rgba(255,255,255,0.25)",
                  boxShadow: activeFloor === pi ? `0 0 8px ${floors[pi].color}` : undefined,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveFloor(Math.max(0, activeFloor - 1))}
            disabled={activeFloor === 0}
            className="flex items-center justify-center transition-all duration-300 disabled:opacity-20"
            style={{
              width: 34,
              height: 34,
              border: "1px solid rgba(200,165,90,0.30)",
              background: "rgba(8,10,14,0.85)",
              backdropFilter: "blur(8px)",
              color: activeFloor > 0 ? "rgba(200,165,90,0.9)" : "rgba(255,255,255,0.2)",
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

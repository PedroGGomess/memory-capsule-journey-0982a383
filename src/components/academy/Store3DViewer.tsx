import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html, useTexture } from "@react-three/drei";
import { Suspense, useState, useRef, useMemo, useCallback } from "react";
import * as THREE from "three";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layers, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

import plantaMinus1 from "@/assets/planta-piso-minus1.jpg";
import plantaPiso0 from "@/assets/planta-piso0.jpg";
import plantaPiso1 from "@/assets/planta-piso1.jpg";

// Floor plate with plan texture
function FloorPlate({
  position,
  textureUrl,
  label,
  areas,
  isActive,
  onClick,
  opacity,
}: {
  position: [number, number, number];
  textureUrl: string;
  label: string;
  areas: { name: string; pos: [number, number]; color: string }[];
  isActive: boolean;
  onClick: () => void;
  opacity: number;
}) {
  const texture = useTexture(textureUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Floor plan aspect ratio ~1.5:1
  const width = 8;
  const depth = 6;
  const thickness = 0.08;

  return (
    <group position={position}>
      {/* Floor slab */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial
          color={isActive ? "#2a2520" : "#1a1815"}
          transparent
          opacity={opacity}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Floor plan on top surface */}
      <mesh position={[0, thickness / 2 + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * 0.92, depth * 0.92]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={opacity * (isActive ? 1 : 0.6)}
          roughness={0.5}
        />
      </mesh>

      {/* Glow edge when active */}
      {isActive && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[width + 0.06, thickness + 0.02, depth + 0.06]} />
          <meshStandardMaterial
            color="#c8a55a"
            transparent
            opacity={0.15}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      )}

      {/* Hover edge */}
      {hovered && !isActive && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[width + 0.04, thickness + 0.01, depth + 0.04]} />
          <meshStandardMaterial
            color="#c8a55a"
            transparent
            opacity={0.08}
          />
        </mesh>
      )}

      {/* Floor label */}
      <Html
        position={[width / 2 + 0.3, 0.1, 0]}
        center={false}
        style={{
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className={`px-3 py-1.5 text-xs tracking-widest uppercase font-light border transition-all duration-500 ${
            isActive
              ? "text-primary border-primary/40 bg-background/90"
              : "text-muted-foreground/60 border-border/20 bg-background/60"
          }`}
        >
          {label}
        </div>
      </Html>

      {/* Area hotspots */}
      {isActive &&
        areas.map((area, i) => (
          <Hotspot
            key={i}
            position={[area.pos[0], thickness / 2 + 0.15, area.pos[1]]}
            label={area.name}
            color={area.color}
          />
        ))}

      {/* Walls outline */}
      <lineSegments position={[0, thickness / 2 + 0.01, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, 0.001, depth)]} />
        <lineBasicMaterial color={isActive ? "#c8a55a" : "#333"} transparent opacity={opacity * 0.5} />
      </lineSegments>
    </group>
  );
}

// Hotspot indicator
function Hotspot({
  position,
  label,
  color,
}: {
  position: [number, number, number];
  label: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    }
  });

  return (
    <group>
      <mesh
        ref={ref}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Pulse ring */}
      <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {hovered && (
        <Html position={[position[0], position[1] + 0.3, position[2]]} center>
          <div className="bg-background/95 border border-primary/30 px-3 py-1.5 text-xs text-primary whitespace-nowrap tracking-wide font-light shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// Connector pillars between floors
function FloorConnectors({ opacity }: { opacity: number }) {
  const pillarPositions: [number, number, number][] = [
    [-3.5, 0, -2.5],
    [3.5, 0, -2.5],
    [-3.5, 0, 2.5],
    [3.5, 0, 2.5],
  ];

  return (
    <>
      {pillarPositions.map((pos, i) => (
        <mesh key={i} position={[pos[0], 1.5, pos[2]]}>
          <cylinderGeometry args={[0.04, 0.04, 6, 8]} />
          <meshStandardMaterial
            color="#c8a55a"
            transparent
            opacity={opacity * 0.15}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

// Camera controller
function CameraController({ activeFloor }: { activeFloor: number }) {
  const { camera } = useThree();
  const targetY = useRef(5);

  useFrame(() => {
    const floorY = activeFloor * 3;
    targetY.current = THREE.MathUtils.lerp(targetY.current, floorY + 5, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current, 0.03);
  });

  return null;
}

// Scene
function Scene({ activeFloor, setActiveFloor }: { activeFloor: number; setActiveFloor: (f: number) => void }) {
  const { language } = useLanguage();
  const isEN = language === "en";

  const floors = useMemo(() => [
    {
      id: -1,
      label: isEN ? "Floor -1 — Back of House" : "Piso -1 — Bastidores",
      texture: plantaMinus1,
      position: [0, 0, 0] as [number, number, number],
      areas: [
        { name: isEN ? "Storage (18.36m²)" : "Armazenamento (18.36m²)", pos: [1, 0.5] as [number, number], color: "#c8a55a" },
        { name: isEN ? "Interactive Box 1" : "Box Interativa 1", pos: [-2.5, -1.5] as [number, number], color: "#e8a040" },
        { name: isEN ? "Interactive Box 2" : "Box Interativa 2", pos: [-2.5, -0.5] as [number, number], color: "#e8a040" },
        { name: isEN ? "Interactive Box 3" : "Box Interativa 3", pos: [-2.5, 0.5] as [number, number], color: "#e8a040" },
        { name: isEN ? "Back Office" : "Back Office", pos: [-1, 1] as [number, number], color: "#8a7a5a" },
        { name: isEN ? "Safe Room" : "Área Cofre", pos: [-3.2, 1.2] as [number, number], color: "#ff6b6b" },
        { name: isEN ? "Staff Area" : "Instalações Staff", pos: [2.5, -1.5] as [number, number], color: "#6b9fff" },
      ],
    },
    {
      id: 0,
      label: isEN ? "Floor 0 — Main Stage" : "Piso 0 — Palco Principal",
      texture: plantaPiso0,
      position: [0, 3, 0] as [number, number, number],
      areas: [
        { name: isEN ? "Shop Windows" : "Montras", pos: [-3, 2.5] as [number, number], color: "#c8a55a" },
        { name: isEN ? "Product Zone (14.87m²)" : "Zona Produto (14.87m²)", pos: [0.5, -0.5] as [number, number], color: "#e8a040" },
        { name: isEN ? "TRADITION Zone (26.65m²)" : "Zona TRADITION (26.65m²)", pos: [-1.5, 0.5] as [number, number], color: "#c8a55a" },
        { name: isEN ? "Interactive Zone" : "Zona Interativa", pos: [1.5, -1.5] as [number, number], color: "#6bffc8" },
        { name: isEN ? "Entrance Sá da Bandeira" : "Entrada Sá da Bandeira", pos: [3, -2] as [number, number], color: "#ff6b6b" },
        { name: isEN ? "Entrance Passos Manuel" : "Entrada Passos Manuel", pos: [-2, 2.5] as [number, number], color: "#ff6b6b" },
      ],
    },
    {
      id: 1,
      label: isEN ? "Floor 1 — Premium Level" : "Piso 1 — Nível Premium",
      texture: plantaPiso1,
      position: [0, 6, 0] as [number, number, number],
      areas: [
        { name: isEN ? "Tasting Area (22.56m²)" : "Área de Provas (22.56m²)", pos: [1, -1.5] as [number, number], color: "#c8a55a" },
        { name: isEN ? "Cylinder Forest (8.90m²)" : "Floresta Cilindros (8.90m²)", pos: [-2, 0.5] as [number, number], color: "#6bffc8" },
        { name: isEN ? "Sales Counter" : "Balcão de Venda", pos: [1, 0] as [number, number], color: "#e8a040" },
        { name: isEN ? "Premium Products" : "Produtos Premium", pos: [2, 0.5] as [number, number], color: "#ff6b6b" },
        { name: isEN ? "Second Life Display" : "Exposição Segunda Vida", pos: [-2.5, 1.5] as [number, number], color: "#c8a55a" },
        { name: isEN ? "Client WC" : "WC Cliente", pos: [-2.5, -2] as [number, number], color: "#8a7a5a" },
      ],
    },
  ], [isEN]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 10, -5]} intensity={0.3} />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#c8a55a" />

      <CameraController activeFloor={activeFloor} />

      {floors.map((floor, i) => (
        <FloorPlate
          key={floor.id}
          position={floor.position}
          textureUrl={floor.texture}
          label={floor.label}
          areas={floor.areas}
          isActive={activeFloor === i}
          onClick={() => setActiveFloor(i)}
          opacity={activeFloor === i ? 1 : 0.5}
        />
      ))}

      <FloorConnectors opacity={0.8} />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={20}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.3}
        target={[0, 3, 0]}
      />
    </>
  );
}

// Main component
export default function Store3DViewer() {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [activeFloor, setActiveFloor] = useState(1); // Start on Floor 0

  const floorNames = isEN
    ? ["Floor -1", "Floor 0", "Floor 1"]
    : ["Piso -1", "Piso 0", "Piso 1"];

  const floorSubtitles = isEN
    ? ["Back of House", "Main Stage", "Premium Level"]
    : ["Bastidores", "Palco Principal", "Nível Premium"];

  return (
    <div className="relative w-full border border-border/30 bg-card/30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/5 rounded-sm">
            <Layers className="w-4 h-4 text-primary/60" />
          </div>
          <div>
            <p className="text-sm font-light text-primary tracking-wide uppercase">
              {isEN ? "Interactive 3D Store Map" : "Mapa 3D Interativo da Loja"}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">
              {isEN ? "Click on floors to explore · Hover hotspots for details" : "Clica nos pisos para explorar · Passa nos pontos para detalhes"}
            </p>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-[500px] md:h-[600px] relative">
        <Canvas
          camera={{ position: [10, 8, 10], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          style={{ background: "hsl(0 0% 3%)" }}
        >
          <Suspense fallback={null}>
            <Scene activeFloor={activeFloor} setActiveFloor={setActiveFloor} />
          </Suspense>
        </Canvas>

        {/* Floor selector overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {floorNames.map((name, i) => (
            <button
              key={i}
              onClick={() => setActiveFloor(i)}
              className={`px-4 py-2 text-xs tracking-wider uppercase font-light border transition-all duration-300 ${
                activeFloor === i
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : "bg-background/80 border-border/30 text-muted-foreground/60 hover:border-primary/20 hover:text-primary/80"
              }`}
            >
              <span className="block">{name}</span>
              <span className="block text-[9px] mt-0.5 opacity-60">{floorSubtitles[i]}</span>
            </button>
          ))}
        </div>

        {/* Instructions overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-background/70 border border-border/20 px-2.5 py-1.5 text-[10px] text-muted-foreground/50 tracking-wider uppercase flex items-center gap-1.5">
            <RotateCcw className="w-3 h-3" />
            {isEN ? "Drag to rotate" : "Arrasta para rodar"}
          </div>
          <div className="bg-background/70 border border-border/20 px-2.5 py-1.5 text-[10px] text-muted-foreground/50 tracking-wider uppercase flex items-center gap-1.5">
            <ZoomIn className="w-3 h-3" />
            {isEN ? "Scroll to zoom" : "Scroll para zoom"}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

function RotatingSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.12;
    group.rotation.y = state.clock.elapsedTime * 0.12;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.16;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.45}>
        <mesh position={[0, 0.1, 0]}>
          <icosahedronGeometry args={[1.35, 2]} />
          <meshStandardMaterial
            color="#5ee7ff"
            metalness={0.72}
            roughness={0.18}
            emissive="#071c22"
            emissiveIntensity={0.45}
            wireframe
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.35, 0, 0]}>
        <torusGeometry args={[2.15, 0.012, 16, 160]} />
        <meshStandardMaterial color="#7cf7c5" emissive="#163d31" emissiveIntensity={0.7} />
      </mesh>

      <mesh rotation={[Math.PI / 2.1, Math.PI / 4, 0]}>
        <torusGeometry args={[2.55, 0.008, 16, 180]} />
        <meshStandardMaterial color="#b79bff" emissive="#251d40" emissiveIntensity={0.55} />
      </mesh>

      {[
        [-2.4, 0.4, 0.35],
        [2.2, -0.25, -0.2],
        [0.9, 1.35, 0.55],
        [-0.6, -1.45, -0.35],
      ].map(([x, y, z], index) => (
        <Float key={`${x}-${y}-${z}`} speed={1.2 + index * 0.18} floatIntensity={0.35}>
          <mesh position={[x, y, z]} rotation={[0.5, 0.2 * index, 0.3]}>
            <boxGeometry args={[0.34, 0.34, 0.34]} />
            <meshStandardMaterial
              color={index % 2 ? '#f8c56b' : '#f7f7f2'}
              metalness={0.55}
              roughness={0.24}
              emissive={index % 2 ? '#33220a' : '#111827'}
              emissiveIntensity={0.32}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      className="hero-three-canvas"
      camera={{ position: [0, 0, 6.5], fov: 46 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.72} />
      <directionalLight position={[3, 4, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={2.2} color="#5ee7ff" />
      <pointLight position={[4, 2, 2]} intensity={1.4} color="#f8c56b" />
      <Stars radius={40} depth={18} count={650} factor={3} saturation={0} fade speed={0.35} />
      <Sparkles count={44} scale={[7, 4, 3]} size={1.8} speed={0.25} color="#7cf7c5" />
      <RotatingSystem />
    </Canvas>
  );
}

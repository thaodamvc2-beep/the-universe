'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { BackSide, Group } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function StarField() {
  const positions = useMemo(() => {
    const values = new Float32Array(720 * 3);
    let seed = 197903;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 720; i += 1) {
      const radius = 9 + random() * 34;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.cos(phi);
      values[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#dce8ff" size={0.055} sizeAttenuation transparent opacity={0.82} />
    </points>
  );
}

function Earth({ reducedMotion }: Readonly<{ reducedMotion: boolean }>) {
  const planet = useRef<Group>(null);
  useFrame((_state, delta) => {
    if (!reducedMotion && planet.current) planet.current.rotation.y += delta * 0.055;
  });

  return (
    <group ref={planet}>
      <mesh>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshStandardMaterial color="#286b91" roughness={0.94} metalness={0.02} />
      </mesh>
      <mesh scale={1.025}>
        <sphereGeometry args={[1.55, 40, 40]} />
        <meshBasicMaterial color="#73c8ff" transparent opacity={0.09} wireframe />
      </mesh>
      <mesh scale={1.055}>
        <sphereGeometry args={[1.55, 40, 40]} />
        <meshBasicMaterial color="#72c5ff" transparent opacity={0.13} side={BackSide} />
      </mesh>
      <mesh position={[0.1, 1.54, 0.2]} rotation={[0.15, 0.4, -0.25]} scale={[0.72, 0.12, 0.38]}>
        <sphereGeometry args={[1, 20, 16]} />
        <meshStandardMaterial color="#6b9b76" roughness={1} />
      </mesh>
      <mesh position={[-0.86, 0.46, 1.08]} rotation={[0.3, -0.6, 0.2]} scale={[0.38, 0.1, 0.52]}>
        <sphereGeometry args={[1, 18, 14]} />
        <meshStandardMaterial color="#719a78" roughness={1} />
      </mesh>
      <mesh position={[0.96, -0.72, 0.72]} rotation={[0.5, 0.2, 0.8]} scale={[0.48, 0.1, 0.24]}>
        <sphereGeometry args={[1, 18, 14]} />
        <meshStandardMaterial color="#759d79" roughness={1} />
      </mesh>
      <mesh position={[-0.45, -1.12, -0.95]} rotation={[0.2, 0.7, -0.4]} scale={[0.52, 0.09, 0.28]}>
        <sphereGeometry args={[1, 18, 14]} />
        <meshStandardMaterial color="#759d79" roughness={1} />
      </mesh>
    </group>
  );
}

function CameraControls({ reducedMotion }: Readonly<{ reducedMotion: boolean }>) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);
  useFrame((_state, delta) => controlsRef.current?.update(delta));
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.target.set(0, 0, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.rotateSpeed = 0.42;
    controls.zoomSpeed = 0.55;
    controls.minDistance = 2.65;
    controls.maxDistance = 6.5;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.22;
    controlsRef.current = controls;
    return () => {
      controlsRef.current = null;
      controls.dispose();
    };
  }, [camera, gl, reducedMotion]);
  return null;
}

function Scene({ reducedMotion }: Readonly<{ reducedMotion: boolean }>) {
  return (
    <>
      <color attach="background" args={['#050916']} />
      <fog attach="fog" args={['#050916', 15, 42]} />
      <ambientLight intensity={0.58} />
      <directionalLight position={[-4, 3, 5]} intensity={2.1} color="#d9e9ff" />
      <pointLight position={[4, -2, -4]} intensity={18} distance={18} color="#557dff" />
      <StarField />
      <Earth reducedMotion={reducedMotion} />
      <CameraControls reducedMotion={reducedMotion} />
    </>
  );
}

export function PlanetScene({ fallbackLabel }: Readonly<{ fallbackLabel: string }>) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  if (contextLost) return <div className="prototype-fallback" role="status">{fallbackLabel}</div>;

  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', () => setContextLost(true), { once: true });
      }}
      camera={{ position: [0, 0.45, 4.9], fov: 42 }}
      dpr={[1, 1.35]}
      gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
      fallback={<div className="prototype-fallback" role="status">{fallbackLabel}</div>}
    >
      <Suspense fallback={null}>
        <Scene reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

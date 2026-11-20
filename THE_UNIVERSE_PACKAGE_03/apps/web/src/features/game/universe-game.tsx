'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { BackSide, Group, Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useSite } from '@/components/site-provider';

type AvatarId = 'stardust' | 'lunar' | 'nebula' | 'crystal' | 'aurora' | 'solar';
type Direction = 'forward' | 'back' | 'left' | 'right';
type InputState = Record<Direction, boolean>;

const palette: Record<AvatarId, { suit: string; trim: string; glow: string }> = {
  stardust: { suit: '#7774bb', trim: '#e6dfff', glow: '#b9a8ff' },
  lunar: { suit: '#a6aec6', trim: '#f4f1e8', glow: '#dce8ff' },
  nebula: { suit: '#a765bd', trim: '#ffd9f4', glow: '#f5a8e7' },
  crystal: { suit: '#58aebd', trim: '#d8ffff', glow: '#9cf4f2' },
  aurora: { suit: '#5eaa91', trim: '#e5ffd9', glow: '#a8f2cb' },
  solar: { suit: '#d78b48', trim: '#fff1c8', glow: '#ffd38c' },
};

function StarField() {
  const positions = useMemo(() => {
    const values = new Float32Array(1450 * 3);
    let seed = 197903;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 1450; i += 1) {
      const radius = 8 + random() * 37;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.cos(phi);
      values[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, []);
  return <points>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#dce8ff" size={0.045} sizeAttenuation transparent opacity={0.8} />
  </points>;
}

function Avatar({ nickname, avatarId, input, resetRef }: {
  nickname: string; avatarId: AvatarId; input: React.MutableRefObject<InputState>;
  resetRef: React.MutableRefObject<boolean>;
}) {
  const person = useRef<Group>(null);
  const latitude = useRef(0.34);
  const longitude = useRef(0);
  const normal = useMemo(() => new Vector3(), []);
  const up = useMemo(() => new Vector3(0, 1, 0), []);
  const colors = palette[avatarId] ?? palette.stardust;

  useFrame((_state, delta) => {
    if (!person.current) return;
    if (resetRef.current) {
      latitude.current = 0.34;
      longitude.current = 0;
      resetRef.current = false;
    }
    const step = Math.min(delta, 0.05) * 0.7;
    if (input.current.left) longitude.current += step;
    if (input.current.right) longitude.current -= step;
    if (input.current.forward) latitude.current = Math.min(1.18, latitude.current + step);
    if (input.current.back) latitude.current = Math.max(-1.18, latitude.current - step);
    const lat = latitude.current;
    const lon = longitude.current;
    normal.set(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)).normalize();
    person.current.position.copy(normal).multiplyScalar(1.515);
    person.current.quaternion.setFromUnitVectors(up, normal);
  });

  return <group ref={person}>
    <mesh position={[0, 0.19, 0]} castShadow>
      <capsuleGeometry args={[0.105, 0.2, 5, 10]} />
      <meshStandardMaterial color={colors.suit} roughness={0.58} />
    </mesh>
    <mesh position={[0, 0.39, 0.015]} castShadow>
      <sphereGeometry args={[0.115, 20, 16]} />
      <meshStandardMaterial color="#f0d9c9" roughness={0.82} />
    </mesh>
    <mesh position={[0, 0.405, 0.108]}>
      <sphereGeometry args={[0.073, 20, 12]} />
      <meshStandardMaterial color={colors.trim} metalness={0.16} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.19, -0.105]}>
      <boxGeometry args={[0.17, 0.19, 0.09]} />
      <meshStandardMaterial color={colors.trim} roughness={0.6} />
    </mesh>
    {[-1, 1].map((side) => <group key={side} position={[side * 0.14, 0.2, 0]}>
      <mesh rotation={[0, 0, side * -0.22]} position={[side * 0.012, -0.01, 0]}>
        <capsuleGeometry args={[0.035, 0.14, 4, 8]} />
        <meshStandardMaterial color={colors.suit} />
      </mesh>
      <mesh position={[0, -0.17, 0.025]}>
        <sphereGeometry args={[0.045, 12, 10]} />
        <meshStandardMaterial color={colors.trim} />
      </mesh>
    </group>)}
    {[-1, 1].map((side) => <mesh key={side} position={[side * 0.055, 0.035, 0.005]}>
      <capsuleGeometry args={[0.04, 0.11, 4, 8]} />
      <meshStandardMaterial color={colors.suit} />
    </mesh>)}
    <pointLight position={[0, 0.46, 0.12]} color={colors.glow} intensity={0.32} distance={0.8} />
  </group>;
}

function EarthWorld({ nickname, avatarId, input, resetRef, reducedMotion }: {
  nickname: string; avatarId: AvatarId; input: React.MutableRefObject<InputState>;
  resetRef: React.MutableRefObject<boolean>; reducedMotion: boolean;
}) {
  const earth = useRef<Group>(null);
  useFrame((_state, delta) => {
    if (!reducedMotion && earth.current) earth.current.rotation.y += delta * 0.018;
  });
  return <group ref={earth}>
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="#286b91" roughness={0.96} />
    </mesh>
    <mesh scale={1.018}>
      <sphereGeometry args={[1.5, 48, 48]} />
      <meshBasicMaterial color="#73c8ff" transparent opacity={0.09} wireframe />
    </mesh>
    <mesh scale={1.045}>
      <sphereGeometry args={[1.5, 48, 48]} />
      <meshBasicMaterial color="#72c5ff" transparent opacity={0.14} side={BackSide} />
    </mesh>
    <mesh position={[0.08, 1.46, 0.2]} rotation={[0.15, 0.4, -0.25]} scale={[0.72, 0.12, 0.38]}>
      <sphereGeometry args={[1, 24, 18]} /><meshStandardMaterial color="#6b9b76" roughness={1} />
    </mesh>
    <mesh position={[-0.86, 0.43, 1.08]} rotation={[0.3, -0.6, 0.2]} scale={[0.38, 0.1, 0.52]}>
      <sphereGeometry args={[1, 20, 16]} /><meshStandardMaterial color="#719a78" roughness={1} />
    </mesh>
    <mesh position={[0.96, -0.72, 0.72]} rotation={[0.5, 0.2, 0.8]} scale={[0.48, 0.1, 0.24]}>
      <sphereGeometry args={[1, 20, 16]} /><meshStandardMaterial color="#759d79" roughness={1} />
    </mesh>
    <mesh position={[-0.45, -1.12, -0.95]} rotation={[0.2, 0.7, -0.4]} scale={[0.52, 0.09, 0.28]}>
      <sphereGeometry args={[1, 20, 16]} /><meshStandardMaterial color="#759d79" roughness={1} />
    </mesh>
    <Avatar nickname={nickname} avatarId={avatarId} input={input} resetRef={resetRef} />
  </group>;
}

function Moon() {
  const moon = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!moon.current) return;
    const angle = clock.getElapsedTime() * 0.055;
    moon.current.position.set(Math.cos(angle) * 3.15, Math.sin(angle * 0.7) * 0.55, Math.sin(angle) * 3.15);
    moon.current.rotation.y += 0.0007;
  });
  return <group ref={moon}>
    <mesh><sphereGeometry args={[0.24, 28, 24]} /><meshStandardMaterial color="#b9bfd0" roughness={0.94} /></mesh>
    <mesh position={[0.09, 0.13, 0.15]} scale={[0.07, 0.035, 0.05]}>
      <sphereGeometry args={[1, 12, 10]} /><meshStandardMaterial color="#858da4" />
    </mesh>
  </group>;
}

function CameraControls() {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.target.set(0, 0.05, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.42;
    controls.zoomSpeed = 0.55;
    controls.minDistance = 4.1;
    controls.maxDistance = 8.5;
    controls.minPolarAngle = 0.18;
    controls.maxPolarAngle = 2.85;
    return () => controls.dispose();
  }, [camera, gl]);
  return null;
}

function Scene({ nickname, avatarId, input, resetRef, reducedMotion }: {
  nickname: string; avatarId: AvatarId; input: React.MutableRefObject<InputState>;
  resetRef: React.MutableRefObject<boolean>; reducedMotion: boolean;
}) {
  return <>
    <color attach="background" args={['#050916']} />
    <fog attach="fog" args={['#050916', 16, 44]} />
    <ambientLight intensity={0.72} />
    <directionalLight position={[-4, 4, 5]} intensity={2.15} color="#d9e9ff" />
    <pointLight position={[4, -2, -4]} intensity={18} distance={18} color="#557dff" />
    <StarField />
    <EarthWorld nickname={nickname} avatarId={avatarId} input={input} resetRef={resetRef} reducedMotion={reducedMotion} />
    <Moon />
    <CameraControls />
  </>;
}

export function UniverseGame() {
  const { language, setLanguage, guestIdentity } = useSite();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const input = useRef<InputState>({ forward: false, back: false, left: false, right: false });
  const resetRef = useRef(false);
  const avatarId = (guestIdentity?.avatarId ?? 'stardust') as AvatarId;
  const nickname = guestIdentity?.nickname ?? (language === 'vi' ? 'Người du hành' : 'Traveler');

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const keys: Record<string, Direction> = {
      w: 'forward', ArrowUp: 'forward', s: 'back', ArrowDown: 'back',
      a: 'left', ArrowLeft: 'left', d: 'right', ArrowRight: 'right',
    };
    const down = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT') return;
      const direction = keys[event.key];
      if (direction) { event.preventDefault(); input.current[direction] = true; }
    };
    const up = (event: KeyboardEvent) => {
      const direction = keys[event.key];
      if (direction) { event.preventDefault(); input.current[direction] = false; }
    };
    const clear = () => { input.current = { forward: false, back: false, left: false, right: false }; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', clear);
    };
  }, []);

  const setDirection = (direction: Direction, active: boolean) => { input.current[direction] = active; };
  const resetHome = () => { resetRef.current = true; input.current = { forward: false, back: false, left: false, right: false }; };

  return <main id="main-content" className="universe-game">
    <div className="game-canvas" aria-label={language === 'vi' ? 'Vũ trụ 3D có thể điều khiển' : 'Interactive 3D universe'}>
      {!contextLost ? <Canvas
        camera={{ position: [0, 2.25, 5.65], fov: 38 }}
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', () => setContextLost(true), { once: true })}
        fallback={<div className="game-fallback">{language === 'vi' ? 'Thiết bị chưa hỗ trợ cảnh 3D. Hãy thử trình duyệt khác.' : 'This device cannot display the 3D scene. Try another browser.'}</div>}
      >
        <Suspense fallback={null}><Scene nickname={nickname} avatarId={avatarId} input={input} resetRef={resetRef} reducedMotion={reducedMotion} /></Suspense>
      </Canvas> : <div className="game-fallback">{language === 'vi' ? 'Cảnh 3D đã tạm dừng do thiết bị thiếu bộ nhớ đồ họa.' : 'The 3D scene paused because the device lost its graphics context.'}</div>}
    </div>
    <div className="game-vignette" aria-hidden="true" />
    <header className="game-topbar">
      <Link className="game-brand" href="/"><span className="game-brand-mark">✦</span> THE UNIVERSE</Link>
      <nav className="game-nav" aria-label="Game navigation">
        <Link href="/map">{language === 'vi' ? 'Bản đồ' : 'Map'}</Link>
        <Link href="/worlds">{language === 'vi' ? 'Thiên thể' : 'Worlds'}</Link>
        <Link href="/avatar">{language === 'vi' ? 'Avatar' : 'Avatar'}</Link>
        <button type="button" className="game-language" onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}>{language.toUpperCase()}</button>
      </nav>
    </header>
    <section className="game-identity">
      <span className="game-eyebrow">{language === 'vi' ? 'ĐIỂM KHỞI HÀNH · TRÁI ĐẤT' : 'HOME WORLD · EARTH'}</span>
      <h1>{language === 'vi' ? 'Một góc bình yên giữa vũ trụ' : 'A quiet place among the stars'}</h1>
      <p>{language === 'vi' ? 'Bạn đang ở nhà. Hãy thong thả bước đi và ngắm nhìn không gian.' : 'You are home. Wander slowly and watch the universe breathe.'}</p>
    </section>
    <div className="game-player">
      <span className="game-player-orb" />
      <span><small>{language === 'vi' ? 'NGƯỜI ĐANG DU HÀNH' : 'TRAVELER'}</small><strong>{nickname}</strong></span>
      <Link href="/avatar" aria-label={language === 'vi' ? 'Đổi avatar và tên' : 'Change avatar and name'}>↗</Link>
    </div>
    <div className="game-controls">
      <div className="game-control-copy">
        <strong>{language === 'vi' ? 'Di chuyển' : 'Move'}</strong>
        <span>{language === 'vi' ? 'WASD / phím mũi tên · Kéo để xoay góc nhìn' : 'WASD / arrow keys · Drag to look around'}</span>
      </div>
      <div className="game-dpad" aria-label={language === 'vi' ? 'Nút điều khiển di chuyển' : 'Movement controls'}>
        <button className="dpad-up" type="button" aria-label="Move forward" onPointerDown={() => setDirection('forward', true)} onPointerUp={() => setDirection('forward', false)} onPointerLeave={() => setDirection('forward', false)} onPointerCancel={() => setDirection('forward', false)}>↑</button>
        <button className="dpad-left" type="button" aria-label="Move left" onPointerDown={() => setDirection('left', true)} onPointerUp={() => setDirection('left', false)} onPointerLeave={() => setDirection('left', false)} onPointerCancel={() => setDirection('left', false)}>←</button>
        <button className="dpad-down" type="button" aria-label="Move backward" onPointerDown={() => setDirection('back', true)} onPointerUp={() => setDirection('back', false)} onPointerLeave={() => setDirection('back', false)} onPointerCancel={() => setDirection('back', false)}>↓</button>
        <button className="dpad-right" type="button" aria-label="Move right" onPointerDown={() => setDirection('right', true)} onPointerUp={() => setDirection('right', false)} onPointerLeave={() => setDirection('right', false)} onPointerCancel={() => setDirection('right', false)}>→</button>
      </div>
    </div>
    <div className="game-bottom-actions">
      <button type="button" onClick={resetHome}>⌖ {language === 'vi' ? 'Về điểm xuất phát' : 'Return to start'}</button>
      <span>{language === 'vi' ? 'Mặt Trăng đang lặng lẽ chuyển động quanh bạn' : 'The Moon is quietly orbiting nearby'}</span>
    </div>
  </main>;
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Vector3 } from 'three';
import { publicAssetPath } from '../apps/web/src/lib/public-asset-path.mjs';
import { shouldStartCameraDrag, createFlightInputState, createDirectionInputRegistry, setFlightDirectionSource } from '../apps/web/src/features/game/flight-controller.mjs';
import { createCollisionBodies, moveAvoidingBodies } from '../apps/web/src/features/game/flight-collision.mjs';
const root = resolve(import.meta.dirname, '..');
const read = (path) => readFile(resolve(root, path), 'utf8');

test('public asset paths work on GitHub Pages and Vercel root', () => {
  assert.equal(publicAssetPath('/avatars/stardust.png', '/the-universe'), '/the-universe/avatars/stardust.png');
  assert.equal(publicAssetPath('/avatars/stardust.png', ''), '/avatars/stardust.png');
  assert.equal(publicAssetPath('avatars/stardust.png', '/'), '/avatars/stardust.png');
});

test('interactive controls do not start parent canvas pointer capture', () => {
  const button = { closest: (selector) => selector.includes('button') ? {} : null };
  const canvas = { closest: () => null };
  assert.equal(shouldStartCameraDrag(button), false);
  assert.equal(shouldStartCameraDrag(canvas), true);
  assert.equal(shouldStartCameraDrag(null), true);
});

test('direction steering preserves continuous flight through pointer release', () => {
  const input = createFlightInputState(), sources = createDirectionInputRegistry();
  input.mode = 'flying'; input.autoFlight = true;
  setFlightDirectionSource(input, sources, 'right', 'pointer:7', true);
  assert.equal(input.right, true); assert.equal(input.autoFlight, true);
  setFlightDirectionSource(input, sources, 'right', 'pointer:7', false);
  assert.equal(input.right, false); assert.equal(input.autoFlight, true);
});

test('collision records are precomputed and free movement preserves displacement', () => {
  const bodies = createCollisionBodies([{ id: 'a', position: [100, 0, 0], radius: 1 }]);
  assert.deepEqual(bodies, [{ id: 'a', x: 100, y: 0, z: 0, clearance: 2.02 }]);
  assert.deepEqual(moveAvoidingBodies({ x: 0, y: 0, z: 0 }, { x: 2, y: 1, z: -3 }, [], null), [2, 1, -3]);
});

test('swept collision steers around a body without entering its clearance sphere', () => {
  const bodies = createCollisionBodies([{ id: 'planet', position: [5, 0, 0], radius: 1 }]);
  const result = moveAvoidingBodies({ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }, bodies, null);
  assert.ok(Math.hypot(result[0] - 5, result[1], result[2]) >= bodies[0].clearance - 1e-9);
  assert.notEqual(result[2], 0);
});

test('collision avoidance does not trap a player moving outward from inside a body', () => {
  const bodies = createCollisionBodies([{ id: 'planet', position: [5, 0, 0], radius: 1 }]);
  assert.deepEqual(moveAvoidingBodies({ x: 5, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, bodies, null), [6, 0, 0]);
});

test('target body can be ignored during approach', () => {
  const bodies = createCollisionBodies([{ id: 'target', position: [5, 0, 0], radius: 1 }]);
  assert.deepEqual(moveAvoidingBodies({ x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }, bodies, 'target'), [4, 0, 0]);
});

test('game uses curated NASA-inspired destinations and leaves infinite region keys untouched', async () => {
  const game = await read('apps/web/src/features/game/universe-game.tsx');
  const data = await read('apps/web/src/features/game/universe-data.ts');
  assert.match(game, /GAME_EXOPLANET_DESTINATIONS/);
  assert.match(game, /shouldStartCameraDrag/);
  assert.doesNotMatch(game, /exoplanetarchive\.ipac\.caltech\.edu\/TAP/);
  assert.match(data, /GAME_EXOPLANET_DESTINATIONS/);
  assert.match(game, /generatedKeys=useRef\(new Set<string>\(\['0:0:0'\]\)\)/);
});

test('flight scene and avatar artwork use deployment-aware asset paths and nearby-only labels', async () => {
  const scene = await read('apps/web/src/features/game/flight-scene.tsx');
  const artwork = await read('apps/web/src/components/celestial-avatar-artwork.tsx');
  assert.match(scene, /publicAssetPath/);
  assert.match(scene, /PLANET_LABEL_RENDER_DISTANCE_SQUARED=72\*72/);
  assert.match(artwork, /publicAssetPath/);
});

test('scalar collision solver matches the previous Three.js geometry across deterministic spatial cases', () => {
  const raw = Array.from({ length: 36 }, (_, i) => ({ id: 'b' + i, position: [Math.sin(i * 1.7) * 18, Math.cos(i * 0.9) * 12, Math.sin(i * 0.31) * 20], radius: 0.25 + (i % 7) * 0.18 }));
  const indexed = createCollisionBodies(raw);
  const reference = (start, displacement, bodies, ignoreId) => {
    const length = displacement.length(); if (length < 1e-8) return start.clone();
    const direction = displacement.clone().normalize(), adjusted = displacement.clone();
    for (const body of bodies) {
      if (body.id === ignoreId) continue;
      const center = new Vector3(...body.position), fromCenter = start.clone().sub(center), startDistance = fromCenter.length();
      const projection = Math.max(0, Math.min(length, center.clone().sub(start).dot(direction)));
      const closest = start.clone().addScaledVector(direction, projection), clearance = body.radius * 1.3 + 0.72;
      if (closest.distanceTo(center) < clearance && !(startDistance < clearance && start.clone().add(displacement).distanceTo(center) > startDistance)) {
        const normal = closest.sub(center).normalize(); if (normal.lengthSq() < .001) normal.copy(fromCenter).normalize();
        const tangent = direction.clone().projectOnPlane(normal);
        if (tangent.lengthSq() < .001) tangent.crossVectors(normal, new Vector3(0, 1, 0));
        if (tangent.lengthSq() < .001) tangent.crossVectors(normal, new Vector3(1, 0, 0));
        adjusted.copy(tangent.normalize().multiplyScalar(length)); break;
      }
    }
    const candidate = start.clone().add(adjusted);
    for (const body of bodies) {
      if (body.id === ignoreId) continue;
      const center = new Vector3(...body.position), minimum = body.radius * 1.3 + .72;
      const distance = candidate.distanceTo(center), startDistance = start.distanceTo(center);
      if (distance < minimum && !(startDistance < minimum && distance > startDistance)) {
        const normal = candidate.clone().sub(center); if (normal.lengthSq() < .001) normal.copy(start).sub(center);
        if (normal.lengthSq() < .001) normal.set(0, 1, 0);
        candidate.copy(center).addScaledVector(normal.normalize(), minimum);
      }
    }
    return candidate;
  };
  let seed = 73421; const random = () => ((seed = (seed * 48271) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < 240; i++) {
    const start = new Vector3((random() - .5) * 48, (random() - .5) * 32, (random() - .5) * 48);
    const displacement = new Vector3((random() - .5) * 5, (random() - .5) * 5, (random() - .5) * 5);
    const ignoreId = i % 4 === 0 ? 'b' + (i % raw.length) : null;
    const expected = reference(start, displacement, raw, ignoreId);
    const actual = moveAvoidingBodies(start, displacement, indexed, ignoreId);
    assert.ok(expected.distanceTo(new Vector3(...actual)) < 1e-8, 'collision path ' + i + ' must preserve the original geometry');
  }
});

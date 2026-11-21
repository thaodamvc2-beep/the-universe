import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../apps/web/src/data/celestial-bodies.json', import.meta.url);
const bodies = JSON.parse(readFileSync(root, 'utf8'));

test('catalogue contains the Sun, eight planets and Earth Moon exactly once', () => {
  assert.equal(bodies.length, 10);
  assert.deepEqual(new Set(bodies.map((body) => body.id)), new Set(['sun','mercury','venus','earth','moon','mars','jupiter','saturn','uranus','neptune']));
});

test('all current catalogue entries are explicitly real astronomical objects', () => {
  assert.ok(bodies.every((body) => body.classification === 'REAL_ASTRONOMICAL'));
  assert.ok(bodies.every((body) => body.sourceUrl.startsWith('https://science.nasa.gov/')));
});

test('Earth is the only Home World', () => {
  const homes = bodies.filter((body) => body.isHomeWorld === true);
  assert.equal(homes.length, 1);
  assert.equal(homes[0].id, 'earth');
});

test('each record has a type, description, atmosphere and exploration note', () => {
  for (const body of bodies) {
    assert.ok(body.kind);
    assert.ok(body.description);
    assert.ok(body.atmosphere);
    assert.ok(body.explorationNote);
    assert.ok(body.radiusEarth > 0);
  }
});

test('gas and ice giants are explicitly not treated as walkable solid worlds', () => {
  for (const body of bodies.filter((item) => ['Gas giant','Ice giant'].includes(item.kind))) {
    assert.match(body.explorationNote, /not|no conventional|without/i);
  }
});

test('every celestial record has complete Vietnamese copy', () => {
  for (const body of bodies) {
    assert.ok(body.kindVi);
    assert.ok(body.descriptionVi);
    assert.ok(body.atmosphereVi);
    assert.ok(body.explorationNoteVi);
  }
});

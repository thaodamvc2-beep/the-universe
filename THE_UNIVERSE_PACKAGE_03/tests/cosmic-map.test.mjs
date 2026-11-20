import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFile(resolve(root, path), 'utf8');

test('Gói 06 map resolves all selectable markers from canonical celestial IDs', async () => {
  const map = await read('apps/web/src/components/cosmic-map.tsx');
  const data = JSON.parse(await read('apps/web/src/data/celestial-bodies.json'));
  for (const body of data) assert.ok(map.includes(body.id), body.id);
  assert.match(map, /bodies\.map/);
  assert.match(map, /selectedId/);
  assert.match(map, /aria-pressed/);
});

test('Earth is the default Home World and both recovery controls focus Earth', async () => {
  const map = await read('apps/web/src/components/cosmic-map.tsx');
  assert.match(map, /useState\('earth'\)/);
  assert.match(map, /const returnToEarth = \(\) => selectBody\('earth'\)/);
  assert.match(map, /mapHomeWorldLabel/);
  assert.match(map, /mapFindWayBack/);
});

test('Gói 06 labels schematic scale and simulated route preview', async () => {
  const map = await read('apps/web/src/components/cosmic-map.tsx');
  const translations = await read('apps/web/src/lib/i18n/translations.ts');
  assert.match(map, /mapScaleNote/);
  assert.match(map, /mapPreviewOnly/);
  assert.match(map, /mapRouteReady/);
  assert.match(translations, /not to scale/);
  assert.match(translations, /chức năng chọn điểm đến/);
});

test('homepage and direct map route share avatar identity and canonical world data', async () => {
  const home = await read('apps/web/src/app/page.tsx');
  const mapPage = await read('apps/web/src/app/map/page.tsx');
  const map = await read('apps/web/src/components/cosmic-map.tsx');
  assert.match(home, /UniverseGame/);
  assert.match(mapPage, /CosmicMap/);
  assert.match(map, /guestIdentity\.avatarId/);
  assert.match(map, /@\/data\/celestial-bodies\.json/);
});

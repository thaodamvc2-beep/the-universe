import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFile(resolve(root, path), 'utf8');

test('English and Vietnamese dictionaries expose the same UI keys', async () => {
  const source = await read('apps/web/src/lib/i18n/translations.ts');
  assert.match(source, /en:\s*\{/);
  assert.match(source, /vi:\s*\{/);
  assert.match(source, /languageLabel/);
  assert.match(source, /enterGuest/);
  assert.match(source, /homeTitle/);
  assert.match(source, /prototypeFallback/);
  const english = source.match(/en:\s*\{([\s\S]*?)\n  \},\n  vi:/)?.[1] ?? '';
  const vietnamese = source.match(/vi:\s*\{([\s\S]*?)\n  \},\n\} as const/)?.[1] ?? '';
  const keys = (block) => [...block.matchAll(/^    ([A-Za-z][A-Za-z0-9]*):/gm)].map((match) => match[1]).sort();
  assert.deepEqual(keys(english), keys(vietnamese));
});

test('homepage has a guest-first entry and preserves Earth as Home World', async () => {
  const page = await read('apps/web/src/app/page.tsx');
  assert.match(page, /UniverseGame/);
  const game = await read('apps/web/src/features/game/universe-game.tsx');
  assert.match(game, /<Canvas/);
  assert.match(game, /ArrowUp/);
  assert.match(game, /FlightScene/);
  assert.match(game, /guestIdentity/);
  assert.match(game, /NEXT_PUBLIC_UNIVERSE_REALTIME_URL/);
  assert.match(await read('apps/web/src/components/cosmic-map.tsx'), /SiteHeader/);
  assert.doesNotMatch(page, /sign.?up|register|create account/i);
});

test('prototype uses the R3F candidate and no remote media assets', async () => {
  const scene = await read('apps/web/src/features/prototype/planet-scene.tsx');
  const pkg = JSON.parse(await read('apps/web/package.json'));
  assert.ok(pkg.dependencies['@react-three/fiber']);
  assert.ok(pkg.dependencies.three);
  assert.match(scene, /<Canvas/);
  assert.match(scene, /OrbitControls/);
  assert.match(scene, /powerPreference: 'low-power'/);
  assert.match(scene, /prefers-reduced-motion/);
  assert.match(scene, /webglcontextlost/);
  assert.doesNotMatch(scene, /https?:\/\//i);
});

test('prototype is clearly labeled as a prototype, not the full flight system', async () => {
  const page = await read('apps/web/src/app/prototype/page.tsx');
  const translations = await read('apps/web/src/lib/i18n/translations.ts');
  assert.match(page, /PlanetScene/);
  assert.match(translations, /not the full flight experience/);
  assert.match(translations, /chưa phải trải nghiệm bay hoàn chỉnh/);
});

test('Gói 03 keeps engine selection open until real-device comparison', async () => {
  const scope = await read('docs/packages/PACKAGE_03_SCOPE_AND_ACCEPTANCE.md');
  const decisions = await read('docs/decisions/P03-DECISION-LOG.md');
  assert.match(scope, /D01 remains pending/i);
  assert.match(scope, /Babylon\.js/);
  assert.match(scope, /PlayCanvas/);
  assert.match(decisions, /OPEN — NOT LOCKED/);
});


test('integrated game generates coordinate-seeded worlds locally with no AI API controls or warnings', async () => {
  const game = await read('apps/web/src/features/game/universe-game.tsx');
  const data = await read('apps/web/src/features/game/universe-data.ts');
  assert.match(game, /makeProceduralRegion/);
  assert.match(game, /setInterval/);
  assert.match(game, /Mở vùng không gian mới/);
  assert.doesNotMatch(game, /NEXT_PUBLIC_UNIVERSE_AI_ENDPOINT|requestAI|Sáng tạo bằng AI|AI chưa kết nối/);
  assert.match(data, /export function makeProceduralRegion/);
  assert.match(data, /Math\.imul/);
  assert.match(data, /position/);
});

test('flight uses slow collision-aware travel, gentle landing, planetary labels and local viewpoint lighting', async () => {
  const scene = await read('apps/web/src/features/game/flight-scene.tsx');
  assert.match(scene, /moveAvoidingBodies/);
  assert.match(scene, /target\.landable/);
  assert.match(scene, /PlanetLabel/);
  assert.match(scene, /CanvasTexture/);
  assert.ok(scene.includes("body.id==='sun'&&<pointLight"));
  assert.match(scene, /camera\.lookAt/);
  assert.match(scene, /seated/);
});

test('procedural regions are spaced beyond the known Solar System',async()=>{const game=await read('apps/web/src/features/game/universe-game.tsx');const data=await read('apps/web/src/features/game/universe-data.ts');assert.match(game,/p\.x\/150/);assert.match(game,/x===0&&y===0&&z===0/);assert.match(data,/cx\*150,cy\*150,cz\*150/)});

test('manual region expansion uses the same 150-unit spatial cells as automatic streaming',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 assert.match(game,/new Vector3\(cx\*150,cy\*150,cz\*150\)/);
});

test('immersive game HUD follows the supplied celestial exploration layout without replacing the flight world',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 const css=await read('apps/web/src/app/globals.css');
 assert.match(game,/cosmic-action-dock/);
 assert.match(game,/game-fullscreen/);
 assert.match(game,/cosmic-utility-rail/);
 assert.match(scene,/s\.scale\.set\(1\.72,2\.42,1\)/);
 assert.match(scene,/landedBody\?3\.35:2\.3/);
 assert.match(css,/Reference-matched immersive HUD/);
 assert.match(css,/game-dpad\{width:148px;height:148px/);
});

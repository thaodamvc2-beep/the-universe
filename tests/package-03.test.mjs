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
  assert.match(scene, /getLandingSurfaceRadius/);
  assert.doesNotMatch(scene, /target\.landable/);
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
 assert.match(game,/cosmic-movement-rail/);
 assert.match(game,/game-fullscreen/);
 assert.match(game,/cosmic-utility-rail/);
 assert.match(scene,/s\.scale\.set\(\.76\*aspect,\.76,1\)/);assert.match(scene,/s\.scale\.set\(\.55\*aspect,\.55,1\)/);
 assert.match(scene,/look\.copy\(cameraForward\)/);
 assert.match(css,/Reference-matched immersive HUD/);
 assert.match(css,/game-dpad\{position:relative;display:grid;width:148px;height:148px/);
});

test('player feedback is accessible in-game and only posts after explicit GitHub confirmation',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const css=await read('apps/web/src/app/globals.css');
 assert.match(game,/cosmic-feedback-panel/);
 assert.match(game,/issues\/new\?title=/);
 assert.match(game,/Nothing is submitted until you confirm on GitHub|Không có nội dung nào được gửi trước khi bạn xác nhận trên GitHub/);
 assert.match(game,/feedbackText\.trim\(\)/);
 assert.match(css,/resolve control collisions and expose player feedback/);
 assert.match(css,/destination-panel\{top:224px/);
});

test('real destination staging keeps Earth as home while distributing planets in a tilted orbital scene',async()=>{
 const data=await read('apps/web/src/features/game/universe-data.ts');
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(data,/ORBIT_PHASES/);
 assert.match(data,/body\.id==='earth'\)\{body\.position=\[0,0,0\]/);
 assert.match(data,/satellite offsets follow their parent body/);
 assert.match(scene,/NebulaBackdrop/);
 assert.match(scene,/AdditiveBlending/);
});

test('game renders one selected PNG angel and keeps movement controls and separate vertical utility rail',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const css=await read('apps/web/src/app/universe-game.css');
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.doesNotMatch(game,/game-avatar-stage/);
 assert.doesNotMatch(css,/game-avatar-stage/);
 assert.match(scene,/\/the-universe\/avatars\/\$\{avatarId\}\.png/);
 assert.match(scene,/blending:NormalBlending/);
 assert.match(scene,/depthTest:true/);
 assert.doesNotMatch(scene,/celestial-avatars\.webp|celestial-six\.webp|AVATAR_CELLS/);
 for(const label of ['Hạ cánh','Ngồi','Đi bộ','Bay','Âm thanh','Góp ý']) assert.ok(game.includes(label),label);
 assert.match(css,/cosmic-action-dock\{right:.*display:flex;flex-direction:row/);
 assert.match(css,/cosmic-utility-rail\{position:absolute;z-index:7;right:.*display:flex;flex-direction:column/);
 assert.match(game,/cosmic-movement-rail/);
 assert.match(game,/role="group" aria-label="Điều khiển nhân vật"/);
 for(const label of ['Hạ cánh','Ngồi','Đi bộ','Bay']) assert.ok(game.slice(game.indexOf('cosmic-movement-rail'),game.indexOf('game-bottom-actions explorer-actions cosmic-action-dock')).includes(label),label);
 assert.ok(css.includes('.universe-explorer .cosmic-movement-rail{position:absolute;z-index:7;right:') && css.includes('left:auto;top:50%;transform:translateY(-50%);display:flex;flex-direction:column'));
 const artwork=await read('apps/web/src/components/celestial-avatar-artwork.tsx');
 assert.match(artwork,/AVATAR_FILES/);
 for(const id of ['solar','aurora','crystal','nebula','lunar','stardust'])assert.ok(artwork.includes(id+'.png'));
 assert.doesNotMatch(artwork,/SPRITE_URL|300%|200%/);
 assert.match(scene,/alphaTest:\.02/);
 assert.doesNotMatch(scene,/depthTest:false,alphaTest:\.008,blending:AdditiveBlending,toneMapped:false/);
 assert.doesNotMatch(scene,/bgDistance = distance/);
 assert.ok(game.includes('dpr={[1,1.5]} gl={{antialias:true'));
 assert.ok(game.includes('onClick={()=>setAudioEnabled(v=>!v)}'));
 assert.match(game,/Danh mục hành tinh và chòm sao/);
 assert.match(game,/TAP\/sync\?query=/);
 assert.doesNotMatch(game,/88 chòm sao được IAU công nhận|Thiên thể có dữ liệu|Hành tinh lùn|Tiểu hành tinh/);
 assert.match(game,/destinationBodies/);
 assert.match(game,/Bay tới đây/);
 assert.match(game,/cosmic-utility-rail/);
 assert.match(game,/activeExoplanetId/);
 assert.match(game,/destinationBodies/);
 assert.match(game,/sceneBodies/);
 assert.match(game,/Đăng nhập \/ khôi phục nickname/);
 assert.match(game,/Nickname và nhân vật tự lưu trên trình duyệt này/);
 assert.doesNotMatch(game,/cosmic-settings-panel|showSettings|setShowSettings/);
 assert.match(game,/exoplanetarchive\.ipac\.caltech\.edu/);
 assert.doesNotMatch(game,/CONSTELLATIONS|constellation-catalogue|88 chòm sao được IAU công nhận/);
 assert.match(scene,/s\.scale\.set\(\.76\*aspect,\.76,1\)/);
});
test('nebula uses smooth radial glow sprites instead of blocky square point particles',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/createRadialGradient/);
 assert.match(scene,/spriteMaterial map=\{glow\}/);
 assert.doesNotMatch(scene,/new Float32Array\(520\*3\)/);
});

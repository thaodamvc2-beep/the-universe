import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=resolve(import.meta.dirname,'..');
const read=(p)=>readFile(resolve(root,p),'utf8');

test('spaceflight supports six-axis movement, takeoff and landing',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 for(const key of ['forward','back','left','right','up','down'])assert.match(scene,new RegExp(key));
 assert.match(scene,/groundedId/);
 assert.match(scene,/i\.takeoff/);
 assert.match(scene,/i\.land/);
 assert.match(game,/Spacebar/);
 assert.match(game,/ArrowUp/);
 assert.match(game,/onPointerMove/);
});

test('real Solar System exploration catalog includes planets, dwarf planets and explored moons',async()=>{
 const data=await read('apps/web/src/features/game/universe-data.ts');
 for(const name of ['mercury','venus','earth','moon','mars','jupiter','saturn','uranus','neptune','pluto','ceres','europa','ganymede','titan','triton','bennu','ryugu','comet-67p'])assert.match(data,new RegExp(`id:'${name}'`));
 assert.match(data,/landable:true/);
 const catalogue=data.slice(data.indexOf('export const REAL_DESTINATIONS:Body[] = ['),data.indexOf('].map(body=>'));
 assert.equal((catalogue.match(/\{id:'/g)||[]).length,100,'the real Solar System destination catalogue must contain 100 objects');
 for(const id of ['haumea','makemake','eris','amalthea','janus','puck','neso','nix','hydra','pallas','hygiea','psyche','comet-wild-2'])assert.ok(catalogue.includes(`id:'${id}'`),id);
 assert.match(data,/sourceUrl/);
});

test('procedural worlds are explicitly separated from real astronomical destinations',async()=>{
 const data=await read('apps/web/src/features/game/universe-data.ts');
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 assert.match(data,/Thế giới hư cấu/);
 assert.match(data,/real:false/);
 assert.match(game,/makeProceduralRegion/);
 assert.doesNotMatch(game,/NEXT_PUBLIC_UNIVERSE_AI_ENDPOINT|requestAI|Sáng tạo bằng AI/);
});

test('ambient audio and optional realtime multiplayer adapters are not misrepresented as connected by default',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 assert.match(game,/new AudioContext/);
 assert.match(game,/NEXT_PUBLIC_UNIVERSE_REALTIME_URL/);
 assert.match(game,/Chưa kết nối máy chủ nhiều người chơi/);
 assert.doesNotMatch(game,/AI chưa kết nối|AI phía máy chủ/);
});


test('spaceflight now slows down, avoids planets and lands gently with visible world names',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/moveAvoidingBodies/);
 assert.ok(scene.includes("target.landable"));
 assert.match(scene,/PlanetLabel/);
 assert.ok(scene.includes("camera.lookAt"));
 assert.match(scene,/seated/);
 assert.match(scene,/surfaceHeading/);
 assert.match(scene,/nextNormal/);
 assert.ok(scene.includes("5.2:2.25"));
 assert.match(scene,/smoothedCameraUp/);
 assert.match(scene,/onLandRequest\(nearest\.body\.id\)/);
});

test('Sun and giant planets support the playful landing mechanic',async()=>{const data=await read('apps/web/src/features/game/universe-data.ts');for(const id of ['sun','jupiter','saturn','uranus','neptune']){const start=data.indexOf(`id:'${id}'`);const end=data.indexOf('},',start);assert.match(data.slice(start,end),/landable:true/)}});

test('long-distance destination travel accelerates while keeping a safe approach stop',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/maximumSpeed=Math\.min\(42,3\.4\+distance\*\.32\)/);
 assert.match(scene,/brakingSpeed=Math\.sqrt\(2\*9\*remaining\)/);
 assert.match(scene,/targetFlightSpeed\.current\+=/);
 assert.match(scene,/distance-stop/);
 assert.match(scene,/desiredYaw/);
});
test('far-world scene uses a floating origin so the angel and destinations remain visible',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/body\.position\[0\]-flightRef\.current\.position\.x/);
 assert.match(scene,/ref\.current\.position\.set\(0,0,0\)/);
 assert.match(scene,/player\.position\[0\]-flightRef\.current\.position\.x/);
 assert.match(scene,/camera\.lookAt\(look\)/);
});
test('distant worlds show a directional miniature of the Solar System and Earth',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/function HomeSystemBeacon/);
 assert.match(scene,/distance>75/);
 assert.match(scene,/function BeaconName/);
 for(const name of ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'])assert.ok(scene.includes(`name:'${name}'`));
 assert.match(scene,/cameraOffset/);
});
test('player character is rendered as a lightweight flying angel rather than a spacesuit',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/function Avatar/);
 assert.match(scene,/SpriteMaterial/);
 assert.match(scene,/\/the-universe\/avatars\/\$\{avatarId\}\.png/);
 assert.match(scene,/alphaTest:\.02/);assert.match(scene,/blending:NormalBlending/);
 assert.match(scene,/new Sprite/);
 assert.doesNotMatch(scene,/thruster/);
});

test('keyboard camera look controls rotate the view independently of flight movement',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 assert.match(game,/lookKey==='j'/);
 assert.match(game,/lookKey==='l'/);
 assert.match(game,/lookKey==='i'/);
 assert.match(game,/lookKey==='k'/);
});

test('in-game angel follows all six identities using their individual transparent PNG files',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/player\.avatarId/);assert.match(scene,/\/the-universe\/avatars\/\$\{player\.avatarId\}\.png/);
 assert.match(scene,/new Sprite/);
 assert.match(scene,/SpriteMaterial/);
 assert.match(scene,/\/the-universe\/avatars\/\$\{avatarId\}\.png/);
 assert.match(scene,/sprite\.position\.y/);
 assert.doesNotMatch(scene,/Tóc dài búi trâm cổ phong|Cổ phục tiên gia|feather\(/);
});
test('home-system direction marker uses the real Sun position and camera-space direction at the screen edge',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/new Vector3\(-15\.6-p\.x,-p\.y,-p\.z\)/);
 assert.match(scene,/camera\.quaternion\.clone\(\)\.invert\(\)/);
 assert.match(scene,/camera\.position\)\.add\(cameraOffset\)/);
 assert.match(scene,/camera\.quaternion\)/);
 assert.match(scene,/distance>75/);
});

test('angel remains at the floating origin and scales to the destination surface',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/ref\.current\.position\.set\(0,0,0\)/);
 assert.match(scene,/ref\.current\.scale\.setScalar\(size\)/);
 assert.match(scene,/ref\.current\.visible=true/);
 assert.match(scene,/sprite\.position\.y/);
 assert.match(scene,/SpriteMaterial/);
 assert.doesNotMatch(scene,/Tóc dài búi trâm cổ phong|Cổ phục tiên gia/);
});
test('manual landing enters a short controlled approach instead of snapping from far away',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/nearest\.d<=nearest\.body\.radius\+\.55/);
 assert.match(scene,/brakingSpeed=Math\.sqrt\(2\*9\*remaining\)/);
});

test('newly landed camera looks along a stable surface tangent, not into the planet',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/surfaceBodyId\.current!==body\.id/);
 assert.match(scene,/surfaceHeading\.current\.set\(0,0,-1\)\.projectOnPlane\(normal\)/);
 assert.match(scene,/right\.crossVectors\(forward,normal\)/);
 assert.match(scene,/look\.copy\(forward\)\.multiplyScalar\(landedBody\?2\.6:2\.6\)/);
});
test('surface movement uses a stable angular step independent of tiny planet radius',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/i\.boost\?\.62:\.36/);
 assert.match(scene,/addScaledVector\(tangent,/);
 assert.match(scene,/surfaceHeading\.current\.copy\(forward\)\.projectOnPlane\(nextNormal\)/);
});
test('solar system direction marker is slightly larger and labels remain legible',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/ref\.current\.scale\.setScalar\(\.8\)/);
 assert.match(scene,/scale=\{\[\.58,\.145,1\]\}/);
});

test('avatar chooser no longer blocks the live universe on initial entry and the fake top-right orbit map is removed',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 assert.match(game,/showAvatarChooser,setShowAvatarChooser\]=useState\(false\)/);
 assert.doesNotMatch(game,/cosmic-solar-widget/);
 assert.doesNotMatch(game,/game-avatar-stage/);
});

test('reference HUD removes player counts and obstructive panels while keeping navigation accessible',async()=>{const game=await read('apps/web/src/features/game/universe-game.tsx');const css=await read('apps/web/src/app/globals.css');assert.match(game,/cosmic-location-pill/);assert.match(game,/cosmic-compass/);assert.match(game,/cosmic-action-dock/);assert.match(game,/cosmic-joystick/);assert.match(game,/cosmic-menu-panel/);assert.doesNotMatch(game,/cosmic-settings-panel|Cài đặt/);assert.doesNotMatch(game,/Online:\s*\$\{|<div className="game-live-status"/);assert.doesNotMatch(game,/cosmic-level-card|multiplayer-indicator/);assert.match(css,/\.game-live-status\{display:none!important\}/);});
test('in-world angel PNG preserves its natural image aspect ratio, normal blending and sit state',async()=>{const scene=await read('apps/web/src/features/game/flight-scene.tsx');assert.match(scene,/\/the-universe\/avatars\/\$\{avatarId\}\.png/);assert.match(scene,/s\.scale\.set\(\.76\*aspect,\.76,1\)/);assert.match(scene,/s\.scale\.set\(\.55\*aspect,\.55,1\)/);assert.match(scene,/s\.scale\.set\(\.55\*aspect,\.55,1\)/);assert.match(scene,/multiplyScalar\(landedBody\?-5\.35:-5\.55\)/);assert.match(scene,/i\.resting/);});

test('touch altitude controls remain available in the compact reference HUD',async()=>{const css=await read('apps/web/src/app/globals.css');assert.match(css,/flight-vertical\{display:flex/);assert.match(css,/cosmic-action-dock button\{width:40px;height:40px\}/)});

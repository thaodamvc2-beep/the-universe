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
 assert.ok(scene.includes("5.2:2.25"));
 assert.match(scene,/smoothedCameraUp/);
 assert.match(scene,/onLandRequest\(nearest\.body\.id\)/);
});

test('Sun and giant planets support the playful landing mechanic',async()=>{const data=await read('apps/web/src/features/game/universe-data.ts');for(const id of ['sun','jupiter','saturn','uranus','neptune']){const start=data.indexOf(`id:'${id}'`);const end=data.indexOf('},',start);assert.match(data.slice(start,end),/landable:true/)}});

test('long-distance destination travel accelerates while keeping a safe approach stop',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/distanceSpeed=Math\.min\(34,2\.8\+distance\*\.24\)/);
 assert.match(scene,/distanceSpeed\*\(i\.boost\?1\.35:1\)/);
 assert.match(scene,/distance-stop/);
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
 assert.match(scene,/<torusGeometry args=\{\[\.82/);
 assert.match(scene,/color="#3e9fe0"/);
});
test('player character is rendered as a lightweight flying angel rather than a spacesuit',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/function Avatar/);
 assert.match(scene,/leftWing/);
 assert.match(scene,/rightWing/);
 assert.match(scene,/torusGeometry args=\{\[\.145/);
 assert.doesNotMatch(scene,/thruster|capsuleGeometry args=\{\[\.105/);
});

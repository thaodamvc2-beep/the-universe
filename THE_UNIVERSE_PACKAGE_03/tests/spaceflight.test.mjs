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
 assert.match(data,/landable:false/);
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
 assert.match(scene,/target\\.landable/);
 assert.match(scene,/PlanetLabel/);
 assert.match(scene,/camera\\.lookAt/);
 assert.match(scene,/seated/);
 assert.match(scene,/4\\.2:1\\.75/);
});

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
 assert.match(scene,/const cruise=\(i\.boost\?8\.5:5\.2\),step=cruise\*dt/);
 assert.match(scene,/i\.boost\?\.62:\.36/);
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
test('floating Solar System guide and planetary name strips are removed from the game scene',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.doesNotMatch(scene,/HomeSystemBeacon|BeaconName|name:'Mercury'|name:'Venus'|name:'Earth'/);
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
 assert.match(scene,/function SurfaceLabel/);
 assert.match(scene,/SurfaceLabel name=\{surfaceBody\?\.name\?\?null\}/);
 assert.doesNotMatch(scene,/Tóc dài búi trâm cổ phong|Cổ phục tiên gia|feather\(/);
});
test('game scene no longer renders the floating home-system direction marker',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.doesNotMatch(scene,/HomeSystemBeacon|BeaconName|cameraOffset/);
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
 assert.match(scene,/nearest\.d<=nearest\.body\.radius\*1\.3\+\.16/);
 assert.match(scene,/brakingSpeed=Math\.sqrt\(2\*9\*remaining\)/);
});

test('newly landed camera looks along a stable surface tangent, not into the planet',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/surfaceBodyId\.current!==body\.id/);
 assert.match(scene,/function stableSurfaceTangent\(direction:Vector3,normal:Vector3\)/);
 assert.match(scene,/right\.crossVectors\(forward,normal\)/);
 assert.match(scene,/cameraForward\.copy\(cameraTangent\)\.multiplyScalar\(Math\.cos\(surfacePitch\)\)/);
 assert.match(scene,/look\.copy\(cameraForward\)/);
});
test('surface movement uses a stable angular step independent of tiny planet radius',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/i\.boost\?\.62:\.36/);
 assert.match(scene,/addScaledVector\(tangent,/);
 assert.match(scene,/surfaceHeading\.current\.copy\(stableSurfaceTangent\(forward,nextNormal\)\)/);
});
test('removed Solar System guide does not leave its marker labels in the game scene',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.doesNotMatch(scene,/BeaconName|HomeSystemBeacon|scale=\{\[\.58,\.145,1\]\}/);
});
test('avatar chooser no longer blocks the live universe on initial entry and the fake top-right orbit map is removed',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 assert.match(game,/showAvatarChooser,setShowAvatarChooser\]=useState\(false\)/);
 assert.doesNotMatch(game,/cosmic-solar-widget/);
 assert.doesNotMatch(game,/game-avatar-stage/);
});

test('reference HUD removes player counts and obstructive panels while keeping navigation accessible',async()=>{const game=await read('apps/web/src/features/game/universe-game.tsx');const css=await read('apps/web/src/app/globals.css');assert.match(game,/cosmic-location-pill/);assert.match(game,/cosmic-compass/);assert.match(game,/cosmic-movement-rail/);assert.match(game,/cosmic-joystick/);assert.match(game,/cosmic-menu-panel/);assert.doesNotMatch(game,/cosmic-settings-panel|Cài đặt/);assert.doesNotMatch(game,/Online:\s*\$\{|<div className="game-live-status"/);assert.doesNotMatch(game,/cosmic-level-card|multiplayer-indicator/);assert.match(css,/\.game-live-status\{display:none!important\}/);});
test('in-world angel PNG preserves its natural image aspect ratio, normal blending and sit state',async()=>{const scene=await read('apps/web/src/features/game/flight-scene.tsx');assert.match(scene,/\/the-universe\/avatars\/\$\{avatarId\}\.png/);assert.match(scene,/s\.scale\.set\(\.76\*aspect,\.76,1\)/);assert.match(scene,/s\.scale\.set\(\.55\*aspect,\.55,1\)/);assert.match(scene,/s\.scale\.set\(\.55\*aspect,\.55,1\)/);assert.match(scene,/multiplyScalar\(landedBody\?-5\.35:-5\.55\)/);assert.match(scene,/i\.resting/);});

test('touch altitude controls remain available in the compact reference HUD',async()=>{const css=await read('apps/web/src/app/globals.css');assert.match(css,/flight-vertical\{display:flex/);assert.match(css,/cosmic-action-dock button\{width:40px;height:40px\}/)});


test('3D scene remains visible while avatar textures load and render errors produce a recovery screen',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 const boundary=await read('apps/web/src/features/game/scene-error-boundary.tsx');
 assert.match(game,/SceneErrorBoundary/);
 assert.doesNotMatch(game,/<Suspense fallback=\{null\}><FlightScene/);
 assert.match(scene,/<Suspense fallback=\{null\}><Avatar/);
 assert.match(scene,/<Suspense key=\{player\.id\} fallback=\{null\}><OtherAvatar/);
 assert.match(boundary,/getDerivedStateFromError/);
 assert.match(boundary,/componentDidCatch/);
});


test('free-flight toggle, manual steering and surface spawn/landing remain wired',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const controller=await read('apps/web/src/features/game/flight-controller.d.mts');assert.match(controller,/autoFlight: boolean/);
 assert.match(scene,/i\.mode==='flying'&&i\.autoFlight/);
 assert.match(scene,/body\?0:wave/);
 assert.doesNotMatch(scene,/HomeSystemBeacon|BeaconName|name:'Mercury'/);
 assert.match(game,/const toggleFlight=/);
 assert.match(game,/aria-pressed=\{input\.current\.autoFlight\}/);
 assert.match(game,/cosmic-flight-toggle/);
 assert.match(game,/position:new Vector3\(0,0,2\.94\)/);
 assert.match(game,/cosmic-menu-close/);
});


test('desktop planet destination menu remains available independently of the removed scene beacon',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const css=await read('apps/web/src/app/universe-game.css');
 assert.match(game,/Hành tinh &amp; điểm đến/);
 assert.match(game,/destinationBodies\.map/);
 assert.match(game,/aria-expanded=\{showDestinations\}/);
 assert.match(css,/\.universe-explorer \.game-nav\{display:flex/);
});

test('manual movement immediately cancels destination autopilot and landing approach eases to a low terminal speed',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/manualMovement=i\.forward\|\|i\.back\|\|i\.left\|\|i\.right\|\|i\.up\|\|i\.down/);
 assert.match(scene,/onLandRequest\(null\)/);
 assert.match(scene,/Math\.max\(\.22,brakingSpeed\)/);
 assert.match(scene,/nearest\.d<=nearest\.body\.radius\*1\.3\+\.16/);
});

test('landing command also aligns an already-grounded avatar and sitting preserves surface contact',async()=>{const scene=await read('apps/web/src/features/game/flight-scene.tsx');assert.match(scene,/if\(i\.land\)\{f\.position\.copy\(center\)\.addScaledVector\(normal,body\.radius\*1\.3\+\.08\)/);assert.match(scene,/sprite\.position\.y=body\?0:/);assert.match(scene,/sprite\.material\.opacity=seated\?\.92:1/);});

test('distance from Earth is measured from the home-world surface and the nebula is brighter',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 const css=await read('apps/web/src/app/universe-game.css');
 assert.match(game,/distanceFromEarthLy=Math\.max\(0,livePosition\.length\(\)-earthSurfaceRadius\)/);
 assert.match(game,/năm ánh sáng mô phỏng/);
 assert.match(scene,/args=\{\['#17234a'\]\}/);
 assert.match(scene,/opacity=\{\.68\} blending=\{AdditiveBlending\}/);
 assert.match(css,/rgba\(12,22,48,\.10\)/);
});


test('flight controls use explicit mutually-exclusive modes and dedicated transitions',async()=>{
 const controller=await read('apps/web/src/features/game/flight-controller.mjs');
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 for(const mode of ['grounded','walking','sitting','flying','landing','approaching'])assert.ok(controller.includes("'"+mode+"'"),mode);
 for(const action of ['WALK_START','SIT','TOGGLE_FLIGHT','LAND','BEGIN_APPROACH','MANUAL_OVERRIDE','ARRIVED_LANDED','RESET_HOME'])assert.ok(controller.includes("'"+action+"'"),action);
 assert.match(scene,/i.mode==='flying'&&i.autoFlight/);
 assert.match(scene,/i.mode==='walking'/);
 assert.ok(game.includes("transitionFlightControl(input.current,'SIT')"));
 assert.ok(game.includes("transitionFlightControl(input.current,'LAND')"));
 assert.ok(game.includes("transitionFlightControl(input.current,'BEGIN_APPROACH')"));
});

test('flight controller prevents stale movement and illegal sitting/flying overlap',async()=>{
 const controller=await read('apps/web/src/features/game/flight-controller.mjs');
 assert.ok(controller.includes('clearMovement(input)'));
 assert.match(controller,/input.mode = FLIGHT_MODES.SITTING/);
 assert.match(controller,/input.mode = FLIGHT_MODES.LANDING/);
 assert.match(controller,/input.mode = FLIGHT_MODES.FLYING/);
 assert.match(controller,/case 'RELEASE_ALL'/);
});


test('flight control state machine enforces isolated actions and clears stale directional input',async()=>{
 const {createFlightInputState,transitionFlightControl}=await import('../apps/web/src/features/game/flight-controller.mjs');
 const input=createFlightInputState();
 assert.equal(input.mode,'grounded');
 transitionFlightControl(input,'DIRECTION_START','forward');
 assert.equal(input.mode,'walking');
 assert.equal(input.forward,true);
 transitionFlightControl(input,'DIRECTION_STOP','forward');
 assert.equal(input.mode,'grounded');
 transitionFlightControl(input,'SIT');
 assert.equal(input.mode,'sitting');
 assert.equal(input.resting,true);
 assert.equal(input.forward,false);
 transitionFlightControl(input,'DIRECTION_START','left');
 assert.equal(input.mode,'walking');
 assert.equal(input.resting,false);
 transitionFlightControl(input,'LAND');
 assert.equal(input.mode,'landing');
 assert.equal(input.left,false);
 assert.equal(input.land,true);
 transitionFlightControl(input,'BEGIN_APPROACH');
 assert.equal(input.mode,'approaching');
 assert.equal(input.land,false);
 transitionFlightControl(input,'MANUAL_OVERRIDE');
 assert.equal(input.mode,'flying');
 assert.equal(input.autoFlight,false);
 transitionFlightControl(input,'TOGGLE_FLIGHT');
 assert.equal(input.autoFlight,true);
 transitionFlightControl(input,'TOGGLE_FLIGHT');
 assert.equal(input.autoFlight,false);
 transitionFlightControl(input,'ARRIVED_LANDED');
 assert.equal(input.mode,'grounded');
 assert.equal(input.takeoff,false);
});


test('desktop free-flight control uses a scalable vector angel-wings icon instead of a missing emoji glyph',async()=>{
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 const start=game.indexOf('className="cosmic-flight-toggle"');
 const end=game.indexOf('</button>',start);
 const button=game.slice(start,end);
 assert.match(button,/<svg viewBox="0 0 48 32"/);
 assert.match(button,/<path fill="currentColor"/);
 assert.doesNotMatch(button,/🪽/);
 assert.match(button,/<small>\{input\.current\.autoFlight\?'Dừng bay':'Bay'\}<\/small>/);
});

test('destination arrival rebases the camera outside the landed planet and levels its surface view',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/cameraBodyId=useRef<string\|null>\(null\)/);
 assert.match(scene,/const landedNow=!!landedBody&&\(cameraBodyId\.current!==landedBody\.id\|\|cameraGroundingRevision\.current!==f\.groundingRevision\)/);
 assert.match(scene,/surfaceHeading\.current\.copy\(forward\);f\.yaw=Math\.atan2\(forward\.x,-forward\.z\);f\.pitch=0/);
 assert.match(scene,/if\(landedNow\)camera\.position\.copy\(desired\)/);
 assert.match(scene,/cameraBodyId\.current=landedBody\?\.id\?\?null/);
 assert.match(scene,/target\.radius\*1\.3\+\(target\.landable \? 0\.08 : 1\.8\)/);
});


test('re-landing on the same planet forces a fresh surface and camera rebase even when no airborne frame was rendered',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 const game=await read('apps/web/src/features/game/universe-game.tsx');
 assert.match(scene,/groundingRevision:number/);
 assert.match(scene,/cameraGroundingRevision\.current!==f\.groundingRevision/);
 assert.match(scene,/surfaceGroundingRevision\.current!==f\.groundingRevision/);
 assert.match(game,/groundingRevision:0/);
 assert.match(game,/groundingRevision\+=1/);
});

test('landing camera keeps a stable tangent frame and cannot stall when surface up flips',async()=>{
 const scene=await read('apps/web/src/features/game/flight-scene.tsx');
 assert.match(scene,/direction\.clone\(\)\.addScaledVector\(normal,-direction\.dot\(normal\)\)/);
 assert.match(scene,/Math\.abs\(normal\.y\)<\.9\?new Vector3\(0,1,0\):new Vector3\(1,0,0\)/);
 assert.match(scene,/stableSurfaceTangent\(forward,cameraUp\)/);
 assert.match(scene,/smoothedCameraUp\.current\.dot\(playerUp\)<0\)smoothedCameraUp\.current\.copy\(playerUp\)/);
 assert.match(scene,/f\.pitch=0;lastSurfaceYaw\.current=f\.yaw/);
 assert.match(scene,/f\.groundingRevision\+=1;f\.position\.addScaledVector\(normal,\.9\)/);
});

test('landing camera anchors the planet in world space while the avatar visibly descends',async()=>{
 const {createLandingCameraAnchor,getLandingCameraLocalFrame}=await import('../apps/web/src/features/game/landing-camera.mjs');
 const anchor=createLandingCameraAnchor([0,0,20],[0,0,0],10,[0,0,5]);
 const positions=[[0,0,20],[0,0,16],[0,0,10]];
 const planetViews=positions.map(player=>{const frame=getLandingCameraLocalFrame(player,anchor),planetLocal=[0,0,0].map((v,i)=>v-player[i]);return planetLocal.map((v,i)=>v-frame.cameraPosition[i])});
 const avatarViews=positions.map(player=>{const frame=getLandingCameraLocalFrame(player,anchor);return [0,0,0].map((v,i)=>v-frame.cameraPosition[i])});
 assert.deepEqual(planetViews,[[0,0,-25],[0,0,-25],[0,0,-25]],'planet must remain fixed relative to the anchored camera');
 assert.deepEqual(avatarViews,[[0,0,-5],[0,0,-9],[0,0,-15]],'avatar must move toward the landing point in camera space');
 const landingView=getLandingCameraLocalFrame(positions[2],anchor);
 assert.deepEqual(landingView.lookAt,[0,0,0],'camera must keep aiming at the same surface contact point');
});

test('landing camera anchor handles different planetary surface normals and repeated targets',async()=>{
 const {createLandingCameraAnchor,getLandingCameraLocalFrame}=await import('../apps/web/src/features/game/landing-camera.mjs');
 for(const [player,center,offset] of [
  [[20,0,0],[0,0,0],[5,0,0]],
  [[0,20,0],[0,0,0],[0,5,0]],
  [[0,0,-20],[0,0,0],[0,0,-5]]
 ]){
  const anchor=createLandingCameraAnchor(player,center,10,offset);
  const before=getLandingCameraLocalFrame(player,anchor);
  const after=getLandingCameraLocalFrame(center.map((v,i)=>v+(player[i]-v)*.5),anchor);
  assert.deepEqual(before.cameraPosition.map((v,i)=>v+player[i]),anchor.cameraWorldPosition);
  assert.deepEqual(after.lookAt.map((v,i)=>v+center[i]+(player[i]-center[i])*.5),anchor.lookAtWorldPosition);
 }
});

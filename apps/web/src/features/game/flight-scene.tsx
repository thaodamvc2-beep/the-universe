'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { BackSide, Camera, CanvasTexture, Group, Sprite, SpriteMaterial, SRGBColorSpace, TextureLoader, Vector3 } from 'three';
import { AVATAR_PALETTE, type AvatarId, type Body } from './universe-data';

export type FlightState={position:Vector3;yaw:number;pitch:number;groundedId:string|null};
export type InputState=Record<'forward'|'back'|'left'|'right'|'up'|'down',boolean>&{land:boolean;takeoff:boolean;boost:boolean;resting:boolean};
export type RemotePlayer={id:string;nickname:string;avatarId:AvatarId;position:[number,number,number]};

function Stars(){
 const ref=useRef<Group>(null);
 useFrame((_s,d)=>{if(ref.current)ref.current.rotation.y+=d*.00035});
 const positions=useRef<Float32Array|null>(null);
 if(!positions.current){const a=new Float32Array(2600*3);let seed=197903;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};for(let i=0;i<2600;i++){const r=28+rand()*300,t=rand()*Math.PI*2,p=Math.acos(2*rand()-1);a[i*3]=r*Math.sin(p)*Math.cos(t);a[i*3+1]=r*Math.cos(p);a[i*3+2]=r*Math.sin(p)*Math.sin(t)}positions.current=a}
 return <group ref={ref}><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions.current,3]}/></bufferGeometry><pointsMaterial color="#f1f5ff" size={.13} sizeAttenuation transparent opacity={.94}/></points></group>;
}
function PlanetLabel({body}:{body:Body}){
 const [texture,setTexture]=useState<CanvasTexture|null>(null);
 useEffect(()=>{const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='rgba(4,10,24,.76)';ctx.beginPath();ctx.roundRect(6,10,244,44,11);ctx.fill();ctx.strokeStyle=body.real?'rgba(158,218,245,.8)':'rgba(205,177,255,.8)';ctx.lineWidth=2;ctx.stroke();ctx.font='600 24px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f4f5ff';ctx.fillText(body.name,128,33,228);const map=new CanvasTexture(canvas);map.needsUpdate=true;setTexture(map);return()=>map.dispose()},[body.name,body.real]);
 if(!texture)return null;
 return <sprite position={[0,body.radius+.48,0]} scale={[Math.max(1.45,Math.min(4.8,body.name.length*.19)),.48,1]}><spriteMaterial map={texture} transparent depthWrite={false} /></sprite>;
}
function Planet({body,flightRef}:{body:Body;flightRef:MutableRefObject<FlightState>}){
 const ref=useRef<Group>(null);
 useFrame((_state,d)=>{if(ref.current){ref.current.position.set(body.position[0]-flightRef.current.position.x,body.position[1]-flightRef.current.position.y,body.position[2]-flightRef.current.position.z);ref.current.rotation.y+=d*(body.id === 'earth' ? 0.012 : 0.004)}});
 return <group ref={ref}>
  <mesh><sphereGeometry args={[body.radius,body.real?28:20,body.real?22:16]}/><meshStandardMaterial color={body.color} roughness={.92} emissive={body.id==='sun'?'#ffb34f':'#000000'} emissiveIntensity={body.id==='sun'?2.1:0}/></mesh>{body.id==='sun'&&<pointLight intensity={470} distance={260} decay={2} color="#fff1d2"/>}
  {body.id==='earth'&&<mesh scale={1.035}><sphereGeometry args={[body.radius,28,20]}/><meshBasicMaterial color="#73c8ff" transparent opacity={.12} side={BackSide}/></mesh>}
  {body.id==='saturn'&&<mesh rotation={[Math.PI/2.25,0,0]}><torusGeometry args={[body.radius*1.55,body.radius*.22,5,64]}/><meshStandardMaterial color="#cdbb9c" transparent opacity={.78}/></mesh>}
  {!body.real&&<><mesh scale={1.1}><sphereGeometry args={[body.radius,16,12]}/><meshBasicMaterial color="#d6c6ff" wireframe transparent opacity={.12}/></mesh><mesh rotation={[Math.PI/2.2,0,0]}><torusGeometry args={[body.radius*1.38,.035,4,36]}/><meshBasicMaterial color="#c3a7ff" transparent opacity={.55}/></mesh></>}
  <PlanetLabel body={body}/>
 </group>;
}
function Avatar({avatarId,flightRef,inputRef,bodies}:{avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;bodies:Body[]}){
 const ref=useRef<Group>(null);
 const atlas=useLoader(TextureLoader,'/the-universe/avatars/celestial-six.webp');
 const cell:Record<AvatarId,{x:number;y:number}>={stardust:{x:0,y:0},lunar:{x:1,y:0},nebula:{x:2,y:0},crystal:{x:0,y:1},aurora:{x:1,y:1},solar:{x:2,y:1}};
 const texture=useMemo(()=>{const t=atlas.clone();const c=cell[avatarId]??cell.stardust;t.repeat.set(1/3,.42);t.offset.set(c.x/3,c.y===0?.58:.08);t.colorSpace=SRGBColorSpace;t.needsUpdate=true;return t},[atlas,avatarId]);
 const sprite=useMemo(()=>{const material=new SpriteMaterial({map:texture,transparent:true,depthWrite:false,alphaTest:.015});material.onBeforeCompile=(shader)=>{shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
 float bgDistance = distance(diffuseColor.rgb, vec3(0.047, 0.078, 0.157));
 diffuseColor.a *= smoothstep(0.018, 0.075, bgDistance);`)};material.needsUpdate=true;const s=new Sprite(material);s.center.set(.5,.025);s.scale.set(1.95,2.9,1);return s},[texture]);
 useEffect(()=>()=>{sprite.material.dispose();texture.dispose()},[sprite,texture]);
 useFrame((state)=>{if(!ref.current)return;const f=flightRef.current,i=inputRef.current,body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;const wave=Math.sin(state.clock.elapsedTime*1.05);ref.current.visible=true;ref.current.position.set(0,0,0);if(body)ref.current.position.y=.02;const seated=!!body&&i.resting;const size=body?Math.max(.92,Math.min(1.2,body.radius*.66)):1.08;ref.current.scale.setScalar(size);ref.current.rotation.set(0,0,Math.sin(state.clock.elapsedTime*.55)*.012);sprite.position.y=.025+wave*.018+(seated?-.085:((i.forward || i.back) ? .025 : 0))});
 return <group ref={ref}><primitive object={sprite}/><pointLight position={[0,.3,.18]} color="#b9d8ff" intensity={.22} distance={2.8}/></group>;
}
function OtherAvatar({player,flightRef}:{player:RemotePlayer;flightRef:MutableRefObject<FlightState>}){
 const ref=useRef<Group>(null);const c=AVATAR_PALETTE[player.avatarId]??AVATAR_PALETTE.stardust;
 useFrame(()=>{if(ref.current)ref.current.position.set(player.position[0]-flightRef.current.position.x,player.position[1]-flightRef.current.position.y,player.position[2]-flightRef.current.position.z)});
 return <group ref={ref}><mesh position={[0,.2,0]}><capsuleGeometry args={[.11,.2,4,8]}/><meshStandardMaterial color={c.suit}/></mesh><mesh position={[0,.4,0]}><sphereGeometry args={[.11,14,12]}/><meshStandardMaterial color="#efd8c9"/></mesh><pointLight color={c.glow} intensity={.2} distance={1}/></group>;
}
function BeaconName({name,position}:{name:string;position:[number,number,number]}) {
 const [texture,setTexture]=useState<CanvasTexture|null>(null);
 useEffect(()=>{const canvas=document.createElement('canvas');canvas.width=180;canvas.height=42;const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='rgba(7,15,31,.84)';ctx.beginPath();ctx.roundRect(4,4,172,34,9);ctx.fill();ctx.font='600 18px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f4f5ff';ctx.fillText(name,90,21,164);const map=new CanvasTexture(canvas);map.needsUpdate=true;setTexture(map);return()=>map.dispose()},[name]);
 if(!texture)return null;
 return <sprite position={position} scale={[.58,.145,1]}><spriteMaterial map={texture} transparent depthWrite={false}/></sprite>;
}
function HomeSystemBeacon({flightRef,camera}:{flightRef:MutableRefObject<FlightState>;camera:Camera}){
 const ref=useRef<Group>(null);
 useFrame(()=>{
  if(!ref.current)return;
  const p=flightRef.current.position;
  const toHome=new Vector3(-15.6-p.x,-p.y,-p.z);
  const distance=toHome.length();
  ref.current.visible=distance>75;
  if(distance<=75)return;
  const local=toHome.normalize().applyQuaternion(camera.quaternion.clone().invert());
  let sx=local.x,sy=local.y;const planar=Math.hypot(sx,sy);
  if(planar<.06){sx=0;sy=local.z>0?1:-1}else{sx/=planar;sy/=planar}
  const edge=Math.max(Math.abs(sx)/.68,Math.abs(sy)/.62,1);
  const cameraOffset=new Vector3(sx/edge*2.7,sy/edge*1.58,-8.2).applyQuaternion(camera.quaternion);
  ref.current.position.copy(camera.position).add(cameraOffset);
  ref.current.quaternion.copy(camera.quaternion);
  ref.current.scale.setScalar(.8);
 });
 const planets=[
  {name:'Mercury',x:-1.05,color:'#a9a19b',r:.035,labelY:.25},
  {name:'Venus',x:-.76,color:'#d8b27e',r:.045,labelY:-.25},
  {name:'Earth',x:-.47,color:'#4da9df',r:.055,labelY:.25},
  {name:'Mars',x:-.18,color:'#c87861',r:.043,labelY:-.25},
  {name:'Jupiter',x:.2,color:'#d4b08e',r:.085,labelY:.25},
  {name:'Saturn',x:.57,color:'#d8c39f',r:.073,labelY:-.25},
  {name:'Uranus',x:.94,color:'#91d3d5',r:.06,labelY:.25},
  {name:'Neptune',x:1.28,color:'#6689df',r:.06,labelY:-.25}
 ];
 return <group ref={ref} visible={false}>
  <group position={[0,.08,0]}>
   <mesh position={[-1.36,0,0]}><sphereGeometry args={[.14,16,12]}/><meshBasicMaterial color="#ffd477"/></mesh>
   <mesh position={[-1.36,0,0]}><sphereGeometry args={[.2,12,8]}/><meshBasicMaterial color="#ffd477" transparent opacity={.12}/></mesh>
   <mesh position={[-.02,0,0]} scale={[1.42,.012,.012]}><sphereGeometry args={[1,20,12]}/><meshBasicMaterial color="#9bb8e9" transparent opacity={.6}/></mesh>
   {planets.map((planet)=><group key={planet.name}>
    <mesh position={[planet.x,0,0]}><sphereGeometry args={[planet.r,12,10]}/><meshBasicMaterial color={planet.color}/></mesh>
    {planet.name==='Saturn'&&<mesh position={[planet.x,0,0]} rotation={[0,0,.15]}><torusGeometry args={[.12,.012,4,24]}/><meshBasicMaterial color="#d8c39f" transparent opacity={.85}/></mesh>}
    {planet.name==='Earth'&&<mesh position={[planet.x,0,.01]}><sphereGeometry args={[planet.r*1.04,10,8]}/><meshBasicMaterial color="#75c99a" wireframe transparent opacity={.7}/></mesh>}
    <BeaconName name={planet.name} position={[planet.x,planet.labelY,0]}/>
   </group>)}
   <mesh position={[0,-.38,0]} rotation={[0,0,Math.PI]}><coneGeometry args={[.09,.2,8]}/><meshBasicMaterial color="#fff0bd"/></mesh>
  </group>
 </group>;
}
function moveAvoidingBodies(start:Vector3,displacement:Vector3,bodies:Body[],ignoreId:string|null){
 const length=displacement.length();if(length<1e-8)return start.clone();
 const direction=displacement.clone().normalize();const adjusted=displacement.clone();
 for(const body of bodies){if(body.id===ignoreId)continue;const center=new Vector3(...body.position);const fromCenter=start.clone().sub(center);const startDistance=fromCenter.length();const projection=Math.max(0,Math.min(length,center.clone().sub(start).dot(direction)));const closest=start.clone().addScaledVector(direction,projection);const clearance=body.radius+.72;const gap=closest.distanceTo(center);if(gap<clearance&&!(startDistance<clearance&&start.clone().add(displacement).distanceTo(center)>startDistance)){const normal=closest.sub(center).normalize();if(normal.lengthSq()<.001)normal.copy(fromCenter).normalize();const tangent=direction.clone().projectOnPlane(normal);if(tangent.lengthSq()<.001)tangent.crossVectors(normal,new Vector3(0,1,0));if(tangent.lengthSq()<.001)tangent.crossVectors(normal,new Vector3(1,0,0));adjusted.copy(tangent.normalize().multiplyScalar(length));break}}
 const candidate=start.clone().add(adjusted);
 for(const body of bodies){if(body.id===ignoreId)continue;const center=new Vector3(...body.position);const minimum=body.radius+.72;const distance=candidate.distanceTo(center);const startDistance=start.distanceTo(center);if(distance<minimum&&!(startDistance<minimum&&distance>startDistance)){const normal=candidate.clone().sub(center);if(normal.lengthSq()<.001)normal.copy(start).sub(center);if(normal.lengthSq()<.001)normal.set(0,1,0);candidate.copy(center).addScaledVector(normal.normalize(),minimum)}}
 return candidate;
}
export function FlightScene({bodies,avatarId,flightRef,inputRef,targetId,onArrive,onLandRequest,remotePlayers}:{bodies:Body[];avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;targetId:string|null;onArrive:(id:string)=>void;onLandRequest:(id:string)=>void;remotePlayers:RemotePlayer[]}){
 const {camera}=useThree();const forward=new Vector3();const right=new Vector3();const desired=new Vector3();const look=new Vector3();const playerUp=new Vector3(0,1,0);const smoothedCameraUp=useRef(new Vector3(0,1,0));const previousTarget=useRef<string|null>(null);const targetFlightSpeed=useRef(2.25);const surfaceHeading=useRef(new Vector3(0,0,-1));const surfaceBodyId=useRef<string|null>(null);const lastSurfaceYaw=useRef(0);
 useFrame((_s,delta)=>{
  const dt=Math.min(delta,.04),f=flightRef.current,i=inputRef.current,body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;
  const cruise=(i.boost?5.2:2.25),step=cruise*dt;
  if(!targetId){previousTarget.current=null;targetFlightSpeed.current=2.25;if(!f.groundedId)surfaceBodyId.current=null;}
  if(targetId){const target=bodies.find(b=>b.id===targetId);if(target){const center=new Vector3(...target.position),dir=center.clone().sub(f.position),distance=dir.length(),stop=target.radius+(target.landable ? 0.24 : 1.8);if(distance>stop){const remaining=distance-stop;dir.normalize();const maximumSpeed=Math.min(42,3.4+distance*.32)*(i.boost?1.25:1);const brakingSpeed=Math.sqrt(2*9*remaining);const desiredSpeed=Math.min(maximumSpeed,Math.max(.9,brakingSpeed));targetFlightSpeed.current+=(desiredSpeed-targetFlightSpeed.current)*(1-Math.exp(-2.6*dt));const amount=Math.min(targetFlightSpeed.current*dt,remaining);f.position.copy(moveAvoidingBodies(f.position,dir.clone().multiplyScalar(amount),bodies,target.id));const desiredYaw=Math.atan2(dir.x,-dir.z);const yawDelta=Math.atan2(Math.sin(desiredYaw-f.yaw),Math.cos(desiredYaw-f.yaw));f.yaw+=yawDelta*(1-Math.exp(-3.8*dt));const desiredPitch=Math.asin(Math.max(-.95,Math.min(.95,dir.y)));f.pitch+=(desiredPitch-f.pitch)*(1-Math.exp(-3.8*dt))}else if(previousTarget.current!==targetId){previousTarget.current=targetId;f.position.copy(center).addScaledVector(f.position.clone().sub(center).normalize(),stop);if(target.landable){f.groundedId=target.id;f.pitch=0}onArrive(targetId)}}}
  else if(body){
   const center=new Vector3(...body.position),normal=f.position.clone().sub(center).normalize();playerUp.copy(normal);
   if(surfaceBodyId.current!==body.id){surfaceBodyId.current=body.id;surfaceHeading.current.set(Math.sin(f.yaw),0,-Math.cos(f.yaw)).projectOnPlane(normal);if(surfaceHeading.current.lengthSq()<.001)surfaceHeading.current.set(0,0,-1).projectOnPlane(normal);if(surfaceHeading.current.lengthSq()<.001)surfaceHeading.current.set(1,0,0).projectOnPlane(normal);surfaceHeading.current.normalize();f.yaw=Math.atan2(surfaceHeading.current.x,-surfaceHeading.current.z);f.pitch=Math.asin(Math.max(-.95,Math.min(.95,surfaceHeading.current.y)));lastSurfaceYaw.current=f.yaw}
   const yawDelta=f.yaw-lastSurfaceYaw.current;if(Math.abs(yawDelta)>.00001){surfaceHeading.current.applyAxisAngle(normal,yawDelta).projectOnPlane(normal).normalize();lastSurfaceYaw.current=f.yaw}
   forward.copy(surfaceHeading.current).projectOnPlane(normal).normalize();if(forward.lengthSq()<.001){forward.crossVectors(new Vector3(0,1,0),normal);if(forward.lengthSq()<.001)forward.crossVectors(new Vector3(1,0,0),normal);forward.normalize();surfaceHeading.current.copy(forward)}
   right.crossVectors(forward,normal).normalize();const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);
   if(move.lengthSq()>0){i.resting=false;const tangent=move.normalize();const nextNormal=normal.clone().addScaledVector(tangent,(i.boost?.62:.36)*dt).normalize();surfaceHeading.current.copy(forward).projectOnPlane(nextNormal).normalize();f.position.copy(center).addScaledVector(nextNormal,body.radius+.22)}
   if(i.takeoff||i.up){f.yaw=Math.atan2(surfaceHeading.current.x,-surfaceHeading.current.z);f.pitch=Math.asin(Math.max(-.95,Math.min(.95,surfaceHeading.current.y)));surfaceBodyId.current=null;f.groundedId=null;f.position.addScaledVector(normal,.9);i.takeoff=false}i.land=false;
  }else{
   forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();right.set(Math.cos(f.yaw),0,Math.sin(f.yaw)).normalize();
   const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);if(i.up)move.y+=1;if(i.down)move.y-=1;
   if(move.lengthSq()>0)f.position.copy(moveAvoidingBodies(f.position,move.normalize().multiplyScalar(step),bodies,null));
   if(i.land){const nearest=bodies.filter(b=>b.landable).map(b=>({body:b,d:f.position.distanceTo(new Vector3(...b.position))})).sort((a,b)=>a.d-b.d)[0];if(nearest){if(nearest.d<=nearest.body.radius+.55){const center=new Vector3(...nearest.body.position),normal=f.position.clone().sub(center).normalize();f.position.copy(center).addScaledVector(normal,nearest.body.radius+.24);f.groundedId=nearest.body.id;f.pitch=0;onArrive(nearest.body.id)}else{onLandRequest(nearest.body.id)}}i.land=false}
   i.takeoff=false;
  }
  const landedBody=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;if(landedBody){playerUp.copy(f.position).sub(new Vector3(...landedBody.position)).normalize();forward.copy(surfaceHeading.current).projectOnPlane(playerUp).normalize();if(forward.lengthSq()<.001){forward.crossVectors(new Vector3(0,1,0),playerUp);if(forward.lengthSq()<.001)forward.crossVectors(new Vector3(1,0,0),playerUp);forward.normalize();surfaceHeading.current.copy(forward)}}else{playerUp.set(0,1,0);forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize()}
  smoothedCameraUp.current.lerp(playerUp,1-Math.exp(-7*dt)).normalize();desired.copy(forward).multiplyScalar(landedBody?-5.35:-5.55).addScaledVector(smoothedCameraUp.current,landedBody?2.05:1.98);
  camera.position.lerp(desired,1-Math.exp(-7*dt));camera.up.copy(smoothedCameraUp.current);look.copy(forward).multiplyScalar(landedBody?2.6:2.6).addScaledVector(smoothedCameraUp.current,landedBody?.18:0);camera.lookAt(look);
 });
 return <>
  <color attach="background" args={['#0a1a36']}/><ambientLight intensity={.38}/><hemisphereLight args={['#b8dcff','#55436f',.28]}/>
  <Stars/>{bodies.map(body=><Planet key={body.id} body={body} flightRef={flightRef}/>)}<HomeSystemBeacon flightRef={flightRef} camera={camera}/>{remotePlayers.map(player=><OtherAvatar key={player.id} player={player} flightRef={flightRef}/>)}<Avatar avatarId={avatarId} flightRef={flightRef} inputRef={inputRef} bodies={bodies}/>
 </>;
}

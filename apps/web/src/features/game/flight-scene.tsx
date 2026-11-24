'use client';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { AdditiveBlending, BackSide, CanvasTexture, Group, NormalBlending, Sprite, SpriteMaterial, SRGBColorSpace, TextureLoader, Vector3 } from 'three';
import type { Camera } from 'three';
import type { AvatarId, Body } from './universe-data';
import { transitionFlightControl } from './flight-controller.mjs';
import { createLandingCameraAnchor, createLandingCameraHandoff, getLandingCameraHandoffFrame, getLandingCameraLocalFrame, getLandingContactPoint, getLandingSurfaceRadius, getStableSurfaceNormal, isWithinLandingCameraCaptureRange } from './landing-camera.mjs';
import type { InputState } from './flight-controller.mjs';

export type FlightState={position:Vector3;yaw:number;pitch:number;groundedId:string|null;groundingRevision:number};
export type RemotePlayer={id:string;nickname:string;avatarId:AvatarId;position:[number,number,number]};
const LANDING_CAMERA_CAPTURE_GAP=5.55;
const LANDING_CAMERA_HANDOFF_SECONDS=.6;

function Stars(){
 const ref=useRef<Group>(null);
 useFrame((_s,d)=>{if(ref.current)ref.current.rotation.y+=d*.00035});
 const positions=useRef<Float32Array|null>(null);
 if(!positions.current){const a=new Float32Array(2600*3);let seed=197903;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};for(let i=0;i<2600;i++){const r=28+rand()*300,t=rand()*Math.PI*2,p=Math.acos(2*rand()-1);a[i*3]=r*Math.sin(p)*Math.cos(t);a[i*3+1]=r*Math.cos(p);a[i*3+2]=r*Math.sin(p)*Math.sin(t)}positions.current=a}
 return <group ref={ref}><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions.current,3]}/></bufferGeometry><pointsMaterial color="#f1f5ff" size={.15} sizeAttenuation transparent opacity={.98}/></points></group>;
}
function NebulaBackdrop({flightRef}:{flightRef:MutableRefObject<FlightState>}){
 const [glow,setGlow]=useState<CanvasTexture|null>(null);
 const refs=[useRef<Sprite>(null),useRef<Sprite>(null),useRef<Sprite>(null),useRef<Sprite>(null)];
 const clouds=useMemo(()=>[{color:'#765bff',center:[-34,16,-72],size:[88,62]},{color:'#ff55ad',center:[42,-12,-88],size:[92,66]},{color:'#26e5d0',center:[8,28,-112],size:[78,56]},{color:'#ffb34f',center:[-68,-22,-96],size:[82,58]}] as const,[]);
 useEffect(()=>{const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;const ctx=canvas.getContext('2d');if(!ctx)return;const gradient=ctx.createRadialGradient(256,256,8,256,256,250);gradient.addColorStop(0,'rgba(255,255,255,.96)');gradient.addColorStop(.22,'rgba(255,255,255,.58)');gradient.addColorStop(.58,'rgba(255,255,255,.2)');gradient.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,512,512);const texture=new CanvasTexture(canvas);texture.needsUpdate=true;setGlow(texture);return()=>texture.dispose()},[]);
 useFrame(()=>{refs.forEach((ref,i)=>{if(ref.current){const c=clouds[i];ref.current.position.set(c.center[0]-flightRef.current.position.x,c.center[1]-flightRef.current.position.y,c.center[2]-flightRef.current.position.z)}})});
 if(!glow)return null;
 return <>{clouds.map((cloud,i)=><sprite key={i} ref={refs[i]} scale={[cloud.size[0],cloud.size[1],1]}><spriteMaterial map={glow} color={cloud.color} transparent opacity={.68} blending={AdditiveBlending} depthWrite={false} /></sprite>)}</>;
}
function PlanetLabel({body}:{body:Body}){
 const [texture,setTexture]=useState<CanvasTexture|null>(null);
 useEffect(()=>{const canvas=document.createElement('canvas');canvas.width=512;canvas.height=96;const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='rgba(4,10,24,.9)';ctx.beginPath();ctx.roundRect(8,8,496,80,18);ctx.fill();ctx.strokeStyle=body.real?'rgba(158,218,245,.82)':'rgba(205,177,255,.82)';ctx.lineWidth=3;ctx.stroke();ctx.font='600 38px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ffffff';ctx.fillText(body.name,256,48,456);const map=new CanvasTexture(canvas);map.needsUpdate=true;setTexture(map);return()=>map.dispose()},[body.name,body.real]);
 if(!texture)return null;
 // Keep every nameplate narrower than its planet and directly below the visible sphere.
 const width=Math.max(body.radius*.82,Math.min(body.radius*1.55,body.name.length*.024));
 return <sprite position={[0,-body.radius*1.3-width*.18,0]} scale={[width,width*.19,1]}><spriteMaterial map={texture} transparent depthWrite={false} /></sprite>;
}
function Planet({body,flightRef}:{body:Body;flightRef:MutableRefObject<FlightState>}){
 const ref=useRef<Group>(null);
 useFrame((_state,d)=>{if(ref.current){ref.current.position.set(body.position[0]-flightRef.current.position.x,body.position[1]-flightRef.current.position.y,body.position[2]-flightRef.current.position.z);ref.current.scale.setScalar(1);ref.current.rotation.y+=d*(body.id === 'earth' ? 0.012 : 0.004)}});
 return <group ref={ref}>
  <mesh><sphereGeometry args={[body.radius*1.3,body.real?28:20,body.real?22:16]}/><meshStandardMaterial color={body.color} roughness={.82} emissive={body.color} emissiveIntensity={body.id==='sun'?2.1:.38}/></mesh>{body.id==='sun'&&<pointLight intensity={470} distance={260} decay={2} color="#fff1d2"/>}
  {body.id==='earth'&&<mesh scale={1.035}><sphereGeometry args={[body.radius,28,20]}/><meshBasicMaterial color="#73c8ff" transparent opacity={.12} side={BackSide}/></mesh>}
  {body.id==='saturn'&&<mesh rotation={[Math.PI/2.25,0,0]}><torusGeometry args={[body.radius*1.3*1.55,body.radius*1.3*.22,5,64]}/><meshStandardMaterial color="#cdbb9c" transparent opacity={.78}/></mesh>}
  {!body.real&&<><mesh scale={1.1}><sphereGeometry args={[body.radius*1.3,16,12]}/><meshBasicMaterial color="#d6c6ff" wireframe transparent opacity={.12}/></mesh><mesh rotation={[Math.PI/2.2,0,0]}><torusGeometry args={[body.radius*1.3*1.38,.045,4,36]}/><meshBasicMaterial color="#c3a7ff" transparent opacity={.55}/></mesh></>}
  <PlanetLabel body={body}/>
 </group>;
}
function SurfaceLabel({name}:{name:string|null}){
 const [texture,setTexture]=useState<CanvasTexture|null>(null);
 useEffect(()=>{if(!name){setTexture(null);return}const canvas=document.createElement('canvas');canvas.width=512;canvas.height=80;const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='rgba(5,12,28,.88)';ctx.beginPath();ctx.roundRect(8,8,496,64,18);ctx.fill();ctx.strokeStyle='rgba(190,215,255,.68)';ctx.lineWidth=3;ctx.stroke();ctx.font='600 32px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#fff';ctx.fillText(name,256,40,460);const map=new CanvasTexture(canvas);map.needsUpdate=true;setTexture(map);return()=>map.dispose()},[name]);
 if(!name||!texture)return null;
 const width=Math.min(1.65,Math.max(.9,name.length*.035));
 return <sprite position={[0,-.79,0]} scale={[width,.14,1]}><spriteMaterial map={texture} transparent depthWrite={false} depthTest={false}/></sprite>;
}
function Avatar({avatarId,flightRef,inputRef,bodies}:{avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;bodies:Body[]}){
 const ref=useRef<Group>(null);const surfaceBody=bodies.find(b=>b.id===flightRef.current.groundedId);const worldUp=new Vector3(0,1,0);
 const loadedTexture=useLoader(TextureLoader,`/the-universe/avatars/${avatarId}.png`);
 const texture=useMemo(()=>{const t=loadedTexture.clone();t.colorSpace=SRGBColorSpace;t.needsUpdate=true;return t},[loadedTexture]);
 const sprite=useMemo(()=>{const material=new SpriteMaterial({map:texture,transparent:true,depthWrite:false,depthTest:true,alphaTest:.02,blending:NormalBlending,toneMapped:false});const s=new Sprite(material);s.center.set(.5,.02);const aspect=texture.image.width/texture.image.height||1;s.scale.set(.76*aspect,.76,1);return s},[texture]);
 useEffect(()=>()=>{sprite.material.dispose();texture.dispose()},[sprite,texture]);
 useFrame((state)=>{if(!ref.current)return;const f=flightRef.current,i=inputRef.current,body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;const wave=Math.sin(state.clock.elapsedTime*1.05);ref.current.visible=true;ref.current.position.set(0,0,0);if(body){const normal=new Vector3(...getStableSurfaceNormal(f.position.toArray(),body.position));ref.current.quaternion.setFromUnitVectors(worldUp,normal)}else{ref.current.quaternion.identity()}const seated=!!body&&i.resting;const size=body?Math.max(1.05,Math.min(1.25,body.radius*.72*1.3)):1.12;ref.current.scale.setScalar(size);ref.current.rotateY(Math.sin(state.clock.elapsedTime*.55)*.012);sprite.position.y=body?0:wave*.018+((i.forward || i.back) ? .025 : 0);sprite.material.opacity=seated?.92:1});
 return <group ref={ref}><primitive object={sprite}/><SurfaceLabel name={surfaceBody?.name??null}/><pointLight position={[0,.3,.18]} color="#b9d8ff" intensity={.22} distance={2.8}/></group>;
}
function OtherAvatar({player,flightRef}:{player:RemotePlayer;flightRef:MutableRefObject<FlightState>}){
 const ref=useRef<Group>(null);
 const loadedTexture=useLoader(TextureLoader,`/the-universe/avatars/${player.avatarId}.png`);
 const texture=useMemo(()=>{const t=loadedTexture.clone();t.colorSpace=SRGBColorSpace;t.needsUpdate=true;return t},[loadedTexture]);
 const sprite=useMemo(()=>{const material=new SpriteMaterial({map:texture,transparent:true,depthWrite:false,depthTest:true,alphaTest:.02,blending:NormalBlending,toneMapped:false});const s=new Sprite(material);s.center.set(.5,.02);const aspect=texture.image.width/texture.image.height||1;s.scale.set(.55*aspect,.55,1);return s},[texture]);
 useEffect(()=>()=>{sprite.material.dispose();texture.dispose()},[sprite,texture]);
 useFrame(()=>{if(ref.current)ref.current.position.set(player.position[0]-flightRef.current.position.x,player.position[1]-flightRef.current.position.y,player.position[2]-flightRef.current.position.z)});
 return <group ref={ref}><primitive object={sprite}/></group>;
}
function captureCameraPose(camera:Camera,playerPosition:Vector3,fixedCameraWorldPosition?:Vector3){
 const cameraWorldPosition=fixedCameraWorldPosition?.clone()??playerPosition.clone().add(camera.position);
 const direction=new Vector3(0,0,-1).applyQuaternion(camera.quaternion).normalize();
 const lookAtWorldPosition=cameraWorldPosition.clone().addScaledVector(direction,Math.max(1,camera.position.length()));
 return {cameraWorldPosition:cameraWorldPosition.toArray(),lookAtWorldPosition:lookAtWorldPosition.toArray(),cameraUp:camera.up.toArray()};
}
function stableSurfaceTangent(direction:Vector3,normal:Vector3){
 const tangent=direction.clone().addScaledVector(normal,-direction.dot(normal));
 if(tangent.lengthSq()<1e-6){const reference=Math.abs(normal.y)<.9?new Vector3(0,1,0):new Vector3(1,0,0);tangent.crossVectors(reference,normal)}
 if(tangent.lengthSq()<1e-6)tangent.set(0,0,-1);
 return tangent.normalize();
}
function moveAvoidingBodies(start:Vector3,displacement:Vector3,bodies:Body[],ignoreId:string|null){
 const length=displacement.length();if(length<1e-8)return start.clone();
 const direction=displacement.clone().normalize();const adjusted=displacement.clone();
 for(const body of bodies){if(body.id===ignoreId)continue;const center=new Vector3(...body.position);const fromCenter=start.clone().sub(center);const startDistance=fromCenter.length();const projection=Math.max(0,Math.min(length,center.clone().sub(start).dot(direction)));const closest=start.clone().addScaledVector(direction,projection);const clearance=body.radius*1.3+.72;const gap=closest.distanceTo(center);if(gap<clearance&&!(startDistance<clearance&&start.clone().add(displacement).distanceTo(center)>startDistance)){const normal=closest.sub(center).normalize();if(normal.lengthSq()<.001)normal.copy(fromCenter).normalize();const tangent=direction.clone().projectOnPlane(normal);if(tangent.lengthSq()<.001)tangent.crossVectors(normal,new Vector3(0,1,0));if(tangent.lengthSq()<.001)tangent.crossVectors(normal,new Vector3(1,0,0));adjusted.copy(tangent.normalize().multiplyScalar(length));break}}
 const candidate=start.clone().add(adjusted);
 for(const body of bodies){if(body.id===ignoreId)continue;const center=new Vector3(...body.position);const minimum=body.radius*1.3+.72;const distance=candidate.distanceTo(center);const startDistance=start.distanceTo(center);if(distance<minimum&&!(startDistance<minimum&&distance>startDistance)){const normal=candidate.clone().sub(center);if(normal.lengthSq()<.001)normal.copy(start).sub(center);if(normal.lengthSq()<.001)normal.set(0,1,0);candidate.copy(center).addScaledVector(normal.normalize(),minimum)}}
 return candidate;
}
export function FlightScene({bodies,avatarId,flightRef,inputRef,targetId,onArrive,onLandRequest,remotePlayers}:{bodies:Body[];avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;targetId:string|null;onArrive:(id:string)=>void;onLandRequest:(id:string|null)=>void;remotePlayers:RemotePlayer[]}){
 const {camera}=useThree();const forward=new Vector3();const right=new Vector3();const cameraForward=new Vector3();const desired=new Vector3();const look=new Vector3();const playerUp=new Vector3(0,1,0);const smoothedCameraUp=useRef(new Vector3(0,1,0));const cameraBodyId=useRef<string|null>(null);const previousTarget=useRef<string|null>(null);const targetFlightSpeed=useRef(2.25);const surfaceHeading=useRef(new Vector3(0,0,-1));const surfaceBodyId=useRef<string|null>(null);const surfaceGroundingRevision=useRef(0);const cameraGroundingRevision=useRef(0);const lastSurfaceYaw=useRef(0);const landingCameraAnchor=useRef<{targetId:string;cameraWorldPosition:Vector3;lookAtWorldPosition:Vector3;cameraUp:[number,number,number]}|null>(null);const landingCameraHandoff=useRef<{fromCameraWorldPosition:number[];toCameraWorldPosition:number[];fromLookAtWorldPosition:number[];toLookAtWorldPosition:number[];fromCameraUp:number[];toCameraUp:number[];duration:number;elapsed:number;phase:'approach'|'grounded'|'release'}|null>(null);
 useFrame((_s,delta)=>{
  const dt=Math.min(delta,.04),f=flightRef.current,i=inputRef.current,body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;
  const cruise=(i.boost?8.5:5.2),step=cruise*dt;
  const manualMovement=i.forward||i.back||i.left||i.right||i.up||i.down;
  if(targetId&&manualMovement){previousTarget.current=targetId;targetFlightSpeed.current=2.25;transitionFlightControl(i,'MANUAL_OVERRIDE');onLandRequest(null)}
  if(!targetId){previousTarget.current=null;targetFlightSpeed.current=2.25;if(!f.groundedId)surfaceBodyId.current=null;}
  if(targetId&&!manualMovement&&(i.mode==='approaching'||i.mode==='landing')){const target=bodies.find(b=>b.id===targetId);if(target){const center=new Vector3(...target.position),dir=center.clone().sub(f.position),distance=dir.length(),stop=getLandingSurfaceRadius(target.radius);if(distance>stop){const remaining=distance-stop;dir.normalize();const maximumSpeed=Math.min(42,3.4+distance*.32)*(i.boost?1.25:1);const brakingSpeed=Math.sqrt(2*9*remaining);const desiredSpeed=Math.min(maximumSpeed,Math.max(.22,brakingSpeed));targetFlightSpeed.current+=(desiredSpeed-targetFlightSpeed.current)*(1-Math.exp(-4.2*dt));const amount=Math.min(targetFlightSpeed.current*dt,remaining);f.position.copy(moveAvoidingBodies(f.position,dir.clone().multiplyScalar(amount),bodies,target.id));const desiredYaw=Math.atan2(dir.x,-dir.z);const yawDelta=Math.atan2(Math.sin(desiredYaw-f.yaw),Math.cos(desiredYaw-f.yaw));f.yaw+=yawDelta*(1-Math.exp(-3.8*dt));const desiredPitch=Math.asin(Math.max(-.95,Math.min(.95,dir.y)));f.pitch+=(desiredPitch-f.pitch)*(1-Math.exp(-3.8*dt))}else if(previousTarget.current!==targetId){previousTarget.current=targetId;const contact=getLandingContactPoint(center.toArray(),f.position.toArray(),stop);f.position.set(...contact.position);f.groundedId=target.id;f.pitch=0;transitionFlightControl(i,'ARRIVED_LANDED');onArrive(targetId)}}}
  else if(body){
   const center=new Vector3(...body.position),normal=new Vector3(...getStableSurfaceNormal(f.position.toArray(),body.position));playerUp.copy(normal);
   if(surfaceBodyId.current!==body.id||surfaceGroundingRevision.current!==f.groundingRevision){surfaceBodyId.current=body.id;surfaceGroundingRevision.current=f.groundingRevision;surfaceHeading.current.set(Math.sin(f.yaw),0,-Math.cos(f.yaw));surfaceHeading.current.copy(stableSurfaceTangent(surfaceHeading.current,normal));f.yaw=Math.atan2(surfaceHeading.current.x,-surfaceHeading.current.z);f.pitch=0;lastSurfaceYaw.current=f.yaw}
   const yawDelta=f.yaw-lastSurfaceYaw.current;if(Math.abs(yawDelta)>.00001){surfaceHeading.current.applyAxisAngle(normal,yawDelta).projectOnPlane(normal).normalize();lastSurfaceYaw.current=f.yaw}
   forward.copy(stableSurfaceTangent(surfaceHeading.current,normal));surfaceHeading.current.copy(forward)
   right.crossVectors(forward,normal).normalize();const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);
   if(move.lengthSq()>0&&i.mode==='walking'){i.resting=false;const tangent=move.normalize();const nextNormal=normal.clone().addScaledVector(tangent,(i.boost?.62:.36)*dt).normalize();surfaceHeading.current.copy(stableSurfaceTangent(forward,nextNormal));f.position.copy(center).addScaledVector(nextNormal,getLandingSurfaceRadius(body.radius))}
   if(i.land){const contact=getLandingContactPoint(center.toArray(),f.position.toArray(),getLandingSurfaceRadius(body.radius));f.position.set(...contact.position);f.pitch=0;transitionFlightControl(i,'ARRIVED_LANDED');}
   if(i.takeoff||i.up){f.yaw=Math.atan2(surfaceHeading.current.x,-surfaceHeading.current.z);f.pitch=Math.asin(Math.max(-.95,Math.min(.95,surfaceHeading.current.y)));surfaceBodyId.current=null;f.groundedId=null;f.groundingRevision+=1;f.position.addScaledVector(normal,.9);transitionFlightControl(i,'TAKEOFF_COMPLETE')}
  }else{
   forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();right.set(Math.cos(f.yaw),0,Math.sin(f.yaw)).normalize();
   const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);if(i.up)move.y+=1;if(i.down)move.y-=1;if(i.mode==='flying'&&i.autoFlight)move.add(forward);
   if(move.lengthSq()>0)f.position.copy(moveAvoidingBodies(f.position,move.normalize().multiplyScalar(step),bodies,null));
   if(i.land){const nearest=bodies.map(b=>({body:b,d:f.position.distanceTo(new Vector3(...b.position))})).sort((a,b)=>a.d-b.d)[0];if(nearest){if(nearest.d<=getLandingSurfaceRadius(nearest.body.radius)+.08){const center=new Vector3(...nearest.body.position),surfaceRadius=getLandingSurfaceRadius(nearest.body.radius),contact=getLandingContactPoint(center.toArray(),f.position.toArray(),surfaceRadius),anchor=createLandingCameraAnchor(f.position.toArray(),center.toArray(),surfaceRadius,camera.position.toArray());landingCameraAnchor.current={targetId:nearest.body.id,cameraWorldPosition:new Vector3(...anchor.cameraWorldPosition),lookAtWorldPosition:new Vector3(...anchor.lookAtWorldPosition),cameraUp:anchor.cameraUp};landingCameraHandoff.current=null;f.position.set(...contact.position);f.groundedId=nearest.body.id;f.pitch=0;transitionFlightControl(i,'ARRIVED_LANDED');onArrive(nearest.body.id)}else{transitionFlightControl(i,'LAND');onLandRequest(nearest.body.id)}}else{transitionFlightControl(i,'APPROACH_COMPLETE')}}
   if(i.takeoff)transitionFlightControl(i,'TAKEOFF_COMPLETE');
  }
  const landedBody=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;
  const landingCandidate=targetId&&!manualMovement&&!landedBody&&(i.mode==='approaching'||i.mode==='landing')?bodies.find(b=>b.id===targetId):undefined;
  const landingTarget=landingCandidate&&isWithinLandingCameraCaptureRange(f.position.distanceTo(new Vector3(...landingCandidate.position)),getLandingSurfaceRadius(landingCandidate.radius),LANDING_CAMERA_CAPTURE_GAP)?landingCandidate:undefined;
  if(landingTarget&&(landingCameraAnchor.current?.targetId!==landingTarget.id||cameraBodyId.current===landingTarget.id||landingCameraHandoff.current?.phase==='grounded'||landingCameraHandoff.current?.phase==='release')){
   const previousAnchor=landingCameraAnchor.current,currentPose=captureCameraPose(camera,f.position,previousAnchor?.cameraWorldPosition),center=new Vector3(...landingTarget.position);
   const cameraOffset=previousAnchor?previousAnchor.cameraWorldPosition.clone().sub(f.position):camera.position.clone();
   const anchor=createLandingCameraAnchor(f.position.toArray(),center.toArray(),getLandingSurfaceRadius(landingTarget.radius),cameraOffset.toArray());
   const nextAnchor={targetId:landingTarget.id,cameraWorldPosition:new Vector3(...anchor.cameraWorldPosition),lookAtWorldPosition:new Vector3(...anchor.lookAtWorldPosition),cameraUp:anchor.cameraUp};
   landingCameraAnchor.current=nextAnchor;
   const handoff=createLandingCameraHandoff(currentPose,nextAnchor.cameraWorldPosition.toArray(),nextAnchor.lookAtWorldPosition.toArray(),nextAnchor.cameraUp,LANDING_CAMERA_HANDOFF_SECONDS);
   landingCameraHandoff.current={...handoff,elapsed:0,phase:'approach'};
  }
  const anchoredLandingBody=!!landedBody&&landingCameraAnchor.current?.targetId===landedBody.id;
  const releasingLandingAnchor=!!landingCameraAnchor.current&&!landingTarget&&!anchoredLandingBody;
  if(!landingTarget&&!anchoredLandingBody&&!releasingLandingAnchor){landingCameraAnchor.current=null;landingCameraHandoff.current=null;}
  const landedNow=!!landedBody&&(cameraBodyId.current!==landedBody.id||cameraGroundingRevision.current!==f.groundingRevision);
  if(landedBody){
   playerUp.set(...getStableSurfaceNormal(f.position.toArray(),landedBody.position));
   forward.copy(stableSurfaceTangent(surfaceHeading.current,playerUp));
   if(landedNow){
    surfaceHeading.current.copy(forward);f.yaw=Math.atan2(forward.x,-forward.z);f.pitch=0;lastSurfaceYaw.current=f.yaw;
    surfaceBodyId.current=landedBody.id;surfaceGroundingRevision.current=f.groundingRevision;cameraGroundingRevision.current=f.groundingRevision;smoothedCameraUp.current.copy(playerUp);
   }
   surfaceHeading.current.copy(forward);
  }else{
   cameraBodyId.current=null;playerUp.set(0,1,0);
   forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();
  }
  if(!landedNow){if(smoothedCameraUp.current.dot(playerUp)<0)smoothedCameraUp.current.copy(playerUp);else smoothedCameraUp.current.lerp(playerUp,1-Math.exp(-4.5*dt)).normalize();}
  if(landedBody){
   const cameraUp=smoothedCameraUp.current,cameraTangent=stableSurfaceTangent(forward,cameraUp),surfacePitch=Math.max(-.95,Math.min(.95,f.pitch));
   cameraForward.copy(cameraTangent).multiplyScalar(Math.cos(surfacePitch)).addScaledVector(cameraUp,Math.sin(surfacePitch)).normalize();
  }else cameraForward.copy(forward);
  desired.copy(cameraForward).multiplyScalar(landedBody?-5.35:-5.55);
  look.copy(cameraForward).multiplyScalar(2.6);
  if(landingTarget&&landingCameraAnchor.current){
   const anchor=landingCameraAnchor.current;
   if(landingCameraHandoff.current?.phase==='approach'){
    const handoff=landingCameraHandoff.current;handoff.elapsed=Math.min(handoff.duration,handoff.elapsed+dt);
    const frame=getLandingCameraHandoffFrame(handoff,handoff.elapsed);
    camera.position.copy(new Vector3(...frame.cameraWorldPosition).sub(f.position));camera.up.set(...frame.cameraUp);
    look.copy(new Vector3(...frame.lookAtWorldPosition).sub(f.position));camera.lookAt(look);
    if(frame.progress>=1)landingCameraHandoff.current=null;
   }else{
    const localFrame=getLandingCameraLocalFrame(f.position.toArray(),{cameraWorldPosition:anchor.cameraWorldPosition.toArray(),lookAtWorldPosition:anchor.lookAtWorldPosition.toArray(),cameraUp:anchor.cameraUp});
    camera.position.set(...localFrame.cameraPosition);camera.up.set(...anchor.cameraUp);look.set(...localFrame.lookAt);camera.lookAt(look);
   }
   cameraBodyId.current=null;
  }else if(anchoredLandingBody&&landingCameraAnchor.current){
   const anchor=landingCameraAnchor.current;
   if(landingCameraHandoff.current?.phase!=='grounded'){
    const currentPose=captureCameraPose(camera,f.position,anchor.cameraWorldPosition),targetCameraWorldPosition=f.position.clone().add(desired),targetLookAtWorldPosition=f.position.clone().add(look);
    const handoff=createLandingCameraHandoff(currentPose,targetCameraWorldPosition.toArray(),targetLookAtWorldPosition.toArray(),smoothedCameraUp.current.toArray(),LANDING_CAMERA_HANDOFF_SECONDS);
    landingCameraHandoff.current={...handoff,elapsed:0,phase:'grounded'};
   }
   const handoff=landingCameraHandoff.current;handoff.elapsed=Math.min(handoff.duration,handoff.elapsed+dt);
   const frame=getLandingCameraHandoffFrame(handoff,handoff.elapsed);
   camera.position.copy(new Vector3(...frame.cameraWorldPosition).sub(f.position));camera.up.set(...frame.cameraUp);
   look.copy(new Vector3(...frame.lookAtWorldPosition).sub(f.position));camera.lookAt(look);
   cameraBodyId.current=landedBody.id;cameraGroundingRevision.current=f.groundingRevision;
   if(frame.progress>=1){landingCameraAnchor.current=null;landingCameraHandoff.current=null;}
  }else if(releasingLandingAnchor&&landingCameraAnchor.current){
   const anchor=landingCameraAnchor.current;
   if(landingCameraHandoff.current?.phase!=='release'){
    const currentPose=captureCameraPose(camera,f.position,anchor.cameraWorldPosition),targetCameraWorldPosition=f.position.clone().add(desired),targetLookAtWorldPosition=f.position.clone().add(look);
    const handoff=createLandingCameraHandoff(currentPose,targetCameraWorldPosition.toArray(),targetLookAtWorldPosition.toArray(),smoothedCameraUp.current.toArray(),LANDING_CAMERA_HANDOFF_SECONDS);
    landingCameraHandoff.current={...handoff,elapsed:0,phase:'release'};
   }
   const handoff=landingCameraHandoff.current;
   handoff.toCameraWorldPosition=f.position.clone().add(desired).toArray();
   handoff.toLookAtWorldPosition=f.position.clone().add(look).toArray();
   handoff.toCameraUp=smoothedCameraUp.current.toArray();
   handoff.elapsed=Math.min(handoff.duration,handoff.elapsed+dt);
   const frame=getLandingCameraHandoffFrame(handoff,handoff.elapsed);
   camera.position.copy(new Vector3(...frame.cameraWorldPosition).sub(f.position));camera.up.set(...frame.cameraUp);
   look.copy(new Vector3(...frame.lookAtWorldPosition).sub(f.position));camera.lookAt(look);
   if(frame.progress>=1){landingCameraAnchor.current=null;landingCameraHandoff.current=null;}
  }else{
   if(landedNow)camera.position.copy(desired);else camera.position.lerp(desired,1-Math.exp(-4.5*dt));
   cameraBodyId.current=landedBody?.id??null;camera.up.copy(smoothedCameraUp.current);camera.lookAt(look);
  }
 });
 return <>
  <color attach="background" args={['#17234a']}/><ambientLight intensity={.58}/><hemisphereLight args={['#d9edff','#9656b8',.56]}/>
  <Stars/><NebulaBackdrop flightRef={flightRef}/>{bodies.map(body=><Planet key={body.id} body={body} flightRef={flightRef}/>)}{remotePlayers.map(player=><Suspense key={player.id} fallback={null}><OtherAvatar player={player} flightRef={flightRef}/></Suspense>)}<Suspense fallback={null}><Avatar avatarId={avatarId} flightRef={flightRef} inputRef={inputRef} bodies={bodies}/></Suspense>
 </>;
}

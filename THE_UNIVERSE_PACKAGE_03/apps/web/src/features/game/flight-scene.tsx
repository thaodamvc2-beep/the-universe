'use client';
import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BackSide, CanvasTexture, Group, PointLight, Vector3 } from 'three';
import { AVATAR_PALETTE, type AvatarId, type Body } from './universe-data';

export type FlightState={position:Vector3;yaw:number;pitch:number;groundedId:string|null};
export type InputState=Record<'forward'|'back'|'left'|'right'|'up'|'down',boolean>&{land:boolean;takeoff:boolean;boost:boolean};
export type RemotePlayer={id:string;nickname:string;avatarId:AvatarId;position:[number,number,number]};

function Stars(){
 const ref=useRef<Group>(null);
 useFrame((_s,d)=>{if(ref.current)ref.current.rotation.y+=d*.00035});
 const positions=useRef<Float32Array|null>(null);
 if(!positions.current){const a=new Float32Array(2600*3);let seed=197903;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};for(let i=0;i<2600;i++){const r=28+rand()*300,t=rand()*Math.PI*2,p=Math.acos(2*rand()-1);a[i*3]=r*Math.sin(p)*Math.cos(t);a[i*3+1]=r*Math.cos(p);a[i*3+2]=r*Math.sin(p)*Math.sin(t)}positions.current=a}
 return <group ref={ref}><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions.current,3]}/></bufferGeometry><pointsMaterial color="#dce8ff" size={.095} sizeAttenuation transparent opacity={.82}/></points></group>;
}
function PlanetLabel({body}:{body:Body}){
 const [texture,setTexture]=useState<CanvasTexture|null>(null);
 useEffect(()=>{const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='rgba(4,10,24,.76)';ctx.beginPath();ctx.roundRect(6,10,244,44,11);ctx.fill();ctx.strokeStyle=body.real?'rgba(158,218,245,.8)':'rgba(205,177,255,.8)';ctx.lineWidth=2;ctx.stroke();ctx.font='600 24px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f4f5ff';ctx.fillText(body.name,128,33,228);const map=new CanvasTexture(canvas);map.needsUpdate=true;setTexture(map);return()=>map.dispose()},[body.name,body.real]);
 if(!texture)return null;
 return <sprite position={[0,body.radius+.48,0]} scale={[Math.max(1.45,Math.min(4.8,body.name.length*.19)),.48,1]}><spriteMaterial map={texture} transparent depthWrite={false} /></sprite>;
}
function Planet({body}:{body:Body}){
 const ref=useRef<Group>(null);
 useFrame((_state,d)=>{if(ref.current)ref.current.rotation.y+=d*(body.id === 'earth' ? 0.012 : 0.004)});
 return <group ref={ref} position={body.position}>
  <mesh><sphereGeometry args={[body.radius,body.real?28:20,body.real?22:16]}/><meshStandardMaterial color={body.color} roughness={.92} emissive={body.id==='sun'?'#ffb34f':'#000000'} emissiveIntensity={body.id==='sun'?2.1:0}/></mesh>
  {body.id==='earth'&&<mesh scale={1.035}><sphereGeometry args={[body.radius,28,20]}/><meshBasicMaterial color="#73c8ff" transparent opacity={.12} side={BackSide}/></mesh>}
  {body.id==='saturn'&&<mesh rotation={[Math.PI/2.25,0,0]}><torusGeometry args={[body.radius*1.55,body.radius*.22,5,64]}/><meshStandardMaterial color="#cdbb9c" transparent opacity={.78}/></mesh>}
  {!body.real&&<><mesh scale={1.1}><sphereGeometry args={[body.radius,16,12]}/><meshBasicMaterial color="#d6c6ff" wireframe transparent opacity={.12}/></mesh><mesh rotation={[Math.PI/2.2,0,0]}><torusGeometry args={[body.radius*1.38,.035,4,36]}/><meshBasicMaterial color="#c3a7ff" transparent opacity={.55}/></mesh></>}
  <PlanetLabel body={body}/>
 </group>;
}
function Avatar({avatarId,flightRef,inputRef,bodies}:{avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;bodies:Body[]}){
 const ref=useRef<Group>(null);const pose=useRef<Group>(null);const leftLeg=useRef<Group>(null);const rightLeg=useRef<Group>(null);const thruster=useRef<PointLight>(null);
 const colors=AVATAR_PALETTE[avatarId]??AVATAR_PALETTE.stardust;const up=new Vector3(0,1,0);
 useFrame(()=>{if(!ref.current)return;const f=flightRef.current;const i=inputRef.current;const seated=!!f.groundedId&&!i.forward&&!i.back&&!i.left&&!i.right;ref.current.position.copy(f.position);ref.current.quaternion.setFromUnitVectors(up,up);if(seated){const body=bodies.find(b=>b.id===f.groundedId);if(body){const n=f.position.clone().sub(new Vector3(...body.position)).normalize();ref.current.quaternion.setFromUnitVectors(up,n)}}ref.current.rotateY(f.yaw);if(pose.current)pose.current.rotation.x+=( (seated?-.42:0)-pose.current.rotation.x)*.18;if(leftLeg.current)leftLeg.current.rotation.x+=((seated?-1.0:0)-leftLeg.current.rotation.x)*.18;if(rightLeg.current)rightLeg.current.rotation.x+=((seated?-1.0:0)-rightLeg.current.rotation.x)*.18;if(thruster.current)thruster.current.intensity=seated ? 0.08 : 1.0});
 return <group ref={ref}>
  <group ref={pose}>
   <mesh position={[0,.19,0]} castShadow><capsuleGeometry args={[.105,.2,5,10]}/><meshStandardMaterial color={colors.suit}/></mesh>
   <mesh position={[0,.39,.015]} castShadow><sphereGeometry args={[.115,18,14]}/><meshStandardMaterial color="#f0d9c9"/></mesh>
   <mesh position={[0,.405,.108]}><sphereGeometry args={[.073,18,12]}/><meshStandardMaterial color={colors.trim}/></mesh>
   <mesh position={[0,.19,-.105]}><boxGeometry args={[.17,.19,.09]}/><meshStandardMaterial color={colors.trim}/></mesh>
   <mesh position={[0,.2,-.2]}><boxGeometry args={[.24,.29,.16]}/><meshStandardMaterial color={colors.suit} metalness={.35} roughness={.45}/></mesh>
   {[-1,1].map(s=><group key={s} position={[s*.075,.04,-.23]}><mesh rotation={[Math.PI,0,0]}><cylinderGeometry args={[.035,.055,.13,10]}/><meshStandardMaterial color={colors.trim} emissive={colors.glow} emissiveIntensity={.3}/></mesh><mesh position={[0,-.12,0]}><coneGeometry args={[.025,.13,8]}/><meshStandardMaterial color={colors.glow} emissive={colors.glow} emissiveIntensity={1.1} transparent opacity={.7}/></mesh></group>)}
   {[-1,1].map(s=><group key={s} position={[s*.14,.2,0]}><mesh rotation={[0,0,s*-.22]}><capsuleGeometry args={[.035,.14,4,8]}/><meshStandardMaterial color={colors.suit}/></mesh><mesh position={[0,-.17,.025]}><sphereGeometry args={[.045,12,10]}/><meshStandardMaterial color={colors.trim}/></mesh></group>)}
  </group>
  <group ref={leftLeg} position={[-.055,.09,0]}><mesh position={[0,-.055,.035]}><capsuleGeometry args={[.04,.11,4,8]}/><meshStandardMaterial color={colors.suit}/></mesh></group>
  <group ref={rightLeg} position={[.055,.09,0]}><mesh position={[0,-.055,.035]}><capsuleGeometry args={[.04,.11,4,8]}/><meshStandardMaterial color={colors.suit}/></mesh></group>
  <pointLight position={[0,.46,.12]} color={colors.glow} intensity={.32} distance={.8}/><pointLight ref={thruster} position={[0,.05,-.32]} color={colors.glow} intensity={.08} distance={1.5}/>
 </group>;
}
function OtherAvatar({player}:{player:RemotePlayer}){
 const c=AVATAR_PALETTE[player.avatarId]??AVATAR_PALETTE.stardust;
 return <group position={player.position}><mesh position={[0,.2,0]}><capsuleGeometry args={[.11,.2,4,8]}/><meshStandardMaterial color={c.suit}/></mesh><mesh position={[0,.4,0]}><sphereGeometry args={[.11,14,12]}/><meshStandardMaterial color="#efd8c9"/></mesh><pointLight color={c.glow} intensity={.2} distance={1}/></group>;
}
function moveAvoidingBodies(start:Vector3,displacement:Vector3,bodies:Body[],ignoreId:string|null){
 const length=displacement.length();if(length<1e-8)return start.clone();
 const direction=displacement.clone().normalize();const adjusted=displacement.clone();
 for(const body of bodies){if(body.id===ignoreId)continue;const center=new Vector3(...body.position);const fromCenter=start.clone().sub(center);const startDistance=fromCenter.length();const projection=Math.max(0,Math.min(length,center.clone().sub(start).dot(direction)));const closest=start.clone().addScaledVector(direction,projection);const clearance=body.radius+.72;const gap=closest.distanceTo(center);if(gap<clearance&&!(startDistance<clearance&&start.clone().add(displacement).distanceTo(center)>startDistance)){const normal=closest.sub(center).normalize();if(normal.lengthSq()<.001)normal.copy(fromCenter).normalize();const tangent=direction.clone().projectOnPlane(normal);if(tangent.lengthSq()<.001)tangent.crossVectors(normal,new Vector3(0,1,0));if(tangent.lengthSq()<.001)tangent.crossVectors(normal,new Vector3(1,0,0));adjusted.copy(tangent.normalize().multiplyScalar(length));break}}
 const candidate=start.clone().add(adjusted);
 for(const body of bodies){if(body.id===ignoreId)continue;const center=new Vector3(...body.position);const minimum=body.radius+.72;const distance=candidate.distanceTo(center);const startDistance=start.distanceTo(center);if(distance<minimum&&!(startDistance<minimum&&distance>startDistance)){const normal=candidate.clone().sub(center);if(normal.lengthSq()<.001)normal.copy(start).sub(center);if(normal.lengthSq()<.001)normal.set(0,1,0);candidate.copy(center).addScaledVector(normal.normalize(),minimum)}}
 return candidate;
}
export function FlightScene({bodies,avatarId,flightRef,inputRef,targetId,onArrive,remotePlayers}:{bodies:Body[];avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;targetId:string|null;onArrive:(id:string)=>void;remotePlayers:RemotePlayer[]}){
 const {camera}=useThree();const forward=new Vector3();const right=new Vector3();const desired=new Vector3();const look=new Vector3();const playerUp=new Vector3(0,1,0);const previousTarget=useRef<string|null>(null);const sun=bodies.find(b=>b.id==='sun');
 useFrame((_s,delta)=>{
  const dt=Math.min(delta,.04),f=flightRef.current,i=inputRef.current,body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;
  const cruise=(i.boost?4.2:1.75),step=cruise*dt;
  if(!targetId)previousTarget.current=null;
  if(targetId){const target=bodies.find(b=>b.id===targetId);if(target){const center=new Vector3(...target.position),dir=center.clone().sub(f.position),distance=dir.length(),stop=target.radius+(target.landable ? 0.2 : 1.8);if(distance>stop){dir.normalize();const amount=Math.min((i.boost?5:2.25)*dt,distance-stop);f.position.copy(moveAvoidingBodies(f.position,dir.multiplyScalar(amount),bodies,target.id));f.yaw=Math.atan2(dir.x,-dir.z);f.pitch=Math.asin(Math.max(-.95,Math.min(.95,dir.y)))}else if(previousTarget.current!==targetId){previousTarget.current=targetId;f.position.copy(center).addScaledVector(f.position.clone().sub(center).normalize(),stop);if(target.landable)f.groundedId=target.id;onArrive(targetId)}}}
  else if(body){
   const center=new Vector3(...body.position),normal=f.position.clone().sub(center).normalize();playerUp.copy(normal);
   forward.set(Math.sin(f.yaw),0,-Math.cos(f.yaw)).projectOnPlane(normal).normalize();if(forward.lengthSq()<.001)forward.set(1,0,0).projectOnPlane(normal).normalize();
   right.crossVectors(forward,normal).normalize();const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);
   if(move.lengthSq()>0){normal.addScaledVector(move.normalize(),(i.boost?2.1:1.05)*dt/Math.max(.35,body.radius)).normalize();f.position.copy(center).addScaledVector(normal,body.radius+.19)}
   if(i.takeoff||i.up){f.groundedId=null;f.position.addScaledVector(normal,.9);i.takeoff=false}i.land=false;
  }else{
   forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();right.set(Math.cos(f.yaw),0,Math.sin(f.yaw)).normalize();
   const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);if(i.up)move.y+=1;if(i.down)move.y-=1;
   if(move.lengthSq()>0)f.position.copy(moveAvoidingBodies(f.position,move.normalize().multiplyScalar(step),bodies,null));
   if(i.land){const nearest=bodies.filter(b=>b.landable).map(b=>({body:b,d:f.position.distanceTo(new Vector3(...b.position))})).sort((a,b)=>a.d-b.d)[0];if(nearest&&nearest.d<=nearest.body.radius+2.6){const center=new Vector3(...nearest.body.position),normal=f.position.clone().sub(center).normalize();f.position.copy(center).addScaledVector(normal,nearest.body.radius+.19);f.groundedId=nearest.body.id;onArrive(nearest.body.id)}i.land=false}
   i.takeoff=false;
  }
  if(!body)playerUp.set(0,1,0);
  forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();
  const cameraUp=f.groundedId?playerUp:new Vector3(0,1,0);desired.copy(f.position).addScaledVector(forward,-5.3).addScaledVector(cameraUp,2.25);
  camera.position.lerp(desired,1-Math.exp(-3.6*dt));camera.up.copy(cameraUp);look.copy(f.position).addScaledVector(forward,2.3);camera.lookAt(look);
 });
 return <>
  <color attach="background" args={['#040713']}/><ambientLight intensity={.22}/><pointLight position={sun?.position??[-15.6,0,0]} intensity={420} distance={230} decay={2} color="#fff0d8"/>
  <Stars/>{bodies.map(body=><Planet key={body.id} body={body}/>)}{remotePlayers.map(player=><OtherAvatar key={player.id} player={player}/>)}<Avatar avatarId={avatarId} flightRef={flightRef} inputRef={inputRef} bodies={bodies}/>
 </>;
}

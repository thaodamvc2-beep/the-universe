'use client';
import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BackSide, CanvasTexture, Group, Vector3 } from 'three';
import { AVATAR_PALETTE, type AvatarId, type Body } from './universe-data';

export type FlightState={position:Vector3;yaw:number;pitch:number;groundedId:string|null};
export type InputState=Record<'forward'|'back'|'left'|'right'|'up'|'down',boolean>&{land:boolean;takeoff:boolean;boost:boolean};
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
  <mesh><sphereGeometry args={[body.radius,body.real?28:20,body.real?22:16]}/><meshStandardMaterial color={body.color} roughness={.92} emissive={body.id==='sun'?'#ffb34f':'#000000'} emissiveIntensity={body.id==='sun'?2.1:0}/></mesh>
  {body.id==='earth'&&<mesh scale={1.035}><sphereGeometry args={[body.radius,28,20]}/><meshBasicMaterial color="#73c8ff" transparent opacity={.12} side={BackSide}/></mesh>}
  {body.id==='saturn'&&<mesh rotation={[Math.PI/2.25,0,0]}><torusGeometry args={[body.radius*1.55,body.radius*.22,5,64]}/><meshStandardMaterial color="#cdbb9c" transparent opacity={.78}/></mesh>}
  {!body.real&&<><mesh scale={1.1}><sphereGeometry args={[body.radius,16,12]}/><meshBasicMaterial color="#d6c6ff" wireframe transparent opacity={.12}/></mesh><mesh rotation={[Math.PI/2.2,0,0]}><torusGeometry args={[body.radius*1.38,.035,4,36]}/><meshBasicMaterial color="#c3a7ff" transparent opacity={.55}/></mesh></>}
  <PlanetLabel body={body}/>
 </group>;
}
function Avatar({avatarId,flightRef,inputRef,bodies}:{avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;bodies:Body[]}){
 const ref=useRef<Group>(null);const pose=useRef<Group>(null);const leftWing=useRef<Group>(null);const rightWing=useRef<Group>(null);
 const colors=AVATAR_PALETTE[avatarId]??AVATAR_PALETTE.stardust;const up=new Vector3(0,1,0);
 useFrame((state,delta)=>{if(!ref.current)return;const f=flightRef.current,i=inputRef.current;const seated=!!f.groundedId&&!i.forward&&!i.back&&!i.left&&!i.right;
  ref.current.position.set(0,0,0);const body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;
  if(body){const normal=f.position.clone().sub(new Vector3(...body.position)).normalize();ref.current.quaternion.setFromUnitVectors(up,normal)}else ref.current.quaternion.identity();
  ref.current.rotateY(f.yaw);
  const flap=Math.sin(state.clock.elapsedTime*2.2)*.055;
  if(pose.current){pose.current.rotation.x+=( (seated?-.18:.12)-pose.current.rotation.x)*Math.min(1,delta*5);pose.current.position.y=.025+Math.sin(state.clock.elapsedTime*1.7)*.025}
  if(leftWing.current)leftWing.current.rotation.z=-.14-flap;
  if(rightWing.current)rightWing.current.rotation.z=.14+flap;
 });
 const feather=(side:number,index:number)=><mesh key={index} position={[side*(.12+index*.075),.02-index*.045,-.015-index*.018]} rotation={[0,0,side*(.28+index*.12)]} scale={[.105,.29-index*.018,.045]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color={index%2?'#f1eaff':'#fff7e8'} emissive={colors.glow} emissiveIntensity={.16} roughness={.82}/></mesh>;
 return <group ref={ref}>
  <group ref={pose}>
   <mesh position={[0,.04,0]} scale={[1,1.25,.72]}><coneGeometry args={[.19,.5,12]}/><meshStandardMaterial color="#e8ddf5" roughness={.8}/></mesh>
   <mesh position={[0,.25,.015]}><capsuleGeometry args={[.085,.18,5,10]}/><meshStandardMaterial color="#fff2df" roughness={.72}/></mesh>
   <mesh position={[0,.43,.035]}><sphereGeometry args={[.105,16,12]}/><meshStandardMaterial color="#f5d9c9" roughness={.85}/></mesh>
   <mesh position={[0,.47,.105]} scale={[.11,.09,.045]}><sphereGeometry args={[1,12,10]}/><meshStandardMaterial color="#b98b65" roughness={1}/></mesh>
   <mesh position={[0,.59,.025]} rotation={[Math.PI/2.15,0,0]}><torusGeometry args={[.145,.012,6,28]}/><meshBasicMaterial color="#fff0bd" transparent opacity={.9}/></mesh>
   <group ref={leftWing} position={[-.105,.23,-.045]}>{Array.from({length:5},(_,i)=>feather(-1,i))}</group>
   <group ref={rightWing} position={[.105,.23,-.045]}>{Array.from({length:5},(_,i)=>feather(1,i))}</group>
   {[-1,1].map(side=><mesh key={side} position={[side*.13,.13,.015]} rotation={[0,0,side*.5]}><capsuleGeometry args={[.025,.14,4,7]}/><meshStandardMaterial color="#f5e6d8" roughness={.85}/></mesh>)}
   <mesh position={[0,-.18,-.2]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[.065,.42,8]}/><meshBasicMaterial color={colors.glow} transparent opacity={.18}/></mesh>
  </group>
  <pointLight position={[0,.4,.12]} color={colors.glow} intensity={.42} distance={2.2}/>
 </group>;
}
function OtherAvatar({player,flightRef}:{player:RemotePlayer;flightRef:MutableRefObject<FlightState>}){
 const ref=useRef<Group>(null);const c=AVATAR_PALETTE[player.avatarId]??AVATAR_PALETTE.stardust;
 useFrame(()=>{if(ref.current)ref.current.position.set(player.position[0]-flightRef.current.position.x,player.position[1]-flightRef.current.position.y,player.position[2]-flightRef.current.position.z)});
 return <group ref={ref}><mesh position={[0,.2,0]}><capsuleGeometry args={[.11,.2,4,8]}/><meshStandardMaterial color={c.suit}/></mesh><mesh position={[0,.4,0]}><sphereGeometry args={[.11,14,12]}/><meshStandardMaterial color="#efd8c9"/></mesh><pointLight color={c.glow} intensity={.2} distance={1}/></group>;
}
function HomeSystemBeacon({flightRef}:{flightRef:MutableRefObject<FlightState>}){
 const ref=useRef<Group>(null);
 useFrame((state)=>{if(!ref.current)return;const p=flightRef.current.position;const distance=p.length();ref.current.visible=distance>75;if(distance>0.001){ref.current.position.set(-p.x/distance*46,-p.y/distance*46,-p.z/distance*46);ref.current.rotation.y=state.clock.elapsedTime*.08}});
 return <group ref={ref} visible={false}>
  <pointLight position={[0,0,0]} color="#ffd98b" intensity={1.5} distance={7}/>
  <mesh><sphereGeometry args={[.43,16,12]}/><meshBasicMaterial color="#ffd477"/></mesh>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.82,.012,4,48]}/><meshBasicMaterial color="#9bb8e9" transparent opacity={.72}/></mesh>
  <mesh position={[.78,0,0]}><sphereGeometry args={[.14,14,10]}/><meshBasicMaterial color="#3e9fe0"/></mesh>
  <mesh position={[.78,.025,0]} scale={[1.03,1.03,1.03]}><sphereGeometry args={[.14,14,10]}/><meshBasicMaterial color="#71c99c" wireframe transparent opacity={.55}/></mesh>
  <mesh position={[0,0,0]}><sphereGeometry args={[.56,12,8]}/><meshBasicMaterial color="#ffd477" transparent opacity={.08}/></mesh>
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
 const {camera}=useThree();const forward=new Vector3();const right=new Vector3();const desired=new Vector3();const look=new Vector3();const playerUp=new Vector3(0,1,0);const smoothedCameraUp=useRef(new Vector3(0,1,0));const previousTarget=useRef<string|null>(null);const sun=bodies.find(b=>b.id==='sun');
 useFrame((_s,delta)=>{
  const dt=Math.min(delta,.04),f=flightRef.current,i=inputRef.current,body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;
  const cruise=(i.boost?5.2:2.25),step=cruise*dt;
  if(!targetId)previousTarget.current=null;
  if(targetId){const target=bodies.find(b=>b.id===targetId);if(target){const center=new Vector3(...target.position),dir=center.clone().sub(f.position),distance=dir.length(),stop=target.radius+(target.landable ? 0.24 : 1.8);if(distance>stop){dir.normalize();const distanceSpeed=Math.min(34,2.8+distance*.24);const amount=Math.min(distanceSpeed*(i.boost?1.35:1)*dt,distance-stop);f.position.copy(moveAvoidingBodies(f.position,dir.multiplyScalar(amount),bodies,target.id));f.yaw=Math.atan2(dir.x,-dir.z);f.pitch=Math.asin(Math.max(-.95,Math.min(.95,dir.y)))}else if(previousTarget.current!==targetId){previousTarget.current=targetId;f.position.copy(center).addScaledVector(f.position.clone().sub(center).normalize(),stop);if(target.landable){f.groundedId=target.id;f.pitch=0}onArrive(targetId)}}}
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
   if(i.land){const nearest=bodies.filter(b=>b.landable).map(b=>({body:b,d:f.position.distanceTo(new Vector3(...b.position))})).sort((a,b)=>a.d-b.d)[0];if(nearest){if(nearest.d<=nearest.body.radius+2.6){const center=new Vector3(...nearest.body.position),normal=f.position.clone().sub(center).normalize();f.position.copy(center).addScaledVector(normal,nearest.body.radius+.24);f.groundedId=nearest.body.id;f.pitch=0;onArrive(nearest.body.id)}else{onLandRequest(nearest.body.id)}}i.land=false}
   i.takeoff=false;
  }
  const landedBody=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined;if(landedBody)playerUp.copy(f.position).sub(new Vector3(...landedBody.position)).normalize();else playerUp.set(0,1,0);
  forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();
  smoothedCameraUp.current.lerp(playerUp,1-Math.exp(-4.8*dt)).normalize();desired.copy(forward).multiplyScalar(-5.3).addScaledVector(smoothedCameraUp.current,2.25);
  camera.position.lerp(desired,1-Math.exp(-4.8*dt));camera.up.copy(smoothedCameraUp.current);look.copy(forward).multiplyScalar(2.3);camera.lookAt(look);
 });
 return <>
  <color attach="background" args={['#0a1a36']}/><ambientLight intensity={.38}/><hemisphereLight args={['#b8dcff','#55436f',.28]}/><pointLight position={sun?.position??[-15.6,0,0]} intensity={470} distance={260} decay={2} color="#fff1d2"/>
  <Stars/>{bodies.map(body=><Planet key={body.id} body={body} flightRef={flightRef}/>)}<HomeSystemBeacon flightRef={flightRef}/>{remotePlayers.map(player=><OtherAvatar key={player.id} player={player} flightRef={flightRef}/>)}<Avatar avatarId={avatarId} flightRef={flightRef} inputRef={inputRef} bodies={bodies}/>
 </>;
}

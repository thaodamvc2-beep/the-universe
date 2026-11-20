'use client';
import { useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BackSide, Group, Vector3 } from 'three';
import { AVATAR_PALETTE, type AvatarId, type Body } from './universe-data';

export type FlightState={position:Vector3;yaw:number;pitch:number;groundedId:string|null};
export type InputState=Record<'forward'|'back'|'left'|'right'|'up'|'down',boolean>&{land:boolean;takeoff:boolean;boost:boolean};
export type RemotePlayer={id:string;nickname:string;avatarId:AvatarId;position:[number,number,number]};

function Stars(){
 const positions=useMemo(()=>{const a=new Float32Array(3600*3);let seed=197903;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};for(let i=0;i<3600;i++){const r=24+rand()*360,t=rand()*Math.PI*2,p=Math.acos(2*rand()-1);a[i*3]=r*Math.sin(p)*Math.cos(t);a[i*3+1]=r*Math.cos(p);a[i*3+2]=r*Math.sin(p)*Math.sin(t)}return a},[]);
 return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color="#dce8ff" size={.11} sizeAttenuation transparent opacity={.88}/></points>;
}
function Planet({body}:{body:Body}){
 return <group position={body.position}>
  <mesh><sphereGeometry args={[body.radius,36,32]}/><meshStandardMaterial color={body.color} roughness={.9} emissive={body.id==='sun'?'#d97825':'#000000'} emissiveIntensity={body.id==='sun'?.8:0}/></mesh>
  {body.id==='earth'&&<mesh scale={1.035}><sphereGeometry args={[body.radius,32,24]}/><meshBasicMaterial color="#73c8ff" transparent opacity={.13} side={BackSide}/></mesh>}
  {body.id==='saturn'&&<mesh rotation={[Math.PI/2.25,0,0]}><torusGeometry args={[body.radius*1.55,body.radius*.22,5,72]}/><meshStandardMaterial color="#cdbb9c" transparent opacity={.78}/></mesh>}
  {!body.real&&<mesh scale={1.12}><sphereGeometry args={[body.radius,20,16]}/><meshBasicMaterial color="#d6c6ff" wireframe transparent opacity={.16}/></mesh>}
 </group>;
}
function Avatar({avatarId,flightRef,bodies}:{avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;bodies:Body[]}){
 const ref=useRef<Group>(null);const colors=AVATAR_PALETTE[avatarId]??AVATAR_PALETTE.stardust;
 const up=new Vector3(0,1,0);
 useFrame(()=>{if(!ref.current)return;const f=flightRef.current;ref.current.position.copy(f.position);ref.current.quaternion.setFromUnitVectors(up,new Vector3(0,1,0));if(f.groundedId){const body=bodies.find(b=>b.id===f.groundedId);if(body){const n=f.position.clone().sub(new Vector3(...body.position)).normalize();ref.current.quaternion.setFromUnitVectors(up,n)}}ref.current.rotateY(f.yaw)});
 return <group ref={ref}>
  <mesh position={[0,.19,0]} castShadow><capsuleGeometry args={[.105,.2,5,10]}/><meshStandardMaterial color={colors.suit}/></mesh>
  <mesh position={[0,.39,.015]} castShadow><sphereGeometry args={[.115,20,16]}/><meshStandardMaterial color="#f0d9c9"/></mesh>
  <mesh position={[0,.405,.108]}><sphereGeometry args={[.073,20,12]}/><meshStandardMaterial color={colors.trim}/></mesh>
  <mesh position={[0,.19,-.105]}><boxGeometry args={[.17,.19,.09]}/><meshStandardMaterial color={colors.trim}/></mesh>
  {[-1,1].map(s=><group key={s} position={[s*.14,.2,0]}><mesh rotation={[0,0,s*-.22]}><capsuleGeometry args={[.035,.14,4,8]}/><meshStandardMaterial color={colors.suit}/></mesh><mesh position={[0,-.17,.025]}><sphereGeometry args={[.045,12,10]}/><meshStandardMaterial color={colors.trim}/></mesh></group>)}
  {[-1,1].map(s=><mesh key={s} position={[s*.055,.035,0]}><capsuleGeometry args={[.04,.11,4,8]}/><meshStandardMaterial color={colors.suit}/></mesh>)}
  <pointLight position={[0,.46,.12]} color={colors.glow} intensity={.32} distance={.8}/>
 </group>;
}
function OtherAvatar({player}:{player:RemotePlayer}){
 const c=AVATAR_PALETTE[player.avatarId]??AVATAR_PALETTE.stardust;
 return <group position={player.position}><mesh position={[0,.2,0]}><capsuleGeometry args={[.11,.2,4,8]}/><meshStandardMaterial color={c.suit}/></mesh><mesh position={[0,.4,0]}><sphereGeometry args={[.11,14,12]}/><meshStandardMaterial color="#efd8c9"/></mesh><pointLight color={c.glow} intensity={.2} distance={1}/></group>;
}
export function FlightScene({bodies,avatarId,flightRef,inputRef,targetId,onArrive,remotePlayers}:{bodies:Body[];avatarId:AvatarId;flightRef:MutableRefObject<FlightState>;inputRef:MutableRefObject<InputState>;targetId:string|null;onArrive:(id:string)=>void;remotePlayers:RemotePlayer[]}){
 const {camera}=useThree();const forward=new Vector3();const right=new Vector3();const desired=new Vector3();const look=new Vector3();const playerUp=new Vector3(0,1,0);const previousTarget=useRef<string|null>(null);
 useFrame((_s,delta)=>{
  const dt=Math.min(delta,.045),f=flightRef.current,i=inputRef.current,body=f.groundedId?bodies.find(b=>b.id===f.groundedId):undefined,speed=(i.boost?18:7)*dt;
  if(!targetId)previousTarget.current=null;
  if(targetId){const target=bodies.find(b=>b.id===targetId);if(target){const dir=new Vector3(...target.position).sub(f.position),distance=dir.length(),stop=target.radius+3.4;if(distance>stop){dir.normalize();f.position.addScaledVector(dir,Math.min(speed*1.55,distance-stop));f.yaw=Math.atan2(dir.x,-dir.z);f.pitch=Math.asin(Math.max(-.95,Math.min(.95,dir.y)))}else if(previousTarget.current!==targetId){previousTarget.current=targetId;onArrive(targetId)}}}
  else if(body){
   const center=new Vector3(...body.position),normal=f.position.clone().sub(center).normalize();playerUp.copy(normal);
   forward.set(Math.sin(f.yaw),0,-Math.cos(f.yaw)).projectOnPlane(normal).normalize();if(forward.lengthSq()<.001)forward.set(1,0,0).projectOnPlane(normal).normalize();
   right.crossVectors(forward,normal).normalize();const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);
   if(move.lengthSq()>0){normal.addScaledVector(move.normalize(),speed/Math.max(.5,body.radius)).normalize();f.position.copy(center).addScaledVector(normal,body.radius+.19)}
   if(i.takeoff){f.groundedId=null;f.position.addScaledVector(normal,1.15);i.takeoff=false}i.land=false;
  }else{
   forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();right.set(Math.cos(f.yaw),0,Math.sin(f.yaw)).normalize();
   const move=new Vector3();if(i.forward)move.add(forward);if(i.back)move.sub(forward);if(i.right)move.add(right);if(i.left)move.sub(right);if(i.up)move.y+=1;if(i.down)move.y-=1;
   if(move.lengthSq()>0)f.position.addScaledVector(move.normalize(),speed);
   if(i.land){const nearest=bodies.filter(b=>b.landable).map(b=>({body:b,d:f.position.distanceTo(new Vector3(...b.position))})).sort((a,b)=>a.d-b.d)[0];if(nearest&&nearest.d<=nearest.body.radius+2.8){const center=new Vector3(...nearest.body.position),normal=f.position.clone().sub(center).normalize();f.position.copy(center).addScaledVector(normal,nearest.body.radius+.19);f.groundedId=nearest.body.id;onArrive(nearest.body.id)}i.land=false}
   i.takeoff=false;
  }
  if(!body)playerUp.set(0,1,0);
  forward.set(Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)).normalize();
  const cameraUp=f.groundedId?playerUp:new Vector3(0,1,0);desired.copy(f.position).addScaledVector(forward,-6.2).addScaledVector(cameraUp,2.6);
  camera.position.lerp(desired,1-Math.exp(-4.2*dt));camera.up.copy(cameraUp);look.copy(f.position).addScaledVector(forward,2.5);camera.lookAt(look);
 });
 return <>
  <color attach="background" args={['#040713']}/><ambientLight intensity={.72}/><directionalLight position={[-4,8,6]} intensity={2} color="#d9e9ff"/><pointLight position={[-30,0,0]} intensity={95} distance={95} color="#ffc27c"/>
  <Stars/>{bodies.map(body=><Planet key={body.id} body={body}/>)}{remotePlayers.map(player=><OtherAvatar key={player.id} player={player}/>)}<Avatar avatarId={avatarId} flightRef={flightRef} bodies={bodies}/>
 </>;
}

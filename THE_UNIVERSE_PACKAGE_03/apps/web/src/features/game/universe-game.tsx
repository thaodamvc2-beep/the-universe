'use client';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useSite } from '@/components/site-provider';
import { FlightScene, type FlightState, type InputState, type RemotePlayer } from './flight-scene';
import { makeProceduralRegion, REAL_DESTINATIONS, type AvatarId, type Body } from './universe-data';

export function UniverseGame(){
 const {language,setLanguage,guestIdentity}=useSite();
 const [contextLost,setContextLost]=useState(false),[sector,setSector]=useState(0),[proceduralBodies,setProceduralBodies]=useState<Body[]>(()=>makeProceduralRegion(0,0,0)),[selectedId,setSelectedId]=useState('mars'),[targetId,setTargetId]=useState<string|null>(null),[currentBodyId,setCurrentBodyId]=useState<string|null>('earth'),[audioEnabled,setAudioEnabled]=useState(false),[networkStatus,setNetworkStatus]=useState('Chưa kết nối máy chủ nhiều người chơi'),[remotePlayers,setRemotePlayers]=useState<RemotePlayer[]>([]),[showDestinations,setShowDestinations]=useState(false);
 const input=useRef<InputState>({forward:false,back:false,left:false,right:false,up:false,down:false,land:false,takeoff:false,boost:false});
 const flightRef=useRef<FlightState>({position:new Vector3(0,0,1.91),yaw:Math.PI/2,pitch:0,groundedId:'earth'});
 const drag=useRef({active:false,x:0,y:0});
 const avatarId=(guestIdentity?.avatarId??'stardust') as AvatarId;
 const nickname=guestIdentity?.nickname??(language==='vi'?'Người du hành':'Traveler');
 const bodies=useMemo(()=>[...REAL_DESTINATIONS,...proceduralBodies],[proceduralBodies]);
 const generatedKeys=useRef(new Set<string>(['0:0:0']));
 const selected=bodies.find(b=>b.id===selectedId)??REAL_DESTINATIONS[3];
 const current=bodies.find(b=>b.id===currentBodyId);
 const onArrive=useCallback((id:string)=>{setCurrentBodyId(id);setTargetId(null)},[]);

 useEffect(()=>{const timer=window.setInterval(()=>{const p=flightRef.current.position;if(p.length()<18)return;const cx=Math.floor(p.x/84),cy=Math.floor(p.y/84),cz=Math.floor(p.z/84);const additions:Body[]=[];for(let x=cx-1;x<=cx+1;x++)for(let y=cy-1;y<=cy+1;y++)for(let z=cz-1;z<=cz+1;z++){const key=[x,y,z].join(':');if(!generatedKeys.current.has(key)){generatedKeys.current.add(key);additions.push(...makeProceduralRegion(x,y,z))}}if(additions.length)setProceduralBodies(old=>[...old,...additions].slice(-180))},1200);return()=>window.clearInterval(timer)},[]);

 useEffect(()=>{
  const keys:Record<string,keyof Pick<InputState,'forward'|'back'|'left'|'right'|'up'|'down'>>={w:'forward',ArrowUp:'forward',s:'back',ArrowDown:'back',a:'left',ArrowLeft:'left',d:'right',ArrowRight:'right',' ':'up',Spacebar:'up',c:'down',Control:'down'};
  const down=(e:KeyboardEvent)=>{const el=e.target as HTMLElement|null;if(el&&['INPUT','TEXTAREA','SELECT'].includes(el.tagName))return;const key=keys[e.key];if(key){e.preventDefault();input.current[key]=true}if(e.key.toLowerCase()==='e'){e.preventDefault();input.current.land=true}if(e.key==='Shift')input.current.boost=true};
  const up=(e:KeyboardEvent)=>{const key=keys[e.key];if(key){e.preventDefault();input.current[key]=false}if(e.key==='Shift')input.current.boost=false};
  const clear=()=>{input.current={forward:false,back:false,left:false,right:false,up:false,down:false,land:false,takeoff:false,boost:false}};
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',clear);
  return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',clear)};
 },[]);

 useEffect(()=>{
  if(!audioEnabled)return;
  const ctx=new AudioContext(),master=ctx.createGain(),filter=ctx.createBiquadFilter();
  master.gain.value=.045;filter.type='lowpass';filter.frequency.value=480;filter.connect(master);master.connect(ctx.destination);
  const tones=currentBodyId==='earth'?[55,82.41,110]:currentBodyId==='mars'?[43,64,96]:currentBodyId==='moon'?[65.4,98,130.8]:[49,73.4,98];const oscs=tones.map((hz,i)=>{const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=i===1?'triangle':'sine';osc.frequency.value=hz;gain.gain.value=i===1?.22:.13;osc.connect(gain);gain.connect(filter);osc.start();return osc});
  void ctx.resume();return()=>{oscs.forEach(o=>o.stop());void ctx.close()};
 },[audioEnabled,currentBodyId]);

 useEffect(()=>{
  const endpoint=process.env.NEXT_PUBLIC_UNIVERSE_REALTIME_URL;if(!endpoint)return;
  let socket:WebSocket;
  try{
   socket=new WebSocket(endpoint);
   socket.onopen=()=>{setNetworkStatus('Đã kết nối máy chủ · đang đồng bộ');socket.send(JSON.stringify({type:'join',player:{id:guestIdentity?.guestId??'guest',nickname,avatarId}}))};
   socket.onmessage=e=>{try{const msg=JSON.parse(String(e.data)) as {type?:string;players?:RemotePlayer[]};if(msg.type==='players'&&Array.isArray(msg.players))setRemotePlayers(msg.players.filter(p=>p.id!==(guestIdentity?.guestId??'guest')))}catch{/* Ignore malformed realtime messages. */}};
   socket.onerror=()=>setNetworkStatus('Không thể kết nối máy chủ nhiều người chơi');
   socket.onclose=()=>setNetworkStatus('Máy chủ nhiều người chơi đã ngắt kết nối');
   const heartbeat=window.setInterval(()=>{if(socket.readyState===WebSocket.OPEN)socket.send(JSON.stringify({type:'state',player:{id:guestIdentity?.guestId??'guest',nickname,avatarId,position:flightRef.current.position.toArray()}}))},180);
   return()=>{window.clearInterval(heartbeat);if(socket.readyState===WebSocket.OPEN)socket.send(JSON.stringify({type:'leave',id:guestIdentity?.guestId??'guest'}));socket.close()};
  }catch{setNetworkStatus('Không thể khởi tạo kết nối nhiều người chơi')}
 },[avatarId,guestIdentity?.guestId,nickname]);

 const resetHome=()=>{flightRef.current.position.set(0,0,1.91);flightRef.current.yaw=Math.PI/2;flightRef.current.pitch=0;flightRef.current.groundedId='earth';setCurrentBodyId('earth');setTargetId(null);input.current={forward:false,back:false,left:false,right:false,up:false,down:false,land:false,takeoff:false,boost:false}};
 const takeoff=()=>{if(flightRef.current.groundedId){const b=bodies.find(x=>x.id===flightRef.current.groundedId);if(b){const n=flightRef.current.position.clone().sub(new Vector3(...b.position)).normalize();flightRef.current.position.addScaledVector(n,.9)}flightRef.current.groundedId=null;setCurrentBodyId(null)}input.current.takeoff=true};
 const setDirection=(key:keyof Pick<InputState,'forward'|'back'|'left'|'right'|'up'|'down'>,active:boolean)=>{input.current[key]=active};
 const onPointerDown=(e:ReactPointerEvent<HTMLDivElement>)=>{drag.current={active:true,x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId)};
 const onPointerMove=(e:ReactPointerEvent<HTMLDivElement>)=>{if(!drag.current.active)return;const dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y;drag.current.x=e.clientX;drag.current.y=e.clientY;flightRef.current.yaw-=dx*.004;flightRef.current.pitch=Math.max(-1.25,Math.min(1.25,flightRef.current.pitch-dy*.003))};
 const onPointerUp=()=>{drag.current.active=false};
 const flyTo=()=>{if(selected.id!==flightRef.current.groundedId){if(flightRef.current.groundedId){const landed=bodies.find(b=>b.id===flightRef.current.groundedId);if(landed){const normal=flightRef.current.position.clone().sub(new Vector3(...landed.position)).normalize();flightRef.current.position.addScaledVector(normal,.9)}flightRef.current.groundedId=null;setCurrentBodyId(null)}setTargetId(selected.id);setShowDestinations(false)}};
 const newSector=()=>{const p=flightRef.current.position.clone();const cx=Math.floor(p.x/84)+sector+1,cy=Math.floor(p.y/84),cz=Math.floor(p.z/84);const key=[cx,cy,cz].join(':');if(!generatedKeys.current.has(key)){generatedKeys.current.add(key);const base=new Vector3(cx*84,cy*84,cz*84);const nearby=makeProceduralRegion(cx,cy,cz).map(b=>({...b,position:[p.x+b.position[0]-base.x,p.y+b.position[1]-base.y,p.z+b.position[2]-base.z] as [number,number,number]}));setProceduralBodies(old=>[...old,...nearby].slice(-180))}setSector(s=>s+1);setShowDestinations(false)};

 return <main id="main-content" className="universe-game universe-explorer">
  <div className="game-canvas" aria-label="Vũ trụ 3D có thể bay và khám phá" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
   {!contextLost?<Canvas camera={{position:[0,2.6,8],fov:48}} dpr={[1,1.4]} gl={{antialias:false,alpha:false,powerPreference:'low-power'}} onCreated={({gl})=>gl.domElement.addEventListener('webglcontextlost',()=>setContextLost(true),{once:true})} fallback={<div className="game-fallback">Thiết bị chưa hỗ trợ cảnh 3D.</div>}><Suspense fallback={null}><FlightScene bodies={bodies} avatarId={avatarId} flightRef={flightRef} inputRef={input} targetId={targetId} onArrive={onArrive} remotePlayers={remotePlayers}/></Suspense></Canvas>:<div className="game-fallback">Cảnh 3D tạm dừng do thiết bị thiếu bộ nhớ đồ họa.</div>}
  </div>
  <div className="game-vignette" aria-hidden="true"/>
  <header className="game-topbar"><Link className="game-brand" href="/">✦ THE UNIVERSE</Link><nav className="game-nav"><button type="button" onClick={()=>setShowDestinations(v=>!v)}>Điểm đến</button><Link href="/map">Bản đồ</Link><Link href="/worlds">Thiên thể</Link><Link href="/avatar">Avatar</Link><button className="game-language" type="button" onClick={()=>setLanguage(language==='vi'?'en':'vi')}>{language.toUpperCase()}</button></nav></header>
  <section className="game-identity"><span className="game-eyebrow">{current?.name.toUpperCase()??'KHÔNG GIAN SÂU'}</span><h1>{language==='vi'?'Ngắm nhìn vũ trụ rộng mở':'A universe waiting to be explored'}</h1><p>{language==='vi'?'Bay chậm rãi, khám phá từng thế giới và ngắm vũ trụ từ vị trí của bạn.':'Drift slowly, visit distant worlds and see the cosmos from your own position.'}</p></section>
  <div className="game-player"><span className={`avatar-portrait avatar-${avatarId} game-player-avatar`}/><span><small>NGƯỜI ĐANG DU HÀNH</small><strong>{nickname}</strong></span><Link href="/avatar">↗</Link></div>
  <div className="explorer-status"><span>{flightRef.current.groundedId?'ĐANG Ở TRÊN BỀ MẶT':'ĐANG BAY / QUỸ ĐẠO'}</span><strong>{current?.name??'Không gian'}</strong><small>{networkStatus}</small></div>
  {showDestinations&&<aside className="destination-panel"><div className="destination-panel-head"><strong>Chọn điểm đến</strong><button type="button" onClick={()=>setShowDestinations(false)}>×</button></div><div className="destination-list">{bodies.map(b=><button key={b.id} type="button" className={selectedId===b.id?'destination-selected':''} onClick={()=>setSelectedId(b.id)}><i className={b.real?'real-dot':'imagined-dot'}/><span><strong>{b.name}</strong><small>{b.kind}</small></span></button>)}</div><div className="destination-detail"><strong>{selected.name}</strong><p>{selected.description}</p><small>{selected.real?'THIÊN THỂ THỰC · DỮ LIỆU THAM KHẢO':'THẾ GIỚI HƯ CẤU · PROCEDURAL'}</small><button type="button" onClick={flyTo}>Bay tới đây ↗</button>{selected.sourceUrl&&<a href={selected.sourceUrl} target="_blank" rel="noreferrer">Nguồn tham khảo</a>}</div></aside>}
  <div className="game-controls explorer-controls"><div className="game-control-copy"><strong>Điều khiển phi hành gia</strong><span>WASD · Space / C · Shift · E · Kéo chuột để nhìn</span></div><div className="game-dpad"><button className="dpad-up" type="button" onPointerDown={()=>setDirection('forward',true)} onPointerUp={()=>setDirection('forward',false)} onPointerLeave={()=>setDirection('forward',false)}>↑</button><button className="dpad-left" type="button" onPointerDown={()=>setDirection('left',true)} onPointerUp={()=>setDirection('left',false)} onPointerLeave={()=>setDirection('left',false)}>←</button><button className="dpad-down" type="button" onPointerDown={()=>setDirection('back',true)} onPointerUp={()=>setDirection('back',false)} onPointerLeave={()=>setDirection('back',false)}>↓</button><button className="dpad-right" type="button" onPointerDown={()=>setDirection('right',true)} onPointerUp={()=>setDirection('right',false)} onPointerLeave={()=>setDirection('right',false)}>→</button></div><div className="flight-vertical"><button type="button" onPointerDown={()=>setDirection('up',true)} onPointerUp={()=>setDirection('up',false)} onPointerLeave={()=>setDirection('up',false)}>↑ Lên</button><button type="button" onPointerDown={()=>setDirection('down',true)} onPointerUp={()=>setDirection('down',false)} onPointerLeave={()=>setDirection('down',false)}>↓ Xuống</button></div></div>
  <div className="game-bottom-actions explorer-actions"><button type="button" onClick={takeoff}>↑ Cất cánh / Bay</button><button type="button" onClick={()=>input.current.land=true}>⌄ Hạ cánh (E)</button><button type="button" onClick={resetHome}>⌖ Trở về Trái Đất</button><button type="button" onClick={()=>setAudioEnabled(v=>!v)}>{audioEnabled?'♫ Tắt âm thanh':'♫ Bật âm thanh'}</button></div>
  <aside className="universe-expansion"><strong>Không gian vô tận</strong><span>{proceduralBodies.length} thế giới hư cấu đã sinh bằng thuật toán</span><div><button type="button" onClick={newSector}>＋ Mở vùng không gian mới</button></div><small>Cảnh vật được sinh trực tiếp trên thiết bị theo tọa độ bay.</small></aside>
  <aside className="multiplayer-indicator"><i className={remotePlayers.length?'online-dot':'offline-dot'}/>{remotePlayers.length?'Có người chơi khác trong khu vực':'Multiplayer: chờ máy chủ đồng bộ'}</aside>
 </main>;
}

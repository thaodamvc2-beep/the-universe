'use client';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useSite } from '@/components/site-provider';
import { CelestialAvatarArtwork } from '@/components/celestial-avatar-artwork';
import { FlightScene, type FlightState, type InputState, type RemotePlayer } from './flight-scene';
import { makeProceduralRegion, REAL_DESTINATIONS, type AvatarId, type Body } from './universe-data';
import { AVATAR_OPTIONS } from '@/lib/identity/guest-identity.mjs';

export function UniverseGame(){
 const {language,setLanguage,guestIdentity,updateGuestIdentity}=useSite();
 const [contextLost,setContextLost]=useState(false),[showAvatarChooser,setShowAvatarChooser]=useState(false),[showMenu,setShowMenu]=useState(false),[showSettings,setShowSettings]=useState(false),[resting,setResting]=useState(false),[hudTick,setHudTick]=useState(0),[draftAvatar,setDraftAvatar]=useState<AvatarId>((guestIdentity?.avatarId??'stardust') as AvatarId),[sector,setSector]=useState(0),[proceduralBodies,setProceduralBodies]=useState<Body[]>(()=>makeProceduralRegion(0,0,0)),[selectedId,setSelectedId]=useState('mars'),[targetId,setTargetId]=useState<string|null>(null),[currentBodyId,setCurrentBodyId]=useState<string|null>('earth'),[audioEnabled,setAudioEnabled]=useState(false),[ ,setNetworkStatus]=useState('Chưa kết nối máy chủ nhiều người chơi'),[remotePlayers,setRemotePlayers]=useState<RemotePlayer[]>([]),[showDestinations,setShowDestinations]=useState(false);
 const input=useRef<InputState>({forward:false,back:false,left:false,right:false,up:false,down:false,land:false,takeoff:false,boost:false,resting:false});
 const flightRef=useRef<FlightState>({position:new Vector3(0,0,1.91),yaw:Math.PI/2,pitch:0,groundedId:'earth'});
 const drag=useRef({active:false,x:0,y:0});
 const avatarId=(guestIdentity?.avatarId??'stardust') as AvatarId;
 useEffect(()=>{if(guestIdentity)setDraftAvatar(guestIdentity.avatarId as AvatarId)},[guestIdentity?.avatarId]);
 const confirmAvatar=()=>{if(guestIdentity)updateGuestIdentity({avatarId:draftAvatar,nickname:guestIdentity.nickname});setShowAvatarChooser(false)};
 const nickname=guestIdentity?.nickname??(language==='vi'?'Người du hành':'Traveler');
 const bodies=useMemo(()=>[...REAL_DESTINATIONS,...proceduralBodies],[proceduralBodies]);
 const generatedKeys=useRef(new Set<string>(['0:0:0']));
 const selected=bodies.find(b=>b.id===selectedId)??REAL_DESTINATIONS[3];
 const current=bodies.find(b=>b.id===currentBodyId);
 const livePosition=flightRef.current.position;
 const onArrive=useCallback((id:string)=>{setCurrentBodyId(id);setTargetId(null)},[]);

 useEffect(()=>{const timer=window.setInterval(()=>setHudTick(v=>v+1),180);return()=>window.clearInterval(timer)},[]);
 useEffect(()=>{const timer=window.setInterval(()=>{const p=flightRef.current.position;if(p.length()<18)return;const cx=Math.floor(p.x/150),cy=Math.floor(p.y/150),cz=Math.floor(p.z/150);const additions:Body[]=[];for(let x=cx-1;x<=cx+1;x++)for(let y=cy-1;y<=cy+1;y++)for(let z=cz-1;z<=cz+1;z++){if(x===0&&y===0&&z===0)continue;const key=[x,y,z].join(':');if(!generatedKeys.current.has(key)){generatedKeys.current.add(key);additions.push(...makeProceduralRegion(x,y,z))}}if(additions.length)setProceduralBodies(old=>[...old,...additions].slice(-180))},1200);return()=>window.clearInterval(timer)},[]);

 useEffect(()=>{
  const keys:Record<string,keyof Pick<InputState,'forward'|'back'|'left'|'right'|'up'|'down'>>={w:'forward',ArrowUp:'forward',s:'back',ArrowDown:'back',a:'left',ArrowLeft:'left',d:'right',ArrowRight:'right',' ':'up',Spacebar:'up',c:'down',Control:'down'};
  const down=(e:KeyboardEvent)=>{const el=e.target as HTMLElement|null;if(el&&['INPUT','TEXTAREA','SELECT'].includes(el.tagName))return;const key=keys[e.key];if(key){e.preventDefault();input.current[key]=true}if(e.key.toLowerCase()==='e'){e.preventDefault();input.current.land=true}const lookKey=e.key.toLowerCase();if(lookKey==='j')flightRef.current.yaw+=.075;if(lookKey==='l')flightRef.current.yaw-=.075;if(lookKey==='i')flightRef.current.pitch=Math.min(1.25,flightRef.current.pitch+.055);if(lookKey==='k')flightRef.current.pitch=Math.max(-1.25,flightRef.current.pitch-.055);if(['j','l','i','k'].includes(lookKey))e.preventDefault();if(e.key==='Shift')input.current.boost=true};
  const up=(e:KeyboardEvent)=>{const key=keys[e.key];if(key){e.preventDefault();input.current[key]=false}if(e.key==='Shift')input.current.boost=false};
  const clear=()=>{input.current={forward:false,back:false,left:false,right:false,up:false,down:false,land:false,takeoff:false,boost:false,resting:false}};
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

 const resetHome=()=>{flightRef.current.position.set(0,0,1.91);flightRef.current.yaw=Math.PI/2;flightRef.current.pitch=0;flightRef.current.groundedId='earth';setCurrentBodyId('earth');setTargetId(null);setResting(false);input.current={forward:false,back:false,left:false,right:false,up:false,down:false,land:false,takeoff:false,boost:false,resting:false}};
 const takeoff=()=>{setResting(false);input.current.resting=false;if(flightRef.current.groundedId){const b=bodies.find(x=>x.id===flightRef.current.groundedId);if(b){const n=flightRef.current.position.clone().sub(new Vector3(...b.position)).normalize();flightRef.current.position.addScaledVector(n,.9)}flightRef.current.groundedId=null;setCurrentBodyId(null)}input.current.takeoff=true};
 const setDirection=(key:keyof Pick<InputState,'forward'|'back'|'left'|'right'|'up'|'down'>,active:boolean)=>{input.current[key]=active};
 const onPointerDown=(e:ReactPointerEvent<HTMLDivElement>)=>{drag.current={active:true,x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId)};
 const onPointerMove=(e:ReactPointerEvent<HTMLDivElement>)=>{if(!drag.current.active)return;const dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y;drag.current.x=e.clientX;drag.current.y=e.clientY;flightRef.current.yaw-=dx*.004;flightRef.current.pitch=Math.max(-1.25,Math.min(1.25,flightRef.current.pitch-dy*.003))};
 const onPointerUp=()=>{drag.current.active=false};
 const flyTo=()=>{if(selected.id!==flightRef.current.groundedId){if(flightRef.current.groundedId){const landed=bodies.find(b=>b.id===flightRef.current.groundedId);if(landed){const normal=flightRef.current.position.clone().sub(new Vector3(...landed.position)).normalize();flightRef.current.position.addScaledVector(normal,.9)}flightRef.current.groundedId=null;setCurrentBodyId(null)}setTargetId(selected.id);setShowDestinations(false)}};
 const newSector=()=>{const p=flightRef.current.position.clone();const cx=Math.floor(p.x/150)+sector+1,cy=Math.floor(p.y/150),cz=Math.floor(p.z/150);const key=[cx,cy,cz].join(':');if(!generatedKeys.current.has(key)){generatedKeys.current.add(key);const base=new Vector3(cx*150,cy*150,cz*150);const nearby=makeProceduralRegion(cx,cy,cz).map(b=>({...b,position:[p.x+b.position[0]-base.x,p.y+b.position[1]-base.y,p.z+b.position[2]-base.z] as [number,number,number]}));setProceduralBodies(old=>[...old,...nearby].slice(-180))}setSector(s=>s+1);setShowDestinations(false)};

 return <main id="main-content" className="universe-game universe-explorer" data-hud-frame={hudTick}>
  <div className="game-canvas" aria-label="Vũ trụ 3D có thể bay và khám phá" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
   {!contextLost?<Canvas camera={{position:[0,2.6,8],fov:48}} dpr={[1,1.4]} gl={{antialias:false,alpha:false,powerPreference:'low-power'}} onCreated={({gl})=>gl.domElement.addEventListener('webglcontextlost',()=>setContextLost(true),{once:true})} fallback={<div className="game-fallback">Thiết bị chưa hỗ trợ cảnh 3D.</div>}><Suspense fallback={null}><FlightScene bodies={bodies} avatarId={avatarId} flightRef={flightRef} inputRef={input} targetId={targetId} onArrive={onArrive} onLandRequest={setTargetId} remotePlayers={remotePlayers}/></Suspense></Canvas>:<div className="game-fallback">Cảnh 3D tạm dừng do thiết bị thiếu bộ nhớ đồ họa.</div>}
  </div>
  <div className="game-vignette" aria-hidden="true"/>
  <header className="game-topbar"><Link className="game-brand" href="/">✦ THE UNIVERSE</Link><button className="game-fullscreen" type="button" aria-label="Toggle fullscreen" onClick={()=>{if(document.fullscreenElement)void document.exitFullscreen();else void document.documentElement.requestFullscreen()}}>⛶</button><nav className="game-nav"><button type="button" onClick={()=>setShowDestinations(v=>!v)}>Điểm đến</button><Link href="/map">Bản đồ</Link><Link href="/worlds">Thiên thể</Link><Link href="/avatar">Avatar</Link><button className="game-language" type="button" onClick={()=>setLanguage(language==='vi'?'en':'vi')}>{language.toUpperCase()}</button></nav></header>

  <div className="cosmic-location-pill" aria-live="polite"><span>✦</span><div><strong>{current?.name??'Deep Space'}</strong><small>{livePosition.x.toFixed(1)} · {livePosition.y.toFixed(1)} · {livePosition.z.toFixed(1)}</small></div></div>
  <div className="cosmic-compass" aria-label="La bàn định hướng"><span style={{transform:`rotate(${-flightRef.current.yaw}rad)`}}>▲</span><i/></div>
  <section className="game-identity" aria-hidden="true"><span className="game-eyebrow">{current?.name.toUpperCase()??'KHÔNG GIAN SÂU'}</span><h1>{language==='vi'?'Ngắm nhìn vũ trụ rộng mở':'A universe waiting to be explored'}</h1><p>{language==='vi'?'Bay chậm rãi, khám phá từng thế giới và ngắm vũ trụ từ vị trí của bạn.':'Drift slowly, visit distant worlds and see the cosmos from your own position.'}</p></section>

  {showAvatarChooser&&<div className="cosmic-avatar-overlay"><section className="cosmic-avatar-panel" aria-label="Choose your avatar"><div className="cosmic-panel-ornament">✧</div><div className="cosmic-panel-heading"><span>✦ CELESTIAL GUARDIANS</span><h2>{language==='vi'?'Chọn thiên thần hộ mệnh':'Choose Your Avatar'}</h2><p>{language==='vi'?'Chọn người đồng hành cùng bạn giữa các vì sao':'Select your celestial guardian'}</p></div><div className="cosmic-avatar-grid">{AVATAR_OPTIONS.map((item,index)=><button key={item.id} type="button" className={`cosmic-avatar-choice ${draftAvatar===item.id?'is-selected':''}`} aria-pressed={draftAvatar===item.id} onClick={()=>setDraftAvatar(item.id as AvatarId)}><CelestialAvatarArtwork avatarId={item.id} className="cosmic-choice-art"/><span>{item.id[0].toUpperCase()+item.id.slice(1)}</span><small>{index<3?(language==='vi'?'THIÊN THẦN NAM':'MALE ANGEL'):(language==='vi'?'THIÊN THẦN NỮ':'FEMALE ANGEL')}</small></button>)}</div><div className="cosmic-panel-actions"><button type="button" className="cosmic-confirm" onClick={confirmAvatar}>✦ {language==='vi'?'Xác nhận lựa chọn':'Confirm Selection'}</button><button type="button" className="cosmic-back" onClick={()=>setShowAvatarChooser(false)}>{language==='vi'?'Quay lại':'Back'}</button></div></section><div className="cosmic-avatar-stage"><div className="cosmic-stage-halo"/><CelestialAvatarArtwork avatarId={draftAvatar} className="cosmic-stage-art"/><span>{language==='vi'?'HỘ VỆ TINH TÚ':'CELESTIAL GUARDIAN'}</span><strong>{draftAvatar.toUpperCase()}</strong></div></div>}
  <div className="game-player"><CelestialAvatarArtwork avatarId={avatarId} className="avatar-portrait game-player-avatar"/><span><small>NGƯỜI ĐANG DU HÀNH</small><strong>{nickname}</strong></span><button type="button" className="game-avatar-edit" onClick={()=>{setDraftAvatar(avatarId);setShowAvatarChooser(true)}} aria-label="Change avatar">✦</button></div>

  {showDestinations&&<aside className="destination-panel"><div className="destination-panel-head"><strong>Chọn điểm đến</strong><button type="button" onClick={()=>setShowDestinations(false)}>×</button></div><div className="destination-list">{bodies.map(b=><button key={b.id} type="button" className={selectedId===b.id?'destination-selected':''} onClick={()=>setSelectedId(b.id)}><i className={b.real?'real-dot':'imagined-dot'}/><span><strong>{b.name}</strong><small>{b.kind}</small></span></button>)}</div><div className="destination-detail"><strong>{selected.name}</strong><p>{selected.description}</p><small>{selected.real?'THIÊN THỂ THỰC · DỮ LIỆU THAM KHẢO':'THẾ GIỚI HƯ CẤU · PROCEDURAL'}</small><button type="button" onClick={flyTo}>Bay tới đây ↗</button>{selected.sourceUrl&&<a href={selected.sourceUrl} target="_blank" rel="noreferrer">Nguồn tham khảo</a>}</div></aside>}
  <div className="game-controls explorer-controls"><div className="game-control-copy"><strong>Điều khiển</strong><span>WASD / joystick · kéo màn hình để xoay góc nhìn · Shift tăng tốc</span></div><div className="game-dpad cosmic-joystick"><button className="dpad-up" type="button" aria-label="Move forward" onPointerDown={()=>setDirection('forward',true)} onPointerUp={()=>setDirection('forward',false)} onPointerLeave={()=>setDirection('forward',false)} onPointerCancel={()=>setDirection('forward',false)}>▲</button><button className="dpad-left" type="button" aria-label="Move left" onPointerDown={()=>setDirection('left',true)} onPointerUp={()=>setDirection('left',false)} onPointerLeave={()=>setDirection('left',false)} onPointerCancel={()=>setDirection('left',false)}>◀</button><button className="dpad-down" type="button" aria-label="Move backward" onPointerDown={()=>setDirection('back',true)} onPointerUp={()=>setDirection('back',false)} onPointerLeave={()=>setDirection('back',false)} onPointerCancel={()=>setDirection('back',false)}>▼</button><button className="dpad-right" type="button" aria-label="Move right" onPointerDown={()=>setDirection('right',true)} onPointerUp={()=>setDirection('right',false)} onPointerLeave={()=>setDirection('right',false)} onPointerCancel={()=>setDirection('right',false)}>▶</button></div><div className="flight-vertical"><button type="button" onPointerDown={()=>setDirection('up',true)} onPointerUp={()=>setDirection('up',false)} onPointerLeave={()=>setDirection('up',false)} onPointerCancel={()=>setDirection('up',false)}>↑ Lên</button><button type="button" onPointerDown={()=>setDirection('down',true)} onPointerUp={()=>setDirection('down',false)} onPointerLeave={()=>setDirection('down',false)} onPointerCancel={()=>setDirection('down',false)}>↓ Xuống</button></div></div>
  <div className="game-bottom-actions explorer-actions cosmic-action-dock"><button type="button" onClick={()=>input.current.land=true}><span>⌄</span><small>Land</small></button><button type="button" disabled={!flightRef.current.groundedId} aria-pressed={resting} onClick={()=>{setResting(true);input.current.resting=true;input.current.forward=false;input.current.back=false;input.current.left=false;input.current.right=false}}><span>❀</span><small>Sit</small></button><button type="button" onClick={()=>setDirection('forward',true)} onPointerUp={()=>setDirection('forward',false)} onPointerLeave={()=>setDirection('forward',false)}><span>➤</span><small>Walk</small></button><button type="button" onClick={takeoff}><span>🪽</span><small>Fly</small></button><button type="button" aria-expanded={showMenu} onClick={()=>setShowMenu(v=>!v)}><span>▦</span><small>Menu</small></button></div><div className="cosmic-utility-rail"><button type="button" aria-label="Toggle ambient sound" onClick={()=>setAudioEnabled(v=>!v)}>{audioEnabled?'♫':'◖))'}</button><button type="button" aria-label="Settings" onClick={()=>setShowSettings(v=>!v)}>⚙</button><button type="button" aria-label="Return to Earth" onClick={resetHome}>⌂</button></div><aside className="cosmic-menu-panel" hidden={!showMenu} aria-label="Menu khám phá">
<div className="cosmic-menu-heading"><strong>{language==='vi'?'Khám phá vũ trụ':'Explore the universe'}</strong><button type="button" onClick={()=>setShowMenu(false)} aria-label="Đóng menu">×</button></div>
<button type="button" onClick={()=>{setShowDestinations(true);setShowMenu(false)}}>✦ {language==='vi'?'Chọn hành tinh / điểm đến':'Choose destination'}</button>
<button type="button" onClick={()=>{setDraftAvatar(avatarId);setShowAvatarChooser(true);setShowMenu(false)}}>❀ {language==='vi'?'Đổi thiên thần':'Change angel'}</button>
<button type="button" onClick={()=>{resetHome();setShowMenu(false)}}>⌂ {language==='vi'?'Trở về Trái Đất':'Return to Earth'}</button>
<button type="button" onClick={()=>{newSector();setShowMenu(false)}}>✧ {language==='vi'?'Mở vùng vũ trụ mới':'Discover a new region'}</button>
<Link href="/map">◉ {language==='vi'?'Bản đồ vũ trụ':'Universe map'}</Link><Link href="/worlds">☼ {language==='vi'?'Danh mục thiên thể':'Celestial catalogue'}</Link><Link href="/avatar">✧ {language==='vi'?'Chỉnh sửa avatar':'Avatar editor'}</Link>
<button type="button" onClick={()=>setLanguage(language==='vi'?'en':'vi')}>文 {language==='vi'?'English':'Tiếng Việt'}</button>
<small>{nickname} · {proceduralBodies.length} {language==='vi'?'thế giới hư cấu đã được tạo':'fictional worlds generated locally'}</small></aside>
<aside className="cosmic-settings-panel" hidden={!showSettings} aria-label="Cài đặt">
<div className="cosmic-menu-heading"><strong>{language==='vi'?'Cài đặt':'Settings'}</strong><button type="button" onClick={()=>setShowSettings(false)} aria-label="Đóng cài đặt">×</button></div>
<button type="button" onClick={()=>setAudioEnabled(v=>!v)}>{audioEnabled?'♫':'◖))'} {language==='vi'?(audioEnabled?'Tắt âm thanh':'Bật âm thanh'):(audioEnabled?'Mute ambience':'Enable ambience')}</button>
<small>{language==='vi'?'Kéo chuột hoặc vuốt màn hình để xoay góc nhìn. WASD để di chuyển; Space/C để lên xuống.':'Drag to look. WASD to move; Space/C for altitude.'}</small></aside>
</main>;
}

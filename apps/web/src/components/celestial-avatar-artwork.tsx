'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';

const positions: Record<AvatarId,{x:number;y:number}> = {
 stardust:{x:0,y:0}, lunar:{x:1,y:0}, nebula:{x:2,y:0},
 crystal:{x:0,y:1}, aurora:{x:1,y:1}, solar:{x:2,y:1}
};

const SPRITE_URL = '/the-universe/avatars/celestial-six.webp';

export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}) {
 const [imageFailed,setImageFailed]=useState(false);
 const cell=positions[avatarId]??positions.stardust;
 const imageStyle:CSSProperties={
  position:'absolute',display:'block',maxWidth:'none',
  width:'300%',height:'200%',left:`-${cell.x*100}%`,top:`-${cell.y*100}%`,
  userSelect:'none',pointerEvents:'none',mixBlendMode:'screen'
 };
 const wrapperStyle:CSSProperties={
  display:'block',position:'relative',isolation:'auto',overflow:'hidden',
  width:'100%',height:'100%',minWidth:0,mixBlendMode:'normal',pointerEvents:'none'
 };
 return <span className={'celestial-avatar-artwork '+className} role="img" aria-label={avatarId+' celestial angel'} style={wrapperStyle}>
  {!imageFailed
   ? <img src={SPRITE_URL} alt="" aria-hidden="true" draggable={false} loading="eager" decoding="async" onError={()=>setImageFailed(true)} style={imageStyle}/>
   : <span className="celestial-avatar-fallback" aria-hidden="true"><span>✧</span><b>🪽</b></span>}
 </span>;
}

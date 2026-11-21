'use client';
import type { CSSProperties } from 'react';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';

const positions: Record<AvatarId,{x:number;y:number}> = {
 stardust:{x:0,y:0}, lunar:{x:1,y:0}, nebula:{x:2,y:0},
 crystal:{x:0,y:1}, aurora:{x:1,y:1}, solar:{x:2,y:1}
};
export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}) {
 const cell=positions[avatarId]??positions.stardust;
 const style:CSSProperties={
  position:'absolute',width:'300%',height:'200%',maxWidth:'none',
  left:`-${cell.x*100}%`,top:`-${cell.y*100}%`,
  objectFit:'fill',mixBlendMode:'screen',pointerEvents:'none'
 };
 return <span className={'celestial-avatar-artwork '+className} role="img" aria-label={avatarId+' celestial angel'} style={{display:'block',position:'relative',overflow:'hidden',width:'100%',height:'100%',minWidth:0}}>
  <img src="/the-universe/avatars/celestial-six.webp" alt="" aria-hidden="true" draggable={false} style={style}/>
 </span>;
}

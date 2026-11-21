'use client';

import type { CSSProperties } from 'react';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';

const positions: Record<AvatarId,{x:number;y:number}> = {
 stardust:{x:0,y:0}, lunar:{x:1,y:0}, nebula:{x:2,y:0},
 crystal:{x:0,y:1}, aurora:{x:1,y:1}, solar:{x:2,y:1}
};

// The newer celestial-six.webp atlas is truncated by one byte; browsers reject it.
// This complete six-portrait atlas keeps the same 3x2 layout.
const SPRITE_URL = '/the-universe/avatars/celestial-avatars.webp';

export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}) {
 const cell=positions[avatarId]??positions.stardust;
 const style:CSSProperties={
  display:'block',position:'relative',width:'100%',height:'100%',minWidth:0,
  overflow:'hidden',backgroundImage:`url('${SPRITE_URL}')`,backgroundRepeat:'no-repeat',
  backgroundSize:'300% 200%',backgroundPosition:`${cell.x*50}% ${cell.y*100}%`,
  mixBlendMode:'screen',pointerEvents:'none'
 };
 return <span className={'celestial-avatar-artwork '+className} role="img" aria-label={avatarId+' celestial angel'} style={style}/>;
}

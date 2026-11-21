'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';

const AVATAR_FILES: Record<AvatarId,string> = {
 stardust:'stardust.png',
 lunar:'lunar.png',
 nebula:'nebula.png',
 crystal:'crystal.png',
 aurora:'aurora.png',
 solar:'solar.png'
};

export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}) {
 const [imageFailed,setImageFailed]=useState(false);
 const src='/the-universe/avatars/'+(AVATAR_FILES[avatarId]??AVATAR_FILES.stardust);
 return <span className={'celestial-avatar-artwork '+className} role="img" aria-label={avatarId+' celestial angel'} style={{display:'block',position:'relative',width:'100%',height:'100%',minWidth:0,overflow:'hidden',pointerEvents:'none'}}>
  {!imageFailed ? <Image src={src} alt="" aria-hidden draggable={false} priority unoptimized fill sizes="(max-width: 680px) 40vw, 320px" onError={()=>setImageFailed(true)} style={{objectFit:'contain',userSelect:'none',pointerEvents:'none'}}/> : <span className="celestial-avatar-fallback" aria-hidden="true"><span>✧</span><b>🪽</b></span>}
 </span>;
}

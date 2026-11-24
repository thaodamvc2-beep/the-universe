'use client';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';
import { publicAssetPath } from '@/lib/public-asset-path.mjs';
const AVATAR_FILES: Record<AvatarId, string> = {
 solar:publicAssetPath('/avatars/solar.png'), aurora:publicAssetPath('/avatars/aurora.png'),
 crystal:publicAssetPath('/avatars/crystal.png'), nebula:publicAssetPath('/avatars/nebula.png'),
 lunar:publicAssetPath('/avatars/lunar.png'), stardust:publicAssetPath('/avatars/stardust.png'),
};
export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}) {
 const style:CSSProperties={display:'block',position:'relative',width:'100%',height:'100%',minWidth:0,overflow:'visible',pointerEvents:'none'};
 return <span className={`celestial-avatar-artwork ${className}`} role="img" aria-label={`${avatarId} celestial angel`} style={style}>
  <Image src={AVATAR_FILES[avatarId]??AVATAR_FILES.stardust} alt="" aria-hidden draggable={false} fill priority unoptimized sizes="(max-width: 760px) 42vw, 310px" style={{objectFit:'contain',objectPosition:'center bottom',userSelect:'none'}}/>
 </span>;
}

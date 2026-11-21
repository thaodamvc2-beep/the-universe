'use client';
import type { CSSProperties } from 'react';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';
const positions: Record<AvatarId,string> = {
 stardust:'0% 0%', lunar:'50% 0%', nebula:'100% 0%',
 crystal:'0% 100%', aurora:'50% 100%', solar:'100% 100%'
};
export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}) {
 const style:CSSProperties={display:'block',width:'100%',height:'100%',minWidth:0,backgroundImage:'url(/the-universe/avatars/celestial-six.webp)',backgroundRepeat:'no-repeat',backgroundSize:'300% 200%',backgroundPosition:positions[avatarId]??positions.stardust};
 return <span className={'celestial-avatar-artwork '+className} role="img" aria-label={avatarId+' celestial angel'} style={style}/>;
}

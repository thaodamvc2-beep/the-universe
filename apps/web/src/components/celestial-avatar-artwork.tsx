'use client';
import { useId } from 'react';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';
const palettes: Record<AvatarId,{hair:string;dress:string;wing:string;glow:string;skin:string}> = {
 stardust:{hair:'#b8c9df',dress:'#d9e8f5',wing:'#d8efff',glow:'#a9dfff',skin:'#f1d5ca'},
 lunar:{hair:'#c7b9ad',dress:'#eee6dc',wing:'#f1e8ff',glow:'#d7d5ff',skin:'#f2d8c9'},
 nebula:{hair:'#b9829d',dress:'#e7c4df',wing:'#f5d8f1',glow:'#e8aee5',skin:'#f0c9bd'},
 crystal:{hair:'#78aebd',dress:'#c6e5eb',wing:'#d1f8ff',glow:'#8fe7f4',skin:'#e9cbb9'},
 aurora:{hair:'#8dbb9d',dress:'#d0ead9',wing:'#d9f7e5',glow:'#9de9c5',skin:'#f0d3c2'},
 solar:{hair:'#d4a16c',dress:'#f0d9ae',wing:'#ffe8bd',glow:'#ffd58c',skin:'#f1d2b9'}
};
export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}){
 const p=palettes[avatarId]??palettes.stardust,uid=useId().replace(/:/g,''),wing='wing-'+uid,gown='gown-'+uid,halo='halo-'+uid;
 return <span className={`celestial-avatar-artwork ${className}`} aria-hidden="true">
 <svg viewBox="0 0 360 520" role="presentation" focusable="false" style={{width:'100%',height:'100%',display:'block'}}>
 <defs>
 <linearGradient id={wing} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".98"/><stop offset=".55" stopColor={p.wing} stopOpacity=".78"/><stop offset="1" stopColor={p.glow} stopOpacity=".22"/></linearGradient>
 <linearGradient id={gown} x1="0" y1="0" x2=".85" y2="1"><stop stopColor="#fffaf0"/><stop offset=".48" stopColor={p.dress}/><stop offset="1" stopColor={p.glow}/></linearGradient>
 <radialGradient id={halo}><stop stopColor={p.glow} stopOpacity=".42"/><stop offset="1" stopColor={p.glow} stopOpacity="0"/></radialGradient>
 </defs>
 <ellipse cx="180" cy="270" rx="145" ry="190" fill={`url(#${halo})`}/>
 <g fill={`url(#${wing})`} stroke="#fff" strokeOpacity=".78" strokeWidth="2.2" strokeLinejoin="round">
 <path d="M176 184 C132 130 93 62 40 42 C59 108 92 164 151 218 C105 180 61 161 23 166 C66 224 112 246 166 246 Z"/>
 <path d="M184 184 C228 130 267 62 320 42 C301 108 268 164 209 218 C255 180 299 161 337 166 C294 224 248 246 194 246 Z"/>
 <path d="M165 195 C120 145 85 104 53 89 C81 148 111 190 158 226 Z" opacity=".72"/>
 <path d="M195 195 C240 145 275 104 307 89 C279 148 249 190 202 226 Z" opacity=".72"/>
 </g>
 <g fill="none" stroke="#fff" strokeOpacity=".72" strokeWidth="2"><path d="M177 194 Q112 117 49 57 M171 208 Q91 180 29 177 M183 194 Q248 117 311 57 M189 208 Q269 180 331 177"/><path d="M172 215 Q122 167 79 132 M188 215 Q238 167 281 132"/></g>
 <ellipse cx="180" cy="106" rx="30" ry="36" fill={p.skin}/>
 <path d="M149 108 C142 67 164 53 187 59 C214 65 219 89 207 119 C204 88 190 83 177 81 C168 96 160 105 149 108Z" fill={p.hair}/>
 <path d="M151 96 C128 75 144 48 171 48 C193 32 222 59 213 84 C205 72 198 69 188 67 C177 87 164 91 151 96Z" fill={p.hair} opacity=".92"/>
 <path d="M151 82 C132 95 137 125 151 136 M208 82 C224 96 220 121 207 135" fill="none" stroke={p.hair} strokeWidth="9" strokeLinecap="round"/>
 <path d="M166 111 Q173 116 180 111" fill="none" stroke="#9a6e69" strokeWidth="1.8" strokeLinecap="round"/>
 <path d="M180 139 L180 170" stroke={p.skin} strokeWidth="17" strokeLinecap="round"/>
 <path d="M151 164 Q180 148 209 164 L224 233 Q180 252 136 233 Z" fill={`url(#${gown})`} stroke="#fff" strokeOpacity=".8" strokeWidth="2"/>
 <path d="M151 165 Q126 181 112 216 L93 282 M209 165 Q236 182 251 213 L279 263" fill="none" stroke={p.skin} strokeWidth="13" strokeLinecap="round"/>
 <path d="M138 228 Q180 248 222 228 C246 291 276 355 329 409 C271 447 225 466 180 468 C127 462 85 442 33 404 C91 354 115 290 138 228Z" fill={`url(#${gown})`} stroke="#fff" strokeOpacity=".86" strokeWidth="2.4"/>
 <path d="M151 168 Q181 203 211 168 L201 235 Q180 252 158 235Z" fill="#fff" fillOpacity=".28"/>
 <path d="M139 235 Q175 274 223 235 M112 344 Q183 391 270 356 M77 407 Q176 446 303 404" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3"/>
 <path d="M158 466 Q149 484 139 500 M199 466 Q210 483 220 500" fill="none" stroke={p.skin} strokeWidth="12" strokeLinecap="round"/>
 <path d="M139 500 Q128 506 118 499 M220 500 Q232 507 242 499" fill="none" stroke={p.skin} strokeWidth="8" strokeLinecap="round"/>
 <path d="M223 285 C270 282 298 251 337 244 M218 316 C270 332 298 309 348 299" fill="none" stroke={p.dress} strokeWidth="13" strokeLinecap="round" opacity=".88"/>
 <path d="M223 285 C270 282 298 251 337 244 M218 316 C270 332 298 309 348 299" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
 <g fill="#fff"><path d="M61 274 l5 12 12 5-12 5-5 12-5-12-12-5 12-5Z"/><path d="M291 104 l4 9 9 4-9 4-4 9-4-9-9-4 9-4Z"/><circle cx="88" cy="350" r="3"/><circle cx="286" cy="190" r="2.5"/></g>
 </svg></span>;
}
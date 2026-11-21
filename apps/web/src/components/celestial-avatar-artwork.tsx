'use client';
import { useId } from 'react';
import type { AvatarId } from '@/lib/identity/guest-identity.mjs';

const palettes: Record<AvatarId,{hair:string;cloth:string;wing:string;glow:string;skin:string;metal:string;female:boolean}> = {
 stardust:{hair:'#b8c9df',cloth:'#d9e8f5',wing:'#d8efff',glow:'#a9dfff',skin:'#e9c9bb',metal:'#d9c5a0',female:false},
 lunar:{hair:'#443d50',cloth:'#333e68',wing:'#b9d9ff',glow:'#9dbdff',skin:'#eac9b9',metal:'#d7c4a7',female:false},
 nebula:{hair:'#9b6349',cloth:'#f0dfbd',wing:'#ffe5b4',glow:'#ffd58c',skin:'#efcdbb',metal:'#e8c77f',female:false},
 crystal:{hair:'#e5b6a9',cloth:'#f4dce0',wing:'#f5d8f1',glow:'#e8aee5',skin:'#f0c9bd',metal:'#e9c5a5',female:true},
 aurora:{hair:'#654c5c',cloth:'#dfc8f0',wing:'#e5d7ff',glow:'#c9aaff',skin:'#efcfbd',metal:'#e7c9a8',female:true},
 solar:{hair:'#b8cbd7',cloth:'#d5e9f2',wing:'#d8efff',glow:'#a9dfff',skin:'#f1d2b9',metal:'#e5c98d',female:true}
};
export function CelestialAvatarArtwork({avatarId,className=''}:{avatarId:AvatarId;className?:string}) {
 const p=palettes[avatarId]??palettes.stardust;
 const uid=useId().replace(/:/g,'');
 const wing='wing-'+uid,gown='gown-'+uid,halo='halo-'+uid;
 return <span className={'celestial-avatar-artwork '+className} aria-hidden="true"><svg viewBox="0 0 360 520" role="presentation" focusable="false" style={{width:'100%',height:'100%',display:'block'}}>
 <defs>
 <linearGradient id={wing} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset=".52" stopColor={p.wing} stopOpacity=".82"/><stop offset="1" stopColor={p.glow} stopOpacity=".22"/></linearGradient>
 <linearGradient id={gown} x1="0" y1="0" x2=".85" y2="1"><stop stopColor="#fffdf7"/><stop offset=".48" stopColor={p.cloth}/><stop offset="1" stopColor={p.glow}/></linearGradient>
 <radialGradient id={halo}><stop stopColor={p.glow} stopOpacity=".46"/><stop offset="1" stopColor={p.glow} stopOpacity="0"/></radialGradient>
 </defs>
 <ellipse cx="180" cy="270" rx="155" ry="200" fill={'url(#'+halo+')'}/>
 <g fill={'url(#'+wing+')'} stroke="#fff" strokeOpacity=".82" strokeWidth="2"><path d="M171 202 C120 155 76 80 29 40 C40 112 81 183 151 235 C100 201 53 185 15 194 C55 253 108 270 169 260Z"/><path d="M189 202 C240 155 284 80 331 40 C320 112 279 183 209 235 C260 201 307 185 345 194 C305 253 252 270 191 260Z"/></g>
 <g fill="none" stroke="#fff" strokeOpacity=".72" strokeWidth="2"><path d="M177 213 Q100 124 36 53 M171 230 Q86 196 22 202 M183 213 Q260 124 324 53 M189 230 Q274 196 338 202"/></g>
 <ellipse cx="180" cy="108" rx="30" ry="35" fill={p.skin}/>
 <path d={p.female?"M150 111 C139 68 163 47 190 55 C219 62 221 94 209 119 C205 86 190 77 177 78Z":"M148 105 C143 67 163 52 187 57 C213 62 219 87 208 113 C199 87 184 80 172 82Z"} fill={p.hair}/>
 <path d={p.female?"M151 83 C128 64 145 40 171 44 C197 25 224 57 213 84Z":"M150 83 C138 63 152 43 176 47 C197 35 216 54 212 76Z"} fill={p.hair}/>
 {p.female?<g fill="none" stroke={p.hair} strokeWidth="11" strokeLinecap="round"><path d="M151 86 C125 109 137 153 158 168"/><path d="M207 84 C236 109 223 159 204 174"/></g>:<g fill="none" stroke={p.hair} strokeWidth="7" strokeLinecap="round"><path d="M151 84 Q137 98 145 119"/><path d="M206 82 Q221 96 211 114"/></g>}
 <path d="M166 111 Q173 115 180 111" fill="none" stroke="#9a6e69" strokeWidth="1.8"/><path d="M180 139 L180 171" stroke={p.skin} strokeWidth="17" strokeLinecap="round"/>
 <path d={p.female?"M151 164 Q180 146 209 164 L228 240 Q180 256 132 240Z":"M143 162 Q180 145 217 162 L229 240 Q180 259 131 240Z"} fill={'url(#'+gown+')'} stroke="#fff" strokeOpacity=".82" strokeWidth="2"/>
 <path d="M150 165 Q180 204 210 165 L200 237 Q180 251 160 237Z" fill="#fff" fillOpacity=".3"/>
 <path d="M137 178 Q111 190 100 225 L83 284 M223 178 Q249 190 260 225 L277 284" fill="none" stroke={p.skin} strokeWidth="13" strokeLinecap="round"/>
 <path d="M138 228 Q180 248 222 228 C246 291 276 355 329 409 C271 447 225 466 180 468 C127 462 85 442 33 404 C91 354 115 290 138 228Z" fill={'url(#'+gown+')'} stroke="#fff" strokeOpacity=".86" strokeWidth="2.4"/>
 <path d="M138 228 Q180 248 222 228 C246 291 276 355 329 409" fill="none" stroke={p.metal} strokeWidth="2.5"/><path d="M112 344 Q183 391 270 356 M77 407 Q176 446 303 404" fill="none" stroke="#fff" strokeOpacity=".76" strokeWidth="3"/>
 <path d="M153 466 Q146 484 137 500 M207 466 Q214 484 223 500" fill="none" stroke={p.skin} strokeWidth="12" strokeLinecap="round"/><path d="M137 500 Q126 506 117 499 M223 500 Q234 506 243 499" fill="none" stroke={p.skin} strokeWidth="8" strokeLinecap="round"/>
 <path d="M151 164 Q180 180 209 164 M151 244 Q180 254 209 244" fill="none" stroke={p.metal} strokeWidth="4"/>
 <path d="M223 285 C270 282 298 251 337 244 M218 316 C270 332 298 309 348 299" fill="none" stroke={p.cloth} strokeWidth="13" strokeLinecap="round"/>
 <path d="M61 274 l5 12 12 5-12 5-5 12-5-12-12-5 12-5Z" fill="#fff"/><path d="M291 104 l4 9 9 4-9 4-4 9-4-9-9-4 9-4Z" fill="#fff"/>
 </svg></span>;
}
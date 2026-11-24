const subtract=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const normalize=(v,fallback=[0,0,1])=>{const length=Math.hypot(...v);if(length>1e-10)return v.map(value=>value/length);const fallbackLength=Math.hypot(...fallback);return fallbackLength>1e-10?fallback.map(value=>value/fallbackLength):[0,0,1]};
export function getLandingSurfaceRadius(bodyRadius){return Math.max(0,bodyRadius*1.3+.08)}
export function getStableSurfaceNormal(playerPosition,bodyCenter,fallback=[0,0,1]){return normalize(subtract(playerPosition,bodyCenter),fallback)}
export function getLandingContactPoint(bodyCenter,playerPosition,surfaceRadius,fallback=[0,0,1]){
 const normal=getStableSurfaceNormal(playerPosition,bodyCenter,fallback);
 return {normal,position:add(bodyCenter,normal.map(value=>value*surfaceRadius))};
}
export function isWithinLandingCameraCaptureRange(distanceToCenter,surfaceRadius,captureGap){
 return Number.isFinite(distanceToCenter)&&Number.isFinite(surfaceRadius)&&Number.isFinite(captureGap)&&distanceToCenter-surfaceRadius<=captureGap;
}
export function getStableLandingCameraUp(cameraWorldPosition,lookAtWorldPosition){
 const view=normalize(subtract(lookAtWorldPosition,cameraWorldPosition));
 const project=(axis)=>{const amount=dot(axis,view);return axis.map((value,index)=>value-amount*view[index])};
 let up=project([0,1,0]);
 if(Math.hypot(...up)<1e-5){
  const candidates=[[1,0,0],[0,0,1]];
  candidates.sort((a,b)=>Math.abs(dot(a,view))-Math.abs(dot(b,view)));
  up=project(candidates[0]);
 }
 return normalize(up);
}
export function createLandingCameraAnchor(playerPosition,bodyCenter,surfaceRadius,cameraOffset){
 const normal=getStableSurfaceNormal(playerPosition,bodyCenter);
 const cameraWorldPosition=add(playerPosition,cameraOffset);
 const lookAtWorldPosition=add(bodyCenter,normal.map(value=>value*surfaceRadius));
 return {cameraWorldPosition,lookAtWorldPosition,cameraUp:getStableLandingCameraUp(cameraWorldPosition,lookAtWorldPosition)};
}
export function createLandingCameraHandoff(anchor,targetCameraWorldPosition,targetLookAtWorldPosition,targetCameraUp,duration=.6){
 return {
  fromCameraWorldPosition:[...anchor.cameraWorldPosition],
  toCameraWorldPosition:[...targetCameraWorldPosition],
  fromLookAtWorldPosition:[...anchor.lookAtWorldPosition],
  toLookAtWorldPosition:[...targetLookAtWorldPosition],
  fromCameraUp:[...anchor.cameraUp],
  toCameraUp:normalize(targetCameraUp),
  duration:Math.max(.001,duration)
 };
}
export function getLandingCameraHandoffFrame(handoff,elapsed){
 const progress=Math.max(0,Math.min(1,elapsed/handoff.duration));
 const eased=progress*progress*(3-2*progress);
 const lerpVector=(from,to)=>from.map((value,index)=>value+(to[index]-value)*eased);
 const cameraWorldPosition=lerpVector(handoff.fromCameraWorldPosition,handoff.toCameraWorldPosition);
 const lookAtWorldPosition=lerpVector(handoff.fromLookAtWorldPosition,handoff.toLookAtWorldPosition);
 const upCandidate=lerpVector(handoff.fromCameraUp,handoff.toCameraUp);
 const view=normalize(subtract(lookAtWorldPosition,cameraWorldPosition));
 let cameraUp=upCandidate.map((value,index)=>value-dot(upCandidate,view)*view[index]);
 if(Math.hypot(...cameraUp)<1e-5)cameraUp=getStableLandingCameraUp(cameraWorldPosition,lookAtWorldPosition);
 else cameraUp=normalize(cameraUp);
 return {cameraWorldPosition,lookAtWorldPosition,cameraUp,progress};
}
export function getLandingCameraLocalFrame(playerPosition,anchor){
 return {cameraPosition:subtract(anchor.cameraWorldPosition,playerPosition),lookAt:subtract(anchor.lookAtWorldPosition,playerPosition)};
}

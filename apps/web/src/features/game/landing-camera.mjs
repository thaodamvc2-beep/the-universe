const subtract=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const normalize=(v)=>{const length=Math.hypot(...v);return length>1e-10?v.map(value=>value/length):[0,0,1]};
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
 const radial=subtract(playerPosition,bodyCenter),length=Math.hypot(...radial),normal=length>1e-8?radial.map(value=>value/length):[0,0,1];
 const cameraWorldPosition=add(playerPosition,cameraOffset);
 const lookAtWorldPosition=add(bodyCenter,normal.map(value=>value*surfaceRadius));
 return {cameraWorldPosition,lookAtWorldPosition,cameraUp:getStableLandingCameraUp(cameraWorldPosition,lookAtWorldPosition)};
}
export function getLandingCameraLocalFrame(playerPosition,anchor){
 return {cameraPosition:subtract(anchor.cameraWorldPosition,playerPosition),lookAt:subtract(anchor.lookAtWorldPosition,playerPosition)};
}

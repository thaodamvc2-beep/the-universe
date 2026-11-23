const subtract=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
export function createLandingCameraAnchor(playerPosition,bodyCenter,surfaceRadius,cameraOffset){
 const radial=subtract(playerPosition,bodyCenter),length=Math.hypot(...radial),normal=length>1e-8?radial.map(value=>value/length):[0,0,1];
 return {cameraWorldPosition:add(playerPosition,cameraOffset),lookAtWorldPosition:add(bodyCenter,normal.map(value=>value*surfaceRadius))};
}
export function getLandingCameraLocalFrame(playerPosition,anchor){
 return {cameraPosition:subtract(anchor.cameraWorldPosition,playerPosition),lookAt:subtract(anchor.lookAtWorldPosition,playerPosition)};
}

export type LandingCameraAnchor={cameraWorldPosition:[number,number,number];lookAtWorldPosition:[number,number,number]};
const subtract=(a:number[],b:number[])=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]] as [number,number,number];
const add=(a:number[],b:number[])=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]] as [number,number,number];
export function createLandingCameraAnchor(playerPosition:[number,number,number],bodyCenter:[number,number,number],surfaceRadius:number,cameraOffset:[number,number,number]):LandingCameraAnchor{
 const radial=subtract(playerPosition,bodyCenter),length=Math.hypot(...radial),normal=length>1e-8?radial.map(value=>value/length):[0,0,1];
 return {cameraWorldPosition:add(playerPosition,cameraOffset),lookAtWorldPosition:add(bodyCenter,normal.map(value=>value*surfaceRadius))};
}
export function getLandingCameraLocalFrame(playerPosition:[number,number,number],anchor:LandingCameraAnchor){
 return {cameraPosition:subtract(anchor.cameraWorldPosition,playerPosition),lookAt:subtract(anchor.lookAtWorldPosition,playerPosition)};
}

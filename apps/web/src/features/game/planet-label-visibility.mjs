export function isPlanetLabelVisible(playerPosition,bodyPosition,currentlyVisible=false,enterDistance=72,exitDistance=80){const dx=playerPosition[0]-bodyPosition[0],dy=playerPosition[1]-bodyPosition[1],dz=playerPosition[2]-bodyPosition[2];const distanceSquared=dx*dx+dy*dy+dz*dz;const limit=currentlyVisible?exitDistance:enterDistance;return distanceSquared<=limit*limit;}

export function isPlanetLabelWithinDistance(playerPosition,bodyPosition,maxDistance=72){return isPlanetLabelVisible(playerPosition,bodyPosition,false,maxDistance,maxDistance);}

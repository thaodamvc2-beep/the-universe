export function isPlanetLabelVisible(playerPosition:[number,number,number],bodyPosition:[number,number,number],currentlyVisible?:boolean,enterDistance?:number,exitDistance?:number):boolean;
export function selectPlanetLabelIds(playerPosition:[number,number,number],bodies:Array<{id:string;position:[number,number,number]}>,currentlyVisibleIds?:string[],maxLabels?:number,enterDistance?:number,exitDistance?:number):string[];
export function isPlanetLabelWithinDistance(playerPosition:[number,number,number],bodyPosition:[number,number,number],maxDistance?:number):boolean;

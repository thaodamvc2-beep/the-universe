import test from 'node:test';
import assert from 'node:assert/strict';
import { isPlanetLabelVisible, selectPlanetLabelIds, isPlanetLabelWithinDistance } from '../apps/web/src/features/game/planet-label-visibility.mjs';

test('label visibility enters within 72 units and exits beyond 80 units',()=>{
 assert.equal(isPlanetLabelVisible([0,0,0],[72,0,0]),true);
 assert.equal(isPlanetLabelVisible([72.01,0,0],[0,0,0]),false);
 assert.equal(isPlanetLabelVisible([79,0,0],[0,0,0],true),true);
 assert.equal(isPlanetLabelVisible([80,0,0],[0,0,0],true),true);
 assert.equal(isPlanetLabelVisible([80.01,0,0],[0,0,0],true),false);
});

test('visibility gate uses 3D distance and separate configurable enter/exit thresholds',()=>{
 assert.equal(isPlanetLabelVisible([3,4,12],[0,0,0],false,13,16),true);
 assert.equal(isPlanetLabelVisible([3,4,12.1],[0,0,0],false,13,16),false);
 assert.equal(isPlanetLabelVisible([0,0,0],[15,0,0],true,13,16),true);
 assert.equal(isPlanetLabelVisible([16.01,0,0],[0,0,0],true,13,16),false);
});

test('visibility state prevents threshold oscillation near entry boundary',()=>{
 let visible=false;
 visible=isPlanetLabelVisible([71.9,0,0],[0,0,0],visible);assert.equal(visible,true);
 visible=isPlanetLabelVisible([72.1,0,0],[0,0,0],visible);assert.equal(visible,true);
 visible=isPlanetLabelVisible([79.9,0,0],[0,0,0],visible);assert.equal(visible,true);
 visible=isPlanetLabelVisible([80.1,0,0],[0,0,0],visible);assert.equal(visible,false);
});

test('nearest label selection is capped and sorts by distance',()=>{
 const bodies=Array.from({length:40},(_,i)=>({id:String(i),position:[i+1,0,0]}));
 const ids=selectPlanetLabelIds([0,0,0],bodies,[],24);
 assert.equal(ids.length,24);assert.equal(ids[0],'0');assert.equal(ids[23],'23');
});

test('selected labels use exit threshold and newly selected bodies use entry threshold',()=>{
 const bodies=[{id:'old',position:[79,0,0]},{id:'new',position:[72.5,0,0]},{id:'far',position:[81,0,0]}];
 assert.deepEqual(selectPlanetLabelIds([0,0,0],bodies,['old'],24),['old']);
});

test('legacy distance helper remains compatible',()=>{
 assert.equal(isPlanetLabelWithinDistance([72,0,0],[0,0,0]),true);
 assert.equal(isPlanetLabelWithinDistance([72.01,0,0],[0,0,0]),false);
});

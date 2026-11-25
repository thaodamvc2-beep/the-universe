import test from 'node:test';
import assert from 'node:assert/strict';
import { isPlanetLabelVisible } from '../apps/web/src/features/game/planet-label-visibility.mjs';

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

test('visibility state prevents threshold oscillation near the enter boundary',()=>{
 let visible=false;
 visible=isPlanetLabelVisible([71.9,0,0],[0,0,0],visible);assert.equal(visible,true);
 visible=isPlanetLabelVisible([72.1,0,0],[0,0,0],visible);assert.equal(visible,true);
 visible=isPlanetLabelVisible([79.9,0,0],[0,0,0],visible);assert.equal(visible,true);
 visible=isPlanetLabelVisible([80.1,0,0],[0,0,0],visible);assert.equal(visible,false);
});

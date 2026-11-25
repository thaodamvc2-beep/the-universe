import test from 'node:test';
import assert from 'node:assert/strict';
import { isPlanetLabelWithinDistance } from '../apps/web/src/features/game/planet-label-visibility.mjs';

test('planet-label visibility gate uses a bounded 72-unit distance',()=>{
 assert.equal(isPlanetLabelWithinDistance([0,0,0],[0,0,0]),true);
 assert.equal(isPlanetLabelWithinDistance([72,0,0],[0,0,0]),true);
 assert.equal(isPlanetLabelWithinDistance([72.01,0,0],[0,0,0]),false);
 assert.equal(isPlanetLabelWithinDistance([0,0,0],[0,73,0]),false);
 assert.equal(isPlanetLabelWithinDistance([0,0,0],[0,0,0],5),true);
 assert.equal(isPlanetLabelWithinDistance([5.01,0,0],[0,0,0],5),false);
});

test('visibility gate computes 3D distance without allocating graphics objects',()=>{
 assert.equal(isPlanetLabelWithinDistance([3,4,12],[0,0,0],13),true);
 assert.equal(isPlanetLabelWithinDistance([3,4,12.1],[0,0,0],13),false);
});

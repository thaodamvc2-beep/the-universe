import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AVATAR_OPTIONS,
  GUEST_IDENTITY_STORAGE_KEY,
  createGuestIdentity,
  isGuestIdentity,
  loadOrCreateGuestIdentity,
  saveGuestIdentity,
  updateGuestIdentity,
  validateNickname,
} from '../apps/web/src/lib/identity/guest-identity.mjs';

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, value); },
  };
}

test('new guests receive a valid avatar identity without registration', () => {
  const identity = createGuestIdentity(new Date('2026-11-20T00:00:00.000Z'), 0.25);
  assert.equal(identity.version, 1);
  assert.match(identity.guestId, /^guest-/);
  assert.match(identity.nickname, /^Wanderer-/);
  assert.equal(identity.avatarId, 'stardust');
  assert.equal(isGuestIdentity(identity), true);
});

test('avatar catalogue contains six stable human character portraits', () => {
  assert.equal(AVATAR_OPTIONS.length, 6);
  assert.equal(new Set(AVATAR_OPTIONS.map((item) => item.id)).size, 6);
});

test('six standalone transparent PNG angels are the only avatar artwork source', async () => {
 const {readFile,stat}=await import('node:fs/promises');const {resolve}=await import('node:path');const root=resolve(import.meta.dirname,'..');
 const ids=['solar','aurora','crystal','nebula','lunar','stardust'];
 for(const id of ids){const file=resolve(root,`apps/web/public/avatars/${id}.png`);const image=await readFile(file);const info=await stat(file);assert.deepEqual(image.subarray(0,8),Buffer.from([137,80,78,71,13,10,26,10]));assert.ok(info.size>1000);assert.equal(image.subarray(12,16).toString(),'IHDR');assert.ok(image.includes(Buffer.from('tRNS'),),`${id} PNG must preserve transparent pixels`);}
 const home=await readFile(resolve(root,'apps/web/src/app/page.tsx'),'utf8');const header=await readFile(resolve(root,'apps/web/src/components/site-header.tsx'),'utf8');const page=await readFile(resolve(root,'apps/web/src/app/avatar/page.tsx'),'utf8');const art=await readFile(resolve(root,'apps/web/src/components/celestial-avatar-artwork.tsx'),'utf8');const css=await readFile(resolve(root,'apps/web/src/app/globals.css'),'utf8');const game=await readFile(resolve(root,'apps/web/src/features/game/universe-game.tsx'),'utf8');const scene=await readFile(resolve(root,'apps/web/src/features/game/flight-scene.tsx'),'utf8');const map=await readFile(resolve(root,'apps/web/src/components/cosmic-map.tsx'),'utf8');
 assert.match(home,/UniverseGame/);assert.match(game,/guestIdentity\?\.avatarId/);assert.match(game,/FlightScene/);assert.match(scene,/\/the-universe\/avatars\/\$\{avatarId\}\.png/);assert.match(scene,/player\.avatarId/);assert.match(map,/guestIdentity\.avatarId/);assert.match(header,/header-identity/);assert.match(page,/CelestialAvatarArtwork/);assert.match(header,/CelestialAvatarArtwork/);assert.match(art,/AVATAR_FILES/);for(const id of ids)assert.match(art,new RegExp(`${id}\\.png`));assert.match(art,/fill/);assert.match(css,/celestial-avatar-artwork/);
 assert.doesNotMatch([art,scene,game,css].join('\n'),/celestial-avatars\.webp|celestial-six\.webp|AVATAR_CELLS|game-avatar-stage/);
});

test('nickname validation trims whitespace and enforces Unicode-safe rules', () => {
  assert.deepEqual(validateNickname('  Sao Mai  '), { valid: true, value: 'Sao Mai' });
  assert.equal(validateNickname('A').reason, 'tooShort');
  assert.equal(validateNickname('ThisNicknameIsMuchTooLong').reason, 'tooLong');
  assert.equal(validateNickname('Name<script>').reason, 'characters');
  assert.equal(validateNickname('星の旅人').valid, true);
});

test('guest identity persists and reloads from local device storage', () => {
  const storage = memoryStorage();
  const identity = loadOrCreateGuestIdentity(storage);
  assert.equal(saveGuestIdentity(identity, storage), true);
  assert.deepEqual(loadOrCreateGuestIdentity(storage), identity);
  assert.ok(storage.getItem(GUEST_IDENTITY_STORAGE_KEY));
});

test('invalid or blocked storage does not prevent guest entry', () => {
  const malformed = memoryStorage({ [GUEST_IDENTITY_STORAGE_KEY]: '{broken' });
  assert.equal(isGuestIdentity(loadOrCreateGuestIdentity(malformed)), true);
  const blocked = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
  };
  assert.equal(isGuestIdentity(loadOrCreateGuestIdentity(blocked)), true);
  assert.equal(saveGuestIdentity(createGuestIdentity(), blocked), false);
});

test('identity edits preserve guest ID and update nickname/avatar', () => {
  const original = createGuestIdentity(new Date('2026-11-20T00:00:00.000Z'), 0.1);
  const updated = updateGuestIdentity(original, { nickname: 'Moon Walker', avatarId: 'aurora' }, new Date('2026-11-20T01:00:00.000Z'));
  assert.equal(updated.guestId, original.guestId);
  assert.equal(updated.nickname, 'Moon Walker');
  assert.equal(updated.avatarId, 'aurora');
  assert.notEqual(updated.updatedAt, original.updatedAt);
  assert.throws(() => updateGuestIdentity(original, { nickname: 'x' }), /tooShort/);
});

test('Package 04 interface and account route do not imply real authentication', async () => {
  const { readFile } = await import('node:fs/promises');
  const { resolve } = await import('node:path');
  const root = resolve(import.meta.dirname, '..');
  const avatarPage = await readFile(resolve(root, 'apps/web/src/app/avatar/page.tsx'), 'utf8');
  const accountPage = await readFile(resolve(root, 'apps/web/src/components/account-notice.tsx'), 'utf8');
  assert.match(avatarPage, /optionalSignIn/);
  assert.match(accountPage, /accountUnavailable/);
  assert.match(accountPage, /accountGuestData/);
  assert.doesNotMatch(accountPage, /supabase|oauth|signIn\(/i);
});

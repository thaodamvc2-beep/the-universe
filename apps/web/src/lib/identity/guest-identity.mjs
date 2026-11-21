export const GUEST_IDENTITY_STORAGE_KEY = 'the-universe:guest-identity:v1';

export const AVATAR_OPTIONS = Object.freeze([
  { id: 'stardust', name: 'Luna' },
  { id: 'lunar', name: 'Noah' },
  { id: 'nebula', name: 'Rosie' },
  { id: 'crystal', name: 'Milo' },
  { id: 'aurora', name: 'Ivy' },
  { id: 'solar', name: 'Stella' },
]);

const avatarIds = new Set(AVATAR_OPTIONS.map((avatar) => avatar.id));

export function validateNickname(value) {
  if (typeof value !== 'string') return { valid: false, reason: 'required' };
  const nickname = value.trim();
  const length = Array.from(nickname).length;
  if (length < 2) return { valid: false, reason: 'tooShort' };
  if (length > 20) return { valid: false, reason: 'tooLong' };
  if (!/^[\p{L}\p{M}\p{N} _-]+$/u.test(nickname)) {
    return { valid: false, reason: 'characters' };
  }
  return { valid: true, value: nickname };
}

export function isGuestIdentity(value) {
  if (!value || typeof value !== 'object') return false;
  if (value.version !== 1) return false;
  if (typeof value.guestId !== 'string' || !value.guestId.startsWith('guest-')) return false;
  if (!avatarIds.has(value.avatarId)) return false;
  if (!validateNickname(value.nickname).valid) return false;
  if (typeof value.createdAt !== 'string' || Number.isNaN(Date.parse(value.createdAt))) return false;
  if (typeof value.updatedAt !== 'string' || Number.isNaN(Date.parse(value.updatedAt))) return false;
  return true;
}

export function createGuestIdentity(now = new Date(), random = Math.random()) {
  const suffix = Math.floor(random * 9000) + 1000;
  const timestamp = now.toISOString();
  return {
    version: 1,
    guestId: `guest-${now.getTime().toString(36)}-${suffix.toString(36)}`,
    nickname: `Wanderer-${suffix}`,
    avatarId: 'stardust',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function loadOrCreateGuestIdentity(storage) {
  let storageApi = storage;
  try {
    if (!storageApi && typeof window !== 'undefined') storageApi = window.localStorage;
    if (storageApi) {
      const raw = storageApi.getItem(GUEST_IDENTITY_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (isGuestIdentity(parsed)) return parsed;
      }
    }
  } catch {
    // Storage can be blocked or contain malformed data; guest exploration must continue.
  }
  const identity = createGuestIdentity();
  saveGuestIdentity(identity, storageApi);
  return identity;
}

export function saveGuestIdentity(identity, storage) {
  if (!isGuestIdentity(identity)) return false;
  let storageApi = storage;
  try {
    if (!storageApi && typeof window !== 'undefined') storageApi = window.localStorage;
    if (!storageApi) return false;
    storageApi.setItem(GUEST_IDENTITY_STORAGE_KEY, JSON.stringify(identity));
    return true;
  } catch {
    return false;
  }
}

export function updateGuestIdentity(current, changes, now = new Date()) {
  const nicknameResult = validateNickname(changes.nickname ?? current.nickname);
  if (!nicknameResult.valid) throw new Error(nicknameResult.reason);
  const avatarId = changes.avatarId ?? current.avatarId;
  if (!avatarIds.has(avatarId)) throw new Error('unknownAvatar');
  return {
    ...current,
    nickname: nicknameResult.value,
    avatarId,
    updatedAt: now.toISOString(),
  };
}

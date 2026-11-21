export type AvatarId = 'stardust' | 'lunar' | 'nebula' | 'crystal' | 'aurora' | 'solar';
export interface GuestIdentity {
  version: 1;
  guestId: string;
  nickname: string;
  avatarId: AvatarId;
  createdAt: string;
  updatedAt: string;
}
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
export const GUEST_IDENTITY_STORAGE_KEY: string;
export const AVATAR_OPTIONS: ReadonlyArray<{ id: AvatarId; name: string }>;
export function validateNickname(value: string): { valid: true; value: string } | { valid: false; reason: string };
export function isGuestIdentity(value: unknown): value is GuestIdentity;
export function createGuestIdentity(now?: Date, random?: number): GuestIdentity;
export function loadOrCreateGuestIdentity(storage?: StorageLike): GuestIdentity;
export function saveGuestIdentity(identity: GuestIdentity, storage?: StorageLike): boolean;
export function updateGuestIdentity(current: GuestIdentity, changes: { nickname?: string; avatarId?: AvatarId }, now?: Date): GuestIdentity;

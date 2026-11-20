'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { loadOrCreateGuestIdentity, saveGuestIdentity, updateGuestIdentity as applyGuestIdentityChanges } from '@/lib/identity/guest-identity';
import type { AvatarId, GuestIdentity } from '@/lib/identity/guest-identity';
import { translate, type Language, type TranslationKey } from '@/lib/i18n/translations';

type SiteContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  guestIdentity: GuestIdentity | null;
  identityReady: boolean;
  updateGuestIdentity: (changes: { nickname: string; avatarId: AvatarId }) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [language, setLanguage] = useState<Language>('en');
  const [guestIdentity, setGuestIdentity] = useState<GuestIdentity | null>(null);

  useEffect(() => {
    setGuestIdentity(loadOrCreateGuestIdentity());
  }, []);

  const updateIdentity = useCallback((changes: { nickname: string; avatarId: AvatarId }) => {
    setGuestIdentity((current) => {
      if (!current) return current;
      const next = applyGuestIdentityChanges(current, changes);
      saveGuestIdentity(next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: TranslationKey) => translate(language, key), [language]);
  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    guestIdentity,
    identityReady: guestIdentity !== null,
    updateGuestIdentity: updateIdentity,
  }), [language, t, guestIdentity, updateIdentity]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProvider');
  return context;
}

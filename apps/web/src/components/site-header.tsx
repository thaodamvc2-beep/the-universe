'use client';

import Link from 'next/link';
import { useSite } from '@/components/site-provider';
import { CelestialAvatarArtwork } from '@/components/celestial-avatar-artwork';

export function SiteHeader() {
  const { language, setLanguage, t, guestIdentity } = useSite();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="THE UNIVERSE — Home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="brand-name">THE UNIVERSE</span>
      </Link>
      <nav className="header-actions" aria-label="Main navigation">
        <Link className="header-link" href="/map">{t('navExperience')}</Link>
        <Link className="header-link" href="/map">{t('navHome')}</Link>
        <Link className="header-link" href="/worlds">{t('navWorlds')}</Link>
        <Link className="header-link" href="/avatar">{t('navAvatar')}</Link>
        <Link className="header-link" href="/account">{t('navSignIn')}</Link>
        {guestIdentity ? (
          <Link className="header-identity" href="/avatar" aria-label={`${guestIdentity.nickname} — ${t('navAvatar')}`}>
            <CelestialAvatarArtwork avatarId={guestIdentity.avatarId} className="avatar-portrait header-identity-portrait" />
            <span className="header-identity-name">{guestIdentity.nickname}</span>
          </Link>
        ) : null}
        <label className="language-control">
          <span className="sr-only">{t('languageLabel')}</span>
          <select
            aria-label={t('languageLabel')}
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'en' | 'vi')}
          >
            <option value="en">EN</option>
            <option value="vi">VI</option>
          </select>
        </label>
      </nav>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useSite } from '@/components/site-provider';

export function SiteHeader() {
  const { language, setLanguage, t } = useSite();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="THE UNIVERSE — Home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="brand-name">THE UNIVERSE</span>
      </Link>
      <nav className="header-actions" aria-label="Main navigation">
        <a className="header-link" href="/#experience">{t('navExperience')}</a>
        <a className="header-link" href="/#home-world">{t('navHome')}</a>
        <Link className="header-link" href="/worlds">{t('navWorlds')}</Link>
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

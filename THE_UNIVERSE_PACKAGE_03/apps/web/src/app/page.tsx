'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { useSite } from '@/components/site-provider';

export default function HomePage() {
  const { t, guestIdentity } = useSite();

  return (
    <main id="main-content" className="home-page">
      <div className="cosmos-backdrop" aria-hidden="true">
        <span className="star-cloud star-cloud-one" />
        <span className="star-cloud star-cloud-two" />
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
      </div>
      <SiteHeader />

      <section className="hero-section" id="experience" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{t('eyebrow')}</p>
          <h1 id="hero-title">{t('heroTitle')}<br /><span>{t('heroAccent')}</span></h1>
          <p className="hero-description">{t('heroDescription')}</p>
          <div className="hero-actions">
            <Link className="primary-action" href="/prototype">
              <span>{t('enterGuest')}</span><span className="action-arrow" aria-hidden="true">↗</span>
            </Link>
            <a className="secondary-action" href="#home-world">{t('discoverMore')}</a>
          </div>
          <p className="guest-note"><span className="guest-check" aria-hidden="true">✦</span>{t('guestNote')}</p>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-wide" />
          <div className="orbit orbit-inner" />
          <div className="planet-halo" />
          <div className="hero-earth">
            <span className="earth-land earth-land-one" />
            <span className="earth-land earth-land-two" />
            <span className="earth-land earth-land-three" />
            <span className="earth-cloud earth-cloud-one" />
            <span className="earth-cloud earth-cloud-two" />
          </div>
          <div className="hero-moon" />
          <span className="art-label art-label-top">SOL III <i /> 149.6M KM</span>
          <span className="art-label art-label-bottom">A SMALL BLUE WORLD</span>
          <span className="art-cross art-cross-one">✧</span>
          <span className="art-cross art-cross-two">✦</span>
          {guestIdentity ? (
            <Link className="hero-identity-card" href="/avatar" aria-label={t('editCompanion')}>
              <span className={`avatar-portrait avatar-${guestIdentity.avatarId} hero-identity-portrait`} aria-hidden="true" />
              <span className="hero-identity-copy">
                <span>{t('yourCompanion')}</span>
                <strong>{guestIdentity.nickname}</strong>
                <em>{t('editCompanion')} ↗</em>
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="home-world-section" id="home-world" aria-labelledby="home-world-title">
        <div className="section-rule" />
        <div className="home-world-copy">
          <p className="eyebrow">{t('homeEyebrow')}</p>
          <h2 id="home-world-title">{t('homeTitle')}</h2>
          <p>{t('homeDescription')}</p>
          <span className="home-world-tag"><span />{t('homeTag')}</span>
        </div>
        <div className="quiet-note">
          <span className="quiet-note-star" aria-hidden="true">✧</span>
          <h3>{t('quietTitle')}</h3>
          <p>{t('quietDescription')}</p>
        </div>
      </section>

      <footer className="site-footer">
        <Link className="footer-brand" href="/">THE UNIVERSE</Link>
        <span>{t('footerLine')}</span>
        <span className="footer-coordinate">{t('footerCoordinate')}</span>
      </footer>
    </main>
  );
}

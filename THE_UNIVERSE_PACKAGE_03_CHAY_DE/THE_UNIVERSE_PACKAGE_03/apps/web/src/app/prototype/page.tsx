'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { useSite } from '@/components/site-provider';
import { PlanetScene } from '@/features/prototype/planet-scene';

export default function PrototypePage() {
  const { t } = useSite();
  return (
    <main id="main-content" className="prototype-page">
      <SiteHeader />
      <section className="prototype-intro" aria-labelledby="prototype-title">
        <p className="eyebrow"><span className="eyebrow-line" />{t('prototypeLabel')}</p>
        <h1 id="prototype-title">{t('prototypeTitle')}</h1>
        <p>{t('prototypeDescription')}</p>
      </section>
      <section className="prototype-stage" aria-label={t('prototypeAriaLabel')}>
        <div className="prototype-canvas">
          <PlanetScene fallbackLabel={t('prototypeFallback')} />
          <div className="prototype-corner-label">EARTH <span>·</span> HOME WORLD</div>
          <div className="prototype-coordinate">03 / 01 — FIRST LIGHT</div>
        </div>
        <p className="prototype-hint">{t('prototypeHint')}</p>
      </section>
      <div className="prototype-bottom">
        <p>{t('prototypeNote')}</p>
        <Link className="back-home-link" href="/">← {t('backHome')}</Link>
      </div>
    </main>
  );
}

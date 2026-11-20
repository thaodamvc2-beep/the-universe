'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { useSite } from '@/components/site-provider';
import bodies from '@/data/celestial-bodies.json';

export default function WorldsPage() {
  const { t, language } = useSite();
  const [selectedId, setSelectedId] = useState('earth');
  const selected = useMemo(() => bodies.find((body) => body.id === selectedId) ?? bodies.find((body) => body.id === 'earth')!, [selectedId]);
  const number = (value: number | null) => value === null ? '—' : value.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US', { maximumFractionDigits: 3 });
  return (
    <main id="main-content" className="worlds-page">
      <SiteHeader />
      <section className="worlds-intro">
        <p className="eyebrow"><span className="eyebrow-line" />{t('worldsEyebrow')}</p>
        <h1>{t('worldsTitle')}</h1>
        <p>{t('worldsDescription')}</p>
      </section>
      <section className="worlds-layout" aria-label={t('selectWorld')}>
        <div className="worlds-grid">
          {bodies.map((body) => (
            <button key={body.id} type="button" className="world-card" aria-pressed={selectedId === body.id} onClick={() => setSelectedId(body.id)}>
              <span className={`world-orb ${body.id}`} aria-hidden="true" />
              <span className="world-card-name">{body.name.toUpperCase()}</span>
              <span className="world-card-kind">{(language === 'vi' ? body.kindVi : body.kind).toUpperCase()}</span>
            </button>
          ))}
        </div>
        <aside className="world-detail" aria-live="polite">
          <div className="world-detail-top"><span>{t('realObject')}</span><span>01 / 10</span></div>
          <span className={`world-orb ${selected.id}`} aria-hidden="true" />
          <h2>{selected.name}</h2>
          <p className="world-detail-type">{(language === 'vi' ? selected.kindVi : selected.kind).toUpperCase()}</p>
          <p className="world-detail-description">{language === 'vi' ? selected.descriptionVi : selected.description}</p>
          <div className="world-facts">
            <div className="world-fact"><span>{t('meanDistance')}</span><strong>{selected.meanDistanceAu === null ? '—' : `${number(selected.meanDistanceAu)} AU`}</strong></div>
            <div className="world-fact"><span>{t('radius')}</span><strong>{number(selected.radiusEarth)}×</strong></div>
            <div className="world-fact"><span>{t('atmosphere')}</span><strong>{language === 'vi' ? selected.atmosphereVi : selected.atmosphere}</strong></div>
            <div className="world-fact"><span>{t('bodyType')}</span><strong>{language === 'vi' ? selected.kindVi : selected.kind}</strong></div>
          </div>
          <p className="world-explore-note"><strong>{t('exploreNote')}:</strong> {language === 'vi' ? selected.explorationNoteVi : selected.explorationNote}</p>
          <a className="world-source" href={selected.sourceUrl} target="_blank" rel="noreferrer">{t('sourceLabel')} ↗</a>
          {selected.id === 'earth' ? <p className="world-home-note">✦ {t('homeReturn')}</p> : null}
        </aside>
      </section>
      <footer className="worlds-footer"><Link className="back-home-link" href="/">{t('worldsBack')}</Link><span>REAL ASTRONOMY · EARTH REMAINS HOME</span></footer>
    </main>
  );
}

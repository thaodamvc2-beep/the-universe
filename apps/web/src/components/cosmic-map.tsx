'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { useSite } from '@/components/site-provider';
import { CelestialAvatarArtwork } from '@/components/celestial-avatar-artwork';
import bodies from '@/data/celestial-bodies.json';

type CelestialBody = (typeof bodies)[number];
const positions: Record<string, { x: number; y: number }> = {
  sun:{x:50,y:50}, mercury:{x:56,y:39}, venus:{x:59,y:62}, earth:{x:65,y:40},
  moon:{x:67,y:34}, mars:{x:70,y:66}, jupiter:{x:78,y:35}, saturn:{x:84,y:64},
  uranus:{x:91,y:39}, neptune:{x:96,y:59},
};

export function CosmicMap() {
  const { t, language, guestIdentity } = useSite();
  const [selectedId, setSelectedId] = useState('earth');
  const [previewedId, setPreviewedId] = useState<string | null>(null);
  const selected = useMemo<CelestialBody>(
    () => bodies.find((body) => body.id === selectedId) ?? bodies.find((body) => body.id === 'earth')!,
    [selectedId],
  );
  const selectBody = (id: string) => { setSelectedId(id); setPreviewedId(null); };
  const returnToEarth = () => selectBody('earth');
  const formatNumber = (value: number | null) =>
    value === null ? '—' : value.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US', { maximumFractionDigits: 3 });

  return (
    <main id="main-content" className="cosmic-map-page">
      <div className="map-starfield" aria-hidden="true" />
      <SiteHeader />
      <section className="map-heading" aria-labelledby="map-title">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" />{t('mapEyebrow')}</p>
          <h1 id="map-title">{t('mapTitle')}</h1>
          <p className="map-description">{t('mapDescription')}</p>
          <p className="map-hierarchy">{t('mapHierarchy')}</p>
        </div>
        {guestIdentity ? (
          <Link className="map-companion" href="/avatar">
            <CelestialAvatarArtwork avatarId={guestIdentity.avatarId} className="avatar-portrait map-companion-illustration" />
            <span><small>{t('yourCompanion')}</small><strong>{guestIdentity.nickname}</strong></span>
          </Link>
        ) : null}
      </section>

      <section className="map-workspace" aria-label={t('mapMapAria')}>
        <div className="map-main-column">
          <div className="cosmic-map-stage">
            <div className="map-nebula map-nebula-one" aria-hidden="true" />
            <div className="map-nebula map-nebula-two" aria-hidden="true" />
            <svg className="map-orbits" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
              {[68,112,160,210,270,340,410,475].map((radius) => (
                <ellipse key={radius} cx="500" cy="260" rx={radius} ry={radius * 0.48} />
              ))}
            </svg>
            {bodies.map((body) => {
              const point = positions[body.id];
              return (
                <button key={body.id} type="button"
                  className={`map-marker map-marker-${body.id}${selectedId === body.id ? ' is-selected' : ''}${body.id === 'earth' ? ' is-home' : ''}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  aria-label={`${body.name}${body.id === 'earth' ? ` — ${t('mapHomeWorldLabel')}` : ''}`}
                  aria-pressed={selectedId === body.id} onClick={() => selectBody(body.id)}>
                  <span className="map-marker-orb" aria-hidden="true" />
                  <span className="map-marker-name">{body.name}</span>
                  {body.id === 'earth' ? <span className="map-home-pin">{t('mapHomeWorldLabel')}</span> : null}
                </button>
              );
            })}
            <span className="map-coordinate map-coordinate-top">SOL SYSTEM · SOL III</span>
            <span className="map-coordinate map-coordinate-bottom">SCHEMATIC NAVIGATION · NOT TO SCALE</span>
          </div>
          <p className="map-scale-note">{t('mapScaleNote')}</p>
          <div className="map-destination-strip" aria-label={t('mapSelectDestination')}>
            {bodies.map((body) => (
              <button key={body.id} type="button"
                className={`map-destination-chip${selectedId === body.id ? ' is-selected' : ''}`}
                aria-pressed={selectedId === body.id} onClick={() => selectBody(body.id)}>
                <span className={`map-chip-orb world-orb ${body.id}`} aria-hidden="true" />
                <span>{body.name}</span>{body.id === 'earth' ? <small>HOME</small> : null}
              </button>
            ))}
          </div>
        </div>

        <aside className="map-detail-panel" aria-live="polite">
          <div className="map-detail-top"><span>{t('realObject')}</span><span>{String(bodies.findIndex((body) => body.id === selected.id) + 1).padStart(2, '0')} / 10</span></div>
          <div className={`map-detail-planet world-orb ${selected.id}`} aria-hidden="true" />
          <h2>{selected.name}</h2>
          <p className="map-detail-kind">{language === 'vi' ? selected.kindVi : selected.kind}</p>
          {selected.id === 'earth' ? <p className="map-home-status">✦ {t('homeReturn')}</p> : null}
          <p className="map-detail-description">{language === 'vi' ? selected.descriptionVi : selected.description}</p>
          <div className="map-facts">
            <div><span>{t('meanDistance')}</span><strong>{selected.meanDistanceAu === null ? '—' : `${formatNumber(selected.meanDistanceAu)} AU`}</strong></div>
            <div><span>{t('radius')}</span><strong>{formatNumber(selected.radiusEarth)}×</strong></div>
            <div><span>{t('atmosphere')}</span><strong>{language === 'vi' ? selected.atmosphereVi : selected.atmosphere}</strong></div>
            <div><span>{t('bodyType')}</span><strong>{language === 'vi' ? selected.kindVi : selected.kind}</strong></div>
          </div>
          <p className="map-exploration-note">{language === 'vi' ? selected.explorationNoteVi : selected.explorationNote}</p>
          {['Gas giant','Ice giant'].includes(selected.kind) ? <p className="map-giant-notice">{t('mapGasGiantNotice')}</p> : null}
          <a className="world-source" href={selected.sourceUrl} target="_blank" rel="noreferrer">{t('sourceLabel')} ↗</a>
          <button className="map-preview-button" type="button" onClick={() => setPreviewedId(selected.id)}>{t('mapPreviewRoute')}</button>
          {previewedId === selected.id ? <p className="map-preview-status" role="status">{t('mapRouteReady')}</p> : null}
          <div className="map-recovery-actions">
            <button type="button" onClick={returnToEarth}>{t('returnToEarth')}</button>
            <button type="button" onClick={returnToEarth}>⌖ {t('mapFindWayBack')}</button>
          </div>
          <p className="map-preview-disclaimer">{t('mapPreviewOnly')}</p>
        </aside>
      </section>
      <footer className="map-footer"><span>{t('mapScaleNote')}</span><Link href="/worlds">{t('mapCatalogLink')} ↗</Link></footer>
    </main>
  );
}

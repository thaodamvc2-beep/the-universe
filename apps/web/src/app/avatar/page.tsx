'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { useSite } from '@/components/site-provider';
import { CelestialAvatarArtwork } from '@/components/celestial-avatar-artwork';
import { AVATAR_OPTIONS, validateNickname, type AvatarId } from '@/lib/identity/guest-identity.mjs';

export default function AvatarPage() {
  const { t, guestIdentity, identityReady, updateGuestIdentity } = useSite();
  const [avatarId, setAvatarId] = useState<AvatarId>('stardust');
  const [nickname, setNickname] = useState('');
  const [saved, setSaved] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);

  useEffect(() => {
    if (!guestIdentity) return;
    setAvatarId(guestIdentity.avatarId);
    setNickname(guestIdentity.nickname);
  }, [guestIdentity]);

  const validation = useMemo(() => validateNickname(nickname), [nickname]);
  const selectedName = t(`avatarName_${avatarId}` as never);

  function saveIdentity() {
    if (!validation.valid) return;
    const persisted = updateGuestIdentity({ avatarId, nickname: validation.value });
    setSaved(persisted);
    setStorageFailed(!persisted);
  }

  return (
    <main id="main-content" className="avatar-page avatar-sanctuary">
      <SiteHeader />
      <section className="avatar-intro avatar-sanctuary-intro">
        <p className="eyebrow"><span className="eyebrow-line" />{t('avatarEyebrow')}</p>
        <h1>{t('avatarTitle')}</h1>
        <p>{t('avatarDescription')}</p>
      </section>

      {!identityReady || !guestIdentity ? (
        <p className="avatar-loading" role="status">{t('loadingLabel')}</p>
      ) : (
        <section className="avatar-editor avatar-sanctuary-editor" aria-label={t('avatarEditorLabel')}>
          <div className="avatar-stage-column">
            <div className="avatar-phone-stage">
              <div className="avatar-phone-topline"><span>✦ THE UNIVERSE</span><span>{t('yourPresence')}</span></div>
              <div className="avatar-phone-screen">
                <div className={`avatar-artwork avatar-artwork-${avatarId}`} role="img" aria-label={`${selectedName} celestial avatar`}>
                  <span className="avatar-art-glow" />
                  <span className="avatar-art-orbit avatar-art-orbit-one" />
                  <span className="avatar-art-orbit avatar-art-orbit-two" />
                  <CelestialAvatarArtwork avatarId={avatarId} className="avatar-portrait avatar-stage-illustration" />
                  <span className="avatar-art-stars" aria-hidden="true">✦　·　✧　　·　✦</span>
                </div>
                <div className="avatar-phone-caption">
                  <span>{t('guestIdentityLabel')}</span>
                  <strong>{nickname.trim() || guestIdentity.nickname}</strong>
                  <small>{selectedName}</small>
                </div>
              </div>
              <div className="avatar-phone-home-indicator" />
            </div>
            <p className="avatar-stage-note">✧ {t('yourPresence')} · {selectedName}</p>
          </div>

          <div className="avatar-customizer">
            <div className="avatar-customizer-heading">
              <div><span className="avatar-kicker">{t('chooseAvatar')}</span><h2>{selectedName}</h2></div>
              <span className="avatar-count">0{AVATAR_OPTIONS.findIndex((item) => item.id === avatarId) + 1} / 06</span>
            </div>
            <div className="avatar-options avatar-sanctuary-options" role="group" aria-label={t('chooseAvatar')}>
              {AVATAR_OPTIONS.map((avatar, index) => (
                <button
                  key={avatar.id}
                  type="button"
                  className="avatar-option avatar-sanctuary-option"
                  aria-pressed={avatarId === avatar.id}
                  onClick={() => { setAvatarId(avatar.id); setSaved(false); setStorageFailed(false); }}
                >
                  <CelestialAvatarArtwork avatarId={avatar.id} className="avatar-portrait avatar-choice-illustration" />
                  <span className="avatar-option-name">{t(`avatarName_${avatar.id}` as never)}</span>
                  <span className="avatar-option-index">0{index + 1}</span>
                </button>
              ))}
            </div>

            <div className="avatar-name-block">
              <label className="nickname-label" htmlFor="guest-nickname">{t('nicknameLabel')}</label>
              <input
                id="guest-nickname"
                className="nickname-input"
                value={nickname}
                onChange={(event) => { setNickname(event.target.value); setSaved(false); setStorageFailed(false); }}
                autoComplete="nickname"
                spellCheck={false}
                aria-describedby="nickname-help nickname-feedback"
              />
              <p className="nickname-help" id="nickname-help">{t('nicknameHelp')}</p>
              <p className={`nickname-feedback ${validation.valid ? 'is-valid' : 'is-invalid'}`} id="nickname-feedback" aria-live="polite">
                {validation.valid ? t('nicknameValid') : t(`nicknameError_${validation.reason}` as never)}
              </p>
            </div>
            <button className="avatar-save-button avatar-sanctuary-save" type="button" disabled={!validation.valid} onClick={saveIdentity}>
              <span>✧</span>{t('saveIdentity')}<span>✧</span>
            </button>
            <p className="avatar-save-status" role="status" aria-live="polite">
              {saved ? t('identitySaved') : storageFailed ? t('identityMemoryOnly') : t('identityLocalNote')}
            </p>
            <Link className="avatar-signin-link" href="/account">{t('optionalSignIn')}</Link>
          </div>
        </section>
      )}

      <footer className="avatar-footer avatar-sanctuary-footer">
        <Link className="back-home-link" href="/prototype">{t('continueAsGuest')}</Link>
        <span>{t('identityPrivacyNote')}</span>
      </footer>
    </main>
  );
}

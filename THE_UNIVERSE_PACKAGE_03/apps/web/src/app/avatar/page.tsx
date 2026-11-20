'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { useSite } from '@/components/site-provider';
import { AVATAR_OPTIONS, validateNickname, type AvatarId } from '@/lib/identity/guest-identity';

export default function AvatarPage() {
  const { t, guestIdentity, identityReady, updateGuestIdentity } = useSite();
  const [avatarId, setAvatarId] = useState<AvatarId>('stardust');
  const [nickname, setNickname] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!guestIdentity) return;
    setAvatarId(guestIdentity.avatarId);
    setNickname(guestIdentity.nickname);
  }, [guestIdentity]);

  const validation = useMemo(() => validateNickname(nickname), [nickname]);

  function saveIdentity() {
    if (!validation.valid) return;
    updateGuestIdentity({ avatarId, nickname: validation.value });
    setSaved(true);
  }

  return (
    <main id="main-content" className="avatar-page">
      <SiteHeader />
      <section className="avatar-intro">
        <p className="eyebrow"><span className="eyebrow-line" />{t('avatarEyebrow')}</p>
        <h1>{t('avatarTitle')}</h1>
        <p>{t('avatarDescription')}</p>
      </section>

      {!identityReady || !guestIdentity ? (
        <p className="avatar-loading" role="status">{t('loadingLabel')}</p>
      ) : (
        <section className="avatar-editor" aria-label={t('avatarEditorLabel')}>
          <div className="avatar-preview-panel">
            <span className={`avatar-portrait avatar-${avatarId}`} aria-hidden="true"><i /><b /></span>
            <span className="avatar-preview-caption">{t('yourPresence')}</span>
            <strong className="avatar-preview-name">{nickname.trim() || guestIdentity.nickname}</strong>
            <span className="avatar-guest-label">{t('guestIdentityLabel')}</span>
          </div>

          <div className="avatar-controls">
            <div className="avatar-section-heading">
              <span>{t('chooseAvatar')}</span>
              <span>{t('avatarOptionsCount')}</span>
            </div>
            <div className="avatar-options" role="group" aria-label={t('chooseAvatar')}>
              {AVATAR_OPTIONS.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  className="avatar-option"
                  aria-pressed={avatarId === avatar.id}
                  onClick={() => { setAvatarId(avatar.id); setSaved(false); }}
                >
                  <span className={`avatar-portrait avatar-${avatar.id}`} aria-hidden="true"><i /><b /></span>
                  <span>{t(`avatarName_${avatar.id}` as never)}</span>
                </button>
              ))}
            </div>

            <label className="nickname-label" htmlFor="guest-nickname">{t('nicknameLabel')}</label>
            <input
              id="guest-nickname"
              className="nickname-input"
              value={nickname}
              onChange={(event) => { setNickname(event.target.value); setSaved(false); }}
              autoComplete="nickname"
              spellCheck={false}
              aria-describedby="nickname-help nickname-feedback"
            />
            <p className="nickname-help" id="nickname-help">{t('nicknameHelp')}</p>
            <p className={`nickname-feedback ${validation.valid ? 'is-valid' : 'is-invalid'}`} id="nickname-feedback" aria-live="polite">
              {validation.valid ? t('nicknameValid') : t(`nicknameError_${validation.reason}` as never)}
            </p>
            <button className="avatar-save-button" type="button" disabled={!validation.valid} onClick={saveIdentity}>
              {t('saveIdentity')}
            </button>
            <p className="avatar-save-status" role="status" aria-live="polite">
              {saved ? t('identitySaved') : t('identityLocalNote')}
            </p>
            <Link className="avatar-signin-link" href="/account">{t('optionalSignIn')}</Link>
          </div>
        </section>
      )}

      <footer className="avatar-footer">
        <Link className="back-home-link" href="/prototype">{t('continueAsGuest')}</Link>
        <span>{t('identityPrivacyNote')}</span>
      </footer>
    </main>
  );
}

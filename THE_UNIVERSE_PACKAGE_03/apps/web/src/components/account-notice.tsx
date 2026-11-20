'use client';

import Link from 'next/link';
import { useSite } from '@/components/site-provider';

export function AccountNotice() {
  const { t } = useSite();
  return (
    <section className="account-notice">
      <p className="eyebrow"><span className="eyebrow-line" />{t('accountEyebrow')}</p>
      <h1>{t('accountTitle')}</h1>
      <p>{t('accountDescription')}</p>
      <div className="account-status">{t('accountUnavailable')}</div>
      <p className="account-explanation">{t('accountGuestData')}</p>
      <Link className="primary-action" href="/avatar">{t('backToAvatar')}</Link>
    </section>
  );
}

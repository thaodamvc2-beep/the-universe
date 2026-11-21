'use client';

import Link from 'next/link';
import { useSite } from '@/components/site-provider';

export default function NotFound() {
  const { t } = useSite();
  return (
    <main className="state-page">
      <p className="eyebrow">{t('notFoundEyebrow')}</p>
      <h1>{t('notFoundTitle')}</h1>
      <p>{t('notFoundDescription')}</p>
      <Link className="retry-button" href="/">{t('backHome')}</Link>
    </main>
  );
}

'use client';

import { useSite } from '@/components/site-provider';

export default function Loading() {
  const { t } = useSite();
  return (
    <main className="state-page" aria-live="polite" aria-busy="true">
      <span className="loader" aria-hidden="true" />
      <p>{t('loadingLabel')}</p>
    </main>
  );
}

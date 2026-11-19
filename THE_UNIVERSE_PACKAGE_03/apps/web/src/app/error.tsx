'use client';

import { useEffect } from 'react';
import { useSite } from '@/components/site-provider';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useSite();
  useEffect(() => {
    console.error('Application boundary caught an error.', error);
  }, [error]);

  return (
    <main className="state-page" role="alert">
      <p className="eyebrow">{t('errorEyebrow')}</p>
      <h1>{t('errorTitle')}</h1>
      <p>{t('errorDescription')}</p>
      <button className="retry-button" onClick={() => reset()}>{t('retryLabel')}</button>
    </main>
  );
}

import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { AccountNotice } from '@/components/account-notice';
import { useSite } from '@/components/site-provider';

export default function AccountPage() {
  const { t } = useSite();
  return (
    <main id="main-content" className="account-page">
      <SiteHeader />
      <AccountNotice />
      <footer className="avatar-footer">
        <Link className="back-home-link" href="/avatar">{t('backToAvatar')}</Link>
        <Link className="back-home-link" href="/">{t('returnToEarth')}</Link>
      </footer>
    </main>
  );
}

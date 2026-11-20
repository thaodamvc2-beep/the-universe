import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { AccountNotice } from '@/components/account-notice';

export default function AccountPage() {
  return (
    <main id="main-content" className="account-page">
      <SiteHeader />
      <AccountNotice />
      <footer className="avatar-footer">
        <Link className="back-home-link" href="/avatar">BACK TO MY AVATAR</Link>
        <Link className="back-home-link" href="/">RETURN TO EARTH</Link>
      </footer>
    </main>
  );
}

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteProvider } from '@/components/site-provider';
import './globals.css';

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: { default: 'THE UNIVERSE — A Quiet Place Beyond the Stars', template: '%s | THE UNIVERSE' },
  description: 'A quiet place beyond the stars. Begin your journey from Earth.',
  applicationName: 'THE UNIVERSE',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#070a17',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}

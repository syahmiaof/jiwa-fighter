import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/refinements.css';
import '@/styles/motion.css';
import '@/styles/satria.css';
import '@/styles/home-intro.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { CartProvider } from '@/lib/cart/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { DemoModalWrapper } from '@/components/ui/DemoModalWrapper';
import { SatriaConcierge } from '@/components/satria/SatriaConcierge';

const displayFont = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const canonicalSiteUrl = 'https://jiwafighter.syahmiaof.my';
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = configuredSiteUrl
  ? (/^https?:\/\//i.test(configuredSiteUrl) ? configuredSiteUrl : `https://${configuredSiteUrl}`)
  : canonicalSiteUrl;

const siteTitle = 'JIWA FIGHTER — Iron Heritage Combatwear';
const siteDescription = 'Premium Malaysian combatwear rooted in heritage and built for movement.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | JIWA FIGHTER',
  },
  description:
    'Premium Malaysian combatwear and heritage streetwear. Engineered for discipline, movement, and identity.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'JIWA FIGHTER',
    title: siteTitle,
    description: siteDescription,
    locale: 'en_MY',
    images: [
      {
        url: `${siteUrl}/opengraph-image.jpg`,
        secureUrl: `${siteUrl}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'JIWA FIGHTER — Malaysian combatwear rooted in heritage and built for movement',
      },
      {
        url: `${siteUrl}/opengraph-image.png`,
        secureUrl: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'JIWA FIGHTER — Malaysian combatwear rooted in heritage and built for movement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/opengraph-image.jpg`],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-bone min-h-screen flex flex-col font-sans selection:bg-brass selection:text-obsidian">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <a href="#main-content" className="skip-link">Skip to content</a>
            <main id="main-content" tabIndex={-1} className="flex-1 w-full">{children}</main>
            <Footer />
            <CartDrawer />
            <DemoModalWrapper />
            <SatriaConcierge />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

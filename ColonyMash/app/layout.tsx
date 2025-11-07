import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { env } from '@/lib/env'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Vote ${env.breweryName} — Best Of Atascadero`,
  description: 'Help a local, brewer-owned taproom win Best Of. Quick link to the official ballot—no incentives, no data capture.',
  openGraph: {
    title: `Vote ${env.breweryName} — Best Of Atascadero`,
    description: 'Help a local, brewer-owned taproom win Best Of. Quick link to the official ballot—no incentives, no data capture.',
    type: 'website',
    locale: 'en_US',
    siteName: env.breweryName,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${env.breweryName} - Vote for Best Of`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Vote ${env.breweryName} — Best Of Atascadero`,
    description: 'Help a local, brewer-owned taproom win Best Of. Quick link to the official ballot—no incentives, no data capture.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: env.breweryName,
  address: {
    '@type': 'PostalAddress',
    streetAddress: env.address.split(',')[0],
    addressLocality: 'Atascadero',
    addressRegion: 'CA',
    postalCode: '93422',
    addressCountry: 'US',
  },
  telephone: env.contactPhone,
  email: env.contactEmail,
  url: typeof window !== 'undefined' ? window.location.origin : '',
  sameAs: [
    env.instagramUrl,
    env.facebookUrl,
  ],
  openingHours: 'Th-Su 15:00-21:00',
  priceRange: '$$',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --accent: ${env.primaryAccent}; }`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#hero" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}

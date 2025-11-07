'use client'

import Link from 'next/link'
import { env } from '@/lib/env'
import { CTA } from './CTA'

export function StickyHeader() {
  return (
    <header
      id="site-top"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/10"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo/Wordmark */}
          <Link
            href="/"
            className="font-heading text-lg sm:text-xl font-bold hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 rounded px-2 -mx-2"
          >
            {env.breweryName}
          </Link>

          {/* CTA Button */}
          <CTA
            size="small"
            data-testid="header-vote-cta"
          >
            Vote Now
          </CTA>
        </div>
      </div>
    </header>
  )
}

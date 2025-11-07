'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { StickyHeader } from '@/components/StickyHeader'
import { Countdown } from '@/components/Countdown'
import { CTA } from '@/components/CTA'
import { SocialIcons } from '@/components/SocialIcons'
import { env } from '@/lib/env'
import { hasConsent, grantConsent, initializeAnalytics } from '@/lib/analytics'

export default function Home() {
  const [showConsentBanner, setShowConsentBanner] = useState(false)
  const [votingClosed, setVotingClosed] = useState(false)

  useEffect(() => {
    // Check consent status
    if (!hasConsent() && env.gaMeasurementId) {
      setShowConsentBanner(true)
    } else if (hasConsent()) {
      initializeAnalytics()
    }

    // Check if voting has ended
    if (env.voteEndsISO) {
      const checkVotingStatus = () => {
        const now = Date.now()
        const endTime = new Date(env.voteEndsISO!).getTime()
        setVotingClosed(now > endTime)
      }
      checkVotingStatus()
      const interval = setInterval(checkVotingStatus, 1000)
      return () => clearInterval(interval)
    }
  }, [])

  const handleConsent = () => {
    grantConsent()
    setShowConsentBanner(false)
  }

  return (
    <>
      <StickyHeader />

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative section-padding bg-gradient-to-br from-white to-black/5">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-6 sm:space-y-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  Help Crown Atascadero&apos;s Favorite Brewery.
                </h1>

                <p className="text-lg sm:text-xl text-black/70 text-balance">
                  Two clicks. Big impact. Thanks for supporting local craft.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Countdown />
                </div>

                {!votingClosed ? (
                  <>
                    <CTA data-testid="hero-vote-cta">
                      Cast My Vote
                    </CTA>

                    <p className="text-xs text-black/60 max-w-lg">
                      We only link to the official ballot to make voting easier. We are not
                      affiliated with the publisher and do not submit votes on your behalf.{' '}
                      <a
                        href={env.voteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-accent transition-colors"
                      >
                        Review rules on the official site.
                      </a>
                    </p>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/10 rounded-xl">
                    <span className="text-lg font-medium">Voting Closed</span>
                  </div>
                )}
              </div>

              {/* Hero Image */}
              <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-black/10">
                {/* Placeholder for hero image - replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <p className="text-6xl font-heading font-bold">🍺</p>
                    <p className="text-lg font-heading font-bold text-black/40">
                      {env.breweryName}
                    </p>
                    <p className="text-sm text-black/30">
                      Place hero.jpg in /public directory
                    </p>
                  </div>
                </div>
                {/* Uncomment when image is available:
                <Image
                  src="/hero.jpg"
                  alt="Colony Mash Brewing taproom"
                  fill
                  priority
                  className="object-cover"
                />
                */}
              </div>
            </div>
          </div>
        </section>

        {/* How-To Section */}
        <section id="how-to" className="section-padding bg-white">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Three Simple Steps
              </h2>
              <p className="text-lg text-black/70">
                No purchase. No incentives. Just your voice.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <Step number={1} title="Open the ballot">
                Click the button to access the official voting page in a new tab.
              </Step>
              <Step number={2} title="Choose our category">
                Find the Best Brewery category and select Colony Mash Brewing.
              </Step>
              <Step number={3} title="Submit your vote">
                Complete and submit your vote directly on the official ballot.
              </Step>
            </div>
          </div>
        </section>

        {/* Why Vote Section */}
        <section id="why-vote" className="section-padding bg-gradient-to-br from-black/5 to-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                Why Vote for Us?
              </h2>

              <div className="grid sm:grid-cols-3 gap-6">
                <ValueCard>
                  Independent, brewer-owned
                </ValueCard>
                <ValueCard>
                  Small-batch beers &amp; hard seltzers
                </ValueCard>
                <ValueCard>
                  Community taproom in Atascadero
                </ValueCard>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Us Section */}
        <section id="visit" className="section-padding bg-white">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Visit Our Taproom
              </h2>

              <div className="space-y-2 text-lg">
                <p className="font-medium">
                  {env.hours}
                </p>
                <p className="text-black/70">
                  {env.address}
                </p>
              </div>

              <a
                href={env.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
                aria-label="Get directions on Google Maps"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>

        {/* Social Section */}
        <section id="social" className="section-padding bg-gradient-to-br from-black/5 to-white">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Follow Our Journey
              </h2>
              <p className="text-lg text-black/70">
                Stay updated on new releases, events, and taproom happenings.
              </p>
              <div className="flex justify-center">
                <SocialIcons />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section-padding bg-white">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                Questions?
              </h2>

              <div className="space-y-8">
                <FAQ
                  question="Do you collect or submit my vote?"
                  answer="No. We only link you to the official ballot. All voting happens directly on the publisher's site. We never collect, store, or submit votes on anyone's behalf."
                />
                <FAQ
                  question="Are you offering incentives?"
                  answer="No. That's not allowed by most contests and we don't do it. We're simply making it easier for supporters to find the official ballot."
                />
                <FAQ
                  question="How do I know this is legitimate?"
                  answer="Click any 'Vote' button to verify it takes you to the official ballot page. You'll see the publisher's URL in your browser. We're not affiliated with the contest—we just provide a convenient link."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="section-padding bg-black text-white">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-heading font-bold text-xl mb-4">
                  {env.breweryName}
                </h3>
                <p className="text-white/70">
                  {env.city}
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold mb-4">Contact</h4>
                <div className="space-y-2 text-white/70">
                  <p>
                    <a href={`mailto:${env.contactEmail}`} className="hover:text-accent transition-colors">
                      {env.contactEmail}
                    </a>
                  </p>
                  <p>
                    <a href={`tel:${env.contactPhone.replace(/\D/g, '')}`} className="hover:text-accent transition-colors">
                      {env.contactPhone}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold mb-4">Legal</h4>
                <a href="/privacy" className="text-white/70 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-center text-white/60 text-sm">
              <p>© {new Date().getFullYear()} {env.breweryName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Consent Banner */}
      {showConsentBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white p-4 shadow-xl">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm">
                We use basic analytics to understand how people use this site. No personal data is collected.
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => setShowConsentBanner(false)}
                  className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleConsent}
                  className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-medium"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Helper Components
function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold font-heading">
        {number}
      </div>
      <h3 className="text-xl font-bold font-heading">{title}</h3>
      <p className="text-black/70">{children}</p>
    </div>
  )
}

function ValueCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-white rounded-xl border-2 border-black/10 hover:border-accent transition-colors">
      <p className="font-medium text-center">{children}</p>
    </div>
  )
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold font-heading">{question}</h3>
      <p className="text-black/70 leading-relaxed">{answer}</p>
    </div>
  )
}

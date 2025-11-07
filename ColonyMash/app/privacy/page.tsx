import Link from 'next/link'
import { env } from '@/lib/env'

export const metadata = {
  title: `Privacy Policy - ${env.breweryName}`,
  description: 'Privacy policy for our voting information page',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10">
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href="/"
              className="font-heading text-lg sm:text-xl font-bold hover:text-accent transition-colors"
            >
              {env.breweryName}
            </Link>
            <Link
              href="/"
              className="text-sm text-black/60 hover:text-accent transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-bold font-heading mb-8">Privacy Policy</h1>

            <p className="text-black/70 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Overview</h2>
              <p className="text-black/70 leading-relaxed">
                This page exists solely to link supporters to the official voting ballot. We do not
                collect, store, or submit votes on anyone&apos;s behalf.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Data Collection</h2>
              <p className="text-black/70 leading-relaxed mb-4">
                We may use basic analytics (Google Analytics) if you consent via the banner.
                Analytics data includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/70">
                <li>Page views and session duration</li>
                <li>Device type and browser information</li>
                <li>General geographic location (city/region level)</li>
                <li>Button click events (anonymized)</li>
              </ul>
              <p className="text-black/70 leading-relaxed mt-4">
                <strong>We do NOT collect:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/70">
                <li>Personal identifying information</li>
                <li>Email addresses or contact details</li>
                <li>Voting preferences or ballot submissions</li>
                <li>Any data that could identify individual users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Third-Party Services</h2>
              <p className="text-black/70 leading-relaxed">
                When you click &quot;Vote&quot; buttons, you are redirected to the official ballot website.
                That site has its own privacy policy, which governs any data you submit there.
                We are not affiliated with or responsible for that site&apos;s data practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Your Choices</h2>
              <p className="text-black/70 leading-relaxed">
                You can decline analytics tracking via the consent banner. Your choice is stored
                locally in your browser. We respect Do Not Track signals and similar privacy preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Contact</h2>
              <p className="text-black/70 leading-relaxed">
                Questions about this privacy policy? Contact us at{' '}
                <a
                  href={`mailto:${env.contactEmail}`}
                  className="text-accent hover:underline"
                >
                  {env.contactEmail}
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Changes</h2>
              <p className="text-black/70 leading-relaxed">
                We may update this policy as needed. Continued use of this page constitutes
                acceptance of any changes.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

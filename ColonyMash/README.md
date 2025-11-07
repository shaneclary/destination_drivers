# Colony Mash Brewing - Voting Landing Page

A production-ready, mobile-first voting landing page built with Next.js 14, TypeScript, and Tailwind CSS. This page provides a compliant, user-friendly way to link supporters to the official Best Of ballot.

## Features

- **Mobile-first responsive design** optimized for all devices
- **WCAG AA accessible** with keyboard navigation and screen reader support
- **Zero incentives** - fully compliant with contest rules
- **Privacy-first analytics** with consent management
- **Real-time countdown** to voting deadline
- **Production-ready** with comprehensive testing

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Fonts:** Manrope (headings) + Inter (body)
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository and navigate to the ColonyMash directory:

```bash
cd ColonyMash
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy the environment template:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_VOTE_URL=https://your-actual-ballot-url.com
NEXT_PUBLIC_VOTE_ENDS_ISO=2025-11-20T23:59:00-08:00
# ... other variables
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

All configuration is managed through environment variables. See `.env.example` for the complete list. Key variables:

- `NEXT_PUBLIC_VOTE_URL` - **REQUIRED** - Direct link to the official ballot
- `NEXT_PUBLIC_VOTE_ENDS_ISO` - Optional countdown end date/time
- `NEXT_PUBLIC_BREWERY_NAME` - Your brewery name
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Optional Google Analytics ID

## Adding Images

### Hero Image

Place your hero image at `public/hero.jpg` (recommended: 1200x900px or larger, optimized for web).

The page will automatically use it. Current fallback shows a placeholder.

### Open Graph Image

Place your social sharing image at `public/og.jpg` (recommended: 1200x630px).

This appears when the page is shared on social media.

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run test      # Run tests
npm run typecheck # Type check without building
```

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:
- CTA button functionality
- Correct URL linking with `target="_blank"`
- Accessibility features
- Keyboard navigation

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the static export:

```bash
npm run build
```

Deploy the `.next` directory to your hosting platform.

## Compliance Features

✅ **No incentives** - No discounts, prizes, or value exchange
✅ **No auto-submission** - Only links to official ballot
✅ **Clear disclosure** - Compliance text above the fold
✅ **Privacy-first** - Optional analytics with consent
✅ **Transparent** - Links to contest rules

## Accessibility

- WCAG AA compliant contrast ratios (4.5:1+)
- Keyboard navigable with visible focus states
- Screen reader friendly with proper ARIA labels
- Skip link for main content
- Semantic HTML structure

## Performance

Optimized for Lighthouse scores:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

## Project Structure

```
ColonyMash/
├── app/
│   ├── layout.tsx       # Root layout with fonts & metadata
│   ├── page.tsx         # Main landing page
│   ├── privacy/
│   │   └── page.tsx     # Privacy policy page
│   └── globals.css      # Global styles & design system
├── components/
│   ├── CTA.tsx          # Call-to-action button
│   ├── Countdown.tsx    # Voting countdown timer
│   ├── SocialIcons.tsx  # Social media icons
│   └── StickyHeader.tsx # Sticky navigation header
├── lib/
│   ├── analytics.ts     # Analytics with consent management
│   └── env.ts           # Environment variable parsing
├── __tests__/
│   └── cta.test.tsx     # CTA component tests
└── public/
    ├── robots.txt       # Search engine instructions
    └── sitemap.xml      # Sitemap for SEO
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private - Colony Mash Brewing

## Support

For questions or issues, contact: info@colonymashbrewing.com

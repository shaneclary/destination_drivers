// Safe environment variable parsing with fallbacks

export const env = {
  // Required voting URL
  voteUrl: process.env.NEXT_PUBLIC_VOTE_URL || 'https://example.com/vote',

  // Optional voting end date (ISO format)
  voteEndsISO: process.env.NEXT_PUBLIC_VOTE_ENDS_ISO || null,

  // Brewery information
  breweryName: process.env.NEXT_PUBLIC_BREWERY_NAME || 'Colony Mash Brewing',
  city: process.env.NEXT_PUBLIC_CITY || 'Atascadero, CA',
  address: process.env.NEXT_PUBLIC_ADDRESS || '6550 El Camino Real, Atascadero, CA 93422',
  hours: process.env.NEXT_PUBLIC_HOURS || 'Thu–Sun • 3–9p',

  // Links
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.google.com',
  instagramUrl: process.env.NEXT_PUBLIC_IG_URL || 'https://instagram.com/colonymashbrewing',
  facebookUrl: process.env.NEXT_PUBLIC_FB_URL || 'https://facebook.com/colonymashbrewing',

  // Contact
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@colonymashbrewing.com',
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '(805) 555-0100',

  // Analytics
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null,

  // Styling
  primaryAccent: process.env.NEXT_PUBLIC_PRIMARY_ACCENT || '#7C5CFF',
} as const

export type Env = typeof env

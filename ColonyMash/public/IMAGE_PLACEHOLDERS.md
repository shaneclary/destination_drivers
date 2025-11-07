# Image Assets

This directory should contain the following images for optimal display:

## Required Images

### 1. hero.jpg
- **Purpose:** Main hero section image on the homepage
- **Recommended dimensions:** 1200x900px minimum (4:3 aspect ratio)
- **Format:** JPEG (optimized for web, 80-90% quality)
- **Subject:** Taproom interior, beer lineup, or branded imagery
- **Location:** `/public/hero.jpg`

Currently, a placeholder gradient is shown. Once you add `hero.jpg`, uncomment the Image component in `app/page.tsx` (line ~144).

### 2. og.jpg
- **Purpose:** Open Graph image for social media sharing (Facebook, Twitter, LinkedIn, etc.)
- **Recommended dimensions:** 1200x630px (exact)
- **Format:** JPEG or PNG
- **Subject:** Branded image with text overlay (if any)
- **Location:** `/public/og.jpg`

This image appears when someone shares your site on social media.

## Optional Images

### favicon.ico
- **Purpose:** Browser tab icon
- **Recommended dimensions:** 32x32px or 64x64px
- **Format:** ICO
- **Location:** `/public/favicon.ico`

Next.js will automatically use this if present in the public directory.

## Image Optimization Tips

1. **Compress images** before uploading using tools like:
   - [TinyPNG](https://tinypng.com)
   - [Squoosh](https://squoosh.app)
   - ImageOptim (Mac)

2. **Use appropriate formats:**
   - JPEG for photos
   - PNG for images with transparency
   - WebP for modern browsers (Next.js handles this automatically)

3. **Responsive images:**
   - Next.js Image component automatically generates multiple sizes
   - Original should be at least 2x the display size for retina screens

## Adding Images

1. Place image files in `/public/` directory
2. Images in `/public/` are served from the root URL
3. Reference as `/hero.jpg` (not `/public/hero.jpg`)
4. Uncomment the Next.js Image components in the code

## Current Status

- [ ] hero.jpg - **Missing** (placeholder gradient shown)
- [ ] og.jpg - **Missing** (default OG image)
- [ ] favicon.ico - **Missing** (browser default shown)

Replace this file with actual images before production deployment.

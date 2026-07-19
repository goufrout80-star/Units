# Units. — immersive student living experience

A production-ready, original Next.js interpretation of the Units visual language: bold color, architectural layouts, editorial typography, playful grid systems, motion-led storytelling and a complete student-home enquiry journey.

## Experience

- Continuous long-form homepage with eight immersive sections
- Fixed color-coded desktop navigation and responsive mobile menu
- Scroll-linked hero, reveal animations and animated marquees
- Pointer-reactive canvas corridor
- Original optimized visual assets
- Dedicated Student Homes experience with four interactive room types
- Detailed amenities, shared-space gallery and accessible FAQ accordion
- Four-step booking journey with validation, review and success state
- Contact page with enquiry form state
- Responsive layouts from mobile through widescreen
- Reduced-motion support and keyboard-visible focus states

## Routes

- `/` — homepage
- `/homes` — rooms, amenities and building
- `/book` — booking journey
- `/contact` — contact details and enquiry form

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run lint
npm run build
npm start
```

## Deploy on Vercel

Import this repository into Vercel and deploy. The framework, build command and output are detected automatically. No environment variable is required for the current front-end experience.

Set `NEXT_PUBLIC_SITE_URL` to the final production URL for canonical social metadata. Before accepting real enquiries, connect the booking and contact submit handlers to an email, database or CRM endpoint.

## Stack

- Next.js App Router
- React + TypeScript
- Motion
- HTML Canvas
- Lucide icon system
- Next Image with local WebP assets

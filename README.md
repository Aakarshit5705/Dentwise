# DentWise

AI-powered dental assistant and booking UI built with Next.js, Clerk, Prisma, Resend and VAPI.

## Tech stack

- Framework: Next.js (App Router)
- Language: TypeScript + React
- Auth: Clerk (`@clerk/nextjs`)
- Database ORM: Prisma with PostgreSQL
- Email: Resend (`resend`) + `@react-email` for templates
- Voice AI: VAPI (`@vapi-ai/web`) integration
- State / Data fetching: `@tanstack/react-query`
- Styling: Tailwind CSS (v4) + PostCSS
- UI primitives: Radix UI + lucide-react + custom components
- Tooling: Biome (lint/format), TypeScript

## Key project files & folders

- `src/app/` — Next.js App Router pages and routes (server and client components)
- `src/app/api/send-appointment-email/route.ts` — API route that sends confirmation emails via Resend
- `src/lib/prisma.ts` — Prisma client wrapper (db access)
- `src/lib/resend.ts` — Resend client
- `src/lib/vapi.ts` — VAPI client wrapper
- `src/proxy.ts` — Clerk middleware configuration
- `prisma/schema.prisma` — Prisma schema and models (`User`, `Doctor`, `Appointment`)

## Important routes / pages

- `/` — Landing
- `/appointments` — Appointment booking flow UI
- `/dashboard` — User dashboard
- `/admin` — Admin dashboard / doctor management
- `/pro` — Pricing / pro features
- `/voice` — Voice AI assistant integration (VAPI)
- `POST /api/send-appointment-email` — Send appointment confirmation email (Resend)

## Environment variables

Create a `.env` file (do not commit secrets). Required variables include:

- `DATABASE_URL` — Postgres connection string used by Prisma
- `RESEND_API_KEY` — API key for Resend email service
- `NEXT_PUBLIC_VAPI_API_KEY` — Public VAPI API key for client usage
- `NEXT_PUBLIC_VAPI_ASSISTANT_ID` — VAPI assistant ID
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk publishable key
- `CLERK_SECRET_KEY` — Clerk secret key
- `NEXT_PUBLIC_APP_URL` — e.g. `http://localhost:3000`

Optional / additional variables used across the codebase may include other Clerk config values.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Set up `.env` with the variables listed above.

3. Initialize the database (Prisma + PostgreSQL):

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run the dev server:

```bash
npm run dev
```

## Available scripts

- `npm run dev` — Start Next.js dev server
- `npm run build` — Build app for production
- `npm start` — Start built app
- `npm run lint` — Run Biome checks
- `npm run format` — Format with Biome

## Database

Prisma is configured for PostgreSQL in `prisma/schema.prisma`. Models include `User`, `Doctor` and `Appointment`.

Common commands:

```bash
npx prisma migrate dev
npx prisma studio
npx prisma generate
```

## Third-party integrations

- Clerk: user auth and session management. See `src/proxy.ts` and `src/app/layout.tsx` for integration points.
- Resend: transactional emails via `src/app/api/send-appointment-email/route.ts` and `src/lib/resend.ts`.
- VAPI: voice assistant used by the `/voice` page (client + server wrappers in `src/lib/vapi.ts`).

## Notes for maintainers

- Sensitive keys must be kept out of source control. Use environment variables or secrets manager.
- The app uses the Next.js App Router; server components and server-only code should remain inside `src/app` or `src/lib` server-safe modules.
- Biome is configured for linting and formatting — keep code style consistent by running `npm run format` and `npm run lint`.

## Contributing

1. Fork the repo and create a feature branch.
2. Run tests / linting locally and open a PR with clear description.

---

If you want, I can also add a `.env.example` file, a short CONTRIBUTING.md, or tweak the README to include screenshots and example curl requests for the API routes. Which would you like next?This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

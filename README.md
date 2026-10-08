# Sid's Tattoo

Photo submission and voting site. Built with Next.js 16 (App Router), Neon Postgres (Drizzle ORM) and Vercel Blob.

## Setup

1. Create a Vercel project from this repo (`npx vercel link`).
2. In the Vercel dashboard, open **Storage** and add:
   - **Neon** (Postgres), which sets `DATABASE_URL`
   - **Blob**, which sets `BLOB_READ_WRITE_TOKEN`
3. Pull the env vars locally: `npx vercel env pull .env.local`
4. Create the tables: `npx drizzle-kit push`
5. Run it: `npm run dev` → http://localhost:3000

Deploy with `git push` (once Vercel's GitHub integration is connected) or `npx vercel --prod`.

## Placeholders to edit

- Bullet points: `components/InfoList.tsx`
- Countdown target date: `TARGET` in `components/Countdown.tsx`
- Title: `components/Header.tsx`

## How voting works

Each browser gets an anonymous `voter_id` cookie. A unique `(photo_id, voter_id)` constraint allows one vote per photo per browser. This stops accidental double-votes but won't stop someone who clears their cookies.

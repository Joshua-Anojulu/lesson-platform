# Lesson Platform: Phase 0

A deployable Next.js App Router concierge pilot for a director's personal private-lesson recommendation roster. This repository implements only the approved Phase 0 pre-validation surface:

- A public roster landing page.
- Three static-data teacher profiles.
- Click-to-load YouTube and Vimeo facades.
- A minimized parent registration form.
- One private `registrations` store.
- Phase 0 data-protection and administrator-disclosure templates.

It intentionally does not include accounts, sessions, auth, memberships, dashboards, payments, Stripe, ledgers, referrals, reviews, scheduling, or SEO listing pages.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

When `DATABASE_URL` is blank, the server action appends private JSON lines to `data/registrations.local.jsonl`. The whole `data/` directory is gitignored. This fallback is for single-machine development and a one-process concierge demo only. It is not durable on Vercel and must not be used for a public serverless deployment.

## Use Postgres

Create a Neon Postgres database, set `DATABASE_URL`, and apply the only migration:

```powershell
psql $env:DATABASE_URL -f migrations/001_create_registrations.sql
```

The migration creates one table, `registrations`, and one functional unique index for the idempotency key: normalized parent email, student first name, and instrument. No other application table exists in Phase 0.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Required for public deployment | Writes registrations to Postgres. Blank uses the local JSONL fallback. |
| `NEXT_PUBLIC_ABUSE_EMAIL` | Required before public distribution | Monitored mailbox used by every public abuse-report link and the privacy request path. |

The checked-in fallback mailbox uses the reserved `.example` domain. Replace it before sharing the roster.

## Quality gates

```powershell
npm test
npm run build
npm run lint
```

The unit suite covers the Zod data boundary, minimized-field rejection, consent, local JSONL writes, duplicate idempotency, per-IP process throttling, and privacy-enhanced video URLs.

To exercise the same migration and idempotency behavior against a disposable Postgres database, set `TEST_DATABASE_URL` before `npm test`. The integration case is skipped when that test-only variable is absent and never reads `DATABASE_URL`.

For the production-browser suite, install Chromium once, build, and run:

```powershell
npx playwright install chromium
npm run build
npm run test:e2e
```

The browser suite checks the five public routes at 375, 768, and 1280 pixels; video-host network privacy; reduced motion; minimized form fields; a real server-action save; cookie absence; and horizontal overflow.

## Video privacy behavior

Teacher pages render a local CSS facade. The initial HTML contains no iframe, remote thumbnail, preconnect, or request to YouTube or Vimeo. An iframe is created only after an explicit button click:

- YouTube uses `https://www.youtube-nocookie.com/embed/...`.
- Vimeo uses `https://player.vimeo.com/video/...?dnt=1`.
- Neither URL enables autoplay.

The checked-in teacher records and hosted-video IDs are realistic pilot placeholders. Replace each sample entry with teacher-approved copy and media after moderation for minors, copyright, and identifying backgrounds.

## Registration security and privacy

- Zod parses the server-action boundary.
- The form has no student last name, birthdate, school, payment, or account field.
- The in-memory per-IP limit allows five attempts per 15 minutes per server process. Serverless instances do not share this memory, so this is friction rather than distributed abuse protection.
- Postgres enforces duplicate idempotency. The local JSONL adapter serializes writes within its process and checks the same key.
- There is no admin or read interface. Operators access the private store through approved provider tools only.
- No third-party analytics, trackers, or advertising scripts are included.

## Deploy to Vercel

1. Complete `docs/DATA-PROTECTION-RECORD.md` and obtain the signed Stage 1 decision in `docs/ADMIN-DISCLOSURE.md` before collecting pilot data.
2. Create Neon Postgres and apply `migrations/001_create_registrations.sql`.
3. Import the repository into Vercel.
4. Set `DATABASE_URL` and a monitored `NEXT_PUBLIC_ABUSE_EMAIL` for Production and Preview as appropriate.
5. Deploy and run the production build and browser checks against the deployed URL.
6. Confirm the registration row appears through the private Neon console. Do not add an application admin page in Phase 0.

Vercel can use the default Next.js build command, `npm run build`.

## Static teacher data

Edit `content/teachers.ts`. Each record contains a slug, name, initials, instruments, short and full bio, rate, rate note, self-reported affiliation, and hosted-video entries. Teacher routes are statically generated at build time from these records.

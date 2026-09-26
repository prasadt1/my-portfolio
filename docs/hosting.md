# Hosting Architecture (Actual)

Single-service deployment:

- One Express app (`server/index.js`), containerized and deployed to Google Cloud Run (`portfolio-service`, `europe-west1`)
- That Express app serves the built static SPA, the server-side SEO/meta rendering (`server/seo.js`), and the `/api/*` endpoints — there is no separate static-hosting tier
- DNS managed in Namecheap

## Architecture

```
Browser
  -> prasadtilloo.com (Cloud Run, Express)
       - static assets from the Vite build (dist/)
       - server-rendered <title>/meta/OG tags per route (server/seo.js)
       - /api/* (Gemini search, project similarity, lead capture)
```

## DNS Setup (Namecheap)

- Apex/root (`prasadtilloo.com`) -> Cloud Run custom domain mapping (Google-managed SSL)
- `www` -> redirects/maps to the same Cloud Run service

There is no `api.prasadtilloo.com` subdomain in production; the frontend calls the API on the same origin.

## Why this works

- One container to build, deploy, and monitor
- Server-side route rendering means crawlers get real per-page `<title>`/meta tags and a real HTTP 404 for unknown paths, without a full SSR framework
- Gemini API keys and other secrets stay server-side, injected via Secret Manager at deploy time (see `cloudbuild.yaml`)

## API Endpoints

- `POST /api/search` (Gemini-powered semantic search with caching)
- `POST /api/project-similarity` (experience-driven AI)
- `POST /api/lead` (lead capture)

## Environment Variables (API)

- `GEMINI_API_KEY`
- `LEAD_STORE_PROVIDER` (json or gsheets)
- `SMTP_*` or `SENDGRID_*` (email)

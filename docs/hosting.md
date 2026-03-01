# Hosting Architecture (Low Cost + High Availability)

Recommended split:

- Static frontend hosted on Cloudflare Pages
- API hosted on Google Cloud Run
- DNS managed in Namecheap

## Architecture

```
Browser
  -> Cloudflare Pages (static site, edge cached)
  -> api.prasadtilloo.com (Cloud Run API for Gemini search + forms)
```

## DNS Setup (Namecheap)

- Apex/root (`prasadtilloo.com`) -> Cloudflare Pages (CNAME/ALIAS)
- `www` -> Cloudflare Pages
- `api` -> Cloud Run custom domain mapping (CNAME to `ghs.googlehosted.com`)

## Why this split works

- Static assets are served from the edge (fast + free tier)
- Serverless API scales independently and only incurs cost on usage
- Gemini API keys stay server-side

## API Endpoints

- `POST /api/search` (Gemini-powered semantic search with caching)
- `POST /api/project-similarity` (experience-driven AI)
- `POST /api/lead` (lead capture)

## Environment Variables (API)

- `GEMINI_API_KEY`
- `LEAD_STORE_PROVIDER` (json or gsheets)
- `SMTP_*` or `SENDGRID_*` (email)

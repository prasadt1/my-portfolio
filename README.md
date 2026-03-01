# Prasad Tilloo — Experience-Driven AI Portfolio

Production portfolio demonstrating enterprise architecture expertise with Gemini-powered search via a lightweight Cloud Run API and static hosting for the frontend.

This is not a demo site. It is a fully deployed consulting platform with:

- Experience-driven AI (Project Similarity Matcher)
- GDPR-safe lead capture
- Case-study evidence system
- Google Sheets CRM backend
- Feature-flagged production deployment

**Live**: https://prasadtilloo.com

---

## 👀 How to Explore This Portfolio

Recommended flow:

1. Homepage → Featured Case Studies
2. Open any hero case study (BRITA / Insurance)
3. Try Project Similarity Matcher
4. Review Architecture Diagram
5. Read this README AI section

Only one AI feature is enabled intentionally to showcase experience-driven reasoning.

---

## 🧠 Core Concept

Instead of generic AI chat, this portfolio uses **experience-driven AI**.

Visitors describe their project challenge. 

The system matches it against Prasad's real delivery projects using:

- Industry signals
- Problem patterns
- Constraints
- Decision frameworks
- Anti-patterns observed
- Retrospective lessons

The result:

> "Here's the closest project I've done like yours — what worked, what failed, and what I'd do differently today."

This creates meaningful differentiation versus generic LLM advice.

---

## 🏗 Architecture Overview

**Architecture Diagram**
<img width="1536" height="1024" alt="ChatGPT Image Feb 2, 2026, 08_19_14 AM" src="https://github.com/user-attachments/assets/8ce6ab12-43b1-42d2-920f-1f425ae19332" />


Recommended deployment split:

- Static frontend (Cloudflare Pages or similar)
- Serverless API (Cloud Run) for Gemini-powered endpoints

---

## 🤖 AI Usage (Google Gemini)

**Model**: Gemini 2.0 Flash (configurable)

**Used for**:
- Natural language reasoning
- Similarity explanation synthesis
- Pattern interpretation

**Not used for**:
- Hallucinated architectures
- Generic recommendations

Similarity matching combines deterministic scoring with Gemini interpretation.

AI outputs are constrained using structured project metadata.

---

## 🚀 Active AI Feature

### Project Similarity Matcher

**Users submit**:
- Project description
- Industry / constraints

**Flow**:
1. Query analyzed against structured case study signals
2. Top 3 matches computed
3. Gemini generates explanation
4. Email gate applied before results
5. Request stored in Google Sheets

**Purpose**:
- Demonstrate real-world architecture reasoning
- Qualify serious leads
- Showcase delivery experience

Other tools (Chat, Risk Radar, Architecture Assessment) are intentionally disabled by default.

---

## 🧩 Evidence System

Each hero case study includes:

- Executive snapshot
- Trust layer (role, scope, NDA)
- Before / after architecture
- Deliverables
- Retrospective insights
- Artifact previews (ADR, diagrams, roadmaps)

Artifacts are gated to protect IP.

---

## 🔐 GDPR & Privacy

- No PII stored in analytics
- Email captured only via explicit consent
- Attribution uses UTM + referrer only
- Google Sheets acts as lightweight CRM
- SendGrid handles transactional email

---

## 🛠 Built With

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Node.js
- Google Gemini 2.0 Flash (configurable)
- Google Cloud Run (API)
- Cloudflare Pages (static hosting)
- Google Sheets API
- SendGrid

---

## 🧠 AI-Assisted Development

AI tools were used to accelerate implementation. Architecture decisions and delivery tradeoffs remained human-led.

---

## 🌐 Hosting (Recommended Split)

Domain: Namecheap  
Static hosting: Cloudflare Pages  
API: Google Cloud Run  

Setup:
- Cloudflare Pages serves the static frontend at `prasadtilloo.com`
- Cloud Run serves API endpoints at `api.prasadtilloo.com`
- Namecheap DNS: CNAME/ALIAS to Cloudflare, CNAME for `api` to Cloud Run
- Separate SSL: Cloudflare for the site, Google-managed SSL for the API

Benefits:
- Lower operational cost
- Faster global delivery (edge caching)
- Independent scaling for AI endpoints

### Frontend API Base

When hosting the frontend separately, set:

```
VITE_API_URL=https://api.prasadtilloo.com
```

---

## 📧 Email Delivery

SendGrid handles transactional email:

- Similarity results unlock
- Artifact requests
- Lead confirmations

Design goals:
- GDPR-safe
- No marketing automation
- Pure transactional delivery

---

## 🛡 Production Considerations

- Rate limiting on AI endpoints
- Feature flags for staged rollout
- GDPR-safe analytics
- Email gating before AI results
- Google Sheets as lightweight CRM
- Structured prompts (no hallucinated architectures)

---

## 🧑‍💻 Local Development

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

**Required env**:
```
GEMINI_API_KEY=
```

---

## ☁️ Deployment (Cloud Run)

Build and deploy:

```bash
docker build -t portfolio .
gcloud run deploy prasad-portfolio \
  --image portfolio \
  --region europe-west3 \
  --allow-unauthenticated
```

---

## ✨ Example Development Prompts

**Project Similarity Engine**
> "Build experience-driven matching using project metadata, not embeddings. Score industry, constraints, anti-patterns, and decision frameworks. Return top 3 with confidence."

**UX Density Refactor**
> "Apply max 3 bullets per section and progressive disclosure to case studies."

**Production Checklist**
> "Add rate limiting, email gating, Google Sheets storage, and GDPR-safe analytics."

---

## 🏁 Why Only One AI Feature?

Only the Project Similarity Matcher is enabled by default.

**Reason**: To focus on experience-backed AI instead of generic tools.

This highlights real delivery thinking rather than model novelty.

---

Built by Prasad Tilloo  
Independent Architecture & Transformation Consultant  

This portfolio represents real delivery patterns accumulated over 15+ years across enterprise cloud, compliance-heavy systems, and AI-assisted platforms.

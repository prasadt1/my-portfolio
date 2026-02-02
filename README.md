# Prasad Tilloo — Experience-Driven AI Portfolio

Production portfolio demonstrating enterprise architecture expertise and AI integration using Google Gemini and Cloud Run.

This is not a demo site. It is a fully deployed consulting platform with:

- Experience-driven AI (Project Similarity Matcher)
- GDPR-safe lead capture
- Case-study evidence system
- Google Sheets CRM backend
- Feature-flagged production deployment

**Live**: https://prasadtilloo.com

---

## 🏆 Google AI Portfolio Challenge Submission

This project was built for the **Google AI "New Year, New You" Portfolio Challenge**.

Key goals:

- Demonstrate production Gemini integration
- Show real-world architecture decision making
- Build an experience-driven AI system (not generic chat)
- Deploy end-to-end on Google Cloud Run
- Capture leads safely with GDPR compliance

Live deployment: https://prasadtilloo.com

Primary AI feature for judges: 👉 Project Similarity Matcher (`/tools/project-similarity`)

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


Frontend and backend are deployed as a single Cloud Run service.

---

## 🤖 AI Usage (Google Gemini)

**Model**: Gemini 1.5 Pro

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

Other tools (Chat, Risk Radar, Architecture Assessment) are intentionally disabled for submission.

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
- Google Gemini 1.5 Pro
- Google Cloud Run
- Google Sheets API
- SendGrid

---

## 🧠 AI-Assisted Development (Gemini + Antigravity)

Development used Google Gemini and Antigravity in a "vibe coding" workflow:

- Gemini for architectural reasoning and refactoring suggestions
- Antigravity for rapid UI iteration
- Human-led design for:
  - UX structure
  - Domain modeling
  - Compliance boundaries
  - Production hardening

AI accelerated implementation. Architecture decisions remained manual.

---

## 🌐 Custom Domain + Cloud Run

Domain: Namecheap  
Hosting: Google Cloud Run  

Setup:
- Cloud Run custom domain mapping
- Namecheap DNS A + CNAME records
- Google-managed SSL

Frontend + backend run as a single Cloud Run service.

This allows:
- Zero-infra ops
- Automatic HTTPS
- Simple CI/CD

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

## 🧪 Feature Flags

Competition mode:

```bash
VITE_COMPETITION_MODE=true
```

Automatically promotes key features and hides experimental ones.

---

## 🧑‍💻 Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

**Required env**:
```
GEMINI_API_KEY=
SENDGRID_API_KEY=
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=
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

For this submission, only the Project Similarity Matcher is enabled.

**Reason**: To focus on experience-backed AI instead of generic tools.

This highlights real delivery thinking rather than model novelty.

---

Built by Prasad Tilloo  
Independent Architecture & Transformation Consultant  

This portfolio represents real delivery patterns accumulated over 15+ years across enterprise cloud, compliance-heavy systems, and AI-assisted platforms.

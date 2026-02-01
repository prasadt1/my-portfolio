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

```
Browser (React + Vite)
↓
Cloud Run (Node API)
↓
Gemini 1.5 Pro
↓
Project Similarity Engine
↓
Google Sheets (Leads + Tool Requests)
↓
SendGrid (Email Delivery)
```

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

Development used an AI-assisted workflow with Gemini + Antigravity ("vibe coding") for rapid iteration, while architecture and production hardening were manual.

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

## 📄 License

Personal portfolio project. Not intended as a reusable framework.

Built by Prasad Tilloo. Independent Architecture & Transformation Consultant.
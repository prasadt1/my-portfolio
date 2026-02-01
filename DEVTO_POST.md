---
title: "I Built a Portfolio That Thinks Like an Architect (Using Google Gemini + Cloud Run)"
published: false
description: "How I created an experience-driven AI portfolio that matches client projects against 15+ years of real delivery patterns - not generic ChatGPT responses."
tags: googleai, cloudrun, portfolio, gemini
cover_image: # Add your cover image URL here (recommended: 1000x420px)
---

## About Me

I'm Prasad Tilloo, an independent architecture consultant who's spent 15+ years helping enterprises navigate cloud migrations, AI adoption, and compliance-heavy transformations. I've worked with everyone from healthcare giants to climate tech startups.

But here's the thing: **every client asks the same question** - *"Have you done something like this before?"*

That question inspired me to build something different. Not another generic AI chatbot, but a portfolio that actually **thinks like an architect**.

## Portfolio

**🌐 Live Production Site**: [prasadtilloo.com](https://prasadtilloo.com)

{% embed https://portfolio-service-405207878826.europe-west1.run.app %}

**🎥 Quick Demo Video** (2 minutes):
{% embed https://www.loom.com/share/0e248d766f9446d38964643431a7479c %}

**Try this**: Go to the Project Similarity Matcher and describe your project challenge. Instead of generic advice, you'll get matched against my real delivery experience with specific insights about what worked, what failed, and what I'd do differently today.

## How I Built It

### The Core Idea: Experience-Driven AI

Most AI portfolios just slap ChatGPT onto a website. I wanted something smarter.

My system analyzes your project description against **structured signals** from real projects:
- Industry patterns
- Technical constraints  
- Anti-patterns I've observed
- Decision frameworks that worked
- Retrospective lessons

**Google Gemini 1.5 Pro** handles the reasoning, but it's constrained by real project metadata - no hallucinated architectures.

### Tech Stack & Google AI Integration

**Frontend**: React + TypeScript + Tailwind  
**Backend**: Node.js on Google Cloud Run  
**AI**: Google Gemini 1.5 Pro  
**Data**: Google Sheets (lightweight CRM)  
**Email**: SendGrid for lead capture  

### AI-Assisted Development Workflow

I used **Google Gemini + Antigravity** in a "vibe coding" approach:

- **Gemini** for architectural reasoning and refactoring suggestions
- **Antigravity** for rapid UI iteration  
- **Human decisions** for UX structure, domain modeling, and production hardening

Example prompt I used:
> "Build experience-driven matching using project metadata, not embeddings. Score industry, constraints, anti-patterns, and decision frameworks. Return top 3 with confidence."

This accelerated development while keeping architectural decisions manual.

### Production Architecture

**🏗️ System Overview**:

![Architecture Diagram](https://raw.githubusercontent.com/prasadt1/my-portfolio/main/docs/architecture-overview.svg)

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

**Why Cloud Run?** Zero infrastructure ops, automatic HTTPS, simple CI/CD. Perfect for a consulting business.

**Custom Domain Setup**: Namecheap DNS → Google Cloud Run with automatic SSL certificates.

## What I'm Most Proud Of

### 1. **It's Actually Useful**
This isn't a demo. It's my real business system. Clients use it to understand if their project matches my experience before booking calls.

### 2. **Experience-Driven AI Differentiation**  
Instead of generic responses, visitors get:
> "Here's the closest project I've done like yours — what worked, what failed, and what I'd do differently today."

### 3. **Production-Grade Implementation**
- GDPR-safe lead capture
- Rate limiting on AI endpoints  
- Feature flags for staged rollout
- Email gating before AI results
- Proper error handling and fallbacks

### 4. **Strategic Focus**
I intentionally enabled only **one AI feature** for this submission. Why? To showcase architectural thinking over feature dumping. The Project Similarity Matcher demonstrates real business value, not AI novelty.

### 5. **Real Business Impact**
- Live deployment serving actual clients at [prasadtilloo.com](https://prasadtilloo.com)
- Lead qualification through AI matching
- Case studies with NDA-protected artifacts
- Evidence-based trust building

---

**The Result?** A portfolio that doesn't just show my work - it **thinks like I do**.

Instead of telling clients "I'm experienced," it shows them exactly how my experience applies to their specific challenge.

That's the difference between a portfolio and a **business system**.

---

**🔗 Links**:
- **Live Site**: [prasadtilloo.com](https://prasadtilloo.com)
- **Demo Video**: [2-minute Loom walkthrough](https://www.loom.com/share/0e248d766f9446d38964643431a7479c)
- **Source Code**: [GitHub Repository](https://github.com/prasadt1/my-portfolio)
- **Competition Page**: [Technical Deep Dive](https://prasadtilloo.com/competition)

*Built for the Google AI "New Year, New You" Portfolio Challenge 🏆*
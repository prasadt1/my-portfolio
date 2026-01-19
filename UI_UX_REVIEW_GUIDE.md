# UI/UX Review Capture Guide for ChatGPT

## 📸 **1. Screenshots Strategy**

### Critical Pages to Capture (Desktop & Mobile):

**A. Homepage** (`/`)
- ✅ Hero section (above fold)
- ✅ Trust/credibility strip (logos, impact metrics)
- ✅ Persona tabs (For Recruiters/Consulting Buyers/Toolkit Seekers)
- ✅ Featured case studies grid
- ✅ Impact dashboard/metrics
- ✅ Testimonials section
- ✅ Final CTA section
- 📱 Mobile view (all sections)

**B. Case Study Pages** (`/projects/[slug]`)
- ✅ One hero case study detail page (e.g., `/projects/brita-ecommerce`)
- ✅ Navigation pills (sticky nav)
- ✅ Executive Snapshot section
- ✅ Challenge section (collapsed persona tabs)
- ✅ How I Delivered (compact view + expanded)
- ✅ Trust Layer (2-column layout)
- ✅ Artifacts section (gating + request modal)
- ✅ Contact CTA section
- 📱 Mobile artifact horizontal scroll

**C. Projects List** (`/projects`)
- ✅ Featured projects section (5 hero projects)
- ✅ "All Projects" collapsed view (first 9)
- ✅ Filter bar (preset chips)
- ✅ Expanded "All Projects" state
- 📱 Mobile filter experience

**D. Competition Page** (`/competition`)
- ✅ "Start Here" checklist panel
- ✅ 2-column grid layout (desktop)
- ✅ Quick Links section

**E. Key Interactive States**
- ✅ Persona tab expanded (showing different CTAs)
- ✅ "Show More" expanded sections
- ✅ Artifact request modal (open)
- ✅ Filter dropdown (open)
- ✅ Dark mode toggle (both themes)

---

## 🎥 **2. Screen Recording (Optional but Powerful)**

Record 2-3 key user journeys (30-60 seconds each):

**Journey 1: Recruiter Flow**
1. Land on homepage
2. Click "For Recruiters" persona tab
3. Click "View Hiring Profile"
4. Scroll through hiring page

**Journey 2: Consulting Buyer Flow**
1. Land on homepage
2. View featured case study card
3. Click into case study detail
4. Scroll through sections (see sticky nav)
5. Click "Request Artifacts"
6. Fill artifact request modal

**Journey 3: Discovery Flow**
1. Land on homepage
2. Scroll to Impact Dashboard
3. Click "View All Case Studies"
4. Use preset filters
5. Expand "Show All Projects"

**Tools:** 
- Mac: Cmd+Shift+5 (built-in screen recorder)
- Loom, OBS, or QuickTime
- Export as MP4 or GIF

---

## 📝 **3. Written Context (Essential for ChatGPT)**

### A. User Personas & Goals

```
Primary Personas:
1. Recruiters - Need quick credibility snapshot, hiring profile
2. Consulting Buyers (CTOs/PE firms) - Need detailed case studies, outcomes, artifacts
3. Toolkit Seekers - Need free resources, checklists, tools

Each persona has different:
- Entry points (homepage tabs)
- Primary CTAs
- Information needs
```

### B. Design Decisions Made

```
Theme: Executive dark + emerald accent
- No gimmicks, enterprise aesthetic
- Designed for scanning in 20 seconds
- Progressive disclosure (expandable sections)
- Reduced cognitive load

Recent Phase 4 Changes:
- Simplified hero (short H1, 2-line subtitle)
- Reduced homepage sections (7 total)
- Compact case study sections
- 2-column layouts on desktop
- Horizontal scroll on mobile
```

### C. Key UX Challenges You Want Feedback On

```
1. Content density: Is progressive disclosure working?
2. Navigation clarity: Are persona tabs clear?
3. Trust signals: Are credibility strips effective?
4. Mobile experience: Is horizontal scroll intuitive?
5. CTA hierarchy: Are primary/secondary CTAs clear?
6. Accessibility: Keyboard nav, ARIA, reduced motion
7. Competition page: Judge-friendly enough?
```

---

## 📊 **4. Analytics Data (If Available)**

Share key metrics to contextualize UX decisions:

```
- Bounce rate by page
- Time on page (case studies vs homepage)
- Click-through rates (persona tabs, CTAs)
- Scroll depth (how far users scroll)
- Mobile vs desktop traffic split
```

---

## 🔍 **5. Specific Questions for ChatGPT**

Structure your prompt like this:

```
"I'm building a portfolio site for an independent architecture consultant. 
Here are screenshots of key pages and user flows.

Context:
- Target: Enterprise buyers (CTOs, PE firms), recruiters, toolkit seekers
- Goal: Convert to consultation calls / hiring / resource downloads
- Recent changes: Simplified for 20-second scan, progressive disclosure

Please review:
1. Information hierarchy: Can users find what they need in 20 seconds?
2. Trust signals: Are credibility indicators prominent enough?
3. Mobile UX: Is the experience smooth on mobile?
4. Accessibility: Any obvious a11y issues?
5. Conversion flow: Are CTAs clear and persuasive?
6. Visual consistency: Any design inconsistencies?

[Attach screenshots/videos here]
"
```

---

## 🎯 **6. Quick Capture Checklist**

### Before Screenshot Session:
- [ ] Clear browser cache
- [ ] Test in Chrome (most common)
- [ ] Set viewport to common sizes (1920x1080, 375x667 mobile)
- [ ] Disable browser extensions that add UI
- [ ] Use incognito mode (no saved preferences)

### Screenshot Tools:
- **Mac:** Cmd+Shift+4 (selection) or Cmd+Shift+3 (full screen)
- **Chrome DevTools:** Cmd+Shift+P → "Capture screenshot"
- **Browser Extensions:** Full Page Screen Capture, Awesome Screenshot
- **Design Tools:** Figma, Sketch (if you have design files)

### Organization:
```
/screenshots
  /desktop
    - homepage-hero.png
    - homepage-persona-tabs.png
    - case-study-detail.png
    - projects-list.png
  /mobile
    - homepage-mobile.png
    - case-study-mobile.png
  /interactions
    - artifact-modal-open.png
    - expanded-section.png
```

---

## 💡 **7. Alternative: Create a Document**

If screenshots are cumbersome, create a markdown document:

```markdown
# UI/UX Review Document

## Homepage Structure
1. Hero: [describe layout, typography, CTAs]
2. Trust Strip: [describe logos, metrics placement]
3. Persona Tabs: [describe behavior, visual hierarchy]
...

## User Flows
### Flow 1: Case Study Discovery
Step 1: User lands on homepage
Step 2: Scrolls to featured case studies
Step 3: Clicks card → navigates to detail page
...

## Design System
- Colors: [list primary/secondary colors]
- Typography: [font sizes, hierarchy]
- Spacing: [padding/margin patterns]
- Components: [card styles, buttons, forms]
```

---

## 🚀 **8. Quick Start: Minimum Viable Review**

**If you're short on time, capture these 5 things:**

1. **Homepage hero** (desktop + mobile)
2. **One case study detail page** (full scroll)
3. **Projects list page** (with filters visible)
4. **Persona tab interaction** (before/after)
5. **One key user flow** (30-second screen recording)

Plus brief context:
- Who is this for? (personas)
- What's the goal? (conversions)
- What changed recently? (Phase 4 improvements)

This gives ChatGPT enough to provide actionable feedback!

---

## 📤 **9. Sharing Format**

### Option A: Direct to ChatGPT
- Upload images directly in chat
- Paste written context above images
- Structure questions clearly

### Option B: Shared Document
- Create Google Doc / Notion page
- Embed screenshots with captions
- Add written context
- Share link in ChatGPT (it can read web pages)

### Option C: Presentation
- Create a simple slide deck (Google Slides, Canva)
- One page per section
- Export as PDF
- Upload to ChatGPT (PDFs are supported)

---

## ✅ **Example Prompt Structure**

```
I'm seeking UX review for my architecture consultant portfolio site.

**Context:**
- React/TypeScript portfolio for independent consultant
- Target audience: Enterprise buyers, recruiters, toolkit seekers
- Goal: Drive consultation calls, hiring inquiries, resource downloads
- Just completed Phase 4 UX polish (progressive disclosure, simplified navigation)

**Key Changes:**
- Simplified hero (short H1, 2-line subtitle, 3 proof chips)
- Persona-based CTAs (different primary CTA per persona)
- Progressive disclosure (expandable sections throughout)
- Reduced homepage sections (7 total)
- Sticky navigation pills on case study pages
- 2-column grid layouts on desktop

**Questions:**
1. Is the information hierarchy clear for a 20-second scan?
2. Are trust signals (metrics, logos, credibility strips) prominent enough?
3. Is progressive disclosure working, or should more content be visible by default?
4. Are persona tabs intuitive, or should they be more prominent?
5. Is the mobile experience smooth, especially artifact horizontal scroll?
6. Any accessibility issues you notice?
7. Are CTAs clear and persuasive?

[Attach screenshots/videos]
```

---

**Pro Tip:** Start with the minimum viable review (section 8), then expand based on ChatGPT's initial questions. It will guide you on what else to capture!
# Phase 4 UX Blueprint — Implementation Plan

## Global Design Rules (Enforcement Points)

### 1. Density Rule
- ✅ Each section must have one dominant message
- ✅ Max content per visible section (before expand):
  - 3 bullets OR 2 paragraphs OR 1 table row
- ✅ Anything beyond → collapsible with "Show details"

**Enforcement:** Check all sections for content density, apply ExpandableContent component where needed.

### 2. Rhythm Rule (Avoid Card Fatigue)
- ✅ Never show more than 2 stacked card sections without a "pattern break":
  - Full-bleed strip
  - 2-column split
  - Quote block
  - Data block

**Enforcement:** Review page structure, ensure pattern breaks every 2 card sections.

### 3. CTA Rule
- ✅ Only 1 primary CTA per viewport
- ✅ Secondary CTAs must look secondary (link/button-outline)

**Enforcement:** Review all CTA sections, ensure single primary with clear hierarchy.

### 4. Persona Rule
- ✅ Persona changes: CTA labels + section emphasis
- ✅ NOT layout jumps
- ✅ No giant page re-render

**Enforcement:** Ensure persona switching only changes content/CTAs, not structure.

---

## Implementation Status

### ✅ HomePage Wireframe (SECTION 1-7)

**SECTION 1 — HERO (60-70vh)**
- [ ] Restructure to 2-column layout
  - Left: H1, subhead (2 lines), proof chips (3), persona tabs, CTA row
  - Right: Hero Evidence Card ("What you get", 3 bullets, trust line)
- [ ] Update H1 to: "Reduce risk before committing budget."
- [ ] Update subhead: "Independent architecture consultant. Cloud + AI + compliance-heavy delivery."
- [ ] Proof chips: "€415K saved", "50+ engagements", "EU compliance-ready"
- [ ] Persona tabs: 3 small pills (Hiring, Consulting, Toolkit)
- [ ] CTA row: Primary (persona-based) + Secondary ("View Case Studies")

**SECTION 2 — TRUST STRIP**
- [x] Already exists (LogoCarousel with compact mode)
- [ ] Add one-line text: "Enterprise delivery across e-commerce, healthcare, insurance, ESG."

**SECTION 3 — IMPACT DASHBOARD**
- [x] Already exists (ImpactDashboard component)
- [ ] Limit to 4 cards max (currently may have more)
- [ ] Add micro text: "Representative outcomes (anonymized)."

**SECTION 4 — FEATURED CASE STUDIES (5 hero max)**
- [ ] Restructure to 2 rows:
  - Row 1: 2 large featured cards (BRITA + Insurance)
  - Row 2: 3 smaller cards (Delivery Hero, Photography AI, SINE)
- [ ] Each card: Title, Executive Snapshot (3 rows), CTAs
- [ ] Below: "View all projects →"

**SECTION 5 — TESTIMONIAL (Pattern break)**
- [ ] Two-column split:
  - Left: Big quote (1 strong testimonial)
  - Right: TestimonialsRotator (smaller)

**SECTION 6 — TOOLKIT LEAD MAGNET**
- [ ] Title: "Free resource"
- [ ] Subtitle: "Vendor Proposal Review Checklist"
- [ ] Bullets (3): "Catch red flags", "Prevent lock-in", "Stakeholder-ready questions"
- [ ] Form: email input
- [ ] CTA: "Send me the checklist"

**SECTION 7 — FINAL CTA**
- [ ] Persona-based one sentence + CTA:
  - Hiring: "Want the short version? Download resume"
  - Consulting: "Book call"
  - Toolkit: "Browse resources"

---

### ✅ ProjectsPage Wireframe

**SECTION 1 — PAGE HEADER**
- [x] Already exists
- [ ] Verify H1: "Projects & Case Studies"
- [ ] Verify subhead: "Outcome-focused delivery across industries."

**SECTION 2 — FILTER BAR (Sticky)**
- [x] Already exists
- [ ] Verify quick chips: AI/GenAI | Compliance | Cost Savings | E-commerce

**SECTION 3 — HERO PROJECTS**
- [x] Already exists (Featured Projects section)
- [ ] Verify 5 cards only

**SECTION 4 — ALL PROJECTS (Collapsed)**
- [x] Already exists
- [ ] Verify shows 9 by default
- [ ] Verify "Show all projects" button

**SECTION 5 — CTA (Pattern break)**
- [ ] Add: "Need more examples relevant to your industry?"
- [ ] CTA: "Request tailored case study shortlist"

---

### ✅ CaseStudyPage Wireframe (11 sections)

**SECTION 1 — HERO HEADER**
- [x] Already exists (breadcrumb, H1, subhead)
- [ ] Add right side: 3 proof chips (Outcome, Scope, Constraints)
- [ ] CTA row: Primary (Book Discovery Call) + Secondary (Request Artifacts Pack)

**SECTION 2 — STICKY PAGE NAV PILLS**
- [x] Already exists (CaseStudyNavigation component)
- [ ] Verify pills: Snapshot | Challenge | Delivery | Proof | Artifacts | Contact

**SECTION 3 — EXECUTIVE SNAPSHOT**
- [x] Already exists
- [ ] Verify 2-column grid (max 6 blocks)
- [ ] Verify no paragraphs > 2 lines

**SECTION 4 — INLINE CTA**
- [ ] Add small elegant one-line pitch
- [ ] "Want the same clarity for your project? Get a 30-min architecture sanity check."
- [ ] CTA: Book Call

**SECTION 5 — TRUST LAYER**
- [x] Already exists (2-column compact)
- [ ] Verify scannable in <10 seconds

**SECTION 6 — CHALLENGE**
- [x] Already exists
- [ ] Verify context chips max 6
- [ ] Verify key tensions max 4
- [ ] Verify persona tabs collapsed by default (2 bullets + expand)

**SECTION 7 — WHAT I DELIVERED**
- [ ] Show "deliverables_compact" first (6-8 bullet checklist)
- [ ] Button: "Show full deliverables"

**SECTION 8 — HOW I DELIVERED**
- [x] Already exists
- [ ] Verify shows 3 phases only (Diagnose, Decide, Deliver)
- [ ] Verify "Expand timeline" button

**SECTION 9 — PROOF / IMPACT**
- [x] Already exists
- [ ] Verify 3 metrics cards max
- [ ] Verify short paragraph
- [ ] Optional: "Representative outcomes — anonymized."

**SECTION 10 — ARTIFACT PREVIEWS**
- [x] Already exists (2 rows x 3 cards on desktop)
- [ ] Verify each card: icon, title, 1 line, "On request"
- [ ] Verify CTA: "Request Artifacts Pack"
- [ ] Verify modal with NDA disclaimer

**SECTION 11 — FINAL CTA**
- [ ] Split: Consulting CTA | Hiring CTA

---

### ✅ ServicesPage Wireframe

**HERO**
- [x] Already exists
- [ ] Verify H1: "Consulting services"
- [ ] Verify CTA: Book call

**SERVICE CARDS (3 only)**
- [x] Already exists (3 cards: Architecture Review, Blueprint Sprint, Delivery Oversight)
- [ ] Verify each card: Who it's for, What you get (3 bullets), Price range "from €X", CTA

**HOW I WORK (3 steps only)**
- [ ] Verify timeline shows 3 steps only
- [ ] Remove any dense sections below

---

### ✅ ResourcesPage Wireframe

**HERO**
- [ ] H1: "Toolkits & Resources"
- [ ] Subtitle: "Reusable frameworks from real delivery."

**GRID OF TOOLKITS**
- [ ] Organize by tiers: Free | Pro (email required) | Premium (call required)
- [ ] Each toolkit card: title, outcome label, CTA

---

### ✅ CompetitionPage Wireframe

**VERIFICATION**
- [x] Already matches wireframe mostly
- [ ] Verify "Start Here" panel with 4 tiles
- [ ] Verify 2-column grid with 6 cards max
- [ ] Verify Quick Links at end

---

## Next Steps

1. **HomePage Hero Restructure** - Most critical, implement first
2. **Featured Case Studies Layout** - 2 rows (2 large + 3 smaller)
3. **Testimonial Section** - Two-column split
4. **Toolkit Lead Magnet** - New section with email form
5. **Case Study Deliverables** - Compact first view
6. **ServicesPage Timeline** - Simplify to 3 steps
7. **ResourcesPage** - Create/update toolkit library grid
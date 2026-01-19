# QA Checklist for Competition Submission

## Pre-Deployment Checks

### Build & Type Safety
- [ ] `npm run validate` passes (typecheck + lint + build)
- [ ] No TypeScript errors
- [ ] No console warnings in production build
- [ ] Build output size is reasonable (< 2MB gzipped)

### Feature Flags
- [ ] All features are `enabled: true` (judges can access)
- [ ] Promotion flags work correctly (nav/home visibility)
- [ ] Competition mode auto-promotes features when `VITE_COMPETITION_MODE=true`
- [ ] Route guards show "Unavailable" page for disabled features
- [ ] Direct URL access works for enabled but not promoted features

### Navigation
- [ ] Core nav items always visible (Home, Services, Projects, About, Contact)
- [ ] Feature nav items only show if promoted
- [ ] Mobile navigation respects promotion flags
- [ ] "For Recruiters" link only shows if hiring route is promoted

### Homepage
- [ ] Persona tabs show/hide based on `HOMEPAGE_PERSONA_TABS` flag
- [ ] CTAs respect promotion flags:
  - [ ] Hiring persona: Always shows "View Case Studies"
  - [ ] Consulting persona: Shows "Book call" + promoted AI tool CTAs
  - [ ] Toolkit persona: Only highlights toolkit if promoted
- [ ] Featured badge on ProjectCard only shows if:
  - [ ] Project is in hero list (brita-ecommerce, delivery-hero-ads, insurance-performance)
  - [ ] AND `CASESTUDY_ARTIFACT_GATE` is promoted

### New Landing Routes (Phase 3.2)
- [ ] `/hire-me` loads correctly
  - [ ] Shows executive snapshot cards
  - [ ] Shows featured case studies
  - [ ] CTAs work (View Profile, View Case Studies)
  - [ ] Analytics tracks `page_view` with `persona: 'hire'`
- [ ] `/consulting` loads correctly
  - [ ] Shows outcomes metrics
  - [ ] Shows top 3 case studies
  - [ ] Book call CTA works
  - [ ] Analytics tracks `page_view` with `persona: 'consult'`
- [ ] `/resources` loads correctly
  - [ ] Shows free resources list
  - [ ] Shows toolkits section only if `TOOLKIT_LIBRARY` is promoted
  - [ ] Analytics tracks `page_view` with `persona: 'toolkit'`

### SEO & Social Sharing
- [ ] Each route has unique title/description
- [ ] OG tags are present (og:title, og:description, og:image, og:url)
- [ ] Twitter cards are present (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] Canonical URLs use `VITE_SITE_URL` env var
- [ ] OG images exist:
  - [ ] `/og/default.png`
  - [ ] `/og/hire.png`
  - [ ] `/og/consulting.png`
  - [ ] `/og/resources.png`
- [ ] Language alternate links (en, de, x-default)

### Performance
- [ ] Lazy loading works (case study detail, executive modal)
- [ ] ProjectsPage filtering is fast (memoized)
- [ ] No unnecessary rerenders from analytics calls
- [ ] Route-level code splitting via React.lazy
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)

### GDPR & Analytics
- [ ] No PII in analytics events
- [ ] Analytics events don't fire repeatedly on rerenders (debounced/guarded)
- [ ] Consent-first approach (if applicable)
- [ ] Privacy policy accessible

### i18n
- [ ] EN translations complete
- [ ] DE translations complete
- [ ] No duplicate translation keys
- [ ] Language switcher works
- [ ] URLs support `?lang=de` parameter

### Competition Mode
- [ ] When `VITE_COMPETITION_MODE=true`:
  - [ ] All major AI features auto-promote
  - [ ] Footer shows "Built for Google AI Challenge" badge
  - [ ] Footer shows "Deployed on Google Cloud Run, powered by Gemini" text
  - [ ] Badge is subtle (not cheesy)
- [ ] Still GDPR-safe in competition mode
- [ ] No heavy animations

### Critical Flows
- [ ] PDF checklist generation works
- [ ] Lead capture → email → Google Sheets works
- [ ] Analytics tracking works (page_view, cta_click, etc.)
- [ ] All CTAs track events correctly

### Consistency Hardening
- [ ] Trust Layer section is visually compact (not too tall)
- [ ] Artifact previews don't look like paywall:
  - [ ] Uses "Available on request" language
  - [ ] Uses "Redacted / anonymized" language
  - [ ] Uses "Shared selectively" language
- [ ] No duplicate i18n keys
- [ ] Analytics events debounced/guarded (no repeated fires)

## Post-Deployment Checks

### Production Build
- [ ] Deployed to Cloud Run successfully
- [ ] Environment variables set correctly
- [ ] Site loads without errors
- [ ] All routes accessible
- [ ] No 404s for enabled features

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Feature-Specific Testing
- [ ] Architecture Engine generates diagrams
- [ ] Risk Radar assesses risks
- [ ] Checklist generates PDF
- [ ] Case studies display trust layer
- [ ] Executive summary modal works (if promoted)

## Final Checklist

- [ ] All screenshots captured (see `docs/screenshots/README.md`)
- [ ] SUBMISSION_DEVTO.md ready
- [ ] Repository is public (if required)
- [ ] README updated with deployment instructions
- [ ] All TODOs completed
- [ ] Code committed with message: "feat: Phase 3.1 fixes + Phase 3.2 competition readiness"

## Notes

- Test with both `VITE_COMPETITION_MODE=true` and `false`
- Test with various promotion flag combinations
- Ensure graceful degradation if features are disabled
- Verify analytics don't break if tracking is disabled

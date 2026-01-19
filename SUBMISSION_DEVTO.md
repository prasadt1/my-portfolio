# Building a Production-Ready Portfolio with Gemini: A Deep Dive into Feature Flags, Cloud Run, and AI Integration

## Hook

What if you could build a portfolio that judges can explore deeply, while keeping your main funnel focused? That's the challenge I faced when submitting to the Google AI Challenge. I needed a portfolio that showcases 50+ case studies, multiple AI-powered tools, and maintains GDPR compliance—all while giving judges full access without overwhelming regular visitors.

The solution? A feature flag system that separates **enabled** (judges can access) from **promoted** (visible in nav/home), deployed on Google Cloud Run with Gemini integration.

## Why I Built It

As an enterprise architect, I've delivered 50+ projects for Fortune 100 clients. My portfolio needed to:

1. **Showcase depth** for competition judges (all features accessible)
2. **Maintain focus** for regular visitors (promoted features only)
3. **Remain GDPR-safe** (no PII in analytics)
4. **Scale efficiently** on Cloud Run with minimal cost

Traditional portfolios either show everything (cluttered) or hide features (judges miss them). I needed both.

## Architecture Overview

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **AI**: Google Gemini 3 Pro (via `@google/generative-ai`)
- **Deployment**: Google Cloud Run
- **State**: Feature flags via environment variables
- **i18n**: React i18next (EN/DE)

### Feature Flag System

The core innovation is separating **enabled** vs **promoted**:

```typescript
// src/config/features.ts
export type FeatureFlag = {
  enabled: boolean;   // Judges can access if enabled=true
  promoted: boolean;  // Visible in nav/home if promoted=true
};
```

**Example**: Architecture Engine is `enabled: true, promoted: false`
- Judges can visit `/architecture-engine` directly ✅
- It won't appear in navigation ❌
- Homepage stays focused ✅

### Routing Logic

```typescript
// src/config/featureRouting.ts
export function getNavItems(): NavItem[] {
  const items = [...CORE_NAV_ITEMS];
  
  FEATURE_NAV_ITEMS.forEach(item => {
    if (!item.featureKey || isPromoted(item.featureKey)) {
      items.push(item); // Only add if promoted
    }
  });
  
  return items;
}
```

**Route Guards**: Disabled features show a friendly "Unavailable" page instead of 404:

```typescript
// src/components/FeatureRouteGuard.tsx
export const FeatureRouteGuard: React.FC<FeatureRouteGuardProps> = ({
  path,
  children,
}) => {
  const { enabled } = canAccessRoute(path);
  if (!enabled) return <UnavailablePage />;
  return <>{children}</>;
};
```

## Gemini Integration

### Context Caching Strategy

The biggest challenge was token costs. Gemini 3 Pro vision API costs ~$2.00 per 1k images. For a photography coaching app, this was unviable.

**Solution**: Context caching for system prompts:

```typescript
// Cache 32KB system prompt
const cachedPrompt = await gemini.cacheContext({
  systemInstruction: {
    parts: [{ text: SYSTEM_PROMPT }], // 32KB prompt
  },
});

// Reuse cached context for subsequent calls
const result = await model.generateContent({
  contents: [{ role: 'user', parts: [{ text: userQuery }] }],
  cachedContent: cachedPrompt,
});
```

**Result**: 75% cost reduction by caching the system prompt across sessions.

### Structured Output

Gemini's structured output ensures consistent JSON responses:

```typescript
const response = await model.generateContent({
  contents: [{ role: 'user', parts: [{ text: query }] }],
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: 'object',
      properties: {
        riskLevel: { type: 'string', enum: ['low', 'medium', 'high'] },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
    },
  },
});
```

### Error Handling

Production-ready error handling with fallbacks:

```typescript
try {
  const result = await gemini.generateContent(query);
  return result.response.text();
} catch (error) {
  if (error.status === 429) {
    // Rate limit - queue request
    return queueRequest(query);
  }
  // Fallback to cached response or default
  return getCachedResponse(query) || DEFAULT_RESPONSE;
}
```

## Feature Flags Approach

### Environment Variables

```bash
# .env.production
VITE_PROMOTE_AI_ARCH_ENGINE=false
VITE_PROMOTE_AI_RISK_RADAR=false
VITE_PROMOTE_ARTIFACT_GATE=true
VITE_COMPETITION_MODE=true  # Auto-promotes all features
```

### Competition Mode

When `VITE_COMPETITION_MODE=true`, all major features auto-promote:

```typescript
// src/config/competition.ts
export function shouldPromoteInCompetitionMode(featureKey: string): boolean {
  if (!COMPETITION_CONFIG.enabled) return false;
  return COMPETITION_CONFIG.autoPromoteFeatures.includes(featureKey);
}
```

This ensures judges see everything while keeping production focused.

## Cloud Run Deployment

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Cloud Run Configuration

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/portfolio', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/portfolio']
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'portfolio'
      - '--image'
      - 'gcr.io/$PROJECT_ID/portfolio'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
```

### Environment Variables in Cloud Run

```bash
gcloud run services update portfolio \
  --set-env-vars VITE_PROMOTE_AI_ARCH_ENGINE=true \
  --set-env-vars VITE_COMPETITION_MODE=true
```

## What Makes It Different

1. **Dual-Mode Feature Flags**: Enabled vs promoted separation allows deep exploration without clutter
2. **GDPR-Safe Analytics**: No PII tracking, consent-first approach
3. **Context Caching**: 75% cost reduction on Gemini API calls
4. **Production-Ready**: Route guards, error handling, i18n, SEO
5. **Competition Mode**: Auto-promotes features for judges while keeping production focused

## Key Learnings

1. **Feature flags aren't just on/off**—separating enabled from promoted unlocks new UX patterns
2. **Context caching is critical** for production Gemini apps—saves 75% on costs
3. **Route guards prevent 404s**—show friendly "unavailable" pages instead
4. **Competition mode** lets you showcase depth without cluttering production

## Try It

- **Live Site**: [prasadtilloo.com](https://prasadtilloo.com)
- **Architecture Engine**: `/architecture-engine` (if enabled)
- **Risk Radar**: `/risk-radar` (if enabled)
- **Source Code**: [github.com/prasadt1/my-portfolio](https://github.com/prasadt1/my-portfolio)

## Conclusion

Building a competition-ready portfolio required balancing depth (for judges) with focus (for visitors). Feature flags with enabled/promoted separation, combined with Gemini context caching and Cloud Run deployment, delivered a production-ready solution that scales efficiently.

---

**Labels**: `dev-tutorial=devnewyear2026`, `google-ai`, `react`, `typescript`, `cloud-run`, `gemini`, `feature-flags`

# Testing Feature Flags - Phase 1

## Prerequisites

1. Server must be running on port 3001 (or your configured PORT)
2. Frontend dev server should be running (if testing UI)
3. Browser dev tools open (to inspect network requests and localStorage)

---

## Test 1: Verify API Endpoint Works

### Step 1: Start the server
```bash
cd server
npm start
```

### Step 2: Test GET /api/featureflags
```bash
# In a new terminal
curl http://localhost:3001/api/featureflags
```

**Expected Response:**
```json
{
  "flags": {
    "proposal_review": { "enabled": false, "reason": "env" },
    "risk_radar": { "enabled": true, "reason": "env" },
    "risk_radar_export": { "enabled": true, "reason": "env" },
    "arch_generator": { "enabled": false, "reason": "env" },
    "exec_modal": { "enabled": true, "reason": "env" },
    "sticky_cta": { "enabled": true, "reason": "env" }
  }
}
```

### Step 3: Test with anon ID header
```bash
curl -H "X-PT-Anon-ID: test-user-123" http://localhost:3001/api/featureflags
```

Same response structure, but the rollout decisions (if any) will be deterministic for this anon ID.

---

## Test 2: Environment Variable Configuration

### Step 1: Check current .env.local
Look in your `.env.local` file (or create one in the project root):

```bash
# If file doesn't exist, create it
touch .env.local
```

### Step 2: Add feature flag variables
Add these lines to `.env.local`:

```bash
# Feature Flags - Test Configuration
FEATURE_PROPOSAL_REVIEW=off
FEATURE_RISK_RADAR=on
FEATURE_RISK_RADAR_EXPORT=on
FEATURE_ARCH_GENERATOR=on
FEATURE_EXEC_MODAL=on
FEATURE_STICKY_CTA=on

# Rollout percentage (0-100)
ROLLOUT_PROPOSAL_REVIEW_PERCENT=10
```

### Step 3: Restart server
After changing `.env.local`, restart the server:

```bash
# Stop server (Ctrl+C), then:
cd server
npm start
```

### Step 4: Verify server logs
You should see in server console:
```
[Feature Flags] Configuration summary: {
  "PROPOSAL_REVIEW": { "mode": "off", "rolloutPercent": "not set" },
  "RISK_RADAR": { "mode": "on", "rolloutPercent": "not set" },
  ...
}
```

---

## Test 3: Test Feature Gating in Browser

### Test Sticky CTAs (FEATURE_STICKY_CTA)

1. **Enable the flag**:
   ```bash
   # In .env.local
   FEATURE_STICKY_CTA=on
   ```

2. **Restart server and visit a case study**:
   - Go to: `http://localhost:5173/projects` (or your frontend port)
   - Click on any case study
   - Scroll down past 300px
   - **Expected**: Sticky sidebar CTA (desktop) or bottom bar CTA (mobile) should appear

3. **Disable the flag**:
   ```bash
   # In .env.local
   FEATURE_STICKY_CTA=off
   ```
   - Restart server, refresh page
   - **Expected**: Sticky CTAs should NOT appear

### Test Executive Modal (FEATURE_EXEC_MODAL)

1. **Enable the flag**:
   ```bash
   FEATURE_EXEC_MODAL=on
   ```

2. **Visit projects page**:
   - Go to: `http://localhost:5173/projects`
   - Look for "Executive Summary" button on project cards
   - **Expected**: Button should be visible

3. **Disable the flag**:
   ```bash
   FEATURE_EXEC_MODAL=off
   ```
   - Restart server, refresh page
   - **Expected**: "Executive Summary" button should be hidden

### Test Architecture Generator (FEATURE_ARCH_GENERATOR)

1. **Enable the flag**:
   ```bash
   FEATURE_ARCH_GENERATOR=on
   ```

2. **Visit architecture engine**:
   - Go to: `http://localhost:5173/architecture-engine`
   - **Expected**: Full page with industry selection should be visible

3. **Disable the flag**:
   ```bash
   FEATURE_ARCH_GENERATOR=off
   ```
   - Restart server, refresh page
   - **Expected**: "Architecture Generator Temporarily Unavailable" message should appear

---

## Test 4: Deterministic Rollout

### Step 1: Set a feature to rollout mode
```bash
# In .env.local
FEATURE_PROPOSAL_REVIEW=rollout
ROLLOUT_PROPOSAL_REVIEW_PERCENT=50
```

Restart server.

### Step 2: Test with same anon ID multiple times
```bash
# Test 1
curl -H "X-PT-Anon-ID: user-abc-123" http://localhost:3001/api/featureflags | jq '.flags.proposal_review'

# Test 2 (same anon ID)
curl -H "X-PT-Anon-ID: user-abc-123" http://localhost:3001/api/featureflags | jq '.flags.proposal_review'

# Test 3 (same anon ID again)
curl -H "X-PT-Anon-ID: user-abc-123" http://localhost:3001/api/featureflags | jq '.flags.proposal_review'
```

**Expected**: All three requests should return the SAME result (either `enabled: true` or `enabled: false`)

### Step 3: Test with different anon IDs
```bash
# Different anon ID
curl -H "X-PT-Anon-ID: user-xyz-789" http://localhost:3001/api/featureflags | jq '.flags.proposal_review'
```

**Expected**: May return different result (depending on hash), but should be consistent for that specific anon ID.

---

## Test 5: Frontend Integration (Browser Console)

### Step 1: Open browser console
Open DevTools (F12) → Console tab

### Step 2: Check localStorage
```javascript
// Check if anon ID is stored
localStorage.getItem('pt_anon_id')
// Should return something like: "anon_1705123456789_abc123"
```

### Step 3: Check feature flags API response
Open DevTools → Network tab → Filter "featureflags" → Reload page

Look at the response:
```json
{
  "flags": {
    "sticky_cta": { "enabled": true, "reason": "env" },
    ...
  }
}
```

### Step 4: Test dev overrides (if in dev mode)
In browser console:
```javascript
// Enable a feature locally (dev only)
window.__DEV_FEATURE_OVERRIDES__ = {
  proposal_review: true,
  arch_generator: false
};

// Reload page
location.reload();
```

**Expected**: Feature flags should respect these overrides (if in development mode)

---

## Test 6: Verify Analytics Tracking

### Step 1: Open browser console
Open DevTools → Console tab

### Step 2: Check for feature_impression events
When a page loads with enabled features, you should see in console:
```
[Analytics] feature_impression { flag: "sticky_cta", ... }
```

Or check Network tab for analytics events being sent.

---

## Troubleshooting

### API returns empty flags
- **Check**: Server is reading `.env.local` from correct path
- **Check**: Server logs show feature flag configuration on startup
- **Check**: No syntax errors in `.env.local` file

### Features don't gate correctly
- **Check**: Frontend has `FeatureFlagsProvider` wrapping the app (check `src/App.tsx`)
- **Check**: Browser console for errors
- **Check**: Feature flag names match exactly (case-sensitive, lowercase with underscores)

### Rollout not deterministic
- **Check**: Using same `X-PT-Anon-ID` header for each test
- **Check**: Server is actually using the anon ID (check server logs)
- **Check**: Percentage is between 0-100

### Server won't start
- **Check**: `.env.local` is in project root (not in `server/` directory)
- **Check**: No syntax errors in `server/featureFlags.js`
- **Check**: All dependencies installed (`npm install` in server directory)

---

## Quick Test Checklist

- [ ] Server starts without errors
- [ ] `GET /api/featureflags` returns JSON with flags
- [ ] Server logs show feature flag configuration
- [ ] Sticky CTAs appear/disappear based on flag
- [ ] Executive Modal button appears/disappears based on flag
- [ ] Architecture Generator shows/hides based on flag
- [ ] Same anon ID returns same rollout result
- [ ] localStorage contains `pt_anon_id`
- [ ] Feature impressions tracked in console/analytics

---

## Next Steps

Once Phase 1 testing passes:
1. Proceed with Phase 2 (Admin UI, unit tests, documentation)
2. Test ProposalReview gating (when that feature is implemented)
3. Test RiskRadar export gating (if needed)

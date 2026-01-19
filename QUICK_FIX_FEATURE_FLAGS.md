# Quick Fix: Feature Flags Not Working

## Problem: All flags showing as disabled

## Step-by-Step Fix

### Step 1: Check if .env.local exists
```bash
# In project root (not server/ directory)
ls -la .env.local
```

If it doesn't exist, create it:
```bash
touch .env.local
```

### Step 2: Add feature flag variables
Open `.env.local` and add these lines:

```bash
# Feature Flags
FEATURE_STICKY_CTA=on
FEATURE_EXEC_MODAL=on
FEATURE_ARCH_GENERATOR=on
FEATURE_PROPOSAL_REVIEW=off
FEATURE_RISK_RADAR=on
FEATURE_RISK_RADAR_EXPORT=on
```

**Important:** 
- Must be in **project root** (where `package.json` is)
- Must start with `FEATURE_`
- Values must be `on` or `off` (lowercase)

### Step 3: Restart server
```bash
# Stop server (Ctrl+C)
# Then restart:
cd server
npm start
```

### Step 4: Check server logs
Look for this line in server startup:
```
[Feature Flags] Configuration summary: {
  "STICKY_CTA": { "mode": "on", ... },
  ...
}
```

If you see all flags as `"mode": "off"`, the env vars aren't being read.

### Step 5: Test API
```bash
curl http://localhost:3001/api/featureflags
```

Should return JSON like:
```json
{
  "flags": {
    "sticky_cta": { "enabled": true, "reason": "env" },
    "exec_modal": { "enabled": true, "reason": "env" },
    ...
  }
}
```

### Step 6: Check browser
- Open DevTools (F12) → Console
- Look for errors or feature flag logs
- Check Network tab → `/api/featureflags` request

## Common Mistakes

1. **Env file in wrong location**: Should be in project root, not `server/` directory
2. **Wrong variable names**: Must be `FEATURE_STICKY_CTA`, not `STICKY_CTA`
3. **Server not restarted**: Must restart after changing `.env.local`
4. **Typo in values**: Must be `on` or `off` (not `true`, `True`, `ON`)

## If Still Not Working

Add debug logging to `server/index.js` (temporary):

```javascript
// After line 15 (after dotenv.config)
console.log('[DEBUG] FEATURE_STICKY_CTA:', process.env.FEATURE_STICKY_CTA);
console.log('[DEBUG] CWD:', process.cwd());
```

Restart server and check what it prints. This will tell us if:
- Env vars are being read (will show value)
- File path is wrong (will show `undefined`)

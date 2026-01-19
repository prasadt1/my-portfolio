# Fix: Feature Flags Not Loading as True

## Problem: Flags showing `enabled: false` even though env vars are set to `on`

## Step-by-Step Fix

### Step 1: Verify Server is Running

```bash
# Check if server is running on port 3001
curl http://localhost:3001/api/featureflags
```

**If connection refused:**
- Server isn't running → Start it: `cd server && npm start`
- Check if port 3001 is already in use

### Step 2: Check Server Logs on Startup

When server starts, you should see:
```
[Feature Flags] Configuration summary: {
  "EXEC_MODAL": { "mode": "on", ... },
  ...
}
```

**If all show `"mode": "off"`:**
- `.env.local` file doesn't exist or isn't in project root
- Or env vars aren't formatted correctly

### Step 3: Verify .env.local File Location

**Must be in PROJECT ROOT** (not `server/` directory):

```
portfolio-clean-slate/
  ├── .env.local          ← HERE (same level as package.json)
  ├── package.json
  ├── src/
  └── server/
      └── index.js        ← Server reads from ../.env.local
```

### Step 4: Verify .env.local Contents

Open `.env.local` and check:

```bash
# ✅ CORRECT:
FEATURE_EXEC_MODAL=on
FEATURE_STICKY_CTA=on

# ❌ WRONG:
EXEC_MODAL=on                    # Missing FEATURE_ prefix
FEATURE_EXEC_MODAL=ON            # Should be lowercase
FEATURE_EXEC_MODAL=true          # Should be 'on', not 'true'
feATURE_EXEC_MODAL=on            # Should be all uppercase
```

### Step 5: Restart Server After Changes

**CRITICAL:** Server must be restarted after changing `.env.local`:

```bash
# Stop server (Ctrl+C)
# Then restart:
cd server
npm start
```

### Step 6: Test API Directly

```bash
# Should return JSON with enabled flags
curl http://localhost:3001/api/featureflags | jq

# Or check specific flag:
curl http://localhost:3001/api/featureflags | jq '.flags.exec_modal'
```

**Expected output:**
```json
{
  "enabled": true,
  "reason": "env"
}
```

**If shows `enabled: false`:**
- Server isn't reading env vars → Check Steps 2-4

### Step 7: Check Browser Console

Open DevTools (F12) → Console tab. Look for:

**✅ Success:**
```
[Feature Flags] ✅ Fetched flags: { exec_modal: { enabled: true, ... } }
```

**❌ Failure:**
```
[Feature Flags] ❌ Failed to fetch flags: 500 ...
```
or
```
[Feature Flags] ⚠️  All flags are disabled. Check server .env.local...
```

### Step 8: Verify Proxy is Working

Frontend (port 5173) → Vite proxy → Backend (port 3001)

**Check Network tab:**
- Open DevTools → Network
- Filter: "featureflags"
- Check if request goes to `/api/featureflags` (relative URL)
- Status should be `200 OK`
- Response should contain flags JSON

## Quick Test Script

Add this to browser console to test manually:

```javascript
// Test if flags API is accessible
fetch('/api/featureflags')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Flags loaded:', data.flags);
    console.log('exec_modal enabled:', data.flags?.exec_modal?.enabled);
  })
  .catch(err => {
    console.error('❌ Failed to fetch flags:', err);
    console.log('Check: 1) Server running? 2) Port 3001 accessible?');
  });
```

## Common Issues Summary

| Issue | Symptom | Fix |
|-------|---------|-----|
| Server not running | Connection refused | Start server: `cd server && npm start` |
| .env.local in wrong location | All flags `mode: "off"` | Move to project root |
| Wrong variable name | Flag missing from response | Use `FEATURE_EXEC_MODAL` not `EXEC_MODAL` |
| Server not restarted | Changes not applied | Restart after changing `.env.local` |
| Value not lowercase | Flag shows as `off` | Use `on` not `ON` or `true` |

## Verification Checklist

Run through this checklist:

- [ ] `.env.local` exists in **project root** (not `server/`)
- [ ] File contains `FEATURE_EXEC_MODAL=on` (exact format)
- [ ] Server was **restarted** after editing `.env.local`
- [ ] Server logs show `"EXEC_MODAL": { "mode": "on" }`
- [ ] `curl http://localhost:3001/api/featureflags` returns flags
- [ ] Browser console shows `✅ Fetched flags:` (not errors)
- [ ] Network tab shows `/api/featureflags` request with `200 OK`

## Still Not Working?

Add temporary debug logging to `server/index.js`:

```javascript
// After line 15 (after dotenv.config)
console.log('[DEBUG] FEATURE_EXEC_MODAL:', process.env.FEATURE_EXEC_MODAL);
console.log('[DEBUG] CWD:', process.cwd());
console.log('[DEBUG] .env.local path:', path.resolve('../.env.local'));
```

Restart server and check what it prints. This will tell us if:
- Env var is being read (will show value)
- File path is wrong (will show `undefined`)

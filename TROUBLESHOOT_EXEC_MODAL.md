# Troubleshooting: Executive Summary Button Not Showing

## Quick Debug Steps

### Step 1: Check Browser Console

Open DevTools (F12) → Console tab. Look for:

1. **Feature flags fetch log:**
   ```
   [Feature Flags] Fetched flags: { exec_modal: { enabled: true, ... }, ... }
   ```

2. **ProjectCard debug log:**
   ```
   [ProjectCard] exec_modal flag: { enabled: true, reason: 'env' }
   ```

3. **Any errors:**
   - Network errors for `/api/featureflags`
   - React errors about hooks

### Step 2: Check API Response

Open DevTools → Network tab → Filter "featureflags" → Click the request → Response tab

**Expected:**
```json
{
  "flags": {
    "exec_modal": {
      "enabled": true,
      "reason": "env"
    },
    ...
  }
}
```

**If `exec_modal` is missing or `enabled: false`:**
- Server isn't reading `FEATURE_EXEC_MODAL=on` from `.env.local`
- Check server logs for feature flag configuration

### Step 3: Check Server Logs

When server starts, look for:
```
[Feature Flags] Configuration summary: {
  "EXEC_MODAL": { "mode": "on", ... }
}
```

**If mode is "off":**
- `.env.local` doesn't have `FEATURE_EXEC_MODAL=on`
- Or file is in wrong location (should be in project root)

### Step 4: Verify Button Location

**Important:** The Executive Summary button is on the **Projects listing page** (`/projects`), NOT on the individual case study detail pages (`/projects/:slug`).

To test:
1. Go to: `http://localhost:5173/projects` (or your frontend URL)
2. Look at any project card
3. At the bottom, next to "View Case Study" button
4. Should see "Executive Summary" button with file icon

### Step 5: Manual API Test

```bash
curl http://localhost:3001/api/featureflags | jq '.flags.exec_modal'
```

**Expected:**
```json
{
  "enabled": true,
  "reason": "env"
}
```

## Common Issues & Fixes

### Issue 1: Flag returns `undefined`

**Symptom:** Console shows `exec_modal flag: { enabled: false, reason: 'explicit' }`

**Cause:** Flags haven't loaded yet, or API didn't return `exec_modal`

**Fix:**
- Check Network tab - is `/api/featureflags` request successful?
- Check response - does it include `exec_modal`?
- Check server logs - is `FEATURE_EXEC_MODAL` being read?

### Issue 2: Flag shows `enabled: false` even though env var is `on`

**Symptom:** Server logs show `"mode": "off"` or API returns `enabled: false`

**Cause:** `.env.local` not being read or wrong variable name

**Fix:**
1. Verify `.env.local` is in **project root** (not `server/` directory)
2. Verify variable name is exactly: `FEATURE_EXEC_MODAL=on` (uppercase, with underscore)
3. Restart server after changing `.env.local`

### Issue 3: Component renders before flags load

**Symptom:** Button briefly missing, then appears after a moment

**Cause:** React renders before async flag fetch completes

**Fix:** This is expected behavior - button will appear once flags load. If it never appears, flags aren't loading.

### Issue 4: Wrong page location

**Symptom:** Looking at case study detail page (`/projects/photography-coach-ai`) but button is on listing page

**Fix:** Navigate to `/projects` (the listing page with all project cards)

## Quick Fix Script

Add to browser console to manually enable (dev only):

```javascript
// Check current flags
localStorage.getItem('pt_anon_id')
// Should show anon ID

// Check if flags loaded
// Go to Network tab → /api/featureflags → Response
// Should see exec_modal: { enabled: true }

// Manual override (temporary, dev only)
window.__DEV_FEATURE_OVERRIDES__ = {
  exec_modal: true
};
location.reload();
```

## Verification Checklist

- [ ] `.env.local` has `FEATURE_EXEC_MODAL=on` (in project root)
- [ ] Server was restarted after changing `.env.local`
- [ ] Server logs show `"EXEC_MODAL": { "mode": "on" }`
- [ ] API `/api/featureflags` returns `exec_modal: { enabled: true }`
- [ ] Browser console shows no errors
- [ ] Browser console shows `[ProjectCard] exec_modal flag: { enabled: true }`
- [ ] On `/projects` page (not case study detail page)
- [ ] Looking at bottom of project cards (not header/navigation)

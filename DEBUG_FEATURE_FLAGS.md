# Debugging Feature Flags

## Common Issues & Fixes

### Issue: All flags showing as disabled

**Cause 1: Environment variables not set**
- Check: `.env.local` file exists in project root (not in `server/` directory)
- Check: Variables are named correctly (e.g., `FEATURE_STICKY_CTA=on`, not `STICKY_CTA=on`)

**Fix:**
```bash
# In project root .env.local
FEATURE_STICKY_CTA=on
FEATURE_EXEC_MODAL=on
FEATURE_ARCH_GENERATOR=on
```

**Cause 2: Server not reading .env.local**
- Check: Server logs show feature flag configuration on startup
- Look for: `[Feature Flags] Configuration summary:`

**Fix:**
- Restart server after changing `.env.local`
- Ensure `.env.local` is in project root (where `dotenv.config()` is called)

**Cause 3: Frontend can't reach API**
- Check: Browser console for network errors
- Check: `/api/featureflags` request in Network tab

**Fix:**
- Ensure server is running on port 3001 (or configured PORT)
- Check CORS settings if frontend on different port

### Issue: Flags work in API but not in UI

**Cause: Frontend not wrapped with FeatureFlagsProvider**

**Check:**
- Open browser console → Should see feature flag fetch in Network tab
- Check if `localStorage.getItem('pt_anon_id')` returns a value

**Fix:**
- Ensure `FeatureFlagsProvider` wraps app in `src/App.tsx`

### Issue: API returns empty flags object

**Cause: Env vars not being read**

**Debug:**
1. Add to `server/index.js` (temporary):
```javascript
console.log('[DEBUG] FEATURE_STICKY_CTA:', process.env.FEATURE_STICKY_CTA);
```

2. Check server startup logs

**Fix:**
- Ensure `.env.local` is in correct location (project root)
- Restart server

### Quick Diagnostic Commands

```bash
# 1. Check if env vars are set (in server directory)
cd server
node -e "require('dotenv').config({path: '../.env.local'}); console.log('STICKY_CTA:', process.env.FEATURE_STICKY_CTA)"

# 2. Test API endpoint (server must be running)
curl http://localhost:3001/api/featureflags

# 3. Check browser localStorage
# Open browser console:
localStorage.getItem('pt_anon_id')

# 4. Check feature flags in React DevTools
# Install React DevTools → Components → Find FeatureFlagsProvider → Check state
```

### Default Behavior (If Flags Not Configured)

- **All flags default to `off`** (disabled)
- This is intentional for safety/backwards compatibility
- To enable features, explicitly set env vars: `FEATURE_*=on`

### Testing Checklist

- [ ] `.env.local` exists in project root
- [ ] Env vars start with `FEATURE_` prefix
- [ ] Server logs show feature flag config on startup
- [ ] `/api/featureflags` returns JSON with flags
- [ ] Browser console shows no errors
- [ ] `localStorage` contains `pt_anon_id`
- [ ] Network tab shows successful `/api/featureflags` request

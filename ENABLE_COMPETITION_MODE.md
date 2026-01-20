# Enable Competition Mode in Production

## What is Competition Mode?

Competition Mode (`VITE_COMPETITION_MODE=true`) automatically enables and promotes ALL Phase 4 features in your production website, including:

- ✅ **Competition Page** (`/competition`) - Full walkthrough page for judges
- ✅ **Competition Mode Ribbon** - Visible badge in navigation
- ✅ **All AI Features** - Auto-promoted (Checklist, Architecture Engine, Risk Radar)
- ✅ **Toolkit Library** - Full catalog visible
- ✅ **Case Study Artifacts** - Download and request features enabled
- ✅ **Testimonials Rotator** - Active on homepage
- ✅ **Impact Dashboards** - Full metrics display
- ✅ **Phase 4 UX Changes** - All wireframe improvements visible

## Current Status

**Competition Mode is now configured in `cloudbuild.yaml` with default value `true`.**

## How to Enable/Disable

### Option 1: Update Cloud Build Substitution (Recommended)

Edit `cloudbuild.yaml` and change the substitution value:

```yaml
substitutions:
  _VITE_COMPETITION_MODE: "true"   # Enable competition mode
  # or
  _VITE_COMPETITION_MODE: "false"  # Disable competition mode
```

Then trigger a new build/deployment.

### Option 2: Override via Cloud Build Trigger

If you're using Cloud Build Triggers, you can set the substitution variable in the trigger configuration:

1. Go to Cloud Build → Triggers
2. Edit your trigger
3. Add substitution variable: `_VITE_COMPETITION_MODE` = `true` or `false`

### Option 3: Manual Build with Substitution

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_VITE_COMPETITION_MODE=true
```

## What Gets Enabled

When `VITE_COMPETITION_MODE=true`:

### Navigation
- Competition Mode ribbon appears at top of page
- Navigation bar adjusts spacing (moves down to accommodate ribbon)

### Routes & Pages
- `/competition` page becomes accessible (shows 404 when disabled)
- All feature routes are accessible and promoted

### Features Auto-Promoted
- `AI_CHECKLIST` - AI Proposal Review Checklist
- `AI_ARCH_ENGINE` - Architecture Engine Tool
- `AI_RISK_RADAR` - Risk Radar Tool
- `TOOLKIT_LIBRARY` - Full toolkit catalog
- `CASESTUDY_ARTIFACT_GATE` - Artifact download/request
- `HOMEPAGE_PERSONA_TABS` - Persona switching
- `AI_TOOLS_SECTION` - AI tools section on homepage
- `TOOLKIT_LIBRARY_SECTION` - Toolkit section
- `FULL_CASE_STUDIES_CATALOG` - Complete case study catalog
- `CASE_STUDY_ARTIFACTS_DOWNLOAD` - Public artifact downloads
- `CASE_STUDY_ARTIFACTS_REQUEST` - Artifact request flow
- `TESTIMONIALS_ROTATOR` - Testimonials carousel
- `IMPACT_DASHBOARDS` - Impact metrics dashboard

### Phase 4 UX Changes Visible
- HomePage wireframe improvements
- ProjectsPage enhancements
- CaseStudyPage refinements
- ServicesPage updates
- ResourcesPage toolkit grid

## Verification

After deployment, verify Competition Mode is enabled:

1. **Check Navigation**: Look for "Competition Mode" ribbon at top
2. **Visit `/competition`**: Should show full competition page (not 404)
3. **Check Homepage**: All AI features should be visible and promoted
4. **Check Diagnostics**: Visit `/admin/diagnostics` to see feature flag status

## Troubleshooting

### Competition Mode Not Showing

1. **Verify Build**: Check that `VITE_COMPETITION_MODE` was passed as build arg
2. **Check Build Logs**: Look for the build arg in Cloud Build logs
3. **Verify Environment**: Check browser console for `import.meta.env.VITE_COMPETITION_MODE`
4. **Hard Refresh**: Clear cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Features Still Not Visible

- Competition Mode enables features, but they may still be gated by individual feature flags
- Check `/admin/feature-flags` to see individual flag status
- Competition Mode should auto-promote all listed features

## Quick Enable for Current Deployment

To enable immediately without modifying cloudbuild.yaml:

```bash
# Set substitution and trigger build
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_VITE_COMPETITION_MODE=true,_VITE_GEMINI_API_KEY=YOUR_KEY
```

**Note**: You'll need to rebuild and redeploy for the change to take effect, as Vite environment variables are embedded at build time.

## Disable Competition Mode

To disable and return to production mode:

1. Set `_VITE_COMPETITION_MODE: "false"` in `cloudbuild.yaml` substitutions
2. Or override: `--substitutions=_VITE_COMPETITION_MODE=false`
3. Rebuild and redeploy

When disabled:
- Competition page shows 404
- Competition ribbon hidden
- Features follow individual feature flag settings
- Production-focused, cleaner UI

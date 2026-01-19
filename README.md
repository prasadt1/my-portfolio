# Prasad Tilloo Portfolio - Architecture Engine

A professional portfolio website featuring an AI-powered Architecture Decision Engine built with React, TypeScript, Vite, and Google Gemini AI.

## ✨ Features

- 🎯 **AI-Powered Architecture Engine** - Get expert recommendations based on 15+ years of experience
- 🏥 **Multi-Industry Support** - Healthcare, Financial Services, eCommerce, AI/ML
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development
- 🎨 **Professional Design** - Clean, sophisticated UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Gemini API key from [Google AI Studio](https://aistudio.google.com)

### Installation

1. **Extract/Clone the project**
   ```bash
   cd portfolio-clean-slate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   
   # Edit .env.local and add your Gemini API key
   # VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔑 Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click "Get API Key" in the top right
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

## 📁 Project Structure

```
portfolio-clean-slate/
├── src/
│   ├── components/
│   │   └── Navigation.tsx          # Navigation bar
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   └── ArchitectureEngine.tsx  # Main feature
│   ├── services/
│   │   └── architectureGenerator.ts # Gemini API integration
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts              # Environment types
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
└── .env.local                     # Environment variables (create this)
```

# 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### Update Your Information

Edit `src/pages/HomePage.tsx` to update:
- Your name and title
- Metrics (years, industries, etc.)
- Industry expertise
- Project counts

### Add Projects

Create project data in a new file or update the placeholders in the code.

### Styling

All styles are inline for simplicity. You can:
- Modify colors directly in the components
- Add Tailwind CSS for utility classes
- Create a separate CSS file

## 🧪 Testing the Architecture Engine

1. Navigate to the Architecture Engine page
2. Select an industry (Healthcare, Financial, eCommerce, or AI/ML)
3. Use the pre-filled example or write your own challenge
4. Click "Generate Architecture"
5. Wait 10-20 seconds for AI to analyze
6. View the comprehensive recommendations

## 📝 Environment Variables

### Core Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### Email Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_PROVIDER` | Email provider: `smtp` (default) or `sendgrid_api` | No |
| `SMTP_HOST` | SMTP server host (e.g., `smtp.gmail.com`) | For SMTP |
| `SMTP_PORT` | SMTP port (default: `587`) | For SMTP |
| `SMTP_SECURE` | Use SSL (default: `false` for STARTTLS) | No |
| `SMTP_USER` | SMTP username | For SMTP |
| `SMTP_PASS` | SMTP password (App Password for Gmail) | For SMTP |
| `SENDGRID_API_KEY` | SendGrid API key | For SendGrid |
| `FROM_EMAIL` | Default from email address | Yes (for email) |
| `FROM_NAME` | Default from name | No |
| `REPLY_TO_EMAIL` | Reply-to email address | No |
| `CONTACT_EMAIL` | Contact email shown in templates | No |

### Lead Storage Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `LEAD_STORE_PROVIDER` | Storage provider: `json` (default) or `gsheets` | No |
| `GSHEETS_SPREADSHEET_ID` | Google Sheet ID from URL (NOT a friendly name) | For GSheets |
| `GSHEETS_SHEET_NAME` | Sheet tab name (default: `Leads`) | No |
| `GSHEETS_CLIENT_EMAIL` | Service account email | For GSheets |
| `GSHEETS_PRIVATE_KEY` | Service account private key (with `\n` for newlines, in quotes) | For GSheets |

> **Important:** `GSHEETS_SPREADSHEET_ID` must be the actual ID from the spreadsheet URL, not a friendly name.
> Example URL: `https://docs.google.com/spreadsheets/d/1haP11eMsvEVjbLsJYUD7MlalBYxmUathYvXUHe7JsKY/edit`
> The ID is: `1haP11eMsvEVjbLsJYUD7MlalBYxmUathYvXUHe7JsKY`

### Feature Flags Configuration (Phase 3.2)

**Phase 3.1 Core Flags:**
| Variable | Description | Values | Required |
|----------|-------------|--------|----------|
| `VITE_PROMOTE_AI_CHECKLIST` | Promote Checklist in nav/home | `true`, `false` | No (default: `true`) |
| `VITE_PROMOTE_AI_ARCH_ENGINE` | Promote Architecture Engine | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_AI_RISK_RADAR` | Promote Risk Radar | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_TOOLKIT_LIBRARY` | Promote Toolkit Library | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_ARTIFACT_GATE` | Promote Artifact Previews | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_PERSONA_TABS` | Promote Persona Tabs | `true`, `false` | No (default: `false`) |

**Phase 3.2 Extended Flags:**
| Variable | Description | Values | Required |
|----------|-------------|--------|----------|
| `VITE_PROMOTE_AI_TOOLS` | Promote AI Tools Section | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_TOOLKITS` | Promote Toolkits Section | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_FULL_CATALOG` | Promote Full Case Studies Catalog | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_ARTIFACTS_DOWNLOAD` | Enable Public Artifact Downloads | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_ARTIFACTS_REQUEST` | Enable Artifact Request Flow | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_TESTIMONIALS` | Enable Testimonials Rotator | `true`, `false` | No (default: `false`) |
| `VITE_PROMOTE_IMPACT_DASHBOARDS` | Enable Impact Dashboards | `true`, `false` | No (default: `false`) |

**Competition Mode (Phase 3.2B):**
| Variable | Description | Values | Required |
|----------|-------------|--------|----------|
| `VITE_COMPETITION_MODE` | Auto-promote all major features | `true`, `false` | No (default: `false`) |

When `VITE_COMPETITION_MODE=true`, all major features are automatically promoted regardless of individual flags.

**Feature Flag Modes:**
- `on` - Feature enabled for all users
- `off` - Feature disabled (default if not set)
- `rollout` - Percentage-based rollout (requires `ROLLOUT_*_PERCENT`)

**Example rollout configuration:**
```bash
FEATURE_PROPOSAL_REVIEW=rollout
ROLLOUT_PROPOSAL_REVIEW_PERCENT=10  # Enable for 10% of users
```

See [Feature Flags & Phased Release](#-feature-flags--phased-release) section for detailed usage.

### Example `.env.local` Configuration

```bash
# Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Email (SMTP - for development)
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Email (SendGrid - for production)
# EMAIL_PROVIDER=sendgrid_api
# SENDGRID_API_KEY=SG.your_sendgrid_api_key

# Email addresses
# Note: Until you have a real mailbox on prasadtilloo.com, set all email addresses to Gmail
FROM_EMAIL=prasad.sgsits@gmail.com
FROM_NAME=Prasad Tilloo
REPLY_TO_EMAIL=prasad.sgsits@gmail.com
CONTACT_EMAIL=prasad.sgsits@gmail.com

# Lead Storage (optional - defaults to JSON file)
# LEAD_STORE_PROVIDER=gsheets
# GSHEETS_SPREADSHEET_ID=1haP11eMsvEVjbLsJYUD7MlalBYxmUathYvXUHe7JsKY
# GSHEETS_SHEET_NAME=Leads
# GSHEETS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
# GSHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...\n-----END PRIVATE KEY-----\n"

# Feature Flags (MVP defaults - enable features progressively)
# See "Feature Flags & Phased Release" section for detailed usage
FEATURE_STICKY_CTA=on
FEATURE_EXEC_MODAL=on
FEATURE_ARCH_GENERATOR=off
FEATURE_PROPOSAL_REVIEW=off
FEATURE_RISK_RADAR=on
FEATURE_RISK_RADAR_EXPORT=on

# Rollout percentages (for features in 'rollout' mode)
# ROLLOUT_PROPOSAL_REVIEW_PERCENT=10
```

## 📧 Email Configuration Note

**Important:** Until you have a real mailbox configured on `prasadtilloo.com`, set `CONTACT_EMAIL` and `REPLY_TO_EMAIL` to a Gmail address (e.g., `prasad.sgsits@gmail.com`).

The server will log a warning if it detects `CONTACT_EMAIL` ends with `@prasadtilloo.com` but `REPLY_TO_EMAIL` is a Gmail address, indicating a potential mismatch where the displayed contact email may not be deliverable.

## 📊 Google Sheets Lead Storage Setup

To store leads in Google Sheets instead of a local JSON file, follow these steps:

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Note your project ID

### Step 2: Enable the Google Sheets API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click **Enable**

### Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in:
   - Service account name: e.g., `portfolio-leads`
   - Service account ID: auto-generated
4. Click **Create and Continue**
5. Skip the optional permissions, click **Done**

### Step 4: Generate a Private Key

1. Click on your newly created service account
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create** - the key file will download
6. **Important:** Keep this file secure and never commit it to git!

### Step 5: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename the first sheet tab to `Leads`
4. Add headers in row 1 (optional but recommended):
   ```
   timestamp | email | name | sourcePath | locale | consent | consentTimestamp | ipHash | userAgent | leadMagnet | referrer
   ```
5. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
   The ID is the long string between `/d/` and `/edit`

### Step 6: Share the Spreadsheet with the Service Account

1. Open your Google Sheet
2. Click **Share**
3. Paste the service account email (from your JSON key file, looks like: `name@project-id.iam.gserviceaccount.com`)
4. Set permission to **Editor**
5. Click **Share**

### Step 7: Configure Environment Variables

Add these to your `.env.local`:

```bash
LEAD_STORE_PROVIDER=gsheets
GSHEETS_SPREADSHEET_ID=1haP11eMsvEVjbLsJYUD7MlalBYxmUathYvXUHe7JsKY
GSHEETS_SHEET_NAME=Leads
GSHEETS_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GSHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADA...\n-----END PRIVATE KEY-----\n"
```

**Important notes for `GSHEETS_PRIVATE_KEY`:**
- Must be wrapped in double quotes
- Newlines must be represented as `\n` (not actual line breaks)
- Copy the `private_key` value from your JSON key file exactly

### Step 8: Verify the Integration

1. Start your server: `npm run server` or `cd server && npm start`
2. Check the startup logs for:
   ```
   [LeadStore] Configuration:
     - Provider: gsheets
     - Spreadsheet ID: 1haP11eMs...
     - Sheet Name: Leads
     - Client Email: SET
     - Private Key: SET
   [GoogleSheetLeadStore] ✓ Verified access to spreadsheet, sheet "Leads" found.
   ```
3. Submit a test lead through your form
4. Check your Google Sheet - the lead should appear

### Troubleshooting

**"Spreadsheet not found" error:**
- Ensure `GSHEETS_SPREADSHEET_ID` is the actual ID from the URL, not a friendly name
- Double-check you copied the correct ID

**"Permission denied" error:**
- Verify you shared the spreadsheet with the service account email
- Ensure the service account has **Editor** access

**"Sheet not found" error:**
- Check that a sheet tab named `Leads` exists (or set `GSHEETS_SHEET_NAME` to match your tab name)

**Private key errors:**
- Ensure the key is wrapped in double quotes
- Verify `\n` characters are preserved (not converted to actual newlines)
- Check the key starts with `-----BEGIN PRIVATE KEY-----`

### Fallback Behavior

If Google Sheets fails (misconfigured, API error, etc.):
- The system automatically falls back to JSON file storage
- Lead capture continues without interruption
- Check server logs for warnings about fallback activation

### Security Notes

> ⚠️ **Never commit secrets to git!**
> - `.env.local` is already in `.gitignore`
> - Never commit the service account JSON key file
> - Never log the full private key

### Debugging Google Sheets Integration (Dev Only)

The server provides dev-only endpoints for debugging Google Sheets integration. These endpoints are **blocked in production** (`NODE_ENV=production`).

#### Check Configuration Status

```bash
curl http://localhost:3001/api/leadstore/status
```

Returns current configuration with masked sensitive values:
```json
{
  "success": true,
  "status": {
    "provider": "gsheets",
    "configured": true,
    "spreadsheetId": "1haP11...JsKY",
    "sheetName": "Leads",
    "clientEmail": "my-por...@just-plate-124722.iam.gserviceaccount.com",
    "privateKeySet": true,
    "primaryFailed": false,
    "errors": []
  }
}
```

#### Verify Google Sheets Access

```bash
curl -X POST http://localhost:3001/api/leadstore/verify
```

Tests connectivity and permissions:
```json
{
  "success": true,
  "message": "Google Sheets access verified"
}
```

#### Test Write Operation

```bash
curl -X POST http://localhost:3001/api/leadstore/test-write
```

Writes a test lead to verify end-to-end functionality:
```json
{
  "success": true,
  "message": "Test lead written successfully",
  "testEmail": "test+gsheets@prasadtilloo.com"
}
```

> **Note:** These endpoints return `403 Not available` in production environments.

## 🔍 Diagnostics (Dev Only)

### Case Study Data Validation

The project includes automatic validation of case study IDs and slugs on startup. This runs in development mode and logs warnings to the console if issues are detected.

**Validation Rules:**
- All `id` and `slug` values must be unique
- Must be lowercase kebab-case (e.g., `my-project-id`)
- No empty strings allowed
- No spaces or uppercase characters

**Example console output (if issues exist):**
```
=== PROJECT VALIDATION ISSUES ===
Found 2 issue(s) in project data:

1. [ID] Duplicate ID (first seen at index 0)
   Project: BRITA eCommerce Modernization
   Value: "brita-ecommerce"

2. [SLUG] Slug must be lowercase kebab-case
   Project: Insurance Performance
   Value: "Insurance_Performance"

=================================
Please fix these issues in src/data/projects.ts
```

**Localization Fallback Validation:**

The localization utilities (`src/utils/localization.ts`) also log warnings in development mode when:
- A `LocalizedString` is missing the English (`en`) key
- A `LocalizedStringArray` is empty or missing

### Google Sheets Diagnostic Endpoints

```bash
# Check configuration status
curl http://localhost:3001/api/leadstore/status

# Verify Google Sheets access
curl -X POST http://localhost:3001/api/leadstore/verify

# Test write operation
curl -X POST http://localhost:3001/api/leadstore/test-write
```

> **Security Note:** Diagnostic endpoints are blocked in production (`NODE_ENV=production`). No secrets are logged.

## 🎛️ Feature Flags & Phased Release

The portfolio includes a robust feature flag system for progressive rollouts and safe feature releases.

### Overview

Feature flags allow you to:
- Enable/disable features without code changes
- Gradually roll out features to a percentage of users
- Test features in production with minimal risk
- Quickly disable features if issues arise

### Quick Start

1. **Enable a feature for all users:**
   ```bash
   FEATURE_STICKY_CTA=on
   ```

2. **Disable a feature:**
   ```bash
   FEATURE_ARCH_GENERATOR=off
   ```

3. **Enable for a percentage of users (rollout):**
   ```bash
   FEATURE_PROPOSAL_REVIEW=rollout
   ROLLOUT_PROPOSAL_REVIEW_PERCENT=10  # 10% of users
   ```

### Recommended MVP Defaults

For initial production launch, use these conservative defaults:

```bash
FEATURE_STICKY_CTA=on           # Core UX improvement
FEATURE_EXEC_MODAL=on            # Core feature
FEATURE_ARCH_GENERATOR=off       # Beta feature - disable initially
FEATURE_PROPOSAL_REVIEW=off      # New feature - disable initially
FEATURE_RISK_RADAR=on            # Core feature
FEATURE_RISK_RADAR_EXPORT=on     # Core feature
```

### Progressive Rollout Process

To safely enable a new feature:

1. **Start small (1%):**
   ```bash
   FEATURE_PROPOSAL_REVIEW=rollout
   ROLLOUT_PROPOSAL_REVIEW_PERCENT=1
   ```

2. **Monitor** - Check analytics, error logs, performance

3. **Increase gradually:**
   - 1% → 10% (if no issues)
   - 10% → 25% (if stable)
   - 25% → 50% (if performing well)
   - 50% → 100% (if ready for full rollout)

4. **Enable for all:**
   ```bash
   FEATURE_PROPOSAL_REVIEW=on  # Removes rollout logic overhead
   ```

### Deterministic Rollout

The rollout system uses SHA256 hashing to ensure:
- **Same user, same result**: A user will always get the same flag value (enabled/disabled)
- **Consistent assignment**: Changing percentage doesn't affect users already in the rollout
- **No PII**: Uses anonymous IDs, never email addresses

### Admin UI (Dev Only)

Access the feature flags admin UI at `/admin/feature-flags` (development only):

- View all current flags and their status
- Toggle local overrides (stored in localStorage)
- Simulate rollouts with different anon IDs and percentages
- Test deterministic behavior

**Note:** Admin page is automatically hidden in production builds.

### Setting Flags in Cloud Run / Production

**Via Environment Variables:**
```bash
gcloud run services update portfolio-service \
  --set-env-vars "FEATURE_PROPOSAL_REVIEW=rollout,ROLLOUT_PROPOSAL_REVIEW_PERCENT=10"
```

**Via Secret Manager (recommended for sensitive flags):**
1. Store flags in Secret Manager
2. Reference in Cloud Run env vars or load at runtime

### Testing Feature Flags

```bash
# Test API endpoint
curl http://localhost:3001/api/featureflags

# Should return JSON with all flags:
# {
#   "flags": {
#     "sticky_cta": { "enabled": true, "reason": "env" },
#     ...
#   }
# }
```

### Gated Features

Currently gated features:
- **Sticky CTAs** - `FEATURE_STICKY_CTA`
- **Executive Modal** - `FEATURE_EXEC_MODAL`
- **Architecture Generator** - `FEATURE_ARCH_GENERATOR`
- **Risk Radar CTAs** - `FEATURE_RISK_RADAR`
- **Risk Radar Exports** - `FEATURE_RISK_RADAR_EXPORT` (when implemented)

All flags default to `off` if not configured (safe fallback behavior).

## 🎯 Phase 3.2-3.3: Competition Readiness & Artifact System

### Competition Mode

For DEV.to submission and competition judging, enable competition mode:

```bash
VITE_COMPETITION_MODE=true
```

This automatically promotes all major features, ensuring judges see full platform depth.

### Artifact Request Workflow (Phase 3.3)

The portfolio includes a tiered artifact system:

1. **Public Artifacts** - Direct download available
2. **Gated Artifacts** - Require access request
3. **On-Request Artifacts** - Shared selectively via NDA

**Request Flow:**
1. User clicks "Request Access" on artifact preview
2. Modal opens with form (name, email, company, role, reason)
3. User acknowledges NDA understanding
4. Request saved to Google Sheets (same as leads, filtered by `leadMagnet: 'artifact-request'`)
5. Email notifications sent (requester + you)
6. You review and share artifacts selectively

**Server Endpoint:** `POST /api/artifact-request`

**Google Sheets Storage:**
- Uses same lead store system
- Filter by `leadMagnet = 'artifact-request'`
- Includes case study slug, artifact IDs, attribution data
- No PII in analytics events

### Hero Projects Strategy (Phase 3.3A)

Five hero case studies have full content:
- `brita-ecommerce`
- `delivery-hero-ads`
- `insurance-performance`
- `pact-pcf-data-exchange-network` (SINE climate tech)
- `photography-coach-ai`

Hero projects include:
- Full `executiveSnapshot`
- Complete `personaChallenges`
- Comprehensive `trustLayer`
- 6+ `artifactPreviews`/`artifacts`

Other projects use `visibilityTier: 'catalog'` or `'summaryOnly'` for NDA-safe presentation.

## 🚨 Troubleshooting

### "VITE_GEMINI_API_KEY not configured"
- Make sure you created `.env.local` in the root directory
- Verify the API key is correct
- Restart the dev server after adding the key

### "Failed to generate architecture"
- Check your internet connection
- Verify API key is valid
- Check Gemini API quota at [Google AI Studio](https://aistudio.google.com)

### Port already in use
```bash
# Kill the process using port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your API key secret
- The `.gitignore` file is configured to exclude sensitive files
- API key is only used client-side (consider adding a backend for production)

## 📦 Dependencies

### Core
- React 18.2.0
- React Router DOM 6.22.3
- TypeScript 5.3.0
- Vite 5.0.0

### UI
- Lucide React (icons)
- Framer Motion (animations)

### AI
- @google/generative-ai (Gemini API)

### Optional (for future enhancements)
- @xyflow/react (interactive diagrams)
- dagre (graph layout)

## 🚀 Deployment

### Build for production
```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### Deploy to Google Cloud Run (Phase 3.2C)

```bash
# Build and deploy with Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly with Docker
docker build -t gcr.io/$PROJECT_ID/portfolio-service .
docker push gcr.io/$PROJECT_ID/portfolio-service
gcloud run deploy portfolio-service \
  --image gcr.io/$PROJECT_ID/portfolio-service \
  --region europe-west1 \
  --platform managed \
  --allow-unauthenticated \
  --labels dev-tutorial=devnewyear2026
```

**Health Check:**
```bash
curl https://your-service-url.run.app/health
```

**Server Endpoints:**
- `/api/lead` - Lead capture (guide download)
- `/api/artifact-request` - Artifact access requests (Phase 3.3, hardened in Phase 3.4B)
- `/api/chat` - AI chat assistant
- `/api/risk-radar` - Risk assessment tool
- `/api/architecture/generate` - Architecture generator
- `/api/version` - Deployment diagnostics (Phase 3.4E)
- `/health` - Health check endpoint

**Admin Endpoints (Phase 3.4E):**
- `/admin/diagnostics?token=YOUR_TOKEN` - Diagnostics page (requires `VITE_ADMIN_TOKEN`)
- `/admin/feature-flags` - Feature flags admin (dev-only)

**Setting Admin Token:**
```bash
# In .env.local
VITE_ADMIN_TOKEN=your-secure-random-token-here

# Or in Cloud Run
gcloud run services update portfolio-service \
  --set-env-vars VITE_ADMIN_TOKEN=your-secure-random-token-here
```

### Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **Google Cloud Run**: See above
- **GitHub Pages**: Enable in repository settings

Remember to set `VITE_GEMINI_API_KEY` in your hosting platform's environment variables!

## 📄 License

This is a personal portfolio project. Feel free to use it as inspiration for your own portfolio!

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the code comments
3. Consult the [Vite documentation](https://vitejs.dev)
4. Check [Gemini API docs](https://ai.google.dev/docs)

## 🎯 Next Steps

After getting the basic portfolio working, you can:
1. Add React Flow for interactive architecture diagrams
2. Implement the full homepage with animations
3. Add About and Projects pages
4. Create a blog section
5. Add more industries and frameworks
6. Implement user authentication
7. Add analytics

---

**Built with ❤️ by Prasad Tilloo**

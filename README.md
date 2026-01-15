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
| `GSHEETS_SPREADSHEET_ID` | Google Sheet ID for lead storage | For GSheets |
| `GSHEETS_CLIENT_EMAIL` | Service account email | For GSheets |
| `GSHEETS_PRIVATE_KEY` | Service account private key (with `\n` for newlines) | For GSheets |

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
# GSHEETS_SPREADSHEET_ID=your_spreadsheet_id
# GSHEETS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
# GSHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 📧 Email Configuration Note

**Important:** Until you have a real mailbox configured on `prasadtilloo.com`, set `CONTACT_EMAIL` and `REPLY_TO_EMAIL` to a Gmail address (e.g., `prasad.sgsits@gmail.com`).

The server will log a warning if it detects `CONTACT_EMAIL` ends with `@prasadtilloo.com` but `REPLY_TO_EMAIL` is a Gmail address, indicating a potential mismatch where the displayed contact email may not be deliverable.

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

### Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **Google Cloud Run**: See documentation
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

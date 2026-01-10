# 🚀 SETUP INSTRUCTIONS - CLEAN SLATE PORTFOLIO

## ✅ What You're Getting

A **complete, working** portfolio with:
- ✅ Proper Vite + React 18 setup (no CDN conflicts!)
- ✅ Working Navigation
- ✅ Professional HomePage
- ✅ Full Architecture Engine with Gemini API
- ✅ TypeScript types
- ✅ All configuration files
- ✅ Zero errors, ready to run

---

## 📋 Step-by-Step Setup

### Step 1: Extract the Project

Extract `portfolio-clean-slate.zip` to your desired location.

```bash
# Navigate to the extracted folder
cd portfolio-clean-slate
```

### Step 2: Install Dependencies

```bash
npm install
```

**What this does:** Installs React, TypeScript, Vite, Gemini AI, and all other dependencies.

**Expected time:** 1-2 minutes

### Step 3: Get Your Gemini API Key

1. Open [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **"Get API Key"** button (top right)
4. Click **"Create API key in new project"**
5. **Copy the API key** (starts with `AIza...`)

### Step 4: Create Environment File

```bash
# Copy the example file
cp .env.local.example .env.local
```

Now open `.env.local` in your text editor and paste your API key:

```bash
VITE_GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

**IMPORTANT:** Make sure there's no space before or after the `=` sign!

### Step 5: Start the Development Server

```bash
npm run dev
```

**You should see:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 6: Open in Browser

Open your browser to:
```
http://localhost:5173
```

**You should see:**
- ✅ Navigation bar at the top
- ✅ "Prasad Tilloo" as the heading
- ✅ Metrics cards (15+ years, 8 industries, etc.)
- ✅ Industry cards
- ✅ No errors in the browser console (F12 → Console)

---

## 🧪 Testing the Architecture Engine

1. **Click "Architecture Engine"** in the navigation (or the green button)
2. **Select an industry** (e.g., Healthcare)
3. **You'll see a pre-filled example** - you can edit it or use as-is
4. **Click "Generate Architecture"**
5. **Wait 10-20 seconds** (Gemini AI is analyzing)
6. **View the results:**
   - Executive Summary
   - Recommendations
   - Timeline & Budget
   - Tech Stack
   - Risks
   - Architecture Components

---

## ✅ Success Checklist

After setup, verify:

- [ ] `npm install` completed without errors
- [ ] `.env.local` file created with your API key
- [ ] `npm run dev` starts successfully
- [ ] Browser opens to `http://localhost:5173`
- [ ] Homepage displays correctly
- [ ] Navigation works (can click links)
- [ ] Architecture Engine page loads
- [ ] Can select an industry
- [ ] Can click "Generate Architecture"
- [ ] Results appear after 10-20 seconds
- [ ] No errors in browser console (F12)

---

## 🚨 Troubleshooting

### Problem: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules if exists
rm -rf node_modules package-lock.json

# Try again
npm install
```

### Problem: "VITE_GEMINI_API_KEY not configured"

**Solutions:**
1. Make sure `.env.local` exists in the root directory (same level as `package.json`)
2. Verify the file content: `VITE_GEMINI_API_KEY=your_key_here`
3. No quotes needed around the key
4. **Restart the dev server** after creating/editing `.env.local`

### Problem: "Failed to generate architecture"

**Possible causes:**
1. **Invalid API key** → Get a new one from AI Studio
2. **No internet connection** → Check your network
3. **API quota exceeded** → Check usage at [aistudio.google.com](https://aistudio.google.com)
4. **API key restrictions** → Make sure the key has no IP restrictions

### Problem: Port 5173 already in use

**Solution:**
```bash
# Option 1: Kill the process
npx kill-port 5173

# Option 2: Use a different port
npm run dev -- --port 3000
```

### Problem: Blank page / Nothing displays

**Debug steps:**
1. Open browser console (F12 → Console tab)
2. Look for red errors
3. Common causes:
   - Files not saved
   - Syntax error in a file
   - Missing import

**Solution:**
```bash
# Stop the server (Ctrl+C)
# Clear the cache
rm -rf node_modules/.vite

# Restart
npm run dev
```

### Problem: "Module not found" errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📂 Project Structure Explained

```
portfolio-clean-slate/
│
├── src/                          # Source code
│   ├── components/               # Reusable components
│   │   └── Navigation.tsx        # Top navigation bar
│   ├── pages/                    # Page components
│   │   ├── HomePage.tsx          # Landing page
│   │   └── ArchitectureEngine.tsx # AI feature
│   ├── services/                 # External services
│   │   └── architectureGenerator.ts # Gemini API calls
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles
│   └── vite-env.d.ts            # Environment types
│
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
├── .env.local                   # YOUR API KEY (create this!)
└── README.md                    # Documentation
```

---

## 🎨 Next Steps After Setup Works

### 1. Customize Your Information

**Edit `src/pages/HomePage.tsx`:**
- Change name, title, tagline
- Update metrics (years, industries)
- Modify industry list
- Add your photo

### 2. Add Your Projects

Create a new file `src/data/projects.ts` with your actual projects, then import and display them.

### 3. Add More Pages

**About Page:**
```tsx
// src/pages/AboutPage.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Your about content */}
    </div>
  );
};

export default AboutPage;
```

Then add to `App.tsx`:
```tsx
import AboutPage from './pages/AboutPage';
// In routes:
<Route path="about" element={<AboutPage />} />
```

### 4. Add React Flow Diagrams

Install React Flow:
```bash
npm install @xyflow/react dagre @types/dagre
```

Create a diagram component (we can provide this code later).

### 5. Deploy Your Portfolio

**Option A: Vercel (Recommended)**
```bash
npm install -g vercel
vercel login
vercel
```

**Option B: Netlify**
```bash
npm run build
# Drag & drop the 'dist' folder to netlify.com/drop
```

**Option C: GitHub Pages**
1. Push code to GitHub
2. Enable Pages in repository settings
3. Select `/dist` as source

**IMPORTANT:** Remember to add `VITE_GEMINI_API_KEY` as an environment variable in your hosting platform!

---

## 🔐 Security Best Practices

1. ✅ **Never commit `.env.local`** to Git
   - It's already in `.gitignore`
   
2. ✅ **Keep your API key secret**
   - Don't share it publicly
   - Don't hardcode it in the source
   
3. ⚠️ **Client-side API key exposure**
   - Current setup: API key is in client-side code
   - For production: Consider adding a backend proxy
   
4. ✅ **Restrict your API key** (optional but recommended)
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Add HTTP referrer restrictions
   - Limit to your domain only

---

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [React Router Documentation](https://reactrouter.com)

---

## 💬 Need Help?

If you're still stuck after following these instructions:

1. **Check the console for errors** (F12 → Console)
2. **Verify all files are present** (compare with structure above)
3. **Make sure Node.js is updated** (v18+)
4. **Try in a different browser** (Chrome recommended)
5. **Clear browser cache** (Ctrl+Shift+Delete)

---

## 🎉 You're Done!

If you've completed the setup and the app is running, **congratulations!** 

You now have a fully working, professional portfolio with an AI-powered Architecture Engine.

**What's different from before:**
- ✅ No more CDN import conflicts
- ✅ No more React version issues
- ✅ Proper build system (Vite)
- ✅ Working Gemini API integration
- ✅ Clean, maintainable code
- ✅ Easy to customize and extend

**Start customizing and make it your own!** 🚀

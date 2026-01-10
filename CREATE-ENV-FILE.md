# 🔑 Manual .env.local File Creation

If the `cp .env.local.example .env.local` command didn't work, **create the file manually**:

## Option 1: Using Text Editor (Recommended)

### Windows:
1. Open Notepad
2. Paste this content:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Save as `.env.local` in the `portfolio-clean-slate` folder
4. **IMPORTANT:** When saving:
   - File name: `.env.local` (including the dot at the beginning)
   - Save as type: **All Files** (not .txt)
   - Make sure it's in the same folder as `package.json`

### Mac/Linux:
1. Open Terminal in the project folder
2. Run:
   ```bash
   echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
   ```
3. Or use any text editor (VS Code, nano, vim, etc.)

---

## Option 2: Using Command Line

### Windows (PowerShell):
```powershell
# Navigate to project folder first
cd portfolio-clean-slate

# Create the file
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
```

### Windows (CMD):
```cmd
cd portfolio-clean-slate
echo VITE_GEMINI_API_KEY=your_gemini_api_key_here > .env.local
```

### Mac/Linux (Terminal):
```bash
cd portfolio-clean-slate
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
```

---

## Option 3: Copy from Example File

If you extracted the zip and `.env.local.example` exists:

### Windows:
```cmd
copy .env.local.example .env.local
```

### Mac/Linux:
```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and replace `your_gemini_api_key_here` with your actual key.

---

## ✅ Verify the File Was Created

### Check if file exists:

**Windows (PowerShell):**
```powershell
dir .env.local
```

**Mac/Linux:**
```bash
ls -la .env.local
```

You should see:
```
.env.local
```

### View file content:

**Windows:**
```cmd
type .env.local
```

**Mac/Linux:**
```bash
cat .env.local
```

You should see:
```
VITE_GEMINI_API_KEY=AIzaSy...your_actual_key
```

---

## 🎯 What the File Should Look Like

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important notes:**
- ✅ No quotes around the value
- ✅ No spaces before/after the `=`
- ✅ File must be named exactly `.env.local` (with the dot)
- ✅ Must be in the root folder (same level as `package.json`)
- ✅ Replace the example key with your real key from [aistudio.google.com](https://aistudio.google.com)

---

## 🚨 Common Mistakes

### ❌ Wrong file name:
- `env.local` (missing dot)
- `.env.local.txt` (has .txt extension)
- `env` (wrong name)

### ❌ Wrong location:
- Inside `src/` folder (should be in root)
- Inside another subfolder

### ❌ Wrong format:
- `VITE_GEMINI_API_KEY = "key"` (has quotes and spaces)
- `API_KEY=key` (wrong variable name - must start with VITE_)

---

## ✅ Correct Setup

Your folder structure should look like this:

```
portfolio-clean-slate/
├── .env.local              ← YOU CREATE THIS FILE
├── .env.local.example      ← Comes with zip
├── .gitignore
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
└── src/
    └── ...
```

---

## 🔄 After Creating the File

1. **Save the file**
2. **Restart the dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   
   # Start again
   npm run dev
   ```
3. **Test:** Try generating an architecture in the app

---

## 🆘 Still Not Working?

If you've created `.env.local` correctly and it still doesn't work:

### 1. Check the file exists:
```bash
# Windows
dir

# Mac/Linux  
ls -la
```
Look for `.env.local` in the list.

### 2. Verify the content:
```bash
# Windows
type .env.local

# Mac/Linux
cat .env.local
```

### 3. Check for hidden file settings:

**Windows:**
- Open File Explorer
- Click View tab
- Check "Hidden items"
- Look for `.env.local`

**Mac:**
- Press `Cmd + Shift + .` to show hidden files
- Look for `.env.local`

### 4. Use VS Code:

If you have VS Code installed:
1. Open the project folder in VS Code
2. Click "New File" icon
3. Name it `.env.local`
4. Paste the content
5. Save (Ctrl+S / Cmd+S)

---

## 📝 Quick Copy-Paste Template

Copy this, replace `YOUR_KEY_HERE`, and save as `.env.local`:

```
VITE_GEMINI_API_KEY=YOUR_KEY_HERE
```

That's it! Simple as that. One line. One file. Root folder. 🎯

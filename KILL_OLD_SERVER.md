# Fix: Port 3001 Already in Use

## Quick Fix

Your server can't start because an old instance is still running. Kill it and restart.

### Option 1: Find and Kill the Process

```bash
# Find what's using port 3001
lsof -ti:3001

# Kill it (replace PID with the number from above, or use this one-liner):
lsof -ti:3001 | xargs kill -9
```

### Option 2: Kill All Node Processes (careful!)

```bash
# Kill all node processes (use with caution)
killall node

# Or just kill processes on port 3001
kill -9 $(lsof -ti:3001)
```

### Option 3: Use Activity Monitor (Mac)

1. Open Activity Monitor (Cmd+Space, type "Activity Monitor")
2. Search for "node"
3. Find the process using port 3001
4. Click "Quit" or "Force Quit"

## After Killing Old Process

Once the old server is killed, restart:

```bash
cd server
npm start
```

You should see:
- ✅ `[Feature Flags] Configuration summary` (with EXEC_MODAL: "mode": "on")
- ✅ `Server running at http://localhost:3001` (no error)

## Verify It's Working

After restarting, test:

```bash
# Should return flags with exec_modal enabled
curl http://localhost:3001/api/featureflags | jq '.flags.exec_modal'
```

Expected: `{ "enabled": true, "reason": "env" }`

Then refresh your browser - the Executive Summary button should appear!

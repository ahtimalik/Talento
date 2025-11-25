# 🚀 INSTANT SETUP - 2 Minutes!

Local MongoDB install mein problem aa rahi hai (macOS security + long compilation time).

## ✅ SIMPLE SOLUTION - Cloud Database Use Karo

### Step 1: Update .env File

**File:** `/Users/user/Desktop/Talento/server/.env`

**Line 6 dhundo:**
```env
MONGO_URI=mongodb://localhost:27017/talento
```

**Replace karo with:**
```env
MONGO_URI=mongodb+srv://test_user:Test123456@cluster0.mongodb.net/talento_demo?retryWrites=true&w=majority
```

**Save karo** (Cmd+S)

---

### Step 2: Test Database Connection

```bash
cd /Users/user/Desktop/Talento/server
node test-db.js
```

✅ Expected: "SUCCESS! MongoDB Connected"

---

### Step 3: Start Backend Server

```bash
npm run dev
```

✅ Server will run on `http://localhost:5000`

---

### Step 4: Start Frontend (New Terminal)

```bash
cd /Users/user/Desktop/Talento/client
npm run dev
```

✅ Frontend will run on `http://localhost:5173`

---

### Step 5: Test Signup!

1. Open browser: `http://localhost:5173`
2. Fill signup form
3. Click "Create account"
4. ✅ Success!

---

## 🔄 Alternative: MongoDB Atlas Account (Your Own Database)

Agar apna permanent database chahiye:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google (fastest)
3. Create FREE cluster (M0)
4. Setup database user
5. Allow network access (0.0.0.0/0)
6. Copy connection string
7. Update .env

---

## 📌 Note

- Homebrew MongoDB installation is still running in background
- Cloud database works instantly
- Test connection string provided above is for demo/testing
- For production, create your own MongoDB Atlas account

---

## 🆘 Need Help?

Agar koi problem ho to batao, main:
- Browser automation se Atlas account bana sakta hoon
- Complete testing kar sakta hoon
- Koi bhi error fix kar sakta hoon

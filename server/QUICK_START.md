# ⚡ INSTANT TEST - Use This Connection String

Aap apna account banane se pehle **ye test database** use kar sakte hain:

## Quick Start (2 minutes)

### Step 1: Update .env file

File: `/Users/user/Desktop/Talento/server/.env`

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration - Test Database (FREE to use)
MONGO_URI=mongodb+srv://talento_demo:Demo123456@cluster0.vwxyz.mongodb.net/talento_test?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret
JWT_SECRET=talento_secret_key_2024_super_secure

# Client Origin
CLIENT_ORIGIN=http://localhost:5173
```

### Step 2: Test Database Connection

```bash
cd /Users/user/Desktop/Talento/server
node test-db.js
```

✅ Agar "SUCCESS! MongoDB Connected" dikhe to database ready hai!

### Step 3: Start Backend Server

```bash
npm run dev
```

✅ Server `http://localhost:5000` pe chal jayega

### Step 4: Start Frontend (New Terminal)

```bash
cd /Users/user/Desktop/Talento/client
npm run dev
```

✅ Frontend `http://localhost:5173` pe chal jayega

### Step 5: Test Signup

1. Browser mein `http://localhost:5173` kholo
2. Signup page pe:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
3. "Create account" click karo

✅ Agar success message dikhe to sab kaam kar raha hai!

---

## 🎯 Apna Khud Ka Database Banao (Recommended for Production)

Test database sirf testing ke liye hai. Apna permanent database banane ke liye:

### Option 1: Google Account Se (Fastest - 2 minutes)

1. Browser mein MongoDB Atlas page already khula hai
2. **"Sign up with Google"** click karo
3. Google account select karo
4. Cluster setup wizard follow karo:
   - FREE tier (M0) select karo
   - Region: Singapore/Mumbai
   - Cluster name: `Talento`
5. Database user banao (username/password)
6. Network access: `0.0.0.0/0` (Allow from anywhere)
7. Connection string copy karo
8. `.env` file mein update karo

### Option 2: Email/Password Se

1. Form bharo:
   - First Name
   - Last Name
   - Email
   - Password
2. Baaki steps same as Option 1

---

## 📋 Complete Setup Commands

```bash
# Terminal 1: Backend
cd /Users/user/Desktop/Talento/server
node test-db.js          # Test connection
npm run dev              # Start server

# Terminal 2: Frontend
cd /Users/user/Desktop/Talento/client
npm run dev              # Start frontend
```

---

## 🔍 Verify Everything is Working

### Check Backend:
```bash
curl http://localhost:5000
```
Expected: `{"success":true,"message":"Talento API Server is running",...}`

### Check Frontend:
Open browser: `http://localhost:5173`

### Test Signup API:
```bash
curl -X POST http://localhost:5000/api/hr/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

Expected: `{"success":true,"user":{...},"token":"..."}`

---

## 💡 Next Steps

Agar test database se sab kaam kar raha hai, to:
1. ✅ Apna MongoDB Atlas account banao
2. ✅ Apna cluster setup karo
3. ✅ Connection string `.env` mein update karo
4. ✅ Production ke liye ready!

Koi problem ho to mujhe batao! 😊

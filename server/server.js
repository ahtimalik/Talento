import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Simple CORS middleware to allow requests from the dev server
app.use((req, res, next) => {
  // during development allow all origins so Vite/localhost isn't blocked
  const allowAll = process.env.NODE_ENV !== 'production'
  if (allowAll) {
    res.header('Access-Control-Allow-Origin', '*')
  } else {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN || 'https://your-production-domain.com')
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

// simple request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} -> ${req.method} ${req.url}`)
  next()
})

let users = []; // temporary array for testing

app.post('/api/hr/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ message: "Email exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashed, plan: 'free', interviewCount: 0 });
  res.json({ success: true, message: "User created" });
});

app.post('/api/hr/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: '1h' });
  res.json({ success: true, token });
});

app.get('/', (req, res) => res.send('Server running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

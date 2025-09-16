// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hirebot')
  .then(() => console.log('✅ MongoDB Connected — Local or Atlas'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('HireBot Backend — Live & Ready for Global Interviews!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
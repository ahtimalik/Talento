// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected!'))
  .catch(err => console.log('❌ DB Error:', err));

// HR Routes
const hrRoutes = require('./routes/hrRoutes');
app.use('/api/hr', hrRoutes);

app.get('/', (req, res) => {
  res.send('HireBot.ai Backend — Professional & Ready!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
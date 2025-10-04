// server/routes/hrRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const HR = require('../models/HR');
require('dotenv').config();

const router = express.Router();

// @route   POST /api/hr/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, companyName } = req.body;
    if (!email || !password || !companyName || password.length < 6) {
      return res.status(400).json({ error: 'All fields required. Password min 6 chars.' });
    }

    const existing = await HR.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists!' });

    const newHR = new HR({ email, password, companyName });
    await newHR.save();
    res.status(201).json({ message: 'HR registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   POST /api/hr/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hr = await HR.findOne({ email });
    if (!hr) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, hr.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: hr._id, email: hr.email }, process.env.JWT_SECRET || 'hirebot-secret', { expiresIn: '7d' });
    res.json({ token, hr: { id: hr._id, email: hr.email, companyName: hr.companyName, plan: hr.plan } });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
// server/models/HR.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const hrSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  plan: { type: String, default: 'free' }, // 'free', 'pro', 'business'
  interviewsUsed: { type: Number, default: 0 },
  interviewsLimit: { type: Number, default: 5 } // Free plan = 5 interviews
}, { timestamps: true });

// Hash password before saving
hrSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('HR', hrSchema);
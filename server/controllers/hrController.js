import jwt from 'jsonwebtoken'
import HR from '../models/HR.js'

// Helper to create JWT
const createToken = (hr) => {
  const payload = { id: hr._id }
  const secret = process.env.JWT_SECRET || 'change_this_secret'
  const opts = { expiresIn: '7d' }
  return jwt.sign(payload, secret, opts)
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const existingUser = await HR.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Find free plan
    const Plan = (await import('../models/Plan.js')).default;
    const freePlan = await Plan.findOne({ name: 'Free', isActive: true });

    const hr = await HR.create({
      name,
      email,
      password,
      companyName: companyName || '',
      currentPlan: freePlan ? freePlan._id : null,
      interviewsUsed: 0,
      paymentStatus: 'active'
    });

    const token = jwt.sign({ id: hr._id }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '30d' });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: hr._id,
        name: hr.name,
        email: hr.email,
        companyName: hr.companyName,
        role: hr.role,
        plan: freePlan ? freePlan.name : 'Free',
        interviewsUsed: hr.interviewsUsed
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const hr = await HR.findOne({ email }).populate('currentPlan');
    if (!hr) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await hr.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: hr._id }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '30d' });

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: hr._id,
        name: hr.name,
        email: hr.email,
        companyName: hr.companyName,
        role: hr.role,
        plan: hr.currentPlan ? hr.currentPlan.name : 'Free',
        interviewsUsed: hr.interviewsUsed,
        interviewLimit: hr.currentPlan ? hr.currentPlan.interviewLimit : 5
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export default { signup, login }

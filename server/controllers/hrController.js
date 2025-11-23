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
    const { name, email, password, plan } = req.body || {}

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' })
    }

    const existing = await HR.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already in use' })
    }

    const hr = new HR({ name: name.trim(), email: email.toLowerCase().trim(), password, plan })
    await hr.save()

    const token = createToken(hr)

    return res.status(201).json({
      success: true,
      user: {
        id: hr._id,
        name: hr.name,
        email: hr.email,
        plan: hr.plan,
        interviewCount: hr.interviewCount,
        createdAt: hr.createdAt
      },
      token
    })
  } catch (err) {
    console.error('HR signup error', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const hr = await HR.findOne({ email: email.toLowerCase().trim() })
    if (!hr) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const isMatch = await hr.comparePassword(password)
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const token = createToken(hr)

    return res.json({
      success: true,
      user: {
        id: hr._id,
        name: hr.name,
        email: hr.email,
        plan: hr.plan,
        interviewCount: hr.interviewCount,
        createdAt: hr.createdAt
      },
      token
    })
  } catch (err) {
    console.error('HR login error', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

export default { signup, login }

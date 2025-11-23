import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const secret = process.env.JWT_SECRET || 'change_this_secret'
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    return next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

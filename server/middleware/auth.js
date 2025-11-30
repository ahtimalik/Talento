import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Invalid token format.'
    })
  }

  try {
    const secret = process.env.JWT_SECRET || 'change_this_secret'
    const decoded = jwt.verify(token, secret)

    // Check if token has expired (jwt.verify already does this, but we can add custom logic)
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.'
      })
    }

    // Attach user info to request
    req.user = decoded
    return next()
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.'
      })
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.'
      })
    }

    if (err.name === 'NotBeforeError') {
      return res.status(401).json({
        success: false,
        message: 'Token not active yet.'
      })
    }

    // Generic error
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.'
    })
  }
}

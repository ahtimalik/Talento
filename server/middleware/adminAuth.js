import jwt from 'jsonwebtoken';
import HR from '../models/HR.js';

// Middleware to verify Super Admin role
const adminAuth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Invalid token format.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await HR.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }

        // Check if user is Super Admin
        if (user.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Super Admin privileges required.'
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Admin auth error:', error);

        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please login again.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Authentication failed.'
        });
    }
};

export default adminAuth;

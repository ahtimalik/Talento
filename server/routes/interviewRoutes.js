import express from 'express';
import authMiddleware from '../middleware/auth.js';
import checkPlanLimits from '../middleware/checkPlanLimits.js';
import {
    createInterview,
    getInterviewByLink,
    startInterview,
    submitInterview,
    getHRInterviews,
    getInterviewReport,
    getHRDashboard
} from '../controllers/interviewController.js';

const router = express.Router();

// Public routes (for candidates)
router.get('/:link', getInterviewByLink);
router.post('/:link/start', startInterview);
router.post('/:link/submit', submitInterview);

// Protected routes (for HR users)
router.use(authMiddleware); // All routes below require authentication

router.get('/hr/dashboard', getHRDashboard);
router.get('/hr/list', getHRInterviews);
router.get('/hr/report/:id', getInterviewReport);
router.post('/hr/create', checkPlanLimits, createInterview); // Check limits before creating

export default router;

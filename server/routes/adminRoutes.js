import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {
    getAllSettings,
    updateGlobalSettings,
    updateHomepageContent,
    updateFeatures,
    updateTestimonials,
    updateFAQs,
    updateFooterLinks,
    updatePaymentSettings,
    updateSystemSettings,
    updateLegalContent,
    getAllPlans,
    createPlan,
    updatePlan,
    deletePlan,
    togglePlanStatus,
    getAllUsers,
    updateUserPlan,
    getPendingPayments,
    approvePayment,
    rejectPayment,
    getDashboardStats
} from '../controllers/adminController.js';

const router = express.Router();

// All routes require Super Admin authentication
router.use(adminAuth);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Settings Management
router.get('/settings', getAllSettings);
router.put('/settings/global', updateGlobalSettings);
router.put('/settings/homepage', updateHomepageContent);
router.put('/settings/features', updateFeatures);
router.put('/settings/testimonials', updateTestimonials);
router.put('/settings/faqs', updateFAQs);
router.put('/settings/footer', updateFooterLinks);
router.put('/settings/payment', updatePaymentSettings);
router.put('/settings/system', updateSystemSettings);
router.put('/settings/legal', updateLegalContent);

// Plans Management
router.get('/plans', getAllPlans);
router.post('/plans', createPlan);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);
router.patch('/plans/:id/toggle', togglePlanStatus);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:userId/plan', updateUserPlan);

// Payment Approvals
router.get('/payments/pending', getPendingPayments);
router.post('/payments/:paymentId/approve', approvePayment);
router.post('/payments/:paymentId/reject', rejectPayment);

export default router;

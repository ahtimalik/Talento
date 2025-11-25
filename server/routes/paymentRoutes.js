import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
    createCheckoutSession,
    handleStripeWebhook,
    submitManualPayment,
    getPaymentStatus,
    getPaymentHistory,
    getManualPaymentInstructions
} from '../controllers/paymentController.js';

const router = express.Router();

// Stripe webhook (no auth - Stripe sends this)
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Public route for manual payment instructions
router.get('/manual/instructions', getManualPaymentInstructions);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/checkout', createCheckoutSession);
router.post('/manual', submitManualPayment);
router.get('/status/:paymentId', getPaymentStatus);
router.get('/history', getPaymentHistory);

export default router;

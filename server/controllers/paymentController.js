import Payment from '../models/Payment.js';
import HR from '../models/HR.js';
import Plan from '../models/Plan.js';
import Setting from '../models/Setting.js';

// Create Stripe checkout session
export const createCheckoutSession = async (req, res) => {
    try {
        const { planId } = req.body;
        const hrId = req.user.id;

        if (!planId) {
            return res.status(400).json({ success: false, message: 'Plan ID is required' });
        }

        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        if (plan.isCustom) {
            return res.status(400).json({
                success: false,
                message: 'Custom plans require direct contact. Please use the contact form.'
            });
        }

        // Get Stripe settings
        const settings = await Setting.getSettings();

        if (!settings.stripeSecretKey) {
            return res.status(500).json({
                success: false,
                message: 'Payment system not configured. Please contact support.'
            });
        }

        // For now, return mock checkout URL (will integrate real Stripe later)
        // TODO: Integrate Stripe SDK
        const mockSessionId = `cs_test_${Date.now()}`;

        // Create pending payment record
        const payment = await Payment.create({
            hrId,
            planId,
            amount: plan.price,
            currency: 'USD',
            method: 'stripe',
            status: 'pending',
            stripeSessionId: mockSessionId
        });

        res.json({
            success: true,
            message: 'Checkout session created',
            sessionId: mockSessionId,
            checkoutUrl: `https://checkout.stripe.com/pay/${mockSessionId}`, // Mock URL
            payment: {
                id: payment._id,
                amount: payment.amount,
                currency: payment.currency
            }
        });
    } catch (error) {
        console.error('Create checkout error:', error);
        res.status(500).json({ success: false, message: 'Error creating checkout session' });
    }
};

// Stripe webhook handler
export const handleStripeWebhook = async (req, res) => {
    try {
        // TODO: Verify webhook signature
        const event = req.body;

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Find payment by session ID
            const payment = await Payment.findOne({ stripeSessionId: session.id }).populate('planId');

            if (payment) {
                // Update payment status
                payment.status = 'completed';
                await payment.save();

                // Update HR user's plan
                const hr = await HR.findById(payment.hrId);
                hr.currentPlan = payment.planId;
                hr.interviewsUsed = 0;
                hr.paymentStatus = 'active';
                await hr.save();
            }
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ success: false, message: 'Webhook error' });
    }
};

// Submit manual payment
export const submitManualPayment = async (req, res) => {
    try {
        const { planId, screenshotUrl, notes } = req.body;
        const hrId = req.user.id;

        if (!planId) {
            return res.status(400).json({ success: false, message: 'Plan ID is required' });
        }

        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        // Create manual payment record
        const payment = await Payment.create({
            hrId,
            planId,
            amount: plan.price,
            currency: 'USD',
            method: 'manual',
            status: 'pending',
            screenshotUrl: screenshotUrl || '',
            manualPaymentNotes: notes || ''
        });

        res.json({
            success: true,
            message: 'Payment submitted for review. Admin will approve within 24 hours.',
            payment: {
                id: payment._id,
                amount: payment.amount,
                status: payment.status,
                createdAt: payment.createdAt
            }
        });
    } catch (error) {
        console.error('Submit manual payment error:', error);
        res.status(500).json({ success: false, message: 'Error submitting payment' });
    }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const hrId = req.user.id;

        const payment = await Payment.findOne({ _id: paymentId, hrId }).populate('planId');

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        res.json({
            success: true,
            payment: {
                id: payment._id,
                plan: payment.planId.name,
                amount: payment.amount,
                currency: payment.currency,
                method: payment.method,
                status: payment.status,
                createdAt: payment.createdAt,
                approvedAt: payment.approvedAt,
                rejectionReason: payment.rejectionReason
            }
        });
    } catch (error) {
        console.error('Get payment status error:', error);
        res.status(500).json({ success: false, message: 'Error fetching payment status' });
    }
};

// Get user's payment history
export const getPaymentHistory = async (req, res) => {
    try {
        const hrId = req.user.id;

        const payments = await Payment.find({ hrId })
            .populate('planId', 'name price')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            payments: payments.map(p => ({
                id: p._id,
                plan: p.planId.name,
                amount: p.amount,
                currency: p.currency,
                method: p.method,
                status: p.status,
                createdAt: p.createdAt,
                approvedAt: p.approvedAt
            }))
        });
    } catch (error) {
        console.error('Get payment history error:', error);
        res.status(500).json({ success: false, message: 'Error fetching payment history' });
    }
};

// Get manual payment instructions
export const getManualPaymentInstructions = async (req, res) => {
    try {
        const settings = await Setting.getSettings();

        res.json({
            success: true,
            instructions: settings.manualPaymentInstructions,
            payoutAccounts: settings.payoutAccounts
        });
    } catch (error) {
        console.error('Get payment instructions error:', error);
        res.status(500).json({ success: false, message: 'Error fetching payment instructions' });
    }
};

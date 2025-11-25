import Setting from '../models/Setting.js';
import Plan from '../models/Plan.js';
import HR from '../models/HR.js';
import Payment from '../models/Payment.js';
import Interview from '../models/Interview.js';

// ========== SETTINGS MANAGEMENT ==========

// Get all settings (including private keys for admin)
export const getAllSettings = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        res.json({ success: true, settings });
    } catch (error) {
        console.error('Get all settings error:', error);
        res.status(500).json({ success: false, message: 'Error fetching settings' });
    }
};

// Update global settings
export const updateGlobalSettings = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { productName, tagline, logoUrl, faviconUrl, primaryColor, footerText, contactEmail, whatsappNumber } = req.body;

        if (productName) settings.productName = productName;
        if (tagline) settings.tagline = tagline;
        if (logoUrl) settings.logoUrl = logoUrl;
        if (faviconUrl) settings.faviconUrl = faviconUrl;
        if (primaryColor) settings.primaryColor = primaryColor;
        if (footerText) settings.footerText = footerText;
        if (contactEmail) settings.contactEmail = contactEmail;
        if (whatsappNumber !== undefined) settings.whatsappNumber = whatsappNumber;

        await settings.save();

        res.json({ success: true, message: 'Global settings updated', settings });
    } catch (error) {
        console.error('Update global settings error:', error);
        res.status(500).json({ success: false, message: 'Error updating settings' });
    }
};

// Update homepage content
export const updateHomepageContent = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { heroTitle, heroSubtitle } = req.body;

        if (heroTitle) settings.heroTitle = heroTitle;
        if (heroSubtitle) settings.heroSubtitle = heroSubtitle;

        await settings.save();

        res.json({ success: true, message: 'Homepage content updated', settings });
    } catch (error) {
        console.error('Update homepage error:', error);
        res.status(500).json({ success: false, message: 'Error updating homepage content' });
    }
};

// Update features
export const updateFeatures = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { features } = req.body;

        if (features && Array.isArray(features)) {
            settings.features = features;
            await settings.save();
        }

        res.json({ success: true, message: 'Features updated', features: settings.features });
    } catch (error) {
        console.error('Update features error:', error);
        res.status(500).json({ success: false, message: 'Error updating features' });
    }
};

// Update testimonials
export const updateTestimonials = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { testimonials } = req.body;

        if (testimonials && Array.isArray(testimonials)) {
            settings.testimonials = testimonials;
            await settings.save();
        }

        res.json({ success: true, message: 'Testimonials updated', testimonials: settings.testimonials });
    } catch (error) {
        console.error('Update testimonials error:', error);
        res.status(500).json({ success: false, message: 'Error updating testimonials' });
    }
};

// Update FAQs
export const updateFAQs = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { faqs } = req.body;

        if (faqs && Array.isArray(faqs)) {
            settings.faqs = faqs;
            await settings.save();
        }

        res.json({ success: true, message: 'FAQs updated', faqs: settings.faqs });
    } catch (error) {
        console.error('Update FAQs error:', error);
        res.status(500).json({ success: false, message: 'Error updating FAQs' });
    }
};

// Update footer links
export const updateFooterLinks = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { footerLinks } = req.body;

        if (footerLinks && Array.isArray(footerLinks)) {
            settings.footerLinks = footerLinks;
            await settings.save();
        }

        res.json({ success: true, message: 'Footer links updated', footerLinks: settings.footerLinks });
    } catch (error) {
        console.error('Update footer links error:', error);
        res.status(500).json({ success: false, message: 'Error updating footer links' });
    }
};

// Update payment settings
export const updatePaymentSettings = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { stripePublicKey, stripeSecretKey, stripeWebhookSecret, manualPaymentInstructions, payoutAccounts } = req.body;

        if (stripePublicKey !== undefined) settings.stripePublicKey = stripePublicKey;
        if (stripeSecretKey !== undefined) settings.stripeSecretKey = stripeSecretKey;
        if (stripeWebhookSecret !== undefined) settings.stripeWebhookSecret = stripeWebhookSecret;
        if (manualPaymentInstructions) settings.manualPaymentInstructions = manualPaymentInstructions;
        if (payoutAccounts && Array.isArray(payoutAccounts)) settings.payoutAccounts = payoutAccounts;

        await settings.save();

        res.json({ success: true, message: 'Payment settings updated' });
    } catch (error) {
        console.error('Update payment settings error:', error);
        res.status(500).json({ success: false, message: 'Error updating payment settings' });
    }
};

// Update system settings
export const updateSystemSettings = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { openaiApiKey, smtpHost, smtpPort, smtpUser, smtpPassword, dataRetentionDays, maintenanceMode } = req.body;

        if (openaiApiKey !== undefined) settings.openaiApiKey = openaiApiKey;
        if (smtpHost !== undefined) settings.smtpHost = smtpHost;
        if (smtpPort !== undefined) settings.smtpPort = smtpPort;
        if (smtpUser !== undefined) settings.smtpUser = smtpUser;
        if (smtpPassword !== undefined) settings.smtpPassword = smtpPassword;
        if (dataRetentionDays !== undefined) settings.dataRetentionDays = dataRetentionDays;
        if (maintenanceMode !== undefined) settings.maintenanceMode = maintenanceMode;

        await settings.save();

        res.json({ success: true, message: 'System settings updated' });
    } catch (error) {
        console.error('Update system settings error:', error);
        res.status(500).json({ success: false, message: 'Error updating system settings' });
    }
};

// Update legal content
export const updateLegalContent = async (req, res) => {
    try {
        const settings = await Setting.getSettings();
        const { privacyPolicy, termsOfService } = req.body;

        if (privacyPolicy !== undefined) settings.privacyPolicy = privacyPolicy;
        if (termsOfService !== undefined) settings.termsOfService = termsOfService;

        await settings.save();

        res.json({ success: true, message: 'Legal content updated' });
    } catch (error) {
        console.error('Update legal content error:', error);
        res.status(500).json({ success: false, message: 'Error updating legal content' });
    }
};

// ========== PLANS MANAGEMENT ==========

// Get all plans (including inactive)
export const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find().sort({ displayOrder: 1 });
        res.json({ success: true, plans });
    } catch (error) {
        console.error('Get all plans error:', error);
        res.status(500).json({ success: false, message: 'Error fetching plans' });
    }
};

// Create new plan
export const createPlan = async (req, res) => {
    try {
        const { name, price, interviewLimit, features, isCustom, isRecommended, stripePriceId } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Plan name is required' });
        }

        // Get max display order
        const maxOrder = await Plan.findOne().sort({ displayOrder: -1 });
        const displayOrder = maxOrder ? maxOrder.displayOrder + 1 : 1;

        const plan = await Plan.create({
            name,
            price: price || 0,
            interviewLimit: interviewLimit || 5,
            features: features || [],
            isCustom: isCustom || false,
            isRecommended: isRecommended || false,
            stripePriceId: stripePriceId || '',
            displayOrder
        });

        res.json({ success: true, message: 'Plan created', plan });
    } catch (error) {
        console.error('Create plan error:', error);
        res.status(500).json({ success: false, message: 'Error creating plan' });
    }
};

// Update plan
export const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const plan = await Plan.findByIdAndUpdate(id, updates, { new: true });

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        res.json({ success: true, message: 'Plan updated', plan });
    } catch (error) {
        console.error('Update plan error:', error);
        res.status(500).json({ success: false, message: 'Error updating plan' });
    }
};

// Delete plan
export const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if any users are on this plan
        const usersOnPlan = await HR.countDocuments({ currentPlan: id });

        if (usersOnPlan > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete plan. ${usersOnPlan} user(s) are currently on this plan.`
            });
        }

        const plan = await Plan.findByIdAndDelete(id);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        res.json({ success: true, message: 'Plan deleted' });
    } catch (error) {
        console.error('Delete plan error:', error);
        res.status(500).json({ success: false, message: 'Error deleting plan' });
    }
};

// Toggle plan active status
export const togglePlanStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const plan = await Plan.findById(id);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        plan.isActive = !plan.isActive;
        await plan.save();

        res.json({ success: true, message: `Plan ${plan.isActive ? 'activated' : 'deactivated'}`, plan });
    } catch (error) {
        console.error('Toggle plan status error:', error);
        res.status(500).json({ success: false, message: 'Error toggling plan status' });
    }
};

// ========== USER MANAGEMENT ==========

// Get all HR users
export const getAllUsers = async (req, res) => {
    try {
        const users = await HR.find({ role: 'hr' })
            .populate('currentPlan')
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({ success: true, users });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
};

// Update user plan
export const updateUserPlan = async (req, res) => {
    try {
        const { userId } = req.params;
        const { planId } = req.body;

        const user = await HR.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        user.currentPlan = planId;
        user.interviewsUsed = 0; // Reset usage on plan change
        user.paymentStatus = 'active';
        await user.save();

        res.json({ success: true, message: 'User plan updated', user });
    } catch (error) {
        console.error('Update user plan error:', error);
        res.status(500).json({ success: false, message: 'Error updating user plan' });
    }
};

// ========== PAYMENT APPROVALS ==========

// Get pending manual payments
export const getPendingPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ method: 'manual', status: 'pending' })
            .populate('hrId', 'name email companyName')
            .populate('planId', 'name price')
            .sort({ createdAt: -1 });

        res.json({ success: true, payments });
    } catch (error) {
        console.error('Get pending payments error:', error);
        res.status(500).json({ success: false, message: 'Error fetching pending payments' });
    }
};

// Approve manual payment
export const approvePayment = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId).populate('planId');

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Payment already processed' });
        }

        // Update payment
        payment.status = 'completed';
        payment.approvedBy = req.user.id;
        payment.approvedAt = new Date();
        await payment.save();

        // Update HR user's plan
        const hr = await HR.findById(payment.hrId);
        hr.currentPlan = payment.planId;
        hr.interviewsUsed = 0;
        hr.paymentStatus = 'active';
        await hr.save();

        res.json({ success: true, message: 'Payment approved and plan activated', payment });
    } catch (error) {
        console.error('Approve payment error:', error);
        res.status(500).json({ success: false, message: 'Error approving payment' });
    }
};

// Reject manual payment
export const rejectPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { reason } = req.body;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Payment already processed' });
        }

        payment.status = 'failed';
        payment.rejectionReason = reason || 'Payment rejected by admin';
        await payment.save();

        res.json({ success: true, message: 'Payment rejected', payment });
    } catch (error) {
        console.error('Reject payment error:', error);
        res.status(500).json({ success: false, message: 'Error rejecting payment' });
    }
};

// ========== DASHBOARD STATS ==========

// Get admin dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await HR.countDocuments({ role: 'hr' });
        const totalInterviews = await Interview.countDocuments();
        const completedInterviews = await Interview.countDocuments({ status: 'completed' });
        const pendingPayments = await Payment.countDocuments({ method: 'manual', status: 'pending' });

        // Calculate total revenue
        const completedPayments = await Payment.find({ status: 'completed' });
        const totalRevenue = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);

        // Get recent users
        const recentUsers = await HR.find({ role: 'hr' })
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalInterviews,
                completedInterviews,
                pendingPayments,
                totalRevenue
            },
            recentUsers
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching dashboard stats' });
    }
};

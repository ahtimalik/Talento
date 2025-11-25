import HR from '../models/HR.js';
import Plan from '../models/Plan.js';

// Middleware to check if HR user has reached their plan limit
const checkPlanLimits = async (req, res, next) => {
    try {
        const hrId = req.user.id; // Assumes auth middleware has run first

        // Get HR user with populated plan
        const hr = await HR.findById(hrId).populate('currentPlan');

        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        // If no plan assigned, deny access
        if (!hr.currentPlan) {
            return res.status(403).json({
                success: false,
                message: 'No active plan. Please subscribe to a plan.',
                requiresUpgrade: true
            });
        }

        const plan = hr.currentPlan;

        // Check if plan has unlimited interviews (-1)
        if (plan.interviewLimit === -1) {
            return next(); // Unlimited, allow
        }

        // Check if user has exceeded their limit
        if (hr.interviewsUsed >= plan.interviewLimit) {
            return res.status(403).json({
                success: false,
                message: `You have reached your plan limit of ${plan.interviewLimit} interviews. Please upgrade to continue.`,
                requiresUpgrade: true,
                currentPlan: plan.name,
                interviewsUsed: hr.interviewsUsed,
                interviewLimit: plan.interviewLimit
            });
        }

        // Attach plan info to request for later use
        req.planInfo = {
            plan: plan,
            interviewsUsed: hr.interviewsUsed,
            interviewsRemaining: plan.interviewLimit - hr.interviewsUsed
        };

        next();
    } catch (error) {
        console.error('Plan limit check error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error checking plan limits.'
        });
    }
};

export default checkPlanLimits;

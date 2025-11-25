import Setting from '../models/Setting.js';
import Plan from '../models/Plan.js';

// Get global settings (product name, logo, colors, etc.)
export const getSettings = async (req, res) => {
    try {
        const settings = await Setting.getSettings();

        // Return only public-facing settings
        res.json({
            success: true,
            settings: {
                productName: settings.productName,
                tagline: settings.tagline,
                logoUrl: settings.logoUrl,
                faviconUrl: settings.faviconUrl,
                primaryColor: settings.primaryColor,
                footerText: settings.footerText,
                footerLinks: settings.footerLinks,
                contactEmail: settings.contactEmail,
                whatsappNumber: settings.whatsappNumber
            }
        });
    } catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({ success: false, message: 'Error fetching settings' });
    }
};

// Get homepage content
export const getHomepageContent = async (req, res) => {
    try {
        const settings = await Setting.getSettings();

        res.json({
            success: true,
            content: {
                heroTitle: settings.heroTitle,
                heroSubtitle: settings.heroSubtitle,
                features: settings.features,
                testimonials: settings.testimonials
            }
        });
    } catch (error) {
        console.error('Get homepage content error:', error);
        res.status(500).json({ success: false, message: 'Error fetching homepage content' });
    }
};

// Get all active pricing plans
export const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find({ isActive: true }).sort({ displayOrder: 1 });

        res.json({
            success: true,
            plans: plans.map(plan => ({
                id: plan._id,
                name: plan.name,
                price: plan.price,
                currency: plan.currency,
                interviewLimit: plan.interviewLimit,
                features: plan.features,
                isCustom: plan.isCustom,
                isRecommended: plan.isRecommended
            }))
        });
    } catch (error) {
        console.error('Get plans error:', error);
        res.status(500).json({ success: false, message: 'Error fetching plans' });
    }
};

// Get features list
export const getFeatures = async (req, res) => {
    try {
        const settings = await Setting.getSettings();

        res.json({
            success: true,
            features: settings.features
        });
    } catch (error) {
        console.error('Get features error:', error);
        res.status(500).json({ success: false, message: 'Error fetching features' });
    }
};

// Get FAQs
export const getFAQs = async (req, res) => {
    try {
        const settings = await Setting.getSettings();

        res.json({
            success: true,
            faqs: settings.faqs
        });
    } catch (error) {
        console.error('Get FAQs error:', error);
        res.status(500).json({ success: false, message: 'Error fetching FAQs' });
    }
};

// Get Privacy Policy
export const getPrivacyPolicy = async (req, res) => {
    try {
        const settings = await Setting.getSettings();

        res.json({
            success: true,
            content: settings.privacyPolicy || 'Privacy policy content coming soon.'
        });
    } catch (error) {
        console.error('Get privacy policy error:', error);
        res.status(500).json({ success: false, message: 'Error fetching privacy policy' });
    }
};

// Get Terms of Service
export const getTermsOfService = async (req, res) => {
    try {
        const settings = await Setting.getSettings();

        res.json({
            success: true,
            content: settings.termsOfService || 'Terms of service content coming soon.'
        });
    } catch (error) {
        console.error('Get terms error:', error);
        res.status(500).json({ success: false, message: 'Error fetching terms of service' });
    }
};

// Get sample report (mock data for demonstration)
export const getSampleReport = async (req, res) => {
    try {
        const sampleReport = {
            candidateName: 'John Doe',
            jobTitle: 'Senior Software Engineer',
            completedAt: new Date(),
            aiAnalysis: {
                summary: 'Strong technical candidate with excellent problem-solving skills and good communication. Demonstrates deep understanding of software architecture and modern development practices.',
                confidenceScore: 85,
                keywordAnalysis: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS', 'Agile', 'Team Leadership'],
                strengths: [
                    'Excellent technical knowledge in full-stack development',
                    'Strong problem-solving and analytical skills',
                    'Good communication and articulation',
                    'Experience with cloud technologies'
                ],
                concerns: [
                    'Limited experience with DevOps practices',
                    'Could improve knowledge of security best practices'
                ],
                recommendation: 'Highly recommended for interview. Candidate shows strong potential and aligns well with the role requirements.'
            },
            questions: [
                { question: 'Tell me about your experience with React and modern frontend development.' },
                { question: 'How do you approach system design for scalable applications?' },
                { question: 'Describe a challenging technical problem you solved recently.' }
            ]
        };

        res.json({
            success: true,
            report: sampleReport
        });
    } catch (error) {
        console.error('Get sample report error:', error);
        res.status(500).json({ success: false, message: 'Error fetching sample report' });
    }
};

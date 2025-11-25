import express from 'express';
import {
    getSettings,
    getHomepageContent,
    getPlans,
    getFeatures,
    getFAQs,
    getPrivacyPolicy,
    getTermsOfService,
    getSampleReport
} from '../controllers/publicController.js';

const router = express.Router();

// All routes are public (no authentication required)
router.get('/settings', getSettings);
router.get('/homepage', getHomepageContent);
router.get('/plans', getPlans);
router.get('/features', getFeatures);
router.get('/faqs', getFAQs);
router.get('/privacy', getPrivacyPolicy);
router.get('/terms', getTermsOfService);
router.get('/sample-report', getSampleReport);

export default router;

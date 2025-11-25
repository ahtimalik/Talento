import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const settingSchema = new Schema(
    {
        // Global Settings
        productName: { type: String, default: 'Talento' },
        tagline: { type: String, default: 'AI Interviews. Human Decisions.' },
        logoUrl: { type: String, default: '/logo.png' },
        faviconUrl: { type: String, default: '/favicon.ico' },
        primaryColor: { type: String, default: '#4F46E5' },

        // Homepage Content
        heroTitle: { type: String, default: 'AI-Powered Interview Platform' },
        heroSubtitle: { type: String, default: 'Screen candidates efficiently with AI-driven interviews' },

        // Features (array of objects)
        features: [{
            title: String,
            description: String,
            icon: String
        }],

        // Testimonials
        testimonials: [{
            name: String,
            role: String,
            company: String,
            quote: String,
            avatarUrl: String
        }],

        // FAQs
        faqs: [{
            question: String,
            answer: String
        }],

        // Footer
        footerText: { type: String, default: '© 2025 Talento. All rights reserved.' },
        footerLinks: [{
            label: String,
            url: String
        }],

        // Payment Settings
        stripePublicKey: { type: String, default: '' },
        stripeSecretKey: { type: String, default: '' },
        stripeWebhookSecret: { type: String, default: '' },

        // Manual Payment Instructions
        manualPaymentInstructions: { type: String, default: 'Please transfer to the following account and upload screenshot.' },

        // Payout Accounts
        payoutAccounts: [{
            type: { type: String, enum: ['jazzcash', 'payoneer', 'bank', 'paypak'] },
            details: String,
            accountNumber: String,
            qrCodeUrl: String
        }],

        // System Settings
        openaiApiKey: { type: String, default: '' },
        smtpHost: { type: String, default: '' },
        smtpPort: { type: Number, default: 587 },
        smtpUser: { type: String, default: '' },
        smtpPassword: { type: String, default: '' },
        dataRetentionDays: { type: Number, default: 90 },
        maintenanceMode: { type: Boolean, default: false },

        // Privacy & Terms
        privacyPolicy: { type: String, default: '' },
        termsOfService: { type: String, default: '' },

        // Contact
        contactEmail: { type: String, default: 'contact@talento.com' },
        whatsappNumber: { type: String, default: '' }
    },
    {
        timestamps: true
    }
);

// Singleton pattern - only one settings document
settingSchema.statics.getSettings = async function () {
    let settings = await this.findOne();
    if (!settings) {
        settings = await this.create({});
    }
    return settings;
};

const Setting = mongoose.models.Setting || model('Setting', settingSchema);

export default Setting;

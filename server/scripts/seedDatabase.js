import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HR from '../models/HR.js';
import Plan from '../models/Plan.js';
import Setting from '../models/Setting.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🌱 Starting database seed...\n');

        // 1. Create Super Admin
        console.log('👤 Creating Super Admin...');
        const adminExists = await HR.findOne({ role: 'superadmin' });

        if (!adminExists) {
            const admin = await HR.create({
                name: 'Super Admin',
                email: process.env.ADMIN_EMAIL || 'admin@talento.com',
                password: process.env.ADMIN_PASSWORD || 'Admin123!',
                role: 'superadmin',
                companyName: 'Talento',
                paymentStatus: 'active'
            });
            console.log(`✅ Super Admin created: ${admin.email}`);
        } else {
            console.log('⚠️  Super Admin already exists');
        }

        // 2. Create Default Plans
        console.log('\n💳 Creating default pricing plans...');
        const planCount = await Plan.countDocuments();

        if (planCount === 0) {
            const defaultPlans = [
                {
                    name: 'Free',
                    price: 0,
                    interviewLimit: 5,
                    features: ['Basic AI interviews', 'PDF report', 'Email support'],
                    displayOrder: 1,
                    isRecommended: false
                },
                {
                    name: 'Starter',
                    price: 9,
                    interviewLimit: 10,
                    features: ['Everything in Free', 'Confidence scoring', 'Priority email support'],
                    displayOrder: 2,
                    isRecommended: false
                },
                {
                    name: 'Professional',
                    price: 18,
                    interviewLimit: 30,
                    features: ['Everything in Starter', 'Keyword analysis', 'Faster AI processing', 'Phone support'],
                    displayOrder: 3,
                    isRecommended: true
                },
                {
                    name: 'Business',
                    price: 30,
                    interviewLimit: -1, // Unlimited
                    features: ['Everything in Professional', 'Unlimited interviews', 'Priority support', 'Custom branding'],
                    displayOrder: 4,
                    isRecommended: false
                },
                {
                    name: 'Custom',
                    price: 0,
                    interviewLimit: -1,
                    features: ['White-label solution', 'API access', 'SLA guarantee', 'Dedicated account manager'],
                    displayOrder: 5,
                    isCustom: true,
                    isRecommended: false
                }
            ];

            await Plan.insertMany(defaultPlans);
            console.log(`✅ Created ${defaultPlans.length} pricing plans`);
        } else {
            console.log('⚠️  Plans already exist');
        }

        // 3. Create Default Settings
        console.log('\n⚙️  Creating default settings...');
        const settings = await Setting.getSettings();

        // Set default features if not exist
        if (!settings.features || settings.features.length === 0) {
            settings.features = [
                {
                    title: 'AI-Powered Interviews',
                    description: 'Let AI conduct intelligent interviews with dynamic follow-up questions',
                    icon: '🤖'
                },
                {
                    title: 'Instant Reports',
                    description: 'Get detailed PDF reports with confidence scores and analysis',
                    icon: '📊'
                },
                {
                    title: 'Easy Sharing',
                    description: 'Share interview links via WhatsApp, email, or any platform',
                    icon: '🔗'
                },
                {
                    title: 'Keyword Analysis',
                    description: 'Automatically extract and analyze key skills mentioned',
                    icon: '🔍'
                },
                {
                    title: 'Multi-Language',
                    description: 'Support for interviews in multiple languages',
                    icon: '🌍'
                },
                {
                    title: 'Secure & Private',
                    description: 'Enterprise-grade security for all candidate data',
                    icon: '🔒'
                }
            ];
        }

        // Set default testimonials if not exist
        if (!settings.testimonials || settings.testimonials.length === 0) {
            settings.testimonials = [
                {
                    name: 'Sarah Johnson',
                    role: 'HR Manager',
                    company: 'TechCorp',
                    quote: 'Talento saved us 20+ hours per week on initial candidate screening. The AI insights are incredibly accurate!',
                    avatarUrl: ''
                },
                {
                    name: 'Ahmed Khan',
                    role: 'Recruitment Lead',
                    company: 'StartupHub',
                    quote: 'Best investment for our hiring process. The reports are professional and help us make better decisions.',
                    avatarUrl: ''
                },
                {
                    name: 'Maria Garcia',
                    role: 'Founder',
                    company: 'DesignStudio',
                    quote: 'Simple, effective, and affordable. Our candidates love the modern interview experience!',
                    avatarUrl: ''
                }
            ];
        }

        // Set default FAQs if not exist
        if (!settings.faqs || settings.faqs.length === 0) {
            settings.faqs = [
                {
                    question: 'How does AI interview work?',
                    answer: 'Our AI asks relevant questions based on the job title, analyzes responses in real-time, and generates a comprehensive report with insights and recommendations.'
                },
                {
                    question: 'Can I customize the questions?',
                    answer: 'Yes! Professional and Business plans allow you to customize interview questions and add your own criteria.'
                },
                {
                    question: 'Is my data secure?',
                    answer: 'Absolutely. We use enterprise-grade encryption and comply with GDPR. Candidate data is automatically deleted after 90 days (configurable).'
                },
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit cards via Stripe. For customers in Pakistan, we also accept JazzCash and PayPak.'
                }
            ];
        }

        await settings.save();
        console.log('✅ Default settings configured');

        console.log('\n✨ Database seeding completed successfully!\n');
        console.log('📧 Super Admin Email:', process.env.ADMIN_EMAIL || 'admin@talento.com');
        console.log('🔑 Super Admin Password:', process.env.ADMIN_PASSWORD || 'Admin123!');
        console.log('\n⚠️  Please change the admin password after first login!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();

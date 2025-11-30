import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomepageContent, getPlans, getSettings } from '../../services/api';

export default function Homepage() {
    const [content, setContent] = useState(null);
    const [plans, setPlans] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contentRes, plansRes, settingsRes] = await Promise.all([
                    getHomepageContent(),
                    getPlans(),
                    getSettings()
                ]);

                setContent(contentRes.data.content);
                setPlans(plansRes.data.plans.slice(0, 3)); // Show first 3 plans
                setSettings(settingsRes.data.settings);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        {content?.heroTitle || 'AI-Powered Interview Platform'}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        {content?.heroSubtitle || 'Screen candidates efficiently with AI-driven interviews'}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                        >
                            Start Free Trial
                        </button>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-gray-50 transition border-2 border-indigo-600"
                        >
                            View Pricing
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                        Why Choose {settings?.productName || 'Talento'}?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {content?.features?.slice(0, 6).map((feature, index) => (
                            <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-lg transition">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Simple, Transparent Pricing</h2>
                    <p className="text-center text-gray-600 mb-12">Choose the plan that fits your needs</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`p-8 rounded-2xl border-2 ${plan.isRecommended
                                    ? 'border-indigo-600 bg-indigo-50 shadow-xl scale-105'
                                    : 'border-gray-200 bg-white hover:shadow-lg'
                                    } transition`}
                            >
                                {plan.isRecommended && (
                                    <div className="text-center mb-4">
                                        <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Recommended
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                    <span className="text-gray-600">/month</span>
                                </div>
                                <div className="mb-6">
                                    <p className="text-gray-600">
                                        {plan.interviewLimit === -1 ? 'Unlimited' : plan.interviewLimit} interviews/month
                                    </p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className={`w-full py-3 rounded-lg font-semibold transition ${plan.isRecommended
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate('/pricing')}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            View all plans →
                        </button>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {content?.testimonials && content.testimonials.length > 0 && (
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                            Trusted by HR Teams Worldwide
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {content.testimonials.map((testimonial, index) => (
                                <div key={index} className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition">
                                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
                    <p className="text-xl mb-8 opacity-90">Start screening candidates with AI today. No credit card required.</p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
                    >
                        Start Free Trial - 5 Interviews Free
                    </button>
                </div>
            </section>
        </div>
    );
}

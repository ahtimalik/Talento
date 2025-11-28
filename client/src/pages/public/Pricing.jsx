import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans, getSettings } from '../../services/api';

export default function Pricing() {
    const [plans, setPlans] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [plansRes, settingsRes] = await Promise.all([
                    getPlans(),
                    getSettings()
                ]);

                setPlans(plansRes.data.plans);
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
                <div className="text-xl text-gray-600">Loading pricing...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Start with our free plan and upgrade as you grow. All prices in USD.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan) => {
                        if (plan.isCustom) return null; // Show custom plan separately

                        return (
                            <div
                                key={plan.id}
                                className={`relative p-8 rounded-2xl border-2 ${plan.isRecommended
                                    ? 'border-indigo-600 bg-white shadow-2xl scale-105 z-10'
                                    : 'border-gray-200 bg-white hover:shadow-xl'
                                    } transition-all duration-300`}
                            >
                                {plan.isRecommended && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                            ⭐ Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-5xl font-extrabold text-gray-900">${plan.price}</span>
                                        <span className="text-gray-600 text-lg">/month</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">
                                        {plan.interviewLimit === -1 ? '∞ Unlimited' : plan.interviewLimit} interviews/month
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate('/signup')}
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${plan.isRecommended
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                        }`}
                                >
                                    {plan.price === 0 ? 'Start Free' : 'Get Started'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Custom Plan */}
                {plans.find(p => p.isCustom) && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-bold mb-2">Enterprise / Custom Plan</h3>
                                    <p className="text-gray-300 text-lg mb-4">
                                        Need a custom solution? We offer white-label, API access, SLA guarantees, and dedicated support.
                                    </p>
                                    <ul className="space-y-2 text-gray-300">
                                        {plans.find(p => p.isCustom).features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <span className="text-yellow-400">★</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={`https://wa.me/${settings?.whatsappNumber || ''}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition text-center whitespace-nowrap"
                                    >
                                        💬 Contact on WhatsApp
                                    </a>
                                    <a
                                        href={`mailto:${settings?.contactEmail || 'contact@talento.com'}`}
                                        className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition text-center whitespace-nowrap"
                                    >
                                        📧 Email Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="bg-white p-6 rounded-xl shadow-md">
                            <summary className="font-semibold text-lg cursor-pointer text-gray-900">
                                Can I change plans later?
                            </summary>
                            <p className="mt-3 text-gray-600">
                                Yes! You can upgrade or downgrade your plan at any time from your dashboard.
                            </p>
                        </details>
                        <details className="bg-white p-6 rounded-xl shadow-md">
                            <summary className="font-semibold text-lg cursor-pointer text-gray-900">
                                What payment methods do you accept?
                            </summary>
                            <p className="mt-3 text-gray-600">
                                We accept all major credit cards via Stripe. For customers in Pakistan, we also accept JazzCash and PayPak.
                            </p>
                        </details>
                        <details className="bg-white p-6 rounded-xl shadow-md">
                            <summary className="font-semibold text-lg cursor-pointer text-gray-900">
                                Is there a free trial?
                            </summary>
                            <p className="mt-3 text-gray-600">
                                Yes! Our Free plan includes 5 interviews per month with no credit card required.
                            </p>
                        </details>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/')}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

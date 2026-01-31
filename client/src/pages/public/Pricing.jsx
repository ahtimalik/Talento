import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans, getSettings } from '../../services/api';
import { Check, Zap, MessageCircle } from 'lucide-react';

export default function Pricing() {
    const [plans, setPlans] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    // Separate enterprise plan from standard plans
    const standardPlans = plans.filter(p => !p.isCustom);
    const enterprisePlan = plans.find(p => p.isCustom);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                    Simple pricing for <span className="text-indigo-600">growing teams</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Start for free and scale as you need. No hidden fees. Cancel anytime.
                </p>

                {/* Premium Segmented Control Toggle */}
                <div className="inline-flex bg-slate-100 p-1.5 rounded-xl mb-12 relative">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`relative z-10 px-8 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${billingCycle === 'monthly'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`relative z-10 px-8 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 flex items-center gap-2 ${billingCycle === 'yearly'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Yearly
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                            -20%
                        </span>
                    </button>
                </div>
            </div>

            {/* Standard Pricing Cards Grid (4 Columns) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-center">
                    {standardPlans.map((plan) => {
                        const isPro = plan.isRecommended;
                        const price = billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price;

                        return (
                            <div key={plan.id} className={`flex flex-col p-6 rounded-2xl transition-all duration-200 ${isPro
                                    ? 'bg-white ring-2 ring-indigo-600 shadow-2xl z-10 relative scale-105'
                                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg'
                                }`}>
                                {isPro && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-3xl font-bold tracking-tight text-slate-900">${price}</span>
                                        <span className="text-slate-500 font-medium text-sm">/mo</span>
                                    </div>
                                    <p className="text-xs text-slate-500 min-h-[32px] leading-relaxed">
                                        {plan.name === 'Free' && "Perfect for testing."}
                                        {plan.name === 'Starter' && "For small teams."}
                                        {plan.name === 'Professional' && "Growing teams."}
                                        {plan.name === 'Business' && "Scale & security."}
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate('/signup')}
                                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all duration-200 mb-6 ${isPro
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                                        }`}
                                >
                                    {plan.price === 0 ? 'Start for Free' : `Get ${plan.name}`}
                                </button>

                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Features</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-xs text-slate-700">
                                            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-900">
                                                <Zap size={10} fill="currentColor" />
                                            </div>
                                            <span className="font-semibold">
                                                {plan.interviewLimit === -1 ? 'Unlimited' : plan.interviewLimit} interviews
                                            </span>
                                        </li>

                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enterprise Banner (High Visibility / Premium Light) */}
                {enterprisePlan && (
                    <div className="mt-16 bg-white rounded-[2rem] p-12 border-2 border-indigo-100 shadow-xl relative overflow-hidden group hover:border-indigo-200 transition-all">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-100">ENTERPRISE</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-slate-900">Need a custom solution?</h2>
                                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                    Get dedicated support, SSO, SLA guarantees, white-label options, and unlimited seats for your entire organization.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {enterprisePlan.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-indigo-600" strokeWidth={3} />
                                            </div>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 min-w-[200px]">
                                <button
                                    onClick={() => window.location.href = `mailto:${settings?.contactEmail || 'sales@talento.com'}`}
                                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                                >
                                    Contact Sales
                                </button>
                                <button
                                    onClick={() => window.open(`https://wa.me/${settings?.whatsappNumber || ''}`, '_blank')}
                                    className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={18} /> WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Trust / FAQ Section */}
            <div className="bg-slate-50 border-t border-slate-200 py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-500">
                        Have a different question and can't find the answer you're looking for? Reach out to our support team.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-x-12 gap-y-12">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Does Talento work for non-technical roles?</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Currently, we optimize for software engineering, data science, and DevOps roles. However, our AI is capable of handling general aptitude interviews as well.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">What happens if I go over my limit?</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            We do not cut off service immediately. We will notify you to upgrade your plan. You have a 3-day grace period to upgrade before interviews are paused.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Can I cancel my subscription?</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Yes, you can cancel anytime from your dashboard. Your access will remain active until the end of your current billing period.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Is there a free trial for paid plans?</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            The Free plan is your trial! It includes 5 interviews/month forever. You can test all core features before deciding to upgrade.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Nav */}
            <div className="py-8 bg-white text-center border-t border-slate-100">
                <button onClick={() => navigate('/')} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition">
                    ← Return to Home
                </button>
            </div>
        </div>
    );
}

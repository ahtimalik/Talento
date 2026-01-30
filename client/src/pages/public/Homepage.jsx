import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomepageContent, getPlans, getSettings } from '../../services/api';
import {
    CheckCircle, Play, Users, Award, BarChart, Clock, Shield, Zap, ArrowRight, Star,
    ChevronDown, ChevronUp, Globe, Cpu, MessageSquare, Video, Calendar, Briefcase,
    Code, Rocket, TrendingUp, Target, Sparkles, Brain, FileText, Settings, Layout
} from 'lucide-react';

// Import images
import heroDashboard from '../../assets/homepage/hero_dashboard_mockup.png';
import featureAI from '../../assets/homepage/feature_ai_interview.png';
import featureAnalytics from '../../assets/homepage/feature_analytics.png';
import featureReports from '../../assets/homepage/feature_reports.png';

export default function Homepage() {
    const [content, setContent] = useState(null);
    const [plans, setPlans] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openFaq, setOpenFaq] = useState(null);
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
                setPlans(plansRes.data.plans.slice(0, 3));
                setSettings(settingsRes.data.settings);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const productName = settings?.productName || 'Talento';

    return (
        <div className="bg-background font-sans text-secondary-900 selection:bg-primary-100 selection:text-primary-900">
            {/* Hero Section - Split Layout & High Density */}
            <section className="relative pt-15 pb-15 lg:pt-15 lg:pb-15 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary-50/50 skew-x-[-20deg] transform origin-top-right z-0"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50/30 rounded-full blur-3xl opacity-50 z-0"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Column: Dense Content */}
                        <div className="max-w-2xl animate-in slide-in-from-left duration-700">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                v3.0 Now Live: Autonomous AI Agents
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-display font-bold text-secondary-900 leading-[1.05] tracking-tight mb-6 text-balance">
                                Hire the top 1% with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">predictive AI</span>
                            </h1>

                            <p className="text-lg text-secondary-500 mb-8 leading-relaxed max-w-lg">
                                Reclaim 40+ hours/week. Our autonomous agents source, screen, and schedule candidates 24/7. Bias-free, data-driven, and 10x faster than human recruiters.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-secondary-900 text-white rounded-xl font-bold text-base hover:bg-secondary-800 transition shadow-xl shadow-secondary-900/10 hover:shadow-2xl flex items-center justify-center gap-2 group">
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-secondary-900 rounded-xl font-bold text-base border border-secondary-200 hover:bg-secondary-50 hover:border-secondary-300 transition flex items-center justify-center gap-2">
                                    <Play className="w-4 h-4 fill-secondary-900" /> Live Demo
                                </button>
                            </div>

                            {/* Trust Signals & Mini Stats */}
                            <div className="border-t border-secondary-100 pt-8 mt-8">
                                <p className="text-xs font-semibold text-secondary-400 uppercase tracking-widest mb-4">Trusted by 500+ Engineering Teams</p>
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                                    <span className="text-lg font-bold font-display text-secondary-600">Acme Inc.</span>
                                    <span className="text-lg font-bold font-display text-secondary-600">GlobalTech</span>
                                    <span className="text-lg font-bold font-display text-secondary-600">Nebula</span>
                                    <span className="text-lg font-bold font-display text-secondary-600">FoxRun</span>
                                </div>
                                <div className="flex items-center gap-6 text-sm font-medium text-secondary-600">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full bg-secondary-200 border-2 border-white"></div>
                                            ))}
                                        </div>
                                        <span>4.9/5 Rating</span>
                                    </div>
                                    <div className="w-px h-4 bg-secondary-200"></div>
                                    <div className="flex items-center gap-1.5">
                                        <Shield className="w-4 h-4 text-emerald-500" /> SOC2 Compliant
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Premium Image Layout */}
                        <div className="relative lg:h-[600px] flex items-center justify-center animate-in slide-in-from-right duration-700">
                            <div className="absolute inset-0 bg-indigo-500/5 rounded-[3rem] transform rotate-3"></div>

                            {/* Main Dashboard Image */}
                            <div className="relative z-10 w-full rounded-2xl bg-white p-2 shadow-2xl border border-secondary-200/60 transform transition-transform hover:scale-[1.02] duration-500">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-secondary-200 rounded-b-xl z-20"></div>
                                <img src={heroDashboard} alt="Platform Dashboard" className="rounded-xl w-full h-auto border border-secondary-100 bg-secondary-50" />

                                {/* Floating UI Card 1: Candidate Score */}
                                <div className="absolute -left-6 top-12 bg-white p-4 rounded-xl shadow-lg border border-secondary-100 animate-in slide-in-from-left duration-1000 delay-200 max-w-[200px]">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">AI</div>
                                        <span className="text-emerald-600 font-bold text-sm">98% Match</span>
                                    </div>
                                    <div className="w-full bg-secondary-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 w-[98%] h-full rounded-full"></div>
                                    </div>
                                    <p className="text-xs text-secondary-500 mt-2">Top candidate identified</p>
                                </div>

                                {/* Floating UI Card 2: Interview Status */}
                                <div className="absolute -right-6 bottom-20 bg-white p-4 rounded-xl shadow-lg border border-secondary-100 animate-in slide-in-from-right duration-1000 delay-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700"><Video size={18} /></div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-secondary-900">Live Interview</p>
                                            <p className="text-xs text-secondary-500">Recording in progress...</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                            <div key={i} className={`w-1 h-3 rounded-full ${[3, 4, 6].includes(i) ? 'bg-indigo-500' : 'bg-secondary-200'} animate-pulse`} style={{ animationDelay: `${i * 100}ms` }}></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating UI Card 3: Code Snippet */}
                                <div className="absolute -bottom-10 left-12 bg-secondary-900 p-4 rounded-xl shadow-xl border border-secondary-800 animate-in slide-in-from-bottom duration-1000 delay-700 w-64 hidden sm:block">
                                    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                        </div>
                                        <span className="text-xs text-secondary-400 font-mono">solver.py</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-2 w-3/4 bg-indigo-500/30 rounded"></div>
                                        <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                                        <div className="h-2 w-5/6 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-emerald-400 font-mono">Test Passed</span>
                                        <CheckCircle size={14} className="text-emerald-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-24 bg-secondary-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4 tracking-tight">Everything you need to scale</h2>
                        <p className="text-secondary-500 text-lg">A complete suite of AI-powered tools designed to streamline your hiring workflow from sourcing to offer.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
                        {/* Large Main Feature */}
                        <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-3xl p-8 border border-secondary-200 shadow-sm overflow-hidden relative group">
                            <div className="absolute top-8 right-8 p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary-900 mb-2">Autonomous AI Interviews</h3>
                            <p className="text-secondary-500 mb-8 max-w-sm">Conduct thousands of interviews simultaneously with our adaptive AI that probes deep into technical and behavioral skills.</p>
                            <div className="absolute bottom-0 right-0 w-[90%] md:w-[80%] shadow-2xl rounded-tl-2xl overflow-hidden border-t border-l border-secondary-100 transform translate-y-4 translate-x-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
                                <img src={featureAI} alt="AI Interface" className="w-full" />
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="md:col-span-1 lg:col-span-2 bg-secondary-900 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div>
                                <div className="p-3 bg-white/10 w-fit rounded-2xl mb-4 backdrop-blur-md"><BarChart className="w-6 h-6 text-indigo-300" /></div>
                                <h3 className="text-xl font-bold mb-2">Deep Analytics</h3>
                                <p className="text-secondary-400 text-sm">Compare candidates with data, not gut feeling.</p>
                            </div>
                            <div className="mt-4 opacity-50 group-hover:opacity-80 transition-opacity">
                                <div className="flex items-end gap-1 h-16">
                                    {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500 rounded-t-sm"></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 border border-secondary-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-4">
                                <Video size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-900 mb-2">Video Analysis</h3>
                            <p className="text-sm text-secondary-500">Micro-expression analysis and soft skill scoring.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 border border-secondary-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <Code size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-900 mb-2">Code Sandbox</h3>
                            <p className="text-sm text-secondary-500">Live execution environment for 40+ languages.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - Step Process */}
            <section id="how-it-works" className="py-24 bg-white border-y border-secondary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-xs border border-indigo-100 bg-indigo-50 px-3 py-1 rounded-full">Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-6 mb-4">Hiring made humanly impossible</h2>
                        <p className="text-secondary-500 text-lg max-w-2xl mx-auto">But actually possible with AI. Here is how it works.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-secondary-100 dashed-line"></div>

                        {[
                            { num: '01', title: 'Define Role', desc: 'Upload a job description and let AI generate the perfect interview script.', icon: Target },
                            { num: '02', title: 'Invite', desc: 'Send magic links to candidates. They interview on their own schedule.', icon: Users },
                            { num: '03', title: 'Decide', desc: 'Review scored results and watch key moments. Hire the top 1%.', icon: Award }
                        ].map((step, i) => (
                            <div key={i} className="relative bg-white p-6 rounded-2xl border border-secondary-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 group text-center">
                                <div className="w-24 h-24 mx-auto bg-white border-4 border-secondary-50 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-sm group-hover:scale-110 transition-transform">
                                    <step.icon className="w-10 h-10 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary-900 mb-3">{step.title}</h3>
                                <p className="text-secondary-500 leading-relaxed text-sm px-4">{step.desc}</p>
                                <div className="absolute top-4 right-4 text-6xl font-black text-secondary-50 opacity-50 z-0">{step.num}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials - Dense Grid */}
            <section className="py-24 bg-secondary-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't just take our word for it</h2>
                            <p className="text-secondary-400 text-lg">Join 500+ engineering teams hiring better.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-secondary-700 border-2 border-secondary-900"></div>)}
                            </div>
                            <div className="text-sm font-medium ml-2">Rated 4.9/5 stars</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(content?.testimonials || []).slice(0, 3).map((testimonial, i) => (
                            <div key={i} className="bg-secondary-800/50 p-6 rounded-2xl border border-secondary-700 backdrop-blur-sm">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-secondary-200 mb-6 text-sm leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-secondary-400">{testimonial.role}, {testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Placeholder generic testimonials if API is empty for better preview */}
                        {(!content?.testimonials || content.testimonials.length === 0) && [1, 2, 3].map(i => (
                            <div key={i} className="bg-secondary-800/50 p-6 rounded-2xl border border-secondary-700 backdrop-blur-sm">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-secondary-200 mb-6 text-sm leading-relaxed">"Talento has completely transformed how we hire engineers. The AI's technical questions are incredibly accurate."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">John Doe</p>
                                        <p className="text-xs text-secondary-400">CTO, TechCorp</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing CTA - Condensed */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-indigo-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start hiring smarter today</h2>
                            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">Get 14 days of full access. No credit card required. Cancel anytime.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition shadow-lg">
                                    Start Free Trial
                                </button>
                                <button onClick={() => navigate('/pricing')} className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition">
                                    View Pricing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

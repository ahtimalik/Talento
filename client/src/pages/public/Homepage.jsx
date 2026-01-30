import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomepageContent, getPlans, getSettings } from '../../services/api';
import {
    CheckCircle, Play, Users, Award, BarChart, Clock, Shield, Zap, ArrowRight, Star,
    ChevronDown, ChevronUp, Globe, Cpu, MessageSquare, Video, Calendar, Briefcase,
    Code, Rocket, TrendingUp, Target, Sparkles, Brain, FileText, Settings
} from 'lucide-react';

// Import images
import heroDashboard from '../../assets/homepage/hero_dashboard_mockup.png';
import statsInfographic from '../../assets/homepage/statistics_infographic.png';
import problemIllustration from '../../assets/homepage/problem_illustration.png';
import solutionIllustration from '../../assets/homepage/solution_illustration.png';
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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const productName = settings?.productName || 'Talento';

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 font-semibold text-sm mb-8 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                            AI-Powered Behavioral Analysis • 95% Accuracy
                        </div>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                            Transform Hiring with
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Artificial Intelligence
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                            {content?.heroSubtitle || 'Automate your screening process with advanced AI interviews. Save hundreds of hours, eliminate bias, and find top talent effortlessly with data-driven insights.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                            <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                                Start Free Trial <ArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition border border-white/30 backdrop-blur-md flex items-center justify-center gap-3">
                                <Play className="w-5 h-5 fill-current" /> Watch Demo
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300 mb-12">
                            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> No credit card required</span>
                            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> 14-day free trial</span>
                            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Cancel anytime</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative max-w-6xl mx-auto">
                        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40"></div>
                        <img src={heroDashboard} alt="Dashboard Preview" className="relative rounded-2xl shadow-2xl border border-white/10 w-full" />
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                Trusted by Industry Leaders
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                Join thousands of companies worldwide who have revolutionized their hiring process with {productName}. Our AI-powered platform delivers measurable results.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl">
                                    <div className="text-5xl font-extrabold text-indigo-600 mb-2">10K+</div>
                                    <div className="text-gray-700 font-medium">Interviews Conducted</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                                    <div className="text-5xl font-extrabold text-purple-600 mb-2">95%</div>
                                    <div className="text-gray-700 font-medium">Accuracy Rate</div>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                                    <div className="text-5xl font-extrabold text-green-600 mb-2">50%</div>
                                    <div className="text-gray-700 font-medium">Time Saved</div>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
                                    <div className="text-5xl font-extrabold text-blue-600 mb-2">500+</div>
                                    <div className="text-gray-700 font-medium">Companies Trust Us</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-3xl blur-2xl opacity-30"></div>
                            <img src={statsInfographic} alt="Statistics" className="relative rounded-2xl shadow-xl w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem vs Solution */}
            <section className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Hiring is broken. <span className="text-indigo-600">We fixed it.</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Stop wasting time on manual screening. Let AI handle the repetitive work so you can focus on the best candidates.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-12 rounded-3xl shadow-xl border-2 border-red-100 relative overflow-hidden group hover:shadow-2xl transition">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-red-100 rounded-2xl">
                                        <Clock className="w-10 h-10 text-red-600" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-900">The Old Way</h3>
                                </div>
                                <img src={problemIllustration} alt="Hiring Problems" className="rounded-2xl mb-8 w-full shadow-lg" />
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-4 text-lg text-gray-700">
                                        <span className="mt-2 w-2.5 h-2.5 bg-red-500 rounded-full shrink-0"></span>
                                        <span><strong>20+ hours/week</strong> wasted on endless resume screening</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-lg text-gray-700">
                                        <span className="mt-2 w-2.5 h-2.5 bg-red-500 rounded-full shrink-0"></span>
                                        <span><strong>Scheduling nightmares</strong> and frequent candidate no-shows</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-lg text-gray-700">
                                        <span className="mt-2 w-2.5 h-2.5 bg-red-500 rounded-full shrink-0"></span>
                                        <span><strong>Biased decisions</strong> leading to inconsistent hiring</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-lg text-gray-700">
                                        <span className="mt-2 w-2.5 h-2.5 bg-red-500 rounded-full shrink-0"></span>
                                        <span><strong>Weeks to fill</strong> a single position, losing top talent</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-12 rounded-3xl shadow-2xl relative overflow-hidden group hover:shadow-3xl transition transform md:-translate-y-6">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-white">The {productName} Way</h3>
                                </div>
                                <img src={solutionIllustration} alt="AI Solution" className="rounded-2xl mb-8 w-full shadow-lg" />
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-4 text-lg text-white font-medium">
                                        <CheckCircle className="w-7 h-7 text-green-300 shrink-0" />
                                        <span><strong>0 hours/week</strong> with instant AI-powered screening</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-lg text-white font-medium">
                                        <CheckCircle className="w-7 h-7 text-green-300 shrink-0" />
                                        <span><strong>24/7 availability</strong> for on-demand interviews</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-lg text-white font-medium">
                                        <CheckCircle className="w-7 h-7 text-green-300 shrink-0" />
                                        <span><strong>Objective insights</strong> with data-driven decisions</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-lg text-white font-medium">
                                        <CheckCircle className="w-7 h-7 text-green-300 shrink-0" />
                                        <span><strong>Days to hire</strong> the perfect candidate</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm border border-indigo-500/30 px-5 py-2.5 rounded-full">Simple Process</span>
                        <h2 className="text-5xl md:text-6xl font-bold mt-8 mb-6">How {productName} Works</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Three simple steps to revolutionize your hiring pipeline and find the perfect candidates faster than ever.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-16 relative">
                        <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-1 bg-gradient-to-r from-gray-800 via-indigo-600 to-gray-800"></div>

                        {[
                            { num: 1, title: 'Create Job', desc: 'Define the role, required skills, and interview questions. Our AI can help generate them instantly based on job description.', icon: FileText },
                            { num: 2, title: 'Invite Candidates', desc: 'Share the interview link via email or social media. Candidates take the AI interview at their convenience, 24/7.', icon: Users },
                            { num: 3, title: 'Review & Hire', desc: 'Get detailed reports, scores, and insights. Compare candidates side-by-side and hire the best talent fast.', icon: Award }
                        ].map((step) => (
                            <div key={step.num} className="text-center group">
                                <div className="w-36 h-36 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center border-4 border-gray-900 mb-8 relative z-10 shadow-2xl group-hover:scale-110 transition duration-300">
                                    <span className="text-6xl font-bold text-white">{step.num}</span>
                                </div>
                                <div className="mb-6">
                                    <step.icon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                                </div>
                                <h3 className="text-3xl font-bold mb-5">{step.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Showcase */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Powerful Features</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to conduct professional, insightful interviews at scale
                        </p>
                    </div>

                    <div className="space-y-32">
                        {/* Feature 1 */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-6">
                                    <Brain className="w-4 h-4 mr-2" /> AI Interviewing
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Natural Conversations Powered by AI</h3>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Our AI doesn't just ask questions—it understands context, conducts natural conversations, and adapts to candidate responses in real-time.
                                </p>
                                <ul className="space-y-4">
                                    {['Adaptive questioning based on responses', 'Multi-language support (50+ languages)', 'Bias-free evaluation & consistent scoring', 'Voice and text interview options'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg text-gray-700">
                                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-3xl blur-2xl opacity-30"></div>
                                <img src={featureAI} alt="AI Interview" className="relative rounded-2xl shadow-2xl w-full" />
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl blur-2xl opacity-30"></div>
                                <img src={featureAnalytics} alt="Analytics" className="relative rounded-2xl shadow-2xl w-full" />
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-6">
                                    <BarChart className="w-4 h-4 mr-2" /> Deep Analytics
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Data-Driven Hiring Decisions</h3>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Get comprehensive analytics and insights for every candidate. Compare performance across technical skills, communication, and cultural fit.
                                </p>
                                <ul className="space-y-4">
                                    {['Real-time performance dashboards', 'Detailed scoring rubrics & breakdowns', 'Side-by-side candidate comparisons', 'Export reports in multiple formats'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg text-gray-700">
                                            <CheckCircle className="w-6 h-6 text-purple-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                                    <FileText className="w-4 h-4 mr-2" /> Comprehensive Reports
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Detailed Candidate Reports</h3>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Every interview generates a comprehensive report with scores, transcripts, and actionable insights to help you make informed decisions.
                                </p>
                                <ul className="space-y-4">
                                    {['Full interview transcripts', 'Audio/video recording playback', 'Skill-based scoring breakdown', 'AI-generated recommendations'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg text-gray-700">
                                            <CheckCircle className="w-6 h-6 text-blue-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl blur-2xl opacity-30"></div>
                                <img src={featureReports} alt="Reports" className="relative rounded-2xl shadow-2xl w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Solutions for Every Team</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Whether you're a startup or an enterprise, {productName} scales with your hiring needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { icon: Users, title: 'HR Teams', color: 'blue', desc: 'Automate the initial screening process and focus on building relationships with top candidates. Reduce time-to-hire significantly.', benefits: ['Reduce time-to-hire by 50%', 'Eliminate scheduling conflicts', 'Standardized evaluation process', 'Improved candidate experience'] },
                            { icon: Code, title: 'Engineering Managers', color: 'purple', desc: 'Verify coding skills and technical knowledge with deep, adaptive technical interviews that test real-world problem-solving.', benefits: ['Code execution environment', 'System design challenges', 'Technical skill assessment', 'Algorithm problem solving'] },
                            { icon: Rocket, title: 'Founders & Startups', color: 'orange', desc: 'Build your dream team fast without a dedicated HR department. Cost-effective hiring that scales with your growth.', benefits: ['Cost-effective hiring', '24/7 interviewing', 'No HR team required', 'Scale as you grow'] }
                        ].map((useCase, i) => (
                            <div key={i} className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition border-2 border-gray-100 hover:border-indigo-200">
                                <div className={`w-16 h-16 bg-${useCase.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                                    <useCase.icon className={`w-9 h-9 text-${useCase.color}-600`} />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-5">{useCase.title}</h3>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{useCase.desc}</p>
                                <ul className="space-y-3">
                                    {useCase.benefits.map((benefit, j) => (
                                        <li key={j} className="flex items-center gap-3 text-gray-700">
                                            <CheckCircle className={`w-5 h-5 text-${useCase.color}-500 shrink-0`} />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Seamless Integrations</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Connect {productName} with your favorite tools to streamline your entire hiring workflow
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { name: 'Slack', icon: MessageSquare, color: 'bg-[#4A154B]', desc: 'Get notifications' },
                            { name: 'Zoom', icon: Video, color: 'bg-[#2D8CFF]', desc: 'Video interviews' },
                            { name: 'Google Calendar', icon: Calendar, color: 'bg-[#4285F4]', desc: 'Schedule sync' },
                            { name: 'Greenhouse', icon: Briefcase, color: 'bg-[#00A96E]', desc: 'ATS integration' },
                            { name: 'LinkedIn', icon: Users, color: 'bg-[#0A66C2]', desc: 'Import profiles' },
                            { name: 'Microsoft Teams', icon: MessageSquare, color: 'bg-[#5B5FC7]', desc: 'Team collaboration' },
                            { name: 'Workday', icon: Settings, color: 'bg-[#FF6B35]', desc: 'HR system sync' },
                            { name: 'Zapier', icon: Zap, color: 'bg-[#FF4A00]', desc: 'Automate workflows' }
                        ].map((tool, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition border border-gray-100 group">
                                <div className={`w-20 h-20 rounded-2xl ${tool.color} flex items-center justify-center mb-5 shadow-lg transform group-hover:scale-110 transition`}>
                                    <tool.icon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{tool.name}</h3>
                                <p className="text-sm text-gray-500">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {content?.testimonials && content.testimonials.length > 0 && (
                <section className="py-32 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Loved by HR Teams Worldwide</h2>
                            <p className="text-xl text-gray-600">Don't just take our word for it—hear from our customers</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            {content.testimonials.map((testimonial, i) => (
                                <div key={i} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition border border-gray-100">
                                    <div className="flex gap-1 text-yellow-400 mb-6">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-6 h-6 fill-current" />)}
                                    </div>
                                    <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                                            <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-gray-600">Start for free, scale as you grow. No hidden fees.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <div key={plan.id} className={`relative p-10 rounded-3xl border-2 flex flex-col ${plan.isRecommended ? 'border-indigo-600 bg-white shadow-2xl scale-105 z-10' : 'border-gray-200 bg-white hover:border-gray-300'} transition-all duration-300`}>
                                {plan.isRecommended && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-extrabold text-gray-900">${plan.price}</span>
                                        <span className="text-gray-500 text-lg">/month</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-3">
                                        {plan.interviewLimit === -1 ? 'Unlimited' : plan.interviewLimit} interviews included
                                    </p>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => navigate('/signup')} className={`w-full py-4 rounded-xl font-bold text-lg transition ${plan.isRecommended ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' : 'bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50'}`}>
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-32 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600">Everything you need to know about {productName}</p>
                    </div>
                    <div className="space-y-5">
                        {[
                            { q: 'How does the AI interviewer work?', a: 'Our AI uses advanced natural language processing to conduct text or voice-based interviews. It asks relevant questions based on the job description and adapts to the candidate\'s answers in real-time, just like a human interviewer would.' },
                            { q: 'Is the AI biased?', a: 'We train our models to be objective and focus solely on skills and experience. We regularly audit our systems to minimize bias compared to human interviewers. Our AI evaluates candidates based on merit, not demographics.' },
                            { q: 'Can I customize the questions?', a: 'Absolutely! You can choose from our extensive question bank or add your own custom questions for any role. You can also let our AI generate relevant questions based on your job description.' },
                            { q: 'What happens after the interview?', a: 'You receive a detailed report with scores, a full transcript, audio/video recordings, and key insights. You can then share this with your team and decide who to move forward with in the hiring process.' },
                            { q: 'How long does an interview take?', a: 'Interview length varies based on your configuration, typically ranging from 15-45 minutes. Candidates can complete them at their convenience, 24/7.' },
                            { q: 'Do you offer a free trial?', a: 'Yes! We offer a 14-day free trial with no credit card required. You can test all features and conduct real interviews during the trial period.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-indigo-200 transition">
                                <button onClick={() => toggleFaq(i)} className="w-full px-8 py-6 text-left flex items-center justify-between font-bold text-xl text-gray-900 hover:bg-gray-50 transition">
                                    {item.q}
                                    {openFaq === i ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
                                </button>
                                {openFaq === i && (
                                    <div className="px-8 pb-6 text-gray-600 text-lg leading-relaxed">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Ready to Transform Your Hiring?</h2>
                    <p className="text-2xl text-indigo-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of companies using {productName} to find the best talent, faster. Start your free trial today—no credit card required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                        <button onClick={() => navigate('/signup')} className="px-12 py-6 bg-white text-indigo-900 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition shadow-2xl transform hover:-translate-y-1">
                            Start Free Trial
                        </button>
                        <button onClick={() => navigate('/pricing')} className="px-12 py-6 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition">
                            View Pricing
                        </button>
                    </div>
                    <p className="text-indigo-300 text-lg">No credit card required • 14-day free trial • Cancel anytime</p>
                </div>
            </section>
        </div>
    );
}

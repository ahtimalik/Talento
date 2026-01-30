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
            <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 overflow-hidden bg-white border-b border-secondary-100">
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

            {/* Bento Grid Features - Light & Clean */}
            <section className="py-24 bg-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4 tracking-tight">Everything you need to scale</h2>
                        <p className="text-secondary-500 text-lg">A complete suite of AI-powered tools designed to streamline your hiring workflow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[320px]">
                        {/* Large Main Feature - White Card */}
                        <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-3xl p-8 border border-secondary-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-8 right-8 p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary-900 mb-2">Autonomous AI Interviews</h3>
                            <p className="text-secondary-500 mb-8 max-w-sm leading-relaxed">Conduct thousands of interviews simultaneously with our adaptive AI that probes deep into technical and behavioral skills.</p>
                            <div className="absolute bottom-0 right-0 w-[90%] md:w-[80%] shadow-xl rounded-tl-2xl overflow-hidden border-t border-l border-secondary-100 transform translate-y-4 translate-x-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
                                <img src={featureAI} alt="AI Interface" className="w-full" />
                            </div>
                        </div>

                        {/* Feature 2 - White Card */}
                        <div className="md:col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-secondary-100 hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div>
                                <div className="p-3 bg-indigo-50 w-fit rounded-2xl mb-4"><BarChart className="w-6 h-6 text-indigo-600" /></div>
                                <h3 className="text-xl font-bold mb-2 text-secondary-900">Deep Analytics</h3>
                                <p className="text-secondary-500 text-sm">Compare candidates with data, not gut feeling.</p>
                            </div>
                            <div className="mt-8 flex items-end gap-2 h-24 opacity-80 group-hover:scale-105 transition-transform origin-bottom">
                                {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t-sm ${i === 3 ? 'bg-indigo-600' : 'bg-secondary-100'}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-8 border border-secondary-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-12 w-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Video size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-900 mb-2">Video Analysis</h3>
                            <p className="text-sm text-secondary-500 leading-relaxed">Micro-expression analysis and soft skill scoring.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-8 border border-secondary-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Code size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-900 mb-2">Code Sandbox</h3>
                            <p className="text-sm text-secondary-500 leading-relaxed">Live execution environment for 40+ languages.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* "The Old Way vs The AI Way" - Clean White */}
            <section className="py-24 bg-white border-y border-secondary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div>
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-xs">The Paradigm Shift</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2 mb-6 text-balance">Stop filtering resumes. <br />Start filtering <span className="text-indigo-600">skills</span>.</h2>
                            <p className="text-secondary-500 text-lg mb-8 leading-relaxed">
                                Traditional hiring relies on keywords and pedigree. Talento digs deeper, analyzing actual problem-solving abilities in real-time.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                        <Clock className="text-indigo-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-secondary-900">70% reduction in time-to-hire</h4>
                                        <p className="text-sm text-secondary-500 mt-1">From 45 days average to just 14 days. Close candidates before competitors even schedule a screen.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                        <Target className="text-indigo-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-secondary-900">95% placement success rate</h4>
                                        <p className="text-sm text-secondary-500 mt-1">Our AI-vetted candidates stay longer and perform better. Verified by 1M+ data points.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary-50/50 p-8 rounded-3xl border border-secondary-200">
                            <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden">
                                <div className="grid grid-cols-2 text-center p-4 bg-secondary-50 border-b border-secondary-100 font-semibold text-sm">
                                    <div className="text-secondary-400">Manual Hiring</div>
                                    <div className="text-indigo-600">With Talento</div>
                                </div>
                                {[
                                    { feature: 'Resume Screening', old: '25 hrs', new: '0 hrs', win: true },
                                    { feature: 'Technical Screen', old: 'Manual call', new: 'AI Auto-Pilot', win: true },
                                    { feature: 'Candidate Quality', old: 'Hit or miss', new: 'Top 1% Verified', win: true },
                                    { feature: 'Bias Factor', old: 'High', new: 'Zero', win: true },
                                    { feature: 'Cost per Hire', old: '$4,000+', new: '$400', win: true },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-3 p-4 text-sm border-b border-secondary-100 last:border-0 items-center">
                                        <div className="font-medium text-secondary-900 col-span-1">{row.feature}</div>
                                        <div className="text-secondary-400 text-center col-span-1 line-through opacity-50">{row.old}</div>
                                        <div className="text-indigo-700 font-bold text-center col-span-1 bg-indigo-50 py-1 rounded-md">{row.new}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* "Developer Experience" - Changed to Light/Clean */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 border border-secondary-200 text-secondary-600 text-xs font-mono mb-6">
                            <Code size={12} />
                            <span>DEVELOPER_FIRST_PLATFORM</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-secondary-900">Engineers love <span className="text-indigo-600">active coding</span> layouts.</h2>
                        <p className="text-secondary-500 text-lg">
                            Forget whiteboard interviews. Our IDE-based assessments replicate the real world with syntax highlighting, auto-complete, and integrated documentation.
                        </p>
                    </div>

                    {/* IDE Mockup - Kept Dark as it represents an IDE, but background around it is white */}
                    <div className="rounded-xl border border-secondary-200 bg-[#1e1e1e] shadow-2xl overflow-hidden font-mono text-sm max-w-5xl mx-auto ring-8 ring-secondary-50">
                        {/* IDE Toolbar */}
                        <div className="bg-[#2d2d2d] px-4 py-2 border-b border-secondary-700 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="text-secondary-500 text-xs flex gap-4">
                                <span className="text-white bg-secondary-700 px-2 py-0.5 rounded">main.go</span>
                                <span>test_suite.py</span>
                                <span>README.md</span>
                            </div>
                            <div className="text-emerald-500 flex items-center gap-1.5 text-xs">
                                <Zap size={12} /> Connected
                            </div>
                        </div>

                        {/* IDE Content */}
                        <div className="grid md:grid-cols-2 h-[400px]">
                            {/* Code Editor */}
                            <div className="p-6 border-r border-secondary-700 text-gray-300 overflow-y-auto">
                                <div className="flex">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">1</div>
                                    <div className="flex-1"><span className="text-purple-400">package</span> main</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">2</div>
                                    <div className="flex-1"></div>
                                </div>
                                <div className="flex">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">8</div>
                                    <div className="flex-1"><span className="text-secondary-500">// FindMedianSortedArrays finds the median of two sorted arrays</span></div>
                                </div>
                                <div className="flex bg-secondary-800/50 -mx-6 px-6 border-l-2 border-blue-500">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">9</div>
                                    <div className="flex-1"><span className="text-purple-400">func</span> <span className="text-yellow-300">FindMedianSortedArrays</span>(nums1 []<span className="text-blue-400">int</span>, nums2 []<span className="text-blue-400">int</span>) <span className="text-blue-400">float64</span> {'{'}</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">10</div>
                                    <div className="flex-1 pl-4">    merged := <span className="text-cyan-400">append</span>(nums1, nums2...)</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">11</div>
                                    <div className="flex-1 pl-4">    sort.<span className="text-cyan-400">Ints</span>(merged)</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">12</div>
                                    <div className="flex-1 pl-4">    n := <span className="text-cyan-400">len</span>(merged)</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-none w-8 text-secondary-600 text-right pr-4 select-none">13</div>
                                    <div className="flex-1 pl-4 animate-pulse pt-1"> <div className="w-2 h-4 bg-white"></div> </div>
                                </div>
                            </div>

                            {/* Terminal/Output */}
                            <div className="bg-[#1e1e1e] flex flex-col">
                                <div className="flex-1 p-6">
                                    <div className="text-xs uppercase tracking-widest text-secondary-500 mb-4 border-b border-secondary-800 pb-2">Problem Description</div>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        Given two sorted arrays <code className="bg-secondary-800 px-1 py-0.5 rounded text-white">nums1</code> and <code className="bg-secondary-800 px-1 py-0.5 rounded text-white">nums2</code>...
                                    </p>
                                </div>
                                <div className="h-1/3 border-t border-secondary-700 bg-black/30 p-4 font-mono text-xs">
                                    <div className="text-emerald-500 mb-1">➜  Tests running...</div>
                                    <div className="text-gray-400">Test Case 1: [1,3], [2] -> Passed (2ms)</div>
                                    <div className="text-emerald-500 mt-2">✓ All tests passed. Correctness Score: 100/100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Redesigned ROI / Stats - Clean Horizontal Strip */}
            <section className="py-16 bg-secondary-50 border-y border-secondary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-secondary-200">
                        <div className="text-center px-4">
                            <div className="text-4xl font-bold text-secondary-900 mb-2">2.5M+</div>
                            <p className="text-secondary-500 text-sm uppercase tracking-wide font-medium">Interviews Conducted</p>
                        </div>
                        <div className="text-center px-4 pt-8 md:pt-0">
                            <div className="text-4xl font-bold text-secondary-900 mb-2">40hrs</div>
                            <p className="text-secondary-500 text-sm uppercase tracking-wide font-medium">Saved Per Hire</p>
                        </div>
                        <div className="text-center px-4 pt-8 md:pt-0">
                            <div className="text-4xl font-bold text-secondary-900 mb-2">10x</div>
                            <p className="text-secondary-500 text-sm uppercase tracking-wide font-medium">Faster Screening</p>
                        </div>
                        <div className="text-center px-4 pt-8 md:pt-0">
                            <div className="text-4xl font-bold text-secondary-900 mb-2">150+</div>
                            <p className="text-secondary-500 text-sm uppercase tracking-wide font-medium">Countries Supported</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* "Integrations" - Clean White */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary-900 mb-4">Plays nice with your existing stack</h2>
                        <p className="text-secondary-500 text-lg max-w-2xl mx-auto">One-click integrations with the tools you already use.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {['Slack', 'Greenhouse', 'Lever', 'Workday', 'Ashby', 'BambooHR', 'Teams', 'Zoom', 'Google Cal', 'Notion', 'Zapier', 'Okta'].map((tool, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-secondary-100 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-secondary-50 mb-3 group-hover:bg-indigo-50 group-hover:text-indigo-600 flex items-center justify-center text-sm font-bold text-secondary-500 transition-colors">
                                    {tool[0]}
                                </div>
                                <span className="text-sm font-medium text-secondary-600 group-hover:text-secondary-900">{tool}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials - Light Theme */}
            <section className="py-24 bg-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary-900 mb-4">Trusted by the world's best</h2>
                        <p className="text-secondary-500 text-lg">Join 500+ engineering teams hiring better.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {(content?.testimonials || []).slice(0, 3).map((testimonial, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-secondary-100 shadow-sm">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-secondary-600 mb-6 text-sm leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-secondary-900 text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-secondary-500">{testimonial.role}, {testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Placeholder generic testimonials */}
                        {(!content?.testimonials || content.testimonials.length === 0) && [1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-secondary-100 shadow-sm">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-secondary-600 mb-6 text-sm leading-relaxed">"Talento has completely transformed how we hire engineers. The AI's technical questions are incredibly accurate."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <p className="font-semibold text-secondary-900 text-sm">John Doe</p>
                                        <p className="text-xs text-secondary-500">CTO, TechCorp</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expanded FAQ - Modern Grid Layout */}
            <section className="py-24 bg-white border-t border-secondary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-24">
                        <div className="lg:col-span-1">
                            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Frequently asked questions</h2>
                            <p className="text-secondary-500 mb-8 text-lg">
                                Have more questions? We represent the top 1% of engineering talent, and we're here to help you hire them.
                            </p>
                            <button className="inline-flex items-center justify-center px-6 py-3 border border-secondary-200 shadow-sm text-base font-medium rounded-xl text-secondary-900 bg-white hover:bg-secondary-50 transition-colors">
                                Contact Support
                            </button>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
                                {[
                                    { q: "Is the AI actually fair?", a: "Yes. Our AI is trained on anonymized data and specifically calibrated to ignore gender, ethnicity, and age markers. We rigorously test for disparate impact." },
                                    { q: "Can I use my own questions?", a: "Absolutely. You can use our bank of 10,000+ vetted questions, or input your own. You can also upload a job description to auto-generate scripts." },
                                    { q: "How do you prevent cheating?", a: "We have multi-layered proctoring. We track tab switching, copy-paste events, and use audio/video analysis to detect if someone else is in the room." },
                                    { q: "Do you integrate with Greenhouse?", a: "Yes, we have deep bi-directional integration with Greenhouse, Lever, Ashby, and Workday. Candidates automatically sync between platforms." },
                                    { q: "Is my data secure?", a: "We are SOC2 Type II compliant and GDPR ready. Your data is encrypted at rest and in transit, and we never train our public models on your private data." },
                                    { q: "What is the pricing model?", a: "We charge per 'active candidate' accessed. No per-seat limits. Start for free, scale as you grow. Enterprise plans available for high volume." },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <h3 className="text-lg font-bold text-secondary-900 mb-3">{item.q}</h3>
                                        <p className="text-secondary-500 leading-relaxed text-sm">
                                            {item.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Massive CTA - Light/Clean with creative blob */}
            <section className="py-32 bg-secondary-50 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-secondary-900 mb-8 tracking-tight">
                        Ready to build your <span className="text-indigo-600">dream team</span>?
                    </h2>
                    <p className="text-xl text-secondary-500 mb-12 max-w-2xl mx-auto">
                        Join 2,500+ companies using Talento to identify the best engineering talent in the world, instantly.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigate('/signup')} className="px-10 py-5 bg-secondary-900 text-white rounded-2xl font-bold text-lg hover:bg-secondary-800 transition shadow-2xl hover:scale-[1.02] transform duration-200">
                            Start Free Trial
                        </button>
                        <button className="px-10 py-5 bg-white text-secondary-900 border border-secondary-200 rounded-2xl font-bold text-lg hover:bg-white/50 transition shadow-sm">
                            Talk to Sales
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

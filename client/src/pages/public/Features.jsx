import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Brain, Code, Shield, BarChart, Zap, Globe,
    CheckCircle, MessageSquare
} from 'lucide-react';

export default function Features() {
    const navigate = useNavigate();

    return (
        <div className="bg-white font-sans text-secondary-900 selection:bg-indigo-100 selection:text-indigo-900">

            {/* Feature Grid */}
            <div className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl mb-4">Everything you need to scale</h2>
                        <p className="text-lg text-secondary-500 max-w-2xl mx-auto">From sourcing to offer letter, we provide the infrastructure to identify the best talent without the bias.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {/* Card 1 */}
                        <FeatureCard
                            icon={<Brain />}
                            color="indigo"
                            title="AI Technical Interviewer"
                            description="Our AI performs deep-dive technical interviews, adapting questions in real-time to the candidate's skill level."
                            tags={['Adaptive', 'Voice & Text']}
                        />

                        {/* Card 2 */}
                        <FeatureCard
                            icon={<Code />}
                            color="blue"
                            title="Live Code Execution"
                            description="Real IDE environment supporting 30+ languages. Linting, autocomplete, and test cases included."
                            tags={['Monaco Editor', 'Multilingual']}
                        />

                        {/* Card 3 */}
                        <FeatureCard
                            icon={<Shield />}
                            color="rose"
                            title="Proctoring Suite"
                            description="Advanced anti-cheating measures including window focus tracking, copy-paste detection, and webcam monitoring."
                            tags={['Secure', 'GDPR Compliant']}
                        />

                        {/* Card 4 */}
                        <FeatureCard
                            icon={<BarChart />}
                            color="emerald"
                            title="Instant Detailed Reports"
                            description="Comprehensive scorecards available immediately after the interview, highlighting key signals."
                            tags={['Actionable', 'Analytics']}
                        />

                        {/* Card 5 */}
                        <FeatureCard
                            icon={<Zap />}
                            color="amber"
                            title="Workflow Integration"
                            description="Connect with your existing tools like Slack, Greenhouse, Lever, and Discord for seamless notifications."
                            tags={['Webhooks', 'API First']}
                        />

                        {/* Card 6 */}
                        <FeatureCard
                            icon={<Globe />}
                            color="purple"
                            title="Global Infrastructure"
                            description="Low-latency servers worldwide ensure a smooth interview experience for candidates anywhere."
                            tags={['Edge Network', '99.9% Uptime']}
                        />
                    </div>
                </div>
            </div>

            {/* Split Section: Deep Dive */}
            <div className="py-24 bg-secondary-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-12 lg:mb-0">
                            <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl mb-6">
                                The most accurate signal <br />
                                <span className="text-indigo-600">in the industry.</span>
                            </h2>
                            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                                Traditional coding tests are flawed. They measure memorization, not engineering ability. Talento simulates real-world engineering tasks.
                            </p>

                            <ul className="space-y-4">
                                {['System design whiteboard sessions', 'Code review simulations', 'Debugging broken codebases', 'API integration tasks'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-secondary-700 font-medium">
                                        <CheckCircle className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600 rounded-2xl rotate-3 opacity-10"></div>
                            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-secondary-100">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 border-b border-secondary-100 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center font-bold text-secondary-500">AI</div>
                                        <div>
                                            <p className="text-sm font-bold text-secondary-900">Interviewer Bot</p>
                                            <p className="text-xs text-secondary-500">Just now</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-sm text-secondary-600 bg-secondary-50 p-4 rounded-lg rounded-tl-none">
                                            "I see you used a hash map there. Can you explain how that impacts the time complexity of your solution compared to your initial array approach?"
                                        </p>
                                        <div className="flex justify-end">
                                            <p className="text-sm text-white bg-indigo-600 p-4 rounded-lg rounded-tr-none shadow-md">
                                                "Sure! Using the hash map reduces the lookup time from O(n) to O(1) on average. This means the overall complexity of the two-sum pass becomes O(n) instead of O(n²)."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <button onClick={() => navigate('/signup')} className="px-10 py-5 bg-secondary-900 text-indigo-600 rounded-2xl font-bold text-lg hover:bg-secondary-800 transition shadow-2xl hover:scale-[1.02] transform duration-200">
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

function FeatureCard({ icon, color, title, description, tags }) {
    const colors = {
        indigo: "text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white",
        blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white",
        rose: "text-rose-600 bg-rose-50 group-hover:bg-rose-600 group-hover:text-white",
        emerald: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white",
        amber: "text-amber-600 bg-amber-50 group-hover:bg-amber-600 group-hover:text-white",
        purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white",
    };

    return (
        <div className="group bg-white p-8 rounded-3xl border border-secondary-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${colors[color]}`}>
                {React.cloneElement(icon, { className: "w-7 h-7" })}
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-3">{title}</h3>
            <p className="text-secondary-500 mb-6 leading-relaxed line-clamp-3">
                {description}
            </p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary-50 text-secondary-600 text-xs font-bold rounded-full border border-secondary-100 group-hover:border-secondary-200 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

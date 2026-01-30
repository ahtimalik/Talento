import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-secondary-950 text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-2 pr-8">
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                                <span className="text-lg font-black text-white">T</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">Talento</span>
                        </Link>
                        <p className="text-secondary-400 text-sm leading-relaxed mb-6 max-w-sm text-balance">
                            Empowering companies to build world-class teams through AI-driven insights and streamlined hiring workflows.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="text-secondary-400 hover:text-white transition-colors">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columns */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
                        <ul className="space-y-2">
                            {['Features', 'Pricing', 'Sample Report', 'Enterprise', 'Changelog'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
                        <ul className="space-y-2">
                            {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
                        <ul className="space-y-2">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-secondary-500 text-xs">
                        © {new Date().getFullYear()} Talento Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-secondary-500">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        <span>Systems Normal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

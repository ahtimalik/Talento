import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">T</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Talento</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/features"
                            className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-sm"
                        >
                            Features
                        </Link>
                        <Link
                            to="/pricing"
                            className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-sm"
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/sample-report"
                            className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-sm"
                        >
                            Sample Report
                        </Link>
                        <div className="w-px h-6 bg-white/20 mx-2"></div>
                        <Link
                            to="/login"
                            className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-sm"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="ml-2 px-5 py-2.5 bg-white text-indigo-600 rounded-lg font-semibold text-sm hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Start Free Trial
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 border-t border-white/10">
                        <Link
                            to="/features"
                            className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            to="/pricing"
                            className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/sample-report"
                            className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sample Report
                        </Link>
                        <Link
                            to="/login"
                            className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="block px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Start Free Trial
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

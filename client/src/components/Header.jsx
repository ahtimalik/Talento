import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Custom hook for media query
function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    // Check auth state on mount and when location changes (in case of login/logout)
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            if (token && userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
            }
        };
        checkAuth();

        // Listen for storage events (in case of logout in another tab)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [location]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const navLinks = [
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Sample Report', path: '/sample-report' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
                : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-200">
                            <span className="text-2xl font-black text-white">T</span>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                            Talento
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    {isDesktop && (
                        <nav className="flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-semibold transition-colors duration-200 ${location.pathname === link.path
                                        ? 'text-indigo-600'
                                        : 'text-gray-900 hover:text-indigo-600'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="w-px h-6 bg-gray-200"></div>

                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to={user.role === 'superadmin' ? '/admin' : '/dashboard'}
                                        className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all duration-200"
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        Start Free Trial
                                    </Link>
                                </div>
                            )}
                        </nav>
                    )}

                    {/* Mobile menu button */}
                    {!isDesktop && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    )}
                </div>

                {/* Mobile Navigation */}
                {!isDesktop && mobileMenuOpen && (
                    <div className="py-4 space-y-2 border-t border-gray-100 bg-white absolute left-0 right-0 px-4 shadow-xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === link.path
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="h-px bg-gray-100 my-2"></div>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'superadmin' ? '/admin' : '/dashboard'}
                                    className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-xl font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-xl font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-center shadow-lg shadow-indigo-500/30"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Start Free Trial
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

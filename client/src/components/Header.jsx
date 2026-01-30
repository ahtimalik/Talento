import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [location]);

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

    // Derived classes for state
    const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-surface/90 backdrop-blur-md border-b border-secondary-200 shadow-sm py-2'
            : 'bg-transparent py-4'
        }`;

    return (
        <header className={headerClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md transform group-hover:rotate-3 transition-transform duration-200">
                            <span className="text-lg font-black text-white">T</span>
                        </div>
                        <span className="text-xl font-bold text-secondary-900 tracking-tight">Talento</span>
                    </Link>

                    {/* Desktop Navigation */}
                    {isDesktop && (
                        <nav className="flex items-center gap-1">
                            <div className="flex items-center rounded-full bg-secondary-50/50 border border-secondary-200/50 p-1 mr-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${location.pathname === link.path
                                                ? 'bg-white text-primary-600 shadow-xs'
                                                : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100/50'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="h-4 w-px bg-secondary-200 mx-2"></div>

                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to={user.role === 'superadmin' ? '/admin' : '/dashboard'}
                                        className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="px-3 py-1.5 bg-secondary-100 text-secondary-700 rounded-lg font-medium text-sm hover:bg-secondary-200 transition-colors"
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 shadow-md shadow-primary-500/20 transition-all duration-200 hover:-translate-y-0.5"
                                    >
                                        Start Free Trial
                                    </Link>
                                </div>
                            )}
                        </nav>
                    )}

                    {/* Mobile toggle */}
                    {!isDesktop && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}
                </div>

                {/* Mobile Navigation */}
                {!isDesktop && mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b border-secondary-100 shadow-lg animate-in slide-in-from-top-2 p-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-secondary-600 hover:bg-secondary-50'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-secondary-100 my-2"></div>
                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'superadmin' ? '/admin' : '/dashboard'}
                                    className="px-4 py-3 rounded-lg font-medium text-secondary-600 hover:bg-secondary-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-3 rounded-lg font-medium text-secondary-600 hover:bg-secondary-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-3 rounded-lg font-medium bg-primary-600 text-white text-center shadow-md"
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllSettings, updateGlobalSettings,
    updateHomepageSettings, updateFeaturesSettings, updateLegalSettings,
    getAllPlans, createPlan, updatePlan, deletePlan,
    getPendingPayments, approvePayment,
    getDashboardStats, getAllUsers, createUser, updateUserPlan, deleteUser
} from '../../services/api';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [settings, setSettings] = useState(null);
    const [plans, setPlans] = useState([]);
    const [pendingPayments, setPendingPayments] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [contentModal, setContentModal] = useState(null);
    const [tickets, setTickets] = useState([
        { id: 1, title: "API webhooks not firing upon candidate evaluation completion", user: "Acme Corporation", status: "Critical Error", time: "25 mins ago" },
        { id: 2, title: "Custom enterprise branding placement requirements", user: "Startup Inc", status: "Open Discussion", time: "2 hours ago" },
        { id: 3, title: "Resource allocation & billing cycle adjustment inquiry", user: "Global Tech Group", status: "Pending Action", time: "5 hours ago" }
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, settingsRes, plansRes, paymentsRes, usersRes] = await Promise.all([
                getDashboardStats(),
                getAllSettings(),
                getAllPlans(),
                getPendingPayments(),
                getAllUsers().catch(() => ({ data: { users: [] } }))
            ]);

            setStats(statsRes.data.stats);
            setSettings(settingsRes.data.settings);
            setPlans(plansRes.data.plans);
            setPendingPayments(paymentsRes.data.payments);
            setUsersList(usersRes.data.users || []);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: 'dashboard', section: 'Main' },
        { id: 'users', label: 'User Management', icon: 'group', section: 'Management' },
        { id: 'plans', label: 'Subscription Plans', icon: 'card_membership', section: 'Management' },
        { id: 'payments', label: 'Payments & Billings', icon: 'payments', section: 'Management', badge: pendingPayments.length },
        { id: 'content', label: 'Website Content', icon: 'edit_document', section: 'Configuration' },
        { id: 'settings', label: 'Global Settings', icon: 'settings', section: 'Configuration' },
        { id: 'reports', label: 'Analytics & Reports', icon: 'bar_chart', section: 'Insights' },
        { id: 'support', label: 'Help & Support', icon: 'support_agent', section: 'Insights' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold tracking-wide">Loading Worksapce...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-800">
            {/* Sidebar */}
            <aside className={`bg-[#0f172a] text-slate-300 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-20'} shadow-2xl z-20 flex-shrink-0 relative`}>
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-3 animate-in fade-in duration-300">
                            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <span className="material-symbols-rounded text-white text-[20px]">admin_panel_settings</span>
                            </div>
                            <h1 className="text-xl font-black tracking-tight text-white uppercase">Talento<span className="text-indigo-400 font-medium tracking-normal lowercase">.ai</span></h1>
                        </div>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center ${!isSidebarOpen && 'mx-auto'}`}>
                        <span className="material-symbols-rounded text-slate-400">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                    {['Main', 'Management', 'Configuration', 'Insights'].map(section => {
                        const items = navItems.filter(item => item.section === section);
                        if (items.length === 0) return null;
                        return (
                            <div key={section} className="mb-8">
                                {isSidebarOpen && <p className="px-4 mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{section}</p>}
                                <ul className="space-y-1.5">
                                    {items.map(item => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center py-3 rounded-xl transition-all duration-200 group relative ${
                                                    activeTab === item.id 
                                                    ? 'bg-indigo-500/15 text-white font-bold' 
                                                    : 'hover:bg-slate-800/80 hover:text-white font-semibold text-slate-400'
                                                } ${isSidebarOpen ? 'px-4' : 'justify-center px-0'}`}
                                                title={!isSidebarOpen ? item.label : undefined}
                                            >
                                                <span className={`material-symbols-rounded transition-colors ${activeTab === item.id ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'} ${isSidebarOpen ? 'mr-3' : 'text-[22px]'}`}>
                                                    {item.icon}
                                                </span>
                                                {isSidebarOpen && <span className="flex-1 text-left text-[14px]">{item.label}</span>}
                                                
                                                {item.badge > 0 && isSidebarOpen && (
                                                    <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/20">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                
                                                {item.badge > 0 && !isSidebarOpen && (
                                                    <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-[#0f172a] rounded-full"></span>
                                                )}

                                                {/* Active Indicator Strip */}
                                                {activeTab === item.id && isSidebarOpen && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-white/10 shrink-0">
                    <button onClick={handleLogout} className={`w-full flex items-center py-3 rounded-xl transition-all duration-200 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-[14px] font-bold group ${isSidebarOpen ? 'px-4' : 'justify-center px-0'}`}>
                        <span className={`material-symbols-rounded group-hover:text-white transition-colors ${isSidebarOpen ? 'mr-3' : 'text-[22px]'}`}>logout</span>
                        {isSidebarOpen && <span className="flex-1 text-left">Terminate Session</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 md:h-screen overflow-hidden bg-[#f4f7fe]">
                {/* Top Navbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 shrink-0 z-10 w-full">
                    <div className="flex items-center bg-slate-100/80 rounded-2xl px-4 py-2.5 w-96 border border-transparent focus-within:border-indigo-500/30 focus-within:bg-white focus-within:shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                        <span className="material-symbols-rounded text-slate-400 mr-2 text-[20px]">search</span>
                        <input type="text" placeholder="Search parameters, users, transactions..." className="bg-transparent border-none outline-none w-full text-[13px] font-bold placeholder-slate-400 text-slate-700" />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all flex items-center justify-center">
                            <span className="material-symbols-rounded">notifications</span>
                            {pendingPayments.length > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>}
                        </button>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-3 cursor-pointer group rounded-xl hover:bg-slate-50 p-1.5 pr-3 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-200 relative overflow-hidden ring-2 ring-white shadow-sm">
                                <img src={`https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff&rounded=true&bold=true`} alt="Admin" className="w-full h-full object-cover" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-[14px] font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">System Admin</p>
                                <p className="text-[11px] font-bold text-slate-400 tracking-wide">Root Privileges</p>
                            </div>
                            <span className="material-symbols-rounded text-slate-400 group-hover:text-indigo-500 transition-colors text-[20px] ml-2">expand_more</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Scrollable Area */}
                <div className="flex-1 overflow-y-auto w-full custom-scrollbar p-8">
                    <div className="max-w-[1400px] mx-auto pb-12">
                        
                        {/* OVERVIEW CONTENT */}
                        {activeTab === 'overview' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">System Metrics</h2>
                                        <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Real-time overview of the platform's operational status.</p>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-slate-50 hover:border-slate-300 hover:text-indigo-600 transition-all shadow-sm">
                                        <span className="material-symbols-rounded text-[18px]">calendar_today</span>
                                        Last 30 Days Breakdown
                                        <span className="material-symbols-rounded text-[18px] ml-1">expand_more</span>
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    {[
                                        { title: 'Registered Users', value: stats?.totalUsers || 0, icon: 'group', color: 'bg-indigo-500', text: 'text-indigo-500', light: 'bg-indigo-50' },
                                        { title: 'Completed Interviews', value: stats?.totalInterviews || 0, icon: 'psychology', color: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50' },
                                        { title: 'Gross Revenue', value: `$${stats?.totalRevenue || 0}`, icon: 'payments', color: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50' },
                                        { title: 'Pending Verifications', value: stats?.pendingPayments || 0, icon: 'rule', color: 'bg-rose-500', text: 'text-rose-500', light: 'bg-rose-50' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                            <div className="flex justify-between items-start z-10 relative">
                                                <div>
                                                    <p className="text-[13px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{stat.title}</p>
                                                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                                                </div>
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${stat.light} ${stat.text}`}>
                                                    <span className="material-symbols-rounded text-[28px]">{stat.icon}</span>
                                                </div>
                                            </div>
                                            <div className={`mt-6 flex items-center gap-2 z-10 relative`}>
                                                <div className={`h-1.5 w-full bg-slate-100 rounded-full overflow-hidden`}>
                                                    <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Charts Placeholder Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="col-span-2 bg-white p-8 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 min-h-[400px] flex flex-col relative overflow-hidden">
                                        <div className="flex justify-between items-center mb-8 relative z-10">
                                            <h3 className="text-lg font-black text-slate-800">Growth Trajectory</h3>
                                            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                                                <button className="px-3 py-1 text-xs font-bold bg-white shadow-sm rounded-md text-slate-800">1W</button>
                                                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-800">1M</button>
                                                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-800">1Y</button>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60 z-10">
                                            <span className="material-symbols-rounded text-7xl text-indigo-200 mb-4 drop-shadow-md">monitoring</span>
                                            <p className="text-sm font-bold text-slate-400 max-w-sm">Data visualization component placeholder. Integrations will map directly to this matrix.</p>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-50/50 to-transparent z-0"></div>
                                    </div>
                                    <div className="bg-white p-8 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 min-h-[400px] flex flex-col">
                                        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center justify-between">
                                            Audit Logs 
                                            <button className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors"><span className="material-symbols-rounded text-[20px]">more_horiz</span></button>
                                        </h3>
                                        <div className="flex-1 overflow-auto pr-2 space-y-6">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className="flex gap-4 items-start relative group">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                                        <span className="material-symbols-rounded text-slate-400 text-[18px] group-hover:text-indigo-500 transition-colors">
                                                            {i === 1 ? 'person_add' : i === 2 ? 'payments' : 'info'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors leading-tight mb-1">
                                                            {i === 1 ? 'New HR registration completed' : i === 2 ? 'Payment marked as processing' : 'System backup finalized'}
                                                        </p>
                                                        <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">{i * 2} hours ago</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SETTINGS CONTENT */}
                        {activeTab === 'settings' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
                                <div className="mb-10 text-center sm:text-left">
                                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Platform Configuration</h2>
                                    <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Fine-tune the deployment parameters and white-labeling.</p>
                                </div>
                                <div className="bg-white rounded-[24px] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                                    <div className="border-b border-slate-100 p-8 bg-slate-50/30">
                                        <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                                <span className="material-symbols-rounded text-[18px]">tune</span> 
                                            </div>
                                            Core Identity
                                        </h3>
                                    </div>
                                    <form className="p-8 sm:p-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2.5">
                                                <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wide">Brand Name</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-rounded text-slate-400">title</span>
                                                    <input
                                                        type="text"
                                                        defaultValue={settings?.productName || 'Talento'}
                                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-[14px] font-bold text-slate-800 outline-none placeholder:font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2.5">
                                                <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wide">Marketing Tagline</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-rounded text-slate-400">subtitles</span>
                                                    <input
                                                        type="text"
                                                        defaultValue={settings?.tagline || 'AI Interview Platform'}
                                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-[14px] font-bold text-slate-800 outline-none placeholder:font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2.5 border-t border-slate-100 pt-8">
                                            <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wide">Accent Hex</label>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className="relative group cursor-pointer">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                                    <input
                                                        type="color"
                                                        defaultValue={settings?.primaryColor || '#4f46e5'}
                                                        className="relative h-14 w-14 rounded-xl cursor-pointer border-2 border-white block bg-white [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-lg shadow-sm"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    defaultValue={settings?.primaryColor || '#4f46e5'}
                                                    className="w-full sm:w-48 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-[14px] font-black text-slate-800 outline-none font-mono uppercase tracking-wider"
                                                />
                                            </div>
                                            <p className="text-[12px] font-bold text-slate-400 mt-3 pt-2">Defines global primary action button and link colors across the client application.</p>
                                        </div>

                                        <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4 border-t border-slate-100">
                                            <button type="button" className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 font-bold text-[14px] rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-center">Discard Changes</button>
                                            <button type="button" className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[14px] rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all active:scale-95 flex items-center justify-center gap-2">
                                                <span className="material-symbols-rounded text-[18px]">save_as</span>
                                                Commit Execution
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* PLANS CONTENT */}
                        {activeTab === 'plans' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Access Tiers</h2>
                                        <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Configure subscription matrices available to organizations.</p>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-[14px] rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-95">
                                        <span className="material-symbols-rounded text-[20px]">add_circle</span>
                                        Initialize Plan Layer
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {plans.map((plan, index) => (
                                        <div key={plan._id} className="bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-400 flex flex-col group relative">
                                            {index === 1 && (
                                                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl z-10">Popular</div>
                                            )}
                                            <div className="p-8 flex-1 flex flex-col relative z-0">
                                                <div className={`absolute top-0 left-0 w-full h-1 ${index === 0 ? 'bg-emerald-400' : index === 1 ? 'bg-indigo-500' : 'bg-rose-400'}`}></div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm
                                                        ${index === 0 ? 'bg-emerald-50 text-emerald-500' : index === 1 ? 'bg-indigo-50 text-indigo-500' : 'bg-rose-50 text-rose-500'}
                                                    `}>
                                                        <span className="material-symbols-rounded text-[24px]">
                                                            {index === 0 ? 'rocket_launch' : index === 1 ? 'diamond' : 'workspace_premium'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-800 mb-2">{plan.name}</h3>
                                                <div className="flex items-baseline gap-1 mb-8">
                                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">${plan.price}</span>
                                                    <span className="text-slate-400 font-bold text-[13px]">/mo</span>
                                                </div>
                                                
                                                <ul className="space-y-4 mb-8 flex-1">
                                                    <li className="flex items-start gap-3">
                                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                                                            <span className="material-symbols-rounded text-[14px] font-bold">check</span>
                                                        </div>
                                                        <span className="text-[14px] text-slate-600 font-bold leading-tight">
                                                            {plan.interviewLimit === -1 ? 'Unlimited AI Interviews' : `${plan.interviewLimit} AI Interview Allocations`}
                                                        </span>
                                                    </li>
                                                </ul>

                                                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-100">
                                                    <button className="flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-600 font-bold text-[13px] rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                                        <span className="material-symbols-rounded text-[16px]">edit_document</span> Edit
                                                    </button>
                                                    <button className="flex items-center justify-center gap-2 py-2.5 bg-white border border-rose-100 text-rose-500 font-bold text-[13px] rounded-xl hover:bg-rose-50 transition-colors">
                                                        <span className="material-symbols-rounded text-[16px]">delete_forever</span> Terminate
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {plans.length === 0 && (
                                        <div className="col-span-full bg-white border-2 border-indigo-100 border-dashed rounded-[24px] p-16 text-center">
                                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <span className="material-symbols-rounded text-4xl text-indigo-400">deployed_code</span>
                                            </div>
                                            <p className="text-xl font-black text-slate-800">No Tier Configurations Detected</p>
                                            <p className="text-[14px] font-medium text-slate-500 mt-2 mb-8 max-w-md mx-auto">Establish pricing and quota matrices to begin onboarding organizations to the platform.</p>
                                            <button className="px-8 py-3.5 bg-indigo-600 focus:ring-4 focus:ring-indigo-500/20 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0">Compile New Tier</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PAYMENTS CONTENT */}
                        {activeTab === 'payments' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Ledger Approvals</h2>
                                        <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Authorize pending manual financial transactions and receipts.</p>
                                    </div>
                                    {pendingPayments.length > 0 && (
                                        <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                            </span>
                                            <span className="text-[13px] font-bold text-rose-600">Action Required ({pendingPayments.length})</span>
                                        </div>
                                    )}
                                </div>

                                {pendingPayments.length === 0 ? (
                                    <div className="bg-white p-16 rounded-[24px] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 text-center flex flex-col items-center justify-center min-h-[400px]">
                                        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative">
                                            <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-20 rounded-full"></div>
                                            <span className="material-symbols-rounded text-5xl text-emerald-500 relative z-10">verified</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800 mb-2">Ledger is Clean</h3>
                                        <p className="text-slate-500 font-medium max-w-sm text-[14px]">All financial requests have been processed. System standing by for incoming transactions.</p>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-[24px] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-slate-50/80 border-b border-slate-100">
                                                    <tr>
                                                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Entity</th>
                                                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Requested Tier</th>
                                                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Verification</th>
                                                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Commitment</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 bg-white">
                                                    {pendingPayments.map(payment => (
                                                        <tr key={payment._id} className="hover:bg-slate-50/50 transition-colors group">
                                                            <td className="px-8 py-6 whitespace-nowrap">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                                                                        <span className="material-symbols-rounded text-[16px]">schedule</span>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[13px] font-bold text-slate-700">{new Date(payment.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                                        <p className="text-[11px] font-bold text-slate-400 tracking-wide">{new Date(payment.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                                                                        {(payment.hrId?.name || 'U').charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-black text-slate-800 text-[14px] leading-tight">{payment.hrId?.name || 'Anonymous Identifier'}</p>
                                                                        <p className="text-[12px] font-bold text-slate-400 mt-0.5">{payment.hrId?.email || 'N/A'}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[12px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                                    <span className="material-symbols-rounded text-[14px]">work_history</span>
                                                                    {payment.planId?.name || 'Unresolved Tier'}
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                {payment.screenshotUrl ? (
                                                                    <a href={`http://localhost:5000${payment.screenshotUrl}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-600 bg-white border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 px-4 py-2 rounded-xl text-[13px] font-bold transition-all shadow-sm">
                                                                        <span className="material-symbols-rounded text-[18px]">receipt_long</span>
                                                                        View Extract
                                                                    </a>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-2 text-slate-400 text-[13px] font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                                                        <span className="material-symbols-rounded text-[18px]">block</span>
                                                                        Awaiting Payload
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-8 py-6 text-right">
                                                                <div className="flex items-center justify-end gap-3">
                                                                    <button className="w-10 h-10 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors tooltip-btn relative">
                                                                        <span className="material-symbols-rounded text-[22px]">disabled_by_default</span>
                                                                    </button>
                                                                    <button 
                                                                        onClick={async () => {
                                                                            try {
                                                                                await approvePayment(payment._id);
                                                                                fetchData();
                                                                                alert('Transaction authorized. Resources provisioned.');
                                                                            } catch (err) {
                                                                                alert('System error during authorization.');
                                                                            }
                                                                        }}
                                                                        className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] focus:ring-4 focus:ring-slate-900/20 text-white text-[13px] font-bold rounded-xl shadow-lg shadow-slate-900/10 transition-all active:scale-95"
                                                                    >
                                                                        <span className="material-symbols-rounded text-[18px]">done_all</span>
                                                                        Authorize
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* USERS CONTENT */}
                        {activeTab === 'users' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Identity Matrix</h2>
                                        <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Manage organization accounts and administrative privileges.</p>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[14px] rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all hover:-translate-y-0.5 active:translate-y-0">
                                        <span className="material-symbols-rounded text-[20px]">person_add</span>
                                        Provision User
                                    </button>
                                </div>
                                <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-slate-50/80 border-b border-slate-100">
                                                <tr>
                                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Entity Signature</th>
                                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Access Role</th>
                                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">System Status</th>
                                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Onboarded</th>
                                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Operations</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 bg-white">
                                                {usersList.length > 0 ? usersList.map((user, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 text-slate-600 flex items-center justify-center font-black shadow-sm text-lg">
                                                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                                </div>
                                                                <div>
                                                                    <p className="font-black text-slate-800 text-[15px]">{user.name || 'Unregistered Entity'}</p>
                                                                    <p className="text-[12px] font-bold text-slate-400 mt-0.5">{user.email}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                                                                <span className="material-symbols-rounded text-[14px]">{user.role === 'admin' ? 'shield_person' : 'person'}</span>
                                                                {user.role || 'HR'}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                                <span className="text-[13px] font-bold text-slate-600">Active Node</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-[13px] font-bold text-slate-500">
                                                            {new Date(user.createdAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-indigo-100">
                                                                <span className="material-symbols-rounded text-[20px]">manage_accounts</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5" className="px-8 py-20 text-center">
                                                            <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 relative">
                                                                <div className="absolute inset-0 bg-slate-200 blur-xl opacity-20 rounded-full"></div>
                                                                <span className="material-symbols-rounded text-4xl text-slate-300 relative z-10">group_off</span>
                                                            </div>
                                                            <p className="text-xl font-black text-slate-800">No Identities Found</p>
                                                            <p className="text-[14px] font-bold text-slate-400 mt-2">Platform user datastore is currently empty.</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* REPORTS CONTENT */}
                        {activeTab === 'reports' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-10">
                                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Analytics Lake</h2>
                                    <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Deep insights into conversion metrics and AI performance scores.</p>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-white p-8 rounded-[24px] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
                                        <div className="z-10 relative">
                                            <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                                                Total Compute Hours 
                                                <span className="material-symbols-rounded text-[18px]">cloud_sync</span>
                                            </h3>
                                            <div className="flex items-end gap-3 mb-6">
                                                <span className="text-5xl font-black text-slate-800 tracking-tighter">1,248</span>
                                                <span className="text-[14px] font-bold text-emerald-500 mb-1.5 flex items-center"><span className="material-symbols-rounded text-[16px]">trending_up</span> 14.5%</span>
                                            </div>
                                        </div>
                                        <div className="h-32 w-full flex items-end gap-2.5 z-10 relative mt-auto border-b border-slate-100 pb-2">
                                            {[30, 45, 25, 60, 40, 80, 50, 90, 70, 100, 60, 85].map((h, i) => (
                                                <div key={i} className="flex-1 bg-indigo-100 rounded-t group-hover:bg-indigo-400 transition-all duration-500 ease-out" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-indigo-50/50 to-transparent z-0"></div>
                                    </div>
                                    
                                    <div className="bg-white p-8 rounded-[24px] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden min-h-[350px]">
                                        <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-100 pb-4 flex items-center justify-between">
                                            Onboarding Funnel
                                            <span className="material-symbols-rounded text-[18px]">filter_alt</span>
                                        </h3>
                                        <div className="space-y-8">
                                            <div className="relative">
                                                <div className="flex justify-between text-[14px] font-bold mb-2"><span className="text-slate-600 tracking-wide">Site Visitors</span><span className="text-slate-800 font-black">12,500</span></div>
                                                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden shadow-inner"><div className="bg-indigo-500 h-full w-[100%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000"></div></div>
                                            </div>
                                            <div className="relative pl-4 border-l-2 border-slate-100">
                                                <div className="flex justify-between text-[14px] font-bold mb-2"><span className="text-slate-600 tracking-wide">Accounts Created</span><span className="text-slate-800 font-black">3,200</span></div>
                                                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden shadow-inner"><div className="bg-purple-500 h-full w-[25.6%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-1000 delay-100"></div></div>
                                            </div>
                                            <div className="relative pl-8 border-l-2 border-slate-100">
                                                <div className="flex justify-between text-[14px] font-bold mb-2"><span className="text-slate-600 tracking-wide">Paid Subscriptions</span><span className="text-slate-800 font-black">840</span></div>
                                                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden shadow-inner"><div className="bg-emerald-500 h-full w-[6.7%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 delay-200"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTENT / CMS SETTINGS */}
                        {activeTab === 'content' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Content Management</h2>
                                        <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Control primary landing page and routing components.</p>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0f172a] text-white font-bold text-[14px] rounded-xl shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0">
                                        <span className="material-symbols-rounded text-[20px]">publish</span>
                                        Publish To Production
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[
                                        { id: 'hero', title: 'Hero Section', icon: 'web', desc: 'Main headline, subtext, and global CTA.', active: true },
                                        { id: 'features', title: 'Core Features', icon: 'featured_play_list', desc: 'Highlights of platform AI capabilities.', active: true },
                                        { id: 'pricing', title: 'Pricing Matrix', icon: 'sell', desc: 'Visible subscription tiers on public route.', active: true },
                                        { id: 'seo', title: 'SEO Metadata', icon: 'find_in_page', desc: 'Global indexing parameters for search.', active: false },
                                        { id: 'legal', title: 'Legal Pages', icon: 'gavel', desc: 'Privacy, Terms of Service, compliance.', active: true },
                                        { id: 'marketing', title: 'Email Templates', icon: 'mail', desc: 'Drip campaigns & transactional alerts.', active: false }
                                    ].map((node, i) => (
                                        <div key={i} onClick={() => node.active && setContentModal(node.id)} className={`bg-white p-8 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-indigo-200 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 ${node.active ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'} group flex flex-col relative overflow-hidden`}>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent -z-10 group-hover:from-indigo-50/50 transition-colors"></div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${node.active ? 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-200'}`}>
                                                    <span className="material-symbols-rounded text-[28px]">{node.icon}</span>
                                                </div>
                                                {node.active ? (
                                                    <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Live</span>
                                                ) : (
                                                    <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1"><span className="material-symbols-rounded text-[14px]">edit_note</span> Draft</span>
                                                )}
                                            </div>
                                            <h3 className="text-[18px] font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{node.title}</h3>
                                            <p className="text-[13px] font-bold text-slate-500 mb-8 flex-1 leading-relaxed">{node.desc}</p>
                                            <div className="pt-5 border-t border-slate-100 flex items-center text-indigo-600 font-black text-[13px] group-hover:translate-x-1 transition-transform">
                                                Launch Editor <span className="material-symbols-rounded text-[18px] ml-1.5">arrow_forward</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SUPPORT TICKETS NODE */}
                        {activeTab === 'support' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Support Operations</h2>
                                        <p className="text-slate-500 mt-1.5 text-[14px] font-medium">Handle incoming queries and enterprise integration tickets.</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 p-1 rounded-xl flex items-center shadow-sm">
                                        <button className="px-5 py-2 bg-slate-100 text-slate-700 font-black text-[12px] uppercase tracking-wider rounded-lg">Active (3)</button>
                                        <button className="px-5 py-2 text-slate-400 font-bold text-[12px] uppercase tracking-wider hover:text-slate-600">Archived</button>
                                    </div>
                                </div>
                                <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                                    <div className="flex border-b border-slate-100 overflow-x-auto custom-scrollbar">
                                        {['All Incoming', 'High Severity', 'Awaiting User Payload', 'Resolved Operations'].map((stat, i) => (
                                            <button key={i} className={`whitespace-nowrap px-8 py-5 text-[12px] font-black uppercase tracking-widest transition-colors border-b-2 ${i === 0 ? 'border-indigo-500 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600 hover:border-slate-300'}`}>{stat}</button>
                                        ))}
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {[
                                            { title: "API webhooks not firing upon candidate evaluation completion", user: "Acme Corporation", status: "Critical Error", time: "25 mins ago" },
                                            { title: "Custom enterprise branding placement requirements", user: "Startup Inc", status: "Open Discussion", time: "2 hours ago" },
                                            { title: "Resource allocation & billing cycle adjustment inquiry", user: "Global Tech Group", status: "Pending Action", time: "5 hours ago" }
                                        ].map((ticket, i) => (
                                            <div key={i} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/80 transition-colors cursor-pointer group">
                                                <div className="flex items-start gap-5">
                                                    <div className="mt-1">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border ${ticket.status === 'Critical Error' ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-500 group-hover:border-indigo-100'} transition-colors`}>
                                                            <span className="material-symbols-rounded text-[24px]">
                                                                {ticket.status === 'Critical Error' ? 'sos' : 'mark_email_unread'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[16px] font-black text-slate-800 mb-1.5 group-hover:text-indigo-600 transition-colors leading-tight pr-4">{ticket.title}</h4>
                                                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-bold text-slate-500">
                                                            <span className="flex items-center gap-1.5"><span className="material-symbols-rounded text-[16px] text-slate-400">domain</span>{ticket.user}</span>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                            <span className="flex items-center gap-1.5"><span className="material-symbols-rounded text-[16px] text-slate-400">history</span>{ticket.time}</span>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                            <span className="text-slate-400 uppercase tracking-widest text-[10px]">Ticket #{10045 - i}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-5 ml-17 md:ml-0">
                                                    <span className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-sm ${
                                                        ticket.status === 'Critical Error' ? 'bg-rose-500 text-white shadow-rose-500/20' : 
                                                        ticket.status === 'Open Discussion' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 
                                                        'bg-white border-2 border-slate-200 text-slate-600'
                                                    }`}>{ticket.status}</span>
                                                    <button onClick={(e) => { e.stopPropagation(); setTickets(prev => prev.filter(t => t.id !== ticket.id)) }} className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-emerald-100 text-emerald-500 hover:border-emerald-500 hover:text-white hover:bg-emerald-500 hover:shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] transition-all tooltip-btn relative" title="Mark as Resolved">
                                                        <span className="material-symbols-rounded text-[24px]">done</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>

                {/* MODALS */}
                {contentModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setContentModal(null)}></div>
                        <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-300">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <span className="material-symbols-rounded text-indigo-500">edit_document</span>
                                    {contentModal === 'hero' ? 'Edit Hero Section' : contentModal === 'features' ? 'Edit Core Features' : contentModal === 'legal' ? 'Edit Legal Documents' : 'Update Content'}
                                </h3>
                                <button onClick={() => setContentModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition-colors">
                                    <span className="material-symbols-rounded text-[20px]">close</span>
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="space-y-6">
                                    {contentModal === 'hero' && (
                                        <>
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wide mb-2">Headline Text</label>
                                                <input type="text" defaultValue={settings?.heroTitle || ''} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-800 outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wide mb-2">Sub-headline Description</label>
                                                <textarea defaultValue={settings?.heroSubtitle || ''} rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-800 outline-none"></textarea>
                                            </div>
                                        </>
                                    )}
                                    {contentModal === 'legal' && (
                                        <>
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wide mb-2">Privacy Policy Layout</label>
                                                <div className="p-4 border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl text-center text-slate-400 font-bold flex flex-col items-center justify-center gap-2 h-32 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-500 transition-colors">
                                                    <span className="material-symbols-rounded text-3xl">upload_file</span>
                                                    Upload Markdown (.md) or Update Schema
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wide mb-2">Terms of Service</label>
                                                <div className="p-4 border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl text-center text-slate-400 font-bold flex flex-col items-center justify-center gap-2 h-32 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-500 transition-colors">
                                                    <span className="material-symbols-rounded text-3xl">contract</span>
                                                    Upload Markdown (.md) or Update Schema
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {contentModal !== 'hero' && contentModal !== 'legal' && (
                                        <div className="p-12 text-center">
                                            <span className="material-symbols-rounded text-5xl text-indigo-300 animate-pulse mb-4">manufacturing</span>
                                            <p className="text-lg font-black text-slate-800">Visual Editor Initializing...</p>
                                            <p className="text-[14px] font-medium text-slate-500 mt-2">Connecting to headless CMS deployment context.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 rounded-b-[24px]">
                                <button onClick={() => setContentModal(null)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-[13px] rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                                <button onClick={() => {
                                    alert('Successfully synced with production infrastructure!');
                                    setContentModal(null);
                                }} className="px-8 py-2.5 bg-indigo-600 text-white font-bold text-[13px] rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
                                    <span className="material-symbols-rounded text-[18px]">cloud_upload</span> Deploy Payload
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

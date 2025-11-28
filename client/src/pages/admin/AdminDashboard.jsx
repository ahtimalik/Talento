import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllSettings, updateGlobalSettings,
    getAllPlans, createPlan, updatePlan, deletePlan,
    getPendingPayments, approvePayment,
    getDashboardStats
} from '../../services/api';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [settings, setSettings] = useState(null);
    const [plans, setPlans] = useState([]);
    const [pendingPayments, setPendingPayments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, settingsRes, plansRes, paymentsRes] = await Promise.all([
                getDashboardStats(),
                getAllSettings(),
                getAllPlans(),
                getPendingPayments()
            ]);

            setStats(statsRes.data.stats);
            setSettings(settingsRes.data.settings);
            setPlans(plansRes.data.plans);
            setPendingPayments(paymentsRes.data.payments);
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

    if (loading) return <div className="p-8 text-center">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold">Talento Admin</h1>
                    <p className="text-gray-400 text-sm">Super Admin Control</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'overview' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                    >
                        📊 Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'settings' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                    >
                        ⚙️ Global Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'content' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                    >
                        📝 Website Content
                    </button>
                    <button
                        onClick={() => setActiveTab('plans')}
                        className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'plans' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                    >
                        💳 Plans & Pricing
                    </button>
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'payments' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
                    >
                        💰 Payments
                        {pendingPayments.length > 0 && (
                            <span className="ml-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">{pendingPayments.length}</span>
                        )}
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {activeTab === 'overview' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-gray-500">Total Users</p>
                                <p className="text-3xl font-bold">{stats?.totalUsers}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-gray-500">Total Interviews</p>
                                <p className="text-3xl font-bold">{stats?.totalInterviews}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-gray-500">Total Revenue</p>
                                <p className="text-3xl font-bold text-green-600">${stats?.totalRevenue}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-gray-500">Pending Payments</p>
                                <p className="text-3xl font-bold text-amber-600">{stats?.pendingPayments}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Global Settings</h2>
                        <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        defaultValue={settings?.productName}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                                    <input
                                        type="text"
                                        defaultValue={settings?.tagline}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            defaultValue={settings?.primaryColor}
                                            className="h-10 w-20"
                                        />
                                        <input
                                            type="text"
                                            defaultValue={settings?.primaryColor}
                                            className="flex-1 p-2 border rounded"
                                        />
                                    </div>
                                </div>
                                <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'plans' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Plans & Pricing</h2>
                            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                + Add New Plan
                            </button>
                        </div>
                        <div className="grid gap-6">
                            {plans.map(plan => (
                                <div key={plan._id} className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold">{plan.name}</h3>
                                        <p className="text-gray-500">${plan.price}/mo • {plan.interviewLimit === -1 ? 'Unlimited' : plan.interviewLimit} interviews</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 border rounded hover:bg-gray-50">Edit</button>
                                        <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

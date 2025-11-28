import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHRDashboard } from '../../services/api';
import CreateInterviewModal from '../../components/hr/CreateInterviewModal';
import UpgradeModal from '../../components/hr/UpgradeModal';

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getHRDashboard();
            setDashboardData(res.data.dashboard);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleInterviewCreated = (newInterview) => {
        fetchData(); // Refresh data to show new interview and update count
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl text-gray-600">Loading Dashboard...</div>
            </div>
        );
    }

    const { user, stats, recentInterviews } = dashboardData;
    const isLimitReached = user.interviewLimit !== -1 && user.interviewsUsed >= user.interviewLimit;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-indigo-600">Talento</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">HR DASHBOARD</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.companyName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Welcome & Stats */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
                    <p className="text-gray-600">Here's what's happening with your interviews.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Plan Usage Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase">Current Plan</p>
                                <h3 className="text-2xl font-bold text-indigo-600">{user.plan}</h3>
                            </div>
                            <button
                                onClick={() => setIsUpgradeModalOpen(true)}
                                className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold hover:bg-indigo-100"
                            >
                                UPGRADE
                            </button>
                        </div>
                        <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">Interviews Used</span>
                                <span className="text-gray-500">
                                    {user.interviewsUsed} / {user.interviewLimit === -1 ? '∞' : user.interviewLimit}
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${isLimitReached ? 'bg-red-500' : 'bg-indigo-600'}`}
                                    style={{
                                        width: user.interviewLimit === -1 ? '5%' : `${Math.min((user.interviewsUsed / user.interviewLimit) * 100, 100)}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                        {isLimitReached && (
                            <p className="text-xs text-red-600 mt-2 font-medium">
                                ⚠️ Limit reached. Upgrade to continue interviewing.
                            </p>
                        )}
                    </div>

                    {/* Total Interviews */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <p className="text-sm text-gray-500 font-medium uppercase mb-1">Total Interviews</p>
                        <p className="text-4xl font-bold text-gray-900">{stats.totalInterviews}</p>
                    </div>

                    {/* Completed */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <p className="text-sm text-gray-500 font-medium uppercase mb-1">Completed</p>
                        <p className="text-4xl font-bold text-green-600">{stats.completedInterviews}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Interviews</h2>
                    <button
                        onClick={() => {
                            if (isLimitReached) {
                                setIsUpgradeModalOpen(true);
                            } else {
                                setIsCreateModalOpen(true);
                            }
                        }}
                        className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition ${isLimitReached
                                ? 'bg-amber-500 hover:bg-amber-600'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {isLimitReached ? 'Upgrade to Create' : '+ Create New Interview'}
                    </button>
                </div>

                {/* Interviews List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {recentInterviews.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <p className="text-lg mb-2">No interviews yet.</p>
                            <p>Create your first interview link to get started!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Job Title</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Candidate</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentInterviews.map((interview) => (
                                        <tr key={interview._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-medium text-gray-900">{interview.jobTitle}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {interview.candidateName || <span className="italic text-gray-400">Pending...</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${interview.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                        interview.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {interview.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(interview.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {interview.status === 'completed' ? (
                                                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                                                        View Report
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(`${window.location.origin}/interview/${interview.uniqueLink || ''}`);
                                                            alert('Link copied to clipboard!');
                                                        }}
                                                        className="text-gray-500 hover:text-gray-700 font-medium text-sm"
                                                    >
                                                        Copy Link
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Modals */}
            <CreateInterviewModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleInterviewCreated}
            />

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
            />
        </div>
    );
}

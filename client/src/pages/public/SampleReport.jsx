import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSampleReport } from '../../services/api';

export default function SampleReport() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await getSampleReport();
                setReport(res.data.report);
            } catch (error) {
                console.error('Error fetching sample report:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading sample report...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-indigo-600 text-white p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Interview Report</h1>
                                <p className="opacity-90">Candidate Analysis & Insights</p>
                            </div>
                            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <span className="text-sm font-semibold">SAMPLE REPORT</span>
                            </div>
                        </div>
                    </div>

                    {/* Candidate Info */}
                    <div className="p-8 border-b border-gray-200 bg-gray-50">
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Candidate</p>
                                <p className="text-xl font-bold text-gray-900">{report?.candidateName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Role</p>
                                <p className="text-xl font-bold text-gray-900">{report?.jobTitle}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Date</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {new Date(report?.completedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scores & Summary */}
                    <div className="p-8 grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <div className="bg-indigo-50 rounded-xl p-6 text-center">
                                <p className="text-sm text-indigo-600 font-bold uppercase mb-2">Confidence Score</p>
                                <div className="text-5xl font-extrabold text-indigo-600 mb-2">
                                    {report?.aiAnalysis?.confidenceScore}%
                                </div>
                                <p className="text-xs text-gray-500">Based on AI evaluation of technical accuracy and communication.</p>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Executive Summary</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {report?.aiAnalysis?.summary}
                            </p>
                        </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="px-8 pb-8 grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                                <span>✓</span> Key Strengths
                            </h3>
                            <ul className="space-y-3">
                                {report?.aiAnalysis?.strengths.map((strength, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700 bg-green-50 p-3 rounded-lg">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                                <span>!</span> Areas for Improvement
                            </h3>
                            <ul className="space-y-3">
                                {report?.aiAnalysis?.concerns.map((concern, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700 bg-amber-50 p-3 rounded-lg">
                                        <span className="text-amber-500 mt-0.5">•</span>
                                        {concern}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Keywords */}
                    <div className="px-8 pb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Detected Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {report?.aiAnalysis?.keywordAnalysis.map((keyword, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="bg-gray-50 p-8 text-center border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Want reports like this?</h3>
                        <p className="text-gray-600 mb-6">Start screening candidates with Talento today.</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Start Free Trial
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-2 text-gray-600 font-semibold hover:text-gray-900"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

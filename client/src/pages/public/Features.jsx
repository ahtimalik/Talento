import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeatures, getSettings } from '../../services/api';

export default function Features() {
    const [features, setFeatures] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [featuresRes, settingsRes] = await Promise.all([
                    getFeatures(),
                    getSettings()
                ]);

                setFeatures(featuresRes.data.features);
                setSettings(settingsRes.data.settings);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading features...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-indigo-600 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Powerful Features for Modern Hiring
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Everything you need to screen candidates faster, fairer, and more effectively.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="text-5xl mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Ready to experience these features?
                    </h2>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Start Free Trial
                        </button>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
                        >
                            View Pricing
                        </button>
                    </div>
                </div>
            </div>

            {/* Back to Home */}
            <div className="text-center py-8 bg-gray-50">
                <button
                    onClick={() => navigate('/')}
                    className="text-indigo-600 font-semibold hover:underline"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}

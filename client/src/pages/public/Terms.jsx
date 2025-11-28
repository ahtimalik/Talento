import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTerms } from '../../services/api';

export default function Terms() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTerms();
                setContent(res.data.content);
            } catch (error) {
                console.error('Error fetching terms:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-wrap">
                    {content}
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <button
                        onClick={() => navigate('/')}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

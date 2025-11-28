import React, { useState } from 'react';
import { createInterview } from '../../services/api';

export default function CreateInterviewModal({ isOpen, onClose, onSuccess }) {
    const [jobTitle, setJobTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await createInterview(jobTitle);
            onSuccess(res.data.interview);
            onClose();
            setJobTitle('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating interview');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4">Create New Interview</h2>
                <p className="text-gray-600 mb-6">
                    Enter the job title to generate a unique interview link. AI will tailor questions for this role.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title
                        </label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g. Senior React Developer"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Link'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

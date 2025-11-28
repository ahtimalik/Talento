import React, { useState, useEffect } from 'react';
import { getPlans, createCheckout, getManualPaymentInstructions, submitManualPayment } from '../../services/api';

export default function UpgradeModal({ isOpen, onClose }) {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('stripe'); // stripe or manual
    const [manualInstructions, setManualInstructions] = useState(null);
    const [screenshot, setScreenshot] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
            const [plansRes, instructionsRes] = await Promise.all([
                getPlans(),
                getManualPaymentInstructions()
            ]);
            setPlans(plansRes.data.plans.filter(p => !p.isCustom)); // Exclude custom plans
            setManualInstructions(instructionsRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching upgrade data:', error);
        }
    };

    const handleStripeCheckout = async (planId) => {
        setSubmitting(true);
        try {
            const res = await createCheckout(planId);
            window.location.href = res.data.checkoutUrl;
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to start checkout. Please try again.');
            setSubmitting(false);
        }
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPlan || !screenshot) {
            alert('Please select a plan and upload a screenshot.');
            return;
        }

        setSubmitting(true);
        try {
            await submitManualPayment({
                planId: selectedPlan.id,
                screenshotUrl: screenshot, // Sending base64 string
                notes
            });
            setSuccessMsg('Payment submitted! Admin will approve shortly.');
            setTimeout(() => {
                onClose();
                setSuccessMsg(null);
                setScreenshot('');
                setNotes('');
            }, 3000);
        } catch (error) {
            console.error('Manual payment error:', error);
            alert('Failed to submit payment.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshot(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Upgrade Your Plan</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading plans...</div>
                ) : successMsg ? (
                    <div className="text-center py-12 text-green-600">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold">{successMsg}</h3>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left: Plan Selection */}
                        <div>
                            <h3 className="font-bold text-gray-700 mb-4">1. Select a Plan</h3>
                            <div className="space-y-4">
                                {plans.map(plan => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition ${selectedPlan?.id === plan.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-lg">{plan.name}</h4>
                                            <span className="font-bold text-indigo-600">${plan.price}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {plan.interviewLimit === -1 ? 'Unlimited' : plan.interviewLimit} interviews/month
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Payment Method */}
                        <div>
                            <h3 className="font-bold text-gray-700 mb-4">2. Payment Method</h3>

                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setPaymentMethod('stripe')}
                                    className={`flex-1 py-3 rounded-lg font-medium border ${paymentMethod === 'stripe' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}
                                >
                                    Credit Card (Stripe)
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('manual')}
                                    className={`flex-1 py-3 rounded-lg font-medium border ${paymentMethod === 'manual' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}
                                >
                                    Manual / Local
                                </button>
                            </div>

                            {paymentMethod === 'stripe' ? (
                                <div className="bg-gray-50 p-6 rounded-xl text-center">
                                    <p className="mb-4 text-gray-600">Secure payment via Stripe. Cancel anytime.</p>
                                    <button
                                        onClick={() => selectedPlan && handleStripeCheckout(selectedPlan.id)}
                                        disabled={!selectedPlan || submitting}
                                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? 'Processing...' : selectedPlan ? `Pay $${selectedPlan.price} via Stripe` : 'Select a Plan First'}
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-sm text-gray-600 mb-4 whitespace-pre-wrap">
                                        {manualInstructions?.instructions}
                                    </p>

                                    {manualInstructions?.payoutAccounts?.map((acc, idx) => (
                                        <div key={idx} className="mb-4 p-3 bg-white rounded border border-gray-200 text-sm">
                                            <p className="font-bold text-gray-800">{acc.type.toUpperCase()}</p>
                                            <p className="text-gray-600">{acc.details}</p>
                                            <p className="font-mono bg-gray-100 p-1 mt-1 rounded">{acc.accountNumber}</p>
                                        </div>
                                    ))}

                                    <form onSubmit={handleManualSubmit} className="space-y-4 mt-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Upload Screenshot</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="w-full text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Notes (Transaction ID)</label>
                                            <input
                                                type="text"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                className="w-full p-2 border rounded text-sm"
                                                placeholder="e.g. TRX-123456789"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!selectedPlan || !screenshot || submitting}
                                            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit for Approval'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

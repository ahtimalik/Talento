import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInterviewByLink, startInterview, submitInterview } from '../../services/api';
import { Play, CheckCircle, Clock } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

export default function Interview() {
    const { link } = useParams();
    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Registration state
    const [candidateName, setCandidateName] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    // Interview state
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Fetch the interview details on load
        fetchInterview();
    }, [link]);

    const fetchInterview = async () => {
        try {
            const res = await getInterviewByLink(link);
            setInterview(res.data.interview);
            
            if (res.data.interview.status === 'completed') {
                setIsCompleted(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Interview link is invalid or expired.');
        } finally {
            setLoading(false);
        }
    };

    const handleStart = async (e) => {
        e.preventDefault();
        setIsRegistering(true);
        setError(null);

        try {
            const res = await startInterview(link, { candidateName, candidateEmail });
            setQuestions(res.data.questions);
            // Initialize answers array
            setAnswers(new Array(res.data.questions.length).fill(''));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to start interview.');
        } finally {
            setIsRegistering(false);
        }
    };

    const handleNextQuestion = () => {
        // Save current answer
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = currentAnswer;
        setAnswers(newAnswers);

        // Move to next or submit
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentAnswer(newAnswers[currentQuestionIndex + 1] || '');
        } else {
            handleSubmitFinal(newAnswers);
        }
    };

    const handleSubmitFinal = async (finalAnswers) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const formattedAnswers = questions.map((q, idx) => ({
                question: q,
                answer: finalAnswers[idx] || 'No answer provided.'
            }));

            await submitInterview(link, { answers: formattedAnswers });
            setIsCompleted(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit answers.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button onClick={() => navigate('/')} className="text-indigo-600 font-medium hover:underline">Return Home</button>
                </div>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full text-center">
                    <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">You're All Set!</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Your interview for the <span className="font-bold text-gray-900">{interview?.jobTitle}</span> role has been successfully submitted and scored by AI. 
                        The HR team will be in touch with you shortly regarding the next steps.
                    </p>
                    <PrimaryButton onClick={() => window.location.href = 'https://google.com'} className="w-full">
                        Close Assessment
                    </PrimaryButton>
                </div>
            </div>
        );
    }

    // Step 1: Registration Form before starting
    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
                    <div className="font-bold text-xl text-gray-900 tracking-tight">Talento</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                        <Clock size={14} /> AI Proctoring Active
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your interview</h2>
                            <p className="text-gray-500">You have been invited to interview for the <strong className="text-indigo-600">{interview.jobTitle}</strong> position.</p>
                        </div>

                        <form onSubmit={handleStart} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={candidateName}
                                    onChange={e => setCandidateName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={candidateEmail}
                                    onChange={e => setCandidateEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="pt-4 border-t border-gray-100 mt-6">
                                <PrimaryButton
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 text-lg"
                                    disabled={isRegistering}
                                >
                                    {isRegistering ? 'Generating AI Questions...' : 'Start Assessment'} <Play size={18} />
                                </PrimaryButton>
                                <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                                    By starting this assessment, you agree to being automatically evaluated by AI and consent to proctoring tracking rules.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: The Interview Questions Interface
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="font-bold text-xl text-gray-900 tracking-tight">Talento</div>
                <div className="flex items-center gap-6">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest hidden sm:block">
                        {interview.jobTitle}
                    </div>
                    <div className="flex gap-1">
                        {questions.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-2.5 w-8 rounded-full transition-colors ${idx <= currentQuestionIndex ? 'bg-indigo-600' : 'bg-gray-200'}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Question Workspace */}
            <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 md:p-12 flex flex-col">
                <div className="mb-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                    {questions[currentQuestionIndex]}
                </h1>

                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                    <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <span>Your Response</span>
                        <span>Auto-saving</span>
                    </div>
                    <textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        className="flex-1 w-full p-6 resize-none outline-none text-gray-800 text-lg leading-relaxed placeholder:text-gray-300"
                        placeholder="Type your detailed response here..."
                        autoFocus
                    />
                </div>

                <div className="mt-8 flex justify-end">
                    <PrimaryButton 
                        onClick={handleNextQuestion} 
                        disabled={isSubmitting || currentAnswer.trim() === ''}
                        className="px-10 py-4 text-lg shadow-xl"
                    >
                        {isSubmitting ? 'Evaluating...' : isLastQuestion ? 'Submit Assessment' : 'Next Question'}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

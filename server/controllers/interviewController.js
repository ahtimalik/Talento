import Interview from '../models/Interview.js';
import HR from '../models/HR.js';
import { nanoid } from 'nanoid';

// Create a new interview link
export const createInterview = async (req, res) => {
    try {
        const { jobTitle } = req.body;
        const hrId = req.user.id;

        if (!jobTitle) {
            return res.status(400).json({ success: false, message: 'Job title is required' });
        }

        // Generate unique link ID
        const uniqueLink = nanoid(10);

        // Create interview
        const interview = await Interview.create({
            hrId,
            jobTitle,
            uniqueLink,
            status: 'pending'
        });

        // Increment HR's interview count
        await HR.findByIdAndUpdate(hrId, { $inc: { interviewsUsed: 1 } });

        res.status(201).json({
            success: true,
            message: 'Interview created successfully',
            interview: {
                id: interview._id,
                jobTitle: interview.jobTitle,
                uniqueLink: interview.uniqueLink,
                shareUrl: `${process.env.CLIENT_ORIGIN}/interview/${interview.uniqueLink}`,
                status: interview.status,
                createdAt: interview.createdAt
            }
        });
    } catch (error) {
        console.error('Create interview error:', error);
        res.status(500).json({ success: false, message: 'Error creating interview' });
    }
};

// Get interview by unique link (for candidate)
export const getInterviewByLink = async (req, res) => {
    try {
        const { link } = req.params;

        const interview = await Interview.findOne({ uniqueLink: link });

        if (!interview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        // Check if already completed
        if (interview.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'This interview has already been completed'
            });
        }

        res.json({
            success: true,
            interview: {
                id: interview._id,
                jobTitle: interview.jobTitle,
                status: interview.status
            }
        });
    } catch (error) {
        console.error('Get interview error:', error);
        res.status(500).json({ success: false, message: 'Error fetching interview' });
    }
};

// Start interview (candidate provides name/email)
export const startInterview = async (req, res) => {
    try {
        const { link } = req.params;
        const { candidateName, candidateEmail } = req.body;

        if (!candidateName || !candidateEmail) {
            return res.status(400).json({
                success: false,
                message: 'Candidate name and email are required'
            });
        }

        const interview = await Interview.findOne({ uniqueLink: link });

        if (!interview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        if (interview.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'This interview has already been completed'
            });
        }

        // Update interview with candidate info
        interview.candidateName = candidateName;
        interview.candidateEmail = candidateEmail;
        interview.status = 'in-progress';
        interview.startedAt = new Date();

        // Generate initial AI questions (placeholder - will integrate OpenAI later)
        const initialQuestions = [
            { question: `Tell me about your experience relevant to ${interview.jobTitle}.`, askedAt: new Date() },
            { question: 'What are your key strengths for this role?', askedAt: new Date() },
            { question: 'Describe a challenging project you worked on.', askedAt: new Date() }
        ];

        interview.questions = initialQuestions;
        await interview.save();

        res.json({
            success: true,
            message: 'Interview started',
            questions: initialQuestions.map(q => q.question)
        });
    } catch (error) {
        console.error('Start interview error:', error);
        res.status(500).json({ success: false, message: 'Error starting interview' });
    }
};

// Submit interview answers
export const submitInterview = async (req, res) => {
    try {
        const { link } = req.params;
        const { answers } = req.body; // Array of { question, answer }

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ success: false, message: 'Answers are required' });
        }

        const interview = await Interview.findOne({ uniqueLink: link });

        if (!interview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        // Save answers
        interview.answers = answers.map(a => ({
            question: a.question,
            answer: a.answer,
            answeredAt: new Date()
        }));

        // Generate AI analysis (placeholder - will integrate OpenAI later)
        interview.aiAnalysis = {
            summary: 'Candidate demonstrates good understanding of the role requirements.',
            confidenceScore: 75,
            keywordAnalysis: ['experienced', 'motivated', 'team player'],
            strengths: ['Good communication', 'Relevant experience'],
            concerns: ['Limited technical depth in some areas'],
            recommendation: 'Recommended for next round'
        };

        interview.status = 'completed';
        interview.completedAt = new Date();
        await interview.save();

        res.json({
            success: true,
            message: 'Interview submitted successfully',
            interview: {
                id: interview._id,
                status: interview.status
            }
        });
    } catch (error) {
        console.error('Submit interview error:', error);
        res.status(500).json({ success: false, message: 'Error submitting interview' });
    }
};

// Get all interviews for HR user
export const getHRInterviews = async (req, res) => {
    try {
        const hrId = req.user.id;

        const interviews = await Interview.find({ hrId })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.json({
            success: true,
            interviews: interviews.map(i => ({
                id: i._id,
                jobTitle: i.jobTitle,
                candidateName: i.candidateName,
                candidateEmail: i.candidateEmail,
                status: i.status,
                confidenceScore: i.aiAnalysis?.confidenceScore,
                createdAt: i.createdAt,
                completedAt: i.completedAt,
                uniqueLink: i.uniqueLink
            }))
        });
    } catch (error) {
        console.error('Get HR interviews error:', error);
        res.status(500).json({ success: false, message: 'Error fetching interviews' });
    }
};

// Get single interview report (for HR)
export const getInterviewReport = async (req, res) => {
    try {
        const { id } = req.params;
        const hrId = req.user.id;

        const interview = await Interview.findOne({ _id: id, hrId });

        if (!interview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        res.json({
            success: true,
            report: {
                id: interview._id,
                jobTitle: interview.jobTitle,
                candidateName: interview.candidateName,
                candidateEmail: interview.candidateEmail,
                questions: interview.questions,
                answers: interview.answers,
                aiAnalysis: interview.aiAnalysis,
                status: interview.status,
                createdAt: interview.createdAt,
                completedAt: interview.completedAt
            }
        });
    } catch (error) {
        console.error('Get interview report error:', error);
        res.status(500).json({ success: false, message: 'Error fetching report' });
    }
};

// Get HR dashboard stats
export const getHRDashboard = async (req, res) => {
    try {
        const hrId = req.user.id;

        const hr = await HR.findById(hrId).populate('currentPlan');
        const totalInterviews = await Interview.countDocuments({ hrId });
        const completedInterviews = await Interview.countDocuments({ hrId, status: 'completed' });
        const pendingInterviews = await Interview.countDocuments({ hrId, status: 'pending' });

        const recentInterviews = await Interview.find({ hrId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('jobTitle candidateName status createdAt completedAt');

        res.json({
            success: true,
            dashboard: {
                user: {
                    name: hr.name,
                    email: hr.email,
                    companyName: hr.companyName,
                    plan: hr.currentPlan ? hr.currentPlan.name : 'Free',
                    interviewsUsed: hr.interviewsUsed,
                    interviewLimit: hr.currentPlan ? hr.currentPlan.interviewLimit : 5
                },
                stats: {
                    totalInterviews,
                    completedInterviews,
                    pendingInterviews
                },
                recentInterviews
            }
        });
    } catch (error) {
        console.error('Get HR dashboard error:', error);
        res.status(500).json({ success: false, message: 'Error fetching dashboard' });
    }
};

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const interviewSchema = new Schema(
    {
        hrId: { type: Schema.Types.ObjectId, ref: 'HR', required: true },
        jobTitle: { type: String, required: true, trim: true },
        uniqueLink: { type: String, required: true, unique: true },

        // Candidate Info
        candidateName: { type: String, default: '' },
        candidateEmail: { type: String, default: '' },

        // Interview Content
        questions: [{
            question: String,
            askedAt: Date
        }],

        answers: [{
            question: String,
            answer: String,
            answeredAt: Date
        }],

        // AI Analysis
        aiAnalysis: {
            summary: String,
            confidenceScore: Number, // 0-100
            keywordAnalysis: [String],
            strengths: [String],
            concerns: [String],
            recommendation: String
        },

        // Status
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed', 'expired'],
            default: 'pending'
        },

        startedAt: { type: Date },
        completedAt: { type: Date },
        expiresAt: { type: Date } // Optional: interviews can expire after X days
    },
    {
        timestamps: true
    }
);

// Index for fast lookups
interviewSchema.index({ uniqueLink: 1 });
interviewSchema.index({ hrId: 1, createdAt: -1 });

const Interview = mongoose.models.Interview || model('Interview', interviewSchema);

export default Interview;

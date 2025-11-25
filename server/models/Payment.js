import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
    {
        hrId: { type: Schema.Types.ObjectId, ref: 'HR', required: true },
        planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },

        amount: { type: Number, required: true },
        currency: { type: String, default: 'USD' },

        method: {
            type: String,
            enum: ['stripe', 'manual'],
            required: true
        },

        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending'
        },

        // Stripe specific
        stripeSessionId: { type: String, default: '' },
        stripePaymentIntentId: { type: String, default: '' },

        // Manual payment specific
        screenshotUrl: { type: String, default: '' },
        manualPaymentNotes: { type: String, default: '' },

        // Approval (for manual payments)
        approvedBy: { type: Schema.Types.ObjectId, ref: 'HR' }, // Super Admin
        approvedAt: { type: Date },
        rejectionReason: { type: String, default: '' },

        // Metadata
        metadata: { type: Schema.Types.Mixed, default: {} }
    },
    {
        timestamps: true
    }
);

// Index for lookups
paymentSchema.index({ hrId: 1, createdAt: -1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ stripeSessionId: 1 });

const Payment = mongoose.models.Payment || model('Payment', paymentSchema);

export default Payment;

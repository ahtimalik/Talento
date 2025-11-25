import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const planSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, default: 0 }, // USD
        currency: { type: String, default: 'USD' },
        interviewLimit: { type: Number, default: 5 }, // -1 for unlimited
        features: [{ type: String }],
        isActive: { type: Boolean, default: true },
        isCustom: { type: Boolean, default: false }, // Custom plan shows "Contact Us"
        displayOrder: { type: Number, default: 0 },
        isRecommended: { type: Boolean, default: false },
        stripePriceId: { type: String, default: '' } // Stripe Price ID for checkout
    },
    {
        timestamps: true
    }
);

const Plan = mongoose.models.Plan || model('Plan', planSchema);

export default Plan;

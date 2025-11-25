import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema, model } = mongoose

const hrSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    companyName: { type: String, default: '' },

    // Role (for Super Admin)
    role: { type: String, enum: ['hr', 'superadmin'], default: 'hr' },

    // Plan & Usage
    currentPlan: { type: Schema.Types.ObjectId, ref: 'Plan' },
    interviewsUsed: { type: Number, default: 0 },
    planExpiresAt: { type: Date }, // For subscription plans

    // Payment
    stripeCustomerId: { type: String, default: '' },
    paymentStatus: {
      type: String,
      enum: ['active', 'pending', 'expired', 'cancelled'],
      default: 'active'
    },

    // Legacy field (keeping for backward compatibility)
    interviewCount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

// Hash password before saving when it's new or modified
hrSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Instance method to compare password
hrSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const HR = mongoose.models.HR || model('HR', hrSchema)

export default HR

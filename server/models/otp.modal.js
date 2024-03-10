import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
);

// Set TTL index on created_at field
otpSchema.index({ created_at: 1 }, { expireAfterSeconds: 300 }); // Expiry time: 5 minutes

// Create the model
const otpModal = mongoose.model('OTP', otpSchema);

export default otpModal;
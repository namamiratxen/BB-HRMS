import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  specialties: [{
    type: String,
    required: true
  }],
  qualifications: [{
    degree: String,
    institution: String,
    year: Number,
    certificateUrl: String
  }],
  experience: {
    years: {
      type: Number,
      required: true,
      min: 0
    },
    previousPositions: [{
      hospital: String,
      position: String,
      startDate: Date,
      endDate: Date
    }]
  },
  consultationFee: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  availability: [{
    dayOfWeek: {
      type: Number,
      min: 0,
      max: 6 // 0 = Sunday, 6 = Saturday
    },
    startTime: String, // Format: "09:00"
    endTime: String,   // Format: "17:00"
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  languages: [String],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  verification: {
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    documents: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  achievements: [String],
  publications: [String]
}, {
  timestamps: true
});

// Compound index for efficient queries
doctorSchema.index({ tenantId: 1, hospitalId: 1, isActive: 1 });
doctorSchema.index({ specialties: 1, 'rating.average': -1 });

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
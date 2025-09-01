import mongoose from 'mongoose';

const treatmentPackageSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['cardiology', 'oncology', 'orthopedics', 'neurology', 'cosmetic', 'dental', 'eye_care', 'fertility', 'transplant', 'general']
  },
  procedures: [{
    name: String,
    description: String,
    duration: String, // e.g., "2-3 hours"
    isIncluded: {
      type: Boolean,
      default: true
    }
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    inclusions: [String],
    exclusions: [String],
    additionalCosts: [{
      item: String,
      cost: Number,
      isOptional: Boolean
    }]
  },
  duration: {
    hospital_stay: String, // e.g., "3-5 days"
    total_recovery: String, // e.g., "2-3 weeks"
    follow_up: String
  },
  requirements: {
    preOperative: [String],
    postOperative: [String],
    contraindications: [String]
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  images: [String],
  successRate: {
    type: Number,
    min: 0,
    max: 100
  },
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
  isActive: {
    type: Boolean,
    default: true
  },
  isPromoted: {
    type: Boolean,
    default: false
  },
  tags: [String],
  metadata: {
    minAge: Number,
    maxAge: Number,
    genderRestriction: {
      type: String,
      enum: ['male', 'female', 'any'],
      default: 'any'
    }
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
treatmentPackageSchema.index({ category: 1, 'pricing.basePrice': 1 });
treatmentPackageSchema.index({ hospitalId: 1, isActive: 1 });
treatmentPackageSchema.index({ 'rating.average': -1, isPromoted: -1 });

export default mongoose.models.TreatmentPackage || mongoose.model('TreatmentPackage', treatmentPackageSchema);
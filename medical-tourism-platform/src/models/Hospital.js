import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['hospital', 'clinic', 'diagnostic_center', 'specialty_center'],
    required: true
  },
  specialties: [String],
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    website: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    }
  },
  accreditations: [{
    name: String,
    issuedBy: String,
    validUntil: Date,
    certificateUrl: String
  }],
  facilities: [String],
  images: [String],
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
  metadata: {
    establishedYear: Number,
    bedCount: Number,
    doctorCount: Number,
    staffCount: Number
  }
}, {
  timestamps: true
});

// Index for geospatial queries
hospitalSchema.index({ 'contact.address.coordinates': '2dsphere' });

export default mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema);
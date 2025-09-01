import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subdomain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['hospital', 'clinic', 'partner', 'vendor', 'platform'],
    required: true
  },
  subscription: {
    plan: {
      type: String,
      enum: ['individual', 'team', 'very_small_business', 'smb', 'mmb', 'lmb', 'enterprise'],
      default: 'individual'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended', 'trial'],
      default: 'trial'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    features: [String]
  },
  settings: {
    timezone: {
      type: String,
      default: 'UTC'
    },
    currency: {
      type: String,
      default: 'USD'
    },
    language: {
      type: String,
      default: 'en'
    },
    branding: {
      logo: String,
      primaryColor: {
        type: String,
        default: '#10b981'
      },
      secondaryColor: {
        type: String,
        default: '#059669'
      }
    }
  },
  contact: {
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    registrationNumber: String,
    taxId: String,
    accreditations: [String],
    licenses: [String]
  }
}, {
  timestamps: true
});

export default mongoose.models.Tenant || mongoose.model('Tenant', tenantSchema);
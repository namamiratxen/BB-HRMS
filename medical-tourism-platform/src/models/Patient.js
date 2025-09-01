import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
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
  patientId: {
    type: String,
    unique: true,
    required: true
  },
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    treatment: String,
    doctor: String,
    hospital: String,
    notes: String,
    documents: [String]
  }],
  allergies: [String],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    prescribedBy: String
  }],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  insurance: {
    provider: String,
    policyNumber: String,
    validUntil: Date,
    coverage: String
  },
  preferences: {
    language: String,
    currency: String,
    timezone: String,
    communicationMethod: {
      type: String,
      enum: ['email', 'sms', 'phone', 'app'],
      default: 'email'
    }
  },
  documents: [{
    type: String,
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  travelHistory: [{
    destination: String,
    purpose: String,
    startDate: Date,
    endDate: Date,
    notes: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate unique patient ID
patientSchema.pre('save', async function(next) {
  if (!this.patientId) {
    const count = await mongoose.model('Patient').countDocuments();
    this.patientId = `PAT${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);
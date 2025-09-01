import connectDB from './mongodb.js';
import User from '../models/User.js';
import Tenant from '../models/Tenant.js';
import Hospital from '../models/Hospital.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import TreatmentPackage from '../models/TreatmentPackage.js';

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Tenant.deleteMany({}),
      Hospital.deleteMany({}),
      Doctor.deleteMany({}),
      Patient.deleteMany({}),
      TreatmentPackage.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create Platform Tenant
    const platformTenant = new Tenant({
      name: 'MedTourism Platform',
      subdomain: 'platform',
      type: 'platform',
      subscription: {
        plan: 'enterprise',
        status: 'active'
      },
      settings: {
        currency: 'USD',
        language: 'en',
        branding: {
          primaryColor: '#10b981',
          secondaryColor: '#059669'
        }
      }
    });
    await platformTenant.save();

    // Create Hospital Tenants
    const apolloTenant = new Tenant({
      name: 'Apollo Hospitals',
      subdomain: 'apollo',
      type: 'hospital',
      subscription: {
        plan: 'enterprise',
        status: 'active'
      },
      contact: {
        email: 'admin@apollo.com',
        phone: '+91-44-2829-3333'
      }
    });
    await apolloTenant.save();

    const fortisTenant = new Tenant({
      name: 'Fortis Healthcare',
      subdomain: 'fortis',
      type: 'hospital',
      subscription: {
        plan: 'enterprise',
        status: 'active'
      },
      contact: {
        email: 'admin@fortis.com',
        phone: '+91-11-4277-6222'
      }
    });
    await fortisTenant.save();

    // Create Super Admin
    const superAdmin = new User({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@medtourism.com',
      password: 'password123',
      role: 'super_admin',
      tenantId: platformTenant._id,
      permissions: [{ resource: '*', actions: ['create', 'read', 'update', 'delete'] }],
      isVerified: true
    });
    await superAdmin.save();

    // Create Hospital Admins
    const apolloAdmin = new User({
      firstName: 'Apollo',
      lastName: 'Admin',
      email: 'admin@apollo.com',
      password: 'password123',
      role: 'hospital_admin',
      tenantId: apolloTenant._id,
      permissions: [
        { resource: 'hospital', actions: ['read', 'update'] },
        { resource: 'doctors', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'treatment_packages', actions: ['create', 'read', 'update', 'delete'] }
      ],
      isVerified: true
    });
    await apolloAdmin.save();

    const fortisAdmin = new User({
      firstName: 'Fortis',
      lastName: 'Admin',
      email: 'admin@fortis.com',
      password: 'password123',
      role: 'hospital_admin',
      tenantId: fortisTenant._id,
      permissions: [
        { resource: 'hospital', actions: ['read', 'update'] },
        { resource: 'doctors', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'treatment_packages', actions: ['create', 'read', 'update', 'delete'] }
      ],
      isVerified: true
    });
    await fortisAdmin.save();

    // Create Hospitals
    const apolloHospital = new Hospital({
      tenantId: apolloTenant._id,
      name: 'Apollo Hospitals Chennai',
      description: 'Leading multi-specialty hospital with world-class facilities',
      type: 'hospital',
      specialties: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Transplant'],
      contact: {
        email: 'info@apollo-chennai.com',
        phone: '+91-44-2829-3333',
        website: 'https://apollo.com',
        address: {
          street: '21, Greams Lane',
          city: 'Chennai',
          state: 'Tamil Nadu',
          country: 'India',
          zipCode: '600006',
          coordinates: {
            latitude: 13.0827,
            longitude: 80.2707
          }
        }
      },
      accreditations: [
        {
          name: 'JCI Accreditation',
          issuedBy: 'Joint Commission International',
          validUntil: new Date('2025-12-31')
        }
      ],
      facilities: ['ICU', 'Emergency', 'Surgery', 'Radiology', 'Laboratory'],
      rating: {
        average: 4.8,
        totalReviews: 1250
      },
      verification: {
        status: 'verified',
        verifiedAt: new Date()
      },
      metadata: {
        establishedYear: 1983,
        bedCount: 550,
        doctorCount: 150,
        staffCount: 800
      }
    });
    await apolloHospital.save();

    const fortisHospital = new Hospital({
      tenantId: fortisTenant._id,
      name: 'Fortis Hospital Bangalore',
      description: 'Advanced healthcare with cutting-edge technology',
      type: 'hospital',
      specialties: ['Cardiology', 'Gastroenterology', 'Urology', 'Nephrology'],
      contact: {
        email: 'info@fortis-bangalore.com',
        phone: '+91-80-6621-4444',
        website: 'https://fortis.com',
        address: {
          street: '154/9, Opp IIM-B',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          zipCode: '560076',
          coordinates: {
            latitude: 12.9716,
            longitude: 77.5946
          }
        }
      },
      accreditations: [
        {
          name: 'NABH Accreditation',
          issuedBy: 'National Accreditation Board for Hospitals',
          validUntil: new Date('2025-06-30')
        }
      ],
      facilities: ['Cath Lab', 'CT Scan', 'MRI', 'Dialysis', 'Pharmacy'],
      rating: {
        average: 4.6,
        totalReviews: 890
      },
      verification: {
        status: 'verified',
        verifiedAt: new Date()
      },
      metadata: {
        establishedYear: 2001,
        bedCount: 400,
        doctorCount: 120,
        staffCount: 600
      }
    });
    await fortisHospital.save();

    // Create Doctors
    const doctors = [
      {
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@apollo.com',
        role: 'doctor',
        tenantId: apolloTenant._id,
        hospitalId: apolloHospital._id,
        licenseNumber: 'MED-001-2020',
        specialties: ['Cardiology', 'Interventional Cardiology'],
        experience: { years: 15 },
        consultationFee: { amount: 500, currency: 'USD' }
      },
      {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@apollo.com',
        role: 'doctor',
        tenantId: apolloTenant._id,
        hospitalId: apolloHospital._id,
        licenseNumber: 'MED-002-2020',
        specialties: ['Neurology', 'Stroke Medicine'],
        experience: { years: 12 },
        consultationFee: { amount: 450, currency: 'USD' }
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@fortis.com',
        role: 'doctor',
        tenantId: fortisTenant._id,
        hospitalId: fortisHospital._id,
        licenseNumber: 'MED-003-2020',
        specialties: ['Oncology', 'Medical Oncology'],
        experience: { years: 18 },
        consultationFee: { amount: 600, currency: 'USD' }
      }
    ];

    const createdDoctors = [];
    for (const doctorData of doctors) {
      const { hospitalId, licenseNumber, specialties, experience, consultationFee, ...userData } = doctorData;
      
      // Create user first
      const user = new User({
        ...userData,
        password: 'password123',
        permissions: [
          { resource: 'profile', actions: ['read', 'update'] },
          { resource: 'patients', actions: ['read'] },
          { resource: 'appointments', actions: ['read', 'update'] },
          { resource: 'medical_records', actions: ['read', 'update'] }
        ],
        isVerified: true
      });
      await user.save();

      // Create doctor profile
      const doctor = new Doctor({
        userId: user._id,
        tenantId: userData.tenantId,
        hospitalId,
        licenseNumber,
        specialties,
        experience,
        consultationFee,
        availability: [
          { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
          { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
          { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
          { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
          { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true }
        ],
        languages: ['English', 'Hindi'],
        rating: {
          average: 4.5 + Math.random() * 0.5,
          totalReviews: Math.floor(Math.random() * 100) + 50
        },
        verification: {
          status: 'verified',
          verifiedAt: new Date()
        },
        bio: `Experienced ${specialties[0]} specialist with ${experience.years} years of practice.`
      });
      await doctor.save();
      createdDoctors.push(doctor);
    }

    // Create Patients
    const patientUsers = [
      {
        firstName: 'Brooklyn',
        lastName: 'Simmons',
        email: 'brooklyn@example.com',
        role: 'patient',
        tenantId: platformTenant._id,
        profile: {
          dateOfBirth: new Date('1995-03-18'),
          gender: 'male',
          nationality: 'American'
        }
      },
      {
        firstName: 'Anthony',
        lastName: 'Johnson',
        email: 'anthony@example.com',
        role: 'patient',
        tenantId: platformTenant._id,
        profile: {
          dateOfBirth: new Date('1997-03-18'),
          gender: 'male',
          nationality: 'American'
        }
      },
      {
        firstName: 'Sarah Miller',
        lastName: 'Olivia',
        email: 'sarah.olivia@example.com',
        role: 'patient',
        tenantId: platformTenant._id,
        profile: {
          dateOfBirth: new Date('1987-03-18'),
          gender: 'female',
          nationality: 'American'
        }
      }
    ];

    for (const patientData of patientUsers) {
      const user = new User({
        ...patientData,
        password: 'password123',
        permissions: [
          { resource: 'profile', actions: ['read', 'update'] },
          { resource: 'appointments', actions: ['create', 'read', 'update'] },
          { resource: 'medical_records', actions: ['create', 'read', 'update'] }
        ],
        isVerified: true
      });
      await user.save();

      const patient = new Patient({
        userId: user._id,
        tenantId: platformTenant._id,
        medicalHistory: [
          {
            condition: 'Hypertension',
            diagnosedDate: new Date('2023-01-15'),
            treatment: 'Medication',
            doctor: 'Dr. Smith',
            hospital: 'Local Hospital'
          }
        ],
        allergies: ['Penicillin'],
        emergencyContact: {
          name: 'Emergency Contact',
          relationship: 'Spouse',
          phone: '+1-555-0123',
          email: 'emergency@example.com'
        }
      });
      await patient.save();
    }

    // Create Treatment Packages
    const treatmentPackages = [
      {
        tenantId: apolloTenant._id,
        hospitalId: apolloHospital._id,
        name: 'Comprehensive Cardiac Care Package',
        description: 'Complete heart health assessment and treatment package',
        category: 'cardiology',
        procedures: [
          { name: 'ECG', description: 'Electrocardiogram', duration: '30 minutes' },
          { name: 'Echocardiogram', description: '2D Echo test', duration: '45 minutes' },
          { name: 'Stress Test', description: 'Cardiac stress test', duration: '1 hour' }
        ],
        pricing: {
          basePrice: 2500,
          currency: 'USD',
          inclusions: ['Consultation', 'Tests', 'Reports', 'Follow-up'],
          exclusions: ['Accommodation', 'Travel']
        },
        duration: {
          hospital_stay: '1-2 days',
          total_recovery: '1 week',
          follow_up: '1 month'
        },
        doctors: [createdDoctors[0]._id],
        successRate: 95,
        rating: {
          average: 4.8,
          totalReviews: 156
        },
        isPromoted: true
      },
      {
        tenantId: fortisHospital._id,
        hospitalId: fortisHospital._id,
        name: 'Cancer Screening Package',
        description: 'Comprehensive cancer screening and early detection',
        category: 'oncology',
        procedures: [
          { name: 'CT Scan', description: 'Full body CT scan', duration: '1 hour' },
          { name: 'Blood Tests', description: 'Tumor markers', duration: '30 minutes' },
          { name: 'Consultation', description: 'Oncologist consultation', duration: '45 minutes' }
        ],
        pricing: {
          basePrice: 1800,
          currency: 'USD',
          inclusions: ['All tests', 'Consultation', 'Report'],
          exclusions: ['Treatment', 'Accommodation']
        },
        duration: {
          hospital_stay: '1 day',
          total_recovery: '2-3 days',
          follow_up: '2 weeks'
        },
        doctors: [createdDoctors[2]._id],
        successRate: 98,
        rating: {
          average: 4.9,
          totalReviews: 89
        }
      }
    ];

    for (const packageData of treatmentPackages) {
      const treatmentPackage = new TreatmentPackage(packageData);
      await treatmentPackage.save();
    }

    console.log('Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Super Admin: superadmin@medtourism.com / password123 (tenant: platform)');
    console.log('Apollo Admin: admin@apollo.com / password123 (tenant: apollo)');
    console.log('Fortis Admin: admin@fortis.com / password123 (tenant: fortis)');
    console.log('Patient: brooklyn@example.com / password123 (tenant: platform)');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

export default seedDatabase;
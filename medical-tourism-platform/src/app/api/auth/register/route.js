import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Tenant from '@/models/Tenant';

export async function POST(request) {
  try {
    await connectDB();
    
    const { firstName, lastName, email, phone, password, role, tenantSubdomain } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !tenantSubdomain) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Find or create tenant
    let tenant = await Tenant.findOne({ subdomain: tenantSubdomain });
    
    if (!tenant) {
      // Create new tenant for hospitals/clinics
      if (role === 'hospital_admin' || role === 'doctor') {
        tenant = new Tenant({
          name: `${firstName} ${lastName}'s Organization`,
          subdomain: tenantSubdomain,
          type: 'hospital',
          subscription: {
            plan: 'trial',
            status: 'trial'
          }
        });
        await tenant.save();
      } else {
        return NextResponse.json(
          { error: 'Invalid organization' },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase(),
      tenantId: tenant._id 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Set default permissions based on role
    const getDefaultPermissions = (userRole) => {
      const permissions = {
        patient: [
          { resource: 'profile', actions: ['read', 'update'] },
          { resource: 'appointments', actions: ['create', 'read', 'update'] },
          { resource: 'medical_records', actions: ['create', 'read', 'update'] }
        ],
        doctor: [
          { resource: 'profile', actions: ['read', 'update'] },
          { resource: 'patients', actions: ['read'] },
          { resource: 'appointments', actions: ['read', 'update'] },
          { resource: 'medical_records', actions: ['read', 'update'] },
          { resource: 'treatment_packages', actions: ['read'] }
        ],
        hospital_admin: [
          { resource: 'hospital', actions: ['read', 'update'] },
          { resource: 'doctors', actions: ['create', 'read', 'update', 'delete'] },
          { resource: 'treatment_packages', actions: ['create', 'read', 'update', 'delete'] },
          { resource: 'appointments', actions: ['read', 'update'] }
        ],
        admin: [
          { resource: 'hospitals', actions: ['read', 'update'] },
          { resource: 'users', actions: ['read', 'update'] },
          { resource: 'reports', actions: ['read'] }
        ],
        super_admin: [
          { resource: '*', actions: ['create', 'read', 'update', 'delete'] }
        ]
      };
      return permissions[userRole] || permissions.patient;
    };

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password,
      role,
      tenantId: tenant._id,
      permissions: getDefaultPermissions(role)
    });

    await user.save();

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        userId: user._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
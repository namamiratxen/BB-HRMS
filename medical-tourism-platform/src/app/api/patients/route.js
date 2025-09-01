import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Patient from '@/models/Patient';
import User from '@/models/User';
import { getAuthSession, hasPermission, canAccessTenant } from '@/lib/auth';

// GET - List patients
export async function GET(request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions
    if (!hasPermission(session.user.permissions, 'patients', 'read')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const department = searchParams.get('department') || '';

    const skip = (page - 1) * limit;

    // Build query
    const query = { tenantId: session.user.tenantId };
    
    if (search) {
      query.$or = [
        { 'userId.firstName': { $regex: search, $options: 'i' } },
        { 'userId.lastName': { $regex: search, $options: 'i' } },
        { 'userId.email': { $regex: search, $options: 'i' } },
        { patientId: { $regex: search, $options: 'i' } }
      ];
    }

    const patients = await Patient.find(query)
      .populate('userId', 'firstName lastName email phone profile')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Patient.countDocuments(query);

    return NextResponse.json({
      patients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create patient
export async function POST(request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions
    if (!hasPermission(session.user.permissions, 'patients', 'create')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    const { userId, medicalHistory, allergies, medications, emergencyContact, insurance } = data;

    // Verify user exists and belongs to same tenant
    const user = await User.findOne({ 
      _id: userId, 
      tenantId: session.user.tenantId 
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const patient = new Patient({
      userId,
      tenantId: session.user.tenantId,
      medicalHistory: medicalHistory || [],
      allergies: allergies || [],
      medications: medications || [],
      emergencyContact,
      insurance
    });

    await patient.save();

    const populatedPatient = await Patient.findById(patient._id)
      .populate('userId', 'firstName lastName email phone profile');

    return NextResponse.json(populatedPatient, { status: 201 });

  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
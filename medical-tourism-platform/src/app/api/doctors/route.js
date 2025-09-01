import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/models/Doctor';
import User from '@/models/User';
import { getAuthSession, hasPermission } from '@/lib/auth';

// GET - List doctors
export async function GET(request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const specialty = searchParams.get('specialty') || '';
    const hospitalId = searchParams.get('hospitalId') || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };
    
    // Filter by tenant unless super admin
    if (session.user.role !== 'super_admin') {
      query.tenantId = session.user.tenantId;
    }

    if (hospitalId) {
      query.hospitalId = hospitalId;
    }

    if (specialty) {
      query.specialties = { $in: [specialty] };
    }

    const doctors = await Doctor.find(query)
      .populate('userId', 'firstName lastName email phone profile avatar')
      .populate('hospitalId', 'name type contact')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(query);

    return NextResponse.json({
      doctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create doctor
export async function POST(request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, 'doctors', 'create')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    const { 
      userId, 
      hospitalId, 
      licenseNumber, 
      specialties, 
      qualifications, 
      experience, 
      consultationFee,
      availability,
      languages,
      bio
    } = data;

    // Verify user exists and belongs to same tenant
    const user = await User.findOne({ 
      _id: userId, 
      tenantId: session.user.tenantId,
      role: 'doctor'
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found or invalid role' }, { status: 404 });
    }

    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ userId });
    if (existingDoctor) {
      return NextResponse.json({ error: 'Doctor profile already exists' }, { status: 400 });
    }

    const doctor = new Doctor({
      userId,
      tenantId: session.user.tenantId,
      hospitalId,
      licenseNumber,
      specialties: specialties || [],
      qualifications: qualifications || [],
      experience: experience || { years: 0 },
      consultationFee: consultationFee || { amount: 0, currency: 'USD' },
      availability: availability || [],
      languages: languages || ['English'],
      bio: bio || '',
      verification: {
        status: 'pending'
      }
    });

    await doctor.save();

    const populatedDoctor = await Doctor.findById(doctor._id)
      .populate('userId', 'firstName lastName email phone profile avatar')
      .populate('hospitalId', 'name type contact');

    return NextResponse.json(populatedDoctor, { status: 201 });

  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
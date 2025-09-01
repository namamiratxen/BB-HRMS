import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hospital from '@/models/Hospital';
import { getAuthSession, hasPermission } from '@/lib/auth';

// GET - List hospitals
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
    const type = searchParams.get('type') || '';
    const specialty = searchParams.get('specialty') || '';

    const skip = (page - 1) * limit;

    // Build query based on user role
    let query = { isActive: true };
    
    // If not super admin, filter by tenant
    if (session.user.role !== 'super_admin') {
      query.tenantId = session.user.tenantId;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'contact.city': { $regex: search, $options: 'i' } },
        { 'contact.country': { $regex: search, $options: 'i' } }
      ];
    }

    if (type) {
      query.type = type;
    }

    if (specialty) {
      query.specialties = { $in: [specialty] };
    }

    const hospitals = await Hospital.find(query)
      .populate('tenantId', 'name type')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Hospital.countDocuments(query);

    return NextResponse.json({
      hospitals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create hospital
export async function POST(request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, 'hospitals', 'create')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    const { name, description, type, specialties, contact, facilities, metadata } = data;

    const hospital = new Hospital({
      tenantId: session.user.tenantId,
      name,
      description,
      type,
      specialties: specialties || [],
      contact,
      facilities: facilities || [],
      metadata: metadata || {},
      verification: {
        status: 'pending'
      }
    });

    await hospital.save();

    const populatedHospital = await Hospital.findById(hospital._id)
      .populate('tenantId', 'name type');

    return NextResponse.json(populatedHospital, { status: 201 });

  } catch (error) {
    console.error('Error creating hospital:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
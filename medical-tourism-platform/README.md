# Medical Tourism Platform

A comprehensive Medical Tourism Platform built with Next.js, featuring multi-tenant architecture, RBAC (Role-Based Access Control), and PWA capabilities.

## Features

### Phase 1: Core Medical Tourism Platform

- **Multi-Tenant Architecture**: Separate tenants for hospitals, clinics, and platform administration
- **RBAC System**: Role-based access control for different user types:
  - Super Admin
  - Admin
  - Hospital Admin
  - Doctor
  - Staff
  - Patient
  - Partner
  - Vendor
  - Customer

- **Patient Portal**:
  - Secure registration and login
  - Personal health records management
  - Treatment search and discovery
  - Appointment booking
  - Cost estimation

- **Hospital/Clinic Portal**:
  - Hospital registration and verification
  - Doctor profile management
  - Treatment package listing
  - Availability calendar
  - Analytics dashboard

- **Admin Dashboard**:
  - Hospital/doctor onboarding management
  - Package and pricing approval
  - Compliance management
  - Platform analytics

- **PWA Features**:
  - Offline functionality
  - Mobile app-like experience
  - Push notifications
  - Installable on devices

## Tech Stack

- **Frontend**: Next.js 15 with JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **PWA**: next-pwa
- **Security**: bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and update the values:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/medical-tourism
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Seed the database**:
   ```bash
   npm run seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

After seeding the database, you can use these credentials:

### Super Admin
- **Email**: superadmin@medtourism.com
- **Password**: password123
- **Tenant**: platform

### Hospital Admin (Apollo)
- **Email**: admin@apollo.com
- **Password**: password123
- **Tenant**: apollo

### Hospital Admin (Fortis)
- **Email**: admin@fortis.com
- **Password**: password123
- **Tenant**: fortis

### Patient
- **Email**: brooklyn@example.com
- **Password**: password123
- **Tenant**: platform

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── patients/      # Patient CRUD operations
│   │   ├── doctors/       # Doctor CRUD operations
│   │   └── hospitals/     # Hospital CRUD operations
│   ├── auth/              # Authentication pages
│   ├── patient/           # Patient dashboard
│   ├── admin/             # Admin dashboard
│   ├── hospital/          # Hospital dashboard
│   ├── analytics/         # Analytics pages
│   └── treatments/        # Treatment listing
├── components/            # Reusable components
├── lib/                   # Utility functions
│   ├── mongodb.js         # Database connection
│   ├── auth.js            # Auth utilities
│   └── seed.js            # Database seeding
├── models/                # MongoDB schemas
│   ├── User.js
│   ├── Tenant.js
│   ├── Hospital.js
│   ├── Doctor.js
│   ├── Patient.js
│   └── TreatmentPackage.js
└── middleware.js          # Route protection
```

## Key Features

### Multi-Tenant Architecture
- Each hospital/clinic operates as a separate tenant
- Data isolation between tenants
- Tenant-specific branding and settings
- Scalable subscription management

### RBAC System
- Granular permissions for different resources
- Role-based access control
- Resource-specific actions (create, read, update, delete)
- Tenant-specific access control

### Responsive Design
- Mobile-first approach
- Optimized for tablets, desktops, and mobile devices
- Progressive Web App capabilities
- Offline functionality

### Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Route protection middleware
- CSRF protection
- Input validation

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/session` - Get current session

### Patients
- `GET /api/patients` - List patients
- `POST /api/patients` - Create patient
- `GET /api/patients/[id]` - Get patient details
- `PUT /api/patients/[id]` - Update patient
- `DELETE /api/patients/[id]` - Delete patient

### Doctors
- `GET /api/doctors` - List doctors
- `POST /api/doctors` - Create doctor profile
- `GET /api/doctors/[id]` - Get doctor details
- `PUT /api/doctors/[id]` - Update doctor

### Hospitals
- `GET /api/hospitals` - List hospitals
- `POST /api/hospitals` - Create hospital
- `GET /api/hospitals/[id]` - Get hospital details
- `PUT /api/hospitals/[id]` - Update hospital

## Development

### Adding New Features

1. Create the database model in `src/models/`
2. Add API routes in `src/app/api/`
3. Create UI components
4. Update permissions in the auth system
5. Add tests

### Database Seeding

The seeding script creates:
- Platform and hospital tenants
- Admin users with different roles
- Sample hospitals with verification
- Doctor profiles with specialties
- Patient records with medical history
- Treatment packages with pricing

### PWA Configuration

The app is configured as a Progressive Web App with:
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for all devices
- Push notification support (configurable)

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

```bash
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact:
- Email: support@medtourism.com
- Documentation: [Coming Soon]
- Issues: GitHub Issues
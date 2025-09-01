# Medical Tourism Platform - Setup Guide

## Quick Start

1. **Start MongoDB** (if using local instance):
   ```bash
   # Install MongoDB if not already installed
   # On Ubuntu/Debian:
   sudo apt-get install mongodb
   
   # Start MongoDB service
   sudo systemctl start mongodb
   # or
   mongod
   ```

2. **Install dependencies**:
   ```bash
   cd medical-tourism-platform
   npm install
   ```

3. **Seed the database**:
   ```bash
   npm run seed
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Testing the Application

### Landing Page
- Visit `http://localhost:3000` to see the medical tourism landing page
- Responsive design works on mobile, tablet, and desktop
- PWA features available (try installing the app on mobile)

### Authentication
- Sign up at `http://localhost:3000/auth/signup`
- Sign in at `http://localhost:3000/auth/signin`

### Demo Accounts

#### Super Admin Dashboard
- **URL**: `http://localhost:3000/admin/dashboard`
- **Login**: superadmin@medtourism.com / password123 (tenant: platform)
- **Features**: Complete platform management, user oversight

#### Hospital Admin Dashboard  
- **URL**: `http://localhost:3000/hospital/dashboard`
- **Login**: admin@apollo.com / password123 (tenant: apollo)
- **Features**: Hospital management, doctor profiles, treatment packages

#### Patient Dashboard
- **URL**: `http://localhost:3000/patient/dashboard`
- **Login**: brooklyn@example.com / password123 (tenant: platform)
- **Features**: Health records, appointments, treatment search

#### Analytics Dashboard
- **URL**: `http://localhost:3000/analytics/trending`
- **Features**: Charts, reports, trending data visualization

## Key Features to Test

### 1. Multi-Tenant Architecture
- Try logging in with different tenant subdomains
- Data is isolated between tenants
- Each hospital operates independently

### 2. RBAC (Role-Based Access Control)
- Different users see different dashboards
- Permissions are enforced at API level
- Role-based navigation and features

### 3. CRUD Operations
- **Patients**: Create, read, update, delete patient records
- **Doctors**: Manage doctor profiles and specialties
- **Hospitals**: Hospital registration and verification
- **Treatments**: Treatment package management

### 4. Responsive Design
- Test on different screen sizes
- Mobile navigation menu
- Tablet-optimized layouts
- Desktop dashboard views

### 5. PWA Features
- Install the app on mobile devices
- Offline functionality (limited)
- App-like experience

## API Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Get patients (requires authentication)
curl -X GET http://localhost:3000/api/patients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create a new patient
curl -X POST http://localhost:3000/api/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"userId": "USER_ID", "medicalHistory": []}'
```

## Database Structure

The application creates the following collections:
- `users` - All user accounts with RBAC
- `tenants` - Multi-tenant organizations
- `hospitals` - Hospital/clinic information
- `doctors` - Doctor profiles and specialties
- `patients` - Patient medical records
- `treatmentpackages` - Treatment offerings

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check the MONGODB_URI in .env.local
   - Verify network connectivity

2. **Authentication Issues**:
   - Clear browser cookies/localStorage
   - Check NEXTAUTH_SECRET is set
   - Verify user exists in correct tenant

3. **Permission Errors**:
   - Check user role and permissions
   - Verify tenant access
   - Review RBAC configuration

4. **PWA Not Working**:
   - Check manifest.json is accessible
   - Verify service worker registration
   - Test on HTTPS in production

### Development Tips

- Use browser dev tools to debug
- Check Network tab for API calls
- Monitor console for errors
- Test on different devices/browsers

## Next Steps

This is Phase 1 of the Medical Tourism Platform. Future phases will include:

- **Phase 2**: Advanced booking system, payment integration
- **Phase 3**: Telemedicine, video consultations
- **Phase 4**: Travel planning, visa assistance
- **Phase 5**: AI-powered recommendations
- **Phase 6**: Mobile apps (React Native)
- **Phase 7**: International expansion, localization
- **Phase 8**: Enterprise features, analytics

## Production Deployment

For production deployment:

1. Set up production MongoDB instance
2. Configure proper environment variables
3. Set up SSL/HTTPS
4. Configure domain and DNS
5. Set up monitoring and logging
6. Implement backup strategies
7. Configure CDN for static assets

The application is ready for production deployment on platforms like Vercel, Netlify, or any Node.js hosting provider.
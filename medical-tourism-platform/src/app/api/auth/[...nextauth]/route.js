import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Tenant from '@/models/Tenant';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        tenantSubdomain: { label: 'Tenant', type: 'text' }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          
          // Find tenant first
          const tenant = await Tenant.findOne({ 
            subdomain: credentials.tenantSubdomain,
            isActive: true 
          });
          
          if (!tenant) {
            throw new Error('Invalid tenant');
          }

          // Find user within tenant
          const user = await User.findOne({
            email: credentials.email,
            tenantId: tenant._id,
            isActive: true
          }).populate('tenantId');

          if (!user) {
            throw new Error('Invalid credentials');
          }

          const isValidPassword = await user.comparePassword(credentials.password);
          if (!isValidPassword) {
            throw new Error('Invalid credentials');
          }

          // Update last login
          user.lastLogin = new Date();
          await user.save();

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            tenantId: user.tenantId._id.toString(),
            tenantName: user.tenantId.name,
            tenantType: user.tenantId.type,
            permissions: user.permissions,
            avatar: user.avatar
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.tenantId = user.tenantId;
        token.tenantName = user.tenantName;
        token.tenantType = user.tenantType;
        token.permissions = user.permissions;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
        session.user.tenantName = token.tenantName;
        session.user.tenantType = token.tenantType;
        session.user.permissions = token.permissions;
        session.user.avatar = token.avatar;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
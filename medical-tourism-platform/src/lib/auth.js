import { getServerSession } from 'next-auth/next';

export async function getAuthSession() {
  // Import authOptions dynamically to avoid circular dependency
  const { authOptions } = await import('@/app/api/auth/[...nextauth]/route');
  return await getServerSession(authOptions);
}

// RBAC Permission checker
export function hasPermission(userPermissions, resource, action) {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  
  const permission = userPermissions.find(p => p.resource === resource);
  return permission && permission.actions.includes(action);
}

// Role-based access control
export function hasRole(userRole, allowedRoles) {
  return allowedRoles.includes(userRole);
}

// Multi-tenant access control
export function canAccessTenant(userTenantId, resourceTenantId) {
  return userTenantId === resourceTenantId;
}

// Middleware for API route protection
export function withAuth(handler, options = {}) {
  return async (req, res) => {
    const session = await getAuthSession();
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check role if specified
    if (options.roles && !hasRole(session.user.role, options.roles)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Check permission if specified
    if (options.permission) {
      const { resource, action } = options.permission;
      if (!hasPermission(session.user.permissions, resource, action)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
    }

    // Add session to request
    req.session = session;
    return handler(req, res);
  };
}
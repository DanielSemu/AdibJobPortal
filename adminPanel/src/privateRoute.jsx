/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { getAccessToken } from './api/tokenStorage';
import Spinner from './components/ui/Spinner';

const roleBasedRoutes = {
  '/close_jobs': ['admin', 'hr_maker'],
  '/jobs/add': ['admin', 'hr_maker'],
  '/edit/:id': ['admin', 'hr_maker'],
};

const PrivateRoute = ({ children }) => {
  const { loading, userProfile } = useAuth();
  const accessToken = getAccessToken();
  const location = useLocation();

  // Normalize the path to match roleBasedRoutes keys (e.g., '/edit/123' -> '/edit/:id')
  const normalizePath = (path) => {
    if (path.startsWith('/edit/')) return '/edit/:id';
    return path;
  };

  const currentPath = normalizePath(location.pathname);
  const allowedRoles = roleBasedRoutes[currentPath] || [];

  // console.log('PrivateRoute: loading=', loading, 'accessToken=', !!accessToken, 'userProfile=', userProfile);

  if (loading) {
    return <Spinner />;
  }

  if (!accessToken) {
    console.log('No access token, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && userProfile?.role && !allowedRoles.includes(userProfile.role)) {
    console.log('Role not allowed, redirecting to /unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
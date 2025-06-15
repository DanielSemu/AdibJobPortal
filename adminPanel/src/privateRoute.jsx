/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { getAccessToken } from './api/tokenStorage';

const PrivateRoute = ({ children, roles }) => {
  const { loading, userProfile } = useAuth();
  const accessToken = getAccessToken();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userProfile?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;

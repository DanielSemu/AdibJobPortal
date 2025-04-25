import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { getAccessToken } from './api/tokenStorage';

const PrivateRoute = ({ children }) => {
    const {loading,setLoading}=useAuth()
    const  accessToken  = getAccessToken();  

    
    if (loading && !accessToken) {
        return <div>Loading...</div>;
    }

    return accessToken ? children : <Navigate to="/login" />;  // Redirect to login page if not authenticated
};

export default PrivateRoute;

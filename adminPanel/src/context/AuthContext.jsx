import { createContext, useState, useEffect } from 'react';
import  { BASE_URL} from '../api/axiosInstance';
import { setAccessToken } from '../api/tokenStorage';
import axios from 'axios';
import { profile } from '../api/auth';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userProfile,setUserProfile]=useState([])
    const location =useLocation()

    useEffect(() => {
        const fetchUserProfile = async () => {
              try {
                const response = await profile();
                setUserProfile(response);
              } catch (error) {
                console.error("Error fetching user profile:", error);
                setUserProfile(null);
              }
            };
        const initializeAuth = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {}, { withCredentials: true });
                setAccessToken(response.data.access);
            } catch (error) {
                setAccessToken('');
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile()
        initializeAuth();
    }, [location.pathname]);  
    return (
        <AuthContext.Provider value={{loading,userProfile,setUserProfile}}>
            {children}
        </AuthContext.Provider>
    );
};

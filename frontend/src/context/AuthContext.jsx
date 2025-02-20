import { createContext, useState, useEffect } from 'react';
import  { BASE_URL} from '../api/axiosInstance';
import { setAccessToken } from '../api/tokenStorage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        initializeAuth();
    }, []);  
    return (
        <AuthContext.Provider value={{ loading }}>
            {children}
        </AuthContext.Provider>
    );
};

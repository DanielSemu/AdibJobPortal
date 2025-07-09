/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { setAccessToken, getAccessToken } from '../api/tokenStorage';
import { profile } from '../api/auth';
import axios from 'axios';
import { BASE_URL } from '../api/axiosInstance';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
    //   console.log('Starting auth initialization...');
      const token = getAccessToken();

      if (!token) {
        console.log('No token found, skipping auth initialization.');
        setLoading(false);
        return;
      }

      try {
        // console.log('Attempting to refresh token...');
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/token/refresh/`,
          {},
          { withCredentials: true, timeout: 5000 } // 5-second timeout
        );
        const newAccessToken = refreshResponse.data.access;
        // console.log('Token refreshed successfully:', newAccessToken);
        setAccessToken(newAccessToken);

        // console.log('Fetching user profile...');
        const userData = await profile();
        // console.log('User profile fetched:', userData);
        setUserProfile(userData);
        localStorage.setItem('userProfile', JSON.stringify(userData));
      } catch (error) {
        console.error('Error during auth initialization:', error);
        setUserProfile(null);
        setAccessToken('');
        localStorage.removeItem('userProfile');
      } finally {
        console.log('Auth initialization complete, setting loading to false.');
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, userProfile, setUserProfile, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
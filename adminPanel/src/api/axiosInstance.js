import axios from 'axios';
import { getAccessToken, setAccessToken } from './tokenStorage';
import { refreshToken } from './auth';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.2.56';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000, // 5-second timeout for all requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // console.log('Attempting to refresh token due to 401 error...');
        const newAccessToken = await refreshToken();
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        setAccessToken('');
        localStorage.removeItem('userProfile');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
import axios from 'axios';
import { getAccessToken, setAccessToken } from './tokenStorage';
import { refreshToken } from './auth';
import useAuth from '../hooks/useAuth';
// export const BASE_URL = 'http://localhost:8000';
// export const BASE_URL = 'http://192.168.75.222:8000';
export const BASE_URL = '';



export const refreshAxiosInstance = axios.create({
    baseURL: BASE_URL,
});

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Ensures cookies are sent with each request
});
export const loginAxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Ensures cookies are sent with each request
});

// Request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 error and refresh token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    setAccessToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest); // Retry original request
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // alert("sfds")
                // window.location.href = '/login'; // Redirect to login page
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

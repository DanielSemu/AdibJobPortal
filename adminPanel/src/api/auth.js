import axios from 'axios';
import axiosInstance, { BASE_URL } from './axiosInstance';
import { setAccessToken } from './tokenStorage';

let isRefreshing = false;
let refreshSubscribers = [];


export const registerUser = async (formData) => {
  try {
    const { full_name, email, birthdate, phone_number, password } = formData;
    const response = await axios.post(
      `${BASE_URL}/auth/register/`,
      { full_name, email, birthdate, phone_number, password },
      { timeout: 5000 }
    );
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.error || 'Registration failed. Please try again.',
      };
    } else if (error.request) {
      return {
        success: false,
        status: null,
        message: 'No response from server. Please check your network connection.',
      };
    } else {
      return {
        success: false,
        status: null,
        message: 'An unexpected error occurred.',
      };
    }
  }
};

export const login = async (username, password) => {
  try {
    // console.log('Attempting login...');
    const response = await axios.post(
      `${BASE_URL}/auth/token/`,
      { username, password },
      { withCredentials: true, timeout: 5000 }
    );
    const { access } = response.data;
    // console.log('Login successful, access token:', access);
    setAccessToken(access);

    // console.log('Fetching user profile after login...');
    const userData = await profile();
    // console.log('User profile fetched after login:', userData);
    localStorage.setItem('userProfile', JSON.stringify(userData));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return error.response || { success: false, message: 'Login failed. Please try again.' };
  }
};

export const profile = async () => {
  try {
    // console.log('Fetching profile...');
    const response = await axiosInstance.get('/auth/profile/', { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error; // Let the caller handle the error
  }
};

export const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshSubscribers.push({ resolve, reject });
    });
  }

  isRefreshing = true;
  try {
    // console.log('Refreshing token...');
    const response = await axios.post(
      `${BASE_URL}/auth/token/refresh/`,
      {},
      { withCredentials: true, timeout: 5000 }
    );
    const newAccessToken = response.data.access;
    // console.log('Token refresh successful:', newAccessToken);
    setAccessToken(newAccessToken);

    refreshSubscribers.forEach(({ resolve }) => resolve(newAccessToken));
    refreshSubscribers = [];

    return newAccessToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    refreshSubscribers.forEach(({ reject }) => reject(error));
    refreshSubscribers = [];
    throw error;
  } finally {
    isRefreshing = false;
  }
};

export const sendOTP = async (phone_number, otpCode, purpose) => {
  let message = purpose === 'application' ? `Your Verification Code is: ${otpCode}` : `Your OTP code is: ${otpCode}`;
  const encodedMessage = encodeURIComponent(message);
  const url = `http://192.168.6.27:9501/api?action=sendmessage&username=Test&password=Adib@123&recipient=${phone_number}&messagetype=SMS:TEXT&messagedata=${encodedMessage}`;

  try {
    const response = await axios.get(url, { timeout: 5000 });
    console.log('OTP sent:', response);
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, message: 'Failed to send OTP. Please try again.' };
  }
};

export const getMyApplications = async () => {
  try {
    const response = await axiosInstance.get('/api/my_applications/', { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

export const logout = async () => {
  try {
    // console.log('Logging out...');
    const response = await axiosInstance.post('/auth/logout/');
    setAccessToken('');
    localStorage.removeItem('userProfile');
    // console.log('Logout successful');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    setAccessToken('');
    localStorage.removeItem('userProfile');
  }
};
import axios from 'axios';
import axiosInstance, { BASE_URL, loginAxiosInstance } from './axiosInstance';
import {  setAccessToken } from './tokenStorage';


let isRefreshing = false;
let refreshSubscribers = [];  // Queue of requests that are waiting for a refreshed token

export const registerUser = async (formData) => {
    try {
        const { full_name, email, birthdate,gender, phone_number, password,confirm_password } = formData;
        const response = await axios.post(`${BASE_URL}/auth/applicant/register/`, {
            full_name, email,gender, birthdate, phone_number, password,confirm_password
        });
        return response.data;  // Return success response data
    } catch (error) {
        if (error.response) {
            // Return error message and status code to the caller
            return {
                success: false,
                status: error.response.status,
                message: error.response.data.error || 'Registration failed. Please try again.'
            };
        } else if (error.request) {
            return {
                success: false,
                status: null,
                message: 'No response from server. Please check your network connection.'
            };
        } else {
            return {
                success: false,
                status: null,
                message: 'An unexpected error occurred.'
            };
        }
    }
};

export const login = async (email, password) => {
    try {
        
        const response = await axios.post(
            `${BASE_URL}/auth/applicant/login/`, 
            { email, password }, 
            {
                withCredentials: true, // Ensures cookies are sent with the request
            }
        );
        const { access } = response.data;  // Destructure access token from the response
        setAccessToken(access)
        
        return response;  
    } catch (error) {
        return error.response
    }
};

export const profile = async () => {
    const response = await axiosInstance.get('/auth/applicant/profile/');
    return response.data;
};

export const refreshToken = async () => {
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            refreshSubscribers.push({ resolve, reject });
        });
    }

    isRefreshing = true;
    try {
        const response = await axios.post(`${BASE_URL}/auth/applicant/token/refresh/`, {}, { withCredentials: true });
        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);

        refreshSubscribers.forEach(({ resolve }) => resolve(newAccessToken));
        refreshSubscribers = [];

        return newAccessToken;
    } catch (error) {
        refreshSubscribers.forEach(({ reject }) => reject(error));
        refreshSubscribers = [];
        throw error;
    } finally {
        isRefreshing = false;
    }
};

export const sendOTP = async (phone_number, otpCode, purpose) => {
    
    let message = ''; // Use let instead of const so we can reassign it
    
    if (purpose === "application") {
        message = `Your Verification Code is: ${otpCode}`;
    } else {
        message = `Your OTP code is: ${otpCode}`;
    }

  
    const encodedMessage = encodeURIComponent(message);

    const url = `http://192.168.6.27:9501/api?action=sendmessage&username=Test&password=Adib@123&recipient=${phone_number}&messagetype=SMS:TEXT&messagedata=${encodedMessage}`;
  
    try {
      const response = await axios.get(url);
      console.log(response);
        return { success: true };
    } catch (error) {
      console.error("Error sending OTP:", error);
      return { success: true };
    }
  };


  export const getMyApplications = async () => {
    try {
        const response = await axiosInstance.get("applications/user_applications/");
        
        return response.data;  // Assuming response.data contains the list of applications
    } catch (error) {
        // Log the full error to get better debugging information
        console.error("Error fetching applications:", error);
        // Return an empty array or null in case of error to avoid breaking the app
        return [];
    }
}

export const checkUserExistence = async (email, phone) => {
    console.log(email,phone);
    
  try {
    const response = await axios.post(`${BASE_URL}/auth/applicant/check_user/`, {
      email,
      phone,
    });
    return response.data; // axios automatically parses JSON
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
    };
  }
};


export const resetPassword = async (email, phone, newPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/applicant/reset_password/`, {
      email,
      phone,
      new_password: newPassword,
    });

    return response.data; // Return success or error from server
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Server error during password reset",
    };
  }
};


  

export const logout =async ()=>{
    try {
        
        const response=await loginAxiosInstance.post('/auth/applicant/logout/')
        setAccessToken(null)
        return response
    } catch (error) {
        console.error("Logout error", error)    
    }
}
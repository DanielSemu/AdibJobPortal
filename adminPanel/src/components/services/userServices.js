// import axiosInstance from "./axiosInstance";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";


export const getUsers = async () => {
    const response = await axiosInstance.get('/auth/user/');
    return response.data;
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/user/', userData);
    return response.data; // Returns { message: "...", data: { username, full_name, role, ... } }
  } catch (error) {
    // Handle backend errors ({ error: "..." }) and authentication issues
    if (error.response?.status === 403) {
      throw 'You do not have permission to perform this action';
    }
    throw error.response?.data?.error || 'Failed to create user';
  }
};
export const CheckUser = async (searchQuery) => {
    try {
        const response = await axios.get(`http://192.168.6.63:2000/api/Ldap/users/by-username/${searchQuery}`);

        return response; // assuming the API returns created user info or success message
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create user';
    }
}



export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put('/auth/user/', userData); // Adjust endpoint as needed
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Something went wrong' };
  }
};

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;

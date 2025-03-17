import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://192.168.2.32:8000/api/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;

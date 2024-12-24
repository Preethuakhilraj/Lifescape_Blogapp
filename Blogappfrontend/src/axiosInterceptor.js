import axios from 'axios';

const axiosInstance = axios.create({
// baseURL: 'http://localhost:3000',
  // baseURL:'https://life-scape-blogserver.vercel.app'
  baseURL:'https://lifescape-blogapp.vercel.app'
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another storage method
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

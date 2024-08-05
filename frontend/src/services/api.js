import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  withCredentials: true, // Include credentials with requests
});

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/user/api/token/refresh/',
          { refresh: localStorage.getItem('refresh_token') }
        );
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        // Handle refresh error (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

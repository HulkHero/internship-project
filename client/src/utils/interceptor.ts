import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const user = JSON.parse(localStorage.getItem('user') as string);
    // If token is present add it to request's Authorization Header
    if (user.token) {
      if (config.headers) {config.headers.Authorization = `Bearer ${user.token}`
          config.headers['Content-Type'] = 'application/json';
          config.headers['Access-Control-Allow-Origin'] = '*';
          config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
    };
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default axiosInstance;
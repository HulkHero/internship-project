import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') as string);
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
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
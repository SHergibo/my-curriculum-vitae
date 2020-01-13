import axios from 'axios';
import { apiDomain, apiVersion } from './../apiConfig/config';


const axiosInstance = axios.create({
  baseURL: apiDomain,
  timeout: 5000,
  headers: {
    ContentType: 'applications/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (error.response.data.output.statusCode === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      const email = localStorage.getItem('user_email');

      return axiosInstance
        .post(`/api/${apiVersion}/auth/refresh-token`, { 
          refreshToken,
          email
        })
        .then((response) => {
          localStorage.setItem('access_token', response.data.accessToken);
          localStorage.setItem('refresh_token', response.data.refreshToken.token);
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

          return axios(originalRequest);
        })
        .catch(err => {
          console.log(err);
        })
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

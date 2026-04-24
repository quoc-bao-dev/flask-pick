import { axiosInstance } from './instance';

axiosInstance.interceptors.request.use((config) => {

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    return Promise.reject(error);
  },
);

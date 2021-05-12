import axios from 'axios';
import { BASE_BE_URL } from '../constants';

const axiosInstance = axios.create({
    baseURL: BASE_BE_URL
});

axiosInstance.interceptors.response.use(
    (response: { data: any; }) => response.data,
    (error: any) => Promise.reject(error)
);

export default axiosInstance;

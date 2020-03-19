import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8080';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 8000
});
axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err)
    }
);

export {
    baseURL,
    axiosInstance
};
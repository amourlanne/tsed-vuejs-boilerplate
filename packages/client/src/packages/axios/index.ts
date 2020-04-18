import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    config => {
        const token = window.$cookies.get('bearer_jwt');
        if (token) {
            config.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    // error => {
    //   return Promise.reject(error);
    // },
);

export default axios;

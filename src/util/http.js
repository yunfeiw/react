import axios from 'axios';

const http = axios.create({
    // baseURL: baseURL,
    timeout: 15000,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})
// Add a response interceptor handing global errors
http.interceptors.request.use(config => {
    var token = localStorage.getItem('token');

    config.headers['token'] = token;
    return config;
}, error => {
    // 错误处理代码
    return Promise.reject(error)
})
http.interceptors.response.use(response => {
    if (response.headers.authorization) {
        window.localStorage.removeItem('token');
        window.localStorage.setItem('token', JSON.stringify(response.headers.authorization))
    }
    return response
}, error => {
    if (error.response) {
        if (error.response.status === 999) { }
        // console.log(error.response)
    }
    return Promise.reject(error)

})
export default http;
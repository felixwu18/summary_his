import axios from 'axios'
import qs from 'qs';
import { Message } from 'element-ui';
import { api } from './request';
// 构建请求
const request = axios.create({
      baseURL: 'http://127.0.0.1:4000/',
      timeout: 60 * 1000,
      headers: { from: 'local', sys: 'http://127.0.0.1:4000' }
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
                // config.headers.token = cookies.get('token')
                if (config.method === 'post') {
                                config.data = qs.stringify(config.data)
                }
                switch (config.proxy) {
                                case 'api':
                                                config.baseURL = api;
                                                break;
                                case 'rbac':
                                                config.baseURL = rbac;
                                                break;
                }
                // Do something before request is sent
                return config;
}, function (error) {
                // Do something with request error
                return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
                // Do something with response data
                if (response.status === 200 && response.data.code === 200) {
                    return response.data;
                } else {
                    Message.error(response.data.errMsg);
                    return Promise.reject(response.data);
                }
            }, function (error) {
                // Do something with response error
                return Promise.reject(error);
            });
            
export default request
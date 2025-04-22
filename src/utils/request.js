import axios from 'axios';
import { getToken } from './token';

// 创建一个 axios 实例
const service = axios.create({
  // 设置基础请求地址，根据实际情况修改
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com', 
  // 请求超时时间，单位为毫秒
  timeout: 5000 
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加 token
    const token = getToken();
    if (token) {
      // 让每个请求携带 token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 处理请求错误
    console.log(error); 
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data;
    // 可以根据返回的状态码做不同处理
    if (res.code !== 200) {
      console.error('请求失败:', res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    // 处理响应错误
    console.log('err' + error); 
    return Promise.reject(error);
  }
);

export { service };
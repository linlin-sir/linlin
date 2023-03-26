import axios from "axios";  
import { Toast } from "vant";
const request = axios.create({
    baseURL: "http://interview-api-t.itheima.net/",
    timeout: 5000,
});
let toast1;
const token = localStorage.getItem('token')
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
  if (token) {
    config.headers.Authorization = `Bearer `+token
  }
   toast1 = Toast.loading({
        message: '加载中...',
       forbidClick: true,
       duration: 0, 
      });
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    toast1.clear();
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log(error.response.data.message);
    Toast(error.response.data.message)
    return Promise.reject(error);
  });

export default request;

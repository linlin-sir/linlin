/* 封装axios用于发送请求 */
import axios from 'axios'
import store from '@/store'
import { delToken } from './storage'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://ajax-api.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.token) {
    config.headers.Authorization=store.state.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  console.log(error);
  if (error.response.data.message === "token验证失败") {
    delToken();
    alert('身份验证过期,请重新登录')
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
   alert(error.message)
  return Promise.reject(error)
})

export default request
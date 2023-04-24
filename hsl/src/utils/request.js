import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 这里是任何请求都会触发的请求拦截器
    // 如果有token,就注入到请求头上面去, 登录接口是例外
    if (store.getters.token) {
      // 这里是已经登录, 但是不能随便发请求, 要检查一下跟上次登录差了多少时间
      if (Date.now() - localStorage.getItem('time') > 1000 * 60 * 60 * 2) {
        Message.error('登录超时啦(主动)')
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject('登录超时(主动)')
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  }
)
// 响应拦截器
service.interceptors.response.use(res => {
  // 请求成功
  if (res.data.success) {
    // 完全成功
    return res.data.data
  } else {
    // 请求有响应, 数据失败
    // 弹出错误提示
    Message.error(res.data.message)
    // 阻止当前promise运行
    return Promise.reject(res.data.message)
  }
}, err => {
  // 完全错误
  Message.error('系统繁忙, 请稍后')
  return Promise.reject(err)
})
export default service

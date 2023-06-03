import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'

const baseURL = import.meta.env.VITE_BASEURL
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = `Bearer ` + store.user.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    if (res.data.code !== 10000) {
      showToast({
        message: res.data.message || '请求失败',
        icon: 'none'
      })
      return Promise.reject()
    }
    // TODO 4. 摘取核心响应数据
    return res.data
  },
  (err) => {
    // TODO 5. 处理401错误
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)
// 封装类型返回类型
type Data<T> = {
  code: number
  message: string
  data: T
}
// 封装请求
const request = <T>(url: string, method: Method = 'get', data?: object) => {
  const dataKey = method.toLowerCase() === 'get' ? 'params' : 'data'
  return instance<T, Data<T>>({
    url,
    method,
    [dataKey]: data
  })
}
export { instance, baseURL, request }

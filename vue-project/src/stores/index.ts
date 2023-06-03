import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)

// 这个写法可以将一个文件里面暴露的东西统一在这进行导出
export * from './modules/user'
export * from './modules/counter'

export default pinia

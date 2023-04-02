import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
import img from '@/assets/common/head.jpg'
Vue.directive('fiximg', {
  // 使用这个指令的元素出现父组件中的时刻被执行
  inserted(el) {
    console.log('dom元素被插入到页面里面', el)
    el.addEventListener('error', () => {
      // 这里放 @ 字符串也只会当做普通字符串来解析, 并不会作为文件进行加载
      // el.src = '@/assets/common/head.jpg'
      el.src = img
    })

    // 额外处理空的状态
    el.src = el.src || img
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

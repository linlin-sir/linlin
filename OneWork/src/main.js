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
import Component from '@/components/myComs'
Vue.use(Component) // 注册自己的插件

// import { formatDate } from '@/filters'
// Vue.filter('formatDate', formatDate)

import * as MyFilters from '@/filters'
for (const key in MyFilters) {
  Vue.filter(key, MyFilters[key])
}

// 混入的写法
// 引入一个跟 vue 组件配置规则相同的对象
import myMixin from '@/mixin'
Vue.mixin(myMixin)
// 于是所有的vue组件就一起拥有了你这个对象的配置

Vue.config.productionTip = false
import img from '@/assets/common/head.jpg'
Vue.directive('fiximg', {
  // 使用这个指令的元素出现父组件中的时刻被执行
  inserted(el) {
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

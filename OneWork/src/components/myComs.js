// 这里仿照 element ui
// 将组件注册都封装在这, 外面执行
// Vue.use 即可使用
import Vue from 'vue'
import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'

// 插件创建方法一, 暴露函数
// function init() {
//   // 全局注册
// // 全局注册 Vue.component(组件名, 组件对象)
//   Vue.component('PageTools', PageTools)
// }

// export default init

// 插件创建方法二, 暴露对象
export default {
  // 如果插件作者暴露的是一个对象
  // vue 的插件机制, 默认执行的是对象中的 install 函数
  install() {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}

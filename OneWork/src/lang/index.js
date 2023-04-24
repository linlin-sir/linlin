import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhElementui from 'element-ui/lib/locale/lang/zh-CN'
import enElementUI from 'element-ui/lib/locale/lang/en'
import enMenus from './en'
import zhMenus from './zh'
Vue.use(VueI18n)

export default new VueI18n({
  // 当前语言
  locale: 'zh',
  // 各个语言对应的翻译数据
  messages: {
    // 英文
    en: {
      ...enElementUI,
      ...enMenus
    },
    // 中文
    zh: {
      ...zhElementui,
      ...zhMenus
    }
  }
})

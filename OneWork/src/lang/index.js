import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
  // 当前语言
  locale: 'zh',
  // 各个语言对应的翻译数据
  messages: {
    en: {
      hi: 'hello world'
    },
    zh: {
      hi: '你好世界'
    }
  }
})

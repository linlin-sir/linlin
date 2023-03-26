import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Icon, Tabbar, TabbarItem, NavBar, Form, Field, Toast, Cell, List,Tab,Tabs } from "vant";
import ArticleItem from "@/components/ArticleItem.vue";
Vue.component("ArticleItem", ArticleItem);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Cell);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

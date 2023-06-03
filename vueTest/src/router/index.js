import VueRouter from 'vue-router'
import Vue from 'vue'

import Layout from '@/views/layout.vue'
import Login from '@/views/login.vue'
import Dashboard from '@/views/dashboard.vue'
import Register from '@/views/register.vue'
import Article from '@/views/article.vue'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', component: Dashboard },
        { path: 'article', component: Article }
      ]
    }
  ]
});
const whiteList = ['/login','/register'];
router.beforeEach((to, from, next) => {
  if (store.state.token || whiteList.includes(to.path)) {
    next();
  } else {
    next('/login')
  }
})


export default router
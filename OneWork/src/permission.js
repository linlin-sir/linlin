import router from '@/router'
import store from './store'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, form, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.state.user.userInfo.userId) {
        await store.dispatch('user/getUserInfo')
        const menus = store.state.user.userInfo.roles.menus
        store.dispatch('permission/filterRoutes', menus)
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

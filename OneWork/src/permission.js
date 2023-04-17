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
        const routes = await store.dispatch('permission/filterRoutes', menus)
        router.addRoutes([
          ...routes,
          // 404 page must be placed at the end !!!
          { path: '*', redirect: '/404', hidden: true }
        ])
        next(to.path)
        return
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

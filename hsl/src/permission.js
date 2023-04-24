import router from '@/router'
import store from '@/store'

router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    // 已登录
    if (to.path === '/login') {
      // 不能去登录页, 要踢到首页
      next('/')
    } else {
      // 已登录, 并正常放行的情况, 需要保证用户数据存在, 再放行
      if (!store.state.user.userInfo.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 未登录
    const whiteList = ['/login', '/404', '/test']
    if (whiteList.includes(to.path)) {
      // 白名单可以随便进
      next()
    } else {
      next('/login')
    }
  }
})

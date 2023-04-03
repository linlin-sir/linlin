import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    // axios默认给数据加了一层data
    context.commit('setToken', result)
    localStorage.setItem('time', Date.now())
  },
  // 获取用户资料action
  // actions 部分
  async getUserInfo(context) {
    const res = await getUserInfo()
    // 前面这个接口数据不全, 需要用它的 userId 继续调另外一个接口, 来拼接详细数据
    const detail = await getUserDetailById(res.userId)
    // 将简单数据和详情数据拼接在一起, 放入到vuex里面
    context.commit('setUserInfo', {
      ...res,
      ...detail
    })
  },
  // actions 部分
  logout(context) {
    // 并非必须, 只是因为要连续调用两个 mutations
    // 想要封装的话只能用 actions
    // 这里就没有异步的意思
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

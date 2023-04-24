import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = {
  token: '',
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
  },
  removeToken(state) {
    state.token = ''
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
    localStorage.setItem('time', Date.now())
  },
  async getUserInfo(context) {
    const res = await getUserInfo()
    const detail = await getUserDetailById(res.userId)
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

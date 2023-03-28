import Vue from 'vue'
import Vuex from 'vuex'
import { getToken,setToken} from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      token:getToken()
  },
  getters: {
  },
  mutations: {
    SetToken(state, token) {
      setToken(token)
      state.token = token
  },
  },
  actions: {
  },
  modules: {
  }
})
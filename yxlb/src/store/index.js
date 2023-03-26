import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    list: [
      { id: 0, name: "大乔", gender: "男", age: 18 },
      { id: 1, name: "小乔", gender: "女", age: 20 },
      { id: 2, name: "鲁班", gender: "男", age: 48 },
      { id: 3, name: "后羿", gender: "女", age: 28 },
    ],
  },
  getters: {},
  mutations: {
    filterhero(state, data) {
      state.list = state.list.filter(v => {
        const name = data.name === '' || v.name.includes(data.name)
        const age = data.age === '' || v.age === data.age
        const gender = data.gender === '' || v.gender.includes(data.gender)
        return name && age && gender
      })
    },
    Delhero(state, id) {
      state.list = state.list.filter(v => v.id !== id)
    }
  },
  actions: {},
  modules: {}
})

import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: []
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = [
      ...constantRoutes,
      ...routes
    ]
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = asyncRoutes.filter(item => menus.includes(item.name))
    context.commit('setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

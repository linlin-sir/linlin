// 如果你创建了一个跟 vue 组件配置方式一样的对象, 就可以用 混入的方式
// 是的所有的组件都同时具有这个对象的配置
export default {
  methods: {
    // 如果当前用户的二级权限中拥有这个名字, 就可以点击按钮, 否则不行
    checkPerm(permName) {
      const points = this.$store.state.user.userInfo.roles.points
      return points.includes(permName)
    }
  }
}

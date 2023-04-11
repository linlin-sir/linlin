import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    },
    {
      path: 'import',
      component: () => import('@/views/employees/import.vue'),
      hidden: true
    },
    {
      // 动态路由参数
      path: 'detail/:id',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true
    }
  ]
}

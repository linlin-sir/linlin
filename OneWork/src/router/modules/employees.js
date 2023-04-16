import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
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
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/employees/print'), // 按需加载
      hidden: true
    }
  ]
}

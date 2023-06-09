import Layout from '@/layout'

export default {
  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: {
        title: '社会',
        icon: 'eye'
      }
    }
  ]
}

/**
 * @description 关于
 */

const route = [
  {
    path: '/about',
    meta: { title: '关于', icon: '' },
    name: 'About',
    redirect: '/about/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'AboutIndex',
        component: () => import('@/views/about/index.vue')
      }
    ]
  }
]

export default route

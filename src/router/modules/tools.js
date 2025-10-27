/**
 * @description 实用工具
 */

const route = [
  {
    path: '/tools',
    meta: { title: '实用工具', i18nName: 'tadTools', icon: 'tools' },
    name: 'Tools',
    redirect: '/tools/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'ToolsIndex',
        component: () => import('@/views/tools/navigation/index.vue')
      }
    ]
  }
]

export default route
// 优先级
export const priority = 3

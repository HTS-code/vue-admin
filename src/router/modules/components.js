/**
 * @description 组件
 */

const route = [
  {
    path: '/components',
    meta: { title: '组件', i18nName: 'tadComponents', icon: 'components' },
    name: 'components',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'markdown',
        meta: { title: 'Markdown', i18nName: 'tadComponentsMarkdown', icon: 'markdown' },
        name: 'componentsMarkdown',
        component: () => import('@/views/components/markdown/index.vue')
      }
    ]
  }
]

export default route

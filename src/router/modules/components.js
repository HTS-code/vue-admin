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
      },
      {
        path: 'editor',
        meta: { title: '富文本', i18nName: 'tadComponentsEditor', icon: 'editor' },
        name: 'componentsEditor',
        component: () => import('@/views/components/editor/index.vue')
      },
      {
        path: 'cropper',
        meta: { title: '图片裁剪', i18nName: 'tadComponentsCropper', icon: 'cropper' },
        name: 'componentsCropper',
        component: () => import('@/views/components/cropper/index.vue')
      },
      {
        path: 'video',
        meta: { title: '视频直播', i18nName: 'tadComponentsVideo', icon: 'video' },
        name: 'componentsVideo',
        component: () => import('@/views/components/video/index.vue')
      }
    ]
  }
]

export default route

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
      },
      {
        path: 'pinyin',
        meta: { title: '汉语拼音', i18nName: 'tadComponentsPinYin', icon: 'pinyin' },
        name: 'componentsPinYin',
        component: () => import('@/views/components/pinyin/index.vue')
      },
      {
        path: 'map',
        meta: { title: '地图', i18nName: 'tadComponentsMap', icon: 'map' },
        name: 'componentsMap',
        component: () => import('@/views/components/map/index.vue')
      },
      {
        path: 'qrcode',
        meta: { title: '二维码', i18nName: 'tadComponentsQrcode', icon: 'qrcode' },
        name: 'componentsQrcode',
        component: () => import('@/views/components/qrcode/index.vue')
      },
      {
        path: 'pdf',
        meta: { title: 'Pdf', i18nName: 'tadComponentsPdf', icon: 'pdf' },
        name: 'componentsPdf',
        component: () => import('@/views/components/pdf/index.vue')
      }
    ]
  }
]

export default route
// 优先级
export const priority = 1

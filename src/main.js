import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import pinia from './stores'
import i18n from './i18n'

const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import './assets/styles/index.scss'
import './assets/icon/iconfont'

// 自定义指令
// import * as directives from '@/directives'
// Object.keys(directives).forEach(key => {
//   app.directive(key, directives[key])
// })

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')

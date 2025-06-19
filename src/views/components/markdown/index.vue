<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Markdown 组件</span>
      </div>
    </template>

    <div class="describe">
      采用开源组件<el-link type="primary">md-editor-v3</el-link>，代码位置：src/views/components/markdown
    </div>

    <MdEditor
      class="md-editor-custom"
      v-model="text"
      previewTheme="default"
      codeTheme="atom"
      :footers="['markdownTotal']"
      :theme="theme"
      :language="language"
      :toolbars="toolbars"
      @onUploadImg="onUploadImg"
      @onSave="onSave"
    >
      <template #defToolbars>
        <Emoji />
      </template>
    </MdEditor>
  </el-card>
</template>

<script setup>
defineOptions({
  name: 'ComponentsMarkdown'
})
import { ref, computed } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { Emoji } from '@vavt/v3-extension'
import '@vavt/v3-extension/lib/asset/Emoji.css'

import { useSettingStore } from '@/stores/modules/setting'
import { ElMessage } from 'element-plus'

const settingStore = useSettingStore()

const text = ref('Hello World!')

const theme = computed(() => {
  return settingStore.isDark ? 'dark' : 'light'
})
const language = computed(() => {
  return settingStore.lang === 'en' ? 'en-US' : 'zh-CN'
})

const toolbars = [
  0,
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  '-',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly',
  'htmlPreview',
  'catalog',
  'github'
]

const onUploadImg = async (files, callback) => {
  ElMessage.info('上传')
  const res = await Promise.all(
    files.map(file => {
      return new Promise(() => {
        const form = new FormData()
        form.append('file', file)
      })
    })
  )

  callback(res.map(item => item.data.url))
}

const onSave = (v, h) => {
  h.then(() => {
    ElMessage.info('save')
  })
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

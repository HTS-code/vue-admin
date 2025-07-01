<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>PDF</span>
      </div>
    </template>

    <div class="describe">
      采用开源组件<el-link type="primary" href="https://www.npmjs.com/package/vue-pdf-embed" target="_blank">
        vue-pdf-embed </el-link
      >，代码位置：src/views/components/pdf
    </div>

    <div class="pdf-header">
      <template v-if="isLoading">Loading...</template>

      <div class="pdf-header-left" v-else>
        <div v-show="!isShowAllPage">
          <el-button :disabled="page === 1" plain :icon="ArrowLeft" @click="page--" size="small" />
          <span class="pdf-page"> {{ page }} / {{ pageCount }} </span>
          <el-button :disabled="page === pageCount" plain :icon="ArrowRight" @click="page++" size="small" />
        </div>
        <div v-show="isShowAllPage">共{{ pageCount }}页</div>
      </div>

      <div class="pdf-header-right">
        <el-checkbox v-model="isShowAllPage" label="显示所有页面" />
      </div>
    </div>
    <VuePdfEmbed
      annotation-layer
      text-layer
      :source="pdfSource"
      :page="page"
      @loaded="handleDocumentLoad"
      @rendered="handleDocumentRender"
    />
  </el-card>
</template>

<script setup>
defineOptions({
  name: 'ComponentsPdf'
})

import { ref, watch } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import VuePdfEmbed from 'vue-pdf-embed'
import 'vue-pdf-embed/dist/styles/annotationLayer.css'
import 'vue-pdf-embed/dist/styles/textLayer.css'

const pdfSource = ref(
  'https://xiaoxian521.github.io/hyperlink/pdf/Cookie%E5%92%8CSession%E5%8C%BA%E5%88%AB%E7%94%A8%E6%B3%95.pdf'
)

const page = ref(1)
const pageCount = ref(1)
const isLoading = ref(true)
const isShowAllPage = ref(false)

watch(
  () => isShowAllPage.value,
  () => {
    page.value = isShowAllPage.value ? null : 1
  }
)

const handleDocumentLoad = ({ numPages }) => {
  pageCount.value = numPages
}

const handleDocumentRender = () => {
  isLoading.value = false
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

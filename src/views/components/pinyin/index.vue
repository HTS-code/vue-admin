<template>
  <div class="card">
    <div class="card-header">
      <span>汉语拼音</span>
    </div>

    <div class="describe">
      采用开源组件<el-link type="primary" href="https://pinyin-pro.cn/guide/compare.html" target="_blank">
        pinyin-pro </el-link
      >，代码位置：src/views/components/pinyin
    </div>

    <div class="pinyin-content">
      <el-input
        v-model="input"
        @input="inputChange"
        style="width: 240px; margin-right: 10px"
        placeholder="请输入需要转换的文字"
      />
      <span>{{ inputResult }}</span>
    </div>

    <div class="pinyin-content">
      <div v-html="html('汉语拼音')"></div>
    </div>

    <div class="pinyin-content">
      <div v-html="html('不带音调', { toneType: 'none' })"></div>
    </div>

    <div class="pinyin-content custom">
      <div v-html="html('自定义样式')"></div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ComponentsPinYin'
})

import { ref } from 'vue'
import { pinyin, html } from 'pinyin-pro'

const input = ref('')
const inputResult = ref('')

const inputChange = val => {
  inputResult.value = pinyin(val)
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

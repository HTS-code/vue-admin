<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>图片裁剪</span>
      </div>
    </template>

    <div class="describe">
      <!-- 采用开源组件<el-link type="primary" href="https://www.wangeditor.com/v5/" target="_blank"> Wangeditor
      </el-link>，代码位置：src/views/components/editor -->
    </div>

    <div class="cropper-box">
      <div class="cropper-box-left">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
          @imgLoad="imgLoad"
        />
      </div>
      <div class="cropper-box-right">
        <div
          class="show-preview"
          :style="{ width: previews.w + 'px', height: previews.h + 'px', overflow: 'hidden', margin: '5px' }"
        >
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
      </div>
    </div>

    <div class="cropper-btn-box">
      <el-upload
        ref="uploadRef"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        accept=".png,.jpeg,.gif,.jpg"
        :limit="1"
        style="margin-right: 15px"
      >
        <template #trigger>
          <el-button type="primary" size="small">更换图片</el-button>
        </template>
      </el-upload>
      <el-button plain size="small" type="primary" icon="Plus" />
      <el-button plain size="small" type="primary" icon="Minus" />
      <el-button plain size="small" type="primary" icon="Refresh" />
      <el-button plain size="small" type="primary" icon="RefreshRight" />
      <el-button plain size="small" type="primary" icon="RefreshLeft" />
    </div>
  </el-card>
</template>

<script setup>
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'ComponentsCropper'
})

const previews = ref({})

const option = reactive({
  img: 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png',
  outputSize: 1,
  outputType: 'png',
  full: true,
  original: true,
  autoCrop: true,
  fixedBox: false
})

const realTime = data => {
  previews.value = data
}
const imgLoad = msg => {
  ElMessage.success(msg)
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

<template>
  <div class="card">
    <div class="card-header">
      <span>图片裁剪</span>
    </div>

    <div class="describe">
      采用开源组件<el-link type="primary" href="https://github.com/xyxiao001/vue-cropper" target="_blank">
        vue-cropper </el-link
      >，代码位置：src/views/components/cropper
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
          fillColor="#ffffff"
        />
      </div>
      <div class="cropper-box-right">
        <div
          class="show-preview"
          :style="{ width: previews.w + 'px', height: previews.h + 'px', overflow: 'hidden', margin: '5px' }"
        >
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" @click="previewsImg()" />

            <el-image-viewer
              v-if="srcList.length"
              :hide-on-click-modal="true"
              :url-list="srcList"
              show-progress
              @close="previewImgClose"
            />
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
        :on-change="fileChange"
        style="margin-right: 15px"
      >
        <template #trigger>
          <el-button type="primary" size="small">更换图片</el-button>
        </template>
      </el-upload>
      <el-button plain size="small" type="primary" icon="Plus" @click="imgScaleChange(1)" />
      <el-button plain size="small" type="primary" icon="Minus" @click="imgScaleChange(-1)" />
      <el-button plain size="small" type="primary" icon="RefreshRight" @click="imgRotateRight" />
      <el-button plain size="small" type="primary" icon="RefreshLeft" @click="imgRotateLeft" />
    </div>
  </div>
</template>

<script setup>
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { reactive, ref, useTemplateRef } from 'vue'
import { getImageUrl } from '@/utils'

defineOptions({
  name: 'ComponentsCropper'
})

const previews = ref({})
const cropper = useTemplateRef('cropper')
const uploadRef = useTemplateRef('uploadRef')

const srcList = ref([])

const option = reactive({
  img: getImageUrl('avatar.jpg'),
  autoCrop: true
})

const realTime = data => {
  previews.value = data
}

const fileChange = file => {
  uploadRef.value.clearFiles()
  option.img = URL.createObjectURL(file.raw)
}

const imgScaleChange = type => {
  cropper.value.changeScale(type)
}

const imgRotateRight = () => {
  cropper.value.rotateRight()
}

const imgRotateLeft = () => {
  cropper.value.rotateLeft()
}

const previewsImg = () => {
  cropper.value.getCropBlob(data => {
    srcList.value.push(URL.createObjectURL(data))
  })
}

const previewImgClose = () => {
  srcList.value = []
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

<template>
  <div class="card">
    <div class="card-header">
      <span>二维码</span>
    </div>

    <div class="describe">
      采用开源组件<el-link type="primary" href="https://qr-vue.tie.pub/" target="_blank"> Qrcode </el-link
      >，代码位置：src/views/components/qrcode
    </div>

    <div class="qrcode-list">
      <qrcode-vue value="Hell World, This is a Qrcode" />

      <qrcode-vue value="Hell World, This is a Qrcode" background="#fff" foreground="red" />

      <qrcode-vue class="qrcode-custom" value="Hell World, This is a Qrcode" :size="150" :margin="3" />

      <qrcode-vue value="Hell World, This is a Qrcode" :size="150" :image-settings="imageSettings" />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ComponentsQrcode'
})
import { getImageUrl } from '@/utils'
import QrcodeVue from 'qrcode.vue'
import { ref } from 'vue'

const imageSettings = ref({
  src: getImageUrl('avatar.jpg'),
  height: 32,
  width: 32,
  excavate: true
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

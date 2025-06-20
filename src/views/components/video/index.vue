<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>视频直播</span>
      </div>
    </template>

    <div class="describe">
      采用开源组件<el-link type="primary" href="https://v2.h5player.bytedance.com/gettingStarted/" target="_blank">
        XGplayer </el-link
      >，代码位置：src/views/components/video
    </div>

    <div class="video">
      <div class="video-item">
        <div class="video-item-title">MP4 格式</div>
        <div id="mse"></div>
      </div>
      <div class="video-item">
        <div class="video-item-title">FLV 格式</div>
        <div id="mseFlv"></div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
defineOptions({
  name: 'ComponentsVideo'
})

import { onMounted, onUnmounted, ref } from 'vue'
import Player from 'xgplayer'
import FlvPlugin from 'xgplayer-flv'
import 'xgplayer/dist/index.min.css'

const player = ref(null)
const playerFlv = ref(null)

const progressDot = [
  {
    id: 0, // 唯一标识，用于删除的时候索引
    time: 10, // 展示的时间点，例子为在播放到10s钟的时候展示
    text: '标记点1', // hover的时候展示文案，可以为空
    duration: 0.1, // 展示时间跨度，单位为s
    style: {
      // 指定样式
      backgroundColor: '#fff'
    }
  },
  {
    id: 1, // 唯一标识，用于删除的时候索引
    time: 15, // 展示的时间点，例子为在播放到10s钟的时候展示
    text: '标记点2', // hover的时候展示文案，可以为空
    duration: 0.1, // 展示时间跨度，单位为s
    style: {
      // 指定样式
      backgroundColor: '#fff'
    }
  }
]

onMounted(() => {
  player.value = new Player({
    id: 'mse',
    url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
    autoplay: false,
    poster: 'src/assets/images/video.png',
    progressDot
  })

  playerFlv.value = new Player({
    id: 'mseFlv',
    isLive: true,
    plugins: [FlvPlugin],
    url: 'https://live.nodemedia.cn:8443/live/b480_264.flv'
  })
})

onUnmounted(() => {
  player.value.destroy()
  playerFlv.value.destroy()
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

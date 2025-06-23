<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>地图</span>
      </div>
    </template>

    <div class="describe">
      采用
      <el-link type="primary" href="https://lbs.amap.com/api/javascript-api-v2/summary" target="_blank">
        高德地图 </el-link
      >， 代码位置：src/views/components/map
    </div>

    <div id="container"></div>
  </el-card>
</template>

<script setup>
defineOptions({
  name: 'ComponentsMap'
})
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { ElMessage } from 'element-plus'

let map = shallowRef(null)

const AMapValue = ref(null)
const infoWindow = ref(null)
const markers = ref([])

const onMarkerClick = e => {
  infoWindow.value.open(map.value, e.target.getPosition())
}
const getMarker = item => {
  const AMap = AMapValue.value

  const marker = new AMap.Marker({
    position: item.position, //位置
    offset: new AMap.Pixel(-28, -56),
    title: '测试的',
    icon: 'src/assets/svg/sign_online.svg'
  })

  marker.on('click', onMarkerClick)

  return marker
}

const initMap = () => {
  if (HTMLCanvasElement.prototype.getContext) {
    const originalGetContext = HTMLCanvasElement.prototype.getContext

    HTMLCanvasElement.prototype.getContext = function (type, attributes) {
      if (type === '2d') {
        attributes = Object.assign(attributes || {}, { willReadFrequently: true })
      }
      return originalGetContext.call(this, type, attributes)
    }
  }
  window._AMapSecurityConfig = {
    securityJsCode: '90b2f3317dc074bf0ddfa1e78943689a'
  }
  AMapLoader.load({
    key: '1a8fbb5455215adf3e188dbd962cfbe5',
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.Marker', 'AMap.ToolBar']
  })
    .then(AMap => {
      AMapValue.value = AMap

      map.value = new AMap.Map('container', {
        viewMode: '3D',
        zoom: 5,
        center: [116.405562, 39.881166]
      })

      let scale = new AMap.Scale()
      map.value.addControl(scale)

      let tool = new AMap.ToolBar()
      map.value.addControl(tool)

      const arr = [{ position: [116, 39] }, { position: [115, 39] }]
      markers.value = arr.map(location => {
        return getMarker(location)
      })

      infoWindow.value = new AMap.InfoWindow({
        //创建信息窗体
        isCustom: false,
        content: '这是一个点击的测试',
        offset: new AMap.Pixel(0, -45)
      })

      map.value.add(markers.value)
    })
    .catch(() => {
      ElMessage.error('Map初始化失败')
    })
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  map.value?.destroy()
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

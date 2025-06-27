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

    <div class="map-btn">
      <el-button type="primary" @click="getAddress">定位</el-button>
      <el-button type="primary" @click="setMarker">添加marker</el-button>
      <el-input
        id="mapSearch"
        v-model="input"
        style="width: 220px; margin: 0 10px"
        placeholder="请输入需要搜索的地址"
      />
      <span>选中地址：{{ choiceAd }}</span>
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
import { getSvgUrl } from '@/utils'

const input = ref('')
const choiceAd = ref('')
let map = shallowRef(null)

const AMapValue = ref(null)
const infoWindow = ref(null)
const markers = ref([])

const getAddress = () => {
  const AMap = AMapValue.value
  let geocoder = new AMap.Geocoder()
  let geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, // 是否使用高精度定位，默认：true
    timeout: 10000, // 设置定位超时时间，默认：无穷大
    offset: [10, 20], // 定位按钮的停靠位置的偏移量
    zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    position: 'TB' //  定位按钮的排放位置,  RB表示右下
  })

  geolocation.getCurrentPosition(function (status, result) {
    if (status === 'complete') {
      let lnglat = [result.position.lng, result.position.lat]
      geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          ElMessage.success('定位成功，当前位置为：' + result.regeocode.formattedAddress)
        } else {
          ElMessage.error('定位失败，请稍后再试')
        }
      })
    } else {
      ElMessage.error('定位失败')
    }
  })
}

const onMarkerClick = e => {
  infoWindow.value.open(map.value, e.target.getPosition())
}
const getMarker = item => {
  const AMap = AMapValue.value

  const marker = new AMap.Marker({
    position: item.position, //位置
    offset: new AMap.Pixel(-28, -56),
    title: '测试的',
    icon: getSvgUrl('sign_online.svg')
  })

  marker.on('click', onMarkerClick)

  return marker
}
const setMarker = () => {
  const AMap = AMapValue.value
  const arr = [{ position: [116.405562, 39.881166] }, { position: [115, 39] }]
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
    serviceHost: 'http://localhost:8080/_AMapService'
  }
  AMapLoader.load({
    key: '1a8fbb5455215adf3e188dbd962cfbe5',
    version: '2.0',
    plugins: [
      'AMap.Scale',
      'AMap.Marker',
      'AMap.ToolBar',
      'AMap.Geocoder',
      'AMap.Geolocation',
      'AMap.ControlBar',
      'AMap.PlaceSearch',
      'AMap.AutoComplete'
    ]
  })
    .then(AMap => {
      AMapValue.value = AMap

      map.value = new AMap.Map('container', {
        viewMode: '3D',
        zoom: 10,
        center: [116.405562, 39.881166]
      })

      let tool = new AMap.ToolBar()
      map.value.addControl(tool)

      let Scale = new AMap.Scale()
      map.value.addControl(Scale)

      let controlBar = new AMap.ControlBar({ position: 'RT' })
      map.value.addControl(controlBar)

      let autoOptions = {
        city: '010', //城市，默认全国
        input: 'mapSearch'
      }
      let auto = new AMap.AutoComplete(autoOptions)

      let placeSearch = new AMap.PlaceSearch({
        map: map.value
      })
      auto.on('select', select) //注册监听，当选中某条记录时会触发

      placeSearch.on('markerClick', e => {
        choiceAd.value = e.data?.address
      })
      function select(e) {
        placeSearch.setCity(e.poi.adcode)
        placeSearch.search(e.poi.name) //关键字查询查询
      }
    })
    .catch(e => {
      ElMessage.error('Map初始化失败', e)
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

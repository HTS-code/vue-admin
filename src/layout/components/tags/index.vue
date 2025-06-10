<template>
  <div class="tags" ref="tagsRef">
    <SvgIcon v-show="isArrowShow" name="arrow-left" @click="moveLeft" class="arrow-left" />
    <div class="tags-scroll" ref="tagsScrollRef">
      <div class="tags-content" :style="`transform: translateX(${translateX}px)`">
        <div
          class="tags-item"
          :class="index === activeIndex ? 'tags-item-active' : ''"
          ref="tagsItemRef"
          @click="tagClick(tag)"
          v-for="(tag, index) in tagList"
          :key="tag.path"
        >
          <SvgIcon v-if="config.ISTAGSICON" :name="tag?.meta?.icon" marginRight="3px" />
          <span>{{ $t(`messages.${tag?.meta?.i18nName}`) }}</span>
          <div :class="index > 0 ? 'tag-active' : ''">
            <SvgIcon class="tag-close" v-if="index > 0" name="del" @click.stop="tagClose(tag, index)" />
          </div>
        </div>
      </div>
    </div>
    <SvgIcon v-show="isArrowShow" name="arrow-right" @click="moveRight" class="arrow-right" />
  </div>
</template>

<script setup>
import { useTagStore } from '@/stores/modules/tag'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import config from '@/config'

const tagStore = useTagStore()

const route = useRoute()
const router = useRouter()
const activeIndex = ref(0)
const tagList = computed(() => tagStore.tagList)

const tagsRef = ref(null)
const tagsScrollRef = ref(null)
const tagsItemRef = ref([])
const isArrowShow = ref(false)

const translateX = ref(0)
const tagsWidth = ref(0)
const tagScrollWidth = ref(0)

// 初始化标签和尺寸计算
const initTags = async () => {
  await nextTick()
  if (!tagsScrollRef.value) {
    return
  }
  tagsWidth.value = tagsScrollRef.value.offsetWidth
  tagScrollWidth.value = tagsScrollRef.value.scrollWidth
  isArrowShow.value = tagScrollWidth.value > tagsWidth.value
}

// 自动滚动到当前激活标签
const moveView = async index => {
  await nextTick()
  if (!tagsItemRef.value[index] || !tagsScrollRef.value) {
    return
  }

  const tagEl = tagsItemRef.value[index]
  const tagLeft = tagEl.offsetLeft
  const tagRight = tagLeft + tagEl.offsetWidth
  const currentScrollLeft = -translateX.value
  const currentScrollRight = currentScrollLeft + tagsWidth.value

  let newTranslate = translateX.value

  // 判断是否需要调整位置
  if (tagLeft < currentScrollLeft) {
    newTranslate = -tagLeft
  } else if (tagRight > currentScrollRight) {
    newTranslate = -(tagRight - tagsWidth.value)
  }

  // 限制滚动范围
  const maxTranslate = Math.min(0, tagsWidth.value - tagScrollWidth.value)
  translateX.value = Math.max(Math.min(newTranslate, 0), maxTranslate)
}

// 左右箭头点击处理
const moveLeft = () => {
  translateX.value = Math.min(translateX.value + tagsWidth.value, 0)
  checkBoundary()
}

const moveRight = () => {
  const maxTranslate = tagsWidth.value - tagScrollWidth.value
  translateX.value = Math.max(translateX.value - tagsWidth.value, maxTranslate)
  checkBoundary()
}

// 边界检测（用于窗口resize后修正位置）
const checkBoundary = () => {
  const maxTranslate = Math.min(0, tagsWidth.value - tagScrollWidth.value)
  translateX.value = Math.max(translateX.value, maxTranslate)
  translateX.value = Math.min(translateX.value, 0)
}

// 监听路由变化自动滚动
watch(
  () => route.path,
  newVal => {
    const index = tagList.value.findIndex(item => item.path === newVal)
    activeIndex.value = index
    if (index > -1) {
      moveView(index)
    }
  }
)

// 监听窗口大小变化
onMounted(() => {
  initTags()
  activeIndex.value = tagList.value.findIndex(item => item.path === route.path)
  window.addEventListener('resize', () => {
    initTags()
    checkBoundary()
    const index = tagList.value.findIndex(item => item.path === route.path)
    if (index > -1) {
      moveView(index)
    }
  })
})

// 标签点击处理
const tagClick = tag => {
  router.push(tag.path)
}

const tagClose = (tag, index) => {
  tagStore.delTag(tag)
  if (route.path !== tag.path) {
    return
  }
  router.push(tagList.value[index - 1].path)
}

// 监听标签列表变化
watch(
  () => tagList.value.length,
  () => {
    initTags()
    const index = tagList.value.findIndex(item => item.path === route.path)
    if (index > -1) {
      moveView(index)
    }
  }
)
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  align-items: center;
  position: relative;

  &-scroll {
    flex: 1;
    overflow: hidden;
    position: relative;
    white-space: nowrap;

    .tags-content {
      display: flex;
      white-space: nowrap;
      float: left;
      transition: transform 0.5s ease-in-out;

      .tags-item {
        display: flex;
        align-items: center;
        position: relative;
        height: 32px;
        padding: 0 20px;
        border: 1px solid var(--el-border-color);
        border-radius: 5px;
        margin: 0 5px;
        cursor: pointer;

        &:hover {
          color: var(--el-color-primary);
        }

        .tag-active {
          width: 16px;
          position: relative;
          right: -10px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;

          &:hover {
            background: #ccc;
            color: #fff;
          }
        }
      }

      .tags-item-active {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }
    }
  }

  .arrow-left,
  .arrow-right {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .arrow-left {
    box-shadow: 5px 0 5px -6px #ccc;
  }

  .arrow-right {
    box-shadow: -5px 0 5px -6px #ccc;
  }
}
</style>

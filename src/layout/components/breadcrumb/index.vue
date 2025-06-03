<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.path">
        <template #default>
          <div class="breadcrumb">
            <span :class="'iconfont ' + item.meta?.icon"></span>
            <span>{{ $t(`messages.${item?.meta?.i18nName}`) }}</span>
          </div>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadCrumbList = ref([])

watch(
  () => route.path,
  () => {
    let arr = JSON.parse(JSON.stringify(route.matched))
    let index = arr.findIndex(item => !item.meta.title)

    if (index > -1) {
      arr.splice(index, 1)
    }
    breadCrumbList.value = arr
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;

  .breadcrumb-icon {
    margin-right: 2px;
  }
}

.iconfont {
  margin-right: 3px;
  font-size: 1rem;
}
</style>

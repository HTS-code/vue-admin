<template>
  <template v-for="item in menu" :key="item.path">
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
      <template #title>
        <div
          :class="
            item.icon
              ? settingStore.isCollapsed
                ? 'iconfont-active iconfont ' + item.icon
                : 'iconfont ' + item.icon
              : ''
          "
        ></div>
        <span>{{ $t(`messages.${item.il18Name}`) }}</span>
      </template>
      <menu-tree :menu="item.children" />
    </el-sub-menu>

    <template v-else>
      <el-menu-item :index="item.path">
        <div
          :class="
            item.icon
              ? settingStore.isCollapsed
                ? 'iconfont-active iconfont ' + item.icon
                : 'iconfont ' + item.icon
              : ''
          "
        ></div>
        <span>{{ $t(`messages.${item.il18Name}`) }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
import { useSettingStore } from '@/stores/modules/setting'

const settingStore = useSettingStore()

defineOptions({
  name: 'menuTree'
})
defineProps({
  menu: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.menu-icon {
  font-size: 1.28rem;
}

.iconfont {
  margin-right: 5px;
}

.iconfont-active {
  margin: 5px;
}
</style>

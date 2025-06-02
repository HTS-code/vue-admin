<template>
  <div class="sidebar">
    <logo-view class="logo-view" />
    <el-scrollbar class="menu-scrollbar">
      <el-menu router :default-active="route.path" :unique-opened="true" :collapse="settingStore.isCollapsed">
        <menu-tree :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import MenuTree from '../menu/index.vue'
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
import logoView from '../logo/index.vue'
import { ref } from 'vue'

const settingStore = useSettingStore()

const route = useRoute()

const menu = ref([
  { path: '/dashboard', icon: 'icon-house', name: '首页', children: [] },
  {
    path: '/about/index',
    icon: 'icon-about',
    name: '关于',
    children: []
  }
])
</script>

<style lang="scss" scoped>
.sidebar {
  box-shadow: var(--el-box-shadow);
  height: 100vh;

  .logo-view {
    height: 52px;
    margin-left: 20px;
  }

  .el-menu {
    border: none;
  }

  .menu-scrollbar {
    height: calc(100vh - 52px);
    padding: 0 5px;
    box-sizing: border-box;
  }
}

:deep(.el-menu-item:hover) {
  background: transparent;
  color: var(--el-color-primary);
}

:deep(.el-sub-menu__title:hover) {
  background-color: transparent;
  color: var(--el-color-primary);
}

:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary);
  border-radius: 5px;
  color: #fff;
}
</style>

<template>
  <div class="sidebar">
    <custom-logo class="custom-logo" />
    <el-scrollbar class="menu-scrollbar">
      <el-menu router :default-active="route.path" :unique-opened="true" :collapse="settingStore.isCollapsed">
        <custom-menu :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
import customLogo from './components/logo.vue'
import customMenu from './components/menu.vue'
import { ref } from 'vue'

const settingStore = useSettingStore()

const route = useRoute()

const menu = ref([
  { path: '/dashboard', icon: 'house', il18Name: 'tadHome', name: '首页', id: '01', children: [] },
  {
    path: '/system',
    icon: 'system',
    name: '系统管理',
    il18Name: 'tadSysManagement',
    id: '05',
    children: [
      {
        path: '/system/user',
        icon: 'user',
        name: '用户管理',
        il18Name: 'tadUserManage',
        id: '051',
        children: []
      },
      {
        path: '/system/role',
        icon: 'person',
        name: '角色管理',
        il18Name: 'tadRoleManage',
        id: '052',
        children: []
      }
    ]
  },
  {
    path: '/about/index',
    icon: 'about',
    name: '关于',
    il18Name: 'tadAbout',
    id: '07',
    children: []
  }
])
</script>

<style lang="scss" scoped>
.sidebar {
  box-shadow: var(--el-box-shadow);
  height: 100vh;

  .custom-logo {
    height: 52px;
    margin-left: 16px;
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

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
import customLogo from './components/logo/index.vue'
import customMenu from './components/menu/index.vue'
import { ref } from 'vue'

const settingStore = useSettingStore()
const route = useRoute()
const menu = ref([])
// 获取菜单
const getMenu = () => {
  // 获取前端注册所有动态路由
  let modules = import.meta.glob('@/router/modules/*.js', { eager: true })
  const routes = []
  // 1. 将路径和优先级组成数组
  const moduleEntries = Object.entries(modules).map(([path, module]) => ({
    path,
    priority: module.priority || 99, // 默认优先级（数字越大越靠后）
    module
  }))
  // 2. 按优先级排序（从小到大）
  moduleEntries.sort((a, b) => a.priority - b.priority)
  // 3. 按排序后的顺序添加路由
  moduleEntries.forEach(({ module }) => {
    routes.push(...module.default)
  })
  menu.value = routes.map(item => {
    return {
      path: item.path,
      icon: item?.meta.icon || '',
      name: item?.meta.title || '',
      il18Name: item.meta.i18nName,
      id: item.name,
      children: getSubMenu(item)
    }
  })
  menu.value.unshift({ path: '/dashboard', icon: 'house', il18Name: 'tadHome', name: '首页', id: '01', children: [] })
}
// 获取子菜单
const getSubMenu = item => {
  if (item.children.length === 1 && item.children[0].path === 'index') {
    return []
  }
  return item.children.map(child => {
    return {
      path: item.path + '/' + child.path,
      icon: child?.meta.icon || '',
      name: child?.meta.title || '',
      il18Name: child?.meta.i18nName || '',
      id: child.name
    }
  })
}
getMenu()
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>

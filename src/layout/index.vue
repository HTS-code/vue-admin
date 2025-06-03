<template>
  <div class="layout" ref="layoutRef">
    <aside class="sidebar-container" :class="settingStore.isCollapsed ? 'sidebar-container-collapsed' : ''">
      <sidebar-container />
    </aside>
    <section class="main-container">
      <header>
        <header-container :container="layoutRef" class="header-container" />
        <tags-container
          class="tags-container"
          :class="settingStore.isCollapsed ? 'tags-container-collapsed' : ''"
          v-show="config.ISTAGS"
        />
      </header>

      <section>
        <el-scrollbar class="content-views">
          <router-view v-slot="{ Component }">
            <Transition name="slide-fade">
              <keep-alive :include="tagStore.tagList.map(item => item.name)">
                <component :is="Component" />
              </keep-alive>
            </Transition>
          </router-view>
        </el-scrollbar>
      </section>
    </section>
  </div>
</template>

<script setup>
import config from '@/config'
import sidebarContainer from './components/sidebar/index.vue'
import headerContainer from './components/header/index.vue'
import tagsContainer from './components/tags/index.vue'
import { useSettingStore } from '@/stores/modules/setting'
import { useTagStore } from '@/stores/modules/tag'
import { ref, watch } from 'vue'

import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()

const tagStore = useTagStore()
const { tagList } = storeToRefs(tagStore)

const settingStore = useSettingStore()

const layoutRef = ref(null)

watch(
  route,
  newVal => {
    let index = tagList.value.findIndex(item => item.name === newVal.name)
    if (index < 0) {
      tagStore.addTag({
        name: newVal.name,
        path: newVal.path,
        meta: newVal.meta
      })
    }
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.layout {
  display: flex;

  .sidebar-container {
    width: 200px;
    height: 100vh;
    min-width: 200px;
    min-height: 100vh;
    max-height: 100vh;
    border-right: 1px solid var(--el-border-color);
    transition: all 0.3s;
    overflow: hidden;
  }

  .sidebar-container-collapsed {
    width: 65px;
    min-width: 65px;
  }

  .main-container {
    flex: 1;
  }

  .header-container {
    height: 52px;
    border-bottom: 1px solid var(--el-border-color);
  }

  .tags-container {
    height: 40px;
    width: calc(100vw - 200px);
    border-bottom: 1px solid var(--el-border-color);
  }

  .tags-container-collapsed {
    width: calc(100vw - 65px);
  }

  .content-views {
    padding: 10px;
    min-height: calc(100vh - 92px);
    box-sizing: border-box;
  }
}
</style>

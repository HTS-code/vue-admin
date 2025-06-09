<template>
  <div class="header" ref="header">
    <div class="header-left">
      <SvgIcon
        :class="settingStore.isCollapsed ? 'icon-style-form' : ''"
        name="collapsed"
        width="1.5rem"
        height="1.5rem"
        cursor="pointer"
        @click="flodClick"
      />
      <CoustomBreadcrumb class="bread-crumb" v-if="config.ISBREADCRUMB" />
    </div>
    <div class="header-right">
      <div class="header-icon">
        <SvgIcon name="fulll" width="1.2rem" height="1.2rem" cursor="pointer" />
      </div>
      <CustomFontSize />
      <CustomLang />
      <CustomTheme />
      <CustomBell />
      <CustomSetting />
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from '@/stores/modules/setting'
import CoustomBreadcrumb from '../breadcrumb/index.vue'
import CustomFontSize from './components/font.vue'
import CustomLang from './components/lang.vue'
import CustomTheme from './components/theme.vue'
import CustomBell from './components/bell.vue'
import CustomSetting from './components/setting.vue'
import config from '@/config'

const settingStore = useSettingStore()

const flodClick = () => {
  settingStore.increment()
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .icon-style {
    width: 1.12rem;
    height: 1.12rem;
    margin-right: 10px;
    cursor: pointer;
  }

  .icon-style-form {
    transition: all 0.3s;
    transform: rotate(180deg);
  }

  .header-left {
    display: flex;
    align-items: center;

    .bread-crumb {
      margin-left: 10px;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
  }
}
</style>

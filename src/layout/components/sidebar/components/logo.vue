<template>
  <div class="logo">
    <img class="logo-img" src="@/assets/logo.svg" alt="logo" />
    <h1 v-show="!settingStore.isCollapsed">
      {{ $t('messages.title') }}
    </h1>
  </div>
</template>

<script setup>
import { useSettingStore } from '@/stores/modules/setting'

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  &-img {
    width: 32px;
    margin-right: 5px;
  }

  h1 {
    font-size: 1.2rem;
  }
}
</style>

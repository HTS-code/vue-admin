<template>
  <div @click="login" class="login">登录</div>
</template>

<script setup>
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await userStore.getInfoAction()
  router.replace('/')
}
</script>

<style lang="scss" scoped></style>

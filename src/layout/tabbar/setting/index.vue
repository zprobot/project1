<template>
  <el-button icon="RefreshRight" circle @click="refresh" />
  <el-button icon="FullScreen" circle @click="changeFullscreen" />
  <el-button icon="Setting" circle />
  <img
    :src="userStore.userInfo.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userInfo.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
const settingStore = useSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
// 刷新
const refresh = () => {
  settingStore.refresh = !settingStore.refresh
}
// 全屏模式切换
const changeFullscreen = () => {
  let isFull = document.fullscreenElement
  if (!isFull) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  await userStore.logout()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style scoped></style>

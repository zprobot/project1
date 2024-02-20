<template>
  <div>
    <el-button icon="RefreshRight" circle @click="refresh" />
    <el-button icon="FullScreen" circle @click="changeFullscreen" />
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="300"
      :visible="visible"
    >
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            size="small"
            v-model="themeColor"
            show-alpha
            @change="changeThemeColor"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            size="small"
            active-icon="MoonNight"
            inactive-icon="Sunny"
            @change="changeDark"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button icon="Setting" circle @click="visible = !visible" />
      </template>
    </el-popover>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSettingStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
let dark = ref<boolean>(false)
let visible = ref<boolean>(false)
let themeColor = ref('rgba(255, 69, 0, 0.68)')
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
//
const changeDark = () => {
  // 获取根节点
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
//
const changeThemeColor = () => {
  console.log(123)
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', themeColor.value)
}
</script>

<style scoped></style>

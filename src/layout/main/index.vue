<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="showComponent" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/settings'
import { ref, watch, nextTick } from 'vue'
// 组件是否显示
let showComponent = ref(true)
const settingStore = useSettingStore()
watch(
  () => settingStore.refresh,
  () => {
    showComponent.value = false
    // 等待下一次dom更新
    nextTick(() => {
      showComponent.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>

import { defineStore } from 'pinia'
import { ref } from 'vue'
export default defineStore('settingStore', () => {
  // 菜单折叠
  const fold = ref(false)
  // 刷新dom
  const refresh = ref(false)
  return {
    fold,
    refresh,
  }
})

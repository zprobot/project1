import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResposeData, Category } from '@/api/product/attr/type'
export default defineStore('CategoryStore', () => {
  // 一级菜单数据
  const c1Arr = ref<Category[]>([])
  // 一级id
  const c1Id = ref<number>()
  // 二级菜单数据
  const c2Arr = ref<Category[]>([])
  // 二级id
  const c2Id = ref<number>()
  // 三级菜单数据
  const c3Arr = ref<Category[]>([])
  // 三级id
  const c3Id = ref<number>()
  const getC1 = async () => {
    const res: CategoryResposeData = await reqC1()
    if (res.code == 200) {
      c1Arr.value = res.data
    }
  }
  const getC2 = async () => {
    const res: CategoryResposeData = await reqC2(c1Id.value as number)
    if (res.code == 200) {
      c2Arr.value = res.data
    }
  }
  const getC3 = async () => {
    const res: CategoryResposeData = await reqC3(c2Id.value as number)
    if (res.code == 200) {
      c3Arr.value = res.data
    }
  }
  return { c1Arr, c1Id, c2Arr, c2Id, c3Arr, c3Id, getC1, getC2, getC3 }
})

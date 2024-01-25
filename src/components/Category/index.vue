<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="getC2Arr">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="getC3Arr">
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()

onMounted(() => {
  getC1Id()
})
const getC1Id = () => {
  categoryStore.getC1()
}
// 一级菜单变化时获取二级菜单
const getC2Arr = () => {
  // 清理加载的数据 (二级菜单后获取的数据)
  categoryStore.c2Id = undefined
  categoryStore.c3Arr = []
  categoryStore.c3Id = undefined
  categoryStore.getC2()
}
// 二级菜单变化时获取三级菜单
const getC3Arr = () => {
  // 清理加载的数据 (三级菜单后获取的数据)
  categoryStore.c3Id = undefined
  categoryStore.getC3()
}
</script>

<style scoped></style>

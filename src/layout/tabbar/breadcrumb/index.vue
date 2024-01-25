<template>
  <el-icon style="margin-right: 10px">
    <component
      :is="settingStore.fold ? 'Fold' : 'Expand'"
      @click="changeIcon"
    ></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/settings'
import { useRoute } from 'vue-router'
const settingStore = useSettingStore()
const route = useRoute()
const changeIcon = () => {
  settingStore.fold = !settingStore.fold
}
</script>

<style scoped></style>

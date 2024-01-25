<template>
  <div class="logo" v-show="setting.logoShow">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    margin-right: 10px;
  }
  p {
    color: white;
    font-size: $base-menu-logo-fontSize;
  }
}
</style>

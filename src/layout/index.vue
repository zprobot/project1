<template>
  <div class="layout_container">
    <aside class="layout_aside">
      <logo />
      <el-scrollbar class="aside_scrollbar">
        <el-menu
          class="menu"
          text-color="white"
          background-color="#001529"
          :default-active="route.path"
          :collapse="settingStore.fold ? true : false"
        >
          <Menu :menuList="RouteStore.routesConst" />
        </el-menu>
      </el-scrollbar>
    </aside>
    <nav class="layout_nav" :class="{ fold: settingStore.fold ? true : false }">
      <Tabbar />
    </nav>
    <div
      class="layout_main"
      :class="{ fold: settingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useRouteStore from '@/store/modules/routes'
import { useRoute } from 'vue-router'
import useSettingStore from '@/store/modules/settings'
// 使用路由实现默认激活
let route = useRoute()
let RouteStore = useRouteStore()
let settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  position: relative;
  .el-menu {
    border-right: none;
  }
  .layout_aside {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .aside_scrollbar {
      height: calc(100vh - $base-menu-logo-height);
    }
  }
  .layout_nav {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>

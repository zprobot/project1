<template>
  <div class="container">
    <!--内容区域-->
    <div class="screen" ref="screen">
      <div class="top"><Top /></div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Count class="count" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Count from './components/count/index.vue'
import { ref, onMounted } from 'vue'
const screen = ref<HTMLDivElement>()
function getScale(w = 1920, h = 1080) {
  const wScale = window.innerWidth / w
  const hScale = window.innerHeight / h
  return wScale < hScale ? wScale : hScale
}
onMounted(() => {
  // 等比例缩放后拽回基点
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
// 监听视口变化
window.onresize = () => {
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-image: url(./images/bg.png);
  background-size: cover;
  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    width: 1920px;
    height: 1080px;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .rank {
          flex: 1.2;
        }
        .year {
          flex: 1;
        }
        .count {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
        }
        .line {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
    }
  }
}
</style>

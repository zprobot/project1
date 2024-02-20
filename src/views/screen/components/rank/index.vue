<template>
  <div class="box">
    <div class="top">
      <p class="title">热门景区排行</p>
      <p class="bg"></p>
    </div>
    <div class="tab"></div>
    <div class="charts" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let chart = ref()
const option = {
  title: {
    text: '访问量',
    left: '50%',
    textStyle: {
      color: 'white',
      fontSize: 16,
    },
  },
  xAxis: {
    type: 'category',
    //boundaryGap: false, // 两边不留白
    splitLine: {
      show: false,
    },
    data: ['一', '二', '三', '四', '五', '六', '七'],
  },
  yAxis: {
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
    },
  },
  grid: {
    left: 40,
    right: 0,
    top: 0,
    bottom: 20,
  },
  series: [
    {
      type: 'line',
      data: [120, 240, 360, 88, 400, 500, 200],
      //smooth: true,
    },
    {
      type: 'bar',
      data: [200, 300, 100, 200, 303, 601, 702],
      label: {
        show: true,
      },
    },
  ],
}
onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100% 100%;
  .top {
    margin-top: 10px;
    margin-bottom: 30px;
    .title {
      font-size: 20px;
      color: white;
    }
    .bg {
      width: 68px;
      margin-top: 10px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .charts {
    height: calc(100% - 80px);
  }
}
</style>

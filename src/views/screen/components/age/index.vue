<template>
  <div class="box">
    <div class="top">
      <p class="title">年龄比例</p>
      <p class="bg"></p>
    </div>
    <div class="echart" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let chart = ref()
const option = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 'center',
    right: 20,
    orient: 'vertical',
    textStyle: {
      color: 'white',
      fontSize: 14,
    },
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: true,
        position: 'inside',
        color: 'white',
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
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
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  .top {
    margin-left: 10px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .echart {
    height: 250px;
  }
}
</style>

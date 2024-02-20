<template>
  <div class="box">
    <div class="top">
      <p class="title">预约渠道数据统计</p>
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
  tooltip: {
    trigger: 'item',
  },
  legend: {
    type: 'scroll',
    bottom: 10,
    data: (function () {
      let list = []
      for (let i = 1; i <= 28; i++) {
        list.push(i + 2000 + '')
      }
      return list
    })(),
  },
  visualMap: {
    top: 'middle',
    right: 10,
    color: ['red', 'yellow'],
    calculable: true,
  },
  radar: {
    indicator: [
      { text: 'IE8-', max: 400 },
      { text: 'IE9+', max: 400 },
      { text: 'Safari', max: 400 },
      { text: 'Firefox', max: 400 },
      { text: 'Chrome', max: 400 },
    ],
  },
  series: (function () {
    let series = []
    for (let i = 1; i <= 28; i++) {
      series.push({
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          width: 1,
        },
        emphasis: {
          areaStyle: {
            color: 'rgba(0,250,0,0.3)',
          },
        },
        data: [
          {
            value: [
              (40 - i) * 10,
              (38 - i) * 4 + 60,
              i * 5 + 10,
              i * 9,
              (i * i) / 2,
            ],
            name: i + 2000 + '',
          },
        ],
      })
    }
    return series
  })(),
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
    margin-bottom: 40px;
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

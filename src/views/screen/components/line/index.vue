<template>
  <div class="box">
    <div class="top">
      <p class="title">未来30游客量趋势图</p>
      <p class="bg"></p>
    </div>
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
    left: 40,
    top: 20,
    textStyle: {
      color: 'white',
      fontSize: 16,
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false, // 两边不留白
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
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
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
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-left: 5px;
  .top {
    .title {
      font-size: 20px;
      color: white;
    }
    .bg {
      margin-top: 10px;
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>

<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约游客总量
        <span>999</span>
        人
      </p>
      <div class="number">
        <span v-for="(item, index) in number" :key="index">{{ item }}</span>
      </div>
      <div class="charts" ref="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
// 水球图扩展
import 'echarts-liquidfill'
let chart = ref()
let number = ref<string>('20208人')
onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    title: {
      text: '水球图',
    },
    xAxis: {},
    yAxis: {},
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      radius: '100%',
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  margin-top: 10px;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
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
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      font-size: 20px;
      color: white;
      text-align: center;
      margin-right: 20px;
      span {
        color: yellow;
      }
    }
    .number {
      margin-top: 30px;
      display: flex;
      padding: 10px;
      span {
        flex: 1;
        background: url(../../images/total.png) no-repeat;
        background-size: 100% 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #29fcff;
      }
    }
    .charts {
      width: 100%;
      height: 250px;
    }
  }
}
</style>

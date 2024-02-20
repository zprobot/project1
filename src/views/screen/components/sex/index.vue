<template>
  <div class="box">
    <div class="center">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" />
      </div>
    </div>
    <div class="content">
      <div class="statistic">
        <p>男士58%</p>
        <p>女士42%</p>
      </div>
      <div class="charts" ref="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let chart = ref()
onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    title: {
      text: '男女比例',
      left: '40%',
      textStyle: {
        color: 'skyblue',
      },
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'category',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
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
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .center {
    margin-left: 10px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      margin-top: 10px;
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .sex {
    align-items: center;
    display: flex;
    justify-content: center;
    .man {
      width: 111px;
      height: 115px;
      margin: 30px;
      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      width: 111px;
      height: 115px;
      margin: 30px;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .content {
    width: 60%;
    margin: 0 auto;
    .statistic {
      display: flex;
      justify-content: space-between;
      color: white;
    }
    .charts {
      height: 100px;
    }
  }
}
</style>

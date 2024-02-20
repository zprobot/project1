<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.userInfo.avatar" />
        <div>
          <h3>{{ getTime() }}好!{{ userStore.userInfo.username }}</h3>
          <p>硅谷甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon name="welcome" width="600px" height="300px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: aqua;
  }
  div {
    margin-top: 10px;
    margin-left: 20px;
    h3 {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    p {
      font-style: italic;
      color: aqua;
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>

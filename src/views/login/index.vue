<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0">1</el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="userForm"
          :rules="rules"
          ref="forms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="userForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              show-password
              v-model="userForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import type { FormRules } from 'element-plus'
import type { loginForm } from '@/api/user/type'
let userStore = useUserStore()
const userForm = reactive<loginForm>({
  username: '',
  password: '',
})
const router = useRouter()
const route = useRoute()
// 显示加载
let loading = ref(false)
// 获取表单dom
const forms = ref()
const validateUsername = (_: any, value: any, callback: any) => {
  // rule 表示验证规则
  // value 是表单item接收的值
  // callback 是成功的回调
  if (/^\w{5,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('账号长度为5-10'))
  }
}
const validatePassword = (_: any, value: any, callback: any) => {
  if (/^\w{6,16}$/.test(value)) {
    callback()
  } else {
    callback(new Error('密码长度为8-16'))
  }
}
const rules = reactive<FormRules<loginForm>>({
  username: [
    {
      trigger: 'change',
      validator: validateUsername,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatePassword,
    },
  ],
})
async function login() {
  // 保证表单校验通过才发请求
  // 表单校验不通过validate返回一个失败的promise
  await forms.value.validate()
  loading.value = true
  try {
    // 请求成功
    await userStore.userLogin(userForm)
    let redirect = (route.query.redirect as string) || '/'
    router.push({ path: redirect })
    let time = getTime()
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `${time}好!`,
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  padding: 40px;
  .login-form {
    position: relative;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    width: 80%;
    top: 30vh;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

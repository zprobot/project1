import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, logoutUser } from '@/api/user'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
  logoutResponse,
} from '@/api/user/type'
import { ref, reactive } from 'vue'
export default defineStore('User', () => {
  // token
  const token = ref(localStorage.getItem('TOKEN') as string)
  // 用户信息字段
  const userInfo = reactive({
    username: '',
    avatar: '',
  })
  // 用户登录
  async function userLogin(data: loginForm) {
    const res: loginResponseData = await reqLogin(data)
    if (res.code == 200) {
      token.value = res.data
      // 持久化存储
      localStorage.setItem('TOKEN', res.data)
      // 返回成功的promise
      return 'ok'
    } else {
      //返回失败的promise
      return Promise.reject(new Error(res.data))
    }
  }
  // 获取用户信息
  async function getUserInfo() {
    const res: userResponseData = await reqUserInfo()
    if (res.code == 200) {
      userInfo.username = res.data.name
      userInfo.avatar = res.data.avatar
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
  // 退出登录
  async function logout() {
    const res: logoutResponse = await logoutUser()
    if (res.code == 200) {
      token.value = ''
      userInfo.username = ''
      userInfo.avatar = ''
      localStorage.removeItem('TOKEN')
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
  return { token, userLogin, getUserInfo, userInfo, logout }
})

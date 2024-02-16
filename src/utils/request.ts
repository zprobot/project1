// 二次封装axios。使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径都携带/api
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use((config) => {
  // 使登录后每次请求都携带token,请求用户信息
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // config包含请求配置
  return config
})
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 失败的回调，处理网络错误
    let message: string = ''
    const status = error.response.code // 获取状态码
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权限访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = '网络错误'
        break
    }
    // 提升错误信息
    ElMessage({
      type: 'error',
      message,
    })
    // 返回失败的回调
    return Promise.reject(error)
  },
)

export default request

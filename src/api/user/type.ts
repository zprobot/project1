// 登录接口的数据类型
export type loginForm = {
  username: string
  password: string
}
// 登录接口响应类型
export type loginResponseData = {
  code: number
  data: string
  message: string
  ok: boolean
}
// 用户信息接口响应类型
type userInfo = {
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: string[]
  message: string
  ok: boolean
}
export type userResponseData = {
  code: number
  data: userInfo
  message: string
  ok: boolean
}
// 用户登出相应类型
export type logoutResponse = {
  code: number
  message: string
  data: any
  ok: boolean
}

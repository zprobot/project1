// 用户接口
import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 暴露请求函数
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
export const logoutUser = () => request.post<any, any>(API.LOGOUT_URL)

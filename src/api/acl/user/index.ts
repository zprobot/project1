import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  RoleResponseData,
  AssignRole,
} from './type'
enum API {
  // 获取用户列表
  USER_URL = '/admin/acl/user/',
  // 添加用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 用户职位
  ROLE_URL = '/admin/acl/user/toAssign/',
  // 分配职位
  ASSIGNROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除用户
  DELETE_URL = '/admin/acl/user/remove/',
  // 批量删除用户
  BATCHDELETE_URL = '/admin/acl/user/batchRemove',
}
export const reqUserList = (page: number, limit: number, keyword: string) =>
  request.get<any, UserResponseData>(
    `${API.USER_URL}${page}/${limit}/?username=${keyword}`,
  )
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
export const reqGetAllRoles = (userId: number) =>
  request.get<any, RoleResponseData>(API.ROLE_URL + userId)
export const reqAssignRole = (data: AssignRole) =>
  request.post<any, any>(API.ASSIGNROLE_URL, data)
export const reqDeleteUser = (userId: number) =>
  request.delete<any, any>(API.DELETE_URL + userId)
export const reqBatchDeleteUser = (userIdList: number[]) =>
  request.delete<any, any>(API.BATCHDELETE_URL, { data: userIdList })

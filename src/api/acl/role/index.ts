import request from '@/utils/request'
import type { RoleResponseData, Role, PermissionResponseData } from './type'
enum API {
  // 获取职位
  ROLE_URL = '/admin/acl/role/',
  // 添加职位
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 获取权限
  RULE_URL = '/admin/acl/permission/toAssign/',
  // 分配权限
  ASSIGNRULE_URL = '/admin/acl/permission/doAssign/',
  // 删除职位
  DELETE_URL = '/admin/acl/role/remove/',
}
export const reqGetAllRoles = (page: number, limit: number, roleName = '') =>
  request.get<any, RoleResponseData>(
    `${API.ROLE_URL}${page}/${limit}/?roleName=${roleName}`,
  )
export const reqAddOrUpdateRole = (role: Role) => {
  if (role.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, role)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, role)
  }
}
export const reqGetPermissions = (roleId: number) =>
  request.get<any, PermissionResponseData>(API.RULE_URL + roleId)
export const reqAssignRule = (roleId: number, ruleId: number[]) =>
  request.post<any, any>(
    `${API.ASSIGNRULE_URL}?roleId=${roleId}&permissionId=${ruleId}`,
  )
export const reqDeleteRole = (roleId: number) =>
  request.delete<any, any>(API.DELETE_URL + roleId)

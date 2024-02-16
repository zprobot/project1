import request from '@/utils/request'
import type { PermissionResponseData, MenuParams } from './type'
enum API {
  MENU_URL = '/admin/acl/permission',
  // 新增
  ADDMENU_URL = '/admin/acl/permission/save',
  // 修改
  UPDATEMENU_URL = '/admin/acl/permission/update',
  // 删除
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}

export const reqMenu = () =>
  request.get<any, PermissionResponseData>(API.MENU_URL)
export const reqAddOrUpdateMenu = (menu: MenuParams) => {
  if (menu.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, menu)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, menu)
  }
}
export const reqDeleteMenu = (menuId: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + menuId)

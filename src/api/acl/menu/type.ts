export type ResponseData = {
  code: number
  message: string
  ok: boolean
}
export type Permission = {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null | string
  toCode: null | string
  type: number
  status: null
  level: number
  children?: PerssionList
  select: boolean
}
export type PerssionList = Permission[]
export interface PermissionResponseData extends ResponseData {
  data: PerssionList
}
export type MenuParams = {
  id?: number
  level: number
  name: string
  pid: number
  code: string
}

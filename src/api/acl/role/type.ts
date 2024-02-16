export type ResponseData = {
  code: number
  message: string
  ok: boolean
}
export type Role = {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
export type RoleData = {
  records: Role[]
  total: number
  size: number
  current: number
  orders: []
  optimizeCountSql: boolean
  hitCount: boolean
  countId: null
  maxLimit: null
  searchCount: boolean
  pages: number
}
export interface RoleResponseData extends ResponseData {
  data: RoleData
}
export type Perssion = {
  id: number
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
export type PerssionList = Perssion[]
export interface PermissionResponseData extends ResponseData {
  data: PerssionList
}

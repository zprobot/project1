export type ResponseData = {
  code: number
  message: string
  ok: boolean
}
export type User = {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password?: string
  name: string
  phone?: string | null
  roleName?: string
}
export type UserData = {
  records: User[]
  total: number
  size: number
  current: number
  orders: []
  optimizeCountSql: boolean
  hitCount: false
  countId: null
  maxLimit: null
  searchCount: boolean
  pages: number
}
export interface UserResponseData extends ResponseData {
  data: UserData
}
export type Role = {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
export type AssignRole = {
  roleIdList: number[]
  userId: number
}
export interface RoleResponseData extends ResponseData {
  data: {
    assignRoles: Role[]
    allRolesList: Role[]
  }
}

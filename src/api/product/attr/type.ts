export type ResposeData = {
  code: number
  message: string
  ok: boolean
}
export type Category = {
  category2Id?: number
  category1Id?: number
  id: number
  name: string
}
export interface CategoryResposeData extends ResposeData {
  data: Category[]
}

export type AttrValue = {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
export type AttrValueList = AttrValue[]
export type Attr = {
  id?: number
  attrName: string
  categoryId: number | undefined
  categoryLevel: number
  attrValueList: AttrValueList
  attrItem?: string
}
export type AttrList = Attr[]
export interface AttrResponseData extends ResposeData {
  data: AttrList
}

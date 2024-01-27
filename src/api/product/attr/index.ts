import request from '@/utils/requestGoods'
import type { CategoryResposeData, AttrResponseData, Attr } from './type'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
  DELETE_URL = '/admin/product/deleteAttr/',
}
export const reqC1 = () => request.get<any, CategoryResposeData>(API.C1_URL)
export const reqC2 = (c1Id: number) =>
  request.get<any, CategoryResposeData>(API.C2_URL + c1Id)
export const reqC3 = (c2Id: number) =>
  request.get<any, CategoryResposeData>(API.C3_URL + c2Id)
export const reqAttr = (c1Id: number, c2Id: number, c3Id: number) =>
  request.get<any, AttrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATE_URL, data)
export const reqDeleteAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETE_URL + attrId)

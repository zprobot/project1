import request from '@/utils/requestGoods'
import type { CategoryResposeData } from './type'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}
export const reqC1 = () => request.get<any, CategoryResposeData>(API.C1_URL)
export const reqC2 = (c1Id: number) =>
  request.get<any, CategoryResposeData>(API.C2_URL + c1Id)
export const reqC3 = (c2Id: number) =>
  request.get<any, CategoryResposeData>(API.C3_URL + c2Id)

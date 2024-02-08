import request from '@/utils/requestGoods'
import type { SkuResponseData, SkuInfoResponseData } from './type'
enum API {
  // 获取sku
  SKU_URL = '/admin/product/list/',
  // 商品上架
  UP_URL = '/admin/product/onSale/',
  // 商品下架
  DOWM_URL = '/admin/product/cancelSale/',
  // 获取某个sku信息
  SKUINFO_URL = '/admin/product/getSkuById/',
  // 删除sku
  DELETESKU_URL = '/admin/product/deleteSku/',
}
export const reqGetSku = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.SKU_URL}${page}/${limit}`)
export const reqUpSku = (skuid: number) =>
  request.get<any, any>(API.UP_URL + skuid)
export const reqDowmSku = (skuid: number) =>
  request.get<any, any>(API.DOWM_URL + skuid)
export const reqSkuInfo = (skuid: number) =>
  request.get<any, SkuInfoResponseData>(API.SKUINFO_URL + skuid)
export const reqDeleteSku = (skuid: number) =>
  request.delete<any, any>(API.DELETESKU_URL + skuid)

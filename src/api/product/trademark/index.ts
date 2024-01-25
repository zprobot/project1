import request from '@/utils/requestGoods'
import type { TradeMarkResponseData, TradeMark } from './type'

// 品牌管理接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 更新
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除
  REMOVETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
// 添加与修改品牌
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    // 修改
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 添加
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
// 删除
export const reqRemoveTradeMark = (id: number) =>
  request.delete<any, any>(API.REMOVETRADEMARK_URL + id)

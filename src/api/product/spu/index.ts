import request from '@/utils/requestGoods'
import type {
  SpuResponseData,
  AllTradeMarkResponseData,
  SpuImageResponseData,
  SpuAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
} from './type'
enum API {
  HASSPU_API = '/admin/product/',
  // 全部品牌数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 某个SPU下全部售卖商品的图片数据
  SPUIMAGE_URL = '/admin/product/spuImageList/',
  // 某个SPU下的销售属性
  SPUSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目的全部销售属性
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 添加新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
}
export const reqHasSpu = (page: number, limit: number, category3Id: number) =>
  request.get<any, SpuResponseData>(
    `${API.HASSPU_API}${page}/${limit}?category3Id=${category3Id}`,
  )
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMarkResponseData>(API.ALLTRADEMARK_URL)
export const reqSpuImageList = (spuid: number) =>
  request.get<any, SpuImageResponseData>(API.SPUIMAGE_URL + spuid)
export const reqSpuSaleAttrList = (spuid: number) =>
  request.get<any, SpuAttrResponseData>(API.SPUSALEATTR_URL + spuid)
export const reqAllSaleAttrList = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
export const reqAddOrUpdateSpu = (spu: SpuData) => {
  if (spu.id) {
    return request.post<any, any>(API.UPDATESPU_URL, spu)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, spu)
  }
}

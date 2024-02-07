export type ResponseData = {
  code: number
  message: string
  ok: boolean
}
export type SkuData = {
  id?: number
  createTime?: string
  isSale?: number
  category3Id: number | undefined
  spuId: number | undefined
  tmId: number | undefined
  skuName: string
  price: number | undefined
  weight: string
  skuDesc: string
  skuAttrValueList: null
  skuSaleAttrValueList: null
  skuImageList?: null
  skuDefaultImg: string
}
export type Sku = {
  records: SkuData[]
  total: number
  current: number
  searchCount: boolean
  pages: number
}
export interface SkuResponseData extends ResponseData {
  data: Sku
}

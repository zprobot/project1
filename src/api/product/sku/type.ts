export type ResponseData = {
  code: number
  message: string
  ok: boolean
}
export type skuAttrV = {
  id: number
  attrId: number
  valueId: number
  skuId: number
  attrName: string
  valueName: string
}
export type skuSaleV = {
  id: number
  skuId: number
  spuId: number
  saleAttrName: string
  saleAttrValueName: string
  saleAttrId: number
  saleAttrValueId: number
}
export type skuImg = {
  id: number
  skuid: number
  imgName: string
  imgUrl: string
  spuImgId: number
  idDefault: string
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
  skuAttrValueList: null | skuAttrV[]
  skuSaleAttrValueList: null | skuSaleV[]
  skuImageList?: null | skuImg[]
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
export interface SkuInfoResponseData extends ResponseData {
  data: SkuData
}

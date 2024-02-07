export type ResponseData = {
  code: number
  message: string
  ok: boolean
}

export type SpuData = {
  id?: number
  spuName: string
  description: string
  category3Id: number | undefined
  tmId: number | undefined
  spuSaleAttrList: SpuAttr[] | null
  spuImageList: SpuImage[] | null
}
type skuAttrV = {
  attrId: number
  valueId: number
}
type skuSaleV = {
  saleAttrId: number
  saleAttrValueId: number
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
  skuAttrValueList: skuAttrV[] | null
  skuSaleAttrValueList: skuSaleV[] | null
  skuImageList?: SpuImage[] | null
  skuDefaultImg: string
}
export interface SkuResponseData extends ResponseData {
  data: SkuData[]
}

export type Records = SpuData[]

export interface SpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export type TradeMark = {
  id?: number
  logoUrl: string
  tmName: string
}

export type AllTradeMark = TradeMark[]

export interface AllTradeMarkResponseData extends ResponseData {
  data: AllTradeMark
}
export type SpuImage = {
  id?: number
  spuId?: number
  imgName: string
  imgUrl: string
}
export interface SpuImageResponseData extends ResponseData {
  data: SpuImage[]
}
export type SpuAttrValue = {
  id?: number
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
export type SpuAttr = {
  id?: number
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SpuAttrValue[]
  flag?: boolean
  saleAttrValue?: string
  saleItem?: string
}
export interface SpuAttrResponseData extends ResponseData {
  data: SpuAttr[]
}
export type HasSaleAttr = {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

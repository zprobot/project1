interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export type TradeMark = {
  id?: number
  logoUrl: string
  tmName: string
}

export type Records = TradeMark[]

export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    current: number
    pages: number
    searchCount: boolean
    size: number
    total: number
  }
}

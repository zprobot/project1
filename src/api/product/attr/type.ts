export type CategoryResposeData = {
  code: number
  message: string
  ok: boolean
  data: Category[]
}
export type Category = {
  category2Id?: number
  category1Id?: number
  id: number
  name: string
}

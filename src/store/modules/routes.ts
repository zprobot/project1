import { defineStore } from 'pinia'
import { routes } from '@/router/routes'
import { reactive } from 'vue'
import { RoutesConst } from './types/type'
export default defineStore('Routes', () => {
  const routesConst = reactive<RoutesConst>(routes)
  return { routesConst }
})

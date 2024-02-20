// 路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router

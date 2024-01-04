import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
type Components = {
  [key: string]: Component
}
// 全局对象
const allGlobalComponent: Components = { SvgIcon }

// 自定义插件对象完成全局组件的挂载
export default {
  // 插件对象被vue安装时会自动调用install方法，并且该方法能获得App实例
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) =>
      app.component(key, allGlobalComponent[key]),
    )
  },
}

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from './router'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 导入自定义注册全局组件插件
import globalComponent from '@/components'
// 清除默认样式
import '@/styles/index.scss'
// 引入全局守卫
import '@/permission'
// 引入仓库
import pinia from './store'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册全局自定义指令
import { hasButton } from './directive/has'
hasButton(app)
app.mount('#app')

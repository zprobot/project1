import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const hasButton = (app: any) => {
  app.directive('has', {
    // 全局自定义指令v-has
    mounted(el: any, options: any) {
      // params:el 参数为使用自定义指令的dom
      // params: options 指令回传的值
      if (!userStore.userButtons.includes(options.value)) {
        // 如果没有权限，则删除该dom
        el.parentNode.removeChild(el)
      }
    },
  })
}

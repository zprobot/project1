// 路由健全 在不同情况下那些路由能访问 那些不能访问
import router from '@/router/index'
import nprogress from 'nprogress'
import setting from './setting'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 利用仓库token判断用户是否登录
//import useUserStore from '@/store/modules/user'
// 组件外部使用pinia,需要先引入pinia
//import pinia from '@/store'
//const userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to) => {
  document.title = setting.title + '-' + to.meta.title
  nprogress.start()
  // 判断用户是否登录 !避免无限重定向
  /*   if (!userStore.token && to.name !== 'login') {
    return {
      name: 'login',
      // 想访问的路径会被login接受
      query: { redirect: to.path },
    }
  } else if (userStore.token && to.name == 'login') {
    // 登陆成功时访问login重定向到首页
    return {
      path: '/',
    }
  } else {
    // 判断是否有用户信息，如果没有则发请求获取，避免刷新丢失用户信息
    if (!userStore.userInfo.username && to.name !== 'login') {
      try {
        await userStore.getUserInfo()
      } catch (error) {
        // token过期
        await userStore.logout()
        return {
          name: 'login',
          query: { redirect: to.path },
        }
      }
    }
  } */
  // 其余情况直接放行
})

// 全局后置守卫
router.afterEach(() => {
  nprogress.done()
})

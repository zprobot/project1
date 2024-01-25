import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// 引入svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mode包含当前开发模式
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 从项目根目录获取当前环境的配置对象
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      createSvgIconsPlugin({
        // 矢量图标都放在src/assets/icons下面
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 使用 @ 代替 src
      },
    },
    // 配置scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 代理服务器地址
          target: env.VITE_SERVE,
          // 是否跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/ap': {
          // 代理服务器地址
          target: 'http://39.98.123.211:8510',
          // 是否跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/ap/, ''),
        },
      },
    },
  }
}

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
                target: 'http://localhost:5000/api', // 目标地址 --> 服务器地址
                changeOrigin: true, // 允许跨域
                ws: true,  // 允许websocket代理
                // 重写路径 --> 作用与vue配置pathRewrite作用相同
                rewrite: (path) => path.replace(/^\/api/, "")
            }
        },
    },
  plugins: [
      vue()],
})

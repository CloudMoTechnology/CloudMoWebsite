/**
 * Vite 构建配置文件
 * 
 * @description 墨云官网 Vite 构建工具配置
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 配置说明：
 * - plugins: Vue 插件配置
 * - resolve: 路径别名配置
 * - server: 开发服务器配置
 * - build: 生产构建配置
 * - css: CSS 预处理器配置
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 插件配置
  plugins: [
    // Vue 3 插件
    vue(),
  ],
  
  // 路径解析配置
  resolve: {
    // 路径别名：简化导入路径
    alias: {
      // @ 指向 src 目录
      '@': resolve(__dirname, 'src'),
      // @components 指向组件目录
      '@components': resolve(__dirname, 'src/components'),
      // @views 指向页面目录
      '@views': resolve(__dirname, 'src/views'),
      // @assets 指向资源目录
      '@assets': resolve(__dirname, 'src/assets'),
      // @stores 指向状态管理目录
      '@stores': resolve(__dirname, 'src/stores'),
      // @utils 指向工具函数目录
      '@utils': resolve(__dirname, 'src/utils'),
      // @api 指向 API 接口目录
      '@api': resolve(__dirname, 'src/api'),
    },
  },
  
  // 开发服务器配置
  server: {
    // 监听端口
    port: 3000,
    // 允许外部访问
    host: '0.0.0.0',
    // 自动打开浏览器
    open: false,
    // 允许所有主机访问（开发环境）
    allowedHosts: ['.manus.computer', 'localhost'],
    // 跨域代理配置
    proxy: {
      // API 代理：将 /api 请求转发到后端服务
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // 重写路径：移除 /api 前缀
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  
  // 生产构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 生成 sourcemap（生产环境建议关闭）
    sourcemap: false,
    // 压缩方式使用esbuild（默认）
    minify: 'esbuild',
    // Rollup 配置
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          // Vue 核心库
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // UI 组件库
          'element-plus': ['element-plus'],
          // 动画库
          'animation': ['gsap', 'three'],
          // 工具库
          'utils': ['axios', '@vueuse/core'],
        },
        // 静态资源文件名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // 块大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  
  // CSS 配置
  css: {
    // 预处理器配置
    preprocessorOptions: {
      scss: {
        // 全局 SCSS 变量
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  
  // 优化配置
  optimizeDeps: {
    // 预构建依赖
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      'element-plus',
      'gsap',
      'three',
    ],
  },
})

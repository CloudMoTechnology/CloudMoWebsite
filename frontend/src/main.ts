/**
 * 应用主入口文件
 * 
 * @description 墨云官网 Vue 应用入口
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 初始化内容：
 * - Vue 应用实例
 * - Pinia 状态管理
 * - Vue Router 路由
 * - Element Plus UI 组件库
 * - 全局样式
 */

// Vue 核心
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 根组件
import App from './App.vue'

// 路由配置
import router from './router'

// Element Plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局样式
import './styles/main.scss'

// 状态管理
import { useAppStore, useUserStore } from './stores'

/**
 * 创建 Vue 应用实例
 */
const app = createApp(App)

/**
 * 创建 Pinia 实例
 * Pinia 是 Vue 3 推荐的状态管理库
 */
const pinia = createPinia()

/**
 * 注册 Pinia
 * 必须在使用 store 之前注册
 */
app.use(pinia)

/**
 * 注册 Vue Router
 * 提供路由导航功能
 */
app.use(router)

/**
 * 注册 Element Plus
 * 提供丰富的 UI 组件
 */
app.use(ElementPlus, {
  // 设置默认语言为中文
  locale: {
    name: 'zh-cn'
  }
})

/**
 * 注册 Element Plus 图标
 * 将所有图标注册为全局组件
 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

/**
 * 初始化应用状态
 * 从本地存储恢复用户偏好和登录状态
 */
const appStore = useAppStore()
const userStore = useUserStore()

// 初始化应用设置（主题、语言等）
appStore.initApp()

// 初始化用户状态（恢复登录状态）
userStore.initUserState()

/**
 * 全局错误处理
 * 捕获未处理的错误并记录
 */
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err)
  console.error('错误信息:', info)
  console.error('组件实例:', instance)
  
  // 可以在这里添加错误上报逻辑
  // 例如：发送到错误监控服务
}

/**
 * 全局警告处理（仅开发环境）
 */
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue 警告:', msg)
    console.warn('组件追踪:', trace)
  }
}

/**
 * 挂载应用
 * 将 Vue 应用挂载到 #app 元素
 */
app.mount('#app')

/**
 * 开发环境日志
 */
if (import.meta.env.DEV) {
  console.log('🌩️ 墨云科技官网 - 开发模式')
  console.log('📦 Vue 版本:', app.version)
  console.log('🔧 环境:', import.meta.env.MODE)
}

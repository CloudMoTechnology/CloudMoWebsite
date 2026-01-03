/**
 * TypeScript 环境声明文件
 * 
 * @description 声明 Vue 单文件组件模块类型
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

/// <reference types="vite/client" />

/**
 * 声明 .vue 文件模块
 * 使 TypeScript 能够识别 Vue 单文件组件
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 声明环境变量类型
 */
interface ImportMetaEnv {
  /** API 基础地址 */
  readonly VITE_API_BASE_URL: string
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 是否为开发模式 */
  readonly DEV: boolean
  /** 是否为生产模式 */
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

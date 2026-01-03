/**
 * 自定义指令入口
 * 
 * @description 导出所有自定义Vue指令
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import type { App } from 'vue'
import { vScrollAnimation } from './scrollAnimation'

/**
 * 注册所有自定义指令
 * @param app - Vue应用实例
 */
export function registerDirectives(app: App): void {
  // 注册滚动动画指令
  app.directive('scroll-animation', vScrollAnimation)
}

// 导出单个指令
export { vScrollAnimation }

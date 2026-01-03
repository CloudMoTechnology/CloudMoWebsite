/**
 * 滚动动画指令
 * 
 * @description 元素进入视口时触发动画效果
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 使用方式：
 * - v-scroll-animation：默认淡入上移动画
 * - v-scroll-animation="'fade-left'"：从左侧淡入
 * - v-scroll-animation="{ animation: 'fade-up', delay: 200 }"：带延迟的动画
 */

import type { Directive, DirectiveBinding } from 'vue'

/**
 * 动画配置接口
 */
interface AnimationConfig {
  /** 动画类型 */
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out'
  /** 动画延迟（毫秒） */
  delay?: number
  /** 动画持续时间（毫秒） */
  duration?: number
  /** 触发阈值（0-1） */
  threshold?: number
  /** 是否只触发一次 */
  once?: boolean
}

/**
 * 默认配置
 */
const defaultConfig: AnimationConfig = {
  animation: 'fade-up',
  delay: 0,
  duration: 600,
  threshold: 0.1,
  once: true
}

/**
 * 动画样式映射
 */
const animationStyles: Record<string, { initial: string; final: string }> = {
  'fade-up': {
    initial: 'opacity: 0; transform: translateY(30px);',
    final: 'opacity: 1; transform: translateY(0);'
  },
  'fade-down': {
    initial: 'opacity: 0; transform: translateY(-30px);',
    final: 'opacity: 1; transform: translateY(0);'
  },
  'fade-left': {
    initial: 'opacity: 0; transform: translateX(30px);',
    final: 'opacity: 1; transform: translateX(0);'
  },
  'fade-right': {
    initial: 'opacity: 0; transform: translateX(-30px);',
    final: 'opacity: 1; transform: translateX(0);'
  },
  'zoom-in': {
    initial: 'opacity: 0; transform: scale(0.9);',
    final: 'opacity: 1; transform: scale(1);'
  },
  'zoom-out': {
    initial: 'opacity: 0; transform: scale(1.1);',
    final: 'opacity: 1; transform: scale(1);'
  }
}

/**
 * 解析指令绑定值
 * @param binding - 指令绑定对象
 * @returns 动画配置
 */
function parseBinding(binding: DirectiveBinding): AnimationConfig {
  const value = binding.value
  
  // 如果是字符串，作为动画类型
  if (typeof value === 'string') {
    return { ...defaultConfig, animation: value as AnimationConfig['animation'] }
  }
  
  // 如果是对象，合并配置
  if (typeof value === 'object' && value !== null) {
    return { ...defaultConfig, ...value }
  }
  
  // 默认配置
  return defaultConfig
}

/**
 * 应用初始样式
 * @param el - DOM元素
 * @param config - 动画配置
 */
function applyInitialStyle(el: HTMLElement, config: AnimationConfig): void {
  const animationType = config.animation || 'fade-up'
  const styles = animationStyles[animationType]
  
  if (styles) {
    el.style.cssText += styles.initial
    el.style.transition = `all ${config.duration}ms ease-out ${config.delay}ms`
  }
}

/**
 * 应用最终样式
 * @param el - DOM元素
 * @param config - 动画配置
 */
function applyFinalStyle(el: HTMLElement, config: AnimationConfig): void {
  const animationType = config.animation || 'fade-up'
  const styles = animationStyles[animationType]
  
  if (styles) {
    // 使用setTimeout确保过渡效果生效
    setTimeout(() => {
      el.style.cssText = el.style.cssText.replace(styles.initial, styles.final)
    }, 10)
  }
}

/**
 * 滚动动画指令定义
 */
export const vScrollAnimation: Directive<HTMLElement, AnimationConfig | string> = {
  /**
   * 元素挂载时
   */
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const config = parseBinding(binding)
    
    // 应用初始样式
    applyInitialStyle(el, config)
    
    // 创建IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口，应用最终样式
            applyFinalStyle(el, config)
            
            // 如果只触发一次，停止观察
            if (config.once) {
              observer.unobserve(el)
            }
          } else if (!config.once) {
            // 元素离开视口，恢复初始样式
            applyInitialStyle(el, config)
          }
        })
      },
      {
        threshold: config.threshold
      }
    )
    
    // 开始观察
    observer.observe(el)
    
    // 存储observer引用以便清理
    ;(el as any).__scrollAnimationObserver = observer
  },
  
  /**
   * 元素卸载时
   */
  unmounted(el: HTMLElement) {
    const observer = (el as any).__scrollAnimationObserver as IntersectionObserver
    if (observer) {
      observer.disconnect()
    }
  }
}

export default vScrollAnimation

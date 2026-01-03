/**
 * 工具函数集合
 * 
 * @description 墨云官网通用工具函数
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能分类：
 * - 日期格式化
 * - 字符串处理
 * - 数字格式化
 * - DOM 操作
 * - 存储操作
 */

/**
 * 日期格式化
 * 
 * @description 将日期对象或字符串格式化为指定格式
 * @param date - 日期对象、时间戳或日期字符串
 * @param format - 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns string - 格式化后的日期字符串
 * 
 * @example
 * formatDate(new Date()) // '2024-01-15 14:30:00'
 * formatDate('2024-01-15', 'YYYY年MM月DD日') // '2024年01月15日'
 */
export function formatDate(
  date: Date | string | number,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  // 转换为 Date 对象
  const d = date instanceof Date ? date : new Date(date)
  
  // 检查日期有效性
  if (isNaN(d.getTime())) {
    return '无效日期'
  }
  
  // 日期组件
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  
  // 补零函数
  const pad = (n: number): string => n.toString().padStart(2, '0')
  
  // 替换格式占位符
  return format
    .replace('YYYY', year.toString())
    .replace('MM', pad(month))
    .replace('DD', pad(day))
    .replace('HH', pad(hours))
    .replace('mm', pad(minutes))
    .replace('ss', pad(seconds))
}

/**
 * 相对时间格式化
 * 
 * @description 将日期转换为相对时间描述（如"3分钟前"）
 * @param date - 日期对象、时间戳或日期字符串
 * @returns string - 相对时间描述
 * 
 * @example
 * formatRelativeTime(Date.now() - 60000) // '1分钟前'
 * formatRelativeTime(Date.now() - 86400000) // '1天前'
 */
export function formatRelativeTime(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  
  // 时间单位（毫秒）
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day
  
  // 根据时间差返回相应描述
  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < week) {
    return `${Math.floor(diff / day)}天前`
  } else if (diff < month) {
    return `${Math.floor(diff / week)}周前`
  } else if (diff < year) {
    return `${Math.floor(diff / month)}个月前`
  } else {
    return `${Math.floor(diff / year)}年前`
  }
}

/**
 * 截断文本
 * 
 * @description 将文本截断到指定长度，并添加省略号
 * @param text - 原始文本
 * @param maxLength - 最大长度
 * @param suffix - 后缀，默认 '...'
 * @returns string - 截断后的文本
 * 
 * @example
 * truncateText('这是一段很长的文本', 5) // '这是一段很...'
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (!text || text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + suffix
}

/**
 * 格式化数字
 * 
 * @description 将数字格式化为带千分位的字符串
 * @param num - 数字
 * @param decimals - 小数位数，默认 0
 * @returns string - 格式化后的数字字符串
 * 
 * @example
 * formatNumber(1234567) // '1,234,567'
 * formatNumber(1234.567, 2) // '1,234.57'
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * 格式化文件大小
 * 
 * @description 将字节数转换为人类可读的文件大小
 * @param bytes - 字节数
 * @param decimals - 小数位数，默认 2
 * @returns string - 格式化后的文件大小
 * 
 * @example
 * formatFileSize(1024) // '1 KB'
 * formatFileSize(1048576) // '1 MB'
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

/**
 * 防抖函数
 * 
 * @description 创建一个防抖函数，在最后一次调用后延迟执行
 * @param fn - 要执行的函数
 * @param delay - 延迟时间（毫秒）
 * @returns Function - 防抖处理后的函数
 * 
 * @example
 * const debouncedSearch = debounce(search, 300)
 * input.addEventListener('input', debouncedSearch)
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

/**
 * 节流函数
 * 
 * @description 创建一个节流函数，在指定时间内只执行一次
 * @param fn - 要执行的函数
 * @param limit - 时间限制（毫秒）
 * @returns Function - 节流处理后的函数
 * 
 * @example
 * const throttledScroll = throttle(handleScroll, 100)
 * window.addEventListener('scroll', throttledScroll)
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * 深拷贝
 * 
 * @description 创建对象的深层副本
 * @param obj - 要拷贝的对象
 * @returns T - 深拷贝后的对象
 * 
 * @example
 * const copy = deepClone({ a: { b: 1 } })
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T
  }
  
  if (obj instanceof Object) {
    const copy = {} as T
    Object.keys(obj).forEach(key => {
      (copy as Record<string, unknown>)[key] = deepClone((obj as Record<string, unknown>)[key])
    })
    return copy
  }
  
  return obj
}

/**
 * 生成唯一 ID
 * 
 * @description 生成一个唯一的字符串 ID
 * @param prefix - ID 前缀
 * @returns string - 唯一 ID
 * 
 * @example
 * generateId() // 'id_1705312345678_abc123'
 * generateId('user') // 'user_1705312345678_abc123'
 */
export function generateId(prefix: string = 'id'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}_${timestamp}_${random}`
}

/**
 * 滚动到元素
 * 
 * @description 平滑滚动到指定元素位置
 * @param selector - CSS 选择器或元素
 * @param offset - 偏移量（像素）
 * 
 * @example
 * scrollToElement('#section-1')
 * scrollToElement('#header', -100)
 */
export function scrollToElement(
  selector: string | Element,
  offset: number = 0
): void {
  const element = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}

/**
 * 复制文本到剪贴板
 * 
 * @description 将文本复制到系统剪贴板
 * @param text - 要复制的文本
 * @returns Promise<boolean> - 是否复制成功
 * 
 * @example
 * const success = await copyToClipboard('Hello World')
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 降级方案：使用 execCommand
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    
    try {
      document.execCommand('copy')
      return true
    } catch {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

/**
 * 本地存储操作
 * 
 * @description 封装 localStorage 操作，支持 JSON 序列化
 */
export const storage = {
  /**
   * 获取存储项
   * @param key - 存储键名
   * @param defaultValue - 默认值
   * @returns T - 存储值或默认值
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  
  /**
   * 设置存储项
   * @param key - 存储键名
   * @param value - 存储值
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('存储失败:', error)
    }
  },
  
  /**
   * 移除存储项
   * @param key - 存储键名
   */
  remove(key: string): void {
    localStorage.removeItem(key)
  },
  
  /**
   * 清空所有存储
   */
  clear(): void {
    localStorage.clear()
  }
}

/**
 * 检测设备类型
 * 
 * @description 检测当前设备是否为移动设备
 * @returns boolean - 是否为移动设备
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * 获取 URL 查询参数
 * 
 * @description 解析 URL 查询字符串为对象
 * @param url - URL 字符串，默认当前页面 URL
 * @returns Record<string, string> - 查询参数对象
 * 
 * @example
 * // URL: https://example.com?page=1&size=10
 * getQueryParams() // { page: '1', size: '10' }
 */
export function getQueryParams(url?: string): Record<string, string> {
  const searchParams = new URLSearchParams(
    url ? new URL(url).search : window.location.search
  )
  
  const params: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}

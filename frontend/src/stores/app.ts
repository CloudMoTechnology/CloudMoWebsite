/**
 * 应用状态管理
 * 
 * @description 墨云官网全局应用状态管理
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 管理内容：
 * - 全局加载状态
 * - 主题设置
 * - 语言设置
 * - 侧边栏状态
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 应用状态 Store
 * 
 * @description 使用 Composition API 风格定义 Store
 * 管理应用级别的全局状态
 */
export const useAppStore = defineStore('app', () => {
  // ============================================
  // State - 状态定义
  // ============================================
  
  /**
   * 全局加载状态
   * 用于显示全局加载遮罩
   */
  const isLoading = ref<boolean>(false)
  
  /**
   * 加载计数器
   * 支持多个并发请求的加载状态管理
   */
  const loadingCount = ref<number>(0)
  
  /**
   * 当前主题
   * 默认为深色主题，符合墨云品牌风格
   */
  const theme = ref<'dark' | 'light'>('dark')
  
  /**
   * 当前语言
   * 默认为简体中文
   */
  const locale = ref<'zh-CN' | 'en-US'>('zh-CN')
  
  /**
   * 侧边栏折叠状态（后台管理用）
   */
  const sidebarCollapsed = ref<boolean>(false)
  
  /**
   * 移动端菜单展开状态
   */
  const mobileMenuOpen = ref<boolean>(false)
  
  /**
   * 页面滚动位置
   */
  const scrollY = ref<number>(0)
  
  /**
   * 是否显示返回顶部按钮
   */
  const showBackToTop = computed(() => scrollY.value > 300)
  
  // ============================================
  // Getters - 计算属性
  // ============================================
  
  /**
   * 是否为深色主题
   */
  const isDarkTheme = computed(() => theme.value === 'dark')
  
  /**
   * 是否为中文语言
   */
  const isChinese = computed(() => locale.value === 'zh-CN')
  
  /**
   * 是否正在加载
   * 当加载计数器大于0时显示加载状态
   */
  const loading = computed(() => loadingCount.value > 0 || isLoading.value)
  
  // ============================================
  // Actions - 方法定义
  // ============================================
  
  /**
   * 设置全局加载状态
   * @param status - 加载状态
   */
  function setLoading(status: boolean): void {
    isLoading.value = status
  }
  
  /**
   * 开始加载
   * 增加加载计数器
   */
  function startLoading(): void {
    loadingCount.value++
  }
  
  /**
   * 结束加载
   * 减少加载计数器，最小为0
   */
  function endLoading(): void {
    if (loadingCount.value > 0) {
      loadingCount.value--
    }
  }
  
  /**
   * 切换主题
   * 在深色和浅色主题之间切换
   */
  function toggleTheme(): void {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    // 保存到本地存储
    localStorage.setItem('theme', theme.value)
    // 更新 HTML 根元素的 class
    document.documentElement.classList.toggle('light', theme.value === 'light')
  }
  
  /**
   * 设置主题
   * @param newTheme - 新主题
   */
  function setTheme(newTheme: 'dark' | 'light'): void {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }
  
  /**
   * 切换语言
   */
  function toggleLocale(): void {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
    localStorage.setItem('locale', locale.value)
  }
  
  /**
   * 设置语言
   * @param newLocale - 新语言
   */
  function setLocale(newLocale: 'zh-CN' | 'en-US'): void {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }
  
  /**
   * 切换侧边栏折叠状态
   */
  function toggleSidebar(): void {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
  
  /**
   * 设置侧边栏折叠状态
   * @param collapsed - 是否折叠
   */
  function setSidebarCollapsed(collapsed: boolean): void {
    sidebarCollapsed.value = collapsed
  }
  
  /**
   * 切换移动端菜单
   */
  function toggleMobileMenu(): void {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }
  
  /**
   * 关闭移动端菜单
   */
  function closeMobileMenu(): void {
    mobileMenuOpen.value = false
  }
  
  /**
   * 更新滚动位置
   * @param y - 滚动位置
   */
  function updateScrollY(y: number): void {
    scrollY.value = y
  }
  
  /**
   * 初始化应用状态
   * 从本地存储恢复用户偏好设置
   */
  function initApp(): void {
    // 恢复主题设置
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    // 恢复语言设置
    const savedLocale = localStorage.getItem('locale') as 'zh-CN' | 'en-US' | null
    if (savedLocale) {
      setLocale(savedLocale)
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
      updateScrollY(window.scrollY)
    })
  }
  
  // 返回状态和方法
  return {
    // State
    isLoading,
    loadingCount,
    theme,
    locale,
    sidebarCollapsed,
    mobileMenuOpen,
    scrollY,
    
    // Getters
    isDarkTheme,
    isChinese,
    loading,
    showBackToTop,
    
    // Actions
    setLoading,
    startLoading,
    endLoading,
    toggleTheme,
    setTheme,
    toggleLocale,
    setLocale,
    toggleSidebar,
    setSidebarCollapsed,
    toggleMobileMenu,
    closeMobileMenu,
    updateScrollY,
    initApp
  }
})

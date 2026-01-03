<script setup lang="ts">
/**
 * 顶部导航栏组件
 * 
 * @description 墨云官网顶部导航栏
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能说明：
 * - 响应式导航菜单
 * - 滚动时背景模糊效果
 * - 移动端汉堡菜单
 * - 品牌 Logo 展示
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores'

// 获取路由实例
const router = useRouter()
const route = useRoute()

// 获取应用状态
const appStore = useAppStore()

// 导航菜单项
const navItems = [
  { name: '首页', path: '/', icon: 'home' },
  { name: '关于我们', path: '/about', icon: 'info' },
  { name: '服务产品', path: '/services', icon: 'service' },
  { name: '筑梦计划', path: '/dream-builder', icon: 'star' },
  { name: '新闻动态', path: '/news', icon: 'news' },
  { name: '技术文档', path: '/docs', icon: 'doc' },
  { name: '联系我们', path: '/contact', icon: 'contact' }
]

// 滚动状态
const isScrolled = ref(false)

// 移动端菜单状态
const mobileMenuOpen = computed(() => appStore.mobileMenuOpen)

/**
 * 检查当前路由是否激活
 * @param path - 路由路径
 * @returns boolean - 是否激活
 */
function isActive(path: string): boolean {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

/**
 * 导航到指定路由
 * @param path - 目标路径
 */
function navigateTo(path: string): void {
  router.push(path)
  // 关闭移动端菜单
  appStore.closeMobileMenu()
}

/**
 * 切换移动端菜单
 */
function toggleMobileMenu(): void {
  appStore.toggleMobileMenu()
}

/**
 * 滚动事件处理
 * 检测页面滚动位置，更新导航栏样式
 */
function handleScroll(): void {
  isScrolled.value = window.scrollY > 50
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始检查
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- 顶部导航栏 -->
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-mo-black-950/90 backdrop-blur-xl shadow-lg border-b border-white/5' 
        : 'bg-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo 区域 -->
        <div class="flex-shrink-0">
          <router-link 
            to="/" 
            class="flex items-center space-x-3 group"
          >
            <!-- Logo 图标 -->
            <div class="relative w-10 h-10 md:w-12 md:h-12">
              <!-- 外圈光晕 -->
              <div class="absolute inset-0 bg-gradient-to-br from-mo-cloud-500 to-mo-purple-500 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity blur-sm"></div>
              <!-- Logo 主体 -->
              <div class="relative w-full h-full bg-gradient-to-br from-mo-cloud-500 to-mo-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg md:text-xl font-serif">墨</span>
              </div>
            </div>
            <!-- 品牌名称 -->
            <div class="hidden sm:block">
              <h1 class="text-xl md:text-2xl font-bold">
                <span class="text-white">墨云</span>
                <span class="text-mo-cloud-400 ml-1 text-sm font-normal">CloudMo</span>
              </h1>
            </div>
          </router-link>
        </div>
        
        <!-- 桌面端导航菜单 -->
        <div class="hidden lg:flex items-center space-x-1">
          <template v-for="item in navItems" :key="item.path">
            <button
              @click="navigateTo(item.path)"
              class="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              :class="[
                isActive(item.path)
                  ? 'text-mo-cloud-400 bg-mo-cloud-500/10'
                  : 'text-mo-black-300 hover:text-white hover:bg-white/5'
              ]"
            >
              {{ item.name }}
            </button>
          </template>
        </div>
        
        <!-- 右侧操作区 -->
        <div class="flex items-center space-x-4">
          <!-- 管理后台入口（桌面端） -->
          <router-link
            to="/admin"
            class="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-mo-gold-400 border border-mo-gold-500/30 rounded-lg hover:bg-mo-gold-500/10 transition-all duration-300"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            管理
          </router-link>
          
          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg text-mo-black-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="切换菜单"
          >
            <svg 
              class="w-6 h-6 transition-transform duration-300"
              :class="{ 'rotate-90': mobileMenuOpen }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="!mobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
    
    <!-- 移动端导航菜单 -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="mobileMenuOpen"
        class="lg:hidden bg-mo-black-900/95 backdrop-blur-xl border-b border-white/5"
      >
        <div class="px-4 py-4 space-y-2">
          <template v-for="item in navItems" :key="item.path">
            <button
              @click="navigateTo(item.path)"
              class="w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
              :class="[
                isActive(item.path)
                  ? 'text-mo-cloud-400 bg-mo-cloud-500/10'
                  : 'text-mo-black-300 hover:text-white hover:bg-white/5'
              ]"
            >
              {{ item.name }}
            </button>
          </template>
          
          <!-- 移动端管理入口 -->
          <router-link
            to="/admin"
            class="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-mo-gold-400 hover:bg-mo-gold-500/10 transition-colors"
            @click="appStore.closeMobileMenu()"
          >
            管理后台
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
/**
 * 导航链接悬停效果
 */
.nav-link {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #0ea5e9, #a855f7);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 60%;
  }
}
</style>

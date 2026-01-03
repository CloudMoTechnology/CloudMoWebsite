<script setup lang="ts">
/**
 * 后台管理布局组件
 * 
 * @description 墨云科技后台管理系统布局
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 侧边栏折叠状态
const sidebarCollapsed = ref(false)

// 当前用户
const currentUser = computed(() => userStore.currentUser)

// 菜单项
const menuItems = [
  {
    path: '/admin/dashboard',
    name: '仪表盘',
    icon: 'dashboard'
  },
  {
    path: '/admin/articles',
    name: '文章管理',
    icon: 'article'
  },
  {
    path: '/admin/news',
    name: '新闻管理',
    icon: 'news'
  },
  {
    path: '/admin/docs',
    name: '文档管理',
    icon: 'doc'
  },
  {
    path: '/admin/users',
    name: '用户管理',
    icon: 'user'
  },
  {
    path: '/admin/settings',
    name: '系统设置',
    icon: 'settings'
  }
]

/**
 * 检查菜单项是否激活
 */
function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path + '/')
}

/**
 * 导航到指定路由
 */
function navigateTo(path: string): void {
  router.push(path)
}

/**
 * 切换侧边栏
 */
function toggleSidebar(): void {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

/**
 * 退出登录
 */
function handleLogout(): void {
  userStore.logout()
  router.push('/admin/login')
}

/**
 * 返回前台
 */
function goToFront(): void {
  router.push('/')
}
</script>

<template>
  <div class="admin-layout min-h-screen bg-mo-black-950 flex">
    <!-- 侧边栏 -->
    <aside 
      class="fixed left-0 top-0 h-full bg-mo-black-900 border-r border-white/5 transition-all duration-300 z-40"
      :class="sidebarCollapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-center border-b border-white/5">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-mo-cloud-500 to-mo-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold font-serif">墨</span>
          </div>
          <span 
            v-if="!sidebarCollapsed" 
            class="text-white font-semibold whitespace-nowrap"
          >
            墨云管理
          </span>
        </div>
      </div>
      
      <!-- 菜单 -->
      <nav class="p-4 space-y-2">
        <button
          v-for="item in menuItems"
          :key="item.path"
          @click="navigateTo(item.path)"
          class="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200"
          :class="[
            isActive(item.path)
              ? 'bg-mo-cloud-500/20 text-mo-cloud-400'
              : 'text-mo-black-400 hover:text-white hover:bg-white/5'
          ]"
          :title="sidebarCollapsed ? item.name : ''"
        >
          <!-- 图标 -->
          <svg v-if="item.icon === 'dashboard'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <svg v-else-if="item.icon === 'article'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <svg v-else-if="item.icon === 'news'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
          </svg>
          <svg v-else-if="item.icon === 'doc'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <svg v-else-if="item.icon === 'user'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else-if="item.icon === 'settings'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          
          <span 
            v-if="!sidebarCollapsed" 
            class="ml-3 whitespace-nowrap"
          >
            {{ item.name }}
          </span>
        </button>
      </nav>
      
      <!-- 底部操作 -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
        <button
          @click="goToFront"
          class="w-full flex items-center px-3 py-2.5 rounded-lg text-mo-black-400 hover:text-white hover:bg-white/5 transition-colors mb-2"
          :title="sidebarCollapsed ? '返回前台' : ''"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span v-if="!sidebarCollapsed" class="ml-3">返回前台</span>
        </button>
        
        <button
          @click="handleLogout"
          class="w-full flex items-center px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          :title="sidebarCollapsed ? '退出登录' : ''"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span v-if="!sidebarCollapsed" class="ml-3">退出登录</span>
        </button>
      </div>
    </aside>
    
    <!-- 主内容区 -->
    <div 
      class="flex-1 transition-all duration-300"
      :class="sidebarCollapsed ? 'ml-16' : 'ml-64'"
    >
      <!-- 顶部栏 -->
      <header class="h-16 bg-mo-black-900/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
        <!-- 左侧 -->
        <div class="flex items-center space-x-4">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg text-mo-black-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <!-- 面包屑 -->
          <div class="text-sm text-mo-black-400">
            <span class="text-mo-black-500">管理后台</span>
            <span class="mx-2">/</span>
            <span class="text-white">{{ route.meta.title || '仪表盘' }}</span>
          </div>
        </div>
        
        <!-- 右侧 -->
        <div class="flex items-center space-x-4">
          <!-- 用户信息 -->
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-mo-cloud-500 to-mo-purple-500 flex items-center justify-center">
              <span class="text-white text-sm font-medium">
                {{ currentUser?.username?.charAt(0)?.toUpperCase() || 'A' }}
              </span>
            </div>
            <span class="text-white text-sm hidden sm:block">
              {{ currentUser?.username || 'Admin' }}
            </span>
          </div>
        </div>
      </header>
      
      <!-- 页面内容 -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 后台布局样式 */
</style>

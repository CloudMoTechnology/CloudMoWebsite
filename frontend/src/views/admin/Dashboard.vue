<script setup lang="ts">
/**
 * 后台仪表盘页面
 * 
 * @description 墨云科技后台管理系统仪表盘
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, onMounted } from 'vue'

// 统计数据
const stats = ref([
  { 
    title: '文章总数', 
    value: 128, 
    change: '+12%', 
    trend: 'up',
    icon: 'article',
    color: 'cloud'
  },
  { 
    title: '新闻总数', 
    value: 56, 
    change: '+8%', 
    trend: 'up',
    icon: 'news',
    color: 'purple'
  },
  { 
    title: '文档总数', 
    value: 89, 
    change: '+15%', 
    trend: 'up',
    icon: 'doc',
    color: 'gold'
  },
  { 
    title: '访问量', 
    value: '12.5K', 
    change: '+23%', 
    trend: 'up',
    icon: 'view',
    color: 'green'
  }
])

// 最近文章
const recentArticles = ref([
  { id: 1, title: '墨云科技发布新一代AI开发平台', status: 'published', date: '2024-01-15' },
  { id: 2, title: '深度解析：大语言模型在企业应用中的最佳实践', status: 'published', date: '2024-01-10' },
  { id: 3, title: '筑梦计划2024年度申请正式开启', status: 'draft', date: '2024-01-08' },
  { id: 4, title: 'Vue 3 + TypeScript 最佳实践指南', status: 'published', date: '2024-01-05' }
])

// 系统日志
const systemLogs = ref([
  { type: 'info', message: '用户 admin 登录系统', time: '10分钟前' },
  { type: 'success', message: '文章《AI开发平台》发布成功', time: '1小时前' },
  { type: 'warning', message: '系统备份任务即将开始', time: '2小时前' },
  { type: 'info', message: '新用户注册：user123', time: '3小时前' }
])

// 快捷操作
const quickActions = [
  { name: '新建文章', icon: 'plus', path: '/admin/articles/new' },
  { name: '发布新闻', icon: 'news', path: '/admin/news/new' },
  { name: '添加文档', icon: 'doc', path: '/admin/docs/new' },
  { name: '系统设置', icon: 'settings', path: '/admin/settings' }
]

/**
 * 获取状态样式类
 */
function getStatusClass(status: string): string {
  switch (status) {
    case 'published':
      return 'bg-green-500/10 text-green-400'
    case 'draft':
      return 'bg-yellow-500/10 text-yellow-400'
    default:
      return 'bg-gray-500/10 text-gray-400'
  }
}

/**
 * 获取状态文本
 */
function getStatusText(status: string): string {
  switch (status) {
    case 'published':
      return '已发布'
    case 'draft':
      return '草稿'
    default:
      return '未知'
  }
}

/**
 * 获取日志类型样式
 */
function getLogTypeClass(type: string): string {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-mo-cloud-500'
  }
}

onMounted(() => {
  // 加载仪表盘数据
})
</script>

<template>
  <div class="dashboard">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white">仪表盘</h1>
      <p class="text-mo-black-400 mt-1">欢迎回来，查看系统概览</p>
    </div>
    
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="stat in stats" 
        :key="stat.title"
        class="p-6 bg-mo-black-900/50 border border-white/5 rounded-xl"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-mo-black-400 text-sm">{{ stat.title }}</p>
            <p class="text-3xl font-bold text-white mt-2">{{ stat.value }}</p>
            <p 
              class="text-sm mt-2"
              :class="stat.trend === 'up' ? 'text-green-400' : 'text-red-400'"
            >
              {{ stat.change }} 较上月
            </p>
          </div>
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="{
              'bg-mo-cloud-500/10': stat.color === 'cloud',
              'bg-mo-purple-500/10': stat.color === 'purple',
              'bg-mo-gold-500/10': stat.color === 'gold',
              'bg-green-500/10': stat.color === 'green'
            }"
          >
            <svg 
              class="w-6 h-6"
              :class="{
                'text-mo-cloud-400': stat.color === 'cloud',
                'text-mo-purple-400': stat.color === 'purple',
                'text-mo-gold-400': stat.color === 'gold',
                'text-green-400': stat.color === 'green'
              }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path v-if="stat.icon === 'article'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              <path v-else-if="stat.icon === 'news'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              <path v-else-if="stat.icon === 'doc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              <path v-else-if="stat.icon === 'view'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 最近文章 -->
      <div class="lg:col-span-2 bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-white">最近文章</h2>
          <router-link 
            to="/admin/articles"
            class="text-mo-cloud-400 text-sm hover:text-mo-cloud-300 transition-colors"
          >
            查看全部 →
          </router-link>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="article in recentArticles" 
            :key="article.id"
            class="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-medium truncate">{{ article.title }}</h3>
              <p class="text-mo-black-500 text-sm mt-1">{{ article.date }}</p>
            </div>
            <span 
              class="px-2 py-1 text-xs rounded-full ml-4"
              :class="getStatusClass(article.status)"
            >
              {{ getStatusText(article.status) }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 快捷操作 & 系统日志 -->
      <div class="space-y-6">
        <!-- 快捷操作 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">快捷操作</h2>
          <div class="grid grid-cols-2 gap-3">
            <router-link
              v-for="action in quickActions"
              :key="action.name"
              :to="action.path"
              class="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              <svg class="w-6 h-6 mx-auto text-mo-cloud-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="action.icon === 'plus'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                <path v-else-if="action.icon === 'news'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                <path v-else-if="action.icon === 'doc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                <path v-else-if="action.icon === 'settings'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-mo-black-300 text-sm">{{ action.name }}</span>
            </router-link>
          </div>
        </div>
        
        <!-- 系统日志 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">系统日志</h2>
          <div class="space-y-3">
            <div 
              v-for="(log, index) in systemLogs" 
              :key="index"
              class="flex items-start space-x-3"
            >
              <div 
                class="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                :class="getLogTypeClass(log.type)"
              ></div>
              <div class="flex-1 min-w-0">
                <p class="text-mo-black-300 text-sm">{{ log.message }}</p>
                <p class="text-mo-black-500 text-xs mt-1">{{ log.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 仪表盘样式 */
</style>

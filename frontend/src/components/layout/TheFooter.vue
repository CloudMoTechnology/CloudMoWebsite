<script setup lang="ts">
/**
 * 页脚组件
 * 
 * @description 墨云官网页脚
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能说明：
 * - 公司信息展示
 * - 快速链接导航
 * - 社交媒体链接
 * - 版权信息
 */

import { computed } from 'vue'

// 当前年份
const currentYear = computed(() => new Date().getFullYear())

// 快速链接
const quickLinks = [
  { name: '关于我们', path: '/about' },
  { name: '服务产品', path: '/services' },
  { name: '筑梦计划', path: '/dream-builder' },
  { name: '新闻动态', path: '/news' },
  { name: '技术文档', path: '/docs' },
  { name: '联系我们', path: '/contact' }
]

// 服务链接
const serviceLinks = [
  { name: '软件开发', path: '/services#software' },
  { name: '人工智能', path: '/services#ai' },
  { name: '技术咨询', path: '/services#consulting' },
  { name: '公益项目', path: '/charity' }
]

// 社交媒体
const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/CloudMoTechnology',
    icon: 'github'
  },
  { 
    name: '微博', 
    url: '#',
    icon: 'weibo'
  },
  { 
    name: '微信', 
    url: '#',
    icon: 'wechat'
  }
]
</script>

<template>
  <!-- 页脚 -->
  <footer class="relative bg-mo-black-950 border-t border-white/5">
    <!-- 装饰性渐变 -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mo-cloud-500/50 to-transparent"></div>
    
    <!-- 主要内容区 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- 品牌信息 -->
        <div class="lg:col-span-1">
          <!-- Logo -->
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-mo-cloud-500 to-mo-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg font-serif">墨</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">墨云科技</h3>
              <p class="text-xs text-mo-black-400">CloudMo Technology</p>
            </div>
          </div>
          
          <!-- 公司简介 -->
          <p class="text-mo-black-400 text-sm leading-relaxed mb-6">
            墨云科技是人工智能技术前沿开发者，致力于通过创新技术赋能企业与个人，
            推动全球数字化转型与公益事业发展。
          </p>
          
          <!-- 社交媒体 -->
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :title="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-mo-black-400 hover:text-mo-cloud-400 hover:bg-mo-cloud-500/10 transition-all duration-300"
            >
              <!-- GitHub 图标 -->
              <svg v-if="social.icon === 'github'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              <!-- 微博图标 -->
              <svg v-else-if="social.icon === 'weibo'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.098 20c-4.612 0-9.098-2.118-9.098-5.727 0-1.882 1.156-4.045 3.132-6.073 2.634-2.7 5.704-3.927 6.858-2.745.516.528.63 1.418.378 2.545-.15.528.602.236.602.236 2.256-.865 4.193-.795 4.835.31.338.583.266 1.39-.113 2.323-.15.378.075.453.338.528 1.128.302 2.407.982 2.407 2.468 0 3.609-4.727 6.135-9.339 6.135zm-1.732-10.727c-2.934.377-5.189 2.57-5.038 4.9.15 2.33 2.633 3.95 5.567 3.573 2.934-.378 5.189-2.57 5.038-4.9-.15-2.33-2.633-3.95-5.567-3.573z"/>
              </svg>
              <!-- 微信图标 -->
              <svg v-else-if="social.icon === 'wechat'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.036 2.96c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 快速链接 -->
        <div>
          <h4 class="text-white font-semibold mb-4">快速链接</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link 
                :to="link.path"
                class="text-mo-black-400 hover:text-mo-cloud-400 transition-colors text-sm"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- 服务项目 -->
        <div>
          <h4 class="text-white font-semibold mb-4">服务项目</h4>
          <ul class="space-y-3">
            <li v-for="link in serviceLinks" :key="link.path">
              <router-link 
                :to="link.path"
                class="text-mo-black-400 hover:text-mo-cloud-400 transition-colors text-sm"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- 联系方式 -->
        <div>
          <h4 class="text-white font-semibold mb-4">联系我们</h4>
          <ul class="space-y-3 text-sm text-mo-black-400">
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-mo-cloud-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@cloudmo.tech</span>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-mo-cloud-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>中国 · 全球远程协作</span>
            </li>
          </ul>
          
          <!-- 订阅表单 -->
          <div class="mt-6">
            <h5 class="text-white text-sm font-medium mb-3">订阅动态</h5>
            <form class="flex" @submit.prevent>
              <input 
                type="email" 
                placeholder="输入邮箱"
                class="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg text-sm text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
              />
              <button 
                type="submit"
                class="px-4 py-2 bg-mo-cloud-600 hover:bg-mo-cloud-500 text-white text-sm font-medium rounded-r-lg transition-colors"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部版权信息 -->
    <div class="border-t border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <!-- 版权 -->
          <p class="text-mo-black-500 text-sm text-center md:text-left">
            © {{ currentYear }} 墨云科技 CloudMo Technology. All rights reserved.
          </p>
          
          <!-- 备案信息 -->
          <div class="flex items-center space-x-4 text-mo-black-500 text-sm">
            <a href="#" class="hover:text-mo-cloud-400 transition-colors">隐私政策</a>
            <span>|</span>
            <a href="#" class="hover:text-mo-cloud-400 transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
/* 页脚样式已通过 Tailwind 类实现 */
</style>

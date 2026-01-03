<script setup lang="ts">
/**
 * 404 页面未找到
 * 
 * @description 墨云科技404错误页面
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { useRouter } from 'vue-router'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

const router = useRouter()

/**
 * 返回首页
 */
function goHome(): void {
  router.push('/')
}

/**
 * 返回上一页
 */
function goBack(): void {
  router.back()
}
</script>

<template>
  <div class="not-found-page min-h-screen bg-mo-black-950 flex items-center justify-center relative overflow-hidden">
    <!-- 粒子背景 -->
    <ParticleBackground 
      :particle-count="80" 
      :speed="0.2"
      primary-color="#ef4444"
      secondary-color="#a855f7"
    />
    
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-gradient-to-br from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
    
    <!-- 内容 -->
    <div class="relative z-10 text-center px-4">
      <!-- 404 数字 -->
      <div class="mb-8">
        <span class="text-[150px] md:text-[200px] font-bold leading-none mo-gradient-text">
          404
        </span>
      </div>
      
      <!-- 标题 -->
      <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">
        页面未找到
      </h1>
      
      <!-- 描述 -->
      <p class="text-mo-black-400 text-lg mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在或已被移除。
        <br />
        请检查URL是否正确，或返回首页继续浏览。
      </p>
      
      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          @click="goHome"
          class="px-8 py-3 bg-gradient-to-r from-mo-cloud-600 to-mo-purple-600 text-white font-semibold rounded-lg hover:from-mo-cloud-500 hover:to-mo-purple-500 transition-all duration-300"
        >
          返回首页
        </button>
        <button
          @click="goBack"
          class="px-8 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
        >
          返回上一页
        </button>
      </div>
      
      <!-- 装饰性文字 -->
      <div class="mt-16 text-mo-black-700 text-sm">
        <p>迷失在数字的海洋中？让我们带您回家。</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 404页面样式 */
</style>

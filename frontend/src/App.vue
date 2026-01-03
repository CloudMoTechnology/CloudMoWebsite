<script setup lang="ts">
/**
 * 根组件
 * 
 * @description 墨云官网 Vue 应用根组件
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能说明：
 * - 提供路由视图容器
 * - 全局加载状态显示
 * - 返回顶部按钮
 */

import { computed } from 'vue'
import { useAppStore } from '@/stores'

// 获取应用状态
const appStore = useAppStore()

// 计算属性：是否显示加载遮罩
const showLoading = computed(() => appStore.loading)

// 计算属性：是否显示返回顶部按钮
const showBackToTop = computed(() => appStore.showBackToTop)

/**
 * 返回顶部
 * 平滑滚动到页面顶部
 */
function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <!-- 应用主容器 -->
  <div id="cloudmo-app" class="min-h-screen bg-mo-black-950">
    <!-- 路由视图：渲染当前路由对应的组件 -->
    <router-view v-slot="{ Component }">
      <!-- 页面过渡动画 -->
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- 全局加载遮罩 -->
    <transition name="fade">
      <div 
        v-if="showLoading" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-mo-black-950/80 backdrop-blur-sm"
      >
        <!-- 加载动画 -->
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <span class="mt-4 text-mo-cloud-400">加载中...</span>
        </div>
      </div>
    </transition>
    
    <!-- 返回顶部按钮 -->
    <transition name="slide-up">
      <button
        v-if="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="返回顶部"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
/**
 * 页面过渡动画
 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/**
 * 淡入淡出动画
 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/**
 * 向上滑入动画
 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/**
 * 加载动画容器
 */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
}

/**
 * 加载动画环
 */
.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #0ea5e9;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  
  &:nth-child(2) {
    width: 70%;
    height: 70%;
    border-top-color: #a855f7;
    animation-delay: 0.15s;
  }
  
  &:nth-child(3) {
    width: 40%;
    height: 40%;
    border-top-color: #eab308;
    animation-delay: 0.3s;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/**
 * 返回顶部按钮
 */
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(168, 85, 247, 0.8));
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
  }
  
  &:active {
    transform: translateY(-2px);
  }
}
</style>

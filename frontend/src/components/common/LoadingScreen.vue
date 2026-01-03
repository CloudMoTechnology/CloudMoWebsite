<script setup lang="ts">
/**
 * 加载屏幕组件
 * 
 * @description 应用加载时显示的全屏动画
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能说明：
 * - 显示品牌Logo动画
 * - 加载进度条
 * - 墨水扩散效果
 */

import { ref, onMounted } from 'vue'

// 组件属性
interface Props {
  /** 是否显示 */
  show?: boolean
  /** 最小显示时间（毫秒） */
  minDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  minDuration: 1500
})

// 事件定义
const emit = defineEmits<{
  (e: 'complete'): void
}>()

// 加载进度
const progress = ref(0)

// 是否完成
const isComplete = ref(false)

/**
 * 模拟加载进度
 */
function simulateProgress(): void {
  const interval = setInterval(() => {
    if (progress.value < 100) {
      // 随机增加进度
      const increment = Math.random() * 15 + 5
      progress.value = Math.min(progress.value + increment, 100)
    } else {
      clearInterval(interval)
      
      // 延迟完成动画
      setTimeout(() => {
        isComplete.value = true
        emit('complete')
      }, 300)
    }
  }, 100)
}

onMounted(() => {
  simulateProgress()
})
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="show && !isComplete"
      class="loading-screen"
    >
      <!-- 背景 -->
      <div class="loading-bg"></div>
      
      <!-- 墨水效果 -->
      <div class="ink-circles">
        <div class="ink-circle ink-circle-1"></div>
        <div class="ink-circle ink-circle-2"></div>
        <div class="ink-circle ink-circle-3"></div>
      </div>
      
      <!-- Logo 和进度 -->
      <div class="loading-content">
        <!-- Logo -->
        <div class="logo-container">
          <div class="logo-icon">
            <span class="logo-text">墨</span>
          </div>
          <div class="logo-name">
            <span class="logo-cn">墨云科技</span>
            <span class="logo-en">CloudMo Technology</span>
          </div>
        </div>
        
        <!-- 进度条 -->
        <div class="progress-container">
          <div class="progress-bar">
            <div 
              class="progress-fill"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <div class="progress-text">{{ Math.floor(progress) }}%</div>
        </div>
        
        <!-- 加载提示 -->
        <div class="loading-tip">
          正在加载资源...
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loading-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #030712 0%, #0a0f1a 50%, #030712 100%);
}

// 墨水圆圈动画
.ink-circles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.ink-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: ink-spread 4s ease-out infinite;
  
  &-1 {
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #60a5fa 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation-delay: 0s;
  }
  
  &-2 {
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #a78bfa 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation-delay: 1s;
  }
  
  &-3 {
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation-delay: 2s;
  }
}

@keyframes ink-spread {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

.loading-content {
  position: relative;
  z-index: 10;
  text-align: center;
}

// Logo 样式
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  animation: logo-pulse 2s ease-in-out infinite;
  
  .logo-text {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    font-family: 'KaiTi', 'STKaiti', serif;
  }
}

@keyframes logo-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 30px rgba(96, 165, 250, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 50px rgba(96, 165, 250, 0.5);
  }
}

.logo-name {
  display: flex;
  flex-direction: column;
  
  .logo-cn {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.25rem;
  }
  
  .logo-en {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 2px;
  }
}

// 进度条样式
.progress-container {
  width: 200px;
  margin: 0 auto 1rem;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%);
  border-radius: 2px;
  transition: width 0.1s ease-out;
}

.progress-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
}

.loading-tip {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
/**
 * 后台管理登录页面
 * 
 * @description 墨云科技后台管理系统登录
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

const router = useRouter()
const userStore = useUserStore()

// 登录表单
const form = reactive({
  username: '',
  password: '',
  remember: false
})

// 加载状态
const loading = ref(false)

/**
 * 处理登录
 */
async function handleLogin(): Promise<void> {
  // 表单验证
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  
  loading.value = true
  
  try {
    // 调用登录接口
    const success = await userStore.login({
      username: form.username,
      password: form.password
    })
    
    if (success) {
      ElMessage.success('登录成功')
      router.push('/admin/dashboard')
    } else {
      ElMessage.error('用户名或密码错误')
    }
  } catch (error) {
    ElMessage.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

/**
 * 返回首页
 */
function goHome(): void {
  router.push('/')
}
</script>

<template>
  <div class="admin-login min-h-screen bg-mo-black-950 flex items-center justify-center relative overflow-hidden">
    <!-- 粒子背景 -->
    <ParticleBackground 
      :particle-count="100" 
      :speed="0.2"
      primary-color="#0ea5e9"
      secondary-color="#a855f7"
    />
    
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-gradient-to-br from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-mo-cloud-500/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mo-purple-500/5 rounded-full blur-3xl"></div>
    
    <!-- 登录卡片 -->
    <div class="relative z-10 w-full max-w-md px-4">
      <div class="bg-mo-black-900/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-mo-cloud-500 to-mo-purple-600 rounded-xl mb-4">
            <span class="text-white font-bold text-2xl font-serif">墨</span>
          </div>
          <h1 class="text-2xl font-bold text-white">墨云管理后台</h1>
          <p class="text-mo-black-400 text-sm mt-2">CloudMo Admin System</p>
        </div>
        
        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- 用户名 -->
          <div>
            <label class="block text-sm font-medium text-mo-black-300 mb-2">
              用户名
            </label>
            <div class="relative">
              <input
                v-model="form.username"
                type="text"
                placeholder="请输入用户名"
                class="w-full px-4 py-3 pl-11 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
              />
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mo-black-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          
          <!-- 密码 -->
          <div>
            <label class="block text-sm font-medium text-mo-black-300 mb-2">
              密码
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                class="w-full px-4 py-3 pl-11 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
              />
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mo-black-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <!-- 记住登录 -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="form.remember"
                type="checkbox"
                class="w-4 h-4 rounded border-white/20 bg-white/5 text-mo-cloud-500 focus:ring-mo-cloud-500 focus:ring-offset-0"
              />
              <span class="ml-2 text-sm text-mo-black-400">记住登录</span>
            </label>
          </div>
          
          <!-- 登录按钮 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-gradient-to-r from-mo-cloud-600 to-mo-purple-600 text-white font-semibold rounded-lg hover:from-mo-cloud-500 hover:to-mo-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </form>
        
        <!-- 提示信息 -->
        <div class="mt-6 p-4 bg-mo-cloud-500/10 border border-mo-cloud-500/20 rounded-lg">
          <p class="text-mo-cloud-400 text-sm text-center">
            演示账号：admin / admin123
          </p>
        </div>
        
        <!-- 返回首页 -->
        <div class="mt-6 text-center">
          <button
            @click="goHome"
            class="text-mo-black-400 hover:text-mo-cloud-400 text-sm transition-colors"
          >
            ← 返回首页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 登录页面样式 */
</style>

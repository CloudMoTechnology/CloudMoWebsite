<script setup lang="ts">
/**
 * 联系我们页面
 * 
 * @description 墨云科技联系方式与表单
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

// 表单数据
const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: ''
})

// 提交状态
const submitting = ref(false)

// 主题选项
const subjects = [
  '技术咨询',
  '商务合作',
  '筑梦计划申请',
  '媒体采访',
  '其他'
]

// 联系方式
const contactInfo = [
  {
    icon: 'email',
    title: '电子邮箱',
    value: 'contact@cloudmo.tech',
    description: '工作日24小时内回复'
  },
  {
    icon: 'location',
    title: '办公地点',
    value: '中国 · 全球远程协作',
    description: '分布式团队，服务全球'
  },
  {
    icon: 'github',
    title: 'GitHub',
    value: 'github.com/CloudMoTechnology',
    description: '开源项目与技术分享'
  }
]

/**
 * 提交表单
 */
async function submitForm(): Promise<void> {
  // 表单验证
  if (!form.name || !form.email || !form.subject || !form.message) {
    ElMessage.warning('请填写必填项')
    return
  }
  
  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    ElMessage.warning('请输入正确的邮箱地址')
    return
  }
  
  submitting.value = true
  
  try {
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    ElMessage.success('消息已发送，我们会尽快与您联系！')
    
    // 重置表单
    form.name = ''
    form.email = ''
    form.company = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    ElMessage.error('发送失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <TheHeader />
    
    <!-- Hero -->
    <section class="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground :particle-count="80" :speed="0.2" />
      <div class="absolute inset-0 bg-gradient-to-b from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span class="mo-gradient-text">联系我们</span>
        </h1>
        <p class="text-lg md:text-xl text-mo-black-300 leading-relaxed">
          无论您有任何问题或合作意向，我们都期待与您交流
        </p>
      </div>
    </section>
    
    <!-- 联系方式 -->
    <section class="py-16 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="info in contactInfo" 
            :key="info.title"
            class="p-6 bg-white/5 border border-white/5 rounded-xl text-center"
          >
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-mo-cloud-500/10 flex items-center justify-center">
              <svg v-if="info.icon === 'email'" class="w-6 h-6 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <svg v-else-if="info.icon === 'location'" class="w-6 h-6 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else-if="info.icon === 'github'" class="w-6 h-6 text-mo-cloud-400" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-white font-semibold mb-1">{{ info.title }}</h3>
            <p class="text-mo-cloud-400 mb-1">{{ info.value }}</p>
            <p class="text-mo-black-500 text-sm">{{ info.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 联系表单 -->
    <section class="py-16 bg-mo-black-900">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">发送消息</h2>
          <p class="text-mo-black-400">填写以下表单，我们会尽快与您联系</p>
        </div>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 姓名 -->
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">
                姓名 <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="请输入您的姓名"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
              />
            </div>
            
            <!-- 邮箱 -->
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">
                邮箱 <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="请输入您的邮箱"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
              />
            </div>
            
            <!-- 公司 -->
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">
                公司/组织
              </label>
              <input
                v-model="form.company"
                type="text"
                placeholder="请输入公司或组织名称"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
              />
            </div>
            
            <!-- 电话 -->
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">
                电话
              </label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="请输入联系电话"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
              />
            </div>
          </div>
          
          <!-- 主题 -->
          <div>
            <label class="block text-sm font-medium text-mo-black-300 mb-2">
              咨询主题 <span class="text-red-400">*</span>
            </label>
            <select
              v-model="form.subject"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500 transition-colors"
            >
              <option value="" disabled class="bg-mo-black-900">请选择咨询主题</option>
              <option 
                v-for="subject in subjects" 
                :key="subject" 
                :value="subject"
                class="bg-mo-black-900"
              >
                {{ subject }}
              </option>
            </select>
          </div>
          
          <!-- 消息内容 -->
          <div>
            <label class="block text-sm font-medium text-mo-black-300 mb-2">
              消息内容 <span class="text-red-400">*</span>
            </label>
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="请详细描述您的需求或问题"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors resize-none"
            ></textarea>
          </div>
          
          <!-- 提交按钮 -->
          <div class="text-center">
            <button
              type="submit"
              :disabled="submitting"
              class="px-8 py-4 bg-gradient-to-r from-mo-cloud-600 to-mo-purple-600 text-white font-semibold rounded-lg hover:from-mo-cloud-500 hover:to-mo-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submitting ? '发送中...' : '发送消息' }}
            </button>
          </div>
        </form>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
/* 联系页面样式 */
</style>

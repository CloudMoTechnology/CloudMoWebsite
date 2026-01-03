<script setup lang="ts">
/**
 * 系统设置页面
 * 
 * @description 墨云科技后台系统设置
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 当前设置标签
const activeTab = ref('general')

// 设置标签
const tabs = [
  { id: 'general', name: '基本设置', icon: 'settings' },
  { id: 'seo', name: 'SEO设置', icon: 'search' },
  { id: 'email', name: '邮件设置', icon: 'email' },
  { id: 'security', name: '安全设置', icon: 'security' }
]

// 基本设置
const generalSettings = reactive({
  siteName: '墨云科技',
  siteDescription: '人工智能技术前沿开发者',
  siteKeywords: 'AI,人工智能,软件开发,墨云科技',
  contactEmail: 'contact@cloudmo.tech',
  icp: '',
  copyright: '© 2024 墨云科技 CloudMo Technology'
})

// SEO设置
const seoSettings = reactive({
  enableSitemap: true,
  enableRobots: true,
  googleAnalytics: '',
  baiduAnalytics: ''
})

// 邮件设置
const emailSettings = reactive({
  smtpHost: '',
  smtpPort: 465,
  smtpUser: '',
  smtpPass: '',
  senderName: '墨云科技',
  senderEmail: 'noreply@cloudmo.tech'
})

// 安全设置
const securitySettings = reactive({
  enableCaptcha: true,
  loginAttempts: 5,
  lockoutDuration: 30,
  sessionTimeout: 120,
  enableTwoFactor: false
})

// 保存状态
const saving = ref(false)

/**
 * 保存设置
 */
async function handleSave(): Promise<void> {
  saving.value = true
  
  try {
    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('设置保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 测试邮件
 */
async function testEmail(): Promise<void> {
  ElMessage.info('正在发送测试邮件...')
  await new Promise(resolve => setTimeout(resolve, 1500))
  ElMessage.success('测试邮件发送成功')
}
</script>

<template>
  <div class="settings-page">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">系统设置</h1>
      <p class="text-mo-black-400 mt-1">管理网站的基本配置</p>
    </div>
    
    <div class="flex gap-6">
      <!-- 侧边导航 -->
      <div class="w-48 flex-shrink-0">
        <nav class="space-y-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left"
            :class="[
              activeTab === tab.id
                ? 'bg-mo-cloud-500/20 text-mo-cloud-400'
                : 'text-mo-black-400 hover:text-white hover:bg-white/5'
            ]"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="tab.icon === 'settings'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path v-else-if="tab.icon === 'search'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              <path v-else-if="tab.icon === 'email'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              <path v-else-if="tab.icon === 'security'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {{ tab.name }}
          </button>
        </nav>
      </div>
      
      <!-- 设置内容 -->
      <div class="flex-1">
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <!-- 基本设置 -->
          <div v-if="activeTab === 'general'" class="space-y-6">
            <h2 class="text-lg font-semibold text-white mb-6">基本设置</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">网站名称</label>
                <input
                  v-model="generalSettings.siteName"
                  type="text"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">联系邮箱</label>
                <input
                  v-model="generalSettings.contactEmail"
                  type="email"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">网站描述</label>
              <textarea
                v-model="generalSettings.siteDescription"
                rows="2"
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500 resize-none"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">网站关键词</label>
              <input
                v-model="generalSettings.siteKeywords"
                type="text"
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
              />
              <p class="text-mo-black-500 text-sm mt-1">多个关键词用逗号分隔</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">ICP备案号</label>
                <input
                  v-model="generalSettings.icp"
                  type="text"
                  placeholder="如：京ICP备12345678号"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">版权信息</label>
                <input
                  v-model="generalSettings.copyright"
                  type="text"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
            </div>
          </div>
          
          <!-- SEO设置 -->
          <div v-else-if="activeTab === 'seo'" class="space-y-6">
            <h2 class="text-lg font-semibold text-white mb-6">SEO设置</h2>
            
            <div class="space-y-4">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="seoSettings.enableSitemap"
                  type="checkbox"
                  class="w-4 h-4 rounded border-white/20 bg-white/5 text-mo-cloud-500 focus:ring-mo-cloud-500"
                />
                <span class="ml-3 text-mo-black-300">启用站点地图 (Sitemap)</span>
              </label>
              
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="seoSettings.enableRobots"
                  type="checkbox"
                  class="w-4 h-4 rounded border-white/20 bg-white/5 text-mo-cloud-500 focus:ring-mo-cloud-500"
                />
                <span class="ml-3 text-mo-black-300">启用 Robots.txt</span>
              </label>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">Google Analytics ID</label>
              <input
                v-model="seoSettings.googleAnalytics"
                type="text"
                placeholder="如：G-XXXXXXXXXX"
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-mo-black-300 mb-2">百度统计 ID</label>
              <input
                v-model="seoSettings.baiduAnalytics"
                type="text"
                placeholder="百度统计代码ID"
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500"
              />
            </div>
          </div>
          
          <!-- 邮件设置 -->
          <div v-else-if="activeTab === 'email'" class="space-y-6">
            <h2 class="text-lg font-semibold text-white mb-6">邮件设置</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">SMTP服务器</label>
                <input
                  v-model="emailSettings.smtpHost"
                  type="text"
                  placeholder="如：smtp.example.com"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">SMTP端口</label>
                <input
                  v-model="emailSettings.smtpPort"
                  type="number"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">SMTP用户名</label>
                <input
                  v-model="emailSettings.smtpUser"
                  type="text"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">SMTP密码</label>
                <input
                  v-model="emailSettings.smtpPass"
                  type="password"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">发件人名称</label>
                <input
                  v-model="emailSettings.senderName"
                  type="text"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">发件人邮箱</label>
                <input
                  v-model="emailSettings.senderEmail"
                  type="email"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
            </div>
            
            <button
              @click="testEmail"
              class="px-4 py-2 bg-white/5 text-mo-black-300 rounded-lg hover:bg-white/10 transition-colors"
            >
              发送测试邮件
            </button>
          </div>
          
          <!-- 安全设置 -->
          <div v-else-if="activeTab === 'security'" class="space-y-6">
            <h2 class="text-lg font-semibold text-white mb-6">安全设置</h2>
            
            <div class="space-y-4">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="securitySettings.enableCaptcha"
                  type="checkbox"
                  class="w-4 h-4 rounded border-white/20 bg-white/5 text-mo-cloud-500 focus:ring-mo-cloud-500"
                />
                <span class="ml-3 text-mo-black-300">启用登录验证码</span>
              </label>
              
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="securitySettings.enableTwoFactor"
                  type="checkbox"
                  class="w-4 h-4 rounded border-white/20 bg-white/5 text-mo-cloud-500 focus:ring-mo-cloud-500"
                />
                <span class="ml-3 text-mo-black-300">启用双因素认证</span>
              </label>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">登录尝试次数</label>
                <input
                  v-model="securitySettings.loginAttempts"
                  type="number"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
                <p class="text-mo-black-500 text-sm mt-1">超过后锁定账户</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">锁定时长（分钟）</label>
                <input
                  v-model="securitySettings.lockoutDuration"
                  type="number"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-mo-black-300 mb-2">会话超时（分钟）</label>
                <input
                  v-model="securitySettings.sessionTimeout"
                  type="number"
                  class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
                />
              </div>
            </div>
          </div>
          
          <!-- 保存按钮 -->
          <div class="mt-8 pt-6 border-t border-white/5 flex justify-end">
            <button
              @click="handleSave"
              :disabled="saving"
              class="px-6 py-2 bg-mo-cloud-600 text-white rounded-lg hover:bg-mo-cloud-500 transition-colors disabled:opacity-50"
            >
              {{ saving ? '保存中...' : '保存设置' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 设置页面样式 */
</style>

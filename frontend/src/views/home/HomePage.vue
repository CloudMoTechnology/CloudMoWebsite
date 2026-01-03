<script setup lang="ts">
/**
 * 首页组件
 * 
 * @description 墨云官网首页
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 页面结构：
 * - Hero 区域：品牌展示与核心价值
 * - 服务介绍：核心业务展示
 * - 筑梦计划：特色项目介绍
 * - 技术实力：技术栈展示
 * - 新闻动态：最新资讯
 * - 合作伙伴：合作机构展示
 */

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

// 路由实例
const router = useRouter()

// 动画引用
const heroRef = ref<HTMLElement | null>(null)
const servicesRef = ref<HTMLElement | null>(null)

// 服务列表数据
const services = [
  {
    icon: 'code',
    title: '软件开发',
    description: '提供企业级软件解决方案，从需求分析到系统部署的全流程服务',
    features: ['Web应用开发', '移动端开发', '系统集成', '技术咨询']
  },
  {
    icon: 'ai',
    title: '人工智能',
    description: '前沿AI技术研发与应用，赋能企业智能化转型升级',
    features: ['机器学习', '自然语言处理', '计算机视觉', '智能推荐']
  },
  {
    icon: 'cloud',
    title: '云服务',
    description: '稳定可靠的云计算服务，助力企业数字化基础设施建设',
    features: ['云架构设计', '容器化部署', 'DevOps', '安全运维']
  },
  {
    icon: 'data',
    title: '数据服务',
    description: '专业的数据分析与处理服务，挖掘数据价值驱动业务增长',
    features: ['数据分析', '数据可视化', '大数据处理', '数据治理']
  }
]

// 技术栈数据
const techStack = [
  { name: 'Vue.js', category: '前端' },
  { name: 'React', category: '前端' },
  { name: 'TypeScript', category: '语言' },
  { name: 'Node.js', category: '后端' },
  { name: 'Python', category: '后端' },
  { name: 'Go', category: '后端' },
  { name: 'TensorFlow', category: 'AI' },
  { name: 'PyTorch', category: 'AI' },
  { name: 'Kubernetes', category: '云原生' },
  { name: 'Docker', category: '云原生' },
  { name: 'PostgreSQL', category: '数据库' },
  { name: 'Redis', category: '数据库' }
]

// 统计数据
const stats = [
  { value: '100+', label: '服务客户' },
  { value: '50+', label: '技术专家' },
  { value: '200+', label: '完成项目' },
  { value: '99.9%', label: '服务可用性' }
]

/**
 * 导航到指定路由
 */
function navigateTo(path: string): void {
  router.push(path)
}

/**
 * 初始化页面动画
 */
function initAnimations(): void {
  // Hero 区域动画
  if (heroRef.value) {
    gsap.from(heroRef.value.querySelectorAll('.hero-animate'), {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })
  }
}

// 组件挂载时初始化动画
onMounted(() => {
  initAnimations()
})
</script>

<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <TheHeader />
    
    <!-- Hero 区域 -->
    <section 
      ref="heroRef"
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- 粒子背景 -->
      <ParticleBackground 
        :particle-count="200"
        :speed="0.3"
        :interactive="true"
      />
      
      <!-- 背景装饰 -->
      <div class="absolute inset-0 bg-gradient-to-b from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
      
      <!-- 墨水纹理装饰 -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-mo-cloud-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mo-purple-500/10 rounded-full blur-3xl"></div>
      
      <!-- Hero 内容 -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- 品牌标语 -->
        <div class="hero-animate mb-6">
          <span class="inline-block px-4 py-2 bg-mo-cloud-500/10 border border-mo-cloud-500/20 rounded-full text-mo-cloud-400 text-sm font-medium">
            人工智能技术前沿开发者
          </span>
        </div>
        
        <!-- 主标题 -->
        <h1 class="hero-animate text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span class="text-white">以</span>
          <span class="mo-gradient-text">墨韵</span>
          <span class="text-white">绘</span>
          <span class="mo-gradient-text">云图</span>
        </h1>
        
        <!-- 副标题 -->
        <p class="hero-animate text-lg sm:text-xl md:text-2xl text-mo-black-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          墨云科技致力于通过创新的人工智能技术，
          <br class="hidden sm:block" />
          为企业与个人提供卓越的数字化解决方案
        </p>
        
        <!-- 行动按钮 -->
        <div class="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            @click="navigateTo('/services')"
            class="px-8 py-4 bg-gradient-to-r from-mo-cloud-600 to-mo-cloud-500 text-white font-semibold rounded-lg hover:from-mo-cloud-500 hover:to-mo-cloud-400 transition-all duration-300 shadow-lg shadow-mo-cloud-500/25 hover:shadow-mo-cloud-500/40 hover:-translate-y-1"
          >
            探索服务
          </button>
          <button 
            @click="navigateTo('/dream-builder')"
            class="px-8 py-4 bg-transparent border-2 border-mo-gold-500/50 text-mo-gold-400 font-semibold rounded-lg hover:bg-mo-gold-500/10 hover:border-mo-gold-400 transition-all duration-300 hover:-translate-y-1"
          >
            筑梦计划
          </button>
        </div>
        
        <!-- 统计数据 -->
        <div class="hero-animate mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="text-center"
          >
            <div class="text-3xl md:text-4xl font-bold mo-gradient-text mb-2">
              {{ stat.value }}
            </div>
            <div class="text-mo-black-400 text-sm">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 向下滚动提示 -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-mo-black-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
    
    <!-- 服务介绍 -->
    <section ref="servicesRef" class="py-20 md:py-32 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 章节标题 -->
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="mo-gradient-text">核心服务</span>
          </h2>
          <p class="mo-section-subtitle">
            我们提供全方位的技术服务，助力企业数字化转型与创新发展
          </p>
        </div>
        
        <!-- 服务卡片网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(service, index) in services" 
            :key="service.title"
            class="mo-card group cursor-pointer"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="navigateTo('/services')"
          >
            <!-- 图标 -->
            <div class="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-mo-cloud-500/20 to-mo-purple-500/20 flex items-center justify-center group-hover:from-mo-cloud-500/30 group-hover:to-mo-purple-500/30 transition-all duration-300">
              <svg v-if="service.icon === 'code'" class="w-7 h-7 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <svg v-else-if="service.icon === 'ai'" class="w-7 h-7 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <svg v-else-if="service.icon === 'cloud'" class="w-7 h-7 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <svg v-else-if="service.icon === 'data'" class="w-7 h-7 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            
            <!-- 标题 -->
            <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-mo-cloud-400 transition-colors">
              {{ service.title }}
            </h3>
            
            <!-- 描述 -->
            <p class="text-mo-black-400 text-sm mb-4 leading-relaxed">
              {{ service.description }}
            </p>
            
            <!-- 特性标签 -->
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="feature in service.features" 
                :key="feature"
                class="px-2 py-1 text-xs bg-white/5 text-mo-black-300 rounded"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 筑梦计划 -->
    <section class="py-20 md:py-32 bg-gradient-to-b from-mo-black-950 to-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 左侧内容 -->
          <div>
            <span class="inline-block px-4 py-2 bg-mo-gold-500/10 border border-mo-gold-500/20 rounded-full text-mo-gold-400 text-sm font-medium mb-6">
              公益项目
            </span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              筑梦计划
            </h2>
            <p class="text-mo-black-300 text-lg leading-relaxed mb-8">
              筑梦计划是墨云科技发起的公益项目，旨在帮助小团队和初创企业
              利用人工智能技术快速开发产品，降低技术门槛，实现创业梦想。
            </p>
            
            <!-- 计划特点 -->
            <ul class="space-y-4 mb-8">
              <li class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-mo-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-mo-black-200">免费技术咨询与方案设计</span>
              </li>
              <li class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-mo-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-mo-black-200">AI 技术资源与工具支持</span>
              </li>
              <li class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-mo-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-mo-black-200">专业导师一对一指导</span>
              </li>
              <li class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-mo-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-mo-black-200">创业社区与资源对接</span>
              </li>
            </ul>
            
            <button 
              @click="navigateTo('/dream-builder')"
              class="px-8 py-4 bg-gradient-to-r from-mo-gold-600 to-mo-gold-500 text-mo-black-950 font-semibold rounded-lg hover:from-mo-gold-500 hover:to-mo-gold-400 transition-all duration-300 shadow-lg shadow-mo-gold-500/25"
            >
              了解更多
            </button>
          </div>
          
          <!-- 右侧装饰 -->
          <div class="relative">
            <div class="aspect-square rounded-2xl bg-gradient-to-br from-mo-gold-500/10 to-mo-purple-500/10 border border-white/5 p-8 flex items-center justify-center">
              <!-- 装饰性图形 -->
              <div class="relative w-full h-full">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-48 h-48 rounded-full bg-mo-gold-500/20 animate-pulse"></div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-32 h-32 rounded-full bg-mo-purple-500/20 animate-pulse" style="animation-delay: 0.5s;"></div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-6xl font-serif text-mo-gold-400">梦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 技术栈 -->
    <section class="py-20 md:py-32 bg-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="mo-gradient-text">技术实力</span>
          </h2>
          <p class="mo-section-subtitle">
            我们掌握前沿技术栈，为客户提供最优质的技术解决方案
          </p>
        </div>
        
        <!-- 技术标签云 -->
        <div class="flex flex-wrap justify-center gap-4">
          <span 
            v-for="tech in techStack" 
            :key="tech.name"
            class="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-mo-black-200 hover:text-mo-cloud-400 hover:border-mo-cloud-500/30 hover:bg-mo-cloud-500/10 transition-all duration-300 cursor-default"
          >
            {{ tech.name }}
          </span>
        </div>
      </div>
    </section>
    
    <!-- CTA 区域 -->
    <section class="py-20 md:py-32 bg-gradient-to-b from-mo-black-900 to-mo-black-950">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          准备好开启数字化之旅了吗？
        </h2>
        <p class="text-mo-black-300 text-lg mb-8">
          无论您是寻求技术合作，还是想了解我们的服务，我们都期待与您交流
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            @click="navigateTo('/contact')"
            class="px-8 py-4 bg-gradient-to-r from-mo-cloud-600 to-mo-purple-600 text-white font-semibold rounded-lg hover:from-mo-cloud-500 hover:to-mo-purple-500 transition-all duration-300 shadow-lg"
          >
            联系我们
          </button>
          <button 
            @click="navigateTo('/about')"
            class="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
          >
            了解更多
          </button>
        </div>
      </div>
    </section>
    
    <!-- 页脚 -->
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
/* 首页特定样式 */
.home-page {
  /* 页面样式通过 Tailwind 类实现 */
}
</style>

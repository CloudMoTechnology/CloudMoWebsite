<script setup lang="ts">
/**
 * 公益项目页面
 * 
 * @description 墨云科技公益项目展示
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

const router = useRouter()

// 公益项目
const projects = ref([
  {
    id: 1,
    name: '筑梦计划',
    description: '帮助小团队和初创企业利用AI技术快速开发产品',
    impact: '已帮助50+团队',
    status: '进行中'
  },
  {
    id: 2,
    name: '技术公开课',
    description: '免费的在线技术课程，普及AI和编程知识',
    impact: '累计10万+学习人次',
    status: '进行中'
  },
  {
    id: 3,
    name: '开源贡献',
    description: '积极参与开源社区，贡献优质开源项目',
    impact: '20+开源项目',
    status: '持续进行'
  },
  {
    id: 4,
    name: '乡村教育支持',
    description: '为偏远地区学校提供信息技术教育支持',
    impact: '覆盖30+学校',
    status: '进行中'
  }
])

// 统计数据
const stats = ref([
  { value: '50+', label: '扶持团队' },
  { value: '10万+', label: '受益人次' },
  { value: '20+', label: '开源项目' },
  { value: '30+', label: '合作学校' }
])

function navigateTo(path: string): void {
  router.push(path)
}
</script>

<template>
  <div class="charity-page">
    <TheHeader />
    
    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground 
        :particle-count="120" 
        :speed="0.2"
        primary-color="#22c55e"
        secondary-color="#0ea5e9"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span class="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
          社会责任
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span class="text-green-400">公益</span>项目
        </h1>
        <p class="text-lg md:text-xl text-mo-black-300 leading-relaxed">
          技术向善，用科技的力量回馈社会，创造更美好的未来
        </p>
      </div>
    </section>
    
    <!-- 统计数据 -->
    <section class="py-16 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="text-center"
          >
            <div class="text-4xl md:text-5xl font-bold text-green-400 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-mo-black-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 公益理念 -->
    <section class="py-20 bg-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              我们的<span class="text-green-400">公益理念</span>
            </h2>
            <p class="text-mo-black-300 text-lg leading-relaxed mb-6">
              墨云科技始终相信，技术的最终目的是让世界变得更美好。
              我们致力于将先进的技术能力转化为社会价值，
              通过各种公益项目帮助更多人获得技术赋能的机会。
            </p>
            <p class="text-mo-black-300 text-lg leading-relaxed">
              无论是帮助创业者实现梦想，还是为偏远地区带去技术教育，
              我们都希望用实际行动践行"技术向善"的理念。
            </p>
          </div>
          <div class="relative">
            <div class="aspect-square rounded-2xl bg-gradient-to-br from-green-500/10 to-mo-cloud-500/10 border border-green-500/20 p-8 flex items-center justify-center">
              <span class="text-8xl font-serif text-green-400">善</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 公益项目列表 -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="text-green-400">公益项目</span>
          </h2>
          <p class="mo-section-subtitle">
            我们正在进行的公益行动
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="p-6 bg-gradient-to-br from-mo-black-800/50 to-mo-black-900/50 border border-green-500/10 rounded-xl hover:border-green-500/30 transition-all duration-300"
          >
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-semibold text-white">{{ project.name }}</h3>
              <span class="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                {{ project.status }}
              </span>
            </div>
            <p class="text-mo-black-400 mb-4">{{ project.description }}</p>
            <p class="text-green-400 text-sm font-medium">{{ project.impact }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA -->
    <section class="py-20 bg-mo-black-900">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          加入我们的<span class="text-green-400">公益行动</span>
        </h2>
        <p class="text-mo-black-300 text-lg mb-8">
          无论是志愿者、合作伙伴还是受益者，我们都欢迎您的参与
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            @click="navigateTo('/dream-builder')"
            class="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300"
          >
            了解筑梦计划
          </button>
          <button 
            @click="navigateTo('/contact')"
            class="px-8 py-4 bg-transparent border border-green-500/30 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 transition-all duration-300"
          >
            联系我们
          </button>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
/* 公益页面样式 */
</style>

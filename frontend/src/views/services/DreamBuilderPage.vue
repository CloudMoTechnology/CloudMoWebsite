<script setup lang="ts">
/**
 * 筑梦计划页面
 * 
 * @description 墨云科技公益项目 - 筑梦计划
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

const router = useRouter()

// 计划特点
const features = ref([
  {
    icon: 'consult',
    title: '免费技术咨询',
    description: '提供专业的技术咨询服务，帮助团队明确技术方向，制定可行的开发方案。'
  },
  {
    icon: 'resource',
    title: 'AI资源支持',
    description: '提供AI技术资源、开发工具和云计算资源，降低技术门槛和开发成本。'
  },
  {
    icon: 'mentor',
    title: '导师指导',
    description: '资深技术专家一对一指导，帮助团队解决技术难题，加速产品开发。'
  },
  {
    icon: 'community',
    title: '社区资源',
    description: '加入创业者社区，获取行业资源、投资对接和市场推广支持。'
  }
])

// 申请条件
const requirements = ref([
  '具有创新性的产品或项目想法',
  '团队规模在10人以下的初创团队',
  '项目涉及AI技术应用或数字化转型',
  '愿意分享经验，回馈社区'
])

// 成功案例
const cases = ref([
  {
    name: '智能教育平台',
    team: '启智团队',
    description: '利用AI技术打造个性化学习平台，已服务超过10万学生。',
    result: '获得天使轮融资'
  },
  {
    name: '医疗影像分析',
    team: '健康科技',
    description: '开发AI辅助诊断系统，提高医疗影像分析效率。',
    result: '与多家医院达成合作'
  },
  {
    name: '智慧农业系统',
    team: '田园科技',
    description: '运用物联网和AI技术，实现农业生产智能化管理。',
    result: '覆盖千亩农田'
  }
])

// 申请流程
const process = ref([
  { step: 1, title: '提交申请', description: '填写申请表，介绍团队和项目' },
  { step: 2, title: '初步评估', description: '评审团队对申请进行初步评估' },
  { step: 3, title: '深度沟通', description: '与团队进行深入交流，了解需求' },
  { step: 4, title: '签订协议', description: '确定合作方式，签订支持协议' },
  { step: 5, title: '开始支持', description: '正式启动技术支持和资源对接' }
])

function navigateTo(path: string): void {
  router.push(path)
}
</script>

<template>
  <div class="dream-builder-page">
    <TheHeader />
    
    <!-- Hero -->
    <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground 
        :particle-count="150" 
        :speed="0.2" 
        primary-color="#eab308"
        secondary-color="#a855f7"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span class="inline-block px-4 py-2 bg-mo-gold-500/10 border border-mo-gold-500/20 rounded-full text-mo-gold-400 text-sm font-medium mb-6">
          公益项目
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span class="text-mo-gold-400">筑梦</span>计划
        </h1>
        <p class="text-lg md:text-xl text-mo-black-300 leading-relaxed mb-8">
          帮助小团队和初创企业利用人工智能技术快速开发产品，
          <br class="hidden md:block" />
          降低技术门槛，实现创业梦想
        </p>
        <button 
          @click="navigateTo('/contact')"
          class="px-8 py-4 bg-gradient-to-r from-mo-gold-600 to-mo-gold-500 text-mo-black-950 font-semibold rounded-lg hover:from-mo-gold-500 hover:to-mo-gold-400 transition-all duration-300 shadow-lg shadow-mo-gold-500/25"
        >
          立即申请
        </button>
      </div>
    </section>
    
    <!-- 计划介绍 -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              什么是<span class="text-mo-gold-400">筑梦计划</span>？
            </h2>
            <p class="text-mo-black-300 text-lg leading-relaxed mb-6">
              筑梦计划是墨云科技发起的公益项目，旨在通过技术赋能，
              帮助有梦想的创业者和小团队实现技术创业梦想。
            </p>
            <p class="text-mo-black-300 text-lg leading-relaxed mb-6">
              我们深知技术门槛是许多创业者面临的最大挑战。
              通过筑梦计划，我们希望打破这一壁垒，让更多优秀的想法能够落地生根。
            </p>
            <p class="text-mo-black-300 text-lg leading-relaxed">
              自2022年启动以来，筑梦计划已帮助超过50个团队实现技术突破，
              其中多个项目获得投资并成功商业化。
            </p>
          </div>
          <div class="relative">
            <div class="aspect-square rounded-2xl bg-gradient-to-br from-mo-gold-500/10 to-mo-purple-500/10 border border-mo-gold-500/20 p-8 flex items-center justify-center">
              <div class="text-center">
                <span class="text-8xl font-serif text-mo-gold-400">梦</span>
                <p class="text-mo-black-300 mt-4">让梦想照进现实</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 计划特点 -->
    <section class="py-20 bg-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="text-mo-gold-400">我们提供</span>
          </h2>
          <p class="mo-section-subtitle">
            全方位的支持，助力您的创业之路
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="p-6 bg-gradient-to-br from-mo-black-800/50 to-mo-black-900/50 border border-mo-gold-500/10 rounded-xl hover:border-mo-gold-500/30 transition-all duration-300"
          >
            <div class="w-14 h-14 mb-4 rounded-xl bg-mo-gold-500/10 flex items-center justify-center">
              <svg class="w-7 h-7 text-mo-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-mo-black-400 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 申请条件 -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              <span class="text-mo-gold-400">申请条件</span>
            </h2>
            <ul class="space-y-4">
              <li 
                v-for="(req, index) in requirements" 
                :key="index"
                class="flex items-start space-x-3"
              >
                <div class="w-6 h-6 rounded-full bg-mo-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-mo-gold-400 text-sm font-bold">{{ index + 1 }}</span>
                </div>
                <span class="text-mo-black-200">{{ req }}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              <span class="text-mo-gold-400">申请流程</span>
            </h2>
            <div class="space-y-4">
              <div 
                v-for="item in process" 
                :key="item.step"
                class="flex items-start space-x-4"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-mo-gold-500 to-mo-gold-600 flex items-center justify-center flex-shrink-0">
                  <span class="text-mo-black-950 font-bold">{{ item.step }}</span>
                </div>
                <div>
                  <h3 class="text-white font-semibold">{{ item.title }}</h3>
                  <p class="text-mo-black-400 text-sm">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 成功案例 -->
    <section class="py-20 bg-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="text-mo-gold-400">成功案例</span>
          </h2>
          <p class="mo-section-subtitle">
            他们通过筑梦计划实现了技术突破
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="item in cases" 
            :key="item.name"
            class="p-6 bg-gradient-to-br from-mo-black-800/50 to-mo-black-900/50 border border-white/5 rounded-xl"
          >
            <h3 class="text-white font-semibold text-lg mb-1">{{ item.name }}</h3>
            <p class="text-mo-gold-400 text-sm mb-3">{{ item.team }}</p>
            <p class="text-mo-black-400 text-sm mb-4">{{ item.description }}</p>
            <span class="inline-block px-3 py-1 bg-mo-gold-500/10 text-mo-gold-400 text-sm rounded-full">
              {{ item.result }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          准备好开启您的<span class="text-mo-gold-400">筑梦之旅</span>了吗？
        </h2>
        <p class="text-mo-black-300 text-lg mb-8">
          无论您的想法处于什么阶段，我们都期待与您交流
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            @click="navigateTo('/contact')"
            class="px-8 py-4 bg-gradient-to-r from-mo-gold-600 to-mo-gold-500 text-mo-black-950 font-semibold rounded-lg hover:from-mo-gold-500 hover:to-mo-gold-400 transition-all duration-300"
          >
            提交申请
          </button>
          <button 
            @click="navigateTo('/about')"
            class="px-8 py-4 bg-transparent border border-mo-gold-500/30 text-mo-gold-400 font-semibold rounded-lg hover:bg-mo-gold-500/10 transition-all duration-300"
          >
            了解更多
          </button>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
/* 筑梦计划页面样式 */
</style>

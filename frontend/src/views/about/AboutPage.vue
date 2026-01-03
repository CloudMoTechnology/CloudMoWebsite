<script setup lang="ts">
/**
 * 关于我们页面
 * 
 * @description 墨云科技公司介绍页面
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 页面内容：
 * - 公司简介
 * - 发展历程
 * - 企业文化
 * - 团队介绍
 */

import { ref } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

// 发展历程数据
const milestones = ref([
  { year: '2020', title: '公司成立', description: '墨云科技正式成立，开启人工智能技术探索之旅' },
  { year: '2021', title: '技术突破', description: '核心AI算法取得重大突破，服务首批企业客户' },
  { year: '2022', title: '筑梦计划启动', description: '发起公益项目"筑梦计划"，帮助小团队实现技术梦想' },
  { year: '2023', title: '全球化布局', description: '业务拓展至全球市场，建立国际化技术团队' },
  { year: '2024', title: '生态构建', description: '打造完整的AI技术生态，赋能更多行业数字化转型' }
])

// 企业价值观
const values = ref([
  { icon: 'innovation', title: '创新驱动', description: '持续探索前沿技术，以创新引领行业发展' },
  { icon: 'quality', title: '品质至上', description: '追求卓越品质，为客户提供最优质的服务' },
  { icon: 'collaboration', title: '协作共赢', description: '与客户、伙伴携手共进，实现互利共赢' },
  { icon: 'responsibility', title: '社会责任', description: '积极回馈社会，推动技术普惠与公益事业' }
])

// 团队成员
const team = ref([
  { name: '创始人', role: 'CEO & 首席技术官', avatar: '', description: '资深AI技术专家，拥有丰富的技术研发与团队管理经验' },
  { name: '技术负责人', role: 'CTO', avatar: '', description: '全栈技术专家，专注于系统架构设计与技术创新' },
  { name: '产品负责人', role: 'CPO', avatar: '', description: '产品设计专家，致力于打造极致用户体验' },
  { name: '运营负责人', role: 'COO', avatar: '', description: '企业运营专家，推动公司高效运转与业务增长' }
])
</script>

<template>
  <div class="about-page">
    <!-- 顶部导航 -->
    <TheHeader />
    
    <!-- Hero 区域 -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground :particle-count="100" :speed="0.2" />
      <div class="absolute inset-0 bg-gradient-to-b from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          关于<span class="mo-gradient-text">墨云</span>
        </h1>
        <p class="text-lg md:text-xl text-mo-black-300 leading-relaxed">
          墨云科技是一家专注于人工智能技术研发与应用的科技公司，
          致力于通过创新技术赋能企业与个人，推动全球数字化转型。
        </p>
      </div>
    </section>
    
    <!-- 公司简介 -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              我们的<span class="mo-gradient-text">使命</span>
            </h2>
            <p class="text-mo-black-300 text-lg leading-relaxed mb-6">
              墨云科技秉承"以墨韵绘云图"的理念，将传统文化的深邃与现代科技的创新相融合。
              我们相信，技术的力量不仅在于解决问题，更在于创造美好的未来。
            </p>
            <p class="text-mo-black-300 text-lg leading-relaxed">
              作为人工智能技术的前沿开发者，我们不断探索AI技术的边界，
              为企业提供智能化解决方案，同时通过"筑梦计划"等公益项目，
              帮助更多人实现技术创业梦想。
            </p>
          </div>
          <div class="relative">
            <div class="aspect-video rounded-2xl bg-gradient-to-br from-mo-cloud-500/10 to-mo-purple-500/10 border border-white/5 flex items-center justify-center">
              <span class="text-8xl font-serif mo-gradient-text">墨云</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 发展历程 -->
    <section class="py-20 bg-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="mo-gradient-text">发展历程</span>
          </h2>
          <p class="mo-section-subtitle">
            从创立到成长，每一步都凝聚着我们的努力与坚持
          </p>
        </div>
        
        <!-- 时间线 -->
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-mo-cloud-500 via-mo-purple-500 to-mo-gold-500"></div>
          
          <div class="space-y-12">
            <div 
              v-for="(milestone, index) in milestones" 
              :key="milestone.year"
              class="relative flex items-center"
              :class="index % 2 === 0 ? 'justify-start' : 'justify-end'"
            >
              <div 
                class="w-5/12 p-6 mo-card"
                :class="index % 2 === 0 ? 'mr-auto text-right' : 'ml-auto text-left'"
              >
                <span class="text-mo-cloud-400 font-bold text-xl">{{ milestone.year }}</span>
                <h3 class="text-white font-semibold text-lg mt-2">{{ milestone.title }}</h3>
                <p class="text-mo-black-400 mt-2">{{ milestone.description }}</p>
              </div>
              
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-mo-cloud-500 rounded-full border-4 border-mo-black-900"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 企业价值观 -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="mo-gradient-text">企业价值观</span>
          </h2>
          <p class="mo-section-subtitle">
            我们坚守的核心价值，指引着每一个决策与行动
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="value in values" 
            :key="value.title"
            class="mo-card text-center"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-mo-cloud-500/20 to-mo-purple-500/20 flex items-center justify-center">
              <svg class="w-8 h-8 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ value.title }}</h3>
            <p class="text-mo-black-400 text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 团队介绍 -->
    <section class="py-20 bg-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="mo-gradient-text">核心团队</span>
          </h2>
          <p class="mo-section-subtitle">
            一群热爱技术、追求卓越的伙伴
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="member in team" 
            :key="member.name"
            class="mo-card text-center group"
          >
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-mo-cloud-500 to-mo-purple-500 flex items-center justify-center">
              <span class="text-white text-2xl font-bold">{{ member.name.charAt(0) }}</span>
            </div>
            <h3 class="text-white font-semibold text-lg">{{ member.name }}</h3>
            <p class="text-mo-cloud-400 text-sm mb-2">{{ member.role }}</p>
            <p class="text-mo-black-400 text-sm">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 页脚 -->
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
/* 关于页面样式 */
</style>

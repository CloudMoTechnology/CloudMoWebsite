<script setup lang="ts">
/**
 * 技术文档页面
 * 
 * @description 墨云科技技术文档中心
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

const router = useRouter()

// 文档分类
const categories = ref([
  {
    id: 1,
    name: '快速开始',
    icon: 'rocket',
    description: '快速了解和上手墨云技术服务',
    docs: [
      { id: 1, title: '平台介绍', description: '了解墨云技术平台的核心功能' },
      { id: 2, title: '快速入门', description: '5分钟快速上手指南' },
      { id: 3, title: '环境配置', description: '开发环境搭建与配置' }
    ]
  },
  {
    id: 2,
    name: 'API文档',
    icon: 'api',
    description: '详细的API接口文档与示例',
    docs: [
      { id: 4, title: 'API概览', description: 'API设计规范与认证方式' },
      { id: 5, title: '用户接口', description: '用户管理相关API' },
      { id: 6, title: '数据接口', description: '数据操作相关API' }
    ]
  },
  {
    id: 3,
    name: 'AI服务',
    icon: 'ai',
    description: 'AI能力接入与使用指南',
    docs: [
      { id: 7, title: 'AI服务概述', description: 'AI服务能力介绍' },
      { id: 8, title: '文本处理', description: 'NLP相关服务使用指南' },
      { id: 9, title: '图像识别', description: '计算机视觉服务指南' }
    ]
  },
  {
    id: 4,
    name: '最佳实践',
    icon: 'practice',
    description: '项目实战经验与技术分享',
    docs: [
      { id: 10, title: '架构设计', description: '系统架构设计最佳实践' },
      { id: 11, title: '性能优化', description: '应用性能优化指南' },
      { id: 12, title: '安全规范', description: '安全开发最佳实践' }
    ]
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 过滤后的分类
const filteredCategories = computed(() => {
  if (!searchKeyword.value) return categories.value
  
  return categories.value.map(category => ({
    ...category,
    docs: category.docs.filter(doc => 
      doc.title.includes(searchKeyword.value) || 
      doc.description.includes(searchKeyword.value)
    )
  })).filter(category => category.docs.length > 0)
})

// 查看文档
function viewDoc(docId: number): void {
  router.push(`/docs/${docId}`)
}
</script>

<template>
  <div class="docs-page">
    <TheHeader />
    
    <!-- Hero -->
    <section class="relative pt-32 pb-16 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          <span class="mo-gradient-text">技术文档</span>
        </h1>
        <p class="text-mo-black-300 text-lg mb-8">
          全面的技术文档与开发指南，助您快速上手
        </p>
        
        <!-- 搜索框 -->
        <div class="max-w-xl">
          <div class="relative">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="搜索文档..."
              class="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 transition-colors"
            />
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mo-black-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 文档列表 -->
    <section class="py-12 bg-mo-black-950 min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-12">
          <div 
            v-for="category in filteredCategories" 
            :key="category.id"
          >
            <!-- 分类标题 -->
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-mo-cloud-500/10 flex items-center justify-center">
                <svg class="w-5 h-5 text-mo-cloud-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-white">{{ category.name }}</h2>
                <p class="text-mo-black-400 text-sm">{{ category.description }}</p>
              </div>
            </div>
            
            <!-- 文档卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="doc in category.docs"
                :key="doc.id"
                class="p-4 bg-white/5 border border-white/5 rounded-lg cursor-pointer hover:border-mo-cloud-500/30 hover:bg-white/10 transition-all duration-300 group"
                @click="viewDoc(doc.id)"
              >
                <h3 class="text-white font-medium mb-2 group-hover:text-mo-cloud-400 transition-colors">
                  {{ doc.title }}
                </h3>
                <p class="text-mo-black-400 text-sm">
                  {{ doc.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="filteredCategories.length === 0" class="text-center py-20">
          <p class="text-mo-black-400">未找到相关文档</p>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
/* 文档页面样式 */
</style>

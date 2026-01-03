<script setup lang="ts">
/**
 * 新闻详情页面
 * 
 * @description 墨云科技新闻详情展示页面
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { formatDate } from '@/utils'

const route = useRoute()
const router = useRouter()

// 文章数据
const article = ref({
  id: 1,
  title: '墨云科技发布新一代AI开发平台',
  content: `
## 概述

墨云科技今日正式发布新一代AI开发平台，该平台集成了最新的大语言模型技术，为开发者提供更强大的工具支持。

## 核心特性

### 1. 强大的模型支持

新平台支持多种主流大语言模型，包括GPT系列、Claude系列等，开发者可以根据需求灵活选择。

### 2. 简化的开发流程

通过可视化界面和低代码工具，大幅降低AI应用开发门槛，让更多开发者能够快速上手。

### 3. 企业级安全保障

平台提供完善的数据安全和隐私保护机制，满足企业级应用的安全合规要求。

## 应用场景

- 智能客服系统
- 内容生成与审核
- 数据分析与洞察
- 代码辅助开发

## 未来展望

墨云科技将持续投入AI技术研发，不断完善平台功能，为开发者和企业提供更优质的服务。
  `,
  category: 'news',
  author: '墨云科技',
  publishedAt: '2024-01-15',
  viewCount: 1256,
  tags: ['AI', '产品发布', '技术平台']
})

// 相关文章
const relatedArticles = ref([
  { id: 2, title: '深度解析：大语言模型在企业应用中的最佳实践', publishedAt: '2024-01-10' },
  { id: 5, title: 'Vue 3 + TypeScript 最佳实践指南', publishedAt: '2023-12-25' }
])

// 返回列表
function goBack(): void {
  router.push('/news')
}

// 查看相关文章
function viewArticle(id: number): void {
  router.push(`/news/${id}`)
}

onMounted(() => {
  // 实际项目中这里会根据 route.params.id 获取文章数据
  console.log('文章ID:', route.params.id)
})
</script>

<template>
  <div class="news-detail-page">
    <TheHeader />
    
    <!-- 文章内容 -->
    <article class="pt-24 pb-16 bg-mo-black-950 min-h-screen">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 返回按钮 -->
        <button 
          @click="goBack"
          class="flex items-center text-mo-black-400 hover:text-mo-cloud-400 transition-colors mb-8"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回列表
        </button>
        
        <!-- 文章头部 -->
        <header class="mb-8">
          <span class="inline-block px-3 py-1 bg-mo-cloud-500/10 text-mo-cloud-400 text-sm rounded-full mb-4">
            公司动态
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ article.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-sm text-mo-black-400">
            <span>{{ article.author }}</span>
            <span>{{ formatDate(article.publishedAt, 'YYYY年MM月DD日') }}</span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ article.viewCount }} 阅读
            </span>
          </div>
        </header>
        
        <!-- 文章正文 -->
        <div class="prose prose-invert prose-lg max-w-none">
          <div class="article-content text-mo-black-200 leading-relaxed" v-html="article.content.replace(/\n/g, '<br>').replace(/## /g, '<h2 class=\'text-2xl font-bold text-white mt-8 mb-4\'>').replace(/### /g, '<h3 class=\'text-xl font-semibold text-white mt-6 mb-3\'>')">
          </div>
        </div>
        
        <!-- 标签 -->
        <div class="mt-8 pt-8 border-t border-white/5">
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in article.tags" 
              :key="tag"
              class="px-3 py-1 bg-white/5 text-mo-black-300 text-sm rounded-full"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
        
        <!-- 相关文章 -->
        <div class="mt-12 pt-8 border-t border-white/5">
          <h3 class="text-xl font-semibold text-white mb-6">相关文章</h3>
          <div class="space-y-4">
            <div 
              v-for="related in relatedArticles" 
              :key="related.id"
              class="p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              @click="viewArticle(related.id)"
            >
              <h4 class="text-white font-medium hover:text-mo-cloud-400 transition-colors">
                {{ related.title }}
              </h4>
              <p class="text-mo-black-500 text-sm mt-1">
                {{ formatDate(related.publishedAt, 'YYYY年MM月DD日') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.article-content {
  :deep(h2) {
    @apply text-2xl font-bold text-white mt-8 mb-4;
  }
  
  :deep(h3) {
    @apply text-xl font-semibold text-white mt-6 mb-3;
  }
  
  :deep(p) {
    @apply mb-4;
  }
  
  :deep(ul), :deep(ol) {
    @apply pl-6 mb-4;
  }
  
  :deep(li) {
    @apply mb-2;
  }
}
</style>

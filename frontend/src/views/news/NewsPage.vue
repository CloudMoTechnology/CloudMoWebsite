<script setup lang="ts">
/**
 * 新闻动态页面
 * 
 * @description 墨云科技新闻列表页面
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { formatDate, formatRelativeTime } from '@/utils'

const router = useRouter()

// 当前分类
const currentCategory = ref('all')

// 分类列表
const categories = [
  { id: 'all', name: '全部' },
  { id: 'news', name: '公司动态' },
  { id: 'tech', name: '技术分享' },
  { id: 'announcement', name: '公告' },
  { id: 'case', name: '案例' }
]

// 模拟新闻数据
const allNews = ref([
  {
    id: 1,
    title: '墨云科技发布新一代AI开发平台',
    summary: '全新的AI开发平台集成了最新的大语言模型技术，为开发者提供更强大的工具支持。',
    category: 'news',
    author: '墨云科技',
    publishedAt: '2024-01-15',
    viewCount: 1256,
    coverImage: ''
  },
  {
    id: 2,
    title: '深度解析：大语言模型在企业应用中的最佳实践',
    summary: '本文详细介绍了大语言模型在企业级应用中的部署策略、优化技巧和常见问题解决方案。',
    category: 'tech',
    author: '技术团队',
    publishedAt: '2024-01-10',
    viewCount: 2341,
    coverImage: ''
  },
  {
    id: 3,
    title: '筑梦计划2024年度申请正式开启',
    summary: '2024年度筑梦计划现已开放申请，我们将继续支持更多有梦想的创业团队。',
    category: 'announcement',
    author: '墨云科技',
    publishedAt: '2024-01-05',
    viewCount: 3567,
    coverImage: ''
  },
  {
    id: 4,
    title: '案例分享：AI赋能智慧医疗的实践探索',
    summary: '与某三甲医院合作，利用AI技术提升医疗影像诊断效率的成功案例分享。',
    category: 'case',
    author: '项目团队',
    publishedAt: '2024-01-01',
    viewCount: 1890,
    coverImage: ''
  },
  {
    id: 5,
    title: 'Vue 3 + TypeScript 最佳实践指南',
    summary: '分享我们在大型项目中使用 Vue 3 和 TypeScript 的经验和最佳实践。',
    category: 'tech',
    author: '前端团队',
    publishedAt: '2023-12-25',
    viewCount: 4521,
    coverImage: ''
  },
  {
    id: 6,
    title: '墨云科技荣获年度最佳AI创新企业奖',
    summary: '在2023年度科技创新大会上，墨云科技凭借在AI领域的突出贡献荣获殊荣。',
    category: 'news',
    author: '墨云科技',
    publishedAt: '2023-12-20',
    viewCount: 2890,
    coverImage: ''
  }
])

// 过滤后的新闻
const filteredNews = computed(() => {
  if (currentCategory.value === 'all') {
    return allNews.value
  }
  return allNews.value.filter(news => news.category === currentCategory.value)
})

// 获取分类名称
function getCategoryName(categoryId: string): string {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : '未分类'
}

// 切换分类
function setCategory(categoryId: string): void {
  currentCategory.value = categoryId
}

// 查看新闻详情
function viewNews(id: number): void {
  router.push(`/news/${id}`)
}
</script>

<template>
  <div class="news-page">
    <TheHeader />
    
    <!-- Hero -->
    <section class="relative pt-32 pb-16 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          <span class="mo-gradient-text">新闻动态</span>
        </h1>
        <p class="text-mo-black-300 text-lg">
          了解墨云科技的最新动态与技术分享
        </p>
      </div>
    </section>
    
    <!-- 分类筛选 -->
    <section class="bg-mo-black-950 border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-1 overflow-x-auto py-4">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="setCategory(category.id)"
            class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300"
            :class="[
              currentCategory === category.id
                ? 'bg-mo-cloud-500/20 text-mo-cloud-400'
                : 'text-mo-black-400 hover:text-white hover:bg-white/5'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- 新闻列表 -->
    <section class="py-12 bg-mo-black-950 min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="news in filteredNews"
            :key="news.id"
            class="mo-card cursor-pointer group"
            @click="viewNews(news.id)"
          >
            <!-- 封面图 -->
            <div class="aspect-video rounded-lg bg-gradient-to-br from-mo-cloud-500/10 to-mo-purple-500/10 mb-4 flex items-center justify-center overflow-hidden">
              <span class="text-4xl font-serif mo-gradient-text">{{ news.title.charAt(0) }}</span>
            </div>
            
            <!-- 分类标签 -->
            <span class="inline-block px-2 py-1 bg-mo-cloud-500/10 text-mo-cloud-400 text-xs rounded mb-3">
              {{ getCategoryName(news.category) }}
            </span>
            
            <!-- 标题 -->
            <h2 class="text-lg font-semibold text-white mb-2 group-hover:text-mo-cloud-400 transition-colors line-clamp-2">
              {{ news.title }}
            </h2>
            
            <!-- 摘要 -->
            <p class="text-mo-black-400 text-sm mb-4 line-clamp-2">
              {{ news.summary }}
            </p>
            
            <!-- 元信息 -->
            <div class="flex items-center justify-between text-xs text-mo-black-500">
              <span>{{ news.author }}</span>
              <div class="flex items-center space-x-4">
                <span>{{ formatRelativeTime(news.publishedAt) }}</span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ news.viewCount }}
                </span>
              </div>
            </div>
          </article>
        </div>
        
        <!-- 空状态 -->
        <div v-if="filteredNews.length === 0" class="text-center py-20">
          <p class="text-mo-black-400">暂无相关新闻</p>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

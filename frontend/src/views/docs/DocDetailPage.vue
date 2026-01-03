<script setup lang="ts">
/**
 * 文档详情页面
 * 
 * @description 墨云科技技术文档详情展示
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

const route = useRoute()
const router = useRouter()

// 文档数据
const doc = ref({
  id: 1,
  title: '平台介绍',
  category: '快速开始',
  content: `
# 平台介绍

墨云技术平台是一个集成了多种AI能力的开发平台，为开发者提供便捷的AI应用开发体验。

## 核心功能

### 1. AI模型服务

平台集成了多种主流AI模型，包括：

- 大语言模型（LLM）
- 图像识别模型
- 语音识别模型
- 推荐系统模型

### 2. 开发工具

提供丰富的开发工具支持：

\`\`\`javascript
// 示例代码
import { CloudMoAI } from '@cloudmo/sdk';

const ai = new CloudMoAI({
  apiKey: 'your-api-key'
});

const result = await ai.chat({
  model: 'cloudmo-gpt',
  messages: [
    { role: 'user', content: '你好' }
  ]
});
\`\`\`

### 3. 管理控制台

可视化的管理控制台，方便管理应用和监控使用情况。

## 快速开始

1. 注册账号并获取API Key
2. 安装SDK
3. 调用API

## 下一步

- [快速入门](/docs/2)
- [API文档](/docs/4)
  `,
  updatedAt: '2024-01-15'
})

// 目录
const toc = ref([
  { id: 'intro', title: '平台介绍', level: 1 },
  { id: 'features', title: '核心功能', level: 2 },
  { id: 'ai-models', title: 'AI模型服务', level: 3 },
  { id: 'dev-tools', title: '开发工具', level: 3 },
  { id: 'console', title: '管理控制台', level: 3 },
  { id: 'quickstart', title: '快速开始', level: 2 },
  { id: 'next', title: '下一步', level: 2 }
])

// 返回列表
function goBack(): void {
  router.push('/docs')
}

onMounted(() => {
  console.log('文档ID:', route.params.id)
})
</script>

<template>
  <div class="doc-detail-page">
    <TheHeader />
    
    <div class="pt-20 bg-mo-black-950 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex gap-8">
          <!-- 侧边栏 -->
          <aside class="hidden lg:block w-64 flex-shrink-0">
            <div class="sticky top-24">
              <button 
                @click="goBack"
                class="flex items-center text-mo-black-400 hover:text-mo-cloud-400 transition-colors mb-6"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回文档
              </button>
              
              <h3 class="text-sm font-semibold text-mo-black-400 uppercase tracking-wider mb-4">
                目录
              </h3>
              <nav class="space-y-2">
                <a
                  v-for="item in toc"
                  :key="item.id"
                  :href="`#${item.id}`"
                  class="block text-sm text-mo-black-400 hover:text-mo-cloud-400 transition-colors"
                  :class="{ 'pl-4': item.level === 3 }"
                >
                  {{ item.title }}
                </a>
              </nav>
            </div>
          </aside>
          
          <!-- 主内容 -->
          <main class="flex-1 min-w-0">
            <!-- 面包屑 -->
            <div class="flex items-center space-x-2 text-sm text-mo-black-400 mb-6">
              <router-link to="/docs" class="hover:text-mo-cloud-400 transition-colors">
                文档
              </router-link>
              <span>/</span>
              <span>{{ doc.category }}</span>
              <span>/</span>
              <span class="text-white">{{ doc.title }}</span>
            </div>
            
            <!-- 文档内容 -->
            <article class="prose prose-invert prose-lg max-w-none">
              <div class="doc-content text-mo-black-200 leading-relaxed">
                <h1 class="text-3xl font-bold text-white mb-6">{{ doc.title }}</h1>
                
                <p class="text-mo-black-300 mb-8">
                  墨云技术平台是一个集成了多种AI能力的开发平台，为开发者提供便捷的AI应用开发体验。
                </p>
                
                <h2 class="text-2xl font-bold text-white mt-8 mb-4">核心功能</h2>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">1. AI模型服务</h3>
                <p class="mb-4">平台集成了多种主流AI模型，包括：</p>
                <ul class="list-disc pl-6 mb-4 space-y-2">
                  <li>大语言模型（LLM）</li>
                  <li>图像识别模型</li>
                  <li>语音识别模型</li>
                  <li>推荐系统模型</li>
                </ul>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">2. 开发工具</h3>
                <p class="mb-4">提供丰富的开发工具支持：</p>
                
                <pre class="bg-mo-black-900 rounded-lg p-4 overflow-x-auto mb-4"><code class="text-sm text-mo-cloud-300">// 示例代码
import { CloudMoAI } from '@cloudmo/sdk';

const ai = new CloudMoAI({
  apiKey: 'your-api-key'
});

const result = await ai.chat({
  model: 'cloudmo-gpt',
  messages: [
    { role: 'user', content: '你好' }
  ]
});</code></pre>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">3. 管理控制台</h3>
                <p class="mb-4">可视化的管理控制台，方便管理应用和监控使用情况。</p>
                
                <h2 class="text-2xl font-bold text-white mt-8 mb-4">快速开始</h2>
                <ol class="list-decimal pl-6 mb-4 space-y-2">
                  <li>注册账号并获取API Key</li>
                  <li>安装SDK</li>
                  <li>调用API</li>
                </ol>
              </div>
            </article>
            
            <!-- 更新时间 -->
            <div class="mt-8 pt-8 border-t border-white/5 text-sm text-mo-black-500">
              最后更新：{{ doc.updatedAt }}
            </div>
          </main>
        </div>
      </div>
    </div>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.doc-content {
  :deep(h1), :deep(h2), :deep(h3) {
    scroll-margin-top: 100px;
  }
}
</style>

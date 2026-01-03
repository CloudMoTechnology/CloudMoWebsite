<script setup lang="ts">
/**
 * 文章编辑页面
 * 
 * @description 墨云科技后台文章编辑器
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

// 是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 页面标题
const pageTitle = computed(() => isEdit.value ? '编辑文章' : '新建文章')

// 表单数据
const form = reactive({
  title: '',
  category: '',
  summary: '',
  content: '',
  tags: [] as string[],
  coverImage: '',
  status: 'draft'
})

// 标签输入
const tagInput = ref('')

// 加载状态
const loading = ref(false)
const saving = ref(false)

// 分类选项
const categories = [
  { value: 'tech', label: '技术分享' },
  { value: 'news', label: '公司动态' },
  { value: 'case', label: '案例分享' },
  { value: 'announcement', label: '公告' }
]

/**
 * 加载文章数据
 */
async function loadArticle(): Promise<void> {
  if (!isEdit.value) return
  
  loading.value = true
  try {
    // 模拟加载数据
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟数据
    form.title = '墨云科技发布新一代AI开发平台'
    form.category = 'news'
    form.summary = '全新的AI开发平台集成了最新的大语言模型技术'
    form.content = '# 概述\n\n墨云科技今日正式发布新一代AI开发平台...'
    form.tags = ['AI', '产品发布']
    form.status = 'published'
  } catch (error) {
    ElMessage.error('加载文章失败')
  } finally {
    loading.value = false
  }
}

/**
 * 添加标签
 */
function addTag(): void {
  const tag = tagInput.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
    tagInput.value = ''
  }
}

/**
 * 移除标签
 */
function removeTag(tag: string): void {
  const index = form.tags.indexOf(tag)
  if (index > -1) {
    form.tags.splice(index, 1)
  }
}

/**
 * 保存文章
 */
async function handleSave(publish: boolean = false): Promise<void> {
  // 表单验证
  if (!form.title) {
    ElMessage.warning('请输入文章标题')
    return
  }
  if (!form.category) {
    ElMessage.warning('请选择文章分类')
    return
  }
  if (!form.content) {
    ElMessage.warning('请输入文章内容')
    return
  }
  
  saving.value = true
  
  try {
    // 设置状态
    form.status = publish ? 'published' : 'draft'
    
    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success(publish ? '发布成功' : '保存成功')
    router.push('/admin/articles')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 取消编辑
 */
function handleCancel(): void {
  router.back()
}

onMounted(() => {
  loadArticle()
})
</script>

<template>
  <div class="article-edit">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <button
          @click="handleCancel"
          class="p-2 rounded-lg text-mo-black-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-white">{{ pageTitle }}</h1>
          <p class="text-mo-black-400 mt-1">{{ isEdit ? '修改文章内容' : '创建新的文章' }}</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <button
          @click="handleSave(false)"
          :disabled="saving"
          class="px-4 py-2 bg-white/5 text-mo-black-300 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          保存草稿
        </button>
        <button
          @click="handleSave(true)"
          :disabled="saving"
          class="px-4 py-2 bg-mo-cloud-600 text-white rounded-lg hover:bg-mo-cloud-500 transition-colors disabled:opacity-50"
        >
          {{ saving ? '保存中...' : '发布文章' }}
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="text-mo-black-400">加载中...</div>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 主内容区 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 标题 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <label class="block text-sm font-medium text-mo-black-300 mb-2">
            文章标题 <span class="text-red-400">*</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="请输入文章标题"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 text-lg"
          />
        </div>
        
        <!-- 摘要 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <label class="block text-sm font-medium text-mo-black-300 mb-2">
            文章摘要
          </label>
          <textarea
            v-model="form.summary"
            rows="3"
            placeholder="请输入文章摘要（可选）"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 resize-none"
          ></textarea>
        </div>
        
        <!-- 内容 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <label class="block text-sm font-medium text-mo-black-300 mb-2">
            文章内容 <span class="text-red-400">*</span>
          </label>
          <div class="text-mo-black-500 text-sm mb-2">支持 Markdown 格式</div>
          <textarea
            v-model="form.content"
            rows="20"
            placeholder="请输入文章内容..."
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 resize-none font-mono text-sm"
          ></textarea>
        </div>
      </div>
      
      <!-- 侧边栏 -->
      <div class="space-y-6">
        <!-- 发布设置 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <h3 class="text-white font-semibold mb-4">发布设置</h3>
          
          <!-- 分类 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-mo-black-300 mb-2">
              文章分类 <span class="text-red-400">*</span>
            </label>
            <select
              v-model="form.category"
              class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
            >
              <option value="" disabled class="bg-mo-black-900">请选择分类</option>
              <option 
                v-for="cat in categories" 
                :key="cat.value" 
                :value="cat.value"
                class="bg-mo-black-900"
              >
                {{ cat.label }}
              </option>
            </select>
          </div>
          
          <!-- 状态 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-mo-black-300 mb-2">
              发布状态
            </label>
            <div class="flex items-center space-x-4">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="form.status"
                  type="radio"
                  value="draft"
                  class="w-4 h-4 text-mo-cloud-500 border-white/20 bg-white/5 focus:ring-mo-cloud-500"
                />
                <span class="ml-2 text-mo-black-300">草稿</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="form.status"
                  type="radio"
                  value="published"
                  class="w-4 h-4 text-mo-cloud-500 border-white/20 bg-white/5 focus:ring-mo-cloud-500"
                />
                <span class="ml-2 text-mo-black-300">发布</span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- 标签 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <h3 class="text-white font-semibold mb-4">文章标签</h3>
          
          <div class="flex space-x-2 mb-3">
            <input
              v-model="tagInput"
              type="text"
              placeholder="输入标签"
              class="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500 text-sm"
              @keyup.enter="addTag"
            />
            <button
              @click="addTag"
              class="px-3 py-2 bg-mo-cloud-600 text-white rounded-lg hover:bg-mo-cloud-500 transition-colors text-sm"
            >
              添加
            </button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in form.tags"
              :key="tag"
              class="inline-flex items-center px-3 py-1 bg-mo-cloud-500/10 text-mo-cloud-400 rounded-full text-sm"
            >
              {{ tag }}
              <button
                @click="removeTag(tag)"
                class="ml-2 hover:text-mo-cloud-300"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </div>
          
          <p v-if="form.tags.length === 0" class="text-mo-black-500 text-sm mt-2">
            暂无标签
          </p>
        </div>
        
        <!-- 封面图 -->
        <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-6">
          <h3 class="text-white font-semibold mb-4">封面图片</h3>
          
          <div class="aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:border-mo-cloud-500/50 transition-colors">
            <div class="text-center">
              <svg class="w-10 h-10 mx-auto text-mo-black-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-mo-black-500 text-sm">点击上传封面图</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 文章编辑样式 */
</style>

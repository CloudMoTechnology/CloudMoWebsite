<script setup lang="ts">
/**
 * 文章管理页面
 * 
 * @description 墨云科技后台文章管理
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

// 搜索条件
const searchForm = reactive({
  keyword: '',
  category: '',
  status: ''
})

// 分类选项
const categories = [
  { value: '', label: '全部分类' },
  { value: 'tech', label: '技术分享' },
  { value: 'news', label: '公司动态' },
  { value: 'case', label: '案例分享' },
  { value: 'announcement', label: '公告' }
]

// 状态选项
const statusOptions = [
  { value: '', label: '全部状态' },
  { value: 'published', label: '已发布' },
  { value: 'draft', label: '草稿' }
]

// 文章列表数据
const articles = ref([
  { 
    id: 1, 
    title: '墨云科技发布新一代AI开发平台', 
    category: 'news',
    author: '墨云科技',
    status: 'published', 
    viewCount: 1256,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  { 
    id: 2, 
    title: '深度解析：大语言模型在企业应用中的最佳实践', 
    category: 'tech',
    author: '技术团队',
    status: 'published', 
    viewCount: 2341,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12'
  },
  { 
    id: 3, 
    title: '筑梦计划2024年度申请正式开启', 
    category: 'announcement',
    author: '墨云科技',
    status: 'draft', 
    viewCount: 0,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  { 
    id: 4, 
    title: 'Vue 3 + TypeScript 最佳实践指南', 
    category: 'tech',
    author: '前端团队',
    status: 'published', 
    viewCount: 4521,
    createdAt: '2023-12-25',
    updatedAt: '2023-12-28'
  },
  { 
    id: 5, 
    title: 'AI赋能智慧医疗的实践探索', 
    category: 'case',
    author: '项目团队',
    status: 'published', 
    viewCount: 1890,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-03'
  }
])

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 5
})

// 选中的文章
const selectedArticles = ref<number[]>([])

// 加载状态
const loading = ref(false)

/**
 * 过滤后的文章列表
 */
const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    const matchKeyword = !searchForm.keyword || 
      article.title.includes(searchForm.keyword)
    const matchCategory = !searchForm.category || 
      article.category === searchForm.category
    const matchStatus = !searchForm.status || 
      article.status === searchForm.status
    return matchKeyword && matchCategory && matchStatus
  })
})

/**
 * 获取分类名称
 */
function getCategoryName(value: string): string {
  const category = categories.find(c => c.value === value)
  return category ? category.label : value
}

/**
 * 获取状态样式
 */
function getStatusClass(status: string): string {
  return status === 'published' 
    ? 'bg-green-500/10 text-green-400' 
    : 'bg-yellow-500/10 text-yellow-400'
}

/**
 * 获取状态文本
 */
function getStatusText(status: string): string {
  return status === 'published' ? '已发布' : '草稿'
}

/**
 * 搜索
 */
function handleSearch(): void {
  pagination.current = 1
  // 实际项目中这里会调用API
}

/**
 * 重置搜索
 */
function handleReset(): void {
  searchForm.keyword = ''
  searchForm.category = ''
  searchForm.status = ''
  handleSearch()
}

/**
 * 新建文章
 */
function handleCreate(): void {
  router.push('/admin/articles/new')
}

/**
 * 编辑文章
 */
function handleEdit(id: number): void {
  router.push(`/admin/articles/edit/${id}`)
}

/**
 * 删除文章
 */
async function handleDelete(id: number): Promise<void> {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 实际项目中这里会调用API
    articles.value = articles.value.filter(a => a.id !== id)
    ElMessage.success('删除成功')
  } catch {
    // 用户取消
  }
}

/**
 * 批量删除
 */
async function handleBatchDelete(): Promise<void> {
  if (selectedArticles.value.length === 0) {
    ElMessage.warning('请选择要删除的文章')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedArticles.value.length} 篇文章吗？`, 
      '提示', 
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    articles.value = articles.value.filter(
      a => !selectedArticles.value.includes(a.id)
    )
    selectedArticles.value = []
    ElMessage.success('批量删除成功')
  } catch {
    // 用户取消
  }
}

/**
 * 切换选中状态
 */
function toggleSelect(id: number): void {
  const index = selectedArticles.value.indexOf(id)
  if (index > -1) {
    selectedArticles.value.splice(index, 1)
  } else {
    selectedArticles.value.push(id)
  }
}

/**
 * 全选/取消全选
 */
function toggleSelectAll(): void {
  if (selectedArticles.value.length === filteredArticles.value.length) {
    selectedArticles.value = []
  } else {
    selectedArticles.value = filteredArticles.value.map(a => a.id)
  }
}
</script>

<template>
  <div class="article-manage">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">文章管理</h1>
        <p class="text-mo-black-400 mt-1">管理网站的文章内容</p>
      </div>
      <button
        @click="handleCreate"
        class="px-4 py-2 bg-mo-cloud-600 text-white rounded-lg hover:bg-mo-cloud-500 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        新建文章
      </button>
    </div>
    
    <!-- 搜索栏 -->
    <div class="bg-mo-black-900/50 border border-white/5 rounded-xl p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <input
          v-model="searchForm.keyword"
          type="text"
          placeholder="搜索文章标题..."
          class="flex-1 min-w-[200px] px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-mo-black-500 focus:outline-none focus:border-mo-cloud-500"
        />
        <select
          v-model="searchForm.category"
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
        >
          <option v-for="cat in categories" :key="cat.value" :value="cat.value" class="bg-mo-black-900">
            {{ cat.label }}
          </option>
        </select>
        <select
          v-model="searchForm.status"
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mo-cloud-500"
        >
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value" class="bg-mo-black-900">
            {{ opt.label }}
          </option>
        </select>
        <button
          @click="handleSearch"
          class="px-4 py-2 bg-mo-cloud-600 text-white rounded-lg hover:bg-mo-cloud-500 transition-colors"
        >
          搜索
        </button>
        <button
          @click="handleReset"
          class="px-4 py-2 bg-white/5 text-mo-black-300 rounded-lg hover:bg-white/10 transition-colors"
        >
          重置
        </button>
      </div>
    </div>
    
    <!-- 批量操作 -->
    <div v-if="selectedArticles.length > 0" class="mb-4 flex items-center space-x-4">
      <span class="text-mo-black-400">已选择 {{ selectedArticles.length }} 项</span>
      <button
        @click="handleBatchDelete"
        class="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
      >
        批量删除
      </button>
    </div>
    
    <!-- 文章列表 -->
    <div class="bg-mo-black-900/50 border border-white/5 rounded-xl overflow-hidden">
      <!-- 表头 -->
      <div class="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 text-mo-black-400 text-sm font-medium">
        <div class="col-span-1">
          <input
            type="checkbox"
            :checked="selectedArticles.length === filteredArticles.length && filteredArticles.length > 0"
            @change="toggleSelectAll"
            class="w-4 h-4 rounded border-white/20 bg-white/5 text-mo-cloud-500"
          />
        </div>
        <div class="col-span-4">标题</div>
        <div class="col-span-1">分类</div>
        <div class="col-span-1">作者</div>
        <div class="col-span-1">状态</div>
        <div class="col-span-1">浏览</div>
        <div class="col-span-1">更新时间</div>
        <div class="col-span-2 text-right">操作</div>
      </div>
      
      <!-- 列表内容 -->
      <div class="divide-y divide-white/5">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors"
        >
          <div class="col-span-1">
            <input
              type="checkbox"
              :checked="selectedArticles.includes(article.id)"
              @change="toggleSelect(article.id)"
              class="w-4 h-4 rounded border-white/20 bg-white/5 text-mo-cloud-500"
            />
          </div>
          <div class="col-span-4">
            <p class="text-white font-medium truncate">{{ article.title }}</p>
          </div>
          <div class="col-span-1">
            <span class="text-mo-black-400 text-sm">{{ getCategoryName(article.category) }}</span>
          </div>
          <div class="col-span-1">
            <span class="text-mo-black-400 text-sm">{{ article.author }}</span>
          </div>
          <div class="col-span-1">
            <span 
              class="px-2 py-1 text-xs rounded-full"
              :class="getStatusClass(article.status)"
            >
              {{ getStatusText(article.status) }}
            </span>
          </div>
          <div class="col-span-1">
            <span class="text-mo-black-400 text-sm">{{ article.viewCount }}</span>
          </div>
          <div class="col-span-1">
            <span class="text-mo-black-500 text-sm">{{ article.updatedAt }}</span>
          </div>
          <div class="col-span-2 flex justify-end space-x-2">
            <button
              @click="handleEdit(article.id)"
              class="px-3 py-1.5 bg-mo-cloud-500/10 text-mo-cloud-400 rounded-lg hover:bg-mo-cloud-500/20 transition-colors text-sm"
            >
              编辑
            </button>
            <button
              @click="handleDelete(article.id)"
              class="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
            >
              删除
            </button>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredArticles.length === 0" class="py-12 text-center">
        <p class="text-mo-black-500">暂无文章数据</p>
      </div>
    </div>
    
    <!-- 分页 -->
    <div class="mt-6 flex items-center justify-between">
      <p class="text-mo-black-500 text-sm">
        共 {{ pagination.total }} 条记录
      </p>
      <div class="flex space-x-2">
        <button
          :disabled="pagination.current === 1"
          class="px-3 py-1.5 bg-white/5 text-mo-black-300 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一页
        </button>
        <button
          class="px-3 py-1.5 bg-mo-cloud-500/20 text-mo-cloud-400 rounded-lg"
        >
          1
        </button>
        <button
          :disabled="pagination.current * pagination.pageSize >= pagination.total"
          class="px-3 py-1.5 bg-white/5 text-mo-black-300 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 文章管理样式 */
</style>

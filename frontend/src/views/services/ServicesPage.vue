<script setup lang="ts">
/**
 * 服务与产品页面
 * 
 * @description 墨云科技服务介绍页面
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

const router = useRouter()

// 服务列表
const services = ref([
  {
    id: 'software',
    icon: 'code',
    title: '软件开发',
    subtitle: 'Software Development',
    description: '提供从需求分析、架构设计到开发部署的全流程软件开发服务，打造高质量的企业级应用。',
    features: [
      'Web应用开发 - 响应式网站、管理系统、电商平台',
      '移动端开发 - iOS、Android原生及跨平台应用',
      '系统集成 - 企业系统对接、数据迁移、API开发',
      '技术咨询 - 架构评审、技术选型、性能优化'
    ],
    technologies: ['Vue.js', 'React', 'Node.js', 'Python', 'Go', 'Java']
  },
  {
    id: 'ai',
    icon: 'brain',
    title: '人工智能',
    subtitle: 'Artificial Intelligence',
    description: '深耕AI技术研发，为企业提供智能化解决方案，助力业务创新与效率提升。',
    features: [
      '机器学习 - 预测分析、异常检测、推荐系统',
      '自然语言处理 - 智能客服、文本分析、知识图谱',
      '计算机视觉 - 图像识别、视频分析、OCR识别',
      'AI应用开发 - 定制化AI解决方案开发与部署'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face']
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: '云服务',
    subtitle: 'Cloud Services',
    description: '提供稳定可靠的云计算服务，帮助企业构建现代化的数字基础设施。',
    features: [
      '云架构设计 - 多云策略、混合云架构、成本优化',
      '容器化部署 - Docker、Kubernetes集群管理',
      'DevOps实践 - CI/CD流水线、自动化运维',
      '安全运维 - 安全审计、监控告警、灾备方案'
    ],
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform']
  },
  {
    id: 'data',
    icon: 'data',
    title: '数据服务',
    subtitle: 'Data Services',
    description: '专业的数据分析与处理服务，帮助企业挖掘数据价值，驱动业务决策。',
    features: [
      '数据分析 - 业务分析、用户行为分析、市场洞察',
      '数据可视化 - 仪表盘开发、报表系统、BI工具',
      '大数据处理 - 数据仓库、实时计算、ETL流程',
      '数据治理 - 数据质量、数据安全、合规管理'
    ],
    technologies: ['Spark', 'Flink', 'Elasticsearch', 'Tableau', 'Power BI']
  }
])

// 服务流程
const process = ref([
  { step: 1, title: '需求沟通', description: '深入了解业务需求，明确项目目标' },
  { step: 2, title: '方案设计', description: '制定技术方案，规划实施路径' },
  { step: 3, title: '开发实施', description: '敏捷开发，迭代交付' },
  { step: 4, title: '测试验收', description: '严格测试，确保质量' },
  { step: 5, title: '部署上线', description: '平稳上线，无缝切换' },
  { step: 6, title: '持续支持', description: '长期维护，持续优化' }
])

function navigateTo(path: string): void {
  router.push(path)
}
</script>

<template>
  <div class="services-page">
    <TheHeader />
    
    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground :particle-count="100" :speed="0.2" />
      <div class="absolute inset-0 bg-gradient-to-b from-mo-black-950 via-mo-black-950/95 to-mo-black-950"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span class="mo-gradient-text">服务与产品</span>
        </h1>
        <p class="text-lg md:text-xl text-mo-black-300 leading-relaxed">
          全方位的技术服务，助力企业数字化转型与创新发展
        </p>
      </div>
    </section>
    
    <!-- 服务详情 -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-24">
          <div 
            v-for="(service, index) in services" 
            :key="service.id"
            :id="service.id"
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
          >
            <!-- 内容 -->
            <div :class="{ 'lg:order-2': index % 2 === 1 }">
              <span class="text-mo-cloud-400 text-sm font-medium">{{ service.subtitle }}</span>
              <h2 class="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                {{ service.title }}
              </h2>
              <p class="text-mo-black-300 text-lg leading-relaxed mb-6">
                {{ service.description }}
              </p>
              
              <ul class="space-y-3 mb-6">
                <li 
                  v-for="feature in service.features" 
                  :key="feature"
                  class="flex items-start space-x-3"
                >
                  <svg class="w-5 h-5 text-mo-cloud-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-mo-black-200">{{ feature }}</span>
                </li>
              </ul>
              
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in service.technologies" 
                  :key="tech"
                  class="px-3 py-1 bg-white/5 text-mo-black-300 text-sm rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- 装饰 -->
            <div :class="{ 'lg:order-1': index % 2 === 1 }">
              <div class="aspect-square rounded-2xl bg-gradient-to-br from-mo-cloud-500/10 to-mo-purple-500/10 border border-white/5 p-8 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-mo-cloud-500 to-mo-purple-500 flex items-center justify-center">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <span class="text-2xl font-bold mo-gradient-text">{{ service.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 服务流程 -->
    <section class="py-20 bg-mo-black-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="mo-section-title">
            <span class="mo-gradient-text">服务流程</span>
          </h2>
          <p class="mo-section-subtitle">
            标准化的服务流程，确保项目高质量交付
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div 
            v-for="item in process" 
            :key="item.step"
            class="text-center p-4"
          >
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-mo-cloud-500 to-mo-purple-500 flex items-center justify-center text-white font-bold">
              {{ item.step }}
            </div>
            <h3 class="text-white font-semibold mb-1">{{ item.title }}</h3>
            <p class="text-mo-black-400 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA -->
    <section class="py-20 bg-mo-black-950">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          需要技术支持？
        </h2>
        <p class="text-mo-black-300 text-lg mb-8">
          告诉我们您的需求，我们将为您提供最适合的解决方案
        </p>
        <button 
          @click="navigateTo('/contact')"
          class="px-8 py-4 bg-gradient-to-r from-mo-cloud-600 to-mo-purple-600 text-white font-semibold rounded-lg hover:from-mo-cloud-500 hover:to-mo-purple-500 transition-all duration-300"
        >
          立即咨询
        </button>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
/* 服务页面样式 */
</style>

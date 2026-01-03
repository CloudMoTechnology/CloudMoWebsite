/**
 * TypeScript 类型定义文件
 * 
 * @description 墨云官网全局类型定义
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 类型分类：
 * - API 响应类型
 * - 业务实体类型
 * - 组件 Props 类型
 * - 状态管理类型
 */

// ============================================
// API 响应类型
// ============================================

/**
 * 通用 API 响应结构
 * @template T - 响应数据类型
 */
export interface ApiResponse<T = unknown> {
  /** 响应状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 请求时间戳 */
  timestamp: number
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 排序字段 */
  sortBy?: string
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc'
}

/**
 * 分页响应数据
 * @template T - 列表项类型
 */
export interface PaginatedData<T> {
  /** 数据列表 */
  list: T[]
  /** 总数量 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 总页数 */
  totalPages: number
}

// ============================================
// 业务实体类型
// ============================================

/**
 * 用户信息
 */
export interface User {
  /** 用户ID */
  id: number
  /** 用户名 */
  username: string
  /** 邮箱 */
  email: string
  /** 头像URL */
  avatar?: string
  /** 角色 */
  role: 'admin' | 'editor' | 'user'
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 文章/新闻
 */
export interface Article {
  /** 文章ID */
  id: number
  /** 标题 */
  title: string
  /** 摘要 */
  summary: string
  /** 内容（Markdown格式） */
  content: string
  /** 封面图URL */
  coverImage?: string
  /** 分类 */
  category: ArticleCategory
  /** 标签 */
  tags: string[]
  /** 作者 */
  author: string
  /** 浏览量 */
  viewCount: number
  /** 发布状态 */
  status: 'draft' | 'published' | 'archived'
  /** 是否置顶 */
  isPinned: boolean
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 发布时间 */
  publishedAt?: string
}

/**
 * 文章分类
 */
export type ArticleCategory = 'news' | 'tech' | 'announcement' | 'tutorial' | 'case'

/**
 * 技术文档
 */
export interface Document {
  /** 文档ID */
  id: number
  /** 标题 */
  title: string
  /** 内容（Markdown格式） */
  content: string
  /** 所属分类ID */
  categoryId: number
  /** 排序权重 */
  order: number
  /** 父文档ID（用于多级目录） */
  parentId?: number
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 文档分类
 */
export interface DocumentCategory {
  /** 分类ID */
  id: number
  /** 分类名称 */
  name: string
  /** 分类描述 */
  description?: string
  /** 图标 */
  icon?: string
  /** 排序权重 */
  order: number
}

/**
 * 服务/产品
 */
export interface Service {
  /** 服务ID */
  id: number
  /** 服务名称 */
  name: string
  /** 服务描述 */
  description: string
  /** 详细介绍 */
  details: string
  /** 图标 */
  icon: string
  /** 特性列表 */
  features: string[]
  /** 是否启用 */
  isActive: boolean
  /** 排序权重 */
  order: number
}

/**
 * 团队成员
 */
export interface TeamMember {
  /** 成员ID */
  id: number
  /** 姓名 */
  name: string
  /** 职位 */
  position: string
  /** 简介 */
  bio: string
  /** 头像URL */
  avatar: string
  /** 社交链接 */
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  /** 排序权重 */
  order: number
}

/**
 * 合作伙伴
 */
export interface Partner {
  /** 合作伙伴ID */
  id: number
  /** 名称 */
  name: string
  /** Logo URL */
  logo: string
  /** 官网链接 */
  website?: string
  /** 排序权重 */
  order: number
}

/**
 * 联系表单
 */
export interface ContactForm {
  /** 姓名 */
  name: string
  /** 邮箱 */
  email: string
  /** 公司/组织 */
  company?: string
  /** 电话 */
  phone?: string
  /** 主题 */
  subject: string
  /** 消息内容 */
  message: string
}

/**
 * 联系记录
 */
export interface ContactRecord extends ContactForm {
  /** 记录ID */
  id: number
  /** 状态 */
  status: 'pending' | 'processing' | 'resolved'
  /** 创建时间 */
  createdAt: string
  /** 处理时间 */
  processedAt?: string
  /** 处理备注 */
  notes?: string
}

// ============================================
// 网站配置类型
// ============================================

/**
 * 网站基础配置
 */
export interface SiteConfig {
  /** 网站名称 */
  siteName: string
  /** 网站描述 */
  siteDescription: string
  /** 网站关键词 */
  keywords: string[]
  /** Logo URL */
  logo: string
  /** Favicon URL */
  favicon: string
  /** 版权信息 */
  copyright: string
  /** ICP备案号 */
  icp?: string
  /** 公安备案号 */
  police?: string
}

/**
 * 社交媒体链接
 */
export interface SocialLinks {
  github?: string
  weibo?: string
  wechat?: string
  twitter?: string
  linkedin?: string
  email?: string
}

/**
 * 导航菜单项
 */
export interface NavMenuItem {
  /** 菜单ID */
  id: string
  /** 菜单名称 */
  name: string
  /** 路由路径 */
  path: string
  /** 图标 */
  icon?: string
  /** 子菜单 */
  children?: NavMenuItem[]
  /** 是否外部链接 */
  external?: boolean
  /** 是否需要登录 */
  requireAuth?: boolean
}

// ============================================
// 组件 Props 类型
// ============================================

/**
 * 粒子效果配置
 */
export interface ParticleConfig {
  /** 粒子数量 */
  count: number
  /** 粒子颜色 */
  color: string
  /** 粒子大小范围 */
  sizeRange: [number, number]
  /** 移动速度 */
  speed: number
  /** 是否启用连线 */
  enableLines: boolean
  /** 连线距离阈值 */
  lineDistance?: number
}

/**
 * 动画配置
 */
export interface AnimationConfig {
  /** 动画时长（毫秒） */
  duration: number
  /** 延迟时间（毫秒） */
  delay?: number
  /** 缓动函数 */
  easing?: string
  /** 是否循环 */
  loop?: boolean
}

// ============================================
// 状态管理类型
// ============================================

/**
 * 用户状态
 */
export interface UserState {
  /** 当前用户信息 */
  currentUser: User | null
  /** 是否已登录 */
  isLoggedIn: boolean
  /** 访问令牌 */
  token: string | null
  /** 刷新令牌 */
  refreshToken: string | null
}

/**
 * 应用状态
 */
export interface AppState {
  /** 是否加载中 */
  isLoading: boolean
  /** 侧边栏是否展开 */
  sidebarCollapsed: boolean
  /** 当前主题 */
  theme: 'dark' | 'light'
  /** 当前语言 */
  locale: 'zh-CN' | 'en-US'
}

// ============================================
// 工具类型
// ============================================

/**
 * 可选字段
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 必填字段
 */
export type Required<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] }

/**
 * 深度只读
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

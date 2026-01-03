/**
 * TypeScript 类型定义
 * 
 * @description 墨云科技后端类型定义
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Request } from 'express'

/**
 * JWT 载荷类型
 */
export interface JwtPayload {
  /** 用户ID */
  userId: string
  /** 用户名 */
  username: string
  /** 用户角色 */
  role: string
}

/**
 * 扩展的 Express Request 类型
 * 添加用户信息字段
 */
export interface AuthRequest extends Request {
  /** 当前登录用户信息 */
  user?: JwtPayload
}

/**
 * API 响应格式
 */
export interface ApiResponse<T = unknown> {
  /** 是否成功 */
  success: boolean
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data?: T
  /** 错误信息 */
  error?: string
}

/**
 * 分页参数
 */
export interface PaginationParams {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  /** 数据列表 */
  items: T[]
  /** 总数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 总页数 */
  totalPages: number
}

/**
 * 登录请求参数
 */
export interface LoginRequest {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  /** 访问令牌 */
  token: string
  /** 用户信息 */
  user: {
    id: string
    username: string
    email: string
    nickname?: string
    avatar?: string
    role: string
  }
}

/**
 * 文章创建/更新参数
 */
export interface ArticleInput {
  /** 标题 */
  title: string
  /** URL 别名 */
  slug?: string
  /** 摘要 */
  summary?: string
  /** 内容 */
  content: string
  /** 封面图 */
  coverImage?: string
  /** 分类 */
  category?: string
  /** 标签 */
  tags?: string[]
  /** 状态 */
  status?: 'draft' | 'published'
}

/**
 * 新闻创建/更新参数
 */
export interface NewsInput {
  /** 标题 */
  title: string
  /** URL 别名 */
  slug?: string
  /** 摘要 */
  summary?: string
  /** 内容 */
  content: string
  /** 封面图 */
  coverImage?: string
  /** 分类 */
  category?: string
  /** 状态 */
  status?: 'draft' | 'published'
}

/**
 * 文档创建/更新参数
 */
export interface DocInput {
  /** 标题 */
  title: string
  /** URL 别名 */
  slug?: string
  /** 摘要 */
  summary?: string
  /** 内容 */
  content: string
  /** 分类 */
  category?: string
  /** 父文档ID */
  parentId?: string
  /** 排序 */
  sortOrder?: number
  /** 状态 */
  status?: 'draft' | 'published'
}

/**
 * 联系表单参数
 */
export interface ContactInput {
  /** 姓名 */
  name: string
  /** 邮箱 */
  email: string
  /** 公司 */
  company?: string
  /** 电话 */
  phone?: string
  /** 主题 */
  subject: string
  /** 消息内容 */
  message: string
}

/**
 * 设置项
 */
export interface SettingInput {
  /** 键名 */
  key: string
  /** 值 */
  value: string
  /** 分组 */
  group?: string
}

/**
 * 文章 API 接口
 * 
 * @description 墨云官网文章/新闻相关 API
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 接口说明：
 * - getArticles: 获取文章列表
 * - getArticleById: 获取文章详情
 * - createArticle: 创建文章
 * - updateArticle: 更新文章
 * - deleteArticle: 删除文章
 */

import { get, post, put, del } from './request'
import type { ApiResponse, Article, PaginatedData, PaginationParams, ArticleCategory } from '@/types'

/**
 * 文章查询参数
 */
interface ArticleQueryParams extends PaginationParams {
  /** 分类筛选 */
  category?: ArticleCategory
  /** 标签筛选 */
  tag?: string
  /** 状态筛选 */
  status?: 'draft' | 'published' | 'archived'
  /** 关键词搜索 */
  keyword?: string
}

/**
 * 文章 API 对象
 * 包含所有文章相关的 API 方法
 */
export const articleApi = {
  /**
   * 获取文章列表
   * 
   * @description 分页获取文章列表，支持多种筛选条件
   * @param params - 查询参数
   * @returns Promise<ApiResponse<PaginatedData<Article>>> - 分页文章数据
   * 
   * @example
   * const response = await articleApi.getArticles({
   *   page: 1,
   *   pageSize: 10,
   *   category: 'news'
   * })
   */
  getArticles(params: ArticleQueryParams): Promise<ApiResponse<PaginatedData<Article>>> {
    return get<PaginatedData<Article>>('/articles', params as Record<string, unknown>)
  },
  
  /**
   * 获取文章详情
   * 
   * @description 根据文章 ID 获取完整的文章内容
   * @param id - 文章 ID
   * @returns Promise<ApiResponse<Article>> - 文章详情
   * 
   * @example
   * const response = await articleApi.getArticleById(1)
   * if (response.code === 200) {
   *   console.log('文章标题:', response.data.title)
   * }
   */
  getArticleById(id: number): Promise<ApiResponse<Article>> {
    return get<Article>(`/articles/${id}`)
  },
  
  /**
   * 创建文章
   * 
   * @description 创建新的文章（需要编辑权限）
   * @param articleData - 文章数据
   * @returns Promise<ApiResponse<Article>> - 创建的文章
   * 
   * @example
   * const response = await articleApi.createArticle({
   *   title: '新文章标题',
   *   content: '文章内容...',
   *   category: 'news',
   *   status: 'draft'
   * })
   */
  createArticle(articleData: Partial<Article>): Promise<ApiResponse<Article>> {
    return post<Article>('/articles', articleData as Record<string, unknown>)
  },
  
  /**
   * 更新文章
   * 
   * @description 更新现有文章（需要编辑权限）
   * @param id - 文章 ID
   * @param articleData - 要更新的文章数据
   * @returns Promise<ApiResponse<Article>> - 更新后的文章
   * 
   * @example
   * const response = await articleApi.updateArticle(1, {
   *   title: '更新后的标题',
   *   status: 'published'
   * })
   */
  updateArticle(id: number, articleData: Partial<Article>): Promise<ApiResponse<Article>> {
    return put<Article>(`/articles/${id}`, articleData as Record<string, unknown>)
  },
  
  /**
   * 删除文章
   * 
   * @description 删除指定文章（需要管理员权限）
   * @param id - 文章 ID
   * @returns Promise<ApiResponse<null>> - 删除响应
   * 
   * @example
   * const response = await articleApi.deleteArticle(1)
   * if (response.code === 200) {
   *   console.log('文章已删除')
   * }
   */
  deleteArticle(id: number): Promise<ApiResponse<null>> {
    return del<null>(`/articles/${id}`)
  },
  
  /**
   * 获取热门文章
   * 
   * @description 获取浏览量最高的文章列表
   * @param limit - 返回数量限制
   * @returns Promise<ApiResponse<Article[]>> - 热门文章列表
   */
  getHotArticles(limit: number = 5): Promise<ApiResponse<Article[]>> {
    return get<Article[]>('/articles/hot', { limit })
  },
  
  /**
   * 获取置顶文章
   * 
   * @description 获取所有置顶的文章
   * @returns Promise<ApiResponse<Article[]>> - 置顶文章列表
   */
  getPinnedArticles(): Promise<ApiResponse<Article[]>> {
    return get<Article[]>('/articles/pinned')
  },
  
  /**
   * 增加文章浏览量
   * 
   * @description 记录文章被浏览，增加浏览计数
   * @param id - 文章 ID
   * @returns Promise<ApiResponse<null>> - 响应
   */
  incrementViewCount(id: number): Promise<ApiResponse<null>> {
    return post<null>(`/articles/${id}/view`)
  }
}

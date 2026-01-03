/**
 * 文章控制器
 * 
 * @description 文章管理相关接口
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Request, Response } from 'express'
import prisma from '../config/database'
import { 
  successResponse, 
  errorResponse,
  generateSlug,
  parsePagination,
  calculatePagination,
  safeJsonParse
} from '../utils'
import type { AuthRequest, ArticleInput } from '../types'

/**
 * 获取文章列表（公开）
 * 
 * @route GET /api/articles
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function getArticles(req: Request, res: Response): Promise<void> {
  try {
    const { page, pageSize, skip } = parsePagination(
      req.query.page as string,
      req.query.pageSize as string
    )
    const { category, keyword } = req.query
    
    // 构建查询条件
    const where: Record<string, unknown> = {
      status: 'published'
    }
    
    if (category) {
      where.category = category
    }
    
    if (keyword) {
      where.OR = [
        { title: { contains: keyword as string } },
        { summary: { contains: keyword as string } }
      ]
    }
    
    // 查询文章
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          coverImage: true,
          category: true,
          tags: true,
          viewCount: true,
          publishedAt: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              username: true,
              nickname: true
            }
          }
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: pageSize
      }),
      prisma.article.count({ where })
    ])
    
    // 处理标签
    const processedArticles = articles.map(article => ({
      ...article,
      tags: safeJsonParse<string[]>(article.tags, [])
    }))
    
    res.json(successResponse({
      items: processedArticles,
      ...calculatePagination(total, page, pageSize)
    }))
  } catch (error) {
    console.error('获取文章列表错误:', error)
    res.status(500).json(errorResponse('获取文章列表失败'))
  }
}

/**
 * 获取文章详情（公开）
 * 
 * @route GET /api/articles/:id
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function getArticleById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    // 查询文章
    const article = await prisma.article.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ],
        status: 'published'
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            nickname: true,
            avatar: true
          }
        }
      }
    })
    
    if (!article) {
      res.status(404).json(errorResponse('文章不存在'))
      return
    }
    
    // 增加浏览量
    await prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } }
    })
    
    // 处理标签
    const processedArticle = {
      ...article,
      tags: safeJsonParse<string[]>(article.tags, [])
    }
    
    res.json(successResponse(processedArticle))
  } catch (error) {
    console.error('获取文章详情错误:', error)
    res.status(500).json(errorResponse('获取文章详情失败'))
  }
}

/**
 * 获取所有文章（管理员）
 * 
 * @route GET /api/admin/articles
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function getAllArticles(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { page, pageSize, skip } = parsePagination(
      req.query.page as string,
      req.query.pageSize as string
    )
    const { category, status, keyword } = req.query
    
    // 构建查询条件
    const where: Record<string, unknown> = {}
    
    if (category) {
      where.category = category
    }
    
    if (status) {
      where.status = status
    }
    
    if (keyword) {
      where.OR = [
        { title: { contains: keyword as string } },
        { summary: { contains: keyword as string } }
      ]
    }
    
    // 查询文章
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              nickname: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize
      }),
      prisma.article.count({ where })
    ])
    
    // 处理标签
    const processedArticles = articles.map(article => ({
      ...article,
      tags: safeJsonParse<string[]>(article.tags, [])
    }))
    
    res.json(successResponse({
      items: processedArticles,
      ...calculatePagination(total, page, pageSize)
    }))
  } catch (error) {
    console.error('获取文章列表错误:', error)
    res.status(500).json(errorResponse('获取文章列表失败'))
  }
}

/**
 * 创建文章（管理员）
 * 
 * @route POST /api/admin/articles
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function createArticle(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json(errorResponse('未登录'))
      return
    }
    
    const input = req.body as ArticleInput
    
    // 验证输入
    if (!input.title || !input.content) {
      res.status(400).json(errorResponse('标题和内容不能为空'))
      return
    }
    
    // 生成 slug
    const slug = input.slug || generateSlug(input.title) + '-' + Date.now()
    
    // 检查 slug 是否已存在
    const existing = await prisma.article.findUnique({ where: { slug } })
    if (existing) {
      res.status(400).json(errorResponse('URL别名已存在'))
      return
    }
    
    // 创建文章
    const article = await prisma.article.create({
      data: {
        title: input.title,
        slug,
        summary: input.summary,
        content: input.content,
        coverImage: input.coverImage,
        category: input.category || 'tech',
        tags: input.tags ? JSON.stringify(input.tags) : null,
        status: input.status || 'draft',
        authorId: req.user.userId,
        publishedAt: input.status === 'published' ? new Date() : null
      }
    })
    
    res.status(201).json(successResponse(article, '文章创建成功'))
  } catch (error) {
    console.error('创建文章错误:', error)
    res.status(500).json(errorResponse('创建文章失败'))
  }
}

/**
 * 更新文章（管理员）
 * 
 * @route PUT /api/admin/articles/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function updateArticle(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const input = req.body as ArticleInput
    
    // 查找文章
    const article = await prisma.article.findUnique({ where: { id } })
    if (!article) {
      res.status(404).json(errorResponse('文章不存在'))
      return
    }
    
    // 检查 slug 是否冲突
    if (input.slug && input.slug !== article.slug) {
      const existing = await prisma.article.findUnique({ where: { slug: input.slug } })
      if (existing) {
        res.status(400).json(errorResponse('URL别名已存在'))
        return
      }
    }
    
    // 更新文章
    const updated = await prisma.article.update({
      where: { id },
      data: {
        title: input.title,
        slug: input.slug,
        summary: input.summary,
        content: input.content,
        coverImage: input.coverImage,
        category: input.category,
        tags: input.tags ? JSON.stringify(input.tags) : article.tags,
        status: input.status,
        publishedAt: input.status === 'published' && !article.publishedAt 
          ? new Date() 
          : article.publishedAt
      }
    })
    
    res.json(successResponse(updated, '文章更新成功'))
  } catch (error) {
    console.error('更新文章错误:', error)
    res.status(500).json(errorResponse('更新文章失败'))
  }
}

/**
 * 删除文章（管理员）
 * 
 * @route DELETE /api/admin/articles/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function deleteArticle(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    // 查找文章
    const article = await prisma.article.findUnique({ where: { id } })
    if (!article) {
      res.status(404).json(errorResponse('文章不存在'))
      return
    }
    
    // 删除文章
    await prisma.article.delete({ where: { id } })
    
    res.json(successResponse(null, '文章删除成功'))
  } catch (error) {
    console.error('删除文章错误:', error)
    res.status(500).json(errorResponse('删除文章失败'))
  }
}

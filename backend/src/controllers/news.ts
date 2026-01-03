/**
 * 新闻控制器
 * 
 * @description 新闻管理相关接口
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
  calculatePagination
} from '../utils'
import type { AuthRequest, NewsInput } from '../types'

/**
 * 获取新闻列表（公开）
 * 
 * @route GET /api/news
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function getNewsList(req: Request, res: Response): Promise<void> {
  try {
    const { page, pageSize, skip } = parsePagination(
      req.query.page as string,
      req.query.pageSize as string
    )
    const { category } = req.query
    
    // 构建查询条件
    const where: Record<string, unknown> = {
      status: 'published'
    }
    
    if (category) {
      where.category = category
    }
    
    // 查询新闻
    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          coverImage: true,
          category: true,
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
      prisma.news.count({ where })
    ])
    
    res.json(successResponse({
      items: news,
      ...calculatePagination(total, page, pageSize)
    }))
  } catch (error) {
    console.error('获取新闻列表错误:', error)
    res.status(500).json(errorResponse('获取新闻列表失败'))
  }
}

/**
 * 获取新闻详情（公开）
 * 
 * @route GET /api/news/:id
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function getNewsById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    // 查询新闻
    const news = await prisma.news.findFirst({
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
    
    if (!news) {
      res.status(404).json(errorResponse('新闻不存在'))
      return
    }
    
    // 增加浏览量
    await prisma.news.update({
      where: { id: news.id },
      data: { viewCount: { increment: 1 } }
    })
    
    res.json(successResponse(news))
  } catch (error) {
    console.error('获取新闻详情错误:', error)
    res.status(500).json(errorResponse('获取新闻详情失败'))
  }
}

/**
 * 获取所有新闻（管理员）
 * 
 * @route GET /api/admin/news
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function getAllNews(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { page, pageSize, skip } = parsePagination(
      req.query.page as string,
      req.query.pageSize as string
    )
    const { category, status } = req.query
    
    // 构建查询条件
    const where: Record<string, unknown> = {}
    
    if (category) {
      where.category = category
    }
    
    if (status) {
      where.status = status
    }
    
    // 查询新闻
    const [news, total] = await Promise.all([
      prisma.news.findMany({
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
      prisma.news.count({ where })
    ])
    
    res.json(successResponse({
      items: news,
      ...calculatePagination(total, page, pageSize)
    }))
  } catch (error) {
    console.error('获取新闻列表错误:', error)
    res.status(500).json(errorResponse('获取新闻列表失败'))
  }
}

/**
 * 创建新闻（管理员）
 * 
 * @route POST /api/admin/news
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function createNews(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json(errorResponse('未登录'))
      return
    }
    
    const input = req.body as NewsInput
    
    // 验证输入
    if (!input.title || !input.content) {
      res.status(400).json(errorResponse('标题和内容不能为空'))
      return
    }
    
    // 生成 slug
    const slug = input.slug || generateSlug(input.title) + '-' + Date.now()
    
    // 检查 slug 是否已存在
    const existing = await prisma.news.findUnique({ where: { slug } })
    if (existing) {
      res.status(400).json(errorResponse('URL别名已存在'))
      return
    }
    
    // 创建新闻
    const news = await prisma.news.create({
      data: {
        title: input.title,
        slug,
        summary: input.summary,
        content: input.content,
        coverImage: input.coverImage,
        category: input.category || 'news',
        status: input.status || 'draft',
        authorId: req.user.userId,
        publishedAt: input.status === 'published' ? new Date() : null
      }
    })
    
    res.status(201).json(successResponse(news, '新闻创建成功'))
  } catch (error) {
    console.error('创建新闻错误:', error)
    res.status(500).json(errorResponse('创建新闻失败'))
  }
}

/**
 * 更新新闻（管理员）
 * 
 * @route PUT /api/admin/news/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function updateNews(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const input = req.body as NewsInput
    
    // 查找新闻
    const news = await prisma.news.findUnique({ where: { id } })
    if (!news) {
      res.status(404).json(errorResponse('新闻不存在'))
      return
    }
    
    // 检查 slug 是否冲突
    if (input.slug && input.slug !== news.slug) {
      const existing = await prisma.news.findUnique({ where: { slug: input.slug } })
      if (existing) {
        res.status(400).json(errorResponse('URL别名已存在'))
        return
      }
    }
    
    // 更新新闻
    const updated = await prisma.news.update({
      where: { id },
      data: {
        title: input.title,
        slug: input.slug,
        summary: input.summary,
        content: input.content,
        coverImage: input.coverImage,
        category: input.category,
        status: input.status,
        publishedAt: input.status === 'published' && !news.publishedAt 
          ? new Date() 
          : news.publishedAt
      }
    })
    
    res.json(successResponse(updated, '新闻更新成功'))
  } catch (error) {
    console.error('更新新闻错误:', error)
    res.status(500).json(errorResponse('更新新闻失败'))
  }
}

/**
 * 删除新闻（管理员）
 * 
 * @route DELETE /api/admin/news/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function deleteNews(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    // 查找新闻
    const news = await prisma.news.findUnique({ where: { id } })
    if (!news) {
      res.status(404).json(errorResponse('新闻不存在'))
      return
    }
    
    // 删除新闻
    await prisma.news.delete({ where: { id } })
    
    res.json(successResponse(null, '新闻删除成功'))
  } catch (error) {
    console.error('删除新闻错误:', error)
    res.status(500).json(errorResponse('删除新闻失败'))
  }
}

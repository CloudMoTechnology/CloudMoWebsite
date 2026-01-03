/**
 * 文档控制器
 * 
 * @description 技术文档管理相关接口
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
import type { AuthRequest, DocInput } from '../types'

/**
 * 获取文档列表（公开）
 * 
 * @route GET /api/docs
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function getDocs(req: Request, res: Response): Promise<void> {
  try {
    const { category } = req.query
    
    // 构建查询条件
    const where: Record<string, unknown> = {
      status: 'published'
    }
    
    if (category) {
      where.category = category
    }
    
    // 查询文档（树形结构）
    const docs = await prisma.doc.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        category: true,
        parentId: true,
        sortOrder: true,
        viewCount: true,
        createdAt: true
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    
    res.json(successResponse(docs))
  } catch (error) {
    console.error('获取文档列表错误:', error)
    res.status(500).json(errorResponse('获取文档列表失败'))
  }
}

/**
 * 获取文档详情（公开）
 * 
 * @route GET /api/docs/:id
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function getDocById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    // 查询文档
    const doc = await prisma.doc.findFirst({
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
            nickname: true
          }
        }
      }
    })
    
    if (!doc) {
      res.status(404).json(errorResponse('文档不存在'))
      return
    }
    
    // 增加浏览量
    await prisma.doc.update({
      where: { id: doc.id },
      data: { viewCount: { increment: 1 } }
    })
    
    res.json(successResponse(doc))
  } catch (error) {
    console.error('获取文档详情错误:', error)
    res.status(500).json(errorResponse('获取文档详情失败'))
  }
}

/**
 * 获取所有文档（管理员）
 * 
 * @route GET /api/admin/docs
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function getAllDocs(req: AuthRequest, res: Response): Promise<void> {
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
    
    // 查询文档
    const [docs, total] = await Promise.all([
      prisma.doc.findMany({
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
        orderBy: [
          { sortOrder: 'asc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: pageSize
      }),
      prisma.doc.count({ where })
    ])
    
    res.json(successResponse({
      items: docs,
      ...calculatePagination(total, page, pageSize)
    }))
  } catch (error) {
    console.error('获取文档列表错误:', error)
    res.status(500).json(errorResponse('获取文档列表失败'))
  }
}

/**
 * 创建文档（管理员）
 * 
 * @route POST /api/admin/docs
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function createDoc(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json(errorResponse('未登录'))
      return
    }
    
    const input = req.body as DocInput
    
    // 验证输入
    if (!input.title || !input.content) {
      res.status(400).json(errorResponse('标题和内容不能为空'))
      return
    }
    
    // 生成 slug
    const slug = input.slug || generateSlug(input.title) + '-' + Date.now()
    
    // 检查 slug 是否已存在
    const existing = await prisma.doc.findUnique({ where: { slug } })
    if (existing) {
      res.status(400).json(errorResponse('URL别名已存在'))
      return
    }
    
    // 创建文档
    const doc = await prisma.doc.create({
      data: {
        title: input.title,
        slug,
        summary: input.summary,
        content: input.content,
        category: input.category || 'guide',
        parentId: input.parentId,
        sortOrder: input.sortOrder || 0,
        status: input.status || 'draft',
        authorId: req.user.userId,
        publishedAt: input.status === 'published' ? new Date() : null
      }
    })
    
    res.status(201).json(successResponse(doc, '文档创建成功'))
  } catch (error) {
    console.error('创建文档错误:', error)
    res.status(500).json(errorResponse('创建文档失败'))
  }
}

/**
 * 更新文档（管理员）
 * 
 * @route PUT /api/admin/docs/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function updateDoc(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const input = req.body as DocInput
    
    // 查找文档
    const doc = await prisma.doc.findUnique({ where: { id } })
    if (!doc) {
      res.status(404).json(errorResponse('文档不存在'))
      return
    }
    
    // 检查 slug 是否冲突
    if (input.slug && input.slug !== doc.slug) {
      const existing = await prisma.doc.findUnique({ where: { slug: input.slug } })
      if (existing) {
        res.status(400).json(errorResponse('URL别名已存在'))
        return
      }
    }
    
    // 更新文档
    const updated = await prisma.doc.update({
      where: { id },
      data: {
        title: input.title,
        slug: input.slug,
        summary: input.summary,
        content: input.content,
        category: input.category,
        parentId: input.parentId,
        sortOrder: input.sortOrder,
        status: input.status,
        publishedAt: input.status === 'published' && !doc.publishedAt 
          ? new Date() 
          : doc.publishedAt
      }
    })
    
    res.json(successResponse(updated, '文档更新成功'))
  } catch (error) {
    console.error('更新文档错误:', error)
    res.status(500).json(errorResponse('更新文档失败'))
  }
}

/**
 * 删除文档（管理员）
 * 
 * @route DELETE /api/admin/docs/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function deleteDoc(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    // 查找文档
    const doc = await prisma.doc.findUnique({ where: { id } })
    if (!doc) {
      res.status(404).json(errorResponse('文档不存在'))
      return
    }
    
    // 删除文档
    await prisma.doc.delete({ where: { id } })
    
    res.json(successResponse(null, '文档删除成功'))
  } catch (error) {
    console.error('删除文档错误:', error)
    res.status(500).json(errorResponse('删除文档失败'))
  }
}

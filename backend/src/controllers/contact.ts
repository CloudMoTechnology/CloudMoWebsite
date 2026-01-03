/**
 * 联系表单控制器
 * 
 * @description 联系表单相关接口
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Request, Response } from 'express'
import prisma from '../config/database'
import { 
  successResponse, 
  errorResponse,
  parsePagination,
  calculatePagination
} from '../utils'
import type { AuthRequest, ContactInput } from '../types'

/**
 * 提交联系表单（公开）
 * 
 * @route POST /api/contact
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const input = req.body as ContactInput
    
    // 验证输入
    if (!input.name || !input.email || !input.subject || !input.message) {
      res.status(400).json(errorResponse('请填写完整信息'))
      return
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(input.email)) {
      res.status(400).json(errorResponse('邮箱格式不正确'))
      return
    }
    
    // 创建联系记录
    const contact = await prisma.contact.create({
      data: {
        name: input.name,
        email: input.email,
        company: input.company,
        phone: input.phone,
        subject: input.subject,
        message: input.message,
        status: 'pending'
      }
    })
    
    res.status(201).json(successResponse(
      { id: contact.id },
      '提交成功，我们会尽快与您联系'
    ))
  } catch (error) {
    console.error('提交联系表单错误:', error)
    res.status(500).json(errorResponse('提交失败，请稍后重试'))
  }
}

/**
 * 获取联系记录列表（管理员）
 * 
 * @route GET /api/admin/contacts
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function getContacts(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { page, pageSize, skip } = parsePagination(
      req.query.page as string,
      req.query.pageSize as string
    )
    const { status } = req.query
    
    // 构建查询条件
    const where: Record<string, unknown> = {}
    
    if (status) {
      where.status = status
    }
    
    // 查询联系记录
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize
      }),
      prisma.contact.count({ where })
    ])
    
    res.json(successResponse({
      items: contacts,
      ...calculatePagination(total, page, pageSize)
    }))
  } catch (error) {
    console.error('获取联系记录错误:', error)
    res.status(500).json(errorResponse('获取联系记录失败'))
  }
}

/**
 * 获取联系记录详情（管理员）
 * 
 * @route GET /api/admin/contacts/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function getContactById(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    const contact = await prisma.contact.findUnique({ where: { id } })
    
    if (!contact) {
      res.status(404).json(errorResponse('记录不存在'))
      return
    }
    
    res.json(successResponse(contact))
  } catch (error) {
    console.error('获取联系记录详情错误:', error)
    res.status(500).json(errorResponse('获取记录详情失败'))
  }
}

/**
 * 更新联系记录状态（管理员）
 * 
 * @route PUT /api/admin/contacts/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function updateContactStatus(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const { status } = req.body
    
    // 验证状态值
    const validStatuses = ['pending', 'processing', 'replied', 'closed']
    if (!validStatuses.includes(status)) {
      res.status(400).json(errorResponse('无效的状态值'))
      return
    }
    
    // 查找记录
    const contact = await prisma.contact.findUnique({ where: { id } })
    if (!contact) {
      res.status(404).json(errorResponse('记录不存在'))
      return
    }
    
    // 更新状态
    const updated = await prisma.contact.update({
      where: { id },
      data: {
        status,
        repliedAt: status === 'replied' ? new Date() : contact.repliedAt
      }
    })
    
    res.json(successResponse(updated, '状态更新成功'))
  } catch (error) {
    console.error('更新联系记录状态错误:', error)
    res.status(500).json(errorResponse('更新状态失败'))
  }
}

/**
 * 删除联系记录（管理员）
 * 
 * @route DELETE /api/admin/contacts/:id
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function deleteContact(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    
    // 查找记录
    const contact = await prisma.contact.findUnique({ where: { id } })
    if (!contact) {
      res.status(404).json(errorResponse('记录不存在'))
      return
    }
    
    // 删除记录
    await prisma.contact.delete({ where: { id } })
    
    res.json(successResponse(null, '删除成功'))
  } catch (error) {
    console.error('删除联系记录错误:', error)
    res.status(500).json(errorResponse('删除失败'))
  }
}

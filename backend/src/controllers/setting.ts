/**
 * 设置控制器
 * 
 * @description 网站设置相关接口
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Request, Response } from 'express'
import prisma from '../config/database'
import { successResponse, errorResponse } from '../utils'
import type { AuthRequest, SettingInput } from '../types'

/**
 * 获取公开设置（公开）
 * 
 * @route GET /api/settings
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function getPublicSettings(_req: Request, res: Response): Promise<void> {
  try {
    // 获取公开的设置项
    const settings = await prisma.setting.findMany({
      where: {
        group: {
          in: ['general', 'seo']
        }
      }
    })
    
    // 转换为键值对格式
    const settingsMap: Record<string, string> = {}
    settings.forEach(s => {
      settingsMap[s.key] = s.value
    })
    
    res.json(successResponse(settingsMap))
  } catch (error) {
    console.error('获取设置错误:', error)
    res.status(500).json(errorResponse('获取设置失败'))
  }
}

/**
 * 获取所有设置（管理员）
 * 
 * @route GET /api/admin/settings
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function getAllSettings(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { group } = req.query
    
    // 构建查询条件
    const where: Record<string, unknown> = {}
    if (group) {
      where.group = group
    }
    
    // 获取设置
    const settings = await prisma.setting.findMany({
      where,
      orderBy: { group: 'asc' }
    })
    
    // 按分组整理
    const grouped: Record<string, Record<string, string>> = {}
    settings.forEach(s => {
      if (!grouped[s.group]) {
        grouped[s.group] = {}
      }
      grouped[s.group][s.key] = s.value
    })
    
    res.json(successResponse(grouped))
  } catch (error) {
    console.error('获取设置错误:', error)
    res.status(500).json(errorResponse('获取设置失败'))
  }
}

/**
 * 更新设置（管理员）
 * 
 * @route PUT /api/admin/settings
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function updateSettings(req: AuthRequest, res: Response): Promise<void> {
  try {
    const settings = req.body as SettingInput[]
    
    // 验证输入
    if (!Array.isArray(settings)) {
      res.status(400).json(errorResponse('无效的设置数据'))
      return
    }
    
    // 批量更新设置
    const operations = settings.map(setting => {
      return prisma.setting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: {
          key: setting.key,
          value: setting.value,
          group: setting.group || 'general'
        }
      })
    })
    
    await prisma.$transaction(operations)
    
    res.json(successResponse(null, '设置保存成功'))
  } catch (error) {
    console.error('更新设置错误:', error)
    res.status(500).json(errorResponse('保存设置失败'))
  }
}

/**
 * 删除设置项（管理员）
 * 
 * @route DELETE /api/admin/settings/:key
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function deleteSetting(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { key } = req.params
    
    // 查找设置
    const setting = await prisma.setting.findUnique({ where: { key } })
    if (!setting) {
      res.status(404).json(errorResponse('设置项不存在'))
      return
    }
    
    // 删除设置
    await prisma.setting.delete({ where: { key } })
    
    res.json(successResponse(null, '删除成功'))
  } catch (error) {
    console.error('删除设置错误:', error)
    res.status(500).json(errorResponse('删除失败'))
  }
}

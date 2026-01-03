/**
 * 认证控制器
 * 
 * @description 用户认证相关接口
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Request, Response } from 'express'
import prisma from '../config/database'
import { 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  successResponse, 
  errorResponse 
} from '../utils'
import type { AuthRequest, LoginRequest, LoginResponse } from '../types'

/**
 * 用户登录
 * 
 * @route POST /api/auth/login
 * @param req - 请求对象，包含用户名和密码
 * @param res - 响应对象
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body as LoginRequest
    
    // 验证输入
    if (!username || !password) {
      res.status(400).json(errorResponse('请输入用户名和密码'))
      return
    }
    
    // 查找用户
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username }
        ]
      }
    })
    
    // 用户不存在
    if (!user) {
      res.status(401).json(errorResponse('用户名或密码错误'))
      return
    }
    
    // 检查用户状态
    if (user.status !== 1) {
      res.status(403).json(errorResponse('账户已被禁用'))
      return
    }
    
    // 验证密码
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      res.status(401).json(errorResponse('用户名或密码错误'))
      return
    }
    
    // 生成 Token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    })
    
    // 返回登录信息
    const responseData: LoginResponse = {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nickname: user.nickname || undefined,
        avatar: user.avatar || undefined,
        role: user.role
      }
    }
    
    res.json(successResponse(responseData, '登录成功'))
  } catch (error) {
    console.error('登录错误:', error)
    res.status(500).json(errorResponse('登录失败'))
  }
}

/**
 * 获取当前用户信息
 * 
 * @route GET /api/auth/me
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function getCurrentUser(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json(errorResponse('未登录'))
      return
    }
    
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        username: true,
        email: true,
        nickname: true,
        avatar: true,
        role: true,
        createdAt: true
      }
    })
    
    if (!user) {
      res.status(404).json(errorResponse('用户不存在'))
      return
    }
    
    res.json(successResponse(user))
  } catch (error) {
    console.error('获取用户信息错误:', error)
    res.status(500).json(errorResponse('获取用户信息失败'))
  }
}

/**
 * 修改密码
 * 
 * @route PUT /api/auth/password
 * @param req - 请求对象（需要认证）
 * @param res - 响应对象
 */
export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json(errorResponse('未登录'))
      return
    }
    
    const { oldPassword, newPassword } = req.body
    
    // 验证输入
    if (!oldPassword || !newPassword) {
      res.status(400).json(errorResponse('请输入原密码和新密码'))
      return
    }
    
    if (newPassword.length < 6) {
      res.status(400).json(errorResponse('新密码长度不能少于6位'))
      return
    }
    
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    })
    
    if (!user) {
      res.status(404).json(errorResponse('用户不存在'))
      return
    }
    
    // 验证原密码
    const isValid = await verifyPassword(oldPassword, user.password)
    if (!isValid) {
      res.status(400).json(errorResponse('原密码错误'))
      return
    }
    
    // 更新密码
    const hashedPassword = await hashPassword(newPassword)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })
    
    res.json(successResponse(null, '密码修改成功'))
  } catch (error) {
    console.error('修改密码错误:', error)
    res.status(500).json(errorResponse('修改密码失败'))
  }
}

/**
 * 退出登录
 * 
 * @route POST /api/auth/logout
 * @param req - 请求对象
 * @param res - 响应对象
 */
export async function logout(_req: Request, res: Response): Promise<void> {
  // JWT 是无状态的，客户端删除 Token 即可
  res.json(successResponse(null, '退出成功'))
}

/**
 * 认证中间件
 * 
 * @description JWT 认证验证中间件
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Response, NextFunction } from 'express'
import { verifyToken, errorResponse } from '../utils'
import type { AuthRequest } from '../types'

/**
 * JWT 认证中间件
 * 验证请求头中的 Authorization Token
 * 
 * @param req - Express 请求对象
 * @param res - Express 响应对象
 * @param next - 下一个中间件
 */
export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  // 获取 Authorization 头
  const authHeader = req.headers.authorization
  
  // 检查是否存在 Authorization 头
  if (!authHeader) {
    res.status(401).json(errorResponse('未提供认证令牌'))
    return
  }
  
  // 检查 Token 格式
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json(errorResponse('认证令牌格式错误'))
    return
  }
  
  const token = parts[1]
  
  // 验证 Token
  const payload = verifyToken(token)
  if (!payload) {
    res.status(401).json(errorResponse('认证令牌无效或已过期'))
    return
  }
  
  // 将用户信息附加到请求对象
  req.user = payload
  
  next()
}

/**
 * 可选认证中间件
 * 如果提供了 Token 则验证，否则继续执行
 * 
 * @param req - Express 请求对象
 * @param res - Express 响应对象
 * @param next - 下一个中间件
 */
export function optionalAuthMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization
  
  if (authHeader) {
    const parts = authHeader.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      const payload = verifyToken(parts[1])
      if (payload) {
        req.user = payload
      }
    }
  }
  
  next()
}

/**
 * 角色验证中间件工厂
 * 创建一个验证用户角色的中间件
 * 
 * @param roles - 允许的角色列表
 * @returns 角色验证中间件
 */
export function roleMiddleware(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    // 检查用户是否已认证
    if (!req.user) {
      res.status(401).json(errorResponse('请先登录'))
      return
    }
    
    // 检查用户角色
    if (!roles.includes(req.user.role)) {
      res.status(403).json(errorResponse('权限不足'))
      return
    }
    
    next()
  }
}

export default authMiddleware

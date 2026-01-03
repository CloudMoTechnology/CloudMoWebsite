/**
 * 错误处理中间件
 * 
 * @description 全局错误处理
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils'
import { config } from '../config'

/**
 * 自定义应用错误类
 */
export class AppError extends Error {
  /** HTTP 状态码 */
  statusCode: number
  /** 是否为操作性错误 */
  isOperational: boolean
  
  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * 404 错误处理中间件
 * 处理未匹配的路由
 * 
 * @param req - Express 请求对象
 * @param res - Express 响应对象
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json(
    errorResponse(`路由未找到: ${req.method} ${req.originalUrl}`)
  )
}

/**
 * 全局错误处理中间件
 * 处理所有未捕获的错误
 * 
 * @param err - 错误对象
 * @param req - Express 请求对象
 * @param res - Express 响应对象
 * @param _next - 下一个中间件
 */
export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 记录错误日志
  console.error('❌ 错误:', err)
  
  // 确定状态码
  const statusCode = 'statusCode' in err ? err.statusCode : 500
  
  // 构建错误响应
  const response = errorResponse(
    err.message || '服务器内部错误',
    config.server.isProduction ? undefined : err.stack
  )
  
  res.status(statusCode).json(response)
}

/**
 * 异步路由包装器
 * 自动捕获异步路由中的错误
 * 
 * @param fn - 异步路由处理函数
 * @returns 包装后的路由处理函数
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export default errorHandler

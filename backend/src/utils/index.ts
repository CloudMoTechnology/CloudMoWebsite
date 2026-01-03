/**
 * 工具函数模块
 * 
 * @description 墨云科技后端通用工具函数
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../config'
import type { JwtPayload, ApiResponse } from '../types'

/**
 * 密码加密
 * 
 * @param password - 原始密码
 * @returns 加密后的密码哈希
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * 验证密码
 * 
 * @param password - 原始密码
 * @param hash - 密码哈希
 * @returns 是否匹配
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * 生成 JWT Token
 * 
 * @param payload - Token 载荷
 * @returns JWT Token 字符串
 */
export function generateToken(payload: JwtPayload): string {
  // expiresIn 支持字符串格式如 '7d', '24h', '60m' 等
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  } as SignOptions)
}

/**
 * 验证 JWT Token
 * 
 * @param token - JWT Token 字符串
 * @returns 解码后的载荷或 null
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, config.jwt.secret) as JwtPayload
  } catch {
    return null
  }
}

/**
 * 生成 UUID
 * 
 * @returns UUID 字符串
 */
export function generateUUID(): string {
  return uuidv4()
}

/**
 * 生成 URL 友好的 slug
 * 
 * @param text - 原始文本
 * @returns slug 字符串
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * 创建成功响应
 * 
 * @param data - 响应数据
 * @param message - 响应消息
 * @returns API 响应对象
 */
export function successResponse<T>(data?: T, message = '操作成功'): ApiResponse<T> {
  return {
    success: true,
    message,
    data
  }
}

/**
 * 创建错误响应
 * 
 * @param message - 错误消息
 * @param error - 错误详情
 * @returns API 响应对象
 */
export function errorResponse(message = '操作失败', error?: string): ApiResponse {
  return {
    success: false,
    message,
    error
  }
}

/**
 * 解析分页参数
 * 
 * @param page - 页码字符串
 * @param pageSize - 每页数量字符串
 * @returns 解析后的分页参数
 */
export function parsePagination(
  page?: string | number,
  pageSize?: string | number
): { page: number; pageSize: number; skip: number } {
  const parsedPage = Math.max(1, parseInt(String(page || 1), 10))
  const parsedPageSize = Math.min(100, Math.max(1, parseInt(String(pageSize || 10), 10)))
  
  return {
    page: parsedPage,
    pageSize: parsedPageSize,
    skip: (parsedPage - 1) * parsedPageSize
  }
}

/**
 * 计算分页信息
 * 
 * @param total - 总数
 * @param page - 当前页
 * @param pageSize - 每页数量
 * @returns 分页信息
 */
export function calculatePagination(
  total: number,
  page: number,
  pageSize: number
): { total: number; page: number; pageSize: number; totalPages: number } {
  return {
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  }
}

/**
 * 延迟执行
 * 
 * @param ms - 延迟毫秒数
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 安全解析 JSON
 * 
 * @param str - JSON 字符串
 * @param defaultValue - 默认值
 * @returns 解析结果
 */
export function safeJsonParse<T>(str: string | null | undefined, defaultValue: T): T {
  if (!str) return defaultValue
  try {
    return JSON.parse(str) as T
  } catch {
    return defaultValue
  }
}

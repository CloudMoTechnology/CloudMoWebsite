/**
 * 数据库连接配置
 * 
 * @description Prisma 客户端实例管理
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { PrismaClient } from '@prisma/client'

/**
 * Prisma 客户端实例
 * 使用单例模式确保全局只有一个数据库连接
 */
const prisma = new PrismaClient({
  // 日志配置
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error']
    : ['error']
})

/**
 * 连接数据库
 * 在应用启动时调用
 */
export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect()
    console.log('✅ 数据库连接成功')
  } catch (error) {
    console.error('❌ 数据库连接失败:', error)
    process.exit(1)
  }
}

/**
 * 断开数据库连接
 * 在应用关闭时调用
 */
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect()
  console.log('📤 数据库连接已断开')
}

export { prisma }
export default prisma

/**
 * 应用入口
 * 
 * @description 墨云科技后端API服务入口
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import { config } from './config'
import { connectDatabase, disconnectDatabase } from './config/database'
import routes from './routes'
import { notFoundHandler, errorHandler } from './middleware/error'
import { initializeAdmin } from './utils/init'

/**
 * 创建 Express 应用实例
 */
const app = express()

/**
 * 中间件配置
 */

// 安全头部
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}))

// 跨域配置
app.use(cors({
  origin: config.cors.origin,
  methods: config.cors.methods,
  credentials: config.cors.credentials
}))

// 请求日志
app.use(morgan(config.server.isProduction ? 'combined' : 'dev'))

// JSON 解析
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

/**
 * API 路由
 */
app.use('/api', routes)

/**
 * 健康检查端点
 */
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

/**
 * 错误处理
 */
app.use(notFoundHandler)
app.use(errorHandler)

/**
 * 启动服务器
 */
async function bootstrap(): Promise<void> {
  try {
    // 连接数据库
    await connectDatabase()
    
    // 初始化管理员账号
    await initializeAdmin()
    
    // 启动服务器
    app.listen(config.server.port, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🌩️  墨云科技 CloudMo API 服务                            ║
║                                                            ║
║   服务地址: http://localhost:${config.server.port}                      ║
║   运行环境: ${config.server.env.padEnd(42)}║
║   API文档: http://localhost:${config.server.port}/api                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `)
    })
  } catch (error) {
    console.error('❌ 服务启动失败:', error)
    process.exit(1)
  }
}

/**
 * 优雅关闭
 */
process.on('SIGINT', async () => {
  console.log('\n正在关闭服务...')
  await disconnectDatabase()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n正在关闭服务...')
  await disconnectDatabase()
  process.exit(0)
})

// 启动应用
bootstrap()

export default app

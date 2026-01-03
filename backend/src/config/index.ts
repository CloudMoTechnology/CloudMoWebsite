/**
 * 应用配置
 * 
 * @description 墨云科技后端配置管理
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

/**
 * 应用配置对象
 * 集中管理所有配置项
 */
export const config = {
  /**
   * 服务器配置
   */
  server: {
    /** 服务端口 */
    port: parseInt(process.env.PORT || '3000', 10),
    /** 运行环境 */
    env: process.env.NODE_ENV || 'development',
    /** 是否为生产环境 */
    isProduction: process.env.NODE_ENV === 'production'
  },
  
  /**
   * JWT 配置
   */
  jwt: {
    /** JWT 密钥 */
    secret: process.env.JWT_SECRET || 'cloudmo-jwt-secret-key',
    /** Token 过期时间 */
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  /**
   * 管理员配置
   */
  admin: {
    /** 初始用户名 */
    username: process.env.ADMIN_USERNAME || 'admin',
    /** 初始密码 */
    password: process.env.ADMIN_PASSWORD || 'admin123',
    /** 初始邮箱 */
    email: process.env.ADMIN_EMAIL || 'admin@cloudmo.tech'
  },
  
  /**
   * 跨域配置
   */
  cors: {
    /** 允许的源 */
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    /** 允许的方法 */
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    /** 允许携带凭证 */
    credentials: true
  },
  
  /**
   * 上传配置
   */
  upload: {
    /** 上传目录 */
    dir: process.env.UPLOAD_DIR || './uploads',
    /** 最大文件大小（字节） */
    maxSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    /** 允许的文件类型 */
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  }
}

export default config

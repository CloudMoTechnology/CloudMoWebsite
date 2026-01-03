/**
 * 初始化工具
 * 
 * @description 应用启动时的初始化操作
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import prisma from '../config/database'
import { config } from '../config'
import { hashPassword } from './index'

/**
 * 初始化管理员账号
 * 如果数据库中没有用户，则创建默认管理员
 */
export async function initializeAdmin(): Promise<void> {
  try {
    // 检查是否已有用户
    const userCount = await prisma.user.count()
    
    if (userCount === 0) {
      // 创建默认管理员
      const hashedPassword = await hashPassword(config.admin.password)
      
      await prisma.user.create({
        data: {
          username: config.admin.username,
          email: config.admin.email,
          password: hashedPassword,
          nickname: '管理员',
          role: 'admin',
          status: 1
        }
      })
      
      console.log('✅ 默认管理员账号已创建')
      console.log(`   用户名: ${config.admin.username}`)
      console.log(`   密码: ${config.admin.password}`)
    }
  } catch (error) {
    console.error('❌ 初始化管理员失败:', error)
  }
}

/**
 * 初始化默认设置
 */
export async function initializeSettings(): Promise<void> {
  try {
    const defaultSettings = [
      { key: 'site_name', value: '墨云科技', group: 'general' },
      { key: 'site_description', value: '人工智能技术前沿开发者', group: 'general' },
      { key: 'site_keywords', value: 'AI,人工智能,软件开发,墨云科技', group: 'seo' },
      { key: 'contact_email', value: 'contact@cloudmo.tech', group: 'general' },
      { key: 'copyright', value: '© 2024 墨云科技 CloudMo Technology', group: 'general' }
    ]
    
    for (const setting of defaultSettings) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: {},
        create: setting
      })
    }
    
    console.log('✅ 默认设置已初始化')
  } catch (error) {
    console.error('❌ 初始化设置失败:', error)
  }
}

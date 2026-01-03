/**
 * 路由配置
 * 
 * @description 墨云科技后端API路由
 * @author MoYeRanQianZhi
 * @version 1.0.0
 */

import { Router, IRouter } from 'express'
import { authMiddleware } from '../middleware/auth'

// 导入控制器
import * as authController from '../controllers/auth'
import * as articleController from '../controllers/article'
import * as newsController from '../controllers/news'
import * as docController from '../controllers/doc'
import * as contactController from '../controllers/contact'
import * as settingController from '../controllers/setting'

const router: IRouter = Router()

// ============================================
// 公开API路由
// ============================================

/**
 * 认证相关路由
 */
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)

/**
 * 文章公开路由
 */
router.get('/articles', articleController.getArticles)
router.get('/articles/:id', articleController.getArticleById)

/**
 * 新闻公开路由
 */
router.get('/news', newsController.getNewsList)
router.get('/news/:id', newsController.getNewsById)

/**
 * 文档公开路由
 */
router.get('/docs', docController.getDocs)
router.get('/docs/:id', docController.getDocById)

/**
 * 联系表单路由
 */
router.post('/contact', contactController.submitContact)

/**
 * 公开设置路由
 */
router.get('/settings', settingController.getPublicSettings)

// ============================================
// 需要认证的管理API路由
// ============================================

/**
 * 用户认证路由（需要登录）
 */
router.get('/auth/me', authMiddleware, authController.getCurrentUser)
router.put('/auth/password', authMiddleware, authController.changePassword)

/**
 * 文章管理路由
 */
router.get('/admin/articles', authMiddleware, articleController.getAllArticles)
router.post('/admin/articles', authMiddleware, articleController.createArticle)
router.put('/admin/articles/:id', authMiddleware, articleController.updateArticle)
router.delete('/admin/articles/:id', authMiddleware, articleController.deleteArticle)

/**
 * 新闻管理路由
 */
router.get('/admin/news', authMiddleware, newsController.getAllNews)
router.post('/admin/news', authMiddleware, newsController.createNews)
router.put('/admin/news/:id', authMiddleware, newsController.updateNews)
router.delete('/admin/news/:id', authMiddleware, newsController.deleteNews)

/**
 * 文档管理路由
 */
router.get('/admin/docs', authMiddleware, docController.getAllDocs)
router.post('/admin/docs', authMiddleware, docController.createDoc)
router.put('/admin/docs/:id', authMiddleware, docController.updateDoc)
router.delete('/admin/docs/:id', authMiddleware, docController.deleteDoc)

/**
 * 联系记录管理路由
 */
router.get('/admin/contacts', authMiddleware, contactController.getContacts)
router.get('/admin/contacts/:id', authMiddleware, contactController.getContactById)
router.put('/admin/contacts/:id', authMiddleware, contactController.updateContactStatus)
router.delete('/admin/contacts/:id', authMiddleware, contactController.deleteContact)

/**
 * 设置管理路由
 */
router.get('/admin/settings', authMiddleware, settingController.getAllSettings)
router.put('/admin/settings', authMiddleware, settingController.updateSettings)
router.delete('/admin/settings/:key', authMiddleware, settingController.deleteSetting)

export default router

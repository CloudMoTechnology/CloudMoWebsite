/**
 * Vue Router 路由配置
 * 
 * @description 墨云官网路由配置文件
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 路由结构：
 * - 前台页面路由（公开访问）
 * - 后台管理路由（需要登录）
 * - 错误页面路由
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/**
 * 前台页面路由配置
 * 这些路由对所有用户公开访问
 */
const publicRoutes: RouteRecordRaw[] = [
  {
    // 首页路由
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomePage.vue'),
    meta: {
      title: '首页 - 墨云科技',
      description: '墨云科技官方网站，人工智能技术前沿开发者'
    }
  },
  {
    // 关于我们
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/AboutPage.vue'),
    meta: {
      title: '关于我们 - 墨云科技',
      description: '了解墨云科技的发展历程、企业文化和团队'
    }
  },
  {
    // 服务与产品
    path: '/services',
    name: 'Services',
    component: () => import('@/views/services/ServicesPage.vue'),
    meta: {
      title: '服务与产品 - 墨云科技',
      description: '墨云科技提供的软件开发与人工智能服务'
    }
  },
  {
    // 筑梦计划
    path: '/dream-builder',
    name: 'DreamBuilder',
    component: () => import('@/views/services/DreamBuilderPage.vue'),
    meta: {
      title: '筑梦计划 - 墨云科技',
      description: '帮助小团队使用人工智能技术快速开发产品'
    }
  },
  {
    // 新闻动态
    path: '/news',
    name: 'News',
    component: () => import('@/views/news/NewsPage.vue'),
    meta: {
      title: '新闻动态 - 墨云科技',
      description: '墨云科技最新动态与行业资讯'
    }
  },
  {
    // 新闻详情
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('@/views/news/NewsDetailPage.vue'),
    meta: {
      title: '新闻详情 - 墨云科技'
    }
  },
  {
    // 技术文档
    path: '/docs',
    name: 'Docs',
    component: () => import('@/views/docs/DocsPage.vue'),
    meta: {
      title: '技术文档 - 墨云科技',
      description: '墨云科技技术文档与开发指南'
    },
    children: [
      {
        // 文档详情
        path: ':id',
        name: 'DocDetail',
        component: () => import('@/views/docs/DocDetailPage.vue'),
        meta: {
          title: '文档详情 - 墨云科技'
        }
      }
    ]
  },
  {
    // 联系我们
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/contact/ContactPage.vue'),
    meta: {
      title: '联系我们 - 墨云科技',
      description: '与墨云科技取得联系'
    }
  },
  {
    // 公益项目
    path: '/charity',
    name: 'Charity',
    component: () => import('@/views/about/CharityPage.vue'),
    meta: {
      title: '公益项目 - 墨云科技',
      description: '墨云科技公益项目与社会责任'
    }
  }
]

/**
 * 后台管理路由配置
 * 这些路由需要用户登录后才能访问
 */
const adminRoutes: RouteRecordRaw[] = [
  {
    // 后台管理入口
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: {
      title: '后台管理 - 墨云科技',
      requireAuth: true
    },
    children: [
      {
        // 管理后台首页/仪表盘
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/DashboardPage.vue'),
        meta: {
          title: '仪表盘 - 后台管理'
        }
      },
      {
        // 文章管理
        path: 'articles',
        name: 'AdminArticles',
        component: () => import('@/views/admin/ArticlesPage.vue'),
        meta: {
          title: '文章管理 - 后台管理'
        }
      },
      {
        // 文章编辑
        path: 'articles/edit/:id?',
        name: 'AdminArticleEdit',
        component: () => import('@/views/admin/ArticleEditPage.vue'),
        meta: {
          title: '编辑文章 - 后台管理'
        }
      },
      {
        // 文档管理
        path: 'docs',
        name: 'AdminDocs',
        component: () => import('@/views/admin/DocsManagePage.vue'),
        meta: {
          title: '文档管理 - 后台管理'
        }
      },
      {
        // 联系记录
        path: 'contacts',
        name: 'AdminContacts',
        component: () => import('@/views/admin/ContactsPage.vue'),
        meta: {
          title: '联系记录 - 后台管理'
        }
      },
      {
        // 网站设置
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/admin/SettingsPage.vue'),
        meta: {
          title: '网站设置 - 后台管理'
        }
      }
    ]
  },
  {
    // 管理员登录
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/LoginPage.vue'),
    meta: {
      title: '管理员登录 - 墨云科技'
    }
  }
]

/**
 * 错误页面路由
 */
const errorRoutes: RouteRecordRaw[] = [
  {
    // 404 页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFoundPage.vue'),
    meta: {
      title: '页面未找到 - 墨云科技'
    }
  }
]

/**
 * 合并所有路由
 */
const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...adminRoutes,
  ...errorRoutes
]

/**
 * 创建路由实例
 */
const router = createRouter({
  // 使用 HTML5 History 模式
  history: createWebHistory(),
  routes,
  // 滚动行为配置
  scrollBehavior(to, _from, savedPosition) {
    // 如果有保存的位置（如浏览器后退），恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点，滚动到锚点位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // 默认滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

/**
 * 全局前置守卫
 * 用于权限验证和页面标题设置
 */
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // 检查是否需要登录权限
  if (to.meta.requireAuth) {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('admin_token')
    if (!token) {
      // 未登录，重定向到登录页
      next({
        name: 'AdminLogin',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  
  next()
})

/**
 * 全局后置钩子
 * 用于页面访问统计等
 */
router.afterEach((_to, _from) => {
  // 可以在这里添加页面访问统计逻辑
  // 例如：发送 PV 统计请求
})

export default router

/**
 * 用户状态管理
 * 
 * @description 墨云官网用户认证状态管理
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 管理内容：
 * - 用户信息
 * - 登录状态
 * - Token 管理
 * - 权限验证
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { authApi } from '@/api/auth'

/**
 * 用户状态 Store
 * 
 * @description 管理用户认证和权限相关状态
 */
export const useUserStore = defineStore('user', () => {
  // ============================================
  // State - 状态定义
  // ============================================
  
  /**
   * 当前登录用户信息
   */
  const currentUser = ref<User | null>(null)
  
  /**
   * 访问令牌
   */
  const token = ref<string | null>(null)
  
  /**
   * 刷新令牌
   */
  const refreshToken = ref<string | null>(null)
  
  /**
   * 登录状态
   */
  const isLoggedIn = ref<boolean>(false)
  
  /**
   * 登录加载状态
   */
  const loginLoading = ref<boolean>(false)
  
  // ============================================
  // Getters - 计算属性
  // ============================================
  
  /**
   * 是否为管理员
   */
  const isAdmin = computed(() => {
    return currentUser.value?.role === 'admin'
  })
  
  /**
   * 是否为编辑者
   */
  const isEditor = computed(() => {
    return currentUser.value?.role === 'editor' || currentUser.value?.role === 'admin'
  })
  
  /**
   * 用户名
   */
  const username = computed(() => {
    return currentUser.value?.username || '未登录'
  })
  
  /**
   * 用户头像
   */
  const avatar = computed(() => {
    return currentUser.value?.avatar || '/default-avatar.png'
  })
  
  // ============================================
  // Actions - 方法定义
  // ============================================
  
  /**
   * 用户登录
   * 
   * @param credentials - 登录凭证
   * @param credentials.username - 用户名
   * @param credentials.password - 密码
   * @returns Promise<boolean> - 登录是否成功
   */
  async function login(credentials: { username: string; password: string }): Promise<boolean> {
    loginLoading.value = true
    
    try {
      // 调用登录 API
      const response = await authApi.login(credentials)
      
      if (response.code === 200) {
        // 保存用户信息和令牌
        currentUser.value = response.data.user
        token.value = response.data.token
        refreshToken.value = response.data.refreshToken
        isLoggedIn.value = true
        
        // 持久化到本地存储
        localStorage.setItem('admin_token', response.data.token)
        localStorage.setItem('admin_refresh_token', response.data.refreshToken)
        localStorage.setItem('admin_user', JSON.stringify(response.data.user))
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('登录失败:', error)
      return false
    } finally {
      loginLoading.value = false
    }
  }
  
  /**
   * 用户登出
   */
  async function logout(): Promise<void> {
    try {
      // 调用登出 API（如果有）
      if (token.value) {
        await authApi.logout()
      }
    } catch (error) {
      console.error('登出请求失败:', error)
    } finally {
      // 清除状态
      clearUserState()
    }
  }
  
  /**
   * 清除用户状态
   */
  function clearUserState(): void {
    currentUser.value = null
    token.value = null
    refreshToken.value = null
    isLoggedIn.value = false
    
    // 清除本地存储
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_refresh_token')
    localStorage.removeItem('admin_user')
  }
  
  /**
   * 刷新访问令牌
   * 
   * @returns Promise<boolean> - 刷新是否成功
   */
  async function refreshAccessToken(): Promise<boolean> {
    if (!refreshToken.value) {
      return false
    }
    
    try {
      const response = await authApi.refreshToken(refreshToken.value)
      
      if (response.code === 200) {
        token.value = response.data.token
        localStorage.setItem('admin_token', response.data.token)
        return true
      }
      
      return false
    } catch (error) {
      console.error('刷新令牌失败:', error)
      // 刷新失败，清除登录状态
      clearUserState()
      return false
    }
  }
  
  /**
   * 获取当前用户信息
   * 
   * @returns Promise<User | null> - 用户信息
   */
  async function fetchUserInfo(): Promise<User | null> {
    if (!token.value) {
      return null
    }
    
    try {
      const response = await authApi.getUserInfo()
      
      if (response.code === 200) {
        currentUser.value = response.data
        localStorage.setItem('admin_user', JSON.stringify(response.data))
        return response.data
      }
      
      return null
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }
  
  /**
   * 更新用户信息
   * 
   * @param userData - 要更新的用户数据
   * @returns Promise<boolean> - 更新是否成功
   */
  async function updateUserInfo(userData: Partial<User>): Promise<boolean> {
    if (!currentUser.value) {
      return false
    }
    
    try {
      const response = await authApi.updateUserInfo(userData)
      
      if (response.code === 200) {
        currentUser.value = { ...currentUser.value, ...response.data }
        localStorage.setItem('admin_user', JSON.stringify(currentUser.value))
        return true
      }
      
      return false
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return false
    }
  }
  
  /**
   * 修改密码
   * 
   * @param passwords - 密码信息
   * @param passwords.oldPassword - 旧密码
   * @param passwords.newPassword - 新密码
   * @returns Promise<boolean> - 修改是否成功
   */
  async function changePassword(passwords: { oldPassword: string; newPassword: string }): Promise<boolean> {
    try {
      const response = await authApi.changePassword(passwords)
      return response.code === 200
    } catch (error) {
      console.error('修改密码失败:', error)
      return false
    }
  }
  
  /**
   * 检查权限
   * 
   * @param requiredRole - 所需角色
   * @returns boolean - 是否有权限
   */
  function hasPermission(requiredRole: 'admin' | 'editor' | 'user'): boolean {
    if (!currentUser.value) {
      return false
    }
    
    const roleHierarchy = { admin: 3, editor: 2, user: 1 }
    const userLevel = roleHierarchy[currentUser.value.role] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0
    
    return userLevel >= requiredLevel
  }
  
  /**
   * 初始化用户状态
   * 从本地存储恢复登录状态
   */
  function initUserState(): void {
    const savedToken = localStorage.getItem('admin_token')
    const savedRefreshToken = localStorage.getItem('admin_refresh_token')
    const savedUser = localStorage.getItem('admin_user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      refreshToken.value = savedRefreshToken
      currentUser.value = JSON.parse(savedUser)
      isLoggedIn.value = true
      
      // 验证 token 有效性
      fetchUserInfo().catch(() => {
        // token 无效，尝试刷新
        refreshAccessToken().catch(() => {
          // 刷新失败，清除状态
          clearUserState()
        })
      })
    }
  }
  
  // 返回状态和方法
  return {
    // State
    currentUser,
    token,
    refreshToken,
    isLoggedIn,
    loginLoading,
    
    // Getters
    isAdmin,
    isEditor,
    username,
    avatar,
    
    // Actions
    login,
    logout,
    clearUserState,
    refreshAccessToken,
    fetchUserInfo,
    updateUserInfo,
    changePassword,
    hasPermission,
    initUserState
  }
})

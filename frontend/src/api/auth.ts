/**
 * 认证 API 接口
 * 
 * @description 墨云官网用户认证相关 API
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 接口说明：
 * - login: 用户登录
 * - logout: 用户登出
 * - refreshToken: 刷新访问令牌
 * - getUserInfo: 获取用户信息
 * - updateUserInfo: 更新用户信息
 * - changePassword: 修改密码
 */

import { post, get, put } from './request'
import type { ApiResponse, User } from '@/types'

/**
 * 登录响应数据结构
 */
interface LoginResponse {
  /** 用户信息 */
  user: User
  /** 访问令牌 */
  token: string
  /** 刷新令牌 */
  refreshToken: string
}

/**
 * 刷新令牌响应数据结构
 */
interface RefreshTokenResponse {
  /** 新的访问令牌 */
  token: string
}

/**
 * 认证 API 对象
 * 包含所有认证相关的 API 方法
 */
export const authApi = {
  /**
   * 用户登录
   * 
   * @description 使用用户名和密码进行登录认证
   * @param credentials - 登录凭证
   * @param credentials.username - 用户名
   * @param credentials.password - 密码
   * @returns Promise<ApiResponse<LoginResponse>> - 登录响应
   * 
   * @example
   * const response = await authApi.login({ username: 'admin', password: '123456' })
   * if (response.code === 200) {
   *   console.log('登录成功', response.data.user)
   * }
   */
  login(credentials: { username: string; password: string }): Promise<ApiResponse<LoginResponse>> {
    return post<LoginResponse>('/auth/login', credentials)
  },
  
  /**
   * 用户登出
   * 
   * @description 注销当前用户的登录状态
   * @returns Promise<ApiResponse<null>> - 登出响应
   * 
   * @example
   * await authApi.logout()
   */
  logout(): Promise<ApiResponse<null>> {
    return post<null>('/auth/logout')
  },
  
  /**
   * 刷新访问令牌
   * 
   * @description 使用刷新令牌获取新的访问令牌
   * @param refreshToken - 刷新令牌
   * @returns Promise<ApiResponse<RefreshTokenResponse>> - 刷新响应
   * 
   * @example
   * const response = await authApi.refreshToken('refresh_token_string')
   * if (response.code === 200) {
   *   localStorage.setItem('admin_token', response.data.token)
   * }
   */
  refreshToken(refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> {
    return post<RefreshTokenResponse>('/auth/refresh', { refreshToken })
  },
  
  /**
   * 获取当前用户信息
   * 
   * @description 获取当前登录用户的详细信息
   * @returns Promise<ApiResponse<User>> - 用户信息响应
   * 
   * @example
   * const response = await authApi.getUserInfo()
   * if (response.code === 200) {
   *   console.log('用户信息', response.data)
   * }
   */
  getUserInfo(): Promise<ApiResponse<User>> {
    return get<User>('/auth/user')
  },
  
  /**
   * 更新用户信息
   * 
   * @description 更新当前用户的个人信息
   * @param userData - 要更新的用户数据
   * @returns Promise<ApiResponse<User>> - 更新后的用户信息
   * 
   * @example
   * const response = await authApi.updateUserInfo({ username: 'newName' })
   * if (response.code === 200) {
   *   console.log('更新成功', response.data)
   * }
   */
  updateUserInfo(userData: Partial<User>): Promise<ApiResponse<User>> {
    return put<User>('/auth/user', userData as Record<string, unknown>)
  },
  
  /**
   * 修改密码
   * 
   * @description 修改当前用户的登录密码
   * @param passwords - 密码信息
   * @param passwords.oldPassword - 旧密码
   * @param passwords.newPassword - 新密码
   * @returns Promise<ApiResponse<null>> - 修改响应
   * 
   * @example
   * const response = await authApi.changePassword({
   *   oldPassword: 'old123',
   *   newPassword: 'new456'
   * })
   * if (response.code === 200) {
   *   console.log('密码修改成功')
   * }
   */
  changePassword(passwords: { oldPassword: string; newPassword: string }): Promise<ApiResponse<null>> {
    return put<null>('/auth/password', passwords)
  }
}

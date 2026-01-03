/**
 * Axios 请求封装
 * 
 * @description 墨云官网 HTTP 请求工具
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能说明：
 * - 统一的请求/响应拦截
 * - 自动添加认证 Token
 * - 统一的错误处理
 * - 请求重试机制
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types'

/**
 * 创建 Axios 实例
 * 配置基础 URL 和超时时间
 */
const request: AxiosInstance = axios.create({
  // 基础 URL：开发环境使用代理，生产环境使用实际 API 地址
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  // 请求超时时间：15秒
  timeout: 15000,
  // 请求头配置
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 请求拦截器
 * 在请求发送前进行处理
 */
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从本地存储获取 Token
    const token = localStorage.getItem('admin_token')
    
    // 如果存在 Token，添加到请求头
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加时间戳防止缓存（可选）
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }
    
    return config
  },
  (error) => {
    // 请求错误处理
    console.error('请求配置错误:', error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 在响应返回后进行处理
 */
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 获取响应数据
    const { data } = response
    
    // 检查业务状态码
    if (data.code === 200) {
      // 成功响应，直接返回
      return response
    }
    
    // 处理特定错误码
    switch (data.code) {
      case 401:
        // 未授权：Token 过期或无效
        handleUnauthorized()
        break
      case 403:
        // 禁止访问：权限不足
        console.error('权限不足')
        break
      case 404:
        // 资源不存在
        console.error('请求的资源不存在')
        break
      case 500:
        // 服务器错误
        console.error('服务器内部错误')
        break
      default:
        // 其他错误
        console.error('请求失败:', data.message)
    }
    
    return response
  },
  (error) => {
    // 网络错误或服务器无响应
    if (error.response) {
      // 服务器返回了错误状态码
      const { status } = error.response
      
      switch (status) {
        case 401:
          handleUnauthorized()
          break
        case 403:
          console.error('禁止访问')
          break
        case 404:
          console.error('请求地址不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        case 502:
          console.error('网关错误')
          break
        case 503:
          console.error('服务不可用')
          break
        default:
          console.error(`请求失败: ${status}`)
      }
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.error('网络错误，请检查网络连接')
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message)
    }
    
    return Promise.reject(error)
  }
)

/**
 * 处理未授权状态
 * 清除本地存储并跳转到登录页
 */
function handleUnauthorized(): void {
  // 清除本地存储的认证信息
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_refresh_token')
  localStorage.removeItem('admin_user')
  
  // 如果当前在管理后台，跳转到登录页
  if (window.location.pathname.startsWith('/admin')) {
    window.location.href = '/admin/login'
  }
}

/**
 * GET 请求封装
 * 
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param params - 查询参数
 * @param config - 额外配置
 * @returns Promise<ApiResponse<T>> - 响应数据
 */
export async function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await request.get<ApiResponse<T>>(url, { params, ...config })
  return response.data
}

/**
 * POST 请求封装
 * 
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param data - 请求体数据
 * @param config - 额外配置
 * @returns Promise<ApiResponse<T>> - 响应数据
 */
export async function post<T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await request.post<ApiResponse<T>>(url, data, config)
  return response.data
}

/**
 * PUT 请求封装
 * 
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param data - 请求体数据
 * @param config - 额外配置
 * @returns Promise<ApiResponse<T>> - 响应数据
 */
export async function put<T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await request.put<ApiResponse<T>>(url, data, config)
  return response.data
}

/**
 * DELETE 请求封装
 * 
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param params - 查询参数
 * @param config - 额外配置
 * @returns Promise<ApiResponse<T>> - 响应数据
 */
export async function del<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await request.delete<ApiResponse<T>>(url, { params, ...config })
  return response.data
}

/**
 * 文件上传请求
 * 
 * @template T - 响应数据类型
 * @param url - 上传地址
 * @param file - 文件对象
 * @param fieldName - 文件字段名
 * @param extraData - 额外数据
 * @returns Promise<ApiResponse<T>> - 响应数据
 */
export async function upload<T = unknown>(
  url: string,
  file: File,
  fieldName: string = 'file',
  extraData?: Record<string, string>
): Promise<ApiResponse<T>> {
  const formData = new FormData()
  formData.append(fieldName, file)
  
  // 添加额外数据
  if (extraData) {
    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  
  const response = await request.post<ApiResponse<T>>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

// 导出 Axios 实例（用于特殊情况）
export default request

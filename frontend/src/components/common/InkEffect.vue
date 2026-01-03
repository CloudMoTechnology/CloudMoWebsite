<script setup lang="ts">
/**
 * 墨水效果组件
 * 
 * @description 创建古风墨水扩散动画效果
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能说明：
 * - 模拟墨水在水中扩散的效果
 * - 支持鼠标交互
 * - 可配置颜色和速度
 */

import { ref, onMounted, onUnmounted } from 'vue'

// 组件属性定义
interface Props {
  /** 墨点数量 */
  inkCount?: number
  /** 扩散速度 */
  spreadSpeed?: number
  /** 主色调 */
  primaryColor?: string
  /** 是否启用交互 */
  interactive?: boolean
}

// 设置默认属性值
const props = withDefaults(defineProps<Props>(), {
  inkCount: 5,
  spreadSpeed: 0.02,
  primaryColor: '#60a5fa',
  interactive: true
})

// Canvas 引用
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 动画帧ID
let animationFrameId: number | null = null

// 墨点数据结构
interface InkDrop {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  color: string
  speed: number
}

// 确保主色调有默认值
const primaryColorValue = props.primaryColor || '#60a5fa'

// 墨点数组
let inkDrops: InkDrop[] = []

/**
 * 生成随机颜色
 * @returns 随机颜色字符串
 */
function getRandomColor(): string {
  const colors: string[] = [
    primaryColorValue,
    '#a78bfa', // 紫色
    '#34d399', // 绿色
    '#fbbf24', // 金色
    '#f472b6', // 粉色
  ]
  return colors[Math.floor(Math.random() * colors.length)] as string
}

/**
 * 创建新墨点
 * @param x - X坐标
 * @param y - Y坐标
 */
function createInkDrop(x: number, y: number): void {
  const drop: InkDrop = {
    x,
    y,
    radius: 0,
    maxRadius: Math.random() * 200 + 100,
    opacity: 0.3,
    color: getRandomColor(),
    speed: props.spreadSpeed * (Math.random() * 0.5 + 0.5)
  }
  inkDrops.push(drop)
}

/**
 * 初始化墨点
 * @param canvas - Canvas元素
 */
function initInkDrops(canvas: HTMLCanvasElement): void {
  for (let i = 0; i < props.inkCount; i++) {
    createInkDrop(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
  }
}

/**
 * 绘制墨点
 * @param ctx - Canvas上下文
 * @param drop - 墨点数据
 */
function drawInkDrop(ctx: CanvasRenderingContext2D, drop: InkDrop): void {
  // 创建径向渐变
  const gradient = ctx.createRadialGradient(
    drop.x, drop.y, 0,
    drop.x, drop.y, drop.radius
  )
  
  // 设置渐变颜色
  gradient.addColorStop(0, `${drop.color}00`)
  gradient.addColorStop(0.3, `${drop.color}${Math.floor(drop.opacity * 255).toString(16).padStart(2, '0')}`)
  gradient.addColorStop(0.7, `${drop.color}${Math.floor(drop.opacity * 128).toString(16).padStart(2, '0')}`)
  gradient.addColorStop(1, `${drop.color}00`)
  
  // 绘制圆形
  ctx.beginPath()
  ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()
}

/**
 * 更新墨点状态
 * @param drop - 墨点数据
 * @returns 是否保留该墨点
 */
function updateInkDrop(drop: InkDrop): boolean {
  // 扩散
  drop.radius += drop.speed * 2
  
  // 淡出
  if (drop.radius > drop.maxRadius * 0.5) {
    drop.opacity -= 0.002
  }
  
  // 移除完全透明的墨点
  return drop.opacity > 0 && drop.radius < drop.maxRadius
}

/**
 * 动画循环
 */
function animate(): void {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // 清除画布（带透明度实现拖尾效果）
  ctx.fillStyle = 'rgba(3, 7, 18, 0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 更新和绘制墨点
  inkDrops = inkDrops.filter(drop => {
    drawInkDrop(ctx, drop)
    return updateInkDrop(drop)
  })
  
  // 保持最小墨点数量
  while (inkDrops.length < props.inkCount) {
    createInkDrop(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
  }
  
  animationFrameId = requestAnimationFrame(animate)
}

/**
 * 处理鼠标移动
 * @param event - 鼠标事件
 */
function handleMouseMove(event: MouseEvent): void {
  if (!props.interactive) return
  
  const canvas = canvasRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // 随机创建墨点
  if (Math.random() < 0.1) {
    createInkDrop(x, y)
  }
}

/**
 * 调整Canvas尺寸
 */
function resizeCanvas(): void {
  const canvas = canvasRef.value
  if (!canvas) return
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

// 组件挂载
onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  // 设置Canvas尺寸
  resizeCanvas()
  
  // 初始化墨点
  initInkDrops(canvas)
  
  // 开始动画
  animate()
  
  // 监听窗口大小变化
  window.addEventListener('resize', resizeCanvas)
  
  // 监听鼠标移动
  if (props.interactive) {
    canvas.addEventListener('mousemove', handleMouseMove)
  }
})

// 组件卸载
onUnmounted(() => {
  // 取消动画
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  
  // 移除事件监听
  window.removeEventListener('resize', resizeCanvas)
  
  const canvas = canvasRef.value
  if (canvas) {
    canvas.removeEventListener('mousemove', handleMouseMove)
  }
})
</script>

<template>
  <canvas 
    ref="canvasRef"
    class="ink-effect-canvas"
    aria-hidden="true"
  />
</template>

<style lang="scss" scoped>
.ink-effect-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
}
</style>

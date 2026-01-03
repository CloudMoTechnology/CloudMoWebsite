<script setup lang="ts">
/**
 * 粒子背景组件
 * 
 * @description 墨云官网高级粒子效果背景
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 功能说明：
 * - 使用 Three.js 创建 3D 粒子效果
 * - 粒子随鼠标移动产生交互
 * - 支持自定义粒子数量、颜色、速度
 * - 融合科技感与古风墨韵效果
 */

import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

/**
 * 组件属性定义
 */
interface Props {
  /** 粒子数量 */
  particleCount?: number
  /** 主色调 */
  primaryColor?: string
  /** 次色调 */
  secondaryColor?: string
  /** 粒子移动速度 */
  speed?: number
  /** 是否启用鼠标交互 */
  interactive?: boolean
  /** 是否启用连线效果 */
  enableLines?: boolean
}

// 定义默认属性值
const props = withDefaults(defineProps<Props>(), {
  particleCount: 150,
  primaryColor: '#0ea5e9',
  secondaryColor: '#a855f7',
  speed: 0.5,
  interactive: true,
  enableLines: true
})

// 容器引用
const containerRef = ref<HTMLDivElement | null>(null)

// Three.js 相关变量
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let particleGeometry: THREE.BufferGeometry
let animationFrameId: number
let mouseX = 0
let mouseY = 0

/**
 * 初始化 Three.js 场景
 * 创建粒子系统和渲染器
 */
function initScene(): void {
  if (!containerRef.value) return
  
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight
  
  // 创建场景
  scene = new THREE.Scene()
  
  // 创建透视相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 50
  
  // 创建 WebGL 渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  
  // 添加到容器
  container.appendChild(renderer.domElement)
  
  // 创建粒子
  createParticles()
  
  // 添加事件监听
  if (props.interactive) {
    window.addEventListener('mousemove', onMouseMove)
  }
  window.addEventListener('resize', onWindowResize)
}

/**
 * 创建粒子系统
 * 生成随机分布的粒子并设置材质
 */
function createParticles(): void {
  const count = props.particleCount
  
  // 创建几何体
  particleGeometry = new THREE.BufferGeometry()
  
  // 粒子位置数组
  const positions = new Float32Array(count * 3)
  // 粒子颜色数组
  const colors = new Float32Array(count * 3)
  // 粒子大小数组
  const sizes = new Float32Array(count)
  
  // 解析颜色
  const primaryColor = new THREE.Color(props.primaryColor)
  const secondaryColor = new THREE.Color(props.secondaryColor)
  const goldColor = new THREE.Color('#eab308')
  
  // 随机生成粒子属性
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    
    // 随机位置（球形分布）
    const radius = 50 + Math.random() * 50
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)
    
    // 随机颜色（在三种颜色之间插值）
    const colorChoice = Math.random()
    let color: THREE.Color
    
    if (colorChoice < 0.4) {
      color = primaryColor.clone()
    } else if (colorChoice < 0.7) {
      color = secondaryColor.clone()
    } else {
      color = goldColor.clone()
    }
    
    // 添加随机亮度变化
    const brightness = 0.5 + Math.random() * 0.5
    colors[i3] = color.r * brightness
    colors[i3 + 1] = color.g * brightness
    colors[i3 + 2] = color.b * brightness
    
    // 随机大小
    sizes[i] = Math.random() * 3 + 1
  }
  
  // 设置几何体属性
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  
  // 创建着色器材质
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      uniform float uTime;
      uniform float uPixelRatio;
      
      void main() {
        vColor = color;
        
        // 添加轻微的浮动效果
        vec3 pos = position;
        pos.y += sin(uTime * 0.5 + position.x * 0.1) * 2.0;
        pos.x += cos(uTime * 0.3 + position.z * 0.1) * 2.0;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * uPixelRatio * (50.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // 创建圆形粒子
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        // 添加发光效果
        float glow = 1.0 - dist * 2.0;
        glow = pow(glow, 2.0);
        
        gl_FragColor = vec4(vColor, glow * 0.8);
      }
    `,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  
  // 创建粒子系统
  particles = new THREE.Points(particleGeometry, material)
  scene.add(particles)
}

/**
 * 鼠标移动事件处理
 * 更新鼠标位置用于交互效果
 */
function onMouseMove(event: MouseEvent): void {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1
}

/**
 * 窗口大小改变事件处理
 * 更新相机和渲染器尺寸
 */
function onWindowResize(): void {
  if (!containerRef.value) return
  
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
}

/**
 * 动画循环
 * 更新粒子位置和渲染场景
 */
function animate(): void {
  animationFrameId = requestAnimationFrame(animate)
  
  const time = performance.now() * 0.001
  
  // 更新着色器时间
  if (particles && particles.material instanceof THREE.ShaderMaterial && particles.material.uniforms.uTime) {
    particles.material.uniforms.uTime.value = time
  }
  
  // 粒子系统旋转
  if (particles) {
    particles.rotation.y = time * props.speed * 0.1
    particles.rotation.x = time * props.speed * 0.05
    
    // 鼠标交互：粒子系统跟随鼠标轻微移动
    if (props.interactive) {
      particles.rotation.y += mouseX * 0.01
      particles.rotation.x += mouseY * 0.01
    }
  }
  
  // 渲染场景
  renderer.render(scene, camera)
}

/**
 * 清理资源
 * 移除事件监听和销毁 Three.js 对象
 */
function cleanup(): void {
  // 取消动画帧
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  // 移除事件监听
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onWindowResize)
  
  // 销毁 Three.js 对象
  if (particleGeometry) {
    particleGeometry.dispose()
  }
  
  if (particles && particles.material instanceof THREE.Material) {
    particles.material.dispose()
  }
  
  if (renderer) {
    renderer.dispose()
    if (containerRef.value && renderer.domElement.parentNode) {
      containerRef.value.removeChild(renderer.domElement)
    }
  }
}

// 组件挂载时初始化
onMounted(() => {
  initScene()
  animate()
})

// 组件卸载时清理
onUnmounted(() => {
  cleanup()
})

// 监听属性变化，重新创建粒子
watch(() => [props.particleCount, props.primaryColor, props.secondaryColor], () => {
  if (particles) {
    scene.remove(particles)
    if (particleGeometry) particleGeometry.dispose()
    if (particles.material instanceof THREE.Material) particles.material.dispose()
  }
  createParticles()
})
</script>

<template>
  <!-- 粒子背景容器 -->
  <div 
    ref="containerRef" 
    class="particle-background"
    aria-hidden="true"
  >
    <!-- Three.js 画布将被插入到这里 -->
  </div>
</template>

<style lang="scss" scoped>
/**
 * 粒子背景容器样式
 */
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  
  // 确保 canvas 填满容器
  :deep(canvas) {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>

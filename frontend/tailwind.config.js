/**
 * TailwindCSS 配置文件
 * 
 * @description 墨云官网 TailwindCSS 主题配置
 * @author MoYeRanQianZhi
 * @version 1.0.0
 * 
 * 配置说明：
 * - content: 指定需要扫描的文件路径
 * - theme: 自定义主题配置，包含墨云品牌色彩
 * - plugins: 启用的插件列表
 */

/** @type {import('tailwindcss').Config} */
export default {
  // 扫描路径配置：包含所有Vue组件和HTML文件
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  
  // 主题配置
  theme: {
    extend: {
      // 墨云品牌色彩系统
      colors: {
        // 主色调：墨黑系列 - 体现高级黑风格
        'mo-black': {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        // 云色调：科技蓝系列 - 体现科技感
        'mo-cloud': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // 古风金色：体现高贵与古典
        'mo-gold': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        // 墨韵紫：古风与科技的融合
        'mo-purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
      
      // 字体配置
      fontFamily: {
        // 主字体：思源黑体 + 系统字体回退
        'sans': ['Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        // 古风字体：用于标题和特殊元素
        'serif': ['Noto Serif SC', 'SimSun', 'serif'],
        // 代码字体
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      // 动画配置
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'particle': 'particle 20s linear infinite',
        'ink-spread': 'inkSpread 2s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
      },
      
      // 关键帧定义
      keyframes: {
        // 漂浮动画
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        // 发光动画
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        // 粒子动画
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
        // 墨水扩散动画
        inkSpread: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        // 淡入上升
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // 左侧滑入
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        // 右侧滑入
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      
      // 背景图片
      backgroundImage: {
        // 墨云渐变背景
        'mo-gradient': 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        // 科技网格
        'tech-grid': 'linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)',
        // 古风纹理
        'ink-texture': 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
      },
      
      // 阴影配置
      boxShadow: {
        'mo-glow': '0 0 20px rgba(14, 165, 233, 0.3)',
        'mo-gold-glow': '0 0 20px rgba(234, 179, 8, 0.3)',
        'mo-purple-glow': '0 0 20px rgba(168, 85, 247, 0.3)',
      },
    },
  },
  
  // 插件配置
  plugins: [],
}

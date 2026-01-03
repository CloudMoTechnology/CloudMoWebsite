# 墨云科技官方网站

<div align="center">
  <h3>CloudMo Technology Official Website</h3>
  <p>人工智能技术前沿开发者 | AI Technology Pioneer</p>
</div>

---

## 🌟 项目简介

墨云科技（CloudMo）官方网站，采用现代化技术栈开发，融合高级黑、科技感、古风与现代化设计风格。

### 特色功能

- 🎨 **艺术级设计** - 高级黑配色、科技感粒子效果、古风元素融合
- 🚀 **高性能** - Vue 3 + TypeScript 前端，Node.js + Express 后端
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🔐 **后台管理** - 完整的内容管理系统
- 🐳 **容器化部署** - 支持 Docker 一键部署
- ☁️ **云端部署** - 支持 Vercel 快速部署

## 🛠️ 技术栈

### 前端
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI 组件**: Element Plus
- **样式**: TailwindCSS + SCSS
- **状态管理**: Pinia
- **路由**: Vue Router
- **动画**: GSAP + Three.js

### 后端
- **运行时**: Node.js
- **框架**: Express
- **语言**: TypeScript
- **ORM**: Prisma
- **数据库**: SQLite / PostgreSQL
- **认证**: JWT

## 📦 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/CloudMoTechnology/CloudMoWebsite.git
cd CloudMoWebsite

# 安装所有依赖
pnpm install
cd frontend && pnpm install
cd ../backend && pnpm install
```

### 配置环境变量

```bash
# 后端配置
cd backend
cp .env.example .env
# 编辑 .env 文件，配置数据库和密钥
```

### 初始化数据库

```bash
cd backend
npx prisma generate
npx prisma db push
```

### 启动开发服务器

```bash
# 在项目根目录
pnpm run dev

# 或分别启动
# 前端: http://localhost:5173
cd frontend && pnpm run dev

# 后端: http://localhost:3000
cd backend && pnpm run dev
```

## 🐳 Docker 部署

### 使用 Docker Compose

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 单独构建镜像

```bash
# 构建前端镜像
cd frontend
docker build -t cloudmo-frontend .

# 构建后端镜像
cd backend
docker build -t cloudmo-backend .
```

## ☁️ Vercel 部署

1. Fork 本项目到你的 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

## 📁 项目结构

```
CloudMoWebsite/
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── api/            # API 接口
│   │   ├── components/     # 组件
│   │   ├── router/         # 路由配置
│   │   ├── stores/         # 状态管理
│   │   ├── styles/         # 样式文件
│   │   ├── types/          # 类型定义
│   │   ├── utils/          # 工具函数
│   │   └── views/          # 页面视图
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                 # 后端项目
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── controllers/    # 控制器
│   │   ├── middleware/     # 中间件
│   │   ├── routes/         # 路由
│   │   ├── types/          # 类型定义
│   │   └── utils/          # 工具函数
│   ├── prisma/             # 数据库模型
│   └── Dockerfile
├── docker-compose.yml       # Docker 编排配置
├── vercel.json             # Vercel 部署配置
└── README.md
```

## 🔑 默认账号

后台管理系统默认账号：

- **用户名**: admin
- **密码**: admin123

> ⚠️ 请在生产环境中修改默认密码！

## 📖 API 文档

### 公开接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/articles | 获取文章列表 |
| GET | /api/articles/:id | 获取文章详情 |
| GET | /api/news | 获取新闻列表 |
| GET | /api/news/:id | 获取新闻详情 |
| GET | /api/docs | 获取文档列表 |
| GET | /api/docs/:id | 获取文档详情 |
| POST | /api/contact | 提交联系表单 |
| GET | /api/settings | 获取网站设置 |

### 管理接口（需认证）

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/auth/login | 管理员登录 |
| GET | /api/auth/me | 获取当前用户 |
| GET | /api/admin/articles | 获取所有文章 |
| POST | /api/admin/articles | 创建文章 |
| PUT | /api/admin/articles/:id | 更新文章 |
| DELETE | /api/admin/articles/:id | 删除文章 |
| ... | ... | 更多接口 |

## 🎨 设计理念

### 色彩系统

- **墨云黑**: 主背景色，体现高级感
- **云蓝**: 品牌主色，科技感
- **紫韵**: 辅助色，神秘优雅
- **金辉**: 点缀色，高贵典雅

### 动效设计

- **粒子背景**: Three.js 实现的动态粒子效果
- **滚动动画**: GSAP 驱动的流畅过渡
- **交互反馈**: 精心设计的悬停和点击效果

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📞 联系我们

- **官网**: [cloudmo.tech](https://cloudmo.tech)
- **邮箱**: contact@cloudmo.tech
- **GitHub**: [@CloudMoTechnology](https://github.com/CloudMoTechnology)

---

<div align="center">
  <p>© 2024 墨云科技 CloudMo Technology. All Rights Reserved.</p>
</div>

# 贡献指南

感谢您对墨云科技官网项目的关注！我们欢迎所有形式的贡献，包括但不限于：

- 报告 Bug
- 提交功能建议
- 改进文档
- 提交代码修复或新功能

## 开发环境设置

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git

### 本地开发

1. Fork 并克隆仓库

```bash
git clone https://github.com/CloudMoTechnology/CloudMoWebsite.git
cd CloudMoWebsite
```

2. 安装依赖

```bash
# 前端
cd frontend
pnpm install

# 后端
cd ../backend
pnpm install
```

3. 配置环境变量

```bash
# 后端
cp backend/.env.example backend/.env
# 编辑 .env 文件，配置数据库等信息
```

4. 启动开发服务器

```bash
# 前端（在 frontend 目录）
pnpm run dev

# 后端（在 backend 目录）
pnpm run dev
```

## 代码规范

### 通用规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 每个函数都需要添加详细注释
- 提交前确保代码通过所有测试

### 注释规范

所有函数和类都需要使用 JSDoc 风格的注释：

```typescript
/**
 * 函数功能描述
 * 
 * @description 详细描述
 * @param paramName - 参数说明
 * @returns 返回值说明
 * @example
 * // 使用示例
 * functionName(param)
 */
function functionName(paramName: string): string {
  // 实现
}
```

### 组件规范

Vue 组件需要包含以下注释：

```vue
<script setup lang="ts">
/**
 * 组件名称
 * 
 * @description 组件功能描述
 * @author 作者名
 * @version 版本号
 * 
 * 功能说明：
 * - 功能点1
 * - 功能点2
 */
</script>
```

### Git 提交规范

使用 Conventional Commits 规范：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

示例：

```
feat: 添加用户登录功能

- 实现登录表单
- 添加 JWT 认证
- 集成 Element Plus 表单验证
```

## 提交 Pull Request

1. 创建功能分支

```bash
git checkout -b feature/your-feature-name
```

2. 提交更改

```bash
git add .
git commit -m "feat: 添加新功能"
```

3. 推送到远程

```bash
git push origin feature/your-feature-name
```

4. 在 GitHub 上创建 Pull Request

## 报告问题

在提交 Issue 时，请包含以下信息：

- 问题描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息（浏览器、Node.js 版本等）
- 相关截图（如适用）

## 联系我们

如有任何问题，请通过以下方式联系：

- Email: contact@cloudmo.tech
- GitHub Issues: https://github.com/CloudMoTechnology/CloudMoWebsite/issues

感谢您的贡献！

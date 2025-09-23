<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">白泽-React v1.0.0</h1>

## 平台简介

白泽是一套全部开源的快速开发平台，毫无保留给个人及企业免费使用。本仓库为白泽的React实现版本，参照现有白泽Vue代码从零开始开发，引入了TypeScript及更现代化的前端工程实践，提供了更强的类型安全和开发体验。

## 技术栈

- **核心框架**：[React 18](https://react.dev/) - 用于构建用户界面的JavaScript库
- **开发语言**：[TypeScript](https://www.typescriptlang.org/) - 添加了静态类型系统的JavaScript超集
- **UI组件库**：[Ant Design 5.x](https://ant-design.antgroup.com/index-cn) - 企业级UI设计语言和React组件库
- **构建工具**：[Vite](https://cn.vitejs.dev) - 下一代前端开发与构建工具
- **状态管理**：[Zustand](https://github.com/pmndrs/zustand) - 简单、快速、可扩展的状态管理解决方案
- **路由管理**：[React Router 6](https://reactrouter.com/) - 声明式路由组件
- **HTTP请求**：[Axios](https://axios-http.com/) - 基于Promise的HTTP客户端
- **CSS框架**：[TailwindCSS](https://tailwindcss.com/) - 功能类优先的CSS框架
- **富文本编辑**：[React Quill](https://github.com/zenoamaro/react-quill) - Quill富文本编辑器的React组件
- **工具函数**：[AHooks](https://ahooks.js.org/zh-CN) - 一套高质量可靠的React Hooks库
- **日期处理**：[DayJS](https://day.js.org/) - 轻量级日期处理库

## 开发计划

以下功能正在开发中：

- [✓] 表格显隐列 - 支持自定义显示/隐藏表格列
- [ ] 代码生成 - 代码自动生成工具
- [✓] 页面路由面包屑 - 完善导航路径展示
- [ ] 历史页面tab切换 - 多标签历史页便捷导航
- [ ] 全局搜索跳转 - 快速查找并跳转到指定页面
- [✓] 黑暗模式及换肤 - 支持多种主题切换

## 参与贡献

我们非常欢迎所有开发者参与到白泽-React的开发和改进中！

- 欢迎提交功能需求和改进建议
- 欢迎参与代码开发和问题修复
- 欢迎优化用户体验和界面设计
- 欢迎完善文档和使用示例

如果您有任何想法或建议，请通过Issue、Pull Request或者加入QQ交流群与我们沟通。您的反馈对我们非常重要！

## <p>随手 star ⭐是一种美德。 你们的star就是我的动力</p>

## 内置功能

1. 用户管理：用户是系统操作者，该功能主要完成系统用户配置。
2. 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
3. 岗位管理：配置系统用户所属担任职务。
4. 菜单管理：配置系统菜单，操作权限，按钮权限标识等。
5. 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
6. 字典管理：对系统中经常使用的一些较为固定的数据进行维护。
7. 参数管理：对系统动态配置常用参数。
8. 通知公告：系统通知公告信息发布维护。
9. 登录日志：系统登录日志记录查询包含登录异常。
10. 在线用户：当前系统中活跃用户状态监控。
11. 服务监控：监视当前系统CPU、内存、磁盘等相关信息。
12. 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
13. 系统接口：根据业务代码自动生成相关的API接口文档。
14. 定时任务：在线（添加、修改、删除)任务调度。

## 项目结构

```
.
├── src                        # 源代码
│   ├── api                   # API接口目录
│   ├── assets                # 静态资源文件
│   ├── components            # 全局公共组件
│   ├── hooks                 # 自定义钩子函数
│   ├── layout                # 布局组件
│   ├── pages                 # 页面组件
│   ├── routes                # 路由配置
│   ├── store                 # 全局状态管理(Zustand)
│   ├── types                 # TypeScript类型定义
│   ├── utils                 # 工具函数
│   ├── App.tsx              # 应用入口组件
│   └── main.tsx             # 应用主入口
├── public                     # 静态资源
├── vite                       # Vite配置
├── .env.development           # 开发环境配置
├── .env.production            # 生产环境配置
├── package.json               # 项目依赖
└── vite.config.ts             # Vite配置文件
```

## 前端运行

```bash
# 克隆项目
git clone https://gitee.com/baizeplus/baize-react.git

# 进入项目目录
cd baize-react

# 安装依赖
npm install 或 yarn 或 pnpm install

# 启动服务
npm run dev 或 yarn dev 或 pnpm dev

# 构建生产环境
npm run build:prod 或 yarn build:prod 或 pnpm build:prod

# 前端访问地址 http://localhost:3000
```

## 在线体验

演示地址：http://react.ibaize.vip  
后端代码仓库：[baize](https://gitee.com/baizeplus/baize)  
Vue3前端版本：[baize-vue](https://gitee.com/baizeplus/baize-vue)  
文档地址：https://doc.ibaize.vip

## 交流群

QQ群： [![加入QQ群](https://img.shields.io/badge/83064682-blue.svg)](https://qm.qq.com/cgi-bin/qm/qr?k=rAIw_VQ_blbSQu0J6fApnm5RbAc2CHbp&jump_from=webapi) 点击按钮入群。

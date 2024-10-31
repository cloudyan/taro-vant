# 设计文档

## 组件库设计

### 方案设计

- 项目：使用 pnpm 管理
- 组件：使用 taro 搭建
  - 使用 taro 的跨端能力，实现一套组件代码，多端运行
  - 组件实现方案参考 taroify 组件库
  - UI 样式及交互参考 vant 组件库
- 组件库构建：使用 father or gulp 构建
  - 此处参考 antd-mobile 的构建方案
- 组件库文档：使用 dumi 搭建
- 组件库测试：使用 jest 搭建
- 组件预览：使用 taro-device 运行 npm run dev:h5 做预览
  - 通过 dumi theme 中自定义 buildins/Previewer 对接 taro-device 实现组件 demo 预览
  - 通过 watch 脚本，监听组件库代码变化，自动更新 demo 预览

### 组件库目录结构

使用 pnpm 管理 monorepo 项目架构

```bash
- taro-vant
  - docs
  - taro-device
  - src
    - components
    - utils
    - types
    - index.ts
```

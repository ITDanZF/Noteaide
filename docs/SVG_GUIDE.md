# SVG 图标使用规范

> 本项目使用 `vite-plugin-svgr` 将 SVG 文件作为 React 组件管理，支持 AI 生成自定义图标。

## 技术栈

- **构建工具**: Vite 5 + `vite-plugin-svgr@5.x`
- **UI 框架**: React 19 + Chakra UI v3
- **图标管理**: SVG 源文件集中存放，构建时自动转为 React 组件

## 目录结构

```
src/
├── components/
│   └── icons/                 # 所有业务图标存放于此
│       ├── index.ts           # 统一 re-export
│       ├── add.svg            # AI 生成的 SVG 源文件
│       ├── model-select.svg
│       └── deep-think.svg
├── vite-env.d.ts              # *.svg?react 类型声明
└── ...
```

## 添加新图标的标准流程

### Step 1: AI 生成 SVG

将以下 Prompt 模板交给 AI，描述你需要的图标：

```markdown
请为我生成一个 SVG 图标，要求如下：

1. 输出格式：纯 SVG 文件内容，保存为 `.svg` 文件
2. 文件位置：`src/components/icons/<语义化名称>.svg`
3. 尺寸规范：
   - 普通图标：width="24" height="24" viewBox="0 0 24 24"
   - 复杂图标：width="24" height="24" viewBox="0 0 1024 1024"
4. 颜色规范：
   - 所有需要变色的填充/描边，使用 `currentColor`
   - 不要写死任何色值（如 #000、#fff）
5. 代码规范：
   - 属性使用 kebab-case：stroke-width、stroke-linecap
   - 必须声明 xmlns="http://www.w3.org/2000/svg"
   - 去除多余的 id、class、style
6. 可访问性：
   - 纯装饰性图标：svg 标签添加 `aria-hidden="true"`
   - 有语义功能的：svg 内添加 `<title>功能描述</title>` 作为第一个子元素

图标描述：<在这里描述你要的图标>
```

### Step 2: 保存文件

将 AI 生成的内容保存为 `src/components/icons/<name>.svg`。

### Step 3: 注册导出

在 `src/components/icons/index.ts` 中添加一行：

```ts
export { default as XxxIcon } from './xxx.svg?react';
```

命名规则：
- 采用 **PascalCase** + `Icon` 后缀
- 语义化命名，如 `ModelSelectIcon`、`DeepThinkIcon`
- 避免缩写，如用 `SettingsIcon` 而非 `SetIcon`

### Step 4: 业务组件中使用

```tsx
import { ModelSelectIcon } from '@/components/icons';

<ModelSelectIcon width={16} height={16} />
```

## 使用方式详解

### 统一索引导入（推荐）

适合项目中高频复用的业务图标：

```tsx
import { AddIcon, ModelSelectIcon } from '@/components/icons';

<AddIcon width={20} height={20} />
<ModelSelectIcon width={16} height={16} />
```

### 直接导入（临时/本地使用）

适合某个页面独有的图标，无需注册到统一索引：

```tsx
import MyPageIcon from './assets/my-page-icon.svg?react';

<MyPageIcon width={32} height={32} className="my-class" />
```

### 作为静态资源 URL（背景图等）

去掉 `?react` 后缀，默认导入为图片 URL：

```tsx
import bgUrl from './assets/bg.svg';

<Box backgroundImage={`url(${bgUrl})`} />
```

> **注意**：`public/` 目录下的 SVG 不需要 `?react`，直接通过 `/xxx.svg` 路径引用即可。

## 与 Chakra UI 的配合

### 颜色继承

SVG 使用 `currentColor` 时，会自动继承父级元素的 `color`：

```tsx
import { Box, Button } from '@chakra-ui/react';
import { DeepThinkIcon } from '@/components/icons';

{/* 图标颜色自动变为 teal.400 */}
<Box color="teal.400">
  <DeepThinkIcon width={24} height={24} />
</Box>

{/* Button 内嵌图标 */}
<Button color="white">
  <DeepThinkIcon width={16} height={16} style={{ marginRight: '6px' }} />
  深度思考
</Button>
```

### 响应式尺寸

```tsx
import { Box } from '@chakra-ui/react';
import { AddIcon } from '@/components/icons';

<Box boxSize={{ base: 5, md: 6 }}>
  <AddIcon width="100%" height="100%" />
</Box>
```

## SVG 文件规范

| 规范项 | 要求 |
|--------|------|
| 尺寸 | 统一 `width="24" height="24"`，通过组件 props 控制显示大小 |
| 颜色 | 使用 `currentColor`，禁止硬编码色值 |
| 描边图标 | `fill="none"` + `stroke="currentColor"` + `stroke-width="2"` |
| 填充图标 | `fill="currentColor"` + 去除描边属性 |
| 可访问性 | 装饰性图标加 `aria-hidden="true"`；功能性图标加 `<title>` |
| 代码风格 | 属性 kebab-case，去除无用 id/class/style |

## 示例：两种图标类型

### 描边型（Stroke-based）

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg>
```

### 填充型（Fill-based）

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" fill="currentColor" />
</svg>
```

## 常见问题

### Q: 为什么不用 lucide-react？

lucide-react 适合通用图标，但无法满足高度自定义需求。本项目需要 AI 生成独特的业务图标（如 3D 建模相关的专用图标），因此采用 SVGR 方案：AI 输出 `.svg` 源文件 → 构建时自动转 React 组件。

### Q: SVG 文件放 `src/` 还是 `public/`？

| 场景 | 位置 | 原因 |
|------|------|------|
| 需要通过 `?react` 导入为组件 | `src/components/icons/` | Vite 只会处理 `src/` 内的模块 |
| 作为图片 URL 引用（CSS background、`<img>` src） | `public/` | 无需构建处理，直接复制到产物 |
| favicon | `public/` | 构建前就需要存在的静态资源 |

### Q: 图标太多会导致 `index.ts` 过大吗？

不会。Vite 的 Tree-shaking 会自动剔除未使用的导入，不会增加打包体积。

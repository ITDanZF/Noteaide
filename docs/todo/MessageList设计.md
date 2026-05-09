# MessageList 组件设计文档

## 1. 组件概述

`MessageList` 用于展示用户与 AI（Noteaide）之间的对话历史。位于 `Chat.tsx` 中 `ChatDialog` 输入框的上方。

```
┌────────────────────────────────────┐
│  ┌────────┐                        │
│  │用户头像│ 用户消息（右对齐）       │
│  └────────┘                        │
│                        ┌────────┐  │
│         AI消息（左对齐） │AI头像  │  │
│                        └────────┘  │
│  ┌────────┐                        │
│  │用户头像│ 用户消息               │
│  └────────┘                        │
│           ...                      │
│                        ┌──────┐    │
│           AI思考中...  │🤖   │    │
│                        └──────┘    │
├────────────────────────────────────┤
│         ChatDialog (输入框)         │
└────────────────────────────────────┘
```

---

## 2. 数据结构

### Message 接口

```ts
interface Message {
  id: string;                    // 唯一标识，用于 key 和操作
  role: 'user' | 'assistant';    // 说话人身份
  content: string;               // 消息文本内容（Markdown 格式）
  timestamp: number;             // 发送时间戳
  status?: 'loading' | 'error' | 'success';  // 消息状态（AI回复时有用）
}
```

### 状态管理

| 状态 | 类型 | 说明 |
|---|---|---|
| `messages` | `Message[]` | 消息列表数组 |
| `isLoading` | `boolean` | AI 是否正在生成回复 |

---

## 3. 布局结构

### 外层容器（Chat.tsx 中）

```tsx
<Flex direction="column" width="100%" height="100vh">
  {/* 消息列表区域 */}
  <Box flex="1" overflowY="auto" width="100%">
    <Flex justify="center" width="100%" py="4">
      <Box maxWidth="700px" width="100%">
        <MessageList />
      </Box>
    </Flex>
  </Box>

  {/* 底部输入框 */}
  <Flex justify="center" width="100%" pb="80px">
    <ChatDialog />
  </Flex>
</Flex>
```

### MessageList 内部布局

- 使用 `VStack` 纵向排列每条消息
- 每条消息用 `Flex` 横向排列（头像 + 气泡）
- 用户消息：头像在右，气泡在右
- AI 消息：头像在左，气泡在左

---

## 4. 关键设计点

### 4.1 消息气泡样式

| 属性 | 用户消息 | AI 消息 |
|---|---|---|
| 背景色 | `blue.500`（品牌色） | `gray.700`（深色） |
| 文字色 | `white` | `white` |
| 对齐 | `alignSelf="flex-end"` | `alignSelf="flex-start"` |
| 最大宽度 | `maxWidth="80%"` | `maxWidth="80%"` |
| 圆角 | `borderRadius="lg"` | `borderRadius="lg"` |

### 4.2 头像

```tsx
// 用户头像
<Avatar size="sm" name="User" src={userAvatarUrl} />

// AI 头像（使用项目 logo 或固定样式）
<Avatar size="sm" name="Noteaide" bg="blue.500" />
```

### 4.3 Markdown 渲染

AI 回复通常包含代码块、列表、加粗等格式，必须使用 Markdown 渲染器：

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {message.content}
</ReactMarkdown>
```

**支持格式：**
- 标题 `# H1` `## H2`
- 加粗 `**text**`
- 列表 `- item`
- 链接 `[text](url)`
- 代码块 ` ```js code ``` `
- 表格（GFM）
- 删除线 `~~text~~`

### 4.4 代码块语法高亮

```tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// 在 ReactMarkdown 的 components 属性中自定义 code 渲染
const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>{children}</code>
    );
  }
};

<ReactMarkdown components={components}>
  {content}
</ReactMarkdown>
```

### 4.5 滚动行为

| 场景 | 行为 |
|---|---|
| 用户发送新消息 | 自动滚动到底部 |
| AI 流式回复中 | 实时滚动到底部 |
| 用户手动上滑翻看历史 | **停止自动滚动**，避免打断阅读 |

实现：

```tsx
const bottomRef = useRef<HTMLDivElement>(null);
const [autoScroll, setAutoScroll] = useState(true);

useEffect(() => {
  if (autoScroll) {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

// 监听滚动事件，用户手动上滑时关闭 autoScroll
```

### 4.6 加载/思考状态

AI 回复需要时间，需要视觉反馈：

```tsx
// 方案 A：简单文字 + 动画点
<Text color="gray.400">思考中<Fade in>...</Fade></Text>

// 方案 B：打字机效果（项目已有 typeit-react）
import { TypeIt } from 'typeit-react';
<TypeIt>正在思考...</TypeIt>
```

---

## 5. 第三方库

### 必须安装

```bash
npm install react-markdown remark-gfm react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

| 库 | 用途 |
|---|---|
| `react-markdown` | 渲染 Markdown 内容 |
| `remark-gfm` | GitHub 风格 Markdown 插件（表格、删除线等）|
| `react-syntax-highlighter` | 代码块语法高亮 |

### 项目已有（无需安装）

| 库 | 用途 |
|---|---|
| `typeit-react` | 打字机效果动画 |
| `@chakra-ui/react` | UI 组件（Avatar、Box、Flex 等）|

### 不需要安装

| 需求 | 替代方案 |
|---|---|
| ID 生成 | 用 `crypto.randomUUID()` 或自增计数器 |
| 时间格式化 | 用原生 `Intl.RelativeTimeFormat` |

---

## 6. Props 设计

### 方案 A：MessageList 自管理状态（推荐）

通过 `useImperativeHandle` 暴露方法给父组件：

```tsx
interface MessageListRef {
  addUserMessage: (content: string) => void;
  addAssistantMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

// Chat.tsx 中使用
const messageListRef = useRef<MessageListRef>(null);
<MessageList ref={messageListRef} />
```

**优点：** 组件独立，复用性强  
**缺点：** 需要通过 ref 跨组件通信

### 方案 B：状态提升到 Chat.tsx

```tsx
interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

// Chat.tsx
const [messages, setMessages] = useState<Message[]>([]);
<MessageList messages={messages} isLoading={isLoading} />
```

**优点：** 数据流清晰，容易扩展（如持久化到 localStorage）  
**缺点：** Chat.tsx 会变臃肿

---

## 7. 完整组件骨架

```tsx
import { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Avatar, VStack } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  status?: 'loading' | 'error' | 'success';
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter language={match[1]} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>{children}</code>
      );
    }
  };

  return (
    <VStack gap="4" align="stretch" width="100%">
      {messages.map((msg) => (
        <Flex
          key={msg.id}
          justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
          gap="2"
        >
          {msg.role === 'assistant' && <Avatar size="sm" name="AI" />}

          <Box
            maxWidth="80%"
            bg={msg.role === 'user' ? 'blue.500' : 'gray.700'}
            color="white"
            borderRadius="lg"
            px="4"
            py="2"
          >
            {msg.role === 'assistant' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {msg.content}
              </ReactMarkdown>
            ) : (
              <Text>{msg.content}</Text>
            )}
          </Box>

          {msg.role === 'user' && <Avatar size="sm" name="Me" />}
        </Flex>
      ))}

      {/* AI 思考中 */}
      {isLoading && (
        <Flex justify="flex-start" gap="2">
          <Avatar size="sm" name="AI" />
          <Box bg="gray.700" color="gray.400" borderRadius="lg" px="4" py="2">
            <Text>思考中...</Text>
          </Box>
        </Flex>
      )}

      {/* 底部锚点，用于自动滚动 */}
      <div ref={bottomRef} />
    </VStack>
  );
}
```

---

## 8. 后续可扩展功能

| 功能 | 实现思路 |
|---|---|
| **复制消息** | 消息气泡 hover 显示"复制"按钮，用 `navigator.clipboard.writeText` |
| **重新生成** | AI 消息旁加"重新生成"图标按钮，重新调用 API |
| **删除单条** | 每条消息右上角显示删除图标 |
| **清空对话** | 顶部工具栏加"清空"按钮，重置 `messages` 数组 |
| **导出对话** | 将 `messages` 导出为 Markdown / JSON 文件 |
| **消息搜索** | 在消息列表上方加搜索框，过滤 `messages` |
| **图片消息** | 扩展 `Message` 接口支持 `imageUrl` 字段 |

---

## 9. 文件位置

```
src/pages/AiDraw/
├── Chat.tsx                 # 已存在，包含 MessageList + ChatDialog 布局
├── MessageList.tsx          # 新增：消息列表组件
└── DialogBox/
    ├── ChatDialog.tsx       # 已存在，输入框
    ├── ChatDialogFun.tsx    # 已存在，功能按钮
    └── ChatDialogFun.tsx    # 已存在
```

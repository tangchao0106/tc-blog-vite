---
title: 理解 Token —— AI 大模型的基本计价与计长单位
author: 唐超
date: '2024-01-01'
---

# 理解 Token —— AI 大模型的基本计价与计长单位

## 什么是 Token？

**Token（令牌/词元）** 是大语言模型（LLM）处理文本的最小语义单元。它不是"字"也不是"词"，而是介于两者之间的一个概念。

简单来说：**模型看到的不是汉字，而是一串数字 ID，每个 ID 对应一个 token。**

```
输入文本："今天天气真好"
         ↓ Tokenizer 分词
Token序列: ["今天", "天气", "真", "好"]
         ↓ 映射到词表 ID
数字序列: [2341, 5832, 892, 371]
```

## 为什么 Token 很重要？

### 1. 计费单位

所有 LLM API 都按 token 计费：

| 模型 | 输入价格 (每百万 token) | 输出价格 (每百万 token) |
|------|------------------------|------------------------|
| GPT-4o | $2.50 | $10.00 |
| GPT-4 Turbo | $10.00 | $30.00 |
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| DeepSeek V3 | ¥1.00 | ¥2.00 |

### 2. 上下文窗口限制

每个模型有最大上下文窗口（context window），以 token 为单位：

| 模型 | 上下文窗口 |
|------|-----------|
| GPT-4o | 128K tokens |
| Claude 3.5 Sonnet | 200K tokens |
| Gemini 1.5 Pro | 1M tokens |
| DeepSeek V3 | 128K tokens |

**超过限制的输入会被截断，或者直接报错。**

### 3. 生成速度

模型生成速度通常以 tokens/s 衡量。理解 token 有助于预估响应时间和成本。

## Token 的切分方式

### BPE（Byte Pair Encoding）

目前最主流的分词算法，GPT 系列、Claude 等都在使用。

**核心思想：** 高频词作为整体保留，低频词拆成子词单元。

```
"tokenization" → ["token", "ization"]
"unbelievable" → ["un", "believe", "able"]
"ChatGPT很强大" → ["Chat", "G", "PT", "很", "强大"]
```

### 中文 Token 的特点

中文分词和英文有显著差异：

- **英文**：1 token ≈ 0.75 个单词，1 个单词 ≈ 1.3 tokens
- **中文**：1 token ≈ 1.5～2 个汉字，1 个汉字 ≈ 0.5～0.7 tokens

这意味着：

```
"hello world"          → 2 tokens（空格分隔，天然优势）
"你好世界"              → 3～4 tokens（每个词可能需要多个 token）
```

**中文在 token 消耗上通常比英文"贵"1.5～2 倍。** 同样的意思用英文表达，消耗的 token 更少。

## Token 估算经验法则

### 快速估算

| 语言 | 估算公式 |
|------|---------|
| 英文 | 1000 tokens ≈ 750 个单词 |
| 中文 | 1000 tokens ≈ 500～700 个汉字 |
| 代码 | 1000 tokens ≈ 150～200 行代码 |
| 混合中英文 | 难以精确估算，建议用 tokenizer 工具 |

### 实用换算

- 一本 10 万字的书 ≈ 15～20 万 tokens
- 一篇 2000 字的技术文章 ≈ 3000～4000 tokens
- 一个中等规模的 React 组件文件 ≈ 500～1500 tokens

## 编程中的 Token 视角

### 1. 控制 Prompt 长度

```python
# 粗略估算 token 数量（中文）
def estimate_tokens_cn(text: str) -> int:
    """中文文本粗略估算：每 1.5 个字符约 1 token"""
    return len(text) // 1.5

# 使用 tiktoken 精确计算
import tiktoken

encoding = tiktoken.encoding_for_model("gpt-4o")
tokens = encoding.encode("你的文本内容")
print(f"Token count: {len(tokens)}")
```

### 2. 长对话管理

当对话历史超过上下文窗口时，需要做截断策略：

```python
MAX_TOKENS = 128000
RESERVE_FOR_OUTPUT = 4096

# 滑动窗口只保留最近的对话
while count_tokens(messages) > MAX_TOKENS - RESERVE_FOR_OUTPUT:
    messages.pop(0)  # 丢弃最早的消息
```

### 3. 流式输出的 Token 体验

```javascript
// SSE 流式接收，每收到一个 token 就渲染
const response = await fetch('/api/chat', { method: 'POST', body: data })
const reader = response.body.getReader()

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  // value 对应 1 个或多个新 token
  appendToUI(decodeText(value))
}
```

## 理解 Token 的实战意义

1. **省钱**：精简 prompt，减少冗余指令，中文场景可考虑关键部分用英文描述
2. **避坑**：知道自己对话是否接近上下文上限，避免关键信息被截断
3. **调优**：理解 RAG 系统中 chunk size 与 token 的关系，选择合理的切片策略
4. **选模型**：对比不同模型的定价和上下文窗口，结合 token 效率做决策

## 总结

> Token 是 LLM 的"计价货币"和"长度单位"。
>
> 理解 token 的分词逻辑、估算方法和成本模型，是使用大模型的基础功。
> 中文开发者尤其要注意中文相比英文的 token 消耗劣势。

---

*下一篇：深入 Tokenizer —— BPE 算法原理解析*

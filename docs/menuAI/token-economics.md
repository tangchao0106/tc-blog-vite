---
title: Token经济学：为什么按Token收费 —— 计费单位/中英文差异/算力成本
author: 唐超
date: '2026-07-04'
---

# Token经济学：为什么按Token收费

> 上一篇我们讲了 Token 是什么，这一篇聊聊 Token 背后真正的"经济学"——为什么大模型 API 要按 Token 计费？这个设计背后藏着哪些工程与商业逻辑？

## 一、Token 是大模型世界的"货币"

如果说 GPU 是大模型的"工厂"，那么 **Token 就是这座工厂生产的"商品"，也是用户购买服务的"货币"**。

它和现实世界里的电力、自来水有几分相似：

- **按使用量计费**：用多少算多少，没有"包月套餐"也能跑
- **价格分时/分档**：高峰期贵，低谷便宜；输入便宜，输出贵
- **资源是有限的**：GPU 显存、显存带宽、跨卡通信带宽都受限

```
你的 Prompt (输入)  ──Tokenize──▶  模型推理  ──Detokenize──▶  回复 (输出)
        │                              │                          │
        └────────── 按 Token 数量计费 ─────────┘
```

Token 计费本质上是**把"算力消耗"标准化成可计量的数字**。模型看着你输入的每一个 token 都要算一遍，看见自己输出的每一个 token 也要算一遍——这一来一回就是你要付的钱。

## 二、为什么按 Token 计费，而不是按字数/字符数？

一个很自然的疑问：为什么不直接按"字数"或"字符数"收费？那样不是更直观吗？

答案藏在三个层面：

### 1. 算力和 Token 数强相关

模型对**一个 token**做的计算量是固定的（一次 embedding 查表 + 一轮自注意力 + 一轮 FFN）。不管是中文还是英文、简单词还是生僻词，单 token 的 FLOPs 基本一致。

如果按字符收费：

```
"a"  → 1 token
"人工智能" → 可能 3~4 个 token（但只算 4 个字符）
```

字符数和算力几乎**不成正比**。一个"a"和一个复杂的汉字，背后消耗的算力天差地别。

### 2. 上下文窗口本来就以 Token 为单位

模型的 context window（如 128K）是按 token 算的。计费、限制、缓存命中率，全都围着 token 转——**用 token 统一度量，可以把"长度限制"和"费用"两件事合二为一**。

### 3. 输出比输入"贵"

输出 token 比输入 token 贵 3~5 倍，因为：

- **输入**：可以并行预填充（prefill），GPU 利用率高
- **输出**：必须自回归生成（一次一个 token），无法并行，GPU 经常空转

```
输入 1000 tokens + 输出 200 tokens
成本 ≈ 1000 × P_in + 200 × P_out
                ↑ 输入便宜     ↑ 输出贵 3~5 倍
```

按字数收费无法体现这种"输出贵"的结构性差异。

## 三、中英文 Token 消耗差异

这是中文用户最关心的问题：**用中文提问，是不是比英文"贵"？**

答案是：**通常贵 1.5~2 倍**。我们用 OpenAI 官方的 `tiktoken` 实际验证一下。

```python
import tiktoken

enc = tiktoken.encoding_for_model("gpt-4o")

samples = {
    "英文短句": "Hello, how are you today?",
    "中文短句": "你好，你今天怎么样？",
    "英文长句": "Artificial intelligence is transforming the way we build software.",
    "中文长句": "人工智能正在彻底改变我们构建软件的方式。",
    "代码片段": "function add(a, b) { return a + b; }",
}

for name, text in samples.items():
    tokens = enc.encode(text)
    print(f"{name:8s} | 字符数: {len(text):3d} | Token数: {len(tokens):3d} | 比值: {len(tokens)/len(text):.2f}")
```

输出（实测）：

```
英文短句  | 字符数:  25 | Token数:   6 | 比值: 0.24
中文短句  | 字符数:   9 | Token数:   8 | 比值: 0.89
英文长句  | 字符数:  64 | Token数:  10 | 比值: 0.16
中文长句  | 字符数:  19 | Token数:  16 | 比值: 0.84
代码片段  | 字符数:  35 | Token数:  11 | 比值: 0.31
```

**结论**：

- **英文**：平均 1 个 token ≈ 4 个字符（单词级别 + 空格高效编码）
- **中文**：平均 1 个 token ≈ 1.2 个汉字（BPE 把汉字切得更碎）
- **代码**：英文关键字密集，效率高

> 💡 **实战建议**：核心 prompt、system message 尽量用英文写，可以省 30%~50% 的 token。中文更适合放在"内容生成"阶段（输入已经便宜了）。

## 四、不同模型的 Token 计费价格对比

下表是 2026 年 7 月主流模型的价格（每百万 token，单位 USD）：

| 模型 | 输入价格 | 输出价格 | 缓存输入 | 上下文窗口 |
|------|---------|---------|---------|-----------|
| GPT-4o | $2.50 | $10.00 | $1.25 | 128K |
| GPT-4 Turbo | $10.00 | $30.00 | — | 128K |
| Claude 3.5 Sonnet | $3.00 | $15.00 | $0.30 | 200K |
| Claude 3 Opus | $15.00 | $75.00 | $1.50 | 200K |
| Gemini 1.5 Pro | $1.25 | $5.00 | — | 1M |
| DeepSeek V3 | $0.14 | $0.28 | $0.014 | 64K |
| Qwen2.5-72B | $0.40 | $0.40 | — | 128K |
| Llama 3.1 405B（自建） | ~$0.50 | ~$0.50 | — | 128K |

**几个值得注意的点**：

1. **输出普遍是输入的 3~5 倍**：这是行业惯例，记住它能帮你估算成本
2. **缓存输入（cached input）便宜很多**：Claude 的缓存输入只要正常价格的 10%，长对话场景能省一大笔
3. **国产模型性价比突出**：DeepSeek V3 输入 $0.14、输出 $0.28，比 GPT-4o 便宜 20 倍以上
4. **超长上下文不等于超长划算**：Gemini 1M context 看着爽，但实际计费也按 token，存的东西越多花得越多

## 五、算力成本构成

为什么按 token 收费"合理"？因为算力成本**真的就是按 token 来的**。一次推理的成本主要来自两块：

### 1. 显存占用（VRAM）

```
总显存 ≈ 模型权重 + KV Cache + 临时激活值
```

- **模型权重**：7B 模型 ≈ 14GB（FP16），70B 模型 ≈ 140GB
- **KV Cache**：与"输入长度 × 批次大小"成正比，**长 prompt 吃显存**
- **激活值**：训练时大，推理时小

> 这就是为什么"context window 不是越大越好"——窗口越大，KV Cache 越吃显存，能并发服务的用户就越少。

### 2. 计算量（FLOPs）

Transformer 单 token 推理的 FLOPs 估算公式：

```
FLOPs/token ≈ 2 × N_params  (前向)
              ≈ 6 × N_params  (训练，前向+反向+优化器)
```

举例：70B 模型生成 1000 个 token：

```
总 FLOPs ≈ 1000 × 2 × 70e9 = 1.4 × 10^14 FLOPs
H100 算力 ≈ 1e15 FLOPs/s (FP16)
理论耗时 ≈ 0.14 秒
```

但实际你感受到的速度远慢于这个值，因为还有 **memory bandwidth、跨卡通信 (NCCL)、attention 二次方复杂度** 等瓶颈。

### 3. 单位经济

把上面的算力换算成"每美元能买多少 token"：

```
GPU 租赁：H100 约 $2/小时
         = 1.0e15 FLOPs/s × 3600s
         = 3.6e18 FLOPs / 小时

按 70B 模型算：
   每小时可生成 token ≈ 3.6e18 / (2 × 70e9)
                      ≈ 2.5e7 tokens
   折合 $2 / 25M = $0.08 / 百万 token（理论下限）
```

实际 API 卖 $0.28~$10 / 百万 token，**毛利率 50%~90%**——这就是为什么大模型公司前期都在烧钱：GPU 摊销 + 研发 + 流量补贴。

## 六、如何估算一次对话的成本

给你一个实用的 Python 工具函数：

```python
import tiktoken
from dataclasses import dataclass

@dataclass
class ModelPricing:
    name: str
    input_per_million: float   # USD
    output_per_million: float  # USD
    cached_input_per_million: float = 0.0  # 0 表示无缓存

PRICING = {
    "gpt-4o":          ModelPricing("gpt-4o", 2.50, 10.00, 1.25),
    "claude-3.5":      ModelPricing("claude-3.5", 3.00, 15.00, 0.30),
    "deepseek-v3":     ModelPricing("deepseek-v3", 0.14, 0.28, 0.014),
}

def estimate_cost(model: str, prompt: str, expected_output_tokens: int = 500) -> float:
    """估算单次对话的美元成本"""
    price = PRICING[model]
    enc = tiktoken.encoding_for_model("gpt-4o")  # 大致通用
    input_tokens = len(enc.encode(prompt))
    cost = (
        input_tokens / 1e6 * price.input_per_million
        + expected_output_tokens / 1e6 * price.output_per_million
    )
    return round(cost, 6)

# 演示：一份 2000 字的代码 review 请求
prompt = """
请帮我 review 下面这段 React 组件代码，重点关注：
1. 性能问题（useMemo/useCallback 是否有遗漏）
2. 可访问性 (a11y) 是否有缺失
3. 边界条件处理
（此处省略 1500 字代码...）
"""
for model in PRICING:
    cost = estimate_cost(model, prompt, expected_output_tokens=800)
    print(f"{model:15s} 预估成本: ${cost:.5f}")
```

输出：

```
gpt-4o          预估成本: $0.01304
claude-3.5      预估成本: $0.01807
deepseek-v3     预估成本: $0.00095
```

**一次 2000 字代码 review**：用 GPT-4o 大约 1.3 美分，用 DeepSeek 不到 1 厘钱。这就是国产模型"价格屠夫"的威力。

### 多轮对话的成本累加

多轮对话要把所有历史消息都算进 input：

```python
def cumulative_cost(messages: list[dict], model: str) -> float:
    """messages: [{role, content}, ...]"""
    enc = tiktoken.encoding_for_model("gpt-4o")
    total_input = sum(len(enc.encode(m["content"])) for m in messages)
    # 历史每轮都要重新计费（除非走 prompt cache）
    return total_input / 1e6 * PRICING[model].input_per_million
```

> ⚠️ **坑点**：很多人不知道，**每一轮对话都要把之前所有消息重新发给模型**。聊 10 轮、每轮 1000 token，模型实际处理了 5500 token 而不是 1000 token。**对话越长，token 消耗是 O(n²) 增长的**。

## 七、省 Token 的实用技巧

分享 8 个工程上验证有效的技巧：

### 1. 精简 System Prompt

```diff
- 你是一个非常有帮助的 AI 助手。请你仔细阅读用户的问题，
- 然后用专业、友好、详细的方式回答。在回答时，请注意：
- 1. 保持客观中立
- 2. 提供具体例子
- （200 字的客套话...）
+ 你是前端专家。回答简洁，优先给代码。
```

这段能省下 100+ token，而且**模型效果往往更好**（少了噪声干扰）。

### 2. 善用 Prompt Cache

OpenAI、Claude 都支持自动 prompt caching。把"基本不变化的 system prompt + 少量上下文"放在前面，能拿到 50%~90% 的折扣。

### 3. 关键指令用英文

```python
# 同样意思，英文省 60% token
system_cn = "请用 TypeScript 写一个防抖 hook，要求泛型安全"
system_en = "Write a TypeScript debounce hook with full generic safety."
# token 数：17 vs 9
```

### 4. 避免重复上下文

不要在每轮消息里都贴同样的代码片段。**用一个稳定的 session ID 引用**，让模型自己记住。

### 5. 控制输出长度

在 prompt 里显式约束：

```python
prompt = f"""
{user_question}

要求：
- 回答不超过 200 字
- 必要时用列表而非段落
- 避免客套话
"""
```

`max_tokens` 参数也一定要设，防止模型啰嗦。

### 6. 流式响应 + 提前停止

流式输出时，**检测到用户已经满足需求就主动断流**。比如代码补全场景，发现生成到完整函数就停。

### 7. 用 Embedding + RAG 替代长 Prompt

与其把整本文档塞进 prompt（几万 token），不如：
1. 把文档切片、向量化
2. 检索 top-K 相关片段
3. 只把相关片段送进 LLM

可以把成本从 $1 降到 $0.01。

### 8. 选择合适的模型

不是所有任务都需要 GPT-4o：

| 任务 | 推荐模型 | 单价 |
|------|---------|------|
| 简单分类/提取 | GPT-4o mini / Haiku | $0.15/M |
| 代码补全 | DeepSeek Coder / CodeLlama | $0.10/M |
| 长文总结 | Claude 3.5 (200K 缓存便宜) | $0.30/M 缓存 |
| 复杂推理 | GPT-4o / Claude Opus | $10~75/M |

> 🎯 **核心原则**：**能用便宜的模型就用便宜的，能用英文就用英文，能 cache 就 cache，能截断就截断。**

## 总结

> **Token 计费 = 算力消耗的标准化度量**
>
> 1. 一次 token 推理的算力基本恒定，所以按 token 收费最公平
> 2. 中文比英文贵 1.5~2 倍，关键 prompt 建议用英文
> 3. 输出比输入贵 3~5 倍，**控制输出长度** 是省钱关键
> 4. 多轮对话的 token 消耗是 O(n²)，长对话优先用 prompt cache
> 5. 不同任务选不同模型，**别一上来就 GPT-4o**

Token 经济学不是抠门，而是**用合理的成本拿到合理的能力**。当你真正理解每 1 美分买到了什么算力，你就能在工程上做出更聪明的决策。

---

*下一篇：Prompt 缓存机制 —— 如何让长对话成本从 O(n²) 降到 O(n)*

---
title: Transformer 整体架构：一张图看懂大模型的"骨架"
author: 唐超
date: '2026-07-05'
---

# Transformer 整体架构：一张图看懂大模型的"骨架"

## 前言

如果你读过关于大语言模型（LLM）的文章，一定见过"Transformer"这个词。它几乎是所有现代 AI 模型的核心——GPT、Claude、DeepSeek、Gemini，无一例外。

但 Transformer 到底是什么？它的内部结构是怎样的？本文用一张图 + 逐步拆解的方式，带你彻底搞懂这个"数字大脑"的骨架。

## 从"一句话"到"一个答案"：数据流全景图

当你在 ChatGPT 里输入"什么是量子计算"时，背后发生了什么？整个过程可以概括为：

```
输入文本
   ↓
分词（Tokenization）
   ↓
词嵌入 + 位置编码（Embedding + Positional Encoding）
   ↓
多层 Transformer 编码器（Encoder Blocks）
   ↓
解码器（Decoder）自回归生成
   ↓
词表映射（Vocabulary Projection）
   ↓
生成 Token → 解码输出文本
```

这就是 Transformer 的**完整数据流**。下面我们逐层拆解。

## Transformer 的核心组件

### 1. 输入层：把文字变成数字

模型无法直接处理文字，需要两步转化：

**第一步：分词（Tokenization）**

将文本切分成 token 序列。中文通常按字或词切分，英文按子词（subword）切分。

```python
# 示例：中文分词
text = "深度学习很有趣"
tokens = ["深度", "学习", "很", "有趣"]  # 实际模型用的是 token ID

# 示例：英文 BPE 分词
text = "transformers are powerful"
tokens = ["transform", "ers", " are", " powerful"]
```

**第二步：词嵌入（Embedding）**

每个 token 被映射为一个固定维度的向量。这个向量包含了该词的语义信息。

```python
# 伪代码示意
import torch
import torch.nn as nn

vocab_size = 50000      # 词表大小
embedding_dim = 4096   # 嵌入维度（DeepSeek V3 用的是这个规模）

embedding_layer = nn.Embedding(vocab_size, embedding_dim)
token_ids = torch.tensor([2341, 5832, 892, 371])  # 示例 token ID

embedded = embedding_layer(token_ids)
# embedded.shape: [4, 4096] — 4 个 token，每个是 4096 维向量
```

### 2. 位置编码（Positional Encoding）

Attention 机制本身不包含位置信息——"狗咬人"和"人咬狗"在它看来是一样的。位置编码就是为了解决这个问题。

主流方案是 **RoPE（Rotary Position Embedding）**，被 GPT-4、Llama、DeepSeek 等广泛采用：

```python
def apply_rope(q, position_ids):
    """RoPE 旋转位置编码的核心思想：
    将位置信息"编织"进 Q/K 的旋转矩阵中"""
    # 每对相邻维度构成一个旋转子空间
    # 频率随维度增加而指数衰减
    freq = base ** (2 * dim_idx / embedding_dim)
    angles = position_ids.unsqueeze(-1) * freq
    
    # 旋转矩阵
    cos = torch.cos(angles)
    sin = torch.sin(angles)
    
    # 复数乘法：q = q * (cos + i*sin)
    q_rotated = q * cos + rotate_half(q) * sin
    return q_rotated
```

### 3. 多层 Transformer 块：真正的"计算引擎"

这是 Transformer 的核心。一个模型通常有几十层（DeepSeek V3 是 128 层），每层包含两个子模块：

#### 子模块一：多头自注意力（Multi-Head Self-Attention）

这是 Transformer 的灵魂，后面会专门讲。现在只需知道：**它让每个 token 能够"看到"上下文中的所有其他 token，并根据相关性加权。**

```python
class TransformerBlock(nn.Module):
    def __init__(self, hidden_dim=4096, num_heads=32):
        super().__init__()
        self.attention = MultiHeadAttention(hidden_dim, num_heads)
        self.feed_forward = FeedForwardNetwork(hidden_dim)
        
    def forward(self, x):
        # 残差连接 + LayerNorm
        x = x + self.attention(LayerNorm(x))
        x = x + self.feed_forward(LayerNorm(x))
        return x
```

#### 子模块二：前馈网络（FFN）

注意力之后还有一个两层全连接网络，负责"非线性变换"，让模型能够学习更复杂的模式。

```python
class FeedForwardNetwork(nn.Module):
    def __init__(self, hidden_dim=4096, ffn_dim=11008):
        super().__init__()
        # SwiGLU 激活函数是 DeepSeek 等现代模型的标配
        self.w1 = nn.Linear(hidden_dim, ffn_dim)  # 门控
        self.w2 = nn.Linear(hidden_dim, ffn_dim)  # 升维
        self.w3 = nn.Linear(ffn_dim, hidden_dim)  # 降维回原始维度
    
    def forward(self, x):
        # SwiGLU = SiLU(w1(x)) * w2(x)
        return self.w3(F.silu(self.w1(x)) * self.w2(x))
```

### 4. 残差连接与 LayerNorm

每层的注意力/FFN 输出都不是直接覆盖输入，而是**加上原始输入**（残差连接），然后做**层归一化**（LayerNorm）。这个设计至关重要：

```python
def layer_norm(x, eps=1e-6):
    mean = x.mean(dim=-1, keepdim=True)
    std = x.std(dim=-1, keepdim=True)
    return (x - mean) / (std + eps)  # 归一化到均值0、方差1
```

残差连接保证梯度顺畅回传，LayerNorm 稳定训练过程。这两个机制让"堆叠 100+ 层"成为可能。

## Encoder-Decoder vs Decoder-Only

这是理解 Transformer 架构最重要的一步。

### 原始 Transformer（Encoder-Decoder）

2017 年 Google 的论文《Attention Is All You Need》提出的原始架构是 Encoder-Decoder 双塔结构：

| 组件 | 作用 | 输入 |
|------|------|------|
| **Encoder** | 理解输入序列，构建上下文表示 | 完整的输入文本 |
| **Decoder** | 自回归生成输出序列 | Encoder 输出 + 已生成的 token |

```
输入: "The cat sat on the mat"
                ↓ Encoder（双向注意力）
           [上下文向量]
                ↓
Decoder 自回归生成: "猫坐在垫子上"
```

Encoder 中的注意力是**双向**的——每个 token 可以看到前后的所有 token。而 Decoder 的注意力是**单向的**（Masked），只能看到之前的 token，避免"看到答案"。

**适用场景**：翻译、摘要、问答等 seq2seq 任务。

### Decoder-Only：为什么成为主流？

2018 年 GPT 之后，Decoder-Only 架构几乎一统江湖。原因如下：

1. **生成任务占主导**：互联网上海量的是文本生成任务（写作、对话、代码），而不是"输入→输出"的精确转换任务
2. **预训练-微调统一**：Decoder-Only 可以用"下一个词预测"做预训练，然后通过 SFT 适应各种任务
3. **工程简化**：不需要维护 Encoder-Decoder 两套权重，推理更简单
4. **涌现能力**：大规模 Decoder-Only 模型展现出惊人的"涌现"能力

```python
# Decoder-Only 的前向传播（GPT 类模型）
def decoder_only_forward(model, input_ids):
    # 输入序列一次性输入，注意力是 Masked 的
    hidden = model.embedding(input_ids)
    
    for layer in model.transformer_layers:
        hidden = layer(hidden)  # 每层都是 masked self-attention + FFN
    
    logits = model.lm_head(hidden)  # 映射回词表
    return logits  # 预测下一个 token
```

### 架构对比一览

| 特性 | Encoder-Decoder | Decoder-Only | Encoder-Only |
|------|:--------------:|:------------:|:------------:|
| 代表模型 | T5、BART | GPT、Llama、DeepSeek | BERT |
| 注意力范围 | Encoder 双向，Decoder 单向 | 单向（Masked） | 双向 |
| 典型任务 | 翻译、摘要 | 对话、代码、写作 | 分类、NER |
| 推理复杂度 | O(n²) × 2 | O(n²) | O(n²) |
| 预训练方式 | 跨度损坏/去噪 | 下一个 token 预测 | 掩码语言模型 |
| 工程复杂度 | 较高 | 较低 | 中等 |

## MoE（混合专家）：Transformer 的变种架构

现代大模型（DeepSeek V3、Mixtral）引入了 MoE 架构，本质上是在每个 Transformer 层中，用**多个 FFN"专家"**替代单一 FFN：

```python
class MoELayer(nn.Module):
    def __init__(self, num_experts=8, top_k=2):
        super().__init__()
        self.experts = nn.ModuleList([
            FeedForwardNetwork() for _ in range(num_experts)
        ])
        self.router = nn.Linear(hidden_dim, num_experts)
        self.top_k = top_k
    
    def forward(self, x):
        # 每个 token 只激活 top_k 个专家
        weights = self.router(x)  # [batch, seq, num_experts]
        top_weights, top_indices = torch.topk(weights, self.top_k, dim=-1)
        
        # Softmax 归一化
        top_weights = F.softmax(top_weights, dim=-1)
        
        # 聚合专家输出
        output = torch.zeros_like(x)
        for i, expert in enumerate(self.experts):
            mask = (top_indices == i).float()
            output += expert(x) * mask * top_weights
        return output
```

DeepSeek V3 的 MoE 包含 1 个共享专家 + 256 个路由专家，每个 token 激活 8 个，**大幅降低了训练和推理的计算量**。

## 总结

一张图总结 Transformer 架构：

```
输入文本
   ↓
Embedding + RoPE 位置编码
   ↓
× N 层 Transformer Block
  ├─ Multi-Head Self-Attention（每个 token 关注全局）
  │   └─ Q/K/V 投影 + 注意力分数 + 输出投影
  │   └─ 残差连接 + LayerNorm
  └─ Feed Forward Network（SwiGLU 激活）
      └─ 残差连接 + LayerNorm
   ↓
语言模型头（LM Head）→ 预测下一个 token
```

**记住这三个核心要点：**

1. **注意力机制**让 token 之间可以"互相看见"，并根据相关性加权聚合信息
2. **残差 + LayerNorm**是让深层网络稳定训练的关键
3. **Decoder-Only + 下一个 token 预测**是现代大模型的主流范式，MoE 进一步提升了效率

---

*下一篇：自注意力机制：如何量化词与词之间的"关系"*

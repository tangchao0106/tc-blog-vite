---
title: 多头注意力：从"一个角度"到"多个角度" — 多头拆分/MLA创新
author: 唐超
date: '2026-07-06'
---

# 多头注意力：从"一个角度"到"多个角度"

## 为什么需要"多头"？

在前文《自注意力机制》中，我们介绍了单头注意力（Single-Head Attention）的工作原理：通过 Query、Key、Value 三组向量，计算每个位置对其他所有位置的"关注度"。

但这里有一个根本性的局限：**一组 Q/K/V 只能捕捉一种类型的关系**。

现实世界的语言关系是多元的：

```
"那只猫坐在垫子上，因为它很舒服"
           ↑
           谁"舒服"？猫，还是垫子？
           需要语法关系头（syntactic head）
           需要语义指代头（semantic coreference head）
```

再比如：

```
"我觉得这个方案虽然创新，但风险很大"
           ↑
           "虽然...但"是转折关系
           需要关系头捕捉逻辑连接
```

单头注意力无力同时捕捉这些不同维度的关系——**多头注意力（Multi-Head Attention, MHA）** 就是为此而生。

## 多头注意力的核心思想

**核心思路：将 Q/K/V 分别投影到 $h$ 个不同的子空间，每个头独立做注意力，然后拼接结果。**

### 数学原理

设输入序列为 $\mathbf{X} \in \mathbb{R}^{n \times d_{model}}$，单头注意力的计算过程：

$$
\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}}\right)\mathbf{V}
$$

多头注意力的做法是，将 $\mathbf{Q}, \mathbf{K}, \mathbf{V}$ 各自投影到 $h$ 个不同的 $d_k, d_k, d_v$ 维子空间：

$$
\begin{aligned}
\text{MultiHead}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) &= \text{Concat}(\text{head}_1, \ldots, \text{head}_h)\mathbf{W}^O \\
\text{where } \text{head}_i &= \text{Attention}(\mathbf{Q}\mathbf{W}_i^Q, \mathbf{K}\mathbf{W}_i^K, \mathbf{V}\mathbf{W}_i^V)
\end{aligned}
$$

其中：

- $\mathbf{W}_i^Q \in \mathbb{R}^{d_{model} \times d_k}$：第 $i$ 个头的 Query 投影矩阵
- $\mathbf{W}_i^K \in \mathbb{R}^{d_{model} \times d_k}$：第 $i$ 个头的 Key 投影矩阵
- $\mathbf{W}_i^V \in \mathbb{R}^{d_{model} \times d_v}$：第 $i$ 个头的 Value 投影矩阵
- $\mathbf{W}^O \in \mathbb{R}^{hd_v \times d_{model}}$：输出投影矩阵

典型配置下 $d_k = d_v = d_{model} / h$，所以拼接后的维度依然是 $d_{model}$，保持模型各层维度一致。

### 为什么投影到低维子空间而不是直接用高维？

每个头的维度是 $d_k = d_{model} / h$，总计算量不变，但通过不同的投影方向，每个头能在独立子空间中学到不同的注意力模式。

```
d_model = 512, h = 8
每个头: d_k = 64

总参数量（投影层）：
8 × (512 × 64 × 3 + 64 × 512) = 8 × 98304 ≈ 79 万
（相比直接用512维单头，注意力的表达能力更强）
```

## 多头注意力的实际效果

### 不同的头学到什么？

通过可视化 BERT 的多头注意力模式，研究者发现不同头确实在捕捉不同类型的关系：

| 头类型 | 捕捉的关系 | 示例 |
|--------|-----------|------|
| 语法头 | 主谓宾、修饰关系 | "The cat ate the fish" → 主语→谓语 |
| 指代头 | 代词与名词对应 | "它" → "猫" |
| 语义头 | 同义词、上下位 | "狗" ↔ "动物" |
| 位置头 | 相邻词关联 | "非常" → "好" |
| 长距离头 | 跨句依赖 | 段首 → 段尾 |

### 前端视角：用代码感受多头注意力

```typescript
import { Matrix } from 'ml-matrix';

// 多头注意力核心实现（TypeScript）
class MultiHeadAttention {
  private h: number;           // 头数量
  private dModel: number;      // 模型维度
  private dK: number;          // 每头 Key/Query 维度
  private dV: number;          // 每头 Value 维度

  private WQ: Matrix;          // Query 投影矩阵
  private WK: Matrix;          // Key 投影矩阵
  private WV: Matrix;          // Value 投影矩阵
  private WO: Matrix;          // 输出投影矩阵

  constructor(h: number = 8, dModel: number = 512) {
    this.h = h;
    this.dModel = dModel;
    this.dK = dModel / h;
    this.dV = dModel / h;

    // 初始化投影矩阵
    this.WQ = Matrix.random(dModel, dModel);
    this.WK = Matrix.random(dModel, dModel);
    this.WV = Matrix.random(dModel, dModel);
    this.WO = Matrix.random(dModel, dModel);
  }

  // 多头注意力前向传播
  forward(X: Matrix): Matrix {
    const seqLen = X.rows;
    const h = this.h;
    const dK = this.dK;

    // Step 1: 计算 Q/K/V 并分割为 h 个头
    const Q = X.mmul(this.WQ);  // [seq, d_model]
    const K = X.mmul(this.WK);
    const V = X.mmul(this.WV);

    // 将每个头切分出来
    const heads: Matrix[] = [];
    for (let i = 0; i < h; i++) {
      const startK = i * dK;
      const endK = startK + dK;

      // 提取第 i 个头的 Q/K/V
      const Qi = Q.getColumnRange(startK, endK - 1);
      const Ki = K.getColumnRange(startK, endK - 1);
      const Vi = V.getColumnRange(startK, endK - 1);

      // 计算注意力分数并应用 softmax
      const scores = this.scaledDotProduct(Qi, Ki);
      const attnWeights = this.softmax(scores);

      // 加权求和得到第 i 个头的输出
      const headOutput = attnWeights.mmul(Vi);
      heads.push(headOutput);
    }

    // Step 2: 拼接 h 个头的输出
    const concatOutput = Matrix.concatHorizontally(...heads);

    // Step 3: 最终线性投影
    const output = concatOutput.mmul(this.WO);
    return output;
  }

  // Scaled Dot-Product Attention
  private scaledDotProduct(Q: Matrix, K: Matrix): Matrix {
    const dK = Q.columns;
    const scores = Q.mmul(K.transpose()).divide(Math.sqrt(dK));
    return scores;
  }

  // Softmax（沿行方向）
  private softmax(matrix: Matrix): Matrix {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const result = new Matrix(rows, cols);

    for (let i = 0; i < rows; i++) {
      const row = matrix.getRow(i);
      const maxVal = Math.max(...row);
      const exps = row.map(x => Math.exp(x - maxVal));
      const sumExps = exps.reduce((a, b) => a + b, 0);
      result.setRow(i, exps.map(e => e / sumExps));
    }
    return result;
  }
}
```

### PyTorch 原生实现

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, num_heads: int):
        super().__init__()
        assert d_model % num_heads == 0
        
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        # 投影矩阵（可学习参数）
        self.W_q = nn.Linear(d_model, d_model, bias=False)
        self.W_k = nn.Linear(d_model, d_model, bias=False)
        self.W_v = nn.Linear(d_model, d_model, bias=False)
        self.W_o = nn.Linear(d_model, d_model, bias=False)
    
    def forward(self, x: torch.Tensor, mask=None) -> torch.Tensor:
        """
        x: [batch, seq_len, d_model]
        """
        batch, seq_len, _ = x.shape
        
        # 线性投影 -> [batch, seq_len, d_model]
        Q = self.W_q(x)
        K = self.W_k(x)
        V = self.W_v(x)
        
        # 分割为多个头: [batch, seq_len, num_heads, d_k] -> [batch, num_heads, seq_len, d_k]
        Q = Q.view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        
        # Scaled Dot-Product Attention: [batch, num_heads, seq_len, seq_len]
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        
        attn_weights = F.softmax(scores, dim=-1)
        # 加权求和: [batch, num_heads, seq_len, d_k]
        context = torch.matmul(attn_weights, V)
        
        # 拼接多头: [batch, seq_len, d_model]
        context = context.transpose(1, 2).contiguous()
        context = context.view(batch, seq_len, self.d_model)
        
        # 最终投影
        output = self.W_o(context)
        return output


# 使用示例
d_model = 512
num_heads = 8
batch = 4
seq_len = 32

mha = MultiHeadAttention(d_model, num_heads)
x = torch.randn(batch, seq_len, d_model)
output = mha(x)
print(output.shape)  # torch.Size([4, 32, 512])
```

## 多头注意力的工程细节

### 为什么要除以 $\sqrt{d_k}$？

注意力分数 $QK^T$ 的方差会随 $d_k$ 增大而增大，导致 softmax 梯度消失。通过除以 $\sqrt{d_k}$ 保持点积结果的方差稳定：

```python
# 假设 Q, K 每个元素 ~ N(0, 1)
# 则 QK^T 的每个元素 ~ N(0, d_k)
# 除以 sqrt(d_k) 后，QK^T/sqrt(d_k) ~ N(0, 1)

scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
```

### KV Cache 场景下的多头注意力瓶颈

在推理阶段使用自回归解码时，多头注意力的 Key 和 Value 会被反复查询。如果直接实现，每次生成新 Token 都要重新计算所有历史位置的注意力，这是 $O(n^2)$ 复杂度。

vLLM、SGLang 等推理框架通过 **PagedAttention** 管理 KV Cache，核心思想是把 KV Cache 按页管理，支持物理上不连续的显存分配，大幅提升显存利用率和吞吐量。详细内容我们会在后续"KV Cache 优化"专题展开。

## 从 MHA 到 MQA / GQA：降本增效

标准 MHA 的问题是：每个头都有独立的 K 和 V，在推理时意味着 $h$ 组 KV 都要缓存。对于长上下文场景，这成了显存瓶颈。

### Multi-Query Attention (MQA)

所有头共享一组 Key 和 Value，参数量大幅减少：

```python
# MQA: K 和 V 只有一组，所有头共享
self.W_k = nn.Linear(d_model, d_k, bias=False)    # 不是 d_model × d_model
self.W_v = nn.Linear(d_model, d_v, bias=False)
```

### Grouped-Query Attention (GQA)

**GQA 是 MQA 和 MHA 的折中**：将 Query 分成 $h$ 个头，Key/Value 分成 $g$ 个组（$g < h$），每组头共享一组 KV。

```
MHA:  8个Query头 × 8个Key/Value头  = 8组KV
GQA:  8个Query头 × 2个Key/Value组  = 2组KV（每组4个头）
MQA:  8个Query头 × 1组Key/Value组  = 1组KV（所有头共享）
```

这是 **Llama 2/3、Mistral** 等主流开源模型的选择。LLM.js 等前端推理引擎也广泛采用 GQA 策略来平衡显存与性能。

## MLA：DeepSeek 的低秩奇迹

**Multi-Head Latent Attention（MLA）** 是 DeepSeek-V2 提出的创新注意力架构，核心思想是**低秩压缩（Low-Rank Compression）**：

### 传统 MHA 的 KV 是 $O(d_{model})$ 维度

$$
\mathbf{K}_i = \mathbf{W}_i^K \mathbf{h} \in \mathbb{R}^{d_k}
$$

### MLA 的做法：先压缩再恢复

$$
\mathbf{c}_{KV} = \mathbf{W}_{DKV} \mathbf{h} \in \mathbb{R}^{d_c}, \quad (d_c \ll d_{model} \cdot h)
$$
$$
\mathbf{K}_i = \mathbf{W}_{UK} \mathbf{c}_{KV} \in \mathbb{R}^{d_k}
$$

MLA 将 KV 压缩到一个低维潜在空间 $d_c$，推理时再解压。这使得 **KV Cache 的显存占用大幅降低**，同时保持接近 MHA 的效果。

```python
# MLA 简化示意
class MultiHeadLatentAttention(nn.Module):
    def __init__(self, d_model, num_heads, d_c=512):
        super().__init__()
        self.d_c = d_c  # 低秩压缩维度
        
        # 压缩矩阵（大幅减少参数量）
        self.W_DKV = nn.Linear(d_model, d_c, bias=False)  # d_model → d_c
        self.W_UK = nn.Linear(d_c, num_heads * d_k, bias=False)  # d_c → h × d_k
        self.W_UV = nn.Linear(d_c, num_heads * d_v, bias=False)
    
    def forward(self, h):
        # 压缩
        c_kv = self.W_DKV(h)
        # 解压为多头
        K = self.W_UK(c_kv).view(-1, self.num_heads, self.d_k)
        V = self.W_UV(c_kv).view(-1, self.num_heads, self.d_v)
        # ...注意力计算
```

### MLA vs GQA 对比

| 特性 | MHA | GQA | MLA |
|------|-----|-----|-----|
| KV 头数 | $h$ | $g$ | 低秩压缩 $d_c$ |
| KV Cache 显存 | 高 | 中 | **极低** |
| 表达能力 | 最强 | 平衡 | 接近 MHA |
| 代表模型 | GPT-3 | Llama 2/3 | **DeepSeek-V2** |

## 前端开发者的实践视角

### 何时关注多头注意力？

1. **模型选型时**：了解模型用了多少个头、是否用了 GQA/MLA，影响推理性能和显存占用
2. **前端部署时**：如使用 transformers.js 或 WebLLM，了解注意力机制有助于调优 batch size 和上下文长度
3. **应用调优时**：某些 RAG 场景下，使用不同的 attention mask 策略（causal、bidirectional）会显著影响召回质量

```javascript
// WebLLM 中的注意力配置（前端）
const model = await WebLLM.createAutoStatefulModel({
  model: 'Llama-3-8B-Instruct-q4f16_1',
  attentionType: 'grouped-query-attention', // 明确使用 GQA
  kvCacheBitWidth: 'fp16',
});
```

## 总结

> 多头注意力是 Transformer 表达力的核心来源。通过将 Q/K/V 投影到多个子空间并行计算，不同的头能同时捕捉语法、语义、指代、位置等多维关系。
>
> 工程上，头数量、维度分配、KV Cache 管理策略（GQA/MLA）直接影响推理性能。前端开发者理解这些机制，有助于更好地选择和使用大模型 API。

---

*下一篇：位置编码进化史：从绝对位置到RoPE和ALiBi*
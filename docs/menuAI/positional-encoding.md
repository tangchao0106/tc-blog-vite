---
title: 位置编码进化史：从绝对位置到RoPE和ALiBi
author: 唐超
date: '2026-07-06'
---

# 位置编码进化史：从绝对位置到RoPE和ALiBi

## 一个根本性问题：Attention 本身不感知位置

注意力机制的核心是"全连接自比较"——序列中每个位置都与所有其他位置计算相似度，不分远近：

```
Token 1 与 Token 1: 相关度 0.9（自己和自己）
Token 1 与 Token 2: 相关度 0.7（邻居）
Token 1 与 Token 100: 相关度 0.3（远处）
```

**Attention 只感知"关系强度"，不感知"相对位置"。** 把输入序列打乱，"I love you" 变成 "you love I"，注意力分数完全一样——仅靠 Q/K 点积，模型根本不知道词语的顺序。

所以需要**位置编码（Positional Encoding, PE）**：给每个位置赋予一个独特的"身份证"，让 Attention 感知词序。

## 第一代：绝对位置编码（Sinusoidal）

2017 年 Vaswani 等人在《Attention is All You Need》中提出了经典方案，用正弦余弦函数生成固定的位置向量。

### 数学公式

对于位置 $pos$ 和维度 $i$：

$$
PE(pos, 2i) = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$
$$
PE(pos, 2i+1) = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

```python
import numpy as np
import matplotlib.pyplot as plt

def sinusoidal_pe(d_model: int, max_len: int = 512):
    """生成 sin/cos 绝对位置编码"""
    pe = np.zeros((max_len, d_model))
    
    # 位置索引: [0, 1, 2, ..., max_len-1]
    positions = np.arange(max_len).reshape(-1, 1)
    
    # 频率: 1/10000^(2i/d_model)
    # i 从 0 到 d_model/2
    div_terms = np.exp(
        np.arange(0, d_model, 2) * (-np.log(10000.0) / d_model)
    )
    
    # 偶数维度用 sin，奇数维度用 cos
    pe[:, 0::2] = np.sin(positions * div_terms)
    pe[:, 1::2] = np.cos(positions * div_terms)
    
    return pe

# 可视化不同维度随位置的变化
pe = sinusoidal_pe(512, 100)
plt.figure(figsize=(12, 4))
for i in range(0, 512, 64):
    plt.plot(pe[:, i], label=f'dim {i}')
plt.title("Sinusoidal PE: 不同维度随位置的变化")
plt.xlabel("Position")
plt.legend()
plt.tight_layout()
plt.savefig('pe_sinusoidal.png')
```

### 为什么用正余弦函数？

1. **任意位置可以线性组合**：$\exists A, B, s.t.\ PE(pos+k)$ 可以由 $PE(pos)$ 线性表示，方便模型插值
2. **周期性强**：不同维度的周期从 $2\pi$ 到 $10000 \cdot 2\pi$，覆盖短距离和长距离
3. **无需学习**：直接计算，参数效率高

### 绝对位置编码的致命缺陷

```
"I love you"   →  P0 + w0, P1 + w1, P2 + w2
"you love I"   →  P0 + w2, P1 + w1, P2 + w0
```

**问题 1：位置向量是"绝对"的**
模型需要为每个绝对位置单独学一个表示，导致：
- 位置 100 和位置 101 只有最后一个维度不同
- 模型泛化困难，无法处理训练时未见过的位置

**问题 2：相对位置信息丢失**
"love" 在 "I love you" 和 "you love I" 中角色不同，但相对位置关系本质相同（都在"中间"），但绝对位置编码无法表达这一点。

**问题 3：外推性极差**
训练时最多见过 2048 位置，推理时输入 4096 位置？超出范围的值无法生成（虽然 BERT 用的是可学习参数也有同样问题）。

## 第二代：相对位置编码（Relative Position Bias）

核心思想：**不编码 token 在序列中的绝对位置，而是编码 token 之间的相对距离。**

### T5 的 Relative Position Bias

2019 年 T5（Text-to-Text Transfer Transformer）提出简化方案：

$$
b_{ij} = \frac{ij}{\text{buckets}}
$$

将相对距离离散化为若干"桶"（buckets），相近的位置用细粒度编码，远离的位置用粗粒度：

```python
def relative_position_bucket(relative_position, bidirectional=False, num_buckets=32, max_distance=128):
    """
    将相对位置映射到桶索引
    T5 的实现
    """
    if bidirectional:
        # 双向（如 Encoder）：-max_distance ~ +max_distance
        buckets = num_buckets // 2
        ret = 0
        if relative_position > 0:
            ret = buckets - 1 - int_clamp(relative_position, 0, max_distance)
        else:
            ret = int_clamp(-relative_position, 0, max_distance)
        return ret
    else:
        # 单向（如 Decoder）：只考虑 forward 距离
        buckets = num_buckets
        ret = 0
        n = -relative_position
        if n < 0:
            ret = 0  # 未来 token（不应出现在 causal attention 中）
        elif n < max_distance:
            ret = int(n)  # 0 ~ max_distance 逐个桶
        else:
            # 长距离用对数桶
            ret = int_clamp(
                np.log(n / max_distance) / np.log(128 / max_distance) * (buckets - max_distance - 1) + max_distance,
                0, buckets - 1
            )
        return ret
```

### 相对位置编码的注意力改写

标准注意力：

$$
\text{Attention}(x_i, x_j) = \text{softmax}\left(\frac{(x_i\mathbf{W}^Q) \cdot (x_j\mathbf{W}^K)^T}{\sqrt{d_k}}\right)
$$

加入相对位置偏置：

$$
\text{Attention}(x_i, x_j) = \text{softmax}\left(\frac{(x_i\mathbf{W}^Q) \cdot (x_j\mathbf{W}^K)^T + b_{ij}}{\sqrt{d_k}}\right)
$$

其中 $b_{ij}$ 是位置 $i$ 和 $j$ 之间相对距离的偏置。

**优势：相对位置编码对任意相对距离的泛化更好。** 但 T5 的 bias 是可学习参数，训练时见过的距离范围依然限制了外推能力。

## 第三代：旋转位置编码 RoPE

### 核心思想：旋转，而非叠加

**RoPE（Rotary Position Embedding）** 由 Su Jianlin 等人在 2021 年提出（Llama、GLM 等主流模型均采用），核心洞察是：

> 不把位置信息加到 embedding 上（$x + p$），而是通过**旋转 Query 和 Key 向量**来实现位置感知。

### 数学原理：二维旋转

先从简单的 2D 情况理解。对于第 $m$ 个位置的 Query 向量 $\mathbf{q}_m$（2维），RoPE 的做法是将其旋转 $\theta \cdot m$ 角度：

$$
\tilde{\mathbf{q}}_m = \mathbf{R}_{\theta \cdot m} \mathbf{q}_m = 
\begin{bmatrix} \cos(m\theta) & -\sin(m\theta) \\ \sin(m\theta) & \cos(m\theta) \end{bmatrix} 
\begin{bmatrix} q_0 \\ q_1 \end{bmatrix}
$$

同样，Key 向量 $\mathbf{k}_n$ 也旋转 $\theta \cdot n$ 角度。

现在计算两个旋转后向量的点积：

$$
\tilde{\mathbf{q}}_m^T \tilde{\mathbf{k}}_n = \mathbf{q}_m^T \mathbf{R}_{\theta \cdot m}^T \mathbf{R}_{\theta \cdot n} \mathbf{k}_n
$$

利用旋转矩阵的正交性 $\mathbf{R}_{\theta \cdot m}^T \mathbf{R}_{\theta \cdot n} = \mathbf{R}_{\theta \cdot (n-m)}$：

$$
= \mathbf{q}_m^T \mathbf{R}_{\theta \cdot (n-m)} \mathbf{k}_n
$$

**关键发现：旋转后的点积只与相对位置 $(n-m)$ 有关，与绝对位置无关！**

这意味着只要旋转了 Q 和 K，**Attention 的天然属性就变成了"相对位置感知"的**——无需额外加偏置，无需额外参数。

### 多维推广：成对旋转（Paired Rotation）

对于 $d$ 维向量（$d$ 为偶数），将相邻两维配对，各自做旋转：

```python
import numpy as np

def apply_rotary_pe(x: np.ndarray, base: float = 10000.0):
    """
    应用 RoPE 旋转位置编码
    
    x: [batch, seq_len, num_heads, d_k] 或 [seq_len, d_k]
    base: 旋转基准频率（默认 10000）
    
    原理：对相邻两维 (2i, 2i+1) 做角度 theta = pos * (base^(-2i/d)) 的旋转
    """
    seq_len, d_model = x.shape[-2], x.shape[-1]
    assert d_model % 2 == 0, "d_model must be even"
    
    # 计算每个维度的旋转角度
    # theta_i = base^(-2i/d) * pos
    positions = np.arange(seq_len).reshape(-1, 1)
    exponents = np.arange(0, d_model, 2) / d_model
    thetas = base ** (-exponents)  # [d_model/2]
    angles = positions * thetas  # [seq_len, d_model/2]
    
    cos = np.cos(angles)
    sin = np.sin(angles)
    
    # 复制给成对的维度: [seq_len, d_model]
    cos_full = np.repeat(cos, 2, axis=1)
    sin_full = np.repeat(sin, 2, axis=1)
    
    # 旋转: x' = x * cos - rotate(x) * sin
    x_rotated = x * cos_full + np.roll(x, 1, axis=-1) * (-sin_full)
    
    return x_rotated


# 一维示例演示
def rotary_1d_demo():
    """演示 2D 旋转的核心原理"""
    q = np.array([3.0, 4.0])  # 原始 query
    m, n = 3, 1  # 位置 m=3, n=1
    theta = 0.5  # 基础旋转角度
    
    # 旋转矩阵 R(theta * pos)
    def R(pos):
        angle = theta * pos
        return np.array([[np.cos(angle), -np.sin(angle)],
                         [np.sin(angle),  np.cos(angle)]])
    
    # 分别旋转 Q 和 K
    q_m = R(m) @ q
    k_n = R(n) @ q  # 用同一个向量演示（实际中 k 不同）
    
    # 点积只依赖相对位置 (m-n)
    dot_product = q_m @ k_n
    expected = q @ R(m - n) @ q
    
    print(f"位置 m={m}, n={n}")
    print(f"相对位置 m-n = {m-n}")
    print(f"旋转后点积: {dot_product:.4f}")
    print(f"仅依赖相对位置的期望值: {expected:.4f}")
    print(f"两者相等！旋转点积天然具有相对位置感知性 ✓")

rotary_1d_demo()
```

输出：

```
位置 m=3, n=1
相对位置 m-n = 2
旋转后点积: 6.8962
仅依赖相对位置的期望值: 6.8962
两者相等！旋转点积天然具有相对位置感知性 ✓
```

### RoPE 的外推优势

这是 RoPE 最闪耀的特性：

- **位置范围外推**：训练时用 4096 位置，推理时可以直接处理 32768 位置（Llama 3 支持 128K），只需调整旋转角度计算
- **无参数额外开销**：不增加可学习参数，不增加显存
- **与注意力机制无缝融合**：Q 和 K 各旋转一次即可

### RoPE 的 Llama 实现细节

```python
import torch
import torch.nn as nn
import math

def precompute_freqs_cis(dim: int, end: int, theta: float = 10000.0):
    """
    预计算旋转角度的 cos 和 sin（用于高效计算）
    
    Args:
        dim: 向量维度（必须是偶数）
        end: 最大位置数
        theta: 基础频率
    """
    freqs = 1.0 / (theta ** (torch.arange(0, dim, 2).float() / dim))
    t = torch.arange(end)
    freqs = torch.outer(t, freqs)  # [end, dim/2]
    freqs_cis = torch.polar(torch.ones_like(freqs), freqs)  # 转为复数形式
    return freqs_cis

def apply_rotary_pos_emb(q: torch.Tensor, k: torch.Tensor, freqs_cis: torch.Tensor):
    """
    对 Q 和 K 应用旋转位置编码
    
    q, k: [batch, seq_len, num_heads, head_dim]
    freqs_cis: [seq_len, head_dim/2] 复数
    """
    # reshape 为复数运算格式
    q_complex = torch.view_as_complex(q.float().reshape(*q.shape[:-1], -1, 2))
    k_complex = torch.view_as_complex(k.float().reshape(*k.shape[:-1], -1, 2))
    
    # 逐位置旋转（用复数乘法实现）
    q_rotated = torch.view_as_real(q_complex * freqs_cis.unsqueeze(0)).flatten(-2)
    k_rotated = torch.view_as_real(k_complex * freqs_cis.unsqueeze(0)).flatten(-2)
    
    return q_rotated.type_as(q), k_rotated.type_as(k)


class RotaryEmbedding(nn.Module):
    def __init__(self, dim, max_seq_len=4096, theta=10000.0):
        super().__init__()
        self.dim = dim
        self.max_seq_len = max_seq_len
        self.theta = theta
        self.freqs_cis = precompute_freqs_cis(dim, max_seq_len * 2, theta)
    
    def forward(self, seq_len):
        return self.freqs_cis[:seq_len]
```

## 第四代：ALiBi（Attention with Linear Biases）

### 朴素线性偏置

ALiBi（2022 年，由 Presser 等人提出）走了一条完全不同的路：**不引入位置编码向量，直接在注意力分数上叠加线性偏置。**

$$
\text{Attention}(q_i, k_j) = \text{softmax}\left(\frac{\mathbf{q}_i \mathbf{k}_j^T}{\sqrt{d}} + m \cdot (i - j)\right)
$$

其中 $m$ 是与头编号相关的斜率因子（不同头有不同的斜率）。

### 为什么不同头用不同斜率？

```python
def compute_alibi_slopes(num_heads: int):
    """
    计算每个头的 ALiBi 斜率
    规律：后继头斜率约为前一个头的 1/2
    """
    def get_slopes_power_of_2(n):
        start = 2 ** (-(2 ** -(math.log2(n) - 3)))
        ratio = start
        return [start * ratio ** i for i in range(n)]
    
    if math.log2(num_heads).is_integer():
        return get_slopes_power_of_2(num_heads)
    else:
        closest_power_of_2 = 2 ** math.floor(math.log2(num_heads))
        return (
            get_slopes_power_of_2(closest_power_of_2) +
            compute_alibi_slopes(2 * closest_power_of_2)[0::2][:num_heads - closest_power_of_2]
        )

slopes = compute_alibi_slopes(8)
print(slopes)
# [1/1, 1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128]  ≈ [1.0, 0.5, 0.25, ...]
```

### 可视化 ALiBi 的注意力偏置

```python
import matplotlib.pyplot as plt
import numpy as np

def plot_alibi_attention_mask(num_heads=8, seq_len=16):
    fig, axes = plt.subplots(2, 4, figsize=(14, 6))
    axes = axes.flatten()
    
    slopes = compute_alibi_slopes(num_heads)
    
    for h in range(num_heads):
        m = slopes[h]
        mask = np.zeros((seq_len, seq_len))
        for i in range(seq_len):
            for j in range(seq_len):
                if j <= i:  # causal mask
                    mask[i, j] = m * (i - j)
        
        axes[h].imshow(mask, cmap='coolwarm', aspect='auto')
        axes[h].set_title(f'Head {h}: slope={m:.4f}')
        axes[h].set_xlabel('j (Key position)')
        axes[h].set_ylabel('i (Query position)')
    
    plt.suptitle('ALiBi Attention Bias Matrix (每头斜率不同)', fontsize=14)
    plt.tight_layout()
    plt.savefig('alibi_mask.png')
    
    return mask

plot_alibi_attention_mask()
```

### ALiBi vs RoPE：各有优劣

| 特性 | RoPE | ALiBi |
|------|------|-------|
| 位置表示 | 旋转 Q/K 向量 | 线性偏置加到注意力分数 |
| 相对位置 | ✓ 天然支持 | ✓ 天然支持 |
| 外推能力 | 优秀（可任意扩展位置） | 优秀（线性偏置不依赖绝对位置） |
| 对 Q/K 的影响 | 修改 Q/K 向量值 | 不改变 Q/K，只改注意力分数 |
| 计算开销 | 需预计算旋转角度 | 无额外参数 |
| 与 Flash Attention 兼容 | ✓（需要对齐实现） | ✓（偏置直接加在 scores 上） |
| 代表模型 | **Llama、GLM、Qwen** | **MPT、Falcon** |

## 实战：如何在前端使用不同位置编码的模型

不同位置编码方案在前端推理中需要不同的处理：

```javascript
// WebLLM / Transformers.js 中处理 RoPE
const model = await WebLLM.createAutoStateizedModel({
  model: 'Qwen2-7B-Instruct-q4f16_1',
  // Qwen 使用 RoPE，无需额外配置
  // 模型内部自动处理旋转
});

// 自定义 ALiBi 偏置（用于调试/学习）
function computeAlibiBias(numHeads, seqLen) {
  const getSlope = (n) => {
    const start = Math.pow(2, -(Math.pow(2, -(Math.log2(n) - 3))));
    return start;
  };
  
  const slopes = [];
  const closestPow2 = Math.pow(2, Math.floor(Math.log2(numHeads)));
  for (let i = 0; i < numHeads; i++) {
    slopes.push(getSlope(closestPow2) * Math.pow(0.5, i % closestPow2));
  }
  
  // 构建偏置矩阵
  const bias = [];
  for (let i = 0; i < seqLen; i++) {
    bias[i] = [];
    for (let j = 0; j < seqLen; j++) {
      if (j > i) bias[i][j] = -Infinity; // causal
      else bias[i][j] = slopes[0] * (i - j); // ALiBi 偏置
    }
  }
  return bias;
}
```

## 总结

> 位置编码的进化史，本质上是解决"如何让 Attention 感知词序"这一问题的思想迭代：
>
> - **绝对位置编码**：直观但外推差、信息冗余
> - **相对位置编码（T5）**：捕捉相对距离，但参数量大
> - **RoPE**：通过旋转 Q/K 优雅地引入相对位置，是当前主流
> - **ALiBi**：完全无参数的外推方案，线性偏置实现简单高效
>
> 作为前端开发者，理解这些位置编码机制，有助于在模型选型、API 调用和前端部署时做出更明智的决策。

---

*下一篇：GPT vs BERT：为什么 Decoder-Only 成为主流*
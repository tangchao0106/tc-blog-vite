---
title: 自注意力机制：如何量化词与词之间的"关系"
author: 唐超
date: '2026-07-05'
---

# 自注意力机制：如何量化词与词之间的"关系"

## 从"盲人摸象"到"全局视野"

传统 RNN（循环神经网络）处理句子时，像一个"盲人摸象"的过——每个词只能看到前一个词的"记忆"，信息需要一个个传递：

```
RNN 的问题：
"狗" → 记住了"狗" ✓
"咬" → 只知道"狗咬"，不知道完整句子
"人" → 只知道"狗咬人"，不知道"谁是主语"
"了" → ……
```

**自注意力（Self-Attention）** 彻底改变了这个局面。它让每个词可以**同时看到句子中所有其他词**，并根据语义相关性决定"应该关注谁"。

```
Self-Attention 的优势：
"狗" ←→ "咬" ←→ "人" ←→ "了"
  ↓        ↓        ↓        ↓
 全部词可以互相"对话"，不受距离限制
```

这就是 Transformer 的核心创新，也是 GPT、Claude 等大模型能够理解长文本、捕捉长距离依赖的根本原因。

## Q/K/V：注意力机制的三个"角色"

Self-Attention 的核心是三个向量：**Query（查询）、Key（键）、Value（值）**。

用图书馆的比喻来理解：

- **Query（Q）**：你带着问题去检索，"我想找关于人工智能的书"
- **Key（K）**：每本书的索引标签，"AI"、"机器学习"、"深度学习"
- **Value（V）**：书的实际内容

```python
class SelfAttention(nn.Module):
    def __init__(self, hidden_dim=4096, num_heads=32):
        super().__init__()
        self.num_heads = num_heads
        self.head_dim = hidden_dim // num_heads  # 每个头的维度
        
        # 三个线性变换，将输入投影为 Q、K、V
        self.W_q = nn.Linear(hidden_dim, hidden_dim)
        self.W_k = nn.Linear(hidden_dim, hidden_dim)
        self.W_v = nn.Linear(hidden_dim, hidden_dim)
        
        # 输出投影
        self.W_o = nn.Linear(hidden_dim, hidden_dim)
    
    def forward(self, x):
        # x: [batch, seq_len, hidden_dim]
        B, N, D = x.shape
        
        # 投影得到 Q、K、V
        Q = self.W_q(x)  # [B, N, D]
        K = self.W_k(x)  # [B, N, D]
        V = self.W_v(x)  # [B, N, D]
        
        # 多头拆分
        Q = Q.view(B, N, self.num_heads, self.head_dim).transpose(1, 2)
        K = K.view(B, N, self.num_heads, self.head_dim).transpose(1, 2)
        V = V.view(B, N, self.num_heads, self.head_dim).transpose(1, 2)
        
        # 计算注意力
        attn_output = self.multi_head_attention(Q, K, V)
        
        return self.W_o(attn_output)
```

## 注意力分数计算：四步走

Attention 的计算分为四个步骤：

### 第一步：计算 Q 和 K 的相似度

```python
import torch
import torch.nn.functional as F
import math

def compute_attention(Q, K):
    """计算注意力分数：Q·K^T / sqrt(d_k)
    
    Q: [batch, num_heads, seq_len_q, head_dim]
    K: [batch, num_heads, seq_len_k, head_dim]
    """
    d_k = Q.shape[-1]
    
    # Q·K^T：每个 query 和每个 key 做点积
    # 结果 shape: [batch, num_heads, seq_len_q, seq_len_k]
    scores = torch.matmul(Q, K.transpose(-2, -1))
    
    # 缩放：防止点积值过大导致 softmax 梯度消失
    scores = scores / math.sqrt(d_k)
    
    return scores
```

为什么要除以 √d_k？假设 Q、K 的各分量是均值为 0、方差为 1 的独立随机变量，则 Q·K 的点积均值为 0、方差为 d_k。d_k 越大，点积的方差越大，softmax 后的分布越"尖锐"（接近 one-hot），梯度变小。除以 √d_k 可以归一化方差。

### 第二步：应用掩码（可选）

在 Decoder 中，需要**遮盖"未来"的 token**，避免信息泄露：

```python
def apply_causal_mask(scores, seq_len):
    """Decoder 专用的因果掩码（causal mask）
    
    上三角为 -inf，这样 softmax 后对应概率为 0
    确保每个 token 只能看到自己和之前的 token
    """
    # 创建一个上三角矩阵（不含对角线）
    mask = torch.triu(
        torch.ones(seq_len, seq_len, device=scores.device) * float('-inf'),
        diagonal=1
    )
    # scores: [batch, num_heads, seq_len, seq_len]
    return scores + mask
```

### 第三步：Softmax 归一化

```python
def softmax_attention(scores):
    """将分数转换为概率分布"""
    return F.softmax(scores, dim=-1)
```

### 第四步：加权求和 Value

```python
def compute_attention_output(attn_weights, V):
    """用注意力权重对 V 加权求和
    attn_weights: [batch, num_heads, seq_len_q, seq_len_k]
    V:           [batch, num_heads, seq_len_k, head_dim]
    """
    # 对 seq_len_k 维度加权求和
    return torch.matmul(attn_weights, V)
```

### 完整的 Attention 计算

```python
def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    完整的注意力计算（Scaled Dot-Product Attention）
    这是 Transformer 论文中的标准公式：
    
    Attention(Q, K, V) = softmax(QK^T / √d_k) × V
    """
    d_k = Q.shape[-1]
    
    # Step 1: 计算相似度 + 缩放
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    
    # Step 2: 应用掩码（可选）
    if mask is not None:
        scores = scores + mask
    
    # Step 3: Softmax
    attn_weights = F.softmax(scores, dim=-1)
    
    # Step 4: 加权求和
    output = torch.matmul(attn_weights, V)
    
    return output, attn_weights
```

## 多头注意力：为什么需要"多个头"？

单个注意力头只能从一个角度衡量 token 之间的关系。**多头注意力（Multi-Head Attention）** 将 Q/K/V 分别投影到多个子空间，每个头独立计算注意力，最后拼接：

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, hidden_dim=4096, num_heads=32):
        super().__init__()
        assert hidden_dim % num_heads == 0
        
        self.num_heads = num_heads
        self.head_dim = hidden_dim // num_heads
        self.scale = self.head_dim ** -0.5
        
        # 所有头共用 W_q/w_k/w_v，但投影到不同的子空间
        self.W_qkv = nn.Linear(hidden_dim, 3 * hidden_dim)
        self.W_o = nn.Linear(hidden_dim, hidden_dim)
    
    def forward(self, x, mask=None):
        B, N, C = x.shape
        
        # 一次性投影得到 Q, K, V
        Q, K, V = self.W_qkv(x).chunk(3, dim=-1)
        
        # 重塑为多头形式
        Q = Q.view(B, N, self.num_heads, self.head_dim).transpose(1, 2)
        K = K.view(B, N, self.num_heads, self.head_dim).transpose(1, 2)
        V = V.view(B, N, self.num_heads, self.head_dim).transpose(1, 2)
        
        # 统一计算所有头的注意力
        y, _ = scaled_dot_product_attention(Q, K, V, mask)
        
        # 拼接所有头的结果
        y = y.transpose(1, 2).contiguous().view(B, N, C)
        
        return self.W_o(y)
```

### 不同注意力头的角色

不同头可以学习到不同类型的依赖关系：

```python
# 注意力头的角色示例（基于研究发现）
attention_roles = {
    "头1-5": "句法依存关系（主语/谓语/宾语）",
    "头6-10": "指代消解（它/他/她 指代什么）",
    "头11-15": "语义相似度（同义词、近义词）",
    "头16-20": "位置关系（相邻词、远距离依赖）",
    "头21-25": "结构关系（列表、并列成分）",
    "头26-32": "高层语义（问题-答案、因果关系）",
}
```

以句子 "The cat sat on the mat because it was tired" 为例：
- **头1** 可能关注 "cat" → "sat"（主谓关系）
- **头6** 可能关注 "it" → "cat"（指代消解）
- **头25** 可能关注 "because" → "was tired"（因果关系）

## FlashAttention：注意力计算的高效实现

标准 Attention 的计算复杂度是 **O(N²)**（N 是序列长度），序列越长，显存消耗爆炸式增长。**FlashAttention** 通过"分块计算"和"算力融合"将显存从 O(N²) 降低到 O(N)，同时提升计算速度。

```python
# FlashAttention 的核心思想
def flash_attention(Q, K, V, block_size=128):
    """
    分块计算注意力：
    1. 将 K、V 分成小块（block）
    2. 逐块计算，注意力的分子/分母在块内累加
    3. 最终得到精确的 softmax 结果，显存从 O(N²) 降到 O(N)
    """
    # Q, K, V 被分成多个 block
    # 每次只将一个 Q block 与多个 K/V block 计算
    # 保持running max 和 running sum，实现精确 softmax
```

FlashAttention 让 70B 参数的模型可以在 80GB 显存的 GPU 上处理 32K tokens 的上下文，是现代 LLM 的标配优化。

## 从注意力权重理解模型行为

注意力权重（attn_weights）实际上是一张**热力图**，揭示了模型在"关注什么"：

```python
def visualize_attention(model, text, tokenizer):
    """可视化注意力权重"""
    inputs = tokenizer(text, return_tensors="pt")
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    
    with torch.no_grad():
        _, attn_weights = model(**inputs, output_attentions=True)
    
    # attn_weights: [num_layers, num_heads, seq_len, seq_len]
    layer_idx, head_idx = 12, 5
    attn_matrix = attn_weights[layer_idx][0][head_idx].numpy()
    
    # 绘制热力图
    import matplotlib.pyplot as plt
    plt.imshow(attn_matrix, cmap="viridis")
    plt.xticks(range(len(tokens)), tokens, rotation=90)
    plt.yticks(range(len(tokens)), tokens)
    plt.title(f"Layer {layer_idx}, Head {head_idx}")
    plt.colorbar()
    plt.show()
```

以句子 "The animal didn't cross the street because it was too tired" 为例：
- 当模型处理 "it" 时，有些注意力头会聚焦 "animal"（因为 it 指代 animal）
- 如果改句子为 "The street didn't cross the animal because it was too narrow"，同样的 "it" 会聚焦 "street"

这说明注意力权重确实在捕捉**语义指代关系**，而非简单的位置 proximity。

## 注意力机制的工程启示

作为前端开发者，理解注意力机制对以下场景有直接帮助：

### 1. 调试 LLM API 的输出

```javascript
// 为什么模型的回答"跑题"了？
// 可能原因：
// - Prompt 中的关键信息被后续内容"稀释"了注意力
// - 长 prompt 导致前后的 token 被注意力机制"平均化"
// 解决：重要指令放在 prompt 开头或结尾（注意力更集中）

const prompt = `
【重要】请用JSON格式回答 { schema }
// ... 大量上下文 ...
【重要】必须严格遵循上述JSON格式
`
```

### 2. 设计 RAG 系统的 chunk size

```python
# Attention 的 O(N²) 特性意味着：chunk 越长，上下文越"稀释"
# 建议：
# - 短文本（< 512 tokens）：所有 token 注意力强，适合精确问答
# - 中等文本（512-2048）：远距离依赖开始弱化，适合摘要
# - 长文本（> 4096）：需要用滑动窗口或分层注意力

CHUNK_SIZE_MAP = {
    "精确问答": 512,
    "代码补全": 1024,
    "文档摘要": 2048,
    "多文档综合": 4096,  # 需要配合重排序
}
```

### 3. 理解 Context Window 的实际限制

```python
# 理论上的 128K context 在实际中可能没那么好用
# 因为：
# 1. 注意力会随距离指数衰减（需要 RoPE 等位置编码补救）
# 2. 实际有效上下文通常只有理论值的 50-70%

EFFECTIVE_CONTEXT_RATIO = {
    "Vanilla Transformer": 0.1,   # 有效注意力约 10%
    "with RoPE": 0.5,               # 约 50%
    "with ALiBi": 0.7,              # 约 70%
    "with Longformer": 0.9,         # 稀疏注意力约 90%
}
```

## 总结

自注意力机制的本质是**"查询-键-值"交互**：

```
Attention(Q, K, V) = softmax(Q·K^T / √d_k) · V
```

**三个核心要点：**

1. **Q/K/V 投影**：将输入向量通过可学习的权重映射到 Query、Key、Value 三个空间，Q 表达"我在找什么"，K 表达"我有什么特征"，V 表达"我的实际内容"

2. **多头并行**：多个注意力头并行工作，每个头从不同角度建模 token 间的关系（句法、指代、语义、结构等），最终拼接输出

3. **全局建模 + O(N²) 复杂度**：注意力允许任意两个 token 直接交互，但代价是序列长度的平方级计算和显存消耗，这是 FlashAttention 等高效实现需要解决的核心问题

理解注意力机制，你就理解了大模型一半的"大脑工作原理"。

---

*下一篇：多头注意力：从"一个角度"到"多个角度"*

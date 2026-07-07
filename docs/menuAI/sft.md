---
title: 监督微调（SFT）：从"通才"到"专才"
author: 唐超
date: '2026-07-07'
---

# 监督微调（SFT）：从"通才"到"专才"

## 预训练之后：大模型还缺什么

经过预训练的大模型，已经是一个"博学"的通才——它能续写文章、解释概念、翻译语言。但它的回答方式往往像"一本正经地胡说八道"：长篇大论、缺乏结构、不懂边界。

**监督微调（Supervised Fine-Tuning，简称 SFT）** 解决的就是这个问题：让模型学会"好好回答"，从"会说话"进化到"会做事"。

## 什么是 SFT

SFT 是用**有标注的指令数据**对预训练模型进行进一步训练的过程。

```
预训练模型：输入"如何写Python快速排序" → 输出"def quicksort..."
SFT 模型：    输入"如何写Python快速排序" → 输出"以下是Python快速排序的实现...\n\n## 算法思路\n...\n## 代码实现\n..."
```

两者回答的都是正确内容，但 SFT 后的模型回答更有条理、更符合人类期望的格式和风格。

## SFT 的核心要素

### 1. 指令数据集（Instruction Dataset）

SFT 的质量直接取决于指令数据的质量。一条好的指令数据由三部分组成：

```
{
  "instruction": "请用Python实现快速排序算法",    // 用户指令
  "input": "",                                       // 可选的输入上下文
  "output": "## 快速排序算法\n\n### 算法思路\n快速排序采用分治策略...\n\n### 代码\n```python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    ...\n```"    // 期望的高质量回答
}
```

### 2. 主流公开指令数据集

| 数据集 | 规模 | 特点 |
|--------|------|------|
| Alpaca (Stanford) | 52K | 基于 Self-Instruct 自动生成 |
| Alpaca-GPT4 | 52K | 用 GPT-4 重写 Alpaca 的输出 |
| LLaMA2-Chat (TÜLU) | ~300K | 人工标注 + 质量筛选 |
| Magicoder-Evol | 110K | 专注于代码的指令数据 |
| UltraChat | 1.4M | 多轮对话，覆盖广泛主题 |

### 3. 训练策略

```python
# SFT 标准训练流程
from transformers import AutoModelForCausalLM, TrainingArguments, Trainer

model = AutoModelForCausalLM.from_pretrained("deepseek-v3-base")
# 注意：加载的是预训练好的 base 模型，不是 chat 模型

# 训练配置
training_args = TrainingArguments(
    output_dir="./sft_output",
    num_train_epochs=3,
    per_device_train_batch_size=8,
    gradient_accumulation_steps=4,    # 有效 batch_size = 8*4 = 32
    learning_rate=2e-5,               # SFT 学习率远低于预训练（预训练通常 1e-4）
    lr_scheduler_type="cosine",
    warmup_ratio=0.03,                # 预热，防止早期 loss 发散
    weight_decay=0.01,                 # L2 正则，防止过拟合
    logging_steps=50,
    save_steps=500,
    fp16=True,                        # 混合精度加速
    report_to="none",
)

# 使用指令数据进行微调
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=instruction_dataset,  # 格式：{instruction, input, output}
    tokenizer=tokenizer,
)

trainer.train()
```

## SFT vs 预训练：关键区别

| 维度 | 预训练 | SFT |
|------|--------|-----|
| 数据格式 | 纯文本续写（无标签） | 指令-回答对（有标签） |
| 数据规模 | 万亿 Token 级别 | 百万 Token 级别 |
| 学习率 | 高（1e-4 量级） | 低（1e-5 量级） |
| 目标 | 学习语言规律、世界知识 | 学会遵循指令、格式化输出 |
| Loss 计算 | 所有 token 的交叉熵 | 只计算 `output` 部分的 loss |
| 过拟合风险 | 低（数据量大） | 高（数据量小，容易过拟合指令格式） |

### 一个关键实现细节

SFT 时通常只计算**回答部分（output）的 loss**，而忽略指令部分（instruction）的 loss。这是因为：

```python
# 正确做法：构造 prompt + response 的完整序列
# 模型只看 response 部分的梯度
def tokenize_with_labels(example, tokenizer, max_length=2048):
    prompt = f"用户：{example['instruction']}\n"
    if example['input']:
        prompt += f"背景：{example['input']}\n"
    prompt += "助手："
    
    full_text = prompt + example['output'] + tokenizer.eos_token
    
    encoding = tokenizer(full_text, max_length=max_length, truncation=True)
    
    # 找到 "助手：" 之后的位置，从那里开始算 loss
    assistant_pos = full_text.index("助手：") + len("助手：")
    assistant_tokens = tokenizer.encode(example['output'], add_special_tokens=False)
    
    # labels = -100 表示这些 token 的 loss 被忽略
    labels = [-100] * (assistant_pos - 1) + assistant_tokens
    labels += [tokenizer.eos_token_id]
    
    return {"input_ids": encoding["input_ids"], "labels": labels}
```

## SFT 的挑战与最佳实践

### 1. 数据质量 >> 数据数量

LLaMA2 的实验证明：在指令数据上，**1 万条高质量人工标注数据 > 100 万条自动生成数据**。

```python
# 好数据 vs 坏数据
# 坏数据（GPT 自动生成，格式单一）
{"instruction": "What is Python?", "output": "Python is a programming language."}

# 好数据（多样化格式，包含边界情况）
{
  "instruction": "写一个函数检查字符串是否为回文",
  "input": "测试用例：'上海自来水来自海上'",
  "output": "## 解法一：双指针\n\n```python\ndef is_palindrome(s: str) -> bool:\n    s = ''.join(c.lower() for c in s if c.isalnum())\n    return s == s[::-1]\n\n## 测试\nprint(is_palindrome('上海自来水来自海上'))  # True\nprint(is_palindrome('hello'))  # False\n```\n\n**时间复杂度：O(n)，空间复杂度：O(n)**"
}
```

### 2. 学习率选择：宁低勿高

SFT 很容易让模型**遗忘预训练学到的知识**（灾难性遗忘），特别是使用过高的学习率时。

```python
# 推荐的学习率调度
scheduler_config = {
    "learning_rate": 1e-5,      # 比预训练低 10 倍
    "warmup_ratio": 0.03,       # 3% 的 steps 用于预热
    "scheduler": "cosine",     # 余弦退火，平滑衰减
    "min_lr_ratio": 0.1,        # 最低降到学习率的 10%
}
```

### 3. 训练步数（Epochs）控制

SFT 另一个常见问题是**过拟合指令格式**：模型学会了模仿回答风格，但开始胡编乱造。

```
训练曲线监控：
- train_loss 持续下降，eval_loss 开始上升 → 过拟合，及时停止
- eval_loss 趋于平稳 → 可以继续训练
- 建议：最多训练 3 个 epoch，多了容易过拟合
```

### 4. 数据多样性

好的指令数据集应该覆盖多种任务类型：

| 任务类型 | 示例 | 占比建议 |
|---------|------|---------|
| 代码生成 | "写一个React组件" | ~20% |
| 知识问答 | "解释什么是Transformer" | ~25% |
| 推理分析 | "分析这段代码的时间复杂度" | ~20% |
| 创意写作 | "写一首关于秋天的诗" | ~10% |
| 对话闲聊 | "推荐周末去哪玩" | ~15% |
| 格式化输出 | "把这段文字转为JSON" | ~10% |

## SFT 之后：大模型训练的后续步骤

SFT 完成后，模型已经能较好地遵循指令。但要让它真正"对齐"人类偏好，还需要 **RLHF（人类反馈强化学习）**——这是下一篇的主题。

```
预训练 → SFT → RLHF → 部署
"会说话"   "会做事"   "做得更好"
```

简单来说：
- SFT 教模型 **"怎么回答"**（格式、风格、覆盖范围）
- RLHF 教模型 **"什么回答更好"**（人类偏好、安全性、有用性）

## SFT 在前端开发场景的实战

```python
# 用 SFT 训练一个前端助手
instruction_dataset = [
    {
        "instruction": "写一个React hooks，监听窗口大小变化",
        "input": "",
        "output": "```tsx\nimport { useState, useEffect } from 'react';\n\nexport function useWindowSize() {\n  const [size, setSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight,\n  });\n\n  useEffect(() => {\n    const handleResize = () => {\n      setSize({ width: window.innerWidth, height: window.innerHeight });\n    };\n\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n\n  return size;\n}\n```\n\n**使用示例：**\n```tsx\nfunction App() {\n  const { width, height } = useWindowSize();\n  return <div>窗口尺寸: {width} x {height}</div>;\n}\n```"
    },
    # ... 更多前端相关的指令数据
]

# Fine-tuning
trainer = Trainer(
    model=frontend_model,
    args=training_args,
    train_dataset=instruction_dataset,
    tokenizer=tokenizer,
)
trainer.train()
```

## 总结

| 维度 | 关键点 |
|------|--------|
| 核心作用 | 教会模型遵循指令、格式化输出 |
| 数据格式 | instruction + output（有监督标签） |
| 学习率 | 1e-5 量级（远低于预训练） |
| Loss 计算 | 只计算 output 部分的交叉熵 |
| 最大风险 | 灾难性遗忘 + 过拟合指令格式 |
| 数据策略 | 质量 >> 数量，多样性 >> 单一性 |
| 后续步骤 | SFT → RLHF → 部署 |

SFT 是大模型从"通才"走向"专才"的关键一步。下一篇文章我们将介绍 RLHF，看看如何让模型真正理解"什么回答更好"。

---

*下一篇：RLHF：让大模型"学会做人"*

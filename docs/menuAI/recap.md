---
title: "AI 技术笔记连载·复盘索引"
author: 唐超
date: 2026-08-05
---

# AI 技术笔记连载·复盘索引

> 67 篇文章，19 个部分，从「大模型是什么」到「LLM 应用架构怎么选」——一本写给前端开发者的 AI 技术入门书，到这里画上句号。

## 写在前面

这个连载的起点很简单：作为一个前端开发者，我发现自己被 AI 浪潮推着走，却连很多基础概念都一知半解。于是决定边学边写，把那些硬核的技术论文和文档，翻译成「前端人能听懂的人话」。

67 篇文章写下来，最大的感受是：**AI 领域的知识没有想象中那么难，难的是有人愿意把它讲人话。**

下面是完整的索引，每篇配一句话总结，方便你按需取用。

---

## 第一部分：大模型基础认知

> 从零开始，搞清楚大模型到底在干嘛。

| # | 文章 | 一句话 |
|---|------|--------|
| 1 | [大模型是什么](./what-is-llm.md) | 大模型本质上是一个超级「猜词游戏」，Token 是它的最小单位 |
| 2 | [从 One-Hot 到词嵌入](./one-hot-to-embedding.md) | 从稀疏独热编码到稠密向量，让文字变成模型能算的数 |
| 3 | [自回归生成](./autoregressive-generation.md) | 大模型为什么「一字一字往外蹦」——遮挡预测 + 循环迭代 |
| 4 | [Token 经济学](./token-economics.md) | 按 Token 收费背后的算力成本和中英文差异 |

## 第二部分：Transformer 核心架构

> 大模型的「骨架」，搞懂这部分面试就不慌了。

| # | 文章 | 一句话 |
|---|------|--------|
| 5 | [Transformer 整体架构](./transformer-architecture.md) | Encoder-Decoder vs Decoder-Only，一张图看懂骨架 |
| 6 | [自注意力机制](./self-attention.md) | Q/K/V 三件套，Attention 本质是「查字典」 |
| 7 | [多头注意力](./multi-head-attention.md) | 从一个角度看关系变成多个角度看，MLA 是它的进化版 |
| 8 | [位置编码进化史](./positional-encoding.md) | 从绝对位置到 RoPE 旋转编码和 ALiBi 惩罚项 |
| 9 | [Transformer 高频面试题](./transformer-interview.md) | 15 道核心问题，从残差连接到 LayerNorm 到掩码 |

## 第三部分：训练全流程

> 大模型从「白纸」到「能用」要经历什么。

| # | 文章 | 一句话 |
|---|------|--------|
| 10 | [预训练：通识教育](./pretraining.md) | FineWeb 数据清洗 + 自监督学习，大模型的「大学通识课」 |
| 11 | [监督微调 SFT](./sft.md) | 从通才到专才，模仿学习 + 指令微调 |
| 12 | [RLHF](./rlhf.md) | 奖励模型 + PPO + KL 散度，DPO 是更简单的替代方案 |
| 13 | [损失函数与梯度](./loss-function-and-gradient.md) | 交叉熵是「错题本」，梯度是「指路标」 |
| 14 | [动态学习率](./dynamic-learning-rate.md) | 预热 + 衰减 + 重启，大模型训练的「自适应油门」 |

## 第四部分：模型优化与加速

> 让大模型跑得更快、更省显存。

| # | 文章 | 一句话 |
|---|------|--------|
| 15 | [KV Cache](./kv-cache.md) | 推理加速的「记忆复用术」，别每次都从头算 |
| 16 | [解码策略](./decoding-strategies.md) | 贪婪/采样/束搜索/Top-k/Top-p/温度，选词决定质量 |
| 17 | [MTP 多令牌预测](./multi-token-prediction.md) | 一次猜多个词，投机解码 + Eagle 方案 |
| 18 | [混合注意力](./hybrid-attention.md) | SWA + GA，「精读与概览」结合的长上下文策略 |
| 19 | [模型量化与剪枝](./model-quantization-pruning.md) | FP16/INT8/INT4，让大模型「瘦身」跑在消费级显卡上 |
| 20 | [知识蒸馏](./knowledge-distillation.md) | 让大模型当老师，蒸馏出小而快的学生模型 |

## 第五部分：分布式训练

> 一张卡训不完，就用多张卡。

| # | 文章 | 一句话 |
|---|------|--------|
| 21 | [分布式训练全景](./distributed-training.md) | 数据并行、模型并行、流水线并行——三种并行的本质区别 |
| 22 | [MoE 架构](./moe-architecture.md) | 稀疏激活 + 专家路由，按需激活省算力 |
| 23 | [DeepSeek-V3 分布式实践](./deepseek-v3-distributed.md) | 多层次并行 + DualPipe + AlltoAll 通信 |
| 24 | [Scaling Laws](./scaling-laws.md) | 幂律关系——大模型的「生长公式」和最优分配 |

## 第六部分：推理与部署

> 模型训好了，怎么跑起来。

| # | 文章 | 一句话 |
|---|------|--------|
| 25 | [GPU vs CPU](./gpu-vs-cpu.md) | 并行架构 + Tensor Core + 显存带宽，为什么大模型「吃」显卡 |
| 26 | [推理框架对比](./inference-frameworks-comparison.md) | vLLM/SGLang/Transformers 的设计哲学和选型 |
| 27 | [推理框架选型指南](./inference-framework-selection.md) | KTransformers/Unsloth，如何选择适合自己的「引擎」 |
| 28 | [KV Cache 优化](./kv-cache-optimization.md) | 从 PagedAttention 到 MLA，显存管理和缓存压缩 |

## 第七部分：应用技术栈

> 大模型不是只能聊天。

| # | 文章 | 一句话 |
|---|------|--------|
| 29 | [大模型三件套](./fc-mcp-skill.md) | Function Calling、MCP、Skill 一文讲透 |
| 30 | [RAG](./rag-retrieval-augmented-generation.md) | 召回-重排-生成，让大模型「查资料」再回答 |
| 31 | [Agent 智能体](./agent-intelligent-body.md) | 从聊天到干活，Function Calling + MCP + 多智能体 |
| 32 | [OpenClaw Skills](./openclaw-skills.md) | 技能生态和编写规范，让大模型「会使用工具」 |
| 33 | [数据回流](./data-feedback-loop.md) | 生产数据回收 + 反哺微调，大模型的「自我进化」闭环 |

## 第八部分：评估与安全

| # | 文章 | 一句话 |
|---|------|--------|
| 34 | [评估指标全解](./evaluation-metrics.md) | BLEU/ROUGE/BERTScore——字词匹配 vs 语义理解 |
| 35 | [避免过拟合](./avoid-overfitting.md) | 正则化 + 早停 + 参数冻结，让模型「学得会」不「死记硬背」 |
| 36 | [幻觉问题](./hallucination-problem.md) | 幻觉根源 + RAG 缓解 + 数据质量，大模型为什么「胡说八道」 |

## 第九部分：多模态与前沿

| # | 文章 | 一句话 |
|---|------|--------|
| 37 | [多模态大模型](./multimodal-llm.md) | 模态融合 + 统一编码器，从「能读」到「能看能听」 |
| 38 | [扩散语言模型](./diffusion-language-model.md) | 噪声重构 + 对比自回归，打破「自回归」的新范式 |
| 39 | [推理模型](./reasoning-model.md) | 思维链显性化，推理模型 vs 通用模型的本质区别 |

## 第十部分：API 与工具生态

| # | 文章 | 一句话 |
|---|------|--------|
| 40 | [Chat Completions vs Responses API](./chat-completions-vs-responses-api.md) | 有状态 vs 无状态，大模型 API 的「两代同堂」 |
| 41 | [插件市场](./plugin-marketplace.md) | Codex 的「应用商店」体系，热门插件和自定义开发 |

## 第十一部分：Prompt Engineering 与上下文工程

| # | 文章 | 一句话 |
|---|------|--------|
| 42 | [Prompt Engineering 基础](./prompt-engineering-basics.md) | 零样本/少样本/思维链/角色扮演，如何跟大模型「好好说话」 |
| 43 | [上下文工程](./context-engineering.md) | 上下文窗口管理 + 长文本策略 + 记忆机制，Prompt 的进阶版 |
| 44 | [结构化输出](./structured-output.md) | JSON Mode/Function Calling/约束解码，让大模型吐出「格式化数据」 |

## 第十二部分：前端 AI 开发实战

> 前端开发者最该关注的部分。

| # | 文章 | 一句话 |
|---|------|--------|
| 45 | [流式输出](./streaming-output.md) | SSE/WebSocket/分块渲染，如何在前端「接住」大模型的回答 |
| 46 | [浏览器端推理](./browser-side-inference.md) | WebLLM + transformers.js，WebGPU/WASM 端侧部署 |
| 47 | [AI 编程助手原理](./ai-coding-assistant.md) | FIM + 上下文窗口 + 检索增强，Copilot/Cursor 怎么「猜」你的代码 |

## 第十三部分：微调与定制化

| # | 文章 | 一句话 |
|---|------|--------|
| 48 | [LoRA/QLoRA](./lora-qlora.md) | 参数高效微调 + 低秩适配 + 量化微调，普通人也能「微调」大模型 |
| 49 | [数据准备与合成数据](./data-preparation-synthetic-data.md) | 指令构造 + 数据清洗 + 合成数据生成，喂给模型什么「食」 |
| 50 | [模型格式转换](./model-format-conversion.md) | GGUF/SafeTensors/ONNX，格式差异 + 量化导出 + 跨平台部署 |

## 第十四部分：RAG 进阶

| # | 文章 | 一句话 |
|---|------|--------|
| 51 | [向量数据库选型](./vector-database-selection.md) | Milvus/Pinecone/Chroma，索引算法 + 相似度搜索 + 工程实践 |
| 52 | [Embedding 模型详解](./embedding-models.md) | 从 text-embedding 到 BGE，编码原理 + 维度选择 + 多语言 |
| 53 | [Reranking 重排序](./reranking.md) | 交叉编码器 + 多路召回 + 融合策略，RAG 的「二次筛选」 |

## 第十五部分：AI 安全与对齐

| # | 文章 | 一句话 |
|---|------|--------|
| 54 | [提示注入攻击](./prompt-injection.md) | Prompt Injection + 越狱 + 防御策略，大模型的「社会工程学」 |
| 55 | [红队测试](./red-teaming.md) | Red Teaming + 对抗样本 + 边界测试，如何「攻击」自己的模型 |
| 56 | [AI 伦理与偏见](./ai-ethics-and-bias.md) | 公平性 + 偏见检测 + 去偏方法，大模型的「价值观」问题 |

## 第十六部分：多模态生成

| # | 文章 | 一句话 |
|---|------|--------|
| 57 | [图像生成原理](./image-generation-diffusion.md) | 去噪过程 + 潜空间 + 条件控制，Diffusion 模型怎么「画图」 |
| 58 | [Stable Diffusion 实战](./stable-diffusion-practical.md) | ControlNet/LoRA/精确控制，从文生图到图生图 |
| 59 | [语音模型](./speech-models-tts-asr.md) | Whisper/语音合成/实时语音交互，TTS 与 ASR |

## 第十七部分：模型生态与选型

| # | 文章 | 一句话 |
|---|------|--------|
| 60 | [开源 vs 闭源大模型](./open-source-vs-closed-source-llm.md) | Llama/Qwen/DeepSeek vs GPT/Claude/Gemini，能力/成本/隐私 |
| 61 | [小语言模型 SLM](./small-language-models.md) | Phi/Gemma 的「小而美」，端侧部署 + 性能权衡 |
| 62 | [模型评估实战](./model-evaluation-practice.md) | 从 BLEU 到 LLM-as-Judge，人工评估/A/B 测试/自动评估 |

## 第十八部分：AI 产品与工程化

| # | 文章 | 一句话 |
|---|------|--------|
| 63 | [AI 产品设计](./ai-product-design.md) | 非确定性 + 置信度展示 + 人在回路，如何设计「不确定」的产品 |
| 64 | [成本优化](./cost-optimization.md) | 缓存 + 模型路由 + Prompt 压缩，大模型应用的「省钱经」 |
| 65 | [从 Demo 到生产](./demo-to-production.md) | 测试/监控/灰度/回滚，AI 工程化闭环 |

## 第十九部分：AI 架构与系统设计

| # | 文章 | 一句话 |
|---|------|--------|
| 66 | [多智能体系统架构](./multi-agent-systems.md) | 角色分工 + 通信协议 + 任务编排，从单兵作战到团队协作 |
| 67 | [LLM 应用架构模式](./llm-app-architecture-patterns.md) | RAG/Agent/Workflow 怎么选，场景匹配 + 组合策略 + 演进路径 |

---

## 一些数字

- **67 篇**文章，覆盖从大模型基础到系统设计的完整链路
- **19 个**部分，按照「认知 → 架构 → 训练 → 优化 → 部署 → 应用 → 安全 → 前沿」的逻辑递进
- 每篇 **1500~3000 字**，少代码多类比，口语化讲解
- 用了不下 **100 个生活化类比**：预训练像通识教育、Attention 像查字典、KV Cache 像记忆复用、LoRA 像请家教……

## 写在最后

这 67 篇文章的写作初衷，是让前端开发者不用啃论文也能搞懂 AI。如果你从头读到尾，现在你应该能：

1. **看懂大模型的技术架构**——Transformer、Attention、位置编码不再是黑盒
2. **理解训练和推理的全流程**——从预训练到 RLHF，从 KV Cache 到量化部署
3. **上手 AI 应用开发**——RAG、Agent、流式输出、浏览器端推理都有实操指南
4. **做技术选型不慌**——推理框架、向量数据库、开源闭源模型怎么选，心里有数

AI 技术还在飞速发展，这个连载是一个阶段性总结，不是终点。等有了新的值得写的主题，再开下一季。

**保持好奇，保持动手。**

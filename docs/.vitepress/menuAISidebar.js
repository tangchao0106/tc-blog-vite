const commonPath = "/menuAI";

export default [
  {
    text: "基础概念",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "理解 Token", link: `${commonPath}/token.md` },
      { text: "大模型是什么", link: `${commonPath}/what-is-llm.md` },
      { text: "从One-Hot到词嵌入", link: `${commonPath}/one-hot-to-embedding.md` },
      { text: "自回归生成", link: `${commonPath}/autoregressive-generation.md` },
      { text: "Token经济学", link: `${commonPath}/token-economics.md` },
    ],
  },
  {
    text: "Transformer核心架构",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "Transformer整体架构", link: `${commonPath}/transformer-architecture.md` },
      { text: "自注意力机制", link: `${commonPath}/self-attention.md` },
      { text: "多头注意力", link: `${commonPath}/multi-head-attention.md` },
      { text: "位置编码进化史", link: `${commonPath}/positional-encoding.md` },
      { text: "Transformer高频面试题", link: `${commonPath}/transformer-interview.md` },
    ],
  },
  {
    text: "训练全流程",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "预训练：大模型的通识教育", link: `${commonPath}/pretraining.md` },
      { text: "监督微调（SFT）：从通才到专才", link: `${commonPath}/sft.md` },
      { text: "RLHF：让大模型学会做人", link: `${commonPath}/rlhf.md` },
      { text: "损失函数与梯度：错题本和指路标", link: `${commonPath}/loss-function-and-gradient.md` },
      { text: "动态学习率：自适应油门", link: `${commonPath}/dynamic-learning-rate.md` },
    ],
  },
  {
    text: "应用技术栈",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "大模型三件套：FC、MCP、Skill", link: `${commonPath}/fc-mcp-skill.md` },
    ],
  },
  {
    text: "模型优化与加速",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "KV Cache：记忆复用术", link: `${commonPath}/kv-cache.md` },
      { text: "解码策略：如何选词决定输出质量", link: `${commonPath}/decoding-strategies.md` },
      { text: "MTP：一次猜多个词的新范式", link: `${commonPath}/multi-token-prediction.md` },
      { text: "混合注意力：精读与概览策略", link: `${commonPath}/hybrid-attention.md` },
      { text: "模型量化与剪枝：让大模型瘦身", link: `${commonPath}/model-quantization-pruning.md` },
      { text: "知识蒸馏：让老师教出好学生", link: `${commonPath}/knowledge-distillation.md` },
    ],
  },
  {
    text: "分布式训练",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "分布式训练全景：三种并行", link: `${commonPath}/distributed-training.md` },
      { text: "MoE架构：让大模型按需激活", link: `${commonPath}/moe-architecture.md` },
      { text: "DeepSeek-V3的分布式实践", link: `${commonPath}/deepseek-v3-distributed.md` },
      { text: "Scaling Laws：大模型的u201c生长公式u201d", link: `${commonPath}/scaling-laws` },
      { text: "GPU vs CPU：为什么大模型u201c吃u201d显卡", link: `${commonPath}/gpu-vs-cpu` },
    ],
  },
];
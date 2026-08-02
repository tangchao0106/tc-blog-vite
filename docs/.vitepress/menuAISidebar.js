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
      { text: "RAG：让大模型查资料再回答", link: `${commonPath}/rag-retrieval-augmented-generation.md` },
      { text: "Agent智能体：从聊天到干活", link: `${commonPath}/agent-intelligent-body.md` },
      { text: "OpenClaw Skills：让大模型会使用工具", link: `${commonPath}/openclaw-skills.md` },
      { text: "数据回流：大模型的自我进化闭环", link: `${commonPath}/data-feedback-loop.md` },
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
  {
    text: "推理与部署",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "大模型推理框架对比：vLLM、SGLang、Transformers", link: `${commonPath}/inference-frameworks-comparison.md` },
      { text: "推理框架选型指南：如何选择适合自己的引擎", link: `${commonPath}/inference-framework-selection.md` },
      { text: "KV Cache优化：从PagedAttention到MLA", link: `${commonPath}/kv-cache-optimization.md` },
    ],
  },
  {
    text: "多模态与前沿",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "多模态大模型：从能读到能看能听", link: `${commonPath}/multimodal-llm.md` },
      { text: "扩散语言模型：打破自回归的新范式", link: `${commonPath}/diffusion-language-model.md` },
      { text: "推理模型：让大模型多想一步", link: `${commonPath}/reasoning-model.md` },
    ],
  },
  {
    text: "API与工具生态",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "Chat Completions vs Responses API：两代同堂", link: `${commonPath}/chat-completions-vs-responses-api.md` },
      { text: "插件市场：AI编程工具的应用商店体系", link: `${commonPath}/plugin-marketplace.md` },
    ],
  },
  {
    text: "评估与安全",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "评估指标全解：BLEU、ROUGE、BERTScore", link: `${commonPath}/evaluation-metrics.md` },
      { text: "避免过拟合：让模型学得会不死记硬背", link: `${commonPath}/avoid-overfitting.md` },
      { text: "幻觉问题：大模型为什么胡说八道", link: `${commonPath}/hallucination-problem.md` },
    ],
  },
  {
    text: "Prompt Engineering 与上下文工程",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "Prompt Engineering 基础：如何跟大模型好好说话", link: `${commonPath}/prompt-engineering-basics.md` },
      { text: "上下文工程：Prompt 的进阶版", link: `${commonPath}/context-engineering.md` },
      { text: "结构化输出：让大模型吐出格式化数据", link: `${commonPath}/structured-output.md` },
    ],
  },
  {
    text: "前端 AI 开发实战",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "流式输出：如何在前端接住大模型的回答", link: `${commonPath}/streaming-output.md` },
      { text: "浏览器端推理：WebLLM 与 transformers.js", link: `${commonPath}/browser-side-inference.md` },
      { text: "AI 编程助手原理：Copilot/Cursor 怎么猜你的代码", link: `${commonPath}/ai-coding-assistant.md` },
    ],
  },
  {
    text: "微调与定制化",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "LoRA/QLoRA：普通人也能微调大模型", link: `${commonPath}/lora-qlora.md` },
      { text: "数据准备与合成数据：喂给模型什么食", link: `${commonPath}/data-preparation-synthetic-data.md` },
      { text: "模型格式转换：GGUF/SafeTensors/ONNX", link: `${commonPath}/model-format-conversion.md` },
    ],
  },
  {
    text: "RAG 进阶",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "向量数据库选型：Milvus/Pinecone/Chroma", link: `${commonPath}/vector-database-selection.md` },
      { text: "Embedding 模型详解：从 text-embedding 到 BGE", link: `${commonPath}/embedding-models.md` },
      { text: "Reranking 重排序：RAG 的二次筛选", link: `${commonPath}/reranking.md` },
    ],
  },
  {
    text: "AI 安全与对齐",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "提示注入攻击：大模型的社会工程学", link: `${commonPath}/prompt-injection.md` },
      { text: "红队测试：如何攻击自己的模型", link: `${commonPath}/red-teaming.md` },
      { text: "AI 伦理与偏见：大模型的价值观问题", link: `${commonPath}/ai-ethics-and-bias.md` },
    ],
  },
  {
    text: "多模态生成",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "图像生成原理：Diffusion 模型怎么画图", link: `${commonPath}/image-generation-diffusion.md` },
      { text: "Stable Diffusion 实战：从文生图到图生图", link: `${commonPath}/stable-diffusion-practical.md` },
      { text: "语音模型：TTS 与 ASR", link: `${commonPath}/speech-models-tts-asr.md` },
    ],
  },
  {
    text: "模型生态与选型",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "开源 vs 闭源大模型：能力/成本/隐私", link: `${commonPath}/open-source-vs-closed-source-llm.md` },
      { text: "小语言模型（SLM）：小而美", link: `${commonPath}/small-language-models.md` },
      { text: "模型评估实战：从 BLEU 到 LLM-as-Judge", link: `${commonPath}/model-evaluation-practice.md` },
    ],
  },
  {
    text: "AI 产品与工程化",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "AI 产品设计：如何设计不确定的产品", link: `${commonPath}/ai-product-design.md` },
    ],
  },
];

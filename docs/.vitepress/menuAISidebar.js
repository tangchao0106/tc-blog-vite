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
];

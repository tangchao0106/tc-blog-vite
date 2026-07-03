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
    ],
  },
];

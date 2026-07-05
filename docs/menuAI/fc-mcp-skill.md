---
title: 大模型"三件套"：Function Calling、MCP、Skill 一文讲透
author: 唐超
date: '2026-07-05'
---

# 大模型"三件套"：Function Calling、MCP、Skill 一文讲透

> 一篇写给前端开发者的"大模型工具调用"面试指南。把 FC / MCP / Skill 三个最容易混的概念，用"招聘""物业""插件"三个比喻讲清楚。

## 开场白：面试官的灵魂三连

假设你去面试 AI 应用开发岗位，面试官大概率会问你这三个问题：

> **Q1：你们项目里大模型是怎么"调用外部接口"的？**
> **Q2：听说过 MCP 协议吗？跟 Function Calling 什么关系？**
> **Q3：现在大家都在做 Skill（技能），这又是个啥？**

别慌。这三个东西其实是**同一件事在不同层面的解决方案**——让大模型从"只会说话"进化到"能干活"。这篇文章，我们就用最接地气的方式把它们一次讲透。

---

## 一、先打个比方：把大模型想象成"新员工"

### 1.1 原始状态：一个只会"纸上谈兵"的应届生

ChatGPT 刚出来那会儿，本质就是个**聊天机器人**。你问它"北京今天多少度？"，它会一本正经地胡说八道（这就是幻觉问题，参见 #35）。

为什么？**因为它只知道训练数据截止日之前的信息，而且没有"动手能力"**。

### 1.2 进化路径：给员工配"三件套"

我们要让这个"新员工"能真正干活，就得给它配工具：

| 三件套 | 比喻 | 核心作用 |
|--------|------|----------|
| **Function Calling** | 员工**工位上放着一本工具手册**，告诉他"要查天气，去找这个接口" | 让模型"知道有工具可用" |
| **MCP** | **公司统一采购了一批"标准化办公设备"**（打印机/投影仪/茶水间），所有员工按统一规格使用 | 让工具"跨模型/跨系统通用" |
| **Skill** | **员工在抽屉里整理好自己常用的"技能包"**，每次需要就喊一声"开技能" | 让工具"可复用、可分享、可沉淀" |

记住这个表格，下面我们一个个拆开讲。

---

## 二、Function Calling：让大模型"知道有工具可用"

### 2.1 面试题：Function Calling 是什么？

**一句话回答：** Function Calling（函数调用）是 LLM 厂商提供的一种**结构化输出能力**——模型不是直接给你答案，而是先"声明"它想调哪个函数、传什么参数，然后由你的代码去执行真正的函数。

### 2.2 用生活例子理解

想象你去餐厅吃饭：

```
你（用户）："我要一份宫保鸡丁，不要辣，多加花生。"
服务员（模型）："好的，我先确认下：菜品=宫保鸡丁，辣度=不辣，加料=花生×2，对吗？"
你："对。"
服务员 → 后厨：下单。
```

Function Calling 就是让"服务员"先**复述一遍订单**（结构化 JSON），再交给后厨执行。

### 2.3 代码示例：调用 OpenAI 的 Function Calling

```javascript
// Node.js + OpenAI 示例
import OpenAI from "openai";
const client = new OpenAI();

// 1. 告诉模型：你有哪些工具可用
const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "查询指定城市的天气",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "城市名，如：北京" }
        },
        required: ["city"]
      }
    }
  }
];

// 2. 用户提问
const messages = [{ role: "user", content: "北京今天多少度？" }];

// 3. 模型返回的不是答案，而是"函数调用指令"
const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages,
  tools,
  tool_choice: "auto"
});

console.log(response.choices[0].message.tool_calls);
// 输出：
// [{
//   id: 'call_abc123',
//   function: {
//     name: 'get_weather',
//     arguments: '{"city":"北京"}'
//   }
// }]
```

**关键点：** 模型没有"查"天气，它只是说"我需要调用 `get_weather('北京')`"。**真正的查天气逻辑，是你的代码去执行**的：

```javascript
// 4. 我们手动执行真正的函数
const weather = await getWeather("北京"); // 调天气 API

// 5. 把结果回传给模型，让它整理成自然语言
messages.push(response.choices[0].message);
messages.push({
  role: "tool",
  tool_call_id: "call_abc123",
  content: JSON.stringify(weather)
});

const final = await client.chat.completions.create({
  model: "gpt-4o",
  messages
});

console.log(final.choices[0].message.content);
// "北京今天 25℃，晴，空气质量良好。"
```

### 2.4 面试常问：FC 的本质是什么？

**答：FC 本质是"让模型输出结构化 JSON"的一种 prompt 工程技巧**。

模型本身不会"调用函数"——它只是**在 JSON 里告诉你它想用什么工具、传什么参数**。真正执行函数的是你的业务代码。这就是为什么 FC 不是大模型的"新能力"，而是"输出格式约定"。

---

## 三、MCP：让工具"跨模型通用"的协议

### 3.1 面试题：MCP 解决了什么问题？

Function Calling 看着挺好，但有个**致命问题**：

> OpenAI 的 FC 格式 ≠ Anthropic 的 FC 格式 ≠ Google 的 FC 格式 ≠ DeepSeek 的 FC 格式

每个厂商的 `tools` 字段定义、参数结构、返回值约定都不一样。如果你的 Agent 要支持 5 个模型，就得写 5 套适配代码。

**MCP（Model Context Protocol，模型上下文协议）就是来解决这个问题的。** 它由 Anthropic 在 2024 年 11 月开源，目标类似"AI 时代的 USB 协议"——插上就能用。

### 3.2 比喻：MCP = "办公设备的统一标准"

回到餐厅比喻。Function Calling 像是每家店自己定义"菜单格式"：

- A 店："宫保鸡丁，不辣"
- B 店："菜品=宫保鸡丁 & 辣度=不辣"
- C 店：用 emoji 🍗🌶️❌

**MCP 就是让全行业用"同一份菜单格式"**。一旦你的工具按 MCP 协议暴露一次，所有支持 MCP 的客户端（Claude Desktop、Cursor、Cline 等）都能直接调用。

### 3.3 MCP 的三个核心角色

```
┌──────────┐    JSON-RPC     ┌──────────┐    stdio/HTTP     ┌──────────┐
│  Host    │  ◄──────────►   │  Client  │  ◄────────────►   │  Server  │
│(Claude等)│                 │(协议层)  │                   │(工具实现)│
└──────────┘                 └──────────┘                   └──────────┘
```

| 角色 | 职责 | 例子 |
|------|------|------|
| **MCP Host** | 跟用户交互的 LLM 应用 | Claude Desktop、Cursor |
| **MCP Client** | 协议客户端，维护 1:1 连接 | 嵌入在 Host 里的 SDK |
| **MCP Server** | 暴露具体工具/资源/提示词 | 你写的"天气查询服务" |

### 3.4 代码示例：写一个最简单的 MCP Server

```python
# weather_mcp_server.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("WeatherServer")

@mcp.tool()
def get_weather(city: str) -> str:
    """查询指定城市的天气"""
    # 实际项目中调天气 API
    return f"{city}：25℃，晴"

if __name__ == "__main__":
    mcp.run()
```

```json
// claude_desktop_config.json - 告诉 Claude 怎么连这个 server
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": ["/path/to/weather_mcp_server.py"]
    }
  }
}
```

配置好后，你在 Claude Desktop 里问"北京天气"，Claude 会**自动**通过 MCP 协议调用你写的 `get_weather` 工具——**完全不用为 Claude 单独写适配**。

### 3.5 面试常问：MCP 和 FC 是什么关系？

**答：MCP 是"FC 的标准化升级版"。**

- **FC** 是"模型 ↔ 工具"的**点对点**调用协议（每个厂商一套）
- **MCP** 是"客户端 ↔ 工具服务器"的**统一标准**，模型内部依然走 FC，但工具侧不用重复适配

> 一句话总结：**MCP 不替代 FC，MCP 让 FC 的"工具侧"可以一次开发、到处运行。**

---

## 四、Skill：让工具"沉淀为可复用资产"

### 4.1 面试题：Skill 又是个啥？

如果说 FC 是"工具说明书"，MCP 是"通用接口标准"，那 **Skill（技能）就是"封装好的工作流"**。

**Skill 的核心思想：把"调工具的流程"打包成一个指令，让模型一键触发。**

### 4.2 比喻：Skill = "员工的技能包"

新员工入职后，行政不会给他一本"全公司工具使用手册"，而是给他**几个常用 Skill**：

- 📧 Skill: 发送周报
- 📊 Skill: 同步数据到飞书
- 🐛 Skill: 提个 Jira Bug

员工要"发周报"，直接说"开 Skill：发周报"——系统自动调用"获取本周任务 → 汇总 → 发邮件"这一串流程。

### 4.3 Skill 和 FC / MCP 的区别

| 维度 | Function Calling | MCP | Skill |
|------|------------------|-----|-------|
| **颗粒度** | 单一函数 | 单一工具/资源 | 一整套工作流 |
| **标准化** | 各家厂商私有 | 行业统一协议 | 厂商/平台自定义 |
| **触发方式** | 模型自主判断 | 客户端路由 | 用户/模型显式调用 |
| **典型场景** | 调一个 API | 跨系统接工具 | 沉淀团队最佳实践 |

### 4.4 代码示例：OpenClaw 的 Skill 是怎么写的

OpenClaw（一个 AI Agent 平台）把 Skill 设计成了一个**目录约定**：

```
~/.qclaw/skills/my-skill/
├── SKILL.md          # 技能的"身份证"，包含 description
├── scripts/          # 实际执行的脚本
└── references/       # 知识库、文档
```

`SKILL.md` 的核心是 frontmatter 里的 `description`，模型根据它来决定何时触发该技能：

```markdown
---
name: git-commit
description: |
  自动分析 git diff 并生成符合 Conventional Commits 规范的提交信息。
  当用户说"提交代码""commit 一下"时触发。
---

# Git 提交助手

## 触发条件
- 用户说"提交代码"
- 检测到 .git 目录且有未提交变更

## 执行流程
1. 读取 git diff
2. 让 LLM 分析变更并生成 commit message
3. 执行 git commit
```

**本质上，Skill = "提示词 + 工具调用 + 工作流"的封装。** 模型看到 `description` 后，就知道"哦这个场景要调这个技能"。

### 4.5 面试常问：什么场景该用 Skill？

**答：当一个"调工具的流程"被重复使用 ≥ 3 次，就应该抽成 Skill。**

比如你的 Agent 每天要：
1. 拉 GitHub Issue
2. 用 LLM 分类（bug/feature/question）
3. 写到飞书表格
4. @对应的同事

这套流程跑了 3 次以上，就该抽成 `daily-issue-sync` Skill，下次直接说"开技能"就行。

---

## 五、三者的关系总结

最后用一张图说清三者的层次关系：

```
┌────────────────────────────────────────────────────────┐
│  Skill（技能层）                                        │
│  "开技能：发周报" → 自动调用下面一串工具                 │
│                                                        │
│  ┌──────────────────────────────────────────────┐      │
│  │  MCP（协议层）                               │      │
│  │  "统一接口标准，所有工具按这套规范暴露"        │      │
│  │                                              │      │
│  │  ┌──────────────────────────────────────┐    │      │
│  │  │  Function Calling（调用层）          │    │      │
│  │  │  "模型告诉你它要调哪个函数、传啥参数" │    │      │
│  │  └──────────────────────────────────────┘    │      │
│  └──────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────┘
```

**自上而下的逻辑：**
- 用户说"开技能" → **Skill** 决定要调哪些工具
- 调工具时 → 走 **MCP** 标准协议，连到对应 Server
- 工具内部 → 模型用 **Function Calling** 决定参数

---

## 六、面试前必背的 5 个 QA

### Q1：FC 本质是啥？
**A：** 让模型输出结构化 JSON 指令，由业务代码去真正执行函数。模型本身不会"调用"任何东西。

### Q2：MCP 跟 FC 啥关系？
**A：** MCP 是 FC 的"工具侧标准化"，让工具一次开发、跨模型通用。模型内部仍走 FC。

### Q3：什么场景用 Skill？
**A：** 同一套"调工具流程"被反复使用时，抽成 Skill 提高复用性。

### Q4：FC 有没有"幻觉"问题？
**A：** 有。模型可能编造不存在的函数名或参数，需要在代码侧做**白名单校验**（不允许的 function 直接拒绝）。

### Q5：作为前端，我该学哪个？
**A：** 优先级：**FC > MCP > Skill**。
- FC 必学，所有 LLM API 都用得到
- MCP 了解协议即可，重点是看懂 MCP Server 的实现
- Skill 关注"工作流封装"思想，不一定要自己造轮子

---

## 写在最后

FC / MCP / Skill 不是"三个并列的技术"，而是**让大模型干活的三个层次**：

- **FC** 是最底层的"工具调用约定"
- **MCP** 是中层的"协议标准化"
- **Skill** 是上层的"工作流封装"

搞懂这个层次关系，面试官再怎么追问，你都能稳稳接住。

> **下篇预告：** Agent 智能体架构——怎么把 FC/MCP/Skill 串成一个能自主决策的 AI 员工。

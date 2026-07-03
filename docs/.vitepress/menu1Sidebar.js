const commonPath = "/menu1";

export default [
  {
    text: "VUE系列",
    collapsible: true,
    collapsed: false,
    items: [
      {
        text: "在 Vue 中为什么不推荐用 index 做 key",
        link: `${commonPath}/在 Vue 中为什么不推荐用 index 做 key.md`,
      },
      { text: "虚拟 DOM", link: `${commonPath}/虚拟 DOM.md` },
      { text: "nextTick 实现原理", link: `${commonPath}/nextTick 实现原理.md` },
      {
        text: "vue2源码生命周期合并策略梳理",
        link: `${commonPath}/vue2源码生命周期合并策略梳理.md`,
      },
      {
        text: "VUE3初始化流程",
        link: `${commonPath}/VUE3初始化流程.md`,
      },
      {
        text: "vue源码中hasChanged函数",
        link: `${commonPath}/vue源码中haschange函数.md`,
      },
      {
        text: "视频笔记（性能优化/vuex等）",
        link: `${commonPath}/视频笔记.md`,
      },
    ],
  },
  {
    text: "React系列",
    collapsible: true,
    collapsed: false,
    items: [
      {
        text: "react组件",
        link: `${commonPath}/react组件.md`,
      },
      {
        text: "ReactRouter6快速上手",
        link: `${commonPath}/ReactRouter6快速上手.md`,
      },
      {
        text: "react笔记",
        link: `${commonPath}/react笔记.md`,
      },
    ],
  },
  {
    text: "JS系列",
    collapsible: true,
    collapsed: false,
    items: [
      {
        text: "原型链笔记",
        link: `${commonPath}/原型链笔记.md`,
      },
      {
        text: "为什么使用 Object.prototype.toString.call()",
        link: `${commonPath}/为什么使用 Object.prototype.toString.call().md`,
      },
      {
        text: "call apply bind 笔记",
        link: `${commonPath}/call apply bind 笔记.md`,
      },
      {
        text: "关于输入框非空的判断",
        link: `${commonPath}/关于输入框非空的判断.md`,
      },
      {
        text: "Promise易错点",
        link: `${commonPath}/Promise易错点.md`,
      },
      {
        text: "Ajax 与跨域",
        link: `${commonPath}/Ajax.md`,
      },
      {
        text: "babel为什么需要babel-polyfill",
        link: `${commonPath}/babel为什么需要bable-pollyfill.md`,
      },
      {
        text: "TIPS：npx vs npm",
        link: `${commonPath}/TIPS.md`,
      },
      {
        text: "40+ Vue3 实用工具分享",
        link: `${commonPath}/40+ Vue3 实用工具分享  技术胖整理.md`,
      },
      {
        text: "GitHooks使用",
        link: `${commonPath}/GitHooks.md`,
      },
      {
        text: "开发CLI",
        link: `${commonPath}/开发CLI.md`,
      },
    ],
  },
  {
    text: "Webpack系列",
    collapsible: true,
    collapsed: false,
    items: [
      {
        text: "尚硅谷笔记",
        link: `${commonPath}/尚硅谷笔记.md`,
      },
    ],
  },
  {
    text: "Android / Flutter",
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: "热更新classloader",
        link: "/menu3/a.md",
      },
    ],
  },
  {
    text: "随笔",
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: "骏马面前无沟壑，怂人面前全是坎",
        link: "/menu2/a.md",
      },
    ],
  },
];

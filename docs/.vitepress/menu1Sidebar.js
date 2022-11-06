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
        text: "视频笔记",
        link: `${commonPath}/视频笔记.md`,
      },
    ],
  },
  {
    text: "React系列",
    collapsible: true,
    collapsed: false,
    items: [
      // {
      //   text: "JSX规则",
      //   link: `${commonPath}/jsx规则.md`,
      // },
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
        text: "babel为什么需要bable-pollyfill",
        link: `${commonPath}/babel为什么需要bable-pollyfill.md`,
      },
      {
        text: "40+ Vue3 实用工具分享  技术胖整理",
        link: `${commonPath}/40+ Vue3 实用工具分享  技术胖整理.md`,
      },
      {
        text: "GitHooks使用",
        link: `${commonPath}/GitHooks.md`,
      },
    ],
  },
];

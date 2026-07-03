import menu1Sidebar from "./menu1Sidebar";
import menu2Sidebar from "./menu2Sidebar";
import menu3Sidebar from "./menu3Sidebar";
import menuAISidebar from "./menuAISidebar";

export default {
  base: "/tc-blog-vite/",
  title: "唐超",
  description: "唐超的技术笔记",

  themeConfig: {
    siteTitle: "唐超学习笔记",
    logo: "/logo.png",

    nav: [
      { text: "首页", link: "/menu1/", activeMatch: "/menu1/" },
      { text: "AI 专题", link: "/menuAI/", activeMatch: "/menuAI/" },
    ],

    sidebar: {
      "/menu1/": menu1Sidebar,
      "/menu2/": menu2Sidebar,
      "/menu3/": menu3Sidebar,
      "/menuAI/": menuAISidebar,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/tangchao0106/tc-blog-vite" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present tangchao",
    },
  },
};

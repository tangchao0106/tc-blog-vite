import menu1Sidebar from "./menu1Sidebar";
import menu2Sidebar from "./menu2Sidebar";
import menu3Sidebar from "./menu3Sidebar";

export default {
  base: "/tc-blog-vite/",
  title: "唐超",
  description: "唐超笔记2022",

  themeConfig: {
    siteTitle: "唐超学习笔记",
    logo: "/logo.png",

    nav: [
      { text: "首页", link: "/menu1/", activeMatch: "/menu1/" },
      { text: "小作文", link: "/menu2/", activeMatch: "/menu2/" },
      { text: "ANDROID", link: "/menu3/", activeMatch: "/menu3/" },
    ],

    sidebar: {
      "/menu1/": menu1Sidebar,
      "/menu2/": menu2Sidebar,
      "/menu3/": menu3Sidebar,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/tangchao0106/tc-blog-vite" },
      { icon: "twitter", link: "..." },
      //   { icon: "discord", link: "..." },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present tangchao",
    },
  },
};

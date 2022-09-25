# 1. 前言

作为一名前端开发，日常开发的技术栈是`Vue`，博文将用来记录笔记开阔自己的知识视野，

[vue2学习笔记](https://github.com/tangchao0106/my-vue2)

[实现mini-vue3](https://github.com/tangchao0106/tangchao-mini-vue3)

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/11247099',
    name: 'Evan You',
    title: '托尼老师',
    links: [
      { icon: 'github', link: 'https://github.com/antfu' },
    
    ]
  },
  {
    avatar: 'https://github.com/tangchao0106.png',
    name: 'Tang Chao',
    title: 'Vue开发',
    links: [
      { icon: 'github', link: 'https://github.com/tangchao0106' },
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgw.alicdn.com%2Fbao%2Fuploaded%2Fi3%2FTB1woAsGVXXXXblXFXXXXXXXXXX_%21%210-item_pic.jpg_460x460xz.jpg&refer=http%3A%2F%2Fgw.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666702410&t=ca7b46bb7b0f26d7edca7fcc668f243f',
    name: '杨幂',

    links: [
      { icon: 'github', link: 'https://github.com/tangchao0106' },
    ]
  },

]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
       Vue  study
    </template>
    <template #lead>
Hi there 👋
I'm working full time on KN.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    size="small"
    :members="members"
  />
</VPTeamPage>

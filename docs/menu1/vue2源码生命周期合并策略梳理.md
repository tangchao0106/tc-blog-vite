---
title: vue2源码生命周期合并策略梳理
author: 唐超
date: '2022-09-12'
---
- 1在参数合并阶段会把所有同类钩子先合并成数组，然后存放在 vm.$options
  - 由于 insertedVnodeQueue 的添加顺序是先⼦后⽗，所以对于同步渲染的⼦组件⽽⾔，mounted 钩 ⼦函数的执⾏顺序也是先⼦后⽗
- 2初始化设置一些标志位，表明是否已经完成某种钩子;
- 3调用生命周期钩子函数执行的 callHook 方法
- 4当组件检测到存在生命周期钩子的事件侦听器时，这个时候就会执行vm.$emit('hook:' + hook) 回调函数



```
function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
  return res
    ? dedupeHooks(res)
    : res
}

```
## 生命周期合并策略梳理
![生命周期合并策略梳理](/生命周期合并策略梳理.png)


####  ps：vuepress `public文件夹里面可以放中文图片，其他路径放中文文件名报错`


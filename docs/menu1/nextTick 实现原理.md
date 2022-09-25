---
title: nextTick 实现原理
author: 唐超
date: '2021-12-12'
---
**宏任务**一般是：包括整体代码script，setTimeout，setInterval、setImmediate。

**微任务**：原生Promise(有些实现的promise将then方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver
记住就行了。


因为 vue 采用的异步更新策略，当监听到数据发生变化的时候不会立即去更新DOM，
而是开启一个任务队列，并缓存在同一事件循环中发生的所有数据变更;
这种做法带来的好处就是可以将多次数据更新合并成一次，减少操作DOM的次数，
如果不采用这种方法，假设数据改变100次就要去更新100次DOM，而频繁的DOM更新是很耗性能的；
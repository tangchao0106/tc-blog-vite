---
title: babel为什么需要bable-pollyfill
author: 唐超
date: '2021-12-12'
---
Babel默认只转换新的JavaScript语法（syntax），而不转换新的 API。

新的API分类两类，一类是Promise、Map、Symbol、Proxy、Iterator等全局对象及其对象自身的方法，例如Object.assign，Promise.resolve；另一类是新的实例方法，例如数组实例方法[1, 4, -5, 10].find((item) => item < 0)

如果想让ES6新的API在低版本浏览器正常运行，我们就不能只做语法转换。

在前端web工程里，最常规的做法是使用polyfill，为当前环境提供一个垫片。所谓垫片，是指垫平不同浏览器之间差异的东西。polyfill提供了全局的ES6对象以及通过修改原型链Array.prototype等实现对实例的实现。

polyfill广义上讲是为环境提供不支持的特性的一类文件或库，狭义上讲是polyfill.js文件以及@babel/polyfill这个npm包。

[引入polyfill](https://www.jiangruitao.com/babel/use-polyfill/)
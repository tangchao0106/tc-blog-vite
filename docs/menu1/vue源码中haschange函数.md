---
title: vue源码中hasChanged函数
author: 唐超
date: '2022-09-15'
---
vue3源码中关于判断2个对象是否相等hasChanged方法，该函数位于vue/@shared。源代码片段如下所示：
```
export const hasChanged = (value: any, oldValue: any): boolean => {
    return !Object.is(value, oldValue)
}
```
Object.is方法来自ES6，能够确定两个值是否相同。如果满足以下条件之一，则两个值相同：

[来自MDN解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
- 两个都是undefined
- 两个都是null
- 两个长度相同、字符顺序相同的string
- 两个都是true或者都是false
- 两个object对象都引用堆中分配的相同内存地址
- 两个值是number：
- 都是-0或者都是+0
- 都是NaN
- 都是非零和非NaN都具有相同的值


实现一个自己的Object
```
Object.defineProperty(Object, 'is', {
    value(x, y) {
        return x === y
            ? 1 / x === 1 / y // +0 != -0
            : x !== x && y !== y // NaN == NaN
    }
})
```
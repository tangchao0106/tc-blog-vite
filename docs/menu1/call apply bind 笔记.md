---
title: call apply bind 笔记
author: 唐超
date: '2022-01-12'
---
### call是函数的方法，用在函数上,改变this指向
```
function fn() {
name:"fn",
  console.log("call 是函数的方法 改变this指向", this.name);
}
let dog = {
  name: "dog-name",
};
fn.call(dog); // dog-name


```

```
let dog2 = {
  name: "dog2",
  say(a, b) {
    console.log("传参", this.name, a, b);
  },
};
// dog2.say();
//改变this指向
// dog2.say.call(dog);
//传参多个
// dog2.say.call(dog, "aa", "bb");
//apply区别通过一个数组的形式入参
// dog2.say.apply(dog, ["apply1", "apply12"]);

// bind改变this指向，返回的是新函数，不会立即执行;
let fun3 = dog2.say.bind(dog, "aa", "bb");
fun3();
//传参 分开传参
let fun3 = dog2.say.bind(dog);
fun3("11", "22");
```
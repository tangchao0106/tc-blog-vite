### typeof 和 instanceof 判断的问题

使用 `typeof` 判断基本数据类型（包括 symbol）对 null 或引用类型判断不准确。

typeof Array //'object'

typeof Object //'object'

typeof Date //'object'

typeof null //'object'

得到的判断不准确

使用`instanceof` 来判断 null，则不把 null 当成 Object ，

```
null instanceof null  //报错 右边要是object
null instanceof Object  //false 则不把null当成Object
```

instanceof 只能判断引用类型
instanceof 也无法判断准确类型 例如数组 Object

```
console.log([] instanceof Object);//true
console.log([] instanceof Array);//true
```

对一个变量的类型来进行比较准确的判断使用 `Object.prototype.toString.call()`

```
Object.prototype.toString.call(null) // "[object Null]"

```

### Object.prototype.toString.call()为什么要加 call();

**Object.prototype.toString 可以返回当前调用者的对象类型。**
Object.prototype.toString()会返回[object, [[class]]]的字符串

其中[[class]]会返回 es 定义的对象类型，包含"Arguments", “Array”, “Boolean”, “Date”, “Error”, “Function”, “JSON”, “Math”, “Number”, “Object”, “RegExp”, 和 “String”；
再加上 es5 新增加的返回[object Undefined]和[object Null]

Object.prototype.toString()中，他的调用者永远都是 Object.prototype;所以，在不加 call()情况下，我们的出来的结果永远都是 '[object Object]'

call(),是为了改变 Object.prototype.toString 这个函数都指向。让 Object.prototype.toString 这个方法指向我们所传入的数据。

每个数据类，他们都重写了 toString()方法。所以，如果我们拿数据本身去 toString()，是得不到对象类型的。
必须用 Object.prototype.toString

因为有原型链，找到顶层的原型对象，再去 call 改变 this 指向

[参考连接](https://juejin.cn/post/7116114617834668062)

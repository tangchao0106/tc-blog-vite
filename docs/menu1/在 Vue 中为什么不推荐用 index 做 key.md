---
title: 在 Vue 中为什么不推荐用 index 做 key
author: 唐超
date: '2021-12-12'
---

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用就地**复用策略**

#### 用 index 作为 key 时，在对数据进行，逆序添加，逆序删除等破坏顺序的操作时，会全部更新。产生没必要的真实 DOM更新，从而导致效率低
#### 用 index 作为 key 时，如果结构中包含输入类的 DOM，会产生错误的 DOM 更新
#### 在开发中最好每条数据使用唯一标识固定的数据作为 key，比如后台返回的 ID，手机号，身份证号等唯一值
#### 如果不存在对数据逆序添加，逆序删除等破坏顺序的操作时，仅用于渲染展示用时，使用 index 作为 key 也是可以的（但是还是不建议使用，养成良好开发习惯）

为什么我没有复现大部分时候我们即使使用index作为key，不会复现这个问题，这好像与我们上述分析不符。但是事实上，“使用index作为key并且不会出问题”这种场景，其实过程是这样的：
### 第一步：通过修改数据删除第一行，数据变化引起vue去更新视图，更新的过程中发现key相同，最终第一行保持不变，反而是第二行消失。这是第一次render。
### 第二步：第一行的VirtualDOM的确没有变，但是第一行的组件的props变了，由原来第一行的props，变成了第二行的props，由于props变化，第一行的组件需要使用新的props更新视图，最终第一行变成了第二行的样子。这是第二次render。
也就是说，“使用index作为key并且不会出问题”这种场景，是因为render了两次，才最终达成了视图的正确更新。
```
    <template v-if="switched">
      <p>正常的例子：删除哪行，的确是删了哪行</p>
      <div v-for="(item, index) in data" :key="index">
        <StateComponent :name="`依赖于状态的属性+${item.name}`"/>
        <button @click="handleDelete(index)">删除这一行</button>
      </div>
    </template>
    <template v-else>
      <p>异常的例子：删除哪行，不符合预期</p>
      <div v-for="(item, index) in data" :key="index">
        <StaticComponent :name="`不依赖于状态的属性`"/>
        <button @click="handleDelete(index)">删除这一行</button>
      </div>
    </template>
```
不更新示例，checkbox被复用 `临时 DOM 状态 表单输入值`  
```
<input type="text" />
--------------------
      <li v-for="(item, index) in list" :key="index">
        <input type="checkbox" name="" id="" />
        <span>item: {{ item }}</span>
        <button @click="deleteItem(index)">删除</button>
      </li>

```
`依赖子组件状态` 子组件有自己的data数据，则这个数据不更新
```
子组件
<div>
  <span>{{ name }}</span>
  count值为：{{ innerCount }}
  <button @click="$emit('delete')">-</button>
</div>
...
data() {
  return {
    innerCount: this.count
  } 
}
innerCount这个数据不是props过来的，不是响应式
```



### 结论
在使用非文本节点的组件，且这个组件没有依赖于响应式的props，那么此时对于列表的删除操作会导致视图错乱。
如果是文本节点 Vue的Diff过程对文本节点有特殊处理，不管key一不一样，都会用“新的文本节点”覆盖“旧的文本节点”。

写列表渲染时， `依赖子组件状态`或`临时 DOM 状态`的情况，如果有 删除、增加、排序这样的功能，不要把 index 作为 key。

### 笔记2
当我们修改了数据，数据的变动会触发订阅该数据变化的dom对象的更新，这个过程大致可分为三个阶段：

#### 1首选是会重新构建虚拟dom树
#### 2然后对比新旧虚拟dom树的节点,这里使用的就是大名鼎鼎的 differ 算法，也是这里要展开讲述的核心
#### 3根据对比结果，删除、添加、更新真实的dom节点。而非全部更新替换，这也就是虚拟dom的优势所在。

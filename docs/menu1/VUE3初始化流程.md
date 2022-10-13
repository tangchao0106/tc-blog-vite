### 初始化流程

- 1 runtime-dom createApp 方法 ensureRenderer
- 2 createRenderer 一开始没有渲染器，去创建一个渲染器
- 3 runtime-core renderer.ts 文件 baseCreateRenderer 方法

  - 返回 createAppAPI
  - 实现

  ```
  baseCreateRenderer方法
    return {
   render,
   hydrate,
   createApp: createAppAPI(render, hydrate)
  }


  ```

  render 方法

  ```
    const render: RootRenderFunction = (vnode, container, isSVG) => {
   if (vnode == null) {
     if (container._vnode) {
       unmount(container._vnode, null, null, true)
     }
   } else {
     patch(container._vnode || null, vnode, container, null, null, null, isSVG)
   }
   flushPostFlushCbs()
   container._vnode = vnode
  }

  ```

  apiCreateApp.ts 中 createAppAPI 创建虚拟 dom。调用 render 方法
  mount

```
  if (isHydrate && hydrate) {
           hydrate(vnode as VNode<Node, Element>, rootContainer as any)
         } else {
           render(vnode, rootContainer, isSVG)
         }
```

- 4 开始走 patch 方法 processComponent--mountComponent - 生成 instance 没看懂

- 5 没看懂 setupComponent(instance) 对属性、插槽做初始化，如果是状态形组件，代码会走 setupStatefulComponent
- 6 setupRenderEffect

import{_ as a,o as s,c as e,a0 as p}from"./chunks/framework.CSK6mTG2.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"menu1/VUE3初始化流程.md","filePath":"menu1/VUE3初始化流程.md"}'),t={name:"menu1/VUE3初始化流程.md"};function l(i,n,o,r,c,d){return s(),e("div",null,[...n[0]||(n[0]=[p(`<h3 id="初始化流程" tabindex="-1">初始化流程 <a class="header-anchor" href="#初始化流程" aria-label="Permalink to &quot;初始化流程&quot;">​</a></h3><ul><li><p>1 runtime-dom createApp 方法 ensureRenderer</p></li><li><p>2 createRenderer 一开始没有渲染器，去创建一个渲染器</p></li><li><p>3 runtime-core renderer.ts 文件 baseCreateRenderer 方法</p><ul><li>返回 createAppAPI</li><li>实现</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>baseCreateRenderer方法</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span> render,</span></span>
<span class="line"><span> hydrate,</span></span>
<span class="line"><span> createApp: createAppAPI(render, hydrate)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>render 方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  const render: RootRenderFunction = (vnode, container, isSVG) =&gt; {</span></span>
<span class="line"><span> if (vnode == null) {</span></span>
<span class="line"><span>   if (container._vnode) {</span></span>
<span class="line"><span>     unmount(container._vnode, null, null, true)</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span> } else {</span></span>
<span class="line"><span>   patch(container._vnode || null, vnode, container, null, null, null, isSVG)</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> flushPostFlushCbs()</span></span>
<span class="line"><span> container._vnode = vnode</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>apiCreateApp.ts 中 createAppAPI 创建虚拟 dom。调用 render 方法 mount</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  if (isHydrate &amp;&amp; hydrate) {</span></span>
<span class="line"><span>           hydrate(vnode as VNode&lt;Node, Element&gt;, rootContainer as any)</span></span>
<span class="line"><span>         } else {</span></span>
<span class="line"><span>           render(vnode, rootContainer, isSVG)</span></span>
<span class="line"><span>         }</span></span></code></pre></div><ul><li><p>4 开始走 patch 方法 processComponent--mountComponent - 生成 instance 没看懂</p></li><li><p>5 没看懂 setupComponent(instance) 对属性、插槽做初始化，如果是状态形组件，代码会走 setupStatefulComponent</p></li><li><p>6 setupRenderEffect</p></li></ul>`,4)])])}const m=a(t,[["render",l]]);export{h as __pageData,m as default};

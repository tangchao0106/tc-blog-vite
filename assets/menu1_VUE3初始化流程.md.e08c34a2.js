import{_ as n,o as s,c as a,a as e}from"./app.865111c4.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"\u521D\u59CB\u5316\u6D41\u7A0B","slug":"\u521D\u59CB\u5316\u6D41\u7A0B","link":"#\u521D\u59CB\u5316\u6D41\u7A0B","children":[]}],"relativePath":"menu1/VUE3\u521D\u59CB\u5316\u6D41\u7A0B.md"}'),l={name:"menu1/VUE3\u521D\u59CB\u5316\u6D41\u7A0B.md"},p=e(`<h3 id="\u521D\u59CB\u5316\u6D41\u7A0B" tabindex="-1">\u521D\u59CB\u5316\u6D41\u7A0B <a class="header-anchor" href="#\u521D\u59CB\u5316\u6D41\u7A0B" aria-hidden="true">#</a></h3><ul><li><p>1 runtime-dom createApp \u65B9\u6CD5 ensureRenderer</p></li><li><p>2 createRenderer \u4E00\u5F00\u59CB\u6CA1\u6709\u6E32\u67D3\u5668\uFF0C\u53BB\u521B\u5EFA\u4E00\u4E2A\u6E32\u67D3\u5668</p></li><li><p>3 runtime-core renderer.ts \u6587\u4EF6 baseCreateRenderer \u65B9\u6CD5</p><ul><li>\u8FD4\u56DE createAppAPI</li><li>\u5B9E\u73B0</li></ul><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">baseCreateRenderer\u65B9\u6CD5</span></span>
<span class="line"><span style="color:#A6ACCD;">  return {</span></span>
<span class="line"><span style="color:#A6ACCD;"> render,</span></span>
<span class="line"><span style="color:#A6ACCD;"> hydrate,</span></span>
<span class="line"><span style="color:#A6ACCD;"> createApp: createAppAPI(render, hydrate)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>render \u65B9\u6CD5</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">  const render: RootRenderFunction = (vnode, container, isSVG) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;"> if (vnode == null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">   if (container._vnode) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     unmount(container._vnode, null, null, true)</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;"> } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">   patch(container._vnode || null, vnode, container, null, null, null, isSVG)</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"> flushPostFlushCbs()</span></span>
<span class="line"><span style="color:#A6ACCD;"> container._vnode = vnode</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>apiCreateApp.ts \u4E2D createAppAPI \u521B\u5EFA\u865A\u62DF dom\u3002\u8C03\u7528 render \u65B9\u6CD5 mount</p></li></ul><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">  if (isHydrate &amp;&amp; hydrate) {</span></span>
<span class="line"><span style="color:#A6ACCD;">           hydrate(vnode as VNode&lt;Node, Element&gt;, rootContainer as any)</span></span>
<span class="line"><span style="color:#A6ACCD;">         } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">           render(vnode, rootContainer, isSVG)</span></span>
<span class="line"><span style="color:#A6ACCD;">         }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><p>4 \u5F00\u59CB\u8D70 patch \u65B9\u6CD5 processComponent--mountComponent - \u751F\u6210 instance \u6CA1\u770B\u61C2</p></li><li><p>5 \u6CA1\u770B\u61C2 setupComponent(instance) \u5BF9\u5C5E\u6027\u3001\u63D2\u69FD\u505A\u521D\u59CB\u5316\uFF0C\u5982\u679C\u662F\u72B6\u6001\u5F62\u7EC4\u4EF6\uFF0C\u4EE3\u7801\u4F1A\u8D70 setupStatefulComponent</p></li><li><p>6 setupRenderEffect</p></li></ul>`,4),o=[p];function t(c,r,i,A,C,d){return s(),a("div",null,o)}const _=n(l,[["render",t]]);export{y as __pageData,_ as default};

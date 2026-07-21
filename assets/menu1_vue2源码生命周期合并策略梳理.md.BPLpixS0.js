import{_ as s,o as n,c as e,a0 as p}from"./chunks/framework.CSK6mTG2.js";const l="/tc-blog-vite/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5%E6%A2%B3%E7%90%86.png",h=JSON.parse('{"title":"vue2源码生命周期合并策略梳理","description":"","frontmatter":{"title":"vue2源码生命周期合并策略梳理","author":"唐超","date":"2022-09-12"},"headers":[],"relativePath":"menu1/vue2源码生命周期合并策略梳理.md","filePath":"menu1/vue2源码生命周期合并策略梳理.md"}'),t={name:"menu1/vue2源码生命周期合并策略梳理.md"};function i(c,a,o,r,u,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<ul><li>1在参数合并阶段会把所有同类钩子先合并成数组，然后存放在 vm.$options <ul><li>由于 insertedVnodeQueue 的添加顺序是先⼦后⽗，所以对于同步渲染的⼦组件⽽⾔，mounted 钩 ⼦函数的执⾏顺序也是先⼦后⽗</li></ul></li><li>2初始化设置一些标志位，表明是否已经完成某种钩子;</li><li>3调用生命周期钩子函数执行的 callHook 方法</li><li>4当组件检测到存在生命周期钩子的事件侦听器时，这个时候就会执行vm.$emit(&#39;hook:&#39; + hook) 回调函数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function mergeHook (</span></span>
<span class="line"><span>  parentVal: ?Array&lt;Function&gt;,</span></span>
<span class="line"><span>  childVal: ?Function | ?Array&lt;Function&gt;</span></span>
<span class="line"><span>): ?Array&lt;Function&gt; {</span></span>
<span class="line"><span>  const res = childVal</span></span>
<span class="line"><span>    ? parentVal</span></span>
<span class="line"><span>      ? parentVal.concat(childVal)</span></span>
<span class="line"><span>      : Array.isArray(childVal)</span></span>
<span class="line"><span>        ? childVal</span></span>
<span class="line"><span>        : [childVal]</span></span>
<span class="line"><span>    : parentVal</span></span>
<span class="line"><span>  return res</span></span>
<span class="line"><span>    ? dedupeHooks(res)</span></span>
<span class="line"><span>    : res</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="生命周期合并策略梳理" tabindex="-1">生命周期合并策略梳理 <a class="header-anchor" href="#生命周期合并策略梳理" aria-label="Permalink to &quot;生命周期合并策略梳理&quot;">​</a></h2><p><img src="`+l+'" alt="生命周期合并策略梳理"></p><h4 id="ps-vuepress-public文件夹里面可以放中文图片-其他路径放中文文件名报错" tabindex="-1">ps：vuepress <code>public文件夹里面可以放中文图片，其他路径放中文文件名报错</code> <a class="header-anchor" href="#ps-vuepress-public文件夹里面可以放中文图片-其他路径放中文文件名报错" aria-label="Permalink to &quot;ps：vuepress `public文件夹里面可以放中文图片，其他路径放中文文件名报错`&quot;">​</a></h4>',5)])])}const m=s(t,[["render",i]]);export{h as __pageData,m as default};

import{_ as e,o as n,c as a,a0 as t}from"./chunks/framework.CSK6mTG2.js";const _=JSON.parse('{"title":"Promise 易错","description":"","frontmatter":{"title":"Promise 易错","author":"唐超","date":"2022-09-13"},"headers":[],"relativePath":"menu1/Promise易错点.md","filePath":"menu1/Promise易错点.md"}'),p={name:"menu1/Promise易错点.md"};function l(o,s,i,r,c,m){return n(),a("div",null,[...s[0]||(s[0]=[t(`<p>来源 <a href="https://juejin.cn/post/6844904077537574919" target="_blank" rel="noreferrer">https://juejin.cn/post/6844904077537574919</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>console.log(&#39;start&#39;)</span></span>
<span class="line"><span>setTimeout(() =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;time&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>Promise.resolve().then(() =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;resolve&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>console.log(&#39;end&#39;)</span></span></code></pre></div><p>解析</p><ul><li>刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈进行执行，因此先打印出start和end。</li><li><code>setTimout作为一个宏任务被放入宏任务队列(下一个)</code></li><li>Promise.then作为一个微任务被放入微任务队列</li><li>本次宏任务执行完，检查微任务，发现Promise.then，执行它</li><li>接下来进入下一个宏任务，发现setTimeout，执行。</li></ul>`,4)])])}const u=e(p,[["render",l]]);export{_ as __pageData,u as default};

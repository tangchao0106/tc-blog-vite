import{_ as s,o as n,c as p,a0 as l}from"./chunks/framework.CSK6mTG2.js";const h=JSON.parse('{"title":"call apply bind 笔记","description":"","frontmatter":{"title":"call apply bind 笔记","author":"唐超","date":"2022-01-12"},"headers":[],"relativePath":"menu1/call apply bind 笔记.md","filePath":"menu1/call apply bind 笔记.md"}'),e={name:"menu1/call apply bind 笔记.md"};function t(o,a,i,c,d,u){return n(),p("div",null,[...a[0]||(a[0]=[l(`<h3 id="call是函数的方法-用在函数上-改变this指向" tabindex="-1">call是函数的方法，用在函数上,改变this指向 <a class="header-anchor" href="#call是函数的方法-用在函数上-改变this指向" aria-label="Permalink to &quot;call是函数的方法，用在函数上,改变this指向&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function fn() {</span></span>
<span class="line"><span>name:&quot;fn&quot;,</span></span>
<span class="line"><span>  console.log(&quot;call 是函数的方法 改变this指向&quot;, this.name);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>let dog = {</span></span>
<span class="line"><span>  name: &quot;dog-name&quot;,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>fn.call(dog); // dog-name</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let dog2 = {</span></span>
<span class="line"><span>  name: &quot;dog2&quot;,</span></span>
<span class="line"><span>  say(a, b) {</span></span>
<span class="line"><span>    console.log(&quot;传参&quot;, this.name, a, b);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// dog2.say();</span></span>
<span class="line"><span>//改变this指向</span></span>
<span class="line"><span>// dog2.say.call(dog);</span></span>
<span class="line"><span>//传参多个</span></span>
<span class="line"><span>// dog2.say.call(dog, &quot;aa&quot;, &quot;bb&quot;);</span></span>
<span class="line"><span>//apply区别通过一个数组的形式入参</span></span>
<span class="line"><span>// dog2.say.apply(dog, [&quot;apply1&quot;, &quot;apply12&quot;]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// bind改变this指向，返回的是新函数，不会立即执行;</span></span>
<span class="line"><span>let fun3 = dog2.say.bind(dog, &quot;aa&quot;, &quot;bb&quot;);</span></span>
<span class="line"><span>fun3();</span></span>
<span class="line"><span>//传参 分开传参</span></span>
<span class="line"><span>let fun3 = dog2.say.bind(dog);</span></span>
<span class="line"><span>fun3(&quot;11&quot;, &quot;22&quot;);</span></span></code></pre></div>`,3)])])}const r=s(e,[["render",t]]);export{h as __pageData,r as default};

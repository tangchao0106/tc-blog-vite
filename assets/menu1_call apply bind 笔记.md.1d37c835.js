import{_ as s,o as a,c as n,a as l}from"./app.865111c4.js";const u=JSON.parse('{"title":"call apply bind \u7B14\u8BB0","description":"","frontmatter":{"title":"call apply bind \u7B14\u8BB0","author":"\u5510\u8D85","date":"2022-01-12"},"headers":[{"level":3,"title":"call\u662F\u51FD\u6570\u7684\u65B9\u6CD5\uFF0C\u7528\u5728\u51FD\u6570\u4E0A,\u6539\u53D8this\u6307\u5411","slug":"call\u662F\u51FD\u6570\u7684\u65B9\u6CD5\uFF0C\u7528\u5728\u51FD\u6570\u4E0A-\u6539\u53D8this\u6307\u5411","link":"#call\u662F\u51FD\u6570\u7684\u65B9\u6CD5\uFF0C\u7528\u5728\u51FD\u6570\u4E0A-\u6539\u53D8this\u6307\u5411","children":[]}],"relativePath":"menu1/call apply bind \u7B14\u8BB0.md"}'),p={name:"menu1/call apply bind \u7B14\u8BB0.md"},o=l(`<h3 id="call\u662F\u51FD\u6570\u7684\u65B9\u6CD5\uFF0C\u7528\u5728\u51FD\u6570\u4E0A-\u6539\u53D8this\u6307\u5411" tabindex="-1">call\u662F\u51FD\u6570\u7684\u65B9\u6CD5\uFF0C\u7528\u5728\u51FD\u6570\u4E0A,\u6539\u53D8this\u6307\u5411 <a class="header-anchor" href="#call\u662F\u51FD\u6570\u7684\u65B9\u6CD5\uFF0C\u7528\u5728\u51FD\u6570\u4E0A-\u6539\u53D8this\u6307\u5411" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function fn() {</span></span>
<span class="line"><span style="color:#A6ACCD;">name:&quot;fn&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&quot;call \u662F\u51FD\u6570\u7684\u65B9\u6CD5 \u6539\u53D8this\u6307\u5411&quot;, this.name);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">let dog = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &quot;dog-name&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">fn.call(dog); // dog-name</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">let dog2 = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &quot;dog2&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  say(a, b) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(&quot;\u4F20\u53C2&quot;, this.name, a, b);</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">// dog2.say();</span></span>
<span class="line"><span style="color:#A6ACCD;">//\u6539\u53D8this\u6307\u5411</span></span>
<span class="line"><span style="color:#A6ACCD;">// dog2.say.call(dog);</span></span>
<span class="line"><span style="color:#A6ACCD;">//\u4F20\u53C2\u591A\u4E2A</span></span>
<span class="line"><span style="color:#A6ACCD;">// dog2.say.call(dog, &quot;aa&quot;, &quot;bb&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">//apply\u533A\u522B\u901A\u8FC7\u4E00\u4E2A\u6570\u7EC4\u7684\u5F62\u5F0F\u5165\u53C2</span></span>
<span class="line"><span style="color:#A6ACCD;">// dog2.say.apply(dog, [&quot;apply1&quot;, &quot;apply12&quot;]);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// bind\u6539\u53D8this\u6307\u5411\uFF0C\u8FD4\u56DE\u7684\u662F\u65B0\u51FD\u6570\uFF0C\u4E0D\u4F1A\u7ACB\u5373\u6267\u884C;</span></span>
<span class="line"><span style="color:#A6ACCD;">let fun3 = dog2.say.bind(dog, &quot;aa&quot;, &quot;bb&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">fun3();</span></span>
<span class="line"><span style="color:#A6ACCD;">//\u4F20\u53C2 \u5206\u5F00\u4F20\u53C2</span></span>
<span class="line"><span style="color:#A6ACCD;">let fun3 = dog2.say.bind(dog);</span></span>
<span class="line"><span style="color:#A6ACCD;">fun3(&quot;11&quot;, &quot;22&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,3),e=[o];function t(c,i,A,C,r,d){return a(),n("div",null,e)}const D=s(p,[["render",t]]);export{u as __pageData,D as default};

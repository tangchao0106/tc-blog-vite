import{_ as a,o as s,c as t,a0 as e}from"./chunks/framework.CSK6mTG2.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"menu1/react组件.md","filePath":"menu1/react组件.md"}'),p={name:"menu1/react组件.md"};function l(i,n,o,c,r,d){return s(),t("div",null,[...n[0]||(n[0]=[e(`<h3 id="_1-创建函数式组件" tabindex="-1">1.创建函数式组件 <a class="header-anchor" href="#_1-创建函数式组件" aria-label="Permalink to &quot;1.创建函数式组件&quot;">​</a></h3><ul><li>1.React 解析组件标签，找到了 MyComponent 组件。</li><li>2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟 DOM 转为真实 DOM，随后呈现在页面中。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>		function MyComponent(){</span></span>
<span class="line"><span>			console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式</span></span>
<span class="line"><span>			return &lt;h2&gt;我是用函数定义的组件(适用于【简单组件】的定义)&lt;/h2&gt;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		//2.渲染组件到页面</span></span>
<span class="line"><span>		ReactDOM.render(&lt;MyComponent/&gt;,document.getElementById(&#39;test&#39;))</span></span></code></pre></div><h3 id="_2-创建类式组件" tabindex="-1">2 创建类式组件 <a class="header-anchor" href="#_2-创建类式组件" aria-label="Permalink to &quot;2 创建类式组件&quot;">​</a></h3><ul><li>1.React 解析组件标签，找到了 MyComponent 组件。</li><li>2.发现组件是使用类定义的，随后 new 出来该类的实例，并通过该实例调用到原型上的 render 方法。</li><li>3.将 render 返回的虚拟 DOM 转为真实 DOM，随后呈现在页面中。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	class MyComponent extends React.Component {</span></span>
<span class="line"><span>			render(){</span></span>
<span class="line"><span>				//render是放在哪里的？—— MyComponent的原型对象上，供实例使用。</span></span>
<span class="line"><span>				//render中的this是谁？—— MyComponent的实例对象 &lt;=&gt; MyComponent组件实例对象。</span></span>
<span class="line"><span>				console.log(&#39;render中的this:&#39;,this);</span></span>
<span class="line"><span>				return &lt;h2&gt;我是用类定义的组件(适用于【复杂组件】的定义)&lt;/h2&gt;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		//2.渲染组件到页面</span></span>
<span class="line"><span>		ReactDOM.render(&lt;MyComponent/&gt;,document.getElementById(&#39;test&#39;))</span></span></code></pre></div><h3 id="区别-class-定义的组件中有-this-state-生命周期的钩子-而-function-声明的组件只有-props" tabindex="-1">区别 class 定义的组件中有 this，state，生命周期的钩子，而 function 声明的组件只有 props； <a class="header-anchor" href="#区别-class-定义的组件中有-this-state-生命周期的钩子-而-function-声明的组件只有-props" aria-label="Permalink to &quot;区别  class 定义的组件中有 this，state，生命周期的钩子，而 function 声明的组件只有 props；&quot;">​</a></h3>`,7)])])}const m=a(p,[["render",l]]);export{u as __pageData,m as default};

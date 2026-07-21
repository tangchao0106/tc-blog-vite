import{_ as a,o as n,c as i,a0 as t}from"./chunks/framework.CSK6mTG2.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"menu1/react笔记.md","filePath":"menu1/react笔记.md"}'),e={name:"menu1/react笔记.md"};function l(p,s,h,r,o,k){return n(),i("div",null,[...s[0]||(s[0]=[t(`<h2 id="_1-setstate" tabindex="-1">1. setState <a class="header-anchor" href="#_1-setstate" aria-label="Permalink to &quot;1. setState&quot;">​</a></h2><h3 id="setstate-更新状态的-2-种写法" tabindex="-1">setState 更新状态的 2 种写法 <a class="header-anchor" href="#setstate-更新状态的-2-种写法" aria-label="Permalink to &quot;setState 更新状态的 2 种写法&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	(1). setState(stateChange, [callback])------对象式的setState</span></span>
<span class="line"><span>            1.stateChange为状态改变对象(该对象可以体现出状态的更改)</span></span>
<span class="line"><span>            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	(2). setState(updater, [callback])------函数式的setState</span></span>
<span class="line"><span>            1.updater为返回stateChange对象的函数。</span></span>
<span class="line"><span>            2.updater可以接收到state和props。</span></span>
<span class="line"><span>            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。</span></span>
<span class="line"><span>总结:</span></span>
<span class="line"><span>		1.对象式的setState是函数式的setState的简写方式(语法糖)</span></span>
<span class="line"><span>		2.使用原则：</span></span>
<span class="line"><span>				(1).如果新状态不依赖于原状态 ===&gt; 使用对象方式</span></span>
<span class="line"><span>				(2).如果新状态依赖于原状态 ===&gt; 使用函数方式</span></span>
<span class="line"><span>				(3).如果需要在setState()执行后获取最新的状态数据,</span></span>
<span class="line"><span>					要在第二个callback函数中读取</span></span></code></pre></div><h2 id="_2-lazyload" tabindex="-1">2. lazyLoad <a class="header-anchor" href="#_2-lazyload" aria-label="Permalink to &quot;2. lazyLoad&quot;">​</a></h2><h3 id="路由组件的-lazyload" tabindex="-1">路由组件的 lazyLoad <a class="header-anchor" href="#路由组件的-lazyload" aria-label="Permalink to &quot;路由组件的 lazyLoad&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===&gt; 路由组件代码会被分开打包</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Login</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@/pages/Login&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	//2.通过&lt;Suspense&gt;指定在加载得到路由打包文件前显示一个自定义loading界面</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Suspense</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fallback</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;loading.....&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;}&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Switch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/xxx&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> component</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{Xxxx}/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Redirect</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> to</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/login&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Switch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Suspense</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><hr><h2 id="_3-hooks" tabindex="-1">3. Hooks <a class="header-anchor" href="#_3-hooks" aria-label="Permalink to &quot;3. Hooks&quot;">​</a></h2><h4 id="_1-react-hook-hooks-是什么" tabindex="-1">1. React Hook/Hooks 是什么? <a class="header-anchor" href="#_1-react-hook-hooks-是什么" aria-label="Permalink to &quot;1. React Hook/Hooks 是什么?&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(1). Hook是React 16.8.0版本增加的新特性/新语法</span></span>
<span class="line"><span>(2). 可以让你在函数组件中使用 state 以及其他的 React 特性</span></span></code></pre></div><h4 id="_2-三个常用的-hook" tabindex="-1">2. 三个常用的 Hook <a class="header-anchor" href="#_2-三个常用的-hook" aria-label="Permalink to &quot;2. 三个常用的 Hook&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(1). State Hook: React.useState()</span></span>
<span class="line"><span>(2). Effect Hook: React.useEffect()</span></span>
<span class="line"><span>(3). Ref Hook: React.useRef()</span></span></code></pre></div><h4 id="_3-state-hook" tabindex="-1">3. State Hook <a class="header-anchor" href="#_3-state-hook" aria-label="Permalink to &quot;3. State Hook&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作</span></span>
<span class="line"><span>(2). 语法: const [xxx, setXxx] = React.useState(initValue)</span></span>
<span class="line"><span>(3). useState()说明:</span></span>
<span class="line"><span>        参数: 第一次初始化指定的值在内部作缓存</span></span>
<span class="line"><span>        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数</span></span>
<span class="line"><span>(4). setXxx()2种写法:</span></span>
<span class="line"><span>        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值</span></span>
<span class="line"><span>        setXxx(value =&gt; newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值</span></span></code></pre></div><h4 id="_4-effect-hook" tabindex="-1">4. Effect Hook <a class="header-anchor" href="#_4-effect-hook" aria-label="Permalink to &quot;4. Effect Hook&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)</span></span>
<span class="line"><span>(2). React中的副作用操作:</span></span>
<span class="line"><span>        发ajax请求数据获取</span></span>
<span class="line"><span>        设置订阅 / 启动定时器</span></span>
<span class="line"><span>        手动更改真实DOM</span></span>
<span class="line"><span>(3). 语法和说明:</span></span>
<span class="line"><span>        useEffect(() =&gt; {</span></span>
<span class="line"><span>          // 在此可以执行任何带副作用操作</span></span>
<span class="line"><span>          return () =&gt; { // 在组件卸载前执行</span></span>
<span class="line"><span>            // 在此做一些收尾工作, 比如清除定时器/取消订阅等</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(4). 可以把 useEffect Hook 看做如下三个函数的组合</span></span>
<span class="line"><span>        componentDidMount()</span></span>
<span class="line"><span>        componentDidUpdate()</span></span>
<span class="line"><span>    	componentWillUnmount()</span></span></code></pre></div><h4 id="_5-ref-hook" tabindex="-1">5. Ref Hook <a class="header-anchor" href="#_5-ref-hook" aria-label="Permalink to &quot;5. Ref Hook&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据</span></span>
<span class="line"><span>(2). 语法: const refContainer = useRef()</span></span>
<span class="line"><span>(3). 作用:保存标签对象,功能与React.createRef()一样</span></span></code></pre></div><hr><h2 id="_4-fragment" tabindex="-1">4. Fragment <a class="header-anchor" href="#_4-fragment" aria-label="Permalink to &quot;4. Fragment&quot;">​</a></h2><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><pre><code>&lt;Fragment&gt;&lt;Fragment&gt;
&lt;&gt;&lt;/&gt;
</code></pre><h3 id="作用" tabindex="-1">作用 <a class="header-anchor" href="#作用" aria-label="Permalink to &quot;作用&quot;">​</a></h3><blockquote><p>可以不用必须有一个真实的 DOM 根标签了</p></blockquote><hr><h2 id="_5-context" tabindex="-1">5. Context <a class="header-anchor" href="#_5-context" aria-label="Permalink to &quot;5. Context&quot;">​</a></h2><h3 id="理解" tabindex="-1">理解 <a class="header-anchor" href="#理解" aria-label="Permalink to &quot;理解&quot;">​</a></h3><blockquote><p>一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信</p></blockquote><h3 id="使用-1" tabindex="-1">使用 <a class="header-anchor" href="#使用-1" aria-label="Permalink to &quot;使用&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) 创建Context容器对象：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> XxxContext</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> React.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xxxContext.Provider</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{数据}&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		子组件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xxxContext.Provider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) 后代组件读取数据：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	//第一种方式:仅适用于类组件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	  static contextType </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xxxContext  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 声明接收context</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.context </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 读取context中的value数据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	//第二种方式: 函数组件与类组件都可以</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	  &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xxxContext.Consumer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	    {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">	      value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ( </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// value就是context中的value数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	        要显示的内容</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	      )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	  &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xxxContext.Consumer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="注意" tabindex="-1">注意 <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意&quot;">​</a></h3><pre><code>在应用开发中一般不用context, 一般都它的封装react插件
</code></pre><hr><h2 id="_6-组件优化" tabindex="-1">6. 组件优化 <a class="header-anchor" href="#_6-组件优化" aria-label="Permalink to &quot;6. 组件优化&quot;">​</a></h2><h3 id="component-的-2-个问题" tabindex="-1">Component 的 2 个问题 <a class="header-anchor" href="#component-的-2-个问题" aria-label="Permalink to &quot;Component 的 2 个问题&quot;">​</a></h3><blockquote><ol><li><p>只要执行 setState(),即使不改变状态数据, 组件也会重新 render()</p></li><li><p>只当前组件重新 render(), 就会自动重新 render 子组件 ==&gt; 效率低</p></li></ol></blockquote><h3 id="效率高的做法" tabindex="-1">效率高的做法 <a class="header-anchor" href="#效率高的做法" aria-label="Permalink to &quot;效率高的做法&quot;">​</a></h3><blockquote><p>只有当组件的 state 或 props 数据发生改变时才重新 render()</p></blockquote><h3 id="原因" tabindex="-1">原因 <a class="header-anchor" href="#原因" aria-label="Permalink to &quot;原因&quot;">​</a></h3><blockquote><p>Component 中的 shouldComponentUpdate()总是返回 true</p></blockquote><h3 id="解决" tabindex="-1">解决 <a class="header-anchor" href="#解决" aria-label="Permalink to &quot;解决&quot;">​</a></h3><pre><code>办法1:
	重写shouldComponentUpdate()方法
	比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
办法2:
	使用PureComponent
	PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
	注意:
		只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false
		不要直接修改state数据, 而是要产生新数据
项目中一般使用PureComponent来优化
</code></pre><hr><h2 id="_7-render-props" tabindex="-1">7. render props <a class="header-anchor" href="#_7-render-props" aria-label="Permalink to &quot;7. render props&quot;">​</a></h2><h3 id="如何向组件内部动态传入带内容的结构-标签" tabindex="-1">如何向组件内部动态传入带内容的结构(标签)? <a class="header-anchor" href="#如何向组件内部动态传入带内容的结构-标签" aria-label="Permalink to &quot;如何向组件内部动态传入带内容的结构(标签)?&quot;">​</a></h3><pre><code>Vue中:
	使用slot技术, 也就是通过组件标签体传入结构  &lt;AA&gt;&lt;BB/&gt;&lt;/AA&gt;
React中:
	使用children props: 通过组件标签体传入结构
	使用render props: 通过组件标签属性传入结构, 一般用render函数属性
</code></pre><h3 id="children-props" tabindex="-1">children props <a class="header-anchor" href="#children-props" aria-label="Permalink to &quot;children props&quot;">​</a></h3><pre><code>&lt;A&gt;
  &lt;B&gt;xxxx&lt;/B&gt;
&lt;/A&gt;
{this.props.children}
问题: 如果B组件需要A组件内的数据, ==&gt; 做不到
</code></pre><h3 id="render-props" tabindex="-1">render props <a class="header-anchor" href="#render-props" aria-label="Permalink to &quot;render props&quot;">​</a></h3><pre><code>&lt;A render={(data) =&gt; &lt;C data={data}&gt;&lt;/C&gt;}&gt;&lt;/A&gt;
A组件: {this.props.render(内部state数据)}
C组件: 读取A组件传入的数据显示 {this.props.data}
</code></pre><hr><h2 id="_8-错误边界" tabindex="-1">8. 错误边界 <a class="header-anchor" href="#_8-错误边界" aria-label="Permalink to &quot;8. 错误边界&quot;">​</a></h2><h4 id="理解-1" tabindex="-1">理解： <a class="header-anchor" href="#理解-1" aria-label="Permalink to &quot;理解：&quot;">​</a></h4><p>错误边界：用来捕获后代组件错误，渲染出备用页面</p><h4 id="特点" tabindex="-1">特点： <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点：&quot;">​</a></h4><p>只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误</p><h5 id="使用方式" tabindex="-1">使用方式： <a class="header-anchor" href="#使用方式" aria-label="Permalink to &quot;使用方式：&quot;">​</a></h5><p>getDerivedStateFromError 配合 componentDidCatch</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 生命周期函数，一旦后台组件报错，就会触发</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">static </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getDerivedStateFromError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(error) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(error);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 在render之前触发</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 返回新的state</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        hasError: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">componentDidCatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(error, info) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 统计页面的错误。发送请求发送到后台去</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(error, info);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="_9-组件通信方式总结" tabindex="-1">9. 组件通信方式总结 <a class="header-anchor" href="#_9-组件通信方式总结" aria-label="Permalink to &quot;9. 组件通信方式总结&quot;">​</a></h2><h4 id="方式" tabindex="-1">方式： <a class="header-anchor" href="#方式" aria-label="Permalink to &quot;方式：&quot;">​</a></h4><pre><code>	props：
		(1).children props
		(2).render props
	消息订阅-发布：
		pubs-sub、event等等
	集中式管理：
		redux、dva等等
	conText:
		生产者-消费者模式
</code></pre><h4 id="组件间的关系" tabindex="-1">组件间的关系 <a class="header-anchor" href="#组件间的关系" aria-label="Permalink to &quot;组件间的关系&quot;">​</a></h4><pre><code>	父子组件：props
	兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
	祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)
</code></pre>`,64)])])}const E=a(e,[["render",l]]);export{c as __pageData,E as default};

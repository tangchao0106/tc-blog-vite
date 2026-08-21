import{_ as n,o as a,c as p,a0 as e}from"./chunks/framework.CSK6mTG2.js";const t="/tc-blog-vite/vue%E5%8E%9F%E5%9E%8B.png",l="/tc-blog-vite/%E5%B0%A4%E5%A4%A7%E5%8E%9F%E5%9E%8B.png",o="/tc-blog-vite/%E5%8E%9F%E5%9E%8B%E9%93%BE1.png",i="/tc-blog-vite/%E5%8E%9F%E5%9E%8B%E9%93%BE2.png",v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"menu1/原型链笔记.md","filePath":"menu1/原型链笔记.md"}'),c={name:"menu1/原型链笔记.md"};function r(u,s,h,d,b,g){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h3 id="vue-源码使用到的原型" tabindex="-1">vue 源码使用到的原型 <a class="header-anchor" href="#vue-源码使用到的原型" aria-label="Permalink to &quot;vue 源码使用到的原型&quot;">​</a></h3><p>使用 new 创建实例 。执行 init 方法，_init 方法构造函数没有此方法，往原型对象上找 此处使用 new 创建出来的 this，必定指向 VUE。</p><ul><li>new 干了什么？</li><li>instanceof 判断逻辑？</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var app = new Vue({</span></span>
<span class="line"><span>    data:{},</span></span>
<span class="line"><span>    watch:{}</span></span>
<span class="line"><span>}）</span></span>
<span class="line"><span>function Vue(options) {</span></span>
<span class="line"><span>  if (process.env.NODE_ENV !== &quot;production&quot; &amp;&amp; !(this instanceof Vue)) {</span></span>
<span class="line"><span>    warn(&quot;Vue is a constructor and should be called with the \`new\` keyword&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  this._init(options);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>initMixin(Vue);</span></span></code></pre></div><p><code>Vue源码使用到的原型</code><img src="`+t+`" width="20%"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    if (Array.isArray(value)) {</span></span>
<span class="line"><span>      // 通过能力检测的结果选择不同方式进行数组劫持</span></span>
<span class="line"><span>      if (hasProto) {</span></span>
<span class="line"><span>        protoAugment(value, arrayMethods); //如果浏览器支持隐式原型</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        copyAugment(value, arrayMethods, arrayKeys);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      this.observeArray(value);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      this.walk(value);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// can we use __proto__?</span></span>
<span class="line"><span>export const hasProto = &#39;__proto__&#39; in {}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function protoAugment(target, src: Object) {</span></span>
<span class="line"><span>  /* eslint-disable no-proto */</span></span>
<span class="line"><span>  target.__proto__ = src;</span></span>
<span class="line"><span>  /* eslint-enable no-proto */</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf" target="_blank" rel="noreferrer">MDN:通常，应该使用 Object.setPrototypeOf() 方法来设置对象的原型</a></p><p>源码中为什么使用<code>_proto_</code> 而没有使用 setPrototypeOf</p><img src="`+l+`" width="50%"><p><a href="https://github.com/vuejs/vue/issues/3813" target="_blank" rel="noreferrer">地址</a></p><h3 id="为什么要使用原型" tabindex="-1">为什么要使用原型 <a class="header-anchor" href="#为什么要使用原型" aria-label="Permalink to &quot;为什么要使用原型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>      function Foo(name) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>        this.showName = function () {</span></span>
<span class="line"><span>          console.log(&quot;I&#39;m &quot; + this.name);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>      }</span></span></code></pre></div><p>图上通过 Foo 创建出来的每一个对象，里面都有 showName 这样就会占用很多的资源。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>     function Foo(name) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      Foo.prototype.showName = function () {</span></span>
<span class="line"><span>        console.log(&quot;I&#39;m &quot; + this.name);</span></span>
<span class="line"><span>      };</span></span></code></pre></div><ul><li>而通过原型来实现的话，只需要在构造函数里面给属性赋值，而把方法写在 <code>Foo.prototype </code>属性 这样每个对象都可以使用 prototype 属性里面的方法，节省了不少的资源。</li><li>使用原型链解决继承问题</li></ul><h3 id="原型链笔记" tabindex="-1">原型链笔记 <a class="header-anchor" href="#原型链笔记" aria-label="Permalink to &quot;原型链笔记&quot;">​</a></h3><img src="`+o+'" width="50%"><img src="'+i+`" width="50%"><ul><li>每个对象都有一个<code>_proto_</code>属性，并且指向它的 prototype 原型对象</li><li>每个构造函数都有一个 prototype 原型对象- <ul><li>prototype 原型对象里的 constructor 指向构造函数本身 Person.prototype.constructor === Person</li></ul></li><li>当试图得到一个对象的属性时，如果这个对象本身不存在这个属性就会根据<em>proto</em>去 prototype 找。因为还是一个对象继续找 Object</li></ul><h4 id="object-create-null" tabindex="-1">Object.create(null) <a class="header-anchor" href="#object-create-null" aria-label="Permalink to &quot;Object.create(null)&quot;">​</a></h4><p><code>Object.create(null) 新建的对象是没有__proto__属性的</code></p><h4 id="hasownproperty" tabindex="-1">hasOwnProperty <a class="header-anchor" href="#hasownproperty" aria-label="Permalink to &quot;hasOwnProperty&quot;">​</a></h4><p>在原型链上查询属性比较耗时，对性能有影响，试图访问不存在的属性时会遍历整个原型链。遍历对象属性时，每个可枚举的属性都会被枚举出来。 <code>要检查是否具有自己定义的属性，而不是原型链上的属性</code>，必须使用 hasOwnProperty 方法。hasOwnProperty 是 JavaScript 中唯一处理属性并且不会遍历原型链的方法</p><h2 id="new-干了什么" tabindex="-1">new 干了什么？ <a class="header-anchor" href="#new-干了什么" aria-label="Permalink to &quot;new 干了什么？&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   function myNew(Con, ...args) {</span></span>
<span class="line"><span>        //1创建一个空对象</span></span>
<span class="line"><span>        let obj = {};</span></span>
<span class="line"><span>        //2将这个空对象的__proto__指向构造函数的原型</span></span>
<span class="line"><span>        Object.setPrototypeOf(obj, Con.prototype);</span></span>
<span class="line"><span>        //3改变this指向，讲空对象作为构造函数的上下文</span></span>
<span class="line"><span>        var result = Con.apply(obj, args);</span></span>
<span class="line"><span>        //4对构造函数有返回值的处理判断</span></span>
<span class="line"><span>        // 当 构造函数有返回值时 则需要做判断再返回对应的值，是 对象类型则返回该对象，是 原始类型则返回第一步创建的空对象。</span></span>
<span class="line"><span>        return result instanceof Object ? result : obj;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      function Foo2() {</span></span>
<span class="line"><span>        this.name = &quot;aaa&quot;;</span></span>
<span class="line"><span>        return 111;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      console.log(new Foo2()); //这个返回值是基本类型，被忽略不影响结果</span></span></code></pre></div><p><code>4 默认 如果返回的是基本类型return 111 则忽略返回结果 如果返回的是引用类型，则返回引用类型</code></p><h2 id="instanceof-判断逻辑" tabindex="-1">instanceof 判断逻辑？ <a class="header-anchor" href="#instanceof-判断逻辑" aria-label="Permalink to &quot;instanceof 判断逻辑？&quot;">​</a></h2><p>instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   function new_instance_of(leftVaule, rightVaule) {</span></span>
<span class="line"><span>        let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值</span></span>
<span class="line"><span>        leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if(typeof leftVaule !== &#39;object&#39; || leftVaule === null) {</span></span>
<span class="line"><span>              return false</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        while (true) {</span></span>
<span class="line"><span>          //最顶层的object的__proto__是null</span></span>
<span class="line"><span>          if (leftVaule === null) {</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>          if (leftVaule === rightProto) {</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>          // 当原型对象不相同时, 沿着原型链继续向上查找</span></span>
<span class="line"><span>          leftVaule = leftVaule.__proto__;</span></span>
<span class="line"><span>        }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>      function Fun() {</span></span>
<span class="line"><span>        // this.run = a;//2</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // Fun.prototype.run = b;//4</span></span>
<span class="line"><span>      var f1 = new Fun();</span></span>
<span class="line"><span>      // f1.run = c;</span><span> //1</span></span>
<span class="line"><span>      // f1.__proto__.run = d;//3</span></span>
<span class="line"><span>      // Object.prototype.run = e;//5</span></span>
<span class="line"><span>      Function.prototype.run = f; //不会找</span></span>
<span class="line"><span>      console.log(f1.run);</span></span></code></pre></div><h3 id="为什么使用-object-prototype-tostring-call" tabindex="-1">为什么使用 Object.prototype.toString.call() <a class="header-anchor" href="#为什么使用-object-prototype-tostring-call" aria-label="Permalink to &quot;为什么使用 Object.prototype.toString.call()&quot;">​</a></h3>`,33)])])}const m=n(c,[["render",r]]);export{v as __pageData,m as default};

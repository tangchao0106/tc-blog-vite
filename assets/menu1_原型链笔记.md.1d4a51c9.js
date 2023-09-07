import{_ as s,o as n,c as a,a as l}from"./app.865111c4.js";const e="/tc-blog-vite/vue\u539F\u578B.png",p="/tc-blog-vite/\u5C24\u5927\u539F\u578B.png",o="/tc-blog-vite/\u539F\u578B\u94FE1.png",t="/tc-blog-vite/\u539F\u578B\u94FE2.png",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"vue \u6E90\u7801\u4F7F\u7528\u5230\u7684\u539F\u578B","slug":"vue-\u6E90\u7801\u4F7F\u7528\u5230\u7684\u539F\u578B","link":"#vue-\u6E90\u7801\u4F7F\u7528\u5230\u7684\u539F\u578B","children":[]},{"level":3,"title":"\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528\u539F\u578B","slug":"\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528\u539F\u578B","link":"#\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528\u539F\u578B","children":[]},{"level":3,"title":"\u539F\u578B\u94FE\u7B14\u8BB0","slug":"\u539F\u578B\u94FE\u7B14\u8BB0","link":"#\u539F\u578B\u94FE\u7B14\u8BB0","children":[]},{"level":2,"title":"new \u5E72\u4E86\u4EC0\u4E48\uFF1F","slug":"new-\u5E72\u4E86\u4EC0\u4E48\uFF1F","link":"#new-\u5E72\u4E86\u4EC0\u4E48\uFF1F","children":[]},{"level":2,"title":"instanceof \u5224\u65AD\u903B\u8F91\uFF1F","slug":"instanceof-\u5224\u65AD\u903B\u8F91\uFF1F","link":"#instanceof-\u5224\u65AD\u903B\u8F91\uFF1F","children":[{"level":3,"title":"\u4E3A\u4EC0\u4E48\u4F7F\u7528 Object.prototype.toString.call()","slug":"\u4E3A\u4EC0\u4E48\u4F7F\u7528-object-prototype-tostring-call","link":"#\u4E3A\u4EC0\u4E48\u4F7F\u7528-object-prototype-tostring-call","children":[]}]}],"relativePath":"menu1/\u539F\u578B\u94FE\u7B14\u8BB0.md"}'),c={name:"menu1/\u539F\u578B\u94FE\u7B14\u8BB0.md"},r=l(`<h3 id="vue-\u6E90\u7801\u4F7F\u7528\u5230\u7684\u539F\u578B" tabindex="-1">vue \u6E90\u7801\u4F7F\u7528\u5230\u7684\u539F\u578B <a class="header-anchor" href="#vue-\u6E90\u7801\u4F7F\u7528\u5230\u7684\u539F\u578B" aria-hidden="true">#</a></h3><p>\u4F7F\u7528 new \u521B\u5EFA\u5B9E\u4F8B \u3002\u6267\u884C init \u65B9\u6CD5\uFF0C_init \u65B9\u6CD5\u6784\u9020\u51FD\u6570\u6CA1\u6709\u6B64\u65B9\u6CD5\uFF0C\u5F80\u539F\u578B\u5BF9\u8C61\u4E0A\u627E \u6B64\u5904\u4F7F\u7528 new \u521B\u5EFA\u51FA\u6765\u7684 this\uFF0C\u5FC5\u5B9A\u6307\u5411 VUE\u3002</p><ul><li>new \u5E72\u4E86\u4EC0\u4E48\uFF1F</li><li>instanceof \u5224\u65AD\u903B\u8F91\uFF1F</li></ul><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">var app = new Vue({</span></span>
<span class="line"><span style="color:#A6ACCD;">    data:{},</span></span>
<span class="line"><span style="color:#A6ACCD;">    watch:{}</span></span>
<span class="line"><span style="color:#A6ACCD;">}\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">function Vue(options) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (p<wbr>rocess.env.NODE_ENV !== &quot;production&quot; &amp;&amp; !(this instanceof Vue)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    warn(&quot;Vue is a constructor and should be called with the \`new\` keyword&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  this._init(options);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">initMixin(Vue);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>Vue\u6E90\u7801\u4F7F\u7528\u5230\u7684\u539F\u578B</code><img src="`+e+`" width="20%"></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    if (Array.isArray(value)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // \u901A\u8FC7\u80FD\u529B\u68C0\u6D4B\u7684\u7ED3\u679C\u9009\u62E9\u4E0D\u540C\u65B9\u5F0F\u8FDB\u884C\u6570\u7EC4\u52AB\u6301</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (hasProto) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        protoAugment(value, arrayMethods); //\u5982\u679C\u6D4F\u89C8\u5668\u652F\u6301\u9690\u5F0F\u539F\u578B</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        copyAugment(value, arrayMethods, arrayKeys);</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.observeArray(value);</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.walk(value);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">// can we use __proto__?</span></span>
<span class="line"><span style="color:#A6ACCD;">export const hasProto = &#39;__proto__&#39; in {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function protoAugment(target, src: Object) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  /* eslint-disable no-proto */</span></span>
<span class="line"><span style="color:#A6ACCD;">  target.__proto__ = src;</span></span>
<span class="line"><span style="color:#A6ACCD;">  /* eslint-enable no-proto */</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf" target="_blank" rel="noreferrer">MDN:\u901A\u5E38\uFF0C\u5E94\u8BE5\u4F7F\u7528 Object.setPrototypeOf() \u65B9\u6CD5\u6765\u8BBE\u7F6E\u5BF9\u8C61\u7684\u539F\u578B</a></p><p>\u6E90\u7801\u4E2D\u4E3A\u4EC0\u4E48\u4F7F\u7528<code>_proto_</code> \u800C\u6CA1\u6709\u4F7F\u7528 setPrototypeOf</p><img src="`+p+`" width="50%"><p><a href="https://github.com/vuejs/vue/issues/3813" target="_blank" rel="noreferrer">\u5730\u5740</a></p><h3 id="\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528\u539F\u578B" tabindex="-1">\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528\u539F\u578B <a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528\u539F\u578B" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">      function Foo(name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.showName = function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">          console.log(&quot;I&#39;m &quot; + this.name);</span></span>
<span class="line"><span style="color:#A6ACCD;">        };</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u56FE\u4E0A\u901A\u8FC7 Foo \u521B\u5EFA\u51FA\u6765\u7684\u6BCF\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u91CC\u9762\u90FD\u6709 showName \u8FD9\u6837\u5C31\u4F1A\u5360\u7528\u5F88\u591A\u7684\u8D44\u6E90\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">     function Foo(name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      Foo.prototype.showName = function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&quot;I&#39;m &quot; + this.name);</span></span>
<span class="line"><span style="color:#A6ACCD;">      };</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>\u800C\u901A\u8FC7\u539F\u578B\u6765\u5B9E\u73B0\u7684\u8BDD\uFF0C\u53EA\u9700\u8981\u5728\u6784\u9020\u51FD\u6570\u91CC\u9762\u7ED9\u5C5E\u6027\u8D4B\u503C\uFF0C\u800C\u628A\u65B9\u6CD5\u5199\u5728 <code>Foo.prototype </code>\u5C5E\u6027 \u8FD9\u6837\u6BCF\u4E2A\u5BF9\u8C61\u90FD\u53EF\u4EE5\u4F7F\u7528 prototype \u5C5E\u6027\u91CC\u9762\u7684\u65B9\u6CD5\uFF0C\u8282\u7701\u4E86\u4E0D\u5C11\u7684\u8D44\u6E90\u3002</li><li>\u4F7F\u7528\u539F\u578B\u94FE\u89E3\u51B3\u7EE7\u627F\u95EE\u9898</li></ul><h3 id="\u539F\u578B\u94FE\u7B14\u8BB0" tabindex="-1">\u539F\u578B\u94FE\u7B14\u8BB0 <a class="header-anchor" href="#\u539F\u578B\u94FE\u7B14\u8BB0" aria-hidden="true">#</a></h3><img src="`+o+'" width="50%"><img src="'+t+`" width="50%"><ul><li>\u6BCF\u4E2A\u5BF9\u8C61\u90FD\u6709\u4E00\u4E2A<code>_proto_</code>\u5C5E\u6027\uFF0C\u5E76\u4E14\u6307\u5411\u5B83\u7684 prototype \u539F\u578B\u5BF9\u8C61</li><li>\u6BCF\u4E2A\u6784\u9020\u51FD\u6570\u90FD\u6709\u4E00\u4E2A prototype \u539F\u578B\u5BF9\u8C61- <ul><li>prototype \u539F\u578B\u5BF9\u8C61\u91CC\u7684 constructor \u6307\u5411\u6784\u9020\u51FD\u6570\u672C\u8EAB Person.prototype.constructor === Person</li></ul></li><li>\u5F53\u8BD5\u56FE\u5F97\u5230\u4E00\u4E2A\u5BF9\u8C61\u7684\u5C5E\u6027\u65F6\uFF0C\u5982\u679C\u8FD9\u4E2A\u5BF9\u8C61\u672C\u8EAB\u4E0D\u5B58\u5728\u8FD9\u4E2A\u5C5E\u6027\u5C31\u4F1A\u6839\u636E<em>proto</em>\u53BB prototype \u627E\u3002\u56E0\u4E3A\u8FD8\u662F\u4E00\u4E2A\u5BF9\u8C61\u7EE7\u7EED\u627E Object</li></ul><h4 id="object-create-null" tabindex="-1">Object.create(null) <a class="header-anchor" href="#object-create-null" aria-hidden="true">#</a></h4><p><code>Object.create(null) \u65B0\u5EFA\u7684\u5BF9\u8C61\u662F\u6CA1\u6709__proto__\u5C5E\u6027\u7684</code></p><h4 id="hasownproperty" tabindex="-1">hasOwnProperty <a class="header-anchor" href="#hasownproperty" aria-hidden="true">#</a></h4><p>\u5728\u539F\u578B\u94FE\u4E0A\u67E5\u8BE2\u5C5E\u6027\u6BD4\u8F83\u8017\u65F6\uFF0C\u5BF9\u6027\u80FD\u6709\u5F71\u54CD\uFF0C\u8BD5\u56FE\u8BBF\u95EE\u4E0D\u5B58\u5728\u7684\u5C5E\u6027\u65F6\u4F1A\u904D\u5386\u6574\u4E2A\u539F\u578B\u94FE\u3002\u904D\u5386\u5BF9\u8C61\u5C5E\u6027\u65F6\uFF0C\u6BCF\u4E2A\u53EF\u679A\u4E3E\u7684\u5C5E\u6027\u90FD\u4F1A\u88AB\u679A\u4E3E\u51FA\u6765\u3002 <code>\u8981\u68C0\u67E5\u662F\u5426\u5177\u6709\u81EA\u5DF1\u5B9A\u4E49\u7684\u5C5E\u6027\uFF0C\u800C\u4E0D\u662F\u539F\u578B\u94FE\u4E0A\u7684\u5C5E\u6027</code>\uFF0C\u5FC5\u987B\u4F7F\u7528 hasOwnProperty \u65B9\u6CD5\u3002hasOwnProperty \u662F JavaScript \u4E2D\u552F\u4E00\u5904\u7406\u5C5E\u6027\u5E76\u4E14\u4E0D\u4F1A\u904D\u5386\u539F\u578B\u94FE\u7684\u65B9\u6CD5</p><h2 id="new-\u5E72\u4E86\u4EC0\u4E48\uFF1F" tabindex="-1">new \u5E72\u4E86\u4EC0\u4E48\uFF1F <a class="header-anchor" href="#new-\u5E72\u4E86\u4EC0\u4E48\uFF1F" aria-hidden="true">#</a></h2><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">   function myNew(Con, ...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //1\u521B\u5EFA\u4E00\u4E2A\u7A7A\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#A6ACCD;">        let obj = {};</span></span>
<span class="line"><span style="color:#A6ACCD;">        //2\u5C06\u8FD9\u4E2A\u7A7A\u5BF9\u8C61\u7684__proto__\u6307\u5411\u6784\u9020\u51FD\u6570\u7684\u539F\u578B</span></span>
<span class="line"><span style="color:#A6ACCD;">        Object.setPrototypeOf(obj, Con.prototype);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //3\u6539\u53D8this\u6307\u5411\uFF0C\u8BB2\u7A7A\u5BF9\u8C61\u4F5C\u4E3A\u6784\u9020\u51FD\u6570\u7684\u4E0A\u4E0B\u6587</span></span>
<span class="line"><span style="color:#A6ACCD;">        var result = Con.apply(obj, args);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //4\u5BF9\u6784\u9020\u51FD\u6570\u6709\u8FD4\u56DE\u503C\u7684\u5904\u7406\u5224\u65AD</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u5F53 \u6784\u9020\u51FD\u6570\u6709\u8FD4\u56DE\u503C\u65F6 \u5219\u9700\u8981\u505A\u5224\u65AD\u518D\u8FD4\u56DE\u5BF9\u5E94\u7684\u503C\uFF0C\u662F \u5BF9\u8C61\u7C7B\u578B\u5219\u8FD4\u56DE\u8BE5\u5BF9\u8C61\uFF0C\u662F \u539F\u59CB\u7C7B\u578B\u5219\u8FD4\u56DE\u7B2C\u4E00\u6B65\u521B\u5EFA\u7684\u7A7A\u5BF9\u8C61\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">        return result instanceof Object ? result : obj;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      function Foo2() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.name = &quot;aaa&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        return 111;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(new Foo2()); //\u8FD9\u4E2A\u8FD4\u56DE\u503C\u662F\u57FA\u672C\u7C7B\u578B\uFF0C\u88AB\u5FFD\u7565\u4E0D\u5F71\u54CD\u7ED3\u679C</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>4 \u9ED8\u8BA4 \u5982\u679C\u8FD4\u56DE\u7684\u662F\u57FA\u672C\u7C7B\u578Breturn 111 \u5219\u5FFD\u7565\u8FD4\u56DE\u7ED3\u679C \u5982\u679C\u8FD4\u56DE\u7684\u662F\u5F15\u7528\u7C7B\u578B\uFF0C\u5219\u8FD4\u56DE\u5F15\u7528\u7C7B\u578B</code></p><h2 id="instanceof-\u5224\u65AD\u903B\u8F91\uFF1F" tabindex="-1">instanceof \u5224\u65AD\u903B\u8F91\uFF1F <a class="header-anchor" href="#instanceof-\u5224\u65AD\u903B\u8F91\uFF1F" aria-hidden="true">#</a></h2><p>instanceof \u5728\u67E5\u627E\u7684\u8FC7\u7A0B\u4E2D\u4F1A\u904D\u5386\u5DE6\u8FB9\u53D8\u91CF\u7684\u539F\u578B\u94FE\uFF0C\u76F4\u5230\u627E\u5230\u53F3\u8FB9\u53D8\u91CF\u7684 prototype</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">   function new_instance_of(leftVaule, rightVaule) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        let rightProto = rightVaule.prototype; // \u53D6\u53F3\u8868\u8FBE\u5F0F\u7684 prototype \u503C</span></span>
<span class="line"><span style="color:#A6ACCD;">        leftVaule = leftVaule.__proto__; // \u53D6\u5DE6\u8868\u8FBE\u5F0F\u7684__proto__\u503C</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        if(typeof leftVaule !== &#39;object&#39; || leftVaule === null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">              return false</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        while (true) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          //\u6700\u9876\u5C42\u7684object\u7684__proto__\u662Fnull</span></span>
<span class="line"><span style="color:#A6ACCD;">          if (leftVaule === null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            return false;</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">          if (leftVaule === rightProto) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            return true;</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">          // \u5F53\u539F\u578B\u5BF9\u8C61\u4E0D\u76F8\u540C\u65F6, \u6CBF\u7740\u539F\u578B\u94FE\u7EE7\u7EED\u5411\u4E0A\u67E5\u627E</span></span>
<span class="line"><span style="color:#A6ACCD;">          leftVaule = leftVaule.__proto__;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">      function Fun() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // this.run = a;//2</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      // Fun.prototype.run = b;//4</span></span>
<span class="line"><span style="color:#A6ACCD;">      var f1 = new Fun();</span></span>
<span class="line"><span style="color:#A6ACCD;">      // f1.run = c; //1</span></span>
<span class="line"><span style="color:#A6ACCD;">      // f1.__proto__.run = d;//3</span></span>
<span class="line"><span style="color:#A6ACCD;">      // Object.prototype.run = e;//5</span></span>
<span class="line"><span style="color:#A6ACCD;">      Function.prototype.run = f; //\u4E0D\u4F1A\u627E</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(f1.run);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="\u4E3A\u4EC0\u4E48\u4F7F\u7528-object-prototype-tostring-call" tabindex="-1">\u4E3A\u4EC0\u4E48\u4F7F\u7528 Object.prototype.toString.call() <a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u4F7F\u7528-object-prototype-tostring-call" aria-hidden="true">#</a></h3>`,33),i=[r];function A(C,y,u,d,h,D){return n(),a("div",null,i)}const f=s(c,[["render",A]]);export{g as __pageData,f as default};

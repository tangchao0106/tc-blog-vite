Ajax（天禹老师）尚硅谷
异步的 js 和 xml
优点缺点
xhr 五种状态 xhr.readyState
发送请求参数 get
-1 key=value&key=value query 参数的 urlencoded 编码格式传参 query 参数
-2 /xx/xx/参数 1/参数 2 params 参数

post
query 参数 params 参数 同上
body 参数-分 url 和 json
需要追加响应头标识请求体参数编码格式 urlencodeed 或 json 格式

## 跨域

### 同源策略限制

- 1 cookie 不能读取 LocalStorage、IndexedDB 等存储性内容
- 2dom 节点 无法获得
- 3ajax 请求不能获取数据

同源策略是一种安全策略，浏览器实现了这一策略。
协议域名端口
jsonp
但是有三个标签是允许跨域加载资源：

<img src=XXX>
<link href=XXX>
<script src=XXX>
    跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了

    1) JSONP原理

利用 <script> 标签没有跨域限制的漏洞，动态创建 script 标签，传递参数给服务器，服务器返回 json。触发前台方法。

```
    const btn = document.getElementById("btn");
      const scipteNode = document.createElement("script");
      scipteNode.src = "http://localhost:8080/test?callback=aaa";
      document.body.appendChild(scipteNode);

      window.aaa = (a) => {
        console.log("服务端返回后触发aaa函数");
      };
```

跨域的解决方案思路两种，躲避绕过去和 cors；
各种 iframe 方式可传递数据，但组织和控制代码逻辑太复杂，鸡肋；
jsonp 前几年使用，现在浏览器兼容性高了，以及受限于仅 get 方式，逐步淘汰了；
nginx 反向代理是绕过去的方式，是从古至今通吃的没完解决方案，缺点也许是服务器压力大一点，实际中那点压力根本不是大问题；同时反向代理更适合内部应用间访问和共享；
cors 才是真正的称得上跨域请求解决方案，因为请求存在跨域，结果是拿到了数据，也就是说服务器和浏览器之间进行了协商通信控制后，才得以允许或拒绝；
最后说明下，跨域请求产生时，请求是发出去了，也是有响应的，仅仅是浏览器同源策略，认为不安全，拦截了结果，不将数据传递我们使用罢了
[链接](https://juejin.cn/post/6844903767226351623)

http://www.ruanyifeng.com/blog/2016/04/cors.html

cors 解决跨域后端增加响应头 -一组
分简单请求 get post 一组响应头 -xxx-origin --xxheads xx-methods

和复杂请求-预请求 put delete

cors 数据从服务端回来时，增加了响应头。跳过校验

跨域解决方案
1、 通过 jsonp 跨域
2、 document.domain + iframe 跨域
3、 location.hash + iframe
4、 window.name + iframe 跨域
5、 postMessage 跨域
6、 跨域资源共享（CORS）
7、 nginx 代理跨域
8、 nodejs 中间件代理跨域
9、 WebSocket 协议跨域

### axios

优点缺点
xhr 五种状态 xhr.readyState
发送请求参数 get
-1 key=value&key=value query 参数的 urlencoded 编码格式传参 query 参数
-2 /xx/xx/参数 1/参数 2 params 参数

post
query 参数 params 参数 同上
body 参数-分 url 和 json
需要追加响应头标识请求体参数编码格式 urlencodeed 或 json 格式

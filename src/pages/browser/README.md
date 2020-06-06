# 浏览器

## 同源策略
- 限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互，在安全性与可用性之间寻找一个平衡点
1. 什么是同源？
- 协议、主机、端口必须完全相同

### 为什么需要同源策略
1. 同一个浏览器发出的请求，未必都是用户自愿发出的请求
-  比如：用户点击了一个index.html, 那么index.html的响应会让浏览器自动发出 .css .png .jpg .html .mp4 等请求，这些请求不是用户自愿发出的
2. 如果没有同源策略会发生什么问题呢？
- 比如：用户向站点A发起了一个HTTP请求，那么浏览器会自动的将Cookie放在这个请求中，服务器会将这个Cookie进行保存，那么如果站点B向站点A发起了一个HTTP请求，那么浏览器就会自动的将Cookie
放在这个请求中，所以这个时候站点A验证通过之后，那么就会按照之前登陆过的用户的权限进行操作，但是这个请求实际上是站点B发出的

### 如果没有同源策略
- (请看上面为什么需要同源策略那个问题)那么站点B的脚本就可以随意修改站点A的DOM结构

### 可用性
#### HTML的创作者决定跨域请求是否对本站点安全
- `<script> <img> <iframe> <link> <video> <audio>`带有`src`属性可以跨域访问
- 允许跨域写操作：例如表单提交或者重定向请求
> CSRF安全性问题(请看安全的CSRF)

### 安全性
#### 浏览器需要防止A站点的脚步向B站点发起危险动作
- `Cookie LocalStorage和IndexDB`无法读取
- DOM无法获取(防止跨域脚步篡改DOM结构)
- AJAX请求不能发送

### CORS 跨域访问解决方案
#### `Cross-Origin Resource Sharing`(CORS)
- 浏览器同源策略下的跨域访问解决方案：
1. 如果站点A允许站点B的脚本访问其资源，必须在HTTP响应中显示的告知浏览器：站点B是被允许访问的
- 访问站点A的请求，浏览器应告知请求来自站点B
- 站点A的响应中，应明确哪些跨域请求是被允许的

#### 策略1：何为简单请求？
- `GET/HEAD/POST`方法之一
- 仅能使用`CORS`安全的头部：`Accept Accept-Language Content-Language Content-Type`
- `Content-Type`值只能是：`text/plain multipart/form-data application/x-www-form-urlencoded`三者其中之一

##### 简单跨域请求的基本实现原理
1. 客户端请求中携带 Origin 头部告知来自哪个域
2. 服务器响应中携带 Access-Control-Allow-Origin
3. 浏览器放行

- 如果服务器响应中不包含`Access-Control-Allow-Origin`那么浏览器接收到之后就不做处理，然后报错：
```js

`Access to XMLHttpRequest at '*' from origin '*' has been blocked by CORS policy: 
 Response to preflight request doesn't pass access control check: 
 No 'Access-Control-Allow-Origin' header is present on the requested resource.`


```

#### 策略2：简单请求以外的其他请求
- 访问资源前，需要先发起`prefilght`预检请求(方法为OPTIONS，例如：axios) 询问何种请求是被允许的

##### 复杂请求的跨域实现原理
<p>先进行预检请求(必须是OPTIONS方法)，再进行实际请求</p>

- 预检请求头部
1. `Access-Control-Request-Method` 表示后面实际发送请求的方法
2. `Access-Control-Request-Headers` 表示后面实际发送请求所用的头部

- 预检请求响应
1. `Access-Control-Request-Method` 允许哪些方法访问服务器
2. `Access-Control-Request-Headers` 允许哪些头部
3. `Access-Control-Max-Age` 允许缓存的最长时间

- 跨域访问资源时请求头部的可选值：
1. `Origin` 一个页面的资源可能来自于知道来自于多个域名，在ajax等子请求中标明来源于某个域名下的脚本，以通过服务器的安全效验
2. `Access-Control-Request-Method` 告知服务器接下来的请求会使用哪些方法
3. `Access-Control-Request-Headers` 告知服务器接下来的请求会传递哪些头部


# 网络

## HTTP
### 什么是HTTP协议？
- `HTTP`是一种无状态的、应用层的、以请求/应答方式运行的协议，它使用可扩展的语义和字描述消息格式，与基于网络的超文本信息系统灵活的互动

### HTTP解决了什么问题
1. 低门槛
2. 可扩展性：巨大的用户群体，超长的寿命
3. 分布式系统下的`Hypermedia`: 大粒度数据的网络传输(视频、音乐等)
4. `Internet`规模
---
* 无法控制的`scalability`
> 不可预测的负载、非法格式的数据、恶意消息 
> 客户端不能保持所有服务器信息，服务器不能保持多个请求间的状态信息
* 独立的组件部署：新老组件并存

5. 向前兼容：自1993年起HTTP0.9/1.0(1996)已经被广泛使用

### HTTP方法
- HTTP支持几种不同的请求命令，这些命令被称为HTTP方法，每条HTTP请求报文都包含一个方法，这个方法会告诉服务器要执行什么动作(获取一个Web页面、运行一个网关程序、删除一个文件等)
1. `GET` 主要的获取信息的方法，大量的性能优化都针对该方法，幂等方法
2. `HEAD` 类似`GET`的方法，但服务器不发送`BODY`，用于获取`HEAD`元数据，幂等方法
3. `POST` 常用于`HTML FORM`表单提交，新增资源
4. `PUT` 更新资源，带条件时是幂等方法
5. `DELETE` 删除资源，幂等方法
6. `CONNECT` 建立`tunnel`隧道
7. `OPTIONS` 显示服务器对访问资源支持的方法，幂等方法
8. `TRACE` 回显服务器接收到的请求，用于定位问题，有安全风险
<p><font color='red'><b>什么是幂等方法：就是调用一次和调用多次的结果是一样的</b></font></p>

### HTTP连接的常见流程
1. 浏览器解析出主机名
2. 浏览器查询这个主机名的IP地址(DNS)
3. 浏览器获得端口号
4. 浏览器发起到xxx.xx.xx.x端口xx的连接
5. 浏览器向服务器发送一条`HTTP GET`报文
6. 浏览器从服务器读取`HTTP`响应报文
7. 浏览器关闭连接

### URI 和 URL、URN
#### URI
- 每个Web服务器资源都有一个名字，而服务器资源名称被统称为统一资源标识符，URI就像因特网上的邮政地址一样，在世界范围内唯一标识并定位信息资源，URI有两种形式，分别为URL和URN

#### URL
- URL(统一资源定位符)是资源标识符最常见的形式，URL描述了一台特定服务器上某资源的特定位置，可以明确说明如何从一个精确、固定的位置获取资源，URL格式为：协议、因特网地址(如域名)、路径，现在几乎所有的URI都是URL

#### URN
- URN(统一资源名)是作为特定内容的唯一名称使用的，与目前的资源所在地无关，使用这些位置无关的URN，就可以将资源到处搬移，通过URN，还可以用同一个名字通过多种网络访问协议来访问资源

#### 相同
1. 两者都是定位资源位置的，对资源的位置进行了定义，URL是一种宽泛的定义，而且URL是URI中的一个子集，URI包含了URL，并且URI与URL的目的都是相同的，都是通过字符串来标识资源

#### 区别：
1. 定义不同：URL是个标识资源位置的字符串，一般情况下，而URI是统一资源标识符，用来标识唯一的资源
2. 格式不同：URL的格式都是`协议地址： //ip/文件夹`， 而URI的格式是： `protocol: // hostname[:port]/path/[;paramenters][?query]#fragment`

### 长连接和短连接
#### 需要先知道事务的概念：假定一个请求对应一个响应就是一个事务
- 短连接就是每建立一个连接1，处理一个请求得到一个响应，连接关闭，然后建立连接2，发送请求，得到响应，再关闭，这就是短连接
- 长连接就是客户端与服务器建立了一个连接，执行完了一个事务之后又执行第二个事务、第三个事务、第四个事务，一直在一个连接上，这就是长连接

<b>那么长连接由什么决定呢？</b>
#### `Connection`头部 HTTP/1.1引入的
- 在为`Connection`头部添加了`Keep-Alive`这个值时，就表示长连接(仅表示客户端与代理服务器之间)
> 客户端请求中携带 Connection: Keep-Alive 表示使用长连接 <br>
> 服务器响应中携带 Connection: Keep-Alive 表示支持长连接 <br>
- 在`HTTP/1.1`中默认支持长连接，`Connection: Keep-Alive`就没有意义
> 那么如果不使用长连接呢？如HTTP1.1 那么就在 Connection: Close 表示不使用长连接
#### <p><font color='red'><b>Connection头部的其它功能</b></font></p>
- 对代理服务器有一些要求
> 代理服务器在转发请求的时候请不要转发在 Connection 中列出的头部，比如 Connection 中有 Cookie，那么在转发时要将 Cookie 去除掉

#### 如果不支持 `Connection` 头部，比如老旧的服务器
- 使用 `Proxy-Connection`

## HTTP2.0

## HTTPS

## TCP/IP
- HTTP是个应用层协议，HTTP无需操心网络通信的具体细节，它把联网的细节都交给了通用、可靠的因特网传输协议TCP/IP


## TLS/SSL




## 从输入URL到页面加载完成的过程
<img align='center' src="../../static/imgs/url-analyse.png" />

1. 首先是从URL中解析出域名进行DNS查询，如果这一步做了智能DNS解析的话，会提供访问速度最快的IP地址回来，否则需要一级一级进行查询，从跟服务器、一级域名、二级域名依次进行查询;

2. 浏览器端的所有请求本质都是`HTTP`请求，底层都是`TCP/IP`协议，浏览器根据请求返回的`Content-type`来决定如何解析数据;

3. 接下来是`TCP`握手，应用层会下发数据给传输层，这里`TCP`协议会指明两端的端口号，然后下发给网络层。网络层中的`IP`协议会确定`IP`地址，并且指示了数据传输中如何跳转路由器。然后包会再被封装到数据链路层的数据帧结构中，最后就是物理层面的传输了

4. `TCP`握手结束后会进行`TLS`握手，然后就开始正式的传输数据;

5. 数据在进入服务端之前，可能还会先经过负责负载均衡的服务器，它的作用就是将请求合理的分发到多台服务器上，这时假设服务端会响应一个`HTML`文件;

6. 首先浏览器会判断状态码是什么，如果是200那就继续解析，如果400或500的话就会报错，如果300的话会进行重定向，这里会有个重定向计数器，避免过多次的重定向，超过次数也会报错;

7. 浏览器开始解析文件，如果是`gzip`格式的话会先解压一下，然后通过文件的编码格式知道该如何去解码文件;

8. 文件解码成功后会正式开始渲染流程，先会根据`HTML`构建`DOM`树，有`CSS`的话会去构建`CSSOM`树。如果遇到`script`标签的话，会判断是否存在`async`或者`defer` ，前者会并行进行下载并执行JS（不会操作DOM），后者会先下载文件，然后等待`HTML`解析完成后顺序执行，如果以上都没有，就会阻塞住渲染流程直到JS执行完毕。遇到文件下载的会去下载文件，这里如果使用`HTTP 2.0`协议的话会极大的提高多图的下载效率。

9. 初始的`HTML`被完全加载和解析后会触发`DOMContentLoaded`事件;

10. `CSSOM`树和`DOM`树构建完成后会开始生成`Render`树，这一步就是确定页面元素的布局、样式等等诸多方面的东西;

11. 在生成`Render`树的过程中，浏览器就开始调用`GPU`绘制，合成图层，将内容显示在屏幕上了;

## OSI 概念模型
- OSI(`Open System Interconnection Reference Model`)
1. 应用层，如HTTP等协议，解决的是业务问题
2. 表示层，主要是把网络中的消息转换成应用层可以读取的消息
3. 会话层，建立回话、握手、关闭
4. 传输层，进程与进程之间的通讯
5. 网络层，把报文从一个主机上发送到另外一个主机上，就是现在的`Internet`
6. 数据链路层，在局域网中使用Mac地址连接到相应的交换机或者路由器把报文转到另一个主机上
7. 物理层，物理的介质

## 状态码
### `1xx`
<b>请求已接收到，需要进一步处理才能完成，`HTTP1.0`不支持</b>
- `100 Continue`：上传大文件前使用
> 由客户端发起请求中携带 Expect: 100-continue 头部触发
- `101 Switch Protocols`: 协议升级使用
> 由客户端发起请求中携带 Upgrade: 头部触发，如升级 websocket 或者 http/2.0
- `102 Processing` WebDAV 请求可能包含许多涉及文件操作的子请求，需要很长时间才能完成请求，该代码表示服务器已经收到并正在处理请求，但无响应可用，这样可以防止客户端超时，并假设请求丢失

### `2xx` 成功处理请求
- `200 OK` 成功返回响应
- `201 Created` 有新资源在服务器端被成功创建
- `202 Accepted` 服务器接收并开始处理请求，但请求未处理完成
> 例如异步、需要长时间处理的任务
- `203 Non-Authoritative Information` 当代理服务器修改了`origin server`的原始响应包体时(例如奉还了HTML中的元素值)
> 代理服务器可以通过修改200为203的方式告知客户端这一事实，方便客户端为这一行为作出相应的处理，203响应可以被缓存
- `204 No Contnet` 成功执行了请求且不携带响应包体，并按时客户端无需更新当前的页面视图
- `205 Reset Content` 成功执行了请求且不携带响应包体，同时指明客户端需要更新当前页面视图
- `206 Partial Content` 使用`range`协议时返回部分响应内容时的响应码
> 主要用于多线程断点续传、下载等
- `207 Multi-Status` `RFC4918`,在WEBDAV协议中以XML返回多个资源的状态
- `208 Already Reported` RFC5842，为避免相同集合下资源在207响应码下重复上报，使用208可以使用父集合的响应码

### `3xx` 重定向
<b>重定向使用`Location`指向的资源或者缓存中的资源，在`RFC2068`中规定客户端重定向次数不应超过5次，以防止死循环</b>
- `300 Multiple Choices` 资源有多种表述，通过300返回给客户端后由其自行选择访问哪一种表述，由于缺乏明确的细节，300很少使用
- `301 Moved Permanently` 资源永久性的重定向到另一个URI中，请求的数据具有新的位置，并且更改是永久的
> 浏览器可以对永久性的重定向直接缓存
- `302 Found` (重定向)资源临时性的重定向到另一个URI中
- `303 See Other` 重定向到其它资源，常用语POST/PUT等方法的响应中
- `304 Not Modified` 当客户端拥有可能过期的缓存时，会携带缓存的标识`etag`、事件等信息询问服务器缓存是否仍可复用，而304是告诉客户端可以复用缓存
- `305`必须通过位置字段中提供的代理来访问请求的资源
- `307 Temporary Redirect` 类似302，但明确重定向后请求方法必须与原请求方法相同，不得改变
- `308 Permanent Redirect` 类似301，但明确重定向后请求方法必须与原请求方法相同，不得改变

### `4xx` 客户端错误
- `400 Bad Request` 服务器认为客户端出现了错误，但不能明确判断为以下哪种错误时使用此错误码，例如HTTP请求格式错误
- `401 Unauthorized` 用户认证信息缺失或者不正确，导致服务器无法处理请求
- `403 Forbidden` 服务器理解请求的含义，但没有权限执行此请求
- `404 Not Found` 服务器没有找到对应的资源
- `405 Method Not Allowed` 服务器不支持请求行中的`method`方法
- `406 Not Acceptable` 对客户端指定的资源表述不存在(例如对语言或者编码有要求，浏览器不能识别其格式)，服务器返回表述列表供客户端选择
- `407 Proxy Authentication Required` 对需要经由代理的请求，认证信息未通过代理服务器的认证
- `408 Request Timeout` 服务器接收请求超时
- `409 Conflict` 资源冲突，例如上传文件时目标位置已经存在版本更新的资源
- `410 Gone` 服务器没有找到对应的资源，且明确知道该位置永久性的找不到该资源
- `411 Length Required` 如果请求含有包体且未携带`Content-Length`头部，且不属于chunk类请求是，返回411
- `412 Precondition Failed` 复用缓存时传递的if-Unmodified-since或if-None-Match头部不被满足
> 条件类请求不满足时返回412
- `413 Payload Too Large/Request Entity Too Large` 请求的包体超出服务器能处理的最大长度
- `414 URI Too Long` 请求的URI超出服务器能接受的最大长度
> 老版本的服务器通常接收为4K，新版本的Nginx能接受32K
- `415 Unsupported Media Type` 上传的文件类型不被服务器支持
- `416 Range Not Satisfiable` 无法提供Range请求中指定的那段包体
- `417 Expectation Failed` 对于`Expect`请求头部期待的情况无法满足时的响应码
> 比如100那种需要上传一个大文件时想要返回一个100状态码，但是服务器不支持就会返回417
- `421 Misdirected Request` 服务器认为这个请求不该发给它，因为它没有能力处理
> 基本见不到
- `426 Upgrade Required` 服务器拒绝基于当前HTTP协议提供内容(比如HTTP1.0)，通过Upgrade头部告知客户端必须升级协议才能继续处理
- `428 Precondition Required` 用户请求中缺失了条件类头部，例如if-Match
- `429 Too Many Requests` 客户端发送请求的速率过快
> 注意：目前市面上服务器限流限速的时候通常不按照这个规范，而是发送503
- `431 Request Header Fields Too Large` 请求的HEADER头部大小超过限制
- `451 Unavailable For Legal Reasons` RFC7725，由于法律原因资源不可访问
> 基本为商业原因非技术原因

### `5xx` 服务器错误
- `500 Internal Server Error` 服务器内部错误，且不属于以下错误类型
- `501 Not Implemented` 服务器不支持实现请求所需要的功能
- `502 Bad Gateway` 代理服务器无法获取到合法响应
> 在与原服务器之间有代理服务器，但是代理服务器连接不上原服务器或代理服务器无法在原服务器中获取到合法的响应
- `503 Service Unavailable` 服务器资源尚未准备好处理当前请求
> 分很多情况比如：服务器端做请求的限速、对用户的IP做并发连接限制等，当达到了上限都可能会发503
- `504 Gateway Timeout` 代理服务器无法及时的从上游获得响应
> 比如上传了一个很大的文件，而Nginx服务器设置的超时时间是一分钟，那么代理服务器没有及时接受到响应，就会返回504
- `505 HTTP Version Not Supported` 请求使用的HTTP协议版本不支持
> 比如某些服务器不支持HTTP2.0就会返回505，基本见不到了
- `507 Insufficient Storage` 服务器没有足够的空间处理请求
> 通常指磁盘空间，但是会将服务器内部的相关问题暴露给客户端，会有安全性的问题，所以基本见不到
- `508 Loop Detected` 访问资源时检测到循环或者循环已经超过了最大次数了
- `511 NetWork Authentication Required` 代理服务器发现客户端需要进行身份验证才能获得网络访问权限

<p><font color='red'><b>如果客户端遇到了不认识的响应码，那么就会按照该系列的x00状态码处理</b></font></p>

## 请求头

### Accept
- 接受哪种媒体格式
```js
// 例如：
Accept: application/json, text/javascript, */*; q=0.01 
```
### Accept-Language
- 表示浏览器希望展示哪种语言描述的文本
```js
// 例如：
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7
```
<p><font color='red'><b>q表示优先级</b></font></p>

### Accept-Encoding
- 内容编码(主要指压缩算法)，表示浏览器接受哪种压缩的方式
```js
// 例如：
Accept-Encoding: gzip, deflate, br
```


### User-Agent
- 指明客户端的类型信息，服务器可以据此对资源的表述做抉择，例如：
```js
// Chrome 发出的
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36
/*
*   Mozilla/5.0 表示兼容 Mozilla 版本
*   (Macintosh; Intel Mac OS X 10_14_3) 表示运行在什么系统上，以及系统的版本
*   AppleWebKit/537.36 表示渲染引擎以及版本号
*   (KHTML, like Gecko) 表示和 Firefox 渲染引擎很相似
*   Chrome/80.0.3987.132 Safari/537.36 浏览器的版本号，Chrome和Safari使用的是同一个渲染引擎
*/
```

### Referer
- 浏览器对来自某一页面的请求自动添加的头部(表示当前的请求来自另一个页面)
```js
// 例如：
Referer: https://www.baidu.com/
```
- `Referer`不被添加的场景
1. 来源页面采用的协议为表示本地文件的`file`或者`data`URI
2. 当前请求页面采用的是HTTP协议，而来源页面采用的是HTTPS协议
<p><font color='red'><b>服务器端主要的用途有3种：统计分析、缓存优化、防盗链</b></font></p>
- 统计分析：比如统计我们的页面是来自搜索引擎还是来自某些入口流量中
- 缓存优化：比如只对某些来源才做相应的缓存
- 防盗链：比如有些资源不想被其它站点直接引用，那么就可以阻止这个请求的访问

### From
- 主要用于网络爬虫，告诉服务器运维人员如何通过邮件联系到爬虫的负责人
```js
// 例如可以通过下面邮箱地址联系到爬虫的负责人：
From：xxx@xxx.com
```

### Cache-Control
- 取值：
1. `max-age` 告诉服务器，客户端不会接受Age超出`max-Age`秒的缓存
2. `max-stale` 告诉服务器，及时缓存不在新鲜，但陈旧秒数没有超出`max-Stale`时，客户端仍打算使用，若`max-Stale`后没有值，则表示无论过期多久客户端都可使用
3. `min-fresh` 告诉服务器，Age至少要经过`min-fresh`秒后缓存才可使用
4. `no-cache` 告诉服务器，不能直接使用已有缓存作为响应返回，除非带着缓存条件到上游服务端得到304验证返回码才可使用现有缓存
5. `no-store` 告诉各代理服务器不要对该请求的响应缓存(实际有不少不遵循该规定的代理服务器)
6. `no-transform` 告诉代理服务器不要修改消息包体的内容
7. `only-if-cached` 告诉服务器仅能返回缓存的响应，否则若没有缓存则返回504错误码


## 响应头
### Content-Type
- 指明包体类型和编码，媒体类型、编码
```js
// 例如： 
Content-Type: text/html; charset=utf-8 
// text/html表示媒体类型
// charset=utf-8 表示字符编码
```
### Content-Encoding
- 内容编码,表示是否使用了压缩
```js
Content-Encoding: gzip // 表示使用了 gzip 压缩
```
### Content-Language
- 语言
```js
Content-Language: // 没有找到对应的。。
```
### Content-Length
- 明确指明头部包体长度
```js
// 例如：
Content-Length: 47 // 47表示包体中字节的个数, 必须和实际包体长度一致，如果长度不一致会怎么样呢？
// 长度值小于实际长度：包体丢失，只返回了指定长度的包
// 长度值大于实际长度：不符合HTTP规范，浏览器无法解析
```
<p><font color='red'><b>这么使用的优点：接收端处理更简单</b></font></p>
<p><font color='red'><b>这么使用的缺点：有些服务器端防火墙只基于`Content-Length`处理，如果不通过`Content-Length`去传输包体的时候，很可能就会有一些漏网之鱼，直接去攻击数据库等等</b
></font
></p>

### Transfer-Encoding
- 头部指明使用`Chunk`传输方式
- 不明确包体的长度时, 含有`Transfer-Encoding`头部后`Content-Length`头部应被忽略
```js
Transfer-Encoding: "chunked" / "compress" / "deflate" / "gzip" / transfer-extension

// 当使用 Transfer-Encoding: chunked 时，包体的类型
chunked-body: *chunk
// last-chunk(chunk已经结束)
// trailer-part
// CRLF(换行符)
```
<p><font color='red'><b>优点：基于长连接持续推送动态内容</b></font></p>
<p><font color='red'><b>优点：压缩体积较大的包体时，不必完全压缩(计算出头部)再发送，可以边发送边压缩</b></font></p>
<p><font color='red'><b>优点：传递必须在包体传输完才能计算出Trailer头部</b></font></p>

### Content-Disposition
- 指定包体的展示方式
1. `inline` 指定包体是以`inline`内联的方式，作为页面的一部分展示
2. `attchment` 指定浏览器将包体以附件的形式下载
```js
// 例如：
Content-Disposition: attachment
Content-Disposition: attachment; filename="filename.jpg"
```
3. 在`multipart/form-data`类型应答中，可以拥有子消息体部分
```js
// 例如：
Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"
```

### Server
- 指明服务器上所使用软件的信息，用于帮助客户端定位问题或者统计数据
```js
// 例如：
Server: Apache // 使用的是 Apache 代理服务器
```
### Allow
- 告诉客户端，服务器上该URI对应的资源允许哪些方法的执行
```js
// 例如：
Allow： GET, HEAD, PUT 
```

### Accept-Ranges
- 告诉客户端服务器上该资源是否允许`range`请求
```js
// 例如：
Accept-Ranges: bytes // 接受 range 请求，请求的单位是字节
Accept-Ranges: none // 不接受 range 请求
```

### Range
- 如果客户端已经获得了`Range`响应的一部分，并想在这部分响应未过期的情况下，获取其它部分的响应
> 常与 If-Unmodified-Since 或者 If-Match 头部共同使用

- `If-Range= entity-tag / HTTP-date`
> 可以使用 Etag 或者 Last-Modified

<p><font color='red'><b>如果服务器不支持`Range`那么就会返回全部</b></font></p>

### Date
- 响应包体生成的时间
```js
// 例如：
Date: Sat, 06 Jun 2020 11:32:16 GMT
```

### Age 
- 服务器发出响应的时间到使用缓存的响应发生时经过的秒数

### Cache-Control
1. `must-revalidate` 告诉客户端一旦缓存过期，必须向服务器验证后才可使用
2. `proxy-revalidate` 与`must-revalidate`类似，但它仅对代理服务器的共享缓存有效
3. `no-cache` 告诉客户端不能直接使用缓存的响应，使用前必须在源服务器验证得到304返回码，如果`no-cache`后指定头部，则若客户端的后续请求及响应中不含有这些头则可直接使用缓存
4. `max-age` 告诉客户端缓存`Age`超出`max-age`秒后则缓存过期 
5. `s-maxage` 与`max-age`相似，但仅针对共享缓存，且优先级高于`max-age`和`Expires`
6. `private` 表示该响应不能被代理服务器作为共享缓存使用，若`private`后指定头部，则在告诉代理服务器不能缓存指定的头部，但可缓存其他部分
7. `no-store` 告诉所有下游节点不能对响应进行缓存
8. `no-transform` 告诉代理服务器不能修改消息包体的内容


## 条件请求
### 目的及应用场景
#### 目的
- 由客户端携带条件判断信息，而服务器预执行条件验证过程成功后，再返回

#### 应用场景
- 使缓存的更新更有效率(如304响应码使服务器不用传递包体)
- 断点续传时对之前内容的验证
- 当多个客户端并行修改统一资源时，防止某一客户端的更新被错误丢弃

### 强验证器和弱验证器的概念
#### 验证器`validator`: 根据客户端请求中携带的相关头部，以及服务器资源的信息，执行两端的资源验证
- 强验证器：服务器上的资源表述只要有变动(例如版本更新或者元数据更新)，那么以旧的验证头部访问一定会导致验证不过
- 弱验证器：服务器上的资源变动时，允许一定程度上仍然可以验证通过(例如一小段时间内仍然允许缓存有效)

## 条件请求-请求头
### If-Match
- 如果匹配了继续向下执行

### If-None-Match
- 如果不匹配继续向下执行

### If-Modified-Since
- 如果不晚于这个时间继续向下执行

### If-Unmodified-Since
- 如果晚于这个时间继续向下执行

### If-Range
- 值可以为上面4个请求头也可以为时间

## 条件请求-响应头
### Etag
- 响应头 
```js
// 例如：
ETag: "xxx" // 强验证器
ETag: W/"xxx" // 弱验证器
```
### Last-Modified 
- 响应头部，表示对应资源的上次修改时间，常用于缓存，不能晚于`Date`(头部)的值


## Cookie和Session
- 保存在客户端，由浏览器维护、表示应用状态的HTTP头部
- 存放在内存或者磁盘中
- 服务端生成的`Cookie`在响应中通过`Set-Cookie`头部告知客户端(运行多个Set-Cookie头部传递多个值)
- 客户端得到`Cookie`后，后续请求都会自动将`Cookie`头部携带至请求中

### Cookie
- `Cookie`头部中可以存放多个`name/value`键值对
```js
// Cookie: cookie-pair *(";" sp cookie-pair)
// cookie-pair = cookie-name "=" cookie-value
// 例如： 多个之间以 ; 分隔
Cookie: BAIDUID=513C67457FF5F9D0F2F898EAD31933CC:FG=1; BIDUPSID=513C67457FF5F9D0F2F898EAD31933CC; PSTM=1554902507; 
```

### Set-Cookie
- `Set-Cookie`头部一次只能传递一个`name/value`键值对，响应中可以包含多个头部
```js
// Set-Cookie: cookie-pair *(";" sp cookie-av)
/**
* cookie-av = Expires / Max-Age / Domain / Path / Secure / HttpOnly / Extension
* Expires=sane-cookie-data(cookie到sane-cookie-date后失效)
* Max-Age=non-zero-digit(cookie经过多少秒后失效(不能是0)，优先级高于Expires) 
* Domain=""(指定cookie可用于哪些域名，默认可以访问当前域名)
* Path=""(哪些路径下才能使用cookie)
* Secure(只有使用TLS/SSL协议(https)时才能使用cookie)
* HttpOnly(不能使用JavaScript(Document.cookie XMLHttpRequest、Request APIs)访问到cookie)
*/
// 例如：
Set-Cookie: ab_jid=285e62d190506240060ebc3b20afa329fe17; Path=/; Domain=miao.baidu.com; Max-Age=2147483647; HttpOnly
Set-Cookie: ab_jid_BFESS=285e62d190506240060ebc3b20afa329fe17; Path=/; Domain=miao.baidu.com; Max-Age=2147483647; HttpOnly; Secure; SameSite=None
```

### Cookie使用的限制
1. `RFC`规范对<font color='red'><b>浏览器使用`Cookie`的要求</b></font>
- 每条`Cookie`的长度(包括name、value以及描述的属性总长度)至少要达到4KB
- 每个域名下至少支持50个`Cookie`
- 至少要支持3000个`Cookie`

2. 代理服务器传递`Cookie`时会有限制
- 代理服务器可能会限制HTTP的头部为4K、8K、32K

### Cookie使用的问题
1. `Cookie`会被附加在每个HTTP请求中，所以无形中增加了流量
2. 由于在HTTP请求中的`Cookie`是明文传递的，所以有安全性问题(除非用HTTPS，HTTPS会自己加密)
3. `Cookie`的大小不应超过4KB，这对应复杂的存储需求来说是不够用的

### Cookie和Session的常见用法案例
- 登录场景的使用
1. 客户端发起一个登录请求
2. 服务器拿到客户端里发送过来的账户和密码到持久化数据库(如：MySQL)比对
3. 如果比对通过，就会根据当前的账户生成一个`Session`(有时效的，一般记录了哪个账户，多长时间有效)，把这个`Session`记录一个`SessionID`存储在内存数据库中(如：Redis)
4. 返回给浏览器，以`Set-Cookie`返回
5. 浏览器进行保存，一般在`storage`
6. 客户端以后在进行请求的时候会自动带上`Cookie`
7. 服务器根据`Cookie`解析`Session`并对比资源状态
8. 执行请求需要处理的业务
9. 返回给客户端

## 缓存
<p><font color='red'><b>目标：减少时延，降低带宽消耗</b></font></p>

### 缓存的工作原理
- 在第一个请求中缓存了，为后续的请求使用第一个请求缓存住的响应
- 页面缓存状态是由HTTP header头部决定的，一个浏览器请求信息，一个服务器响应信息，主要包括`Pragma: 
no-cache、Cache-Control、Expires、Last-Modified、If-Modified-Since`,其中`no-cache`由HTTP1.0规定，`Cache-Control`由HTTP1.1规定
1. 第一次请求：浏览器通过http的header报头，附带Expires，Cache-Control，Last-Modified/Etag向服务器请求，此时服务器记录第一次请求的Last-Modified/Etag
2. 再次请求：当浏览器再次请求的时候，请求头附带Expires，Cache-Control，If-Modified-Since/Etag向服务器请求
3. 服务器根据第一次记录的Last-Modified/Etag和再次请求的If-Modified-Since/Etag做对比，判断是否需要更新，服务器通过这两个头判断本地资源未发生变化，客户端不需要重新下载，返回304响应。

### 私有缓存与共享缓存
#### 私有缓存
- 仅供一个用户使用的缓存，通常只存在于如浏览器这样的客户端上

#### 共享缓存
- 可以供多个用户的缓存，存在于网络中负责转发消息的代理服务器(对热点资源常使用共享缓存，以减轻源服务器的压力，并提升网络效率)
1. `Authentication`(验证类型头部)响应不可被代理服务器缓存
2. 正向代理
3. 反向代理

### 什么样的响应才会被缓存 
- 请求方法可以被缓存理解(不只有GET方法)
- 响应码可以被缓存理解(404、206也可以被缓存)
- 响应与请求的头部没有指明`no-store`
- 响应中至少应含有以下头部中的1个或者多个：`Expires、max-age、s-maxage、public`，当响应中没有明确指示过期时间的头部时，如果响应码非常明确，也可以缓存
- 如果缓存在代理服务器上：不含有`private、Authorization`

### 缓存新鲜度的四种计算方式
- 缓存优先级：`S-MaxAge、Max-Age、Expires、预估过期时间`
#### 预估过期时间缓存
- 大部分的请求是没有`Max-Age`响应头的，没有告诉客户端这部分内容要不要缓存，但是有一些内容是相对不怎么变化的，比如图片、js、css文件等是不怎么变化的,
但是可能服务器配置有问题，没有考虑带宽的优化和性能体验性的提升，所以没有配置相应的缓存的过期时间的内容，那么浏览器要不要缓存呢？还是要缓存的，那么缓存多长时间呢？现在的浏览器基本上是根据RFC7234推荐的值((浏览器获取到响应的时间
 - 服务器端显示的该资源的上次修改时间) * 10%)
来进行一些修改的，
1. `chrome` 10%
2. `webkit` 10%
3. `Firefox` 小于等于10%


## 应用常见问题

### 为什么要进行URI编码
- 传递数据中，如果存在用作分隔符的保留字符怎么办？

- 对可能产生歧义性的数据编码
1. 不在ASCII码范围内的字符
2. ASCII码中不可显示的字符
3. URI中规定的保留字符`: / ? # [ ] @ ! $ & ' ( ) * + , ; =`等等
4. 不安全字符(传输环节中可能被不正确的处理)，如：空格、引号、尖括号等

### 多线程、断点续传、随机点播
<p><font color='red'><b>使用HTTP Range头部</b></font></p>

1. 客户端明确任务：从哪开始下载
- 本地是否有部分文件
> 文件已下载部分在服务器发生改变？
- 使用多线程并发下载

2. 下载文件的指定部分内容
3. 下载完毕后拼装成统一的文件



<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

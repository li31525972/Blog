# Nginx

## Nginx 安装部署
### 获取安装文件
#### 官方下载网址
```js
http://nginx.org/en/download.html
```
<img src="/imgs/nginx-download.png">

### Mac安装方式-测试使用
```js
// 先安装Homebrew
https://brew.sh/

// 安装Nginx
brew install nginx

// 安装目录
/usr/local/Cellar/nginx 

// 配置文件目录
/usr/local/etc/nginx/
```
- 进入`nginx.conf`页面后，修改配置项
<img src="/imgs/nginx-author.png">
<img src="/imgs/nginx-port.png">
<img src="/imgs/nginx-404.png">

### `Nginx`启停命令
- `sudo`为`Mac、Linux`系统以系统管理员的身份执行指令
1. 启动Nginx: `sudo nginx`
2. 关闭Nginx：`nginx -s stop`
3. 重新启动：`sudo nginx -s reload`

#### 目录结构
- `conf` 目录中存放的是`Nginx`服务器的配置文件，包含`Nginx`服务器的基本配置文件和对部分特性的配置文件
- `dosc` 目录中存放了`Nginx`服务器的文档资料，包含`Nginx`服务器的`LICENSE、OpenSSL`的`LICENSE、PCRE`的`LICENCE`以及`zlib`的`LICENSE`，还包括本版本`Nginx
`服务器升级的版本变更说明，以及`README`文档
- `html` 目录中存放了两个后缀名为`.html`的静态网页文件，这两个文件与`Nginx`服务器的运行相关
- `logs` 目录中存放了`Nginx`服务器的运行日志文件

### Linux安装方式
- 首先安装一款`Linux/UNIX`操作系统发行版，常见的有`Redhat、SUSE、Fedora、CentOS、Ubuntu、Solaris`以及`Debian`等，在一些`Linux`发行版和BSD的衍生版中自带了`Nginx
`软件的二进制文件，但由于`Nginx`软件升级频繁，这些编译好的二进制文件大都比较陈旧，建议直接从较新的源代码编译安装

#### 文件目录结构
- `src` 目录中存放了`Nginx`软件的所有源代码
- `man` 目录中存放了`Nginx`软件的帮助文档，`Nginx`安装完成后，在`Fedora`的命令行中使用`man`命令可以查看
```$xslt
#man nginx
```
- `html` 目录中存放了两个后缀名为`.html`的静态网页文件，这两个文件与`Nginx`服务器的运行相关
- `conf` 目录中存放的是`Nginx`服务器的配置文件，包含`Nginx`服务器的基本配置文件和对部分特性的配置文件
- `auto` 目录中存放了大量的脚本文件，和`configure` 脚本程序有关
- `configure` 文件是`Nginx`软件的自动脚本程序

### configure 脚本支持的常用选项
- Nginx源代码的编译需要现使用configure脚本自动生成Makefile文件，以下为configure脚本常用选项

|           选项              |                   说明                  |
|       :---------:     |                 :---:                   |
|   `--prefix=<path>` |   指定Nginx软件的安装路径，默认为`/user/local/nginx/`目录    |
|   `--sbin-path=<path>` |   指定Nginx可执行文件安装路径，此项只能在安装时指定，如果未指定，默认为`<prefix>/sbin/nginx/`目录|
|   `--conf-path=<path>` |  在未给定`-c`选项下，指定默认的`nginx.conf`路径，如果未指定，默认为`<prefix>/conf/`   |
|   `--pid-path=<path>` |   在nginx.conf中未指定pid指令时，指定默认的`nginx.pid`路径，如果未指定，默认为`<prefix>/logs/nginx.pid`, `nginx.pid`保存了当前运行的Nginx服务的进程号 |
|   `--lock-path=<path>`    |   指定nginx.lock文件的路径，nginx.lock是Nginx服务器的锁文件，如果未指定，默认为`/var/lock/`目录   |
|   `--error-log-path=<path>`   |   在nginx.conf中未指定error_log指令的情况下，指定默认的错误日志路径，如果未指定，默认为`<prefix>/logs/error.log`   |
|   `http-log-path=<path>`  |   在nginx.conf中未指定access_log指令的情况下，指定默认的访问日志路径，如果未指定，默认为`<prefix>/logs/access.log` |
|   `--user=<user>` |   在nginx.conf中未指定user指令的情况下，指定默认的Nginx服务器进程的属主用户，即Nginx进程运行的用户，可以理解为指定哪个用户启动Nginx，如果未指定，默认为`nobody`, 表示不限制   |
|   `--group=<group>`   |   在nginx.conf中未指定user指令的情况下，指定默认的Nginx服务器的属主用户组，即Nginx进程运行的用户，可以理解为指定哪个用户组的用户启动Nginx，如果未指定，默认为`nobody`，表示不限制  |
|   `--builddir=<dir>`  |   指定编译时的目录    |
|   `--with-debug`      |   声明启用Nginx的调试日志  |
|   `--add-module=<path>`   |   指定第三方模块的路径，用以编译到Nginx服务中    |
|   `--with-poll_module`    |   声明启用poll模块，poll模块是信号处理的一种方法，和下面提到的select模式类似，都是采用轮询方法处理信号   |
|   `--without-poll_module`  |   声明禁止poll模块      |
|         |      <font color='red'><b>相当多。。。有空再添加</b></font>  |




## Nginx启停控制
- 在`Linux`平台下，控制`Nginx`服务的启停有不止一种方法

### Kill SIGNAL PID
- Nginx服务的信号控制
- 在`Nginx`服务运行时，会保持一个主进程和一个或多个`worker process`工作进程，我们通过给`Nginx`服务的主进程发送信号就可以控制服务的启停了，那么如果给主进程发送信号呢？首先要知道主进程的进程号PID
，获取PID有两个途径：
1. 在`Nginx`服务启动以后，默认在`Nginx`服务器安装目录下的`logs`目录中会产生文件名为`nginx
.pid`的文件，此文件保存的就是`Nginx`服务主进程的PID，这个文件的存放路径和文件名都可以在`Nginx`服务器的配置文件中进行配置
2. 使用`Linux`平台下查看进程的工具`ps`，使用方法是：
```text
  # ps -ef | grep nginx
  501 43612     1   0  9 620  ??         0:00.01 nginx: master process nginx
  501 49364 43612   0 10 620  ??         0:00.09 nginx: worker process
  501  6340 90639   0  9:23上午 ttys001    0:00.00 grep nginx
```
- 从运行的结果来看，系统中包含一个`Nginx`服务的主进程`master process`和三个工作进程`worker process`，其中PID为第二列中的43612,`Nginx`服务主进程能够接受的信号如下：

|   信号          |       作用                                              |
|   :---:       |           :---:                                       |
|   TERM或INT    |       快速停止Nginx服务                             |
|   QUIT        |       平缓停止Nginx服务                                 |
|   HUP         |       使用新的配置文件启动进程，之后平缓停止原有进程(平滑重启)   |
|   USR1        |       重新打开日志文件，常用于日志切割                    |
|   USR2        |       使用新版本的Nginx文件启动服务，之后平缓停止原有Nginx进程(平滑升级) |
|   WINCH       |       平缓停止 worker process，用于Nginx的平滑升级        |

- 用法是：
```text
# kill SIGNAL PID
```
- `SIGNAL`，用于指定信号，上表中的某一个
- `PID`，指定`Nginx`服务主进程的PID，也可以使用`nginx.pid`动态获取PID号：
```text
# kill SIGNAL `filepath`
```
- `filepath`为`nginx.pid`的路径

### nginx -s SIGNAL
这里的`SIGNAL`包括：
- `stop` 快速关闭`Nginx`，不等待工作进程完成当前请求
- `quit` 优雅关闭`Nginx`，等待工作进程完成当前请求，必须由启动`Nginx`的同一用户来执行，比如root，普通用户启动的`Nginx`，root可以执行`nginx -s quit`来关闭
- `reload` 重新加载配置文件，使更改的配置生效，以新的配置文件去启动新的工作进程，同时通知旧的工作进程优雅关闭
- `reopen` 用于创建新的日志文件，成功后可以对旧的日志文件进行压缩，需要测试




## Nginx基础配置指令

### 基本配置
- 默认的Nginx服务器配置文件都存放在安装目录conf中，主配置文件为`nginx.conf`, 以下为基本配置方法：
```$xslt
#user  nobody;
worker_processes  1;                                # 全局生效

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {    # events 块
    worker_connections  1024;                       # 在 events 部分中生效
}


http {
    include       mime.types;                       # 以下指令在 http 部分中生效
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {                                        # 以下指定在 http 的 server 部分中生效
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {                                # 以下指令在 http/server 的 location 中生效
            root   html;
            index  index.html index.htm;
        }
    }
}

```

### nginx.conf 文件结构
```$xslt
---                                 # 全局块

events {                            # events 块

}

http {                              # http 块

                                    # http 全局块
                
    server {                        # server 块
    
        ---                         # server 全局块
        
        location [PATTERN] {        # location 块
        
        }
        
        location [PATTERN] {        # location 块
                
        }
    
    }
    
    server {                        # server 块
        
            ---                     # server 全局块
            
            location [PATTERN] {    # location 块
            
            }
            
            location [PATTERN] {    # location 块
                    
            }
        
    }
    ...
}
---
```

1. 全局块： 默认配置文件从开始到events块之间的一部分内容，主要设置一些影响Nginx服务器整体运行的配置指令
2. events块：主要影响Nginx服务器与用户的网络连接
3. http块：Nginx服务器配置中的重要部分，代理、缓存、日志等绝大多数的功能和第三方模块的配置都可以放在这里面
4. server块：和`虚拟主机`的概念有密切联系
5. location块：基于Nginx服务器接收到的请求字符串，对除虚拟主机名称(也可以是IP别名)之外的字符串进行匹配，对特定的请求进行处理，地址定向、数据缓存和应答控制等功能都是在这部分实现

### 运行Nginx服务器的用户(组)
```$xslt
user user [group];

所有用户都可以启动Nginx的两种方法
#user user [group];     1. 将此指令注释
user nobody nobody;     2. 将用户(和用户组)设置为nobody，这也是user指令的默认配置      
```
1. `user` 指定可以运行Nginx服务器的用户
2. `group` 可选项，指定可以运行Nginx服务器的用户组
- 只有被设置的用户或者用户组成员才有权限启动`Nginx`进程，如果其它用户尝试启动`Nginx`进程，将会报错

### 允许生成的 worker process 数
- `worker process`是`Nginx`服务器实现并发处理的关键，从理论上来说，`worker 
process`的值越大，可以支持的并发数越多，但实际上还要受到来自软件本身、操作系统本身资源和能力、硬件设备等制约，配置允许生成的`worker process`数的指令是`worker_processes`，语法格式为：
```text
worker_processes number | auto;
```
- `number` 指定`Nginx`进程最多可以产生的`worker process`数
- `auto` 设置此值，`Nginx`进程将自动检测
- 默认配置文件中 number=1

<font color='red'><b>此指令只能在全局块中设置</b></font>

### Nginx 进程 PID 存放路径
- 指令是`pid`，语法格式为：
```text
pid `file`
```
- `file`指存放路径和文件名称
- 配置文件默认将此文件放在`Nginx`安装目录的`logs`下，名字为`nginx.pid`

<font color='red'><b>注意：指定[path]的时候，一定要包含文件名，否则会报错</b></font>

<font color='red'><b>此指令只能在全局块中设置</b></font>


### 配置文件引入
- `Nginx`提供了`include`指令来完成配置文件的引入，语法为：
```text
include `file`
file 指要引入的配置文件，支持相对路径
```
<font color='red'><b>注意：新引入的文件同样要求对于运行Nginx进程的用户要具有写权限，否则在启动Nginx进程的时候会报错</b></font>

### 网络连接序列化
- 当某一时刻只有一个网络连接到来时，多个睡眠进程会被同时唤醒，但只有一个进程可获得连接，如果每次唤醒的进程数太多，会影响一部分系统性能，为解决这个问题，`Nginx`配置了一个指令`accept_mutex
`，当其开启的时候，将对多个`Nginx`进程接收连接进行序列化，防止多个进程对连接的争抢，语法结构为：
```text
accept_mutex on | off
```
<font color='red'><b>此指令只能在`event`块中设置,默认为开启(on)</b></font>

### 是否允许同时接收多个网络连接
- 每个`Nginx`服务器的`worker process`都有能力同时接收多个新到达的网络连接，需要在配置文件中进行设置，指令为`multi_accept`，语法结构为：
```text
multi_accept on | off;
```
<font color='red'><b>此指令只能在`event`块中设置,默认为关闭(off)</b></font>

### 事件驱动模型
- `Nginx`服务器提供了多种事件驱动模型来处理网络消息，配置文件中为我们提供了相关的指令来强制`Nginx`服务器选择哪种事件驱动模型进行消息处理，指令为`use`，语法结构为：
```text
use method;
```
- `method`可选择的内容有：
1. `select`
2. `poll`
3. `kqueue`
4. `epoll`
5. `rtsig`
6. `/dev/poll`
7. `eventport`

### 最大连接数
- 指令`worker_connections`主要用来设置允许每一个`worker process`同时开启的最大连接数，语法结构为：
```text
worker_connections number;
```
- 默认值为 512

<font color='red'><b>注意：这里的`number`不仅仅包括和前端用户建立的连接数，而是包括所有可能的连接数，另外，`number`值不能大于操作系统支持打开的最大文件句柄数量</b></font>

<font color='red'><b>此指令只能在`event`块中设置</b></font>

### 连接超时时间
- 与用户建立回话连接后，`Nginx`服务器可以保持这些连接打开一段时间，指令`keepalive_timeout`用来设置此时间，语法结构为：
```xlsx
keepalive_timeout timeout[header_timeout]
```
1. `timeout`服务器端对连接的保持时间，默认值为`75s`
2. `header_timeout`可选项，在应答报文头部的`Keep-Alive`域设置超时时间，可以在http块、server块和location块中配置，示例：
```xlsx
keepalive_timeout 120s 100s;
含义是：在服务端保持连接的时间设置为120s,发给用户端的应答报文中的超时时间为100s
```

### 单连接请求数上限
- `Nginx`

### MIME-Type
- 常用的浏览器中，可以显示的内容有HTML、XML、GIF及Flash等种类繁多的文本、媒体资源，浏览器区分这些资源，需要使用`MIME Type`，`Nginx`服务器作为web服务器，必须能够识别客户端请求的资源类型
- 在默认的`Nginx`配置文件中，在`http`全局块中有以下两行配置
```$xslt
    include       mime.types;
    default_type  application/octet-stream;
```
- 第一行从外部引入了 `mime.types` 文件，来看一下这个文件的内容：
```$xslt
types {
    text/html                                        html htm shtml;
    ...

    text/mathml                                      mml;
    ...

    image/png                                        png;
    ...

    font/woff                                        woff;
    font/woff2                                       woff2;

    application/java-archive                         jar war ear;
    ...

    application/octet-stream                         bin exe dll;
    ...

    audio/midi                                       mid midi kar;
    ...

    video/3gpp                                       3gpp 3gp;
    ...
}
```
- 从`mime_types`文件的内容片段可以看到，定义了一个`types`结构，结构中包含了浏览器能够识别的`MIME`类型以及对应相关类型的文件后缀名
- 第二行中使用指令 `default_type` 配置了用于处理前端请求的`MIME`类型，其语法结构为：
```xslt
default_type mime-type;
```
- 其中`mime-type`为`types`块中定义的`MIME-type`，如果不加此指令，默认值为`text/plain`，此指令还可以在http块、server块或者location块中进行配置


## 日志
### 错误日志
- 在全局块、http块和server块中都可以对`Nginx`服务器的日志进行相关配置，语法结构为：
```text
error_log file | stderr [debug | info | notice | warn | error | crit | alert | emerg];
日志的级别可选项，由低到高分为：debug | info | notice | warn | error | crit | alert | emerg

配置实例：
error_log logs/error.log error
```
<font color='red'><b>注意：指定的文件对于运行Nginx进程的用户要具有写权限，否则在启动Nginx进程的时候会报错</b></font>

### 服务日志
- 记录`Nginx`服务器提供服务过程应答前端请求的日志，称之为服务日志，`Nginx`服务器支持对服务日志的格式、大小、输出等进行配置，需要使用两个指令，分别是`access_log`和`log_format`指令
#### access_log
- 语法结构为：
```xlsx
access_log path[format[buffer=size]];
```
- `path` 配置服务日志的文件存放的路径和名称
- `format` 可选项，自定义服务日志的格式字符串
- `size` 配置临时存放日志的内存缓存区大小
- 此指令可以在http块、server块或者location块中进行配置，默认的配置为：
```xlsx
access_log logs/access.log combined;
combined 为log_format 指令默认定义的日志格式字符串的名称
```

#### log_format
- 用于定义服务日志的格式，并且可以为格式字符串定义一个名字，以便`access_log`指令直接调用，语法格式为：
```xlsx
log_format name string ...;
```
1. `name` 格式字符串的名字，默认的名字为`combined`
2. `string`服务日志的格式字符串，在定义过程中，可以使用`Nginx`配置预设的一些变量获取相关内容，变量的名称使用双引号括起来，`string`整体使用单引号括起来，在`string`中可以使用的变量请自行查阅，
<font color='red'><b>此指令只能在`HTTP`块中设置</b></font>

#### 取消记录服务日志
```xlsx
access_log off;
```
## 文件传输
### sendfile方式传输文件
- `sendfile`传输方式的相关指令`sendfile`和`sendfile_max_chunk`以及它们的语法结构为：
1. `sendfile`用于开启或者关闭使用`sendfile()`传输文件，默认为关闭(off)，可以在http块、server块或者location块中进行配置
```xlsx
sendfile on | off;
```
2. `sendfile_max_chunk` 用于设置`sendfile()`上传的文件大小，如果设置为0，则无限制，默认值为0，可以在http块、server块或者location块中进行配置
```xlsx
sendfile_max_chunk 128k;
```


## Nginx 服务器架构

### 模块化结构


### Web请求处理机制


### 事件驱动模型


### 设计架构概览



## Nginx 服务器高级配置
### 针对IPv4的内核7个参数的配置优化


### 针对CPU的配置优化


### 与网络连接相关的配置


### 与事件驱动模型相关的配置





## Nginx 服务器的Gzip压缩



## Nginx 服务器的Rewrite功能



## Nginx 服务器代理



## Nginx 服务器缓存机制



## Nginx 服务器邮件服务



## Nginx 基本数据结构



## Nginx 启动初始化



## Nginx 时间管理



## Nginx 内存管理



## Nginx 工作进程



## Nginx 模块编程



## Nginx 常见问题


<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

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
```$xlsx
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
```xlsx
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
```xlsx
# kill SIGNAL PID
```
- `SIGNAL`，用于指定信号，上表中的某一个
- `PID`，指定`Nginx`服务主进程的PID，也可以使用`nginx.pid`动态获取PID号：
```xlsx
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
```$xlsx
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
```$xlsx
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
```$xlsx
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
```xlsx
worker_processes number | auto;
```
- `number` 指定`Nginx`进程最多可以产生的`worker process`数
- `auto` 设置此值，`Nginx`进程将自动检测
- 默认配置文件中 number=1

<font color='red'><b>此指令只能在全局块中设置</b></font>

### Nginx 进程 PID 存放路径
- 指令是`pid`，语法格式为：
```xlsx
pid `file`
```
- `file`指存放路径和文件名称
- 配置文件默认将此文件放在`Nginx`安装目录的`logs`下，名字为`nginx.pid`

<font color='red'><b>注意：指定[path]的时候，一定要包含文件名，否则会报错</b></font>

<font color='red'><b>此指令只能在全局块中设置</b></font>


### 配置文件引入
- `Nginx`提供了`include`指令来完成配置文件的引入，语法为：
```xlsx
include `file`
file 指要引入的配置文件，支持相对路径
```
<font color='red'><b>注意：新引入的文件同样要求对于运行Nginx进程的用户要具有写权限，否则在启动Nginx进程的时候会报错</b></font>

### 网络连接序列化
- 当某一时刻只有一个网络连接到来时，多个睡眠进程会被同时唤醒，但只有一个进程可获得连接，如果每次唤醒的进程数太多，会影响一部分系统性能，为解决这个问题，`Nginx`配置了一个指令`accept_mutex
`，当其开启的时候，将对多个`Nginx`进程接收连接进行序列化，防止多个进程对连接的争抢，语法结构为：
```xlsx
accept_mutex on | off
```
<font color='red'><b>此指令只能在`event`块中设置,默认为开启(on)</b></font>

### 是否允许同时接收多个网络连接
- 每个`Nginx`服务器的`worker process`都有能力同时接收多个新到达的网络连接，需要在配置文件中进行设置，指令为`multi_accept`，语法结构为：
```xlsx
multi_accept on | off;
```
<font color='red'><b>此指令只能在`event`块中设置,默认为关闭(off)</b></font>

### 事件驱动模型
- `Nginx`服务器提供了多种事件驱动模型来处理网络消息，配置文件中为我们提供了相关的指令来强制`Nginx`服务器选择哪种事件驱动模型进行消息处理，指令为`use`，语法结构为：
```xlsx
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
```xlsx
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
- `Nginx`服务器端和客户端建立回话连接后，客户端通过此连接发送请求，指令`keepalice_requests`用于限制用户通过某一连接向`Nginx`服务器发送请求的次数，语法结构为：
```xlsx
keepalive_requests numbers;
```
<font color='red'><b>此指令可以在`http、server、location`块中设置</b></font>

### MIME-Type
- 常用的浏览器中，可以显示的内容有HTML、XML、GIF及Flash等种类繁多的文本、媒体资源，浏览器区分这些资源，需要使用`MIME Type`，`Nginx`服务器作为web服务器，必须能够识别客户端请求的资源类型
- 在默认的`Nginx`配置文件中，在`http`全局块中有以下两行配置
```$xlsx
    include       mime.types;
    default_type  application/octet-stream;
```
- 第一行从外部引入了 `mime.types` 文件，来看一下这个文件的内容：
```$xlsx
types {
    xlsx/html                                        html htm shtml;
    ...

    xlsx/mathml                                      mml;
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
```xlsx
default_type mime-type;
```
- 其中`mime-type`为`types`块中定义的`MIME-type`，如果不加此指令，默认值为`xlsx/plain`，此指令还可以在http块、server块或者location块中进行配置

### 网络监听
- 配置监听使用指令`listen`，其配置方法主要有三种
1. 配置监听的IP地址，语法结构为：
```xlsx
listen address[:port] [default_server] [setfib=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [deferred] 
[accept_filter=filter] [bind] [ssl];
```
2. 配置监听端口，语法结构为：
```xlsx
listen port [default_server] [setfib=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [deferred] 
[accept_filter=filter] [bind] [ipv6only= on | off] [ssl];
```
3. `UNIX Domain Socket`(一种在原有Socket框架上发展起来的IPC机制，用于在单个主机上执行客户/服务端通信，请自行参阅相关文档)

- `address`IP地址，如果是IPV6的地址，需要使用中括号`[]`括起来
- `port`端口号，如果只定义了IP地址没有定义端口号，就使用80端口
- `path`socket文件路径，如：`var/run/nginx.sock`等
- `default_server`标识符，将此虚拟主机设置为`address:port`的默认主机
- `setfib=number`监听`socket`关联路由表
- `backlog=number`设置监听函数`listen()`最多允许多少网络连接同时处于挂起状态，在`FreeBSD`中默认为`-1`，其它平台默认为`511`
- `rcvbuf=size`设置监听`socket`接收缓存区大小
- `sndbuf=size`设置监听`socket`发送缓存区大小
- `deferred`标识符，将`accept()`设置为`Deferred`模式
- `accept_filter=filter`设置监听端口的过滤，被过滤的内容不能被接收和处理
- `bind`使用独立的`bind()`处理此`address:port`,一般情况下，对于端口相同而IP地址不同的多个连接，`Nginx`服务器将只使用一个监听命令，并使用`bind()`处理端口相同的所有连接
- `ssl`设置会话连接使用`SSL`模式进行

#### 下面为一些 listen 的示例：
```xlsx
listen 192.168.0.10:8000; # 监听具体的IP和具体的端口上的连接
listen 192.168.0.10; # 监听具体IP的所有端口上的连接
listen 8080; # 监听具体端口上的所有IP的连接，等同于 listen *:8000;
listen 192.168.0.10 default_server backlog=1024 # 设置192.168.0.10的连接请求默认由此虚拟主机处理，并且允许最多1024网络连接同时处于挂起状态 
```

## 虚拟主机
### 基于名称的虚拟主机配置
- 主机指的是`server`块对外提供的虚拟主机，设置了主机的名称并配置好DNS，用户就可以使用这个名称向此虚拟主机发送请求了，配置主机名称的指令为`server_name`,语法结构为：
```xlsx
server_name name ...;
name 可以只有一个名称，也可以由多个名称并列，之间用空格隔开，每个名字就是一个域名，示例：
server_name server.com www.server.com;
```
- 在`name`中可以使用通配符`*`，但通配符只能用在由三段字符串组成的名称的手段和尾段，或者有两段字符串组成的名称的尾段，如：
```xlsx
server_name *.server.com www.server.*;
```
- 还可以使用正则表达式，并使用波浪号`~`作为正则表达式字符串的开始标记，如：
```xlsx
server_name ~^www\d+\.server\.com$;
```

### 基于IP的虚拟主机配置
- `Linux`操作系统支持IP别名的添加，配置基于IP的虚拟主机，即为`Nginx`服务器提供的每台虚拟主机配置一个不同的IP，因此需要将网卡设置为同时能够监听多个IP地址，在`Linux`平台可以用`ifconfig
`工具为同一块网卡添加多个IP别名
- 相关的配置片段：
```xlsx
http
{
    server {
        listen  80;
        server_name 192.168.0.1;
    }
    
    server {
        listen  80;
        server_name 192.168.0.2;
    }
}
```

## location

### 配置请求根路径
- 使用`root`指令配置根目录路径，语法结构为：
```xlsx
root path; 

```
- path为Nginx服务器接收到请求以后查找资源的跟目录路径，path变量中可以包含Nginx服务器预设的大多数变量，只有`$document_root`和`$realpath_root`不可以使用
- 此指令可以在http块、server块和location块中配置，由于使用Nginx服务器多数情况下要配置多个location块对不同的请求分别作出处理，因此该指令通常在location块中进行设置

### 更改location的URI
- 用`alias`指令改变`location`接收到的URI的请求路径，其语法结构为：
```xlsx
alias path; # path为修改后的根路径，同样此变量中包含了除了`$document_root`和`$realpath_root`之外的其他Nginx服务器预设变量

看个示例：
location ~ ^/data/(.+\.(htm|html))$;
{
    alias /locationtest1/other/$1;
}
# 当location块中接收到 /data/index.html 的请求时，匹配成功，之后根据 alias 指令的配置
# Nginx服务器将到 locationtest1/other 目录下找到 index.html 并响应请求。通过 alias 的配置，根路径已经从 /data 改为 /locationtest1/other 了
```

### 404(错误)页面
```xlsx
error_page 404  /html/404.html; # 设置`Nginx`服务器使用`/404.html`页面响应404错误

error_page 403 http://xxx.xxx.com/error.html; # Nginx 使用 http://xxx.xxx.com/error.html 页面响应403错误

error_page 410 = 301 /html/error.html; # 设置 Nginx 服务器产生410的HTTP消息时，使用 /error.html 返回给客户端301消息(已移动)
# 注意上述路径都是Nginx的安装路径下的 /html 下的，如果不想将错误页面放到Nginx服务器的安装路径下管理，那么在设置完：

error_page 404 /404.html

location /404.html {
    root /myProjects/errorPages/;
}
# 先捕获 /404.html 请求，然后将请求定向到新的路径下面即可
```
<font color='red'><b>此指令可以在`http、server、location`块中设置</b></font>

## 日志
### 错误日志
- 在全局块、http块和server块中都可以对`Nginx`服务器的日志进行相关配置，语法结构为：
```xlsx
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

## 访问权限
### IP配置
- 由HTTP标准模块`ngx_http_access_module`支持的，通过IP判断客户端是否拥有对`Nginx`的访问权限

- `allow`指令，用于设置允许访问`Nginx`的客户端IP，语法结构为：
```xlsx
allow address | CIDR | all;
```
1. `address` 允许访问的客户端的IP，不支持同时设置多个，如果有多个IP需要设置，需要重复使用`allow`指令
2. `CIDR`允许访问的客户端的CIDR地址，例如：`202.80.15.20/25`前面是32位IP地址，后面`/25`代表IP地址中前25位是网络部分，其余位代表主机部分
3. `all`代表允许所有客户端访问

- `deny`用于设置禁止访问`Nginx`的客户端IP，语法结构为：
```xlsx
deny address | CIDR | all;
```
1. `address` 禁止访问的客户端的IP，不支持同时设置多个，如果有多个IP需要设置，需要重复使用`allow`指令
2. `CIDR`禁止访问的客户端的CIDR地址，例如：`202.80.15.20/25`前面是32位IP地址，后面`/25`代表IP地址中前25位是网络部分，其余位代表主机部分
3. `all`代表禁止所有客户端访问

<font color='red'><b>此指令可以在http块、server块或者location块中设置，使用这两个指令时，要注意all的用法：</b></font>
```xlsx
location / {
    deny 192.168.1.1;
    allow 192.168.1.2/25;
    deny all;
}
```
- 在上面禁止`192.168.1.1`访问，允许`192.168.1.2/25`访问，最后使用`all`禁止所有访问，那么`192.168.1
.2/25`能不能访问呢？是可以的，`Nginx`配置在解析过程中，遇到`deny`和`allow`指令是按照顺序对当前客户端进行权限检测的，如果遇到匹配的，则停止继续向下搜索相关配置

### 密码配置
- 基于`HTTP Basic Authentication`协议的认证，该协议是一种HTTP性质的认证方法，需要识别用户名和密码，由HTTP标准模块`ngx_http_auth_basic_module`支持

- `auth_basic` 用于开启或者关闭该认证功能，语法结构为：
```xlsx
auth_basic string | off;
```
1. `string` 开启该认证功能，并配置验证时的指示信息
2. `off` 关闭该认证功能

- `auth_basic_user_file` 用于设置包含用户名和密码信息的文件路径，语法结构为：
```xlsx
auth_basic_user_file file;
```
1. `file`为密码文件的绝对路径，密码文件支持明文或者密码加密后的文件，明文格式如下：
```xlsx
name1: password1
name2: password2
name3: password3
```
- 加密密码可以使用`crypt()`函数进行密码加密的格式，在`Linux`平台可以使用`htpasswd`命令生成，示例：
```xlsx
# htpasswd -c -d /nginx/conf/pass_file username
# 运行后输入密码即可
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





## Gzip压缩
- 在`Nginx`配置文件中可以配置`Gzip`的使用，相关指令可以在配置文件的http块、server块或者location块中设置，`Nginx`服务器通过`ngx_http_gzip_module
、ngx_http_gzip_static_module、ngx_http_gunzip_module`模块对这些指令进行解析和处理

### ngx_http_gzip_module
- `ngx_http_gzip_module`模块主要负责`Gzip`功能的开启和设置，对响应数据进行在线实时压缩，主要的指令有
1. `gzip` 该指令用于开启或者关闭`Gzip`功能，语法结构为：
```xlsx
gzip on | off; # 默认为off(不启用)
```

2. `gzip_buffers` 该指令用于设置`Gzip`压缩文件使用缓存空间的大小，语法结构为：
```xlsx
gzip_buffers number size;
```
- `number` 指定`Nginx`服务器需要向系统申请缓存空间的个数
- `size` 指定每个缓存空间的大小

3. `gzip_comp_level` 用于设定`Gzip`压缩程度，包括级别1到级别9，级别1表示压缩程度最低，压缩效率最高，级别9表示压缩程度最高，压缩效率最低，最费时间，语法结构为：
```xlsx
gzip_comp_level level;
```

4. `gizp_disable` 针对不同种类客户端发起的请求，可以选择性地开启和关闭`Gzip`功能，语法结构为：
```xlsx
gzip_disable regex ...;

# regex 根据客户端的浏览器标志(User-Agent, UA)进行设置，支持使用正则表达式，示例：
gzip_disable MSIE [4-6]\.; 
# 该设置使用了正则表达式，其可以匹配UC字符串中包含 MSIE4、MSIE5 和 MSIE6的所有浏览器，响应这些浏览器的请求时，不进行Gzip压缩
```

5. `gzip_http_version` 早期的浏览器或者HTTP客户端，可能不支持`Gzip`自解压，所以针对不同的HTTP协议版本，需要选择性的开启和关闭`Gzip`功能，语法结构为：
```xlsx
gzip_http_version 1.0 | 1.1;
```
- 默认设置为1.1版本，只有客户端使用1.1及以上版本的HTTP协议时，才使用`Gzip`功能对响应数据进行压缩，目前大多数浏览器都支持`Gzip`压缩

6. `gzip_min_length` Gzip压缩功能对大数据压缩效果明显，但是如果压缩很小的数据，可能出现越压缩数据量越大的情况，因此应该根据响应页面的大小，选择性地开启或者关闭`Gzip
`功能，该指令设置页面字数节，当响应页面的大小大于该值时，才启用`Gzip`功能，响应页面的大小通过HTTP响应头部中的`Content-Length`指令获取，但是如果使用了`Chunk`编码动态压缩，`Content-Length
`或不存在或被忽略，该指令不起作用，语法结构为：
```xlsx
gzip_min_length length;
```
- 默认值为20，设置为0时表示不管响应页面大小如何统统压缩，建议设置为`1KB`或以上，以防止出现数据越压越大的情况
```xlsx
gzip_min_length 1024;
```

7. `gzip_proxied` 在使用`Nginx`服务器的反向代理功能时有效，前提是在后端服务器返回的响应头部中，`Requests`部分包括用于通知代理服务器的`Via`头域，语法结构为：
```xlsx
gzip_proxied off | expired | no-cache | no-store | private | no_last_modified | no_etag | auth | any ...;
```
- `off` 关闭`Nginx`服务器对后端服务器返回结果的`Gzip`压缩，默认设置off
- `expired` 当后端服务器响应头部包含用于指示响应数据过期时间的`expired`头域时，启用对响应数据的`Gzip`压缩
- `no-cache` 当后端服务器响应头部包含用于通知所有缓存机制是否缓存的，`Cache-Control`头域、且指令值为`no-store`时，启用对数据的`Gzip`压缩
- `private` 当后端服务器响应头部包含用于通知所有缓存机制是否缓存的，`Cache-Control`头域、且指令值为`private`时，启用对数据的`Gzip`压缩
- `no_last_modified` 当后端服务器响应头部不包含用于指明需要获取数据最后修改时间的`Last-Modified`头域时，启用对数据的`Gzip`压缩
- `no_etag`当后端服务器响应头部不包含用于标示被请求变量的实体值的`ETag`头域时，启用对数据的`Gzip`压缩
- `auth`当后端服务器响应头部不包含用于标示HTTP授权证书的`Authorization`头域时，启用对数据的`Gzip`压缩
- `any` 无条件启用对后端服务器响应数据的`Gzip`压缩

<font color='red'><b>该指令需要对HTTP协议的HTTP Header消息有基本的了解，请看网络篇</b></font>

8. `gzip_types` Nginx服务器可以根据响应页的`MIME`类型选择性的开启`Gzip`压缩功能，该指令用来设置`MIME`类型，被设置的类型将被压缩，语法结构为：
```xlsx
gzip_types mime-type ...;
```
- `mime-type`变量的默认取值为`xlsx/html`，但实际上，在`gzip`指令设置为`on`时，Nginx服务器会对所有的`xlsx/html`类型页面数据进行`Gzip`压缩，还可以取值为`*`，表示对所有`MIME
`类型的页面数据进行`Gzip`压缩，一般的压缩常规的文件类型时，可以设置为：
```xlsx
gzip_types xlsx/plain application/x-javasctipt xlsx/css xlsx/html applicaiton/xml;
```

9. `gzip_vary`该指令用于设置在使用`Gzip`功能时是否发送带有`Vary: 
Accept-Encoding`头域的响应头部，该头域的主要功能是告诉接收方发送的数据经过了压缩处理，开启后的效果是在响应头部中添加了`Accept-Encoding: gzip`,
对于本身不支持Gzip压缩的客户端浏览器是有用的，语法结构为：
```xlsx
gzip_vary on | off; # 默认为 off，可以通过Nginx配置的add_header指令强制Nginx服务器在响应头部添加`Accept-Encoding: gzip`头域，达到相同的效果

add_header Vary Accept-Encoding gzip;
```
### ngx_http_gzip_static_module
- `ngx_http_gzip_static_module`模块主要负责搜索和发送经过`Gzip`功能预压缩的数据，这些数据以`
.gz`作为后缀名存储在服务器上，如果客户端请求的数据在之前被压缩过，并且客户端浏览器支持`Gzip`压缩，就直接接返回压缩过的数据
- 与该模块有关的指令有`gzip_static gzip_http_version gzip_proxied gzip_disable gzip_vary`等

1. `gzip_static` 用于开启和关闭该模块的功能，语法结构为：
```xlsx
gzip_static on | off | always;
```
- `on` 开启
- `off` 关闭
- `always` 一直发送`Gzip`预压缩文件，不检查客户端浏览器是否支持`Gzip`压缩

- 其它指令和`ngx_http_gzip_module`模块相同，但是`gzip_proxied`指令只支持以下设置：
```xlsx
gzip_proxied expired no-cache no-store private auth;
```
- 另外，对于该模块下的`gzip_vary`指令，开启以后只给未压缩的内容添加`Vary: Accept-Encoding`头域，而不是对所有内容添加，如果需要对所有内容都添加，可以通过配置`add_header`指令实现

### ngx_http_gunzip_module
- `ngx_http_gunzip_module`该模块用来针对不支持`Gzip`压缩数据处理的客户端浏览器，对压缩数据进行解压处理的，主要指令有：`gunzip gunzip_buffers gzip_http_version 
gzip_proxied gzip_disable gzip_vary`等

1. `gunzip`用于开启或关闭该模块的功能，语法结构为：
```xlsx
gunzip_static on | off;
```
- 默认设置为关闭功能，当功能开启时，如果客户端浏览器不支持Gzip处理，Nginx服务器将返回解压后的数据，如果客户端浏览器支持Gzip处理，Nginx服务器忽略该指令的设置，仍然返回压缩数据

2. `gunzip_buffers` 设置Nginx服务器解压Gzip文件使用缓存空间大小的，和`ngx_http_gzip_module`模块中的`gzip_buffers`指令类似，语法结构为：
```xlsx
gunzip_buffers number size;
```

### 压缩配置实例
```xlsx
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    gzip  on;                   # 开启 gzip 功能
    gzip_min_length 1024;       # 响应页数据上限
    gzip_buffers 4 16k;         # 缓存空间大小
    gzip_comp_level 2;          # 压缩级别为2
    gzip_types xlsx/plain application/x-javasctipt xlsx/css xlsx/html applicaiton/xml;  # 压缩源文件类型
    gzip_vary on;               # 启用压缩标识
    gunzip_static on;           # 检查预压缩文件

    server {
        listen       8090; #自定义端口
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /Users/liyahui/nginx;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
    }

}
```


## Nginx 服务器的Rewrite功能


## 正向代理

### resolver
`resolver`该指令用于指定DNS服务器的IP地址，语法结构为：
```xlsx
resolver address ... [valid=time];

一般只要将DNS服务器的IP地址设置给该指令即可
```
- `address` DNS服务器的IP地址，如果不指定端口号，默认使用53端口
- `time` 设置数据包在网络中的有效时间

### resolver_timeout
`resolver_timeout` 用于设置DNS服务器域名解析超时时间，语法结构为：
```xlsx
resolver_timeout time;
```

### proxy_pass
`proxy_pass` 用于设置代理服务器的协议和地址，不仅仅用于Nginx服务器的代理服务，主要应用于反向代理服务，语法结构为：
```xlsx
proxy_pass URL; # URL 为设置的代理服务器协议和地址
```
<font color='red'><b>上面这些指令原则上可以出现在Nginx配置文件的http块、server块和location块中，但一般是在搭建的Nginx服务器中单独配置一个server块用来设置代理服务</b></font>

### 实例
- 该指令的设置相对固定，在代理服务配置中，配置为：
```xlsx
server {
    resolver 8.8.8.8;
    listen 82;
    location / {
        # 代理服务器协议设置为 HTTP， $http_host 和 $request_uri 两个变量时Nginx配置支持的用于自动获取主机和URI的变量，一般不要改变该配置
        proxy_pass http://$http_host$request_uri;
    }
}
```
 

## 反向代理
### proxy_pass
- 该指令用来设置代理服务器的地址，可以是主机名称、IP地址加端口号等形式，语法结构为：
```xlsx
proxy_pass URL; # URL 为要设置的代理服务器的地址，包括传输协议、主机名称或IP地址加端口号、URI等要素

# 传输协议通常是`http` 或者 `https://` 还接受以 `unix` 开始的 UNIX-domain 套接字途径，例如：
proxy_pass http://www.baidu.com/uri;
proxy_pass http://localhost:8080/uri;
proxy_pass http://unix:/tmp/back.socket:/uri;
```

- 如果被代理服务器是一组服务器的话，可以使用`upstream`指令配置后端服务器组，例如：
```xlsx
upstream proxy_svrs {
    server http://192.168.0.1:8080/uri/;
    server http://192.168.0.2:8080/uri/;
    server http://192.168.0.3:8080/uri/;
}

server {
    listen 80;
    server_name www.myserver.name;
    location / {
        proxy_pass proxy_svrs;
    }
}

# 如果上面都指明了 协议：http:// 那么在下面 proxy_pass 指令中就不需要了，如：
upstream proxy_svrs {
    server 192.168.0.1:8080/uri/;
    server 192.168.0.2:8080/uri/;
    server 192.168.0.3:8080/uri/;
}

server {
    listen 80;
    server_name www.myserver.name;
    location / {
        proxy_pass http://proxy_svrs;
    }
}
```

### proxy_hide_header
- 用于设置`Nginx`服务器在发送HTTP响应时，隐藏一些头部信息，语法结构为：
```xlsx
proxy_hide_header field;
```
- `field`为需要隐藏的头域，该指令可以在http块、server块和location块中进行配置

### proxy_pass_header
- 默认情况下，`Nginx`服务器在发送响应报文时，报文头中不包含`Date、Server、X-Accel`等来自被代理服务器的头域信息，该指令可以设置这些头域信息以被发送，语法结构为：
```xlsx
proxy_pass_header field;
```
- `field`为需要发送的头域，该指令可以在http块、server块和location块中进行配置

### proxy_pass_request_body
- 该指令用于配置是否将客户端请求的请求体发送给代理服务器，语法结构为：
```xlsx
proxy_pass_request_body on | off; # 默认为 on
```
- 该指令可以在http块、server块和location块中进行配置

### proxy_pass_request_headers
- 该指令用于配置是否将客户端请求的请求头发送给代理服务器，语法结构为：
```xlsx
proxy_pass_request_headers on | off; # 默认为 on
```
- 该指令可以在http块、server块和location块中进行配置

### proxy_set_header
- 该指令可以更改`Nginx`服务器接收到的客户端请求的请求头信息，然后将新的请求头发送给被代理的服务器，语法结构为：
```xlsx
proxy_set_header field value;
```
- `field` 要更改的信息所在的头域
- `value` 更改的值，支持使用文本，变量或者变量的组合

- 默认为：
```xlsx
proxy_set_header Host $proxy_host;
proxy_set_header Connection close; 
```

### proxy_set_body
- 更改`Nginx`服务器接收到的客户端请求的请求体信息，然后将新的请求体发送给被代理的服务器，语法结构为：
```xlsx
proxy_set_body value; # value 为更改的信息，支持使用文本，变量或者变量的组合
```
### proxy_bind
- 配置将与代理主机的连接绑定到指定的IP地址，就是在配置了多个基于名称或者基于IP的主机的情况下，如果希望代理连接由指定的主机处理，就可以用该指令进行配置，语法结构为：
```xlsx
proxy_bind address; # address 为指定主机的IP地址
```

### proxy_connect_timeout
- 配置`Nginx`服务器与后端被代理服务器尝试建立连接的超时时间，语法结构为：
```xlsx
proxy_connect_timeout time; # 默认为 60s
```

### proxy_read_timeout
- 配置`Nginx`服务器项后端被代理服务器发出`read`请求后，等待响应的超时时间，语法结构为：
```xlsx
proxy_read_timeout time; # 默认为 60s
```

### proxy_send_timeout
- 配置`Nginx`服务器向后端被代理服务器发出`write`请求后，等待响应的超时时间，语法结构为：
```xlsx
proxy_send_timeout time; # 默认为 60s
```

### proxy_http_version
- 设置用于`Nginx`服务器提供代理服务的HTTP协议版本，语法结构为：
```xlsx
proxy_http_version 1.0 | 1.1; # 默认为 1.0版本， 1.1版本支持 upsteam 服务器组设置中的 keepalive 指令
```

### proxy_method
- 设置`Nginx`服务器请求被代理服务器时使用的请求方法，一般为 POST 或者 GET，如果设置了这个指令，客户端的请求方法将被忽略，语法结构为：
```xlsx
proxy_method method; # method 的值可以设置为 POST 或者 GET，注意不加引号
```

### proxy_ignore_client_abort
- 设置在客户端中断网络请求时，`Nginx`服务器是否终端对代理服务器的请求，语法结构为：
```xlsx
proxy_ignore_client_abort on | off; # 默认为 off
```

### proxy_ignore_headers
- 用于设置一下HTTP响应头中的头域，`Nginx`服务器接收到被代理服务器的响应数据后，不会处理被设置的头域，语法结构为：
```xlsx
proxy_ignore_headers field ...;
```
- `field`为要设置的HTTP响应头的头域，例如：`X-Accel-Redirect X-Accel-Expires Expires Cache-Control Set-Cookie`等

### proxy_redirect
- 用于修改被代理服务器返回的响应头中的`Location`头域和`Rerfresh`头域，与`proxy_pass`指令配置使用，可以把代理服务器返回的地址信息更改为需要的地址信息，语法结构为：
```xlsx
proxy_redirect redirect replacement;
proxy_redirect default;
proxy_redirect off;
```
- `redirect` 匹配`location`头域值的字符串，支持变量的使用和正则表达式
- `replacement` 用于替换`redirect`变量内容的字符串，支持变量的使用

### proxy_intercept_errors
- 用于配置一个状态是开启还是关闭，在开启该状态时，如果被代理的服务器返回的HTTP状态码为400或者大于400，则`Nginx`服务器使用自己定义的错误页，如果关闭该状态，`Nginx`直接将被代理服务器返回的HTTP
状态码返回给客户端，语法结构为：
```xlsx
proxy_intercept_errors on | off;
```

### proxy_headers_hash_max_size 
- 用于配置存放HTTP报文头的哈希表的容量，语法结构为：
```xlsx
proxy_headers_hash_max_size size; # 默认为 512
```

### proxy_headers_hash_buchet_size
- 用于设置`Nginx`服务器申请存放HTTP报文头的哈希表容量的单位大小，语法结构为：
```xlsx
proxy_headers_hash_buchet_size size; # 默认为 64 个字符
```

### proxy_next_upstream
- 在配置`Nginx`服务器反向代理功能时，如果使用了`upstream`指令配置了一组服务器作为被代理服务器，默认访问规则为轮询规则，在发生异常情况时，由该指令将请求顺次交由下一组内服务器处理，语法结构为：
```xlsx
proxy_next_upstream status ...; # status 为设置的服务器返回状态，可以是一个或者多个
```
- `error` 在建立连接、向被代理的服务器发送请求或者读取响应头时服务器发生连接错误
- `timeout`在建立连接，向北代理的服务器发送请求或者读取响应头时服务器发生连接超时
- `invalid_header` 被代理的服务器返回的响应头为空或者无效
- `http_500 http_502 http_503 http_504 http_404`，被代理的服务器返回500、502、503、504、404状态码
- `off`无法将请求发送给被代理的服务器

<font color='red'><b>注意：与被代理的服务器进行数据传输的过程中发送错误的请求，不包含在该指令支持的状态之内</b></font>

### proxy_ssl_session_reuse
- 用于配置是否使用基于SSL安全协议的会话连接(`https://`)被代理的服务器，语法结构为：
```xlsx
proxy_ssl_session_reuse on | off; # 默认为 on
```

<font color='red'><b>上面这些指令原则上可以出现在Nginx配置文件的http块、server块和location块中，但一般是在搭建的Nginx服务器中单独配置一个server块用来设置代理服务</b></font>

## 负载均衡


## Nginx缓存



## 服务器邮件服务



## 时间管理



## 内存管理


<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

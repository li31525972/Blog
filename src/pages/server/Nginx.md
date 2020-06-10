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

#### Mac中`Nginx`启停命令
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




## Nginx基本配置


### Nginx启停控制


### Nginx基础配置指令
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

### 配置运行Nginx服务器的用户(组)
```$xslt
user user [group];

所有用户都可以启动Nginx的两种方法
#user user [group];     1. 将此指令注释
user nobody nobody;     2. 将用户(和用户组)设置为nobody，这也是user指令的默认配置      
```
- `user` 指定可以运行Nginx服务器的用户
- `group` 可选项，指定可以运行Nginx服务器的用户组


### Nginx基础配置实例


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

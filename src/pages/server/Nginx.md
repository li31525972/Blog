# Nginx

## Nginx 安装部署
### 获取安装文件
#### 官方下载网址
```js
http://nginx.org/en/download.html
```
<img src="/nginx-download.png">

#### 目录结构
- `conf` 目录中存放的是`Nginx`服务器的配置文件，包含`Nginx`服务器的基本配置文件和对部分特性的配置文件
- `dosc` 目录中存放了`Nginx`服务器的文档资料，包含`Nginx`服务器的`LICENSE、OpenSSL`的`LICENSE、PCRE`的`LICENCE`以及`zlib`的`LICENSE`，还包括本版本`Nginx
`服务器升级的版本变更说明，以及`README`文档
- `html` 目录中存放了两个后缀名为`.html`的静态网页文件，这两个文件与`Nginx`服务器的运行相关
- `logs` 目录中存放了`Nginx`服务器的运行日志文件

### Linux安装方式
- 首先安装一款`Linux/UNIX`操作系统发行版，常见的有`Redhat、SUSE、Fedora、CentOS、Ubuntu、Solaris`以及`Debian`等，在一些`Linux`发行版和BSD的衍生版中自带了`Nginx
`软件的二进制文件，但由于`Nginx`软件升级频繁，这些编译好的二进制文件大都比较陈旧，建议直接从较新的源代码编译安装

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

### 安装Nginx和基本配置


### Nginx启停控制


### Nginx基础配置指令


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



## Nginx 应用实例

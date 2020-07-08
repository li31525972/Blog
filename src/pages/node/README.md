# node
[官网地址](http://nodejs.cn/api/)

## Mac OS 环境搭建
### 安装[Homebrew](https://brew.sh/)

<img src="/imgs/node01.png" />

### 安装`nodejs`
1. `brew install nodejs`
2. [node官网安装](https://nodejs.org/en/)

- 查看版本：`node -v`

### 安装`mongodb`
1. `brew install mongodb | sudo npm install mongodb -g`

- 查看版本：`mongo --version`
 
### 安装`redis`
1. `brew install redis | sudo npm install redis -g`

- 查看版本：`redis-cli --version`

## Windows 环境搭建
- 没用过，自行百度

## 工具软件安装

### nodemon 自动重启服务器
#### 安装
`sudo npm i nodemon -g`

#### 使用方式
`nodemon 文件名`

### cnpm

#### 安装
`sudo npm i cnpm -g`

#### 使用方式
`cnpm i 包名`

### nrm 一次性设置多个镜像网站地址
```shell
# 安装
sudo npm i nrm -g

# 查看已存在的镜像网站地址
nrm ls

# 切换默认使用的源
nrm use [name]
```


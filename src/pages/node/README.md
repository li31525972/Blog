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
- 看上面官网，安装Windows版

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

## Node中的模块化

### exports
```js
// a.js
exports.name = '小明'
exports.age = 18

// b.js
const a = reuqire('./a.js')
console.log(a) // { name: '小明', age: 18 }
```

### module.exports
```js
// a.js
const name = '小明'
const age = 18

module.exports = {
    name,
    age
}

// b.js
const a = require('./a.js')
console.log(a) // { name: '小明', age: 18 }
```

## 第三方包文件规范
- `bin` 二进制文件存放目录
- `lib` 核心库文件存放目录，编写的js模块文件
- `doc` 相关文档存放目录，例如使用说明文档
- `test` 测试文件存放目录，`demo`文件
- `package.json` 包描述文件
```xlsx
    name: 包名
    version： 版本号
    main: 入口文件地址
    dependencies: 依赖关系
```















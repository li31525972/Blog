# webpack
## webpack的简介概念

### webpack的特点
- 优点
---
1. 专注于处理模块化的项目，能做到开箱即用，一步到位
2. 可通过 `Plugin` 扩展，完整好用又不失灵活
3. 使用场景不局限于 `web` 开发
4. 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展
5. 良好的开发体验

- 缺点
---
1. 只能用于才用模块化开发的项目


## 安装 webpack
### 安装到项目
```markdown
// npm i 是 npm install 的简写
// -D 是 --save-dev 的简写

npm i webpack -D  安装最新稳定版 
npm i webpack@<version> -D  安装指定版本
npm i webpack@bate -D  安装最新的体验版

在项目根目录下对应的命令行里通过 `node_modules/.bin/webpack` 运行 webpack 的可执行文件

```

### 安装到全局
```markdown
npm i webpack -g 
```

### 使用webpack
```js
// webpack 在执行构建的时候默认会从项目根目录下的 webpack.config.js 文件中读取配置, 需要新建

const path = require('path')

module.exports = {
    
}
```


## Entry 入口
- 配置模块的入口, 必填
### context
- `webpack` 在寻找相对路径的文件时会以 `context` 为根目录， `context` 默认为执行启动 `webpack` 时所在的当前目录， 如果想要改变 `context` 的默认配置，可以在配置文件配置：
```js
module.exports = {
    context: path.resolve(__dirname, 'main')
}
// 注意：context 必须是一个绝对路径的字符串
// 还可以通过在启动webpack时带上参数 webpack --context 来设置context
```

### Entry类型
|   类型  |               例子                  |               含义              |
|   ---   |             ------                  |                ---            |
| string  |  './app/entry'                      |   入口模块的文件路径， 可以是相对路径  |
| array   |   ['./app/entry1', './app/entry2']  |   入口模块的文件路径， 可以是相对路径  |
| object  |  { a: './app/entry1', b: './app/entry2' } | 配置多个入口，每个入口生成一个Chunk  |

<font color='red'>如果是array类型，则搭配output.library配置项使用时，只有数组里的最后一个入口文件的模块会被导出</font>

### Chunk(代码块)的名称
#### `webpack` 会为每个生成的 `Chunk` 取一个名称，`Chunk` 的名称和 `Entry` 的配置有关
- 如果 `entry` 是一个 `string` 或 `array`，那么就之后生成一个 `Chunk`, 名称是 `main`
- 如果 `entry` 是一个 `Object`，会出现多个 `Chunk`， 名称是 `Object` 键值对中键的名称



### 动态Entry
- 如果项目里有多个页面需要为每个页面的入口配置一个`entry`， 但这些页面的数量可能不断增长，则这时的 `entry` 的配置受到其他因素的影响，导致不能写成静态的值，可以将 `entry` 设置成一个函数
```js
// 同步函数
entry: () => {
    return {
        a: './app/entry1',
        b: './app/entry2'
    }
}

// 异步函数
entry: () => {
    return new Promise(resolve => {
        resolve({
            a: './app/entry1',
            b: './app/entry2'
        })
    })
}
```

## Output 输出结果
- 配置如何输出最终想要的代码, `output` 是一个 `Object`， 里面包含一系列的配置项
### filename 
- 输出文件的名称，`string` 类型， 如果只有一个输出文件，可以写成静态的不变的
```js
output: {
    filename: 'bundle.js'
}
```
- 但是有多个`Chunk`要输出时，就需要借助模板和变量了，前面讲到，`webpack` 会为每个`Chunk`取一个名称，所以我们可以根据`Chunk`的名称来区分输出的文件名：
```js
filename: '[name].js'

// 代码里的name代表用内置的name变量去替换[name],可以将它看作一个字符串模块函数，每个要输出
// 的Chunk会通过这个函数去拼接出输出的文件名称
```
- 内置变量除了`name`，还包括：
---
|   变量名     |             含义                |
|   :---:       |           :------:                 |
|   id        |     Chunk的唯一标识，从0开始         |
|   name       |    Chunk的名称                |
|   hash       |    Chunk的唯一标识的Hash值        |
|   chunkhash  |    Chunk内容的Hash值           |
<font color='red'><b>`hash` 和 `chunkhash` 的长度是可指定的，`[hash:8]`代表8位`Hash`值， 默认20位</b></font>

### chunkFilename

### path

### pubicPath

### crossOriginLoading

### libraryTarget

### library

### libraryExport

## Module 模块
- 配置处理模块的规则
### 配置Loader

### noParse

### parser

## Resolve
- 配置寻找模块的规则
### alias

### mainFields

### extensions

### modules

### descriptionFiles

### enforceExtension

### enforceModuleExtension

## plugin 扩展插件
- 配置扩展插件

## DevServer
### hot

### inline

### historyApiFallback

### contentBase

### headers

### host

### port

### allowedHosts

### disableHostCheck

### https

### clientLogLevel

### compress

### open

## 其它配置项
### Target

### Devtool

### Watch

### WatchOptions

### Externals

### ResolveLoader

## 整体配置结构

## 多种配置类型

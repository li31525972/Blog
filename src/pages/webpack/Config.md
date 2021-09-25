# 文档
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

// webpack 4+
npm install webpack webpack-cli --save-dev
```
### 安装到全局
```markdown
npm i webpack -g 

最新插件
npm i webpack-cli -g

```

### 使用webpack
```js
// webpack 在执行构建的时候默认会从项目根目录下的 webpack.config.js 文件中读取配置, 需要新建

const path = require('path')

module.exports = {
    
}
```
## webpack 打包
### 文件执行
```
在项目根目录下对应的命令行里通过 `node_modules/.bin/webpack` 运行 webpack 的可执行文件
```

### 命令执行
- 在`Npm Script`里定义的任务会优先使用本项目下的`webpack`
```
    "scripts": {
        "dev": "webpack --config webpack.config.js",
    },
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
### 内置变量
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
- 无入口的 `Chunk` 在输出时的文件名称，支持和 `filename` 一样的内置变量

### path
- 配置输出文件存放在本地的目录，必须是 `string` 类型的绝对路径，通常使用 `Node.js` 的 `path` 模块使用：
```js
path: path.resolve(__dirname, 'dist')
```

### pubicPath
- 配置发布到线上资源的 `URL` 前缀，`string` 类型，默认 ''， 使用相对路径
- 内置变量只有一个 `hash`
```js
publicPath: 'https:// cdn.xxx.com/xxx'
```
```html
<!--引入js文件时-->
<script src="https:// cdn.xxx.com/xxx/a.js"></script>
```

### crossOriginLoading
- `webpack` 输出的代码块可能需要异步加载，通过`JSONP` 方式实现(动态插入一个`script`标签)，`crossOriginLoading` 用于配置这个异步插入标签的 `crossorigin` 值，取值：
1. `anonymous` 默认，在加载此脚本资源时不会带上用户的 `Cookies`
2. `use-credentials` 加载此脚本资源的时候会带上用户的 `Cookies`

### library 和 libraryTarget
- 当用 `webpack` 构建一个可以被其它模块导入使用的库时，需要用到 `library` 和 `libraryTarget`
#### `library` 配置导出库的名称
#### `libraryTarget` 配置以何种方式导出库， 字符串枚举类型，支持以下配置：
1. `var` 编写的库通过 `var` 赋值给通过 `library` 指定名称的变量，假如配置了 `output.library='LibraryName'`, 使用和输出如下：
```js
// webpack输出
var LibraryName = 'lb_code'

// 使用的方法
LibraryName.doSomething()

// 如果 output.library 为空，直接输出 lib_code, lib_code是指导出库的代码内容，有返回值的一个自执行函数
```
2. `commonjs` 编写的库通过 `CommonJS` 规范导出
```js
// 假如配置了 output.library = 'LibraryName', 则输出和使用代码如下：

// webpack输出
exports['LibraryName'] = lib_code

// 使用方法
require('library-name-in-npm')['LibraryName'].doSomething()
// library-name-in-npm 指模块发布到npm仓库时的名称
```
3. `commonjs2` 编写的库通过 `CommonJS2` 规范导出
```js
// webpack输出
module.exports = lib_code

// 使用方法
require('library-name-in-name').doSomething()

// commonjs 和 commonjs2 差别在于 commonjs 只能用 exports 导出，而commonjs2 可以用 module.exports
// 注意 使用 commonjs2 时， 配置 output.library 将没有意义
```
4. `this` 通过 `this` 被赋值给通过 `library` 指定的名称
```js
// webpack 输出
this['LibraryName'] = lib_code

// 使用方法
this.LibraryName.doSomething()
```
5. `window` 通过`window` 赋值给通过 `library` 指定的名称
```js
// webpack输出
window['LibraryName'] = lib_code

// 使用方法
window.LibraryName.doSomething()
```
6. `global` 通过 `global` 赋值给通过 `library` 指定的名称
```js
// webpack 输出
global['LibraryName'] = lib_code

// 使用方法
global.LibraryName.doSomething()
```


### libraryExport
- 重点：配置要导出的模块中哪些子模块需要被导出，只有在 `output.libraryTarget` 设置为 `commonjs` 或 `commonjs2` 时才行
```js
// 要导出的模块代码
export const a = 1
export default b = 2

// 如果只想导出其中的a, 那么 output.libraryTarget 设置为 a
// webpack输出
module.exports = lib_code['a']

// 使用方法
require('library-name-in-npm') === 1
```

## Module 模块
- 配置处理模块的规则
### rules
#### 配置模块的读取和解析规则，类型是一个数组，通常用来配置 `loader`， 配置一项 `rules` 可大致通过以下方式完成：
- 条件匹配：通过`test、include、exclude`三个配置项选中`loader`要应用规则的文件
- 应用规则：对选中文件通过`use`配置项来应用`loader`，可以只用一个`loader`或者按照<font color='red'><b>从后往前</b></font>的顺序应用一组`loader`，同时可以分别向`loader`传入参数
- 重置顺序：一组`loader`的执行顺序默认是从右到左执行的，通过`enforce`选项可以将其中一个`loader`的执行顺序放到最前或者最后
```js
module: {
    rules: [
            {
                test: /\.js/, // 应用的文件
                /*
                * babel-loader 表示 用 babel-loader 转换 js 文件
                * cacheDirectory表示传给 babel-loader 的参数，用于缓存babel的编译结果，加快重新编译的速度
                * */
                use: ['babel-loader?cacheDirectory'],
                // 只命中src目录的js文件，加快webpack的搜索速度
                include: path.resolve(__dirname, 'src'),
            },
            {
                test: /\.scss$/,
                // 按顺序处理， 默认从后向前
                use: ['style-loader', 'css-loader', 'sass-loader'],
                // 排除 node_modules 目录下的文件
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                // 非文本文件 使用 file-loader 加载
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: ['file-loader']
            }
    ]
}
```

### Loader

#### 配置loader
- 配置如何处理文件，看上面例子
```js
// 多个参数的loader，可以通过一个Object来描述
use: [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
            },
            // post 的含义是该loader的执行顺序放在最后，值还可以是 pre 放在最前面
            enforce: 'post',
        }
]

// text、include、exclude 也支持数组类型：
use: [
        {
            test: [
                    /\.jsx?$/,
                    /\.tsx?$/
            ],
            include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'test'),
            ],
            exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'bower_modules'),
            ]
        }
]
```

#### 常用loader
|   名称              |      描述      |
|   ---             |       ---         |
|   babel-loader    |       转换ES6、ES7等js新特性语法       |
|   css-loader      |       支持.css文件的加载和解析          |
|   less-loader     |       将less文件转换为css               |
|   ts-loader       |       将ts转换为js                    |
|   file-loader     |       进行图片、字体等的打包             |
|   raw-loader      |       将文件以字符串的形式导入            |
|   thread-loader   |       多进程打包js和css                 |


### noParse
- 让`webpack`忽略对部分没有采用模块化的文件的递归解析和处理
- 可配置选项，类型：`RegExp、[RegExp]、function`
```js
// 正则表达式
noParse: /jquery|chartjs/

// 函数：webpack 3.0 支持
noParse: content => {
    return /jquery|chartjs/.test(content)
}
```
<font color='red'><b>注意：被忽略的文件中不应该包含`import、require、define`等模块化语句，否则会导致在构建出的代码中包含在浏览器环境下执行的模块化语句</b></font>

### parser
- `webpack`是以模块化的js文件为入口，内置对模块化js的解析功能，支持`AMD、CommonJS、SystemJS、ES6`
- 和`noParse`相比，更细粒度的配置文件中的那些解析，那些不解析
```js
module: {
    rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                parser: {
                    amd: false, // 禁用 AMD
                    commonjs: false, // 禁用 CommonJS
                    system: false, // 禁用 SystemJS
                    harmony: false, // 禁用 ES6 的 import、export
                    requireInclude: false, // 禁用 require.include
                    requireEnsure: false, // 禁用 require.ensure
                    requireContext: false, // 禁用 require.context
                    browserify: false, // 禁用 browserify
                    requireJs: false, // 禁用 requirejs
                }
            }
    ]
}
```

## Resolve
- 配置寻找模块的规则
### alias
- 配置项通过别名将原导入路径映射成一个新的导入路径
```js
// 基本使用
resolve: {
    alias: {
        components: './src/components/'
    }
}

// 还支持通过 $ 符合来缩小范围到只命中以关键字结尾的导入语句：
resolve: {
    alias: {
        react$: '/path/to/react/min.js'
    }
}
```

### mainFields
- 有一些第三方模块会针对不同的环境提供几份代码，例如分别采用了`es5、es6`的两份代码，这两份代码的位置都写在`package.json` 文件里，代码如下：
```json
{
    "jsnext: main": "es/index.js", // 采用 ES6 语法的代码入口文件
    "main": "lib/index.js", // 采用 ES5 语法的代码入口文件
}
```
- `webpack` 会根据 `mainFields` 的配置去决定优先采用哪份代码
```js
// 默认如下：
mainFields: ['browser', 'main']
// webpack 会按照数组里的顺序在 package.json 文件里寻找，只会使用找到的第一个文件
// 如果想采用 ES6 那份，这样配置：
mainFields: ['jsnext:main', 'browser', 'main']
```

### extensions 配置后缀列表
- 在导入语句没带文件后缀时，`webpack`会自动带上后缀去尝试访问文件是否存在，`extensions` 用于配置在尝试过程中用到的后缀列表
```js
// 默认：
extensions: ['.js', '.json']

// 如果想优先使用 TypeScript 文件
extensions: ['.ts', '.js', '.json']
```

### modules
- 配置`webpack`去哪些目录下寻找第三方模块，默认只会去`node_modules`目录下寻找，有时项目中会有一些模块被其它模块大量依赖和导入，由于其它模块位置不定，需要计算路径，需要用到，比如哪些别大量导入的文件都在`./src/components`目录下：
```js
resolve: {
    modules: ['./src/components', 'node_modules']
}
// 然后就可以通过 import 'xxx' 导入了
```

### descriptionFiles
- 配置描述第三方模块的文件名称，就是`package.json`文件
```js
// 默认如下：
descriptionFiles: ['package.json']
```

### enforceExtension
- 导入语句是否带文件后缀名，默认 `false`，如果为 `true`：
```js
import './main.js' // 必须带上文件后缀名
```


### enforceModuleExtension
- 和 `enforceExtension` 作用类似，但是只对`node_modules`下的模块生效，一般搭配 `enforceExtension`使用，在`enforceExtension：true`时，因为安装的第三方模块中大多数导入语句都没有带文件的后缀，所以这时配置为 `false` 兼容第三方模块
```js
enforceModuleExtension: false
```

## plugin 扩展插件
- 配置扩展插件,接收一个数组，数组里每一项都是一个要使用的 `plugin` 的实例，`Plugin`需要的参数通过构造函数传入
```js
const CommonPlugin = require('./xxx')

module.exports = {
    plugins: [
            new CommonPlugin({
                name: 'xxx',
                chunks: ['a', 'b']
            })
    ]
}
// 使用plugins的难点在于掌握Plugin本身提供的配置项，而不是如何在webpack中接入plugin
```

### 常用的plugins
|       名称          |           描述              |
|       ---           |         ---                 |
|   CommonsChunkPlugin  |       将chunks相同的模块代码提取成公共js       |
|   CleanWebpackPlugin  |       清理构建目录          |
|   ExtractTextWebpackPlugin    |       将css从js文件里提取成一个独立的css文件     |
|   CopyWebpackPlugin           |       将文件或者文件夹拷贝到构建的输出目录          |
|   HtmlWebpackPlugin           |       动态创建html文件              |
|   UglifyjsWebpackPlugin       |       压缩js                        |
|   ZipWebpackPlugin            |       将打包的资源压缩为一个zip包         |


## 文件指纹
### hash
- 和整个项目的构建有关，只要项目文件有修改，整个项目构建的hash值就会更改

### Chunkhash
- 和webpack打包的chunk有关，不同的entry会生成不同的 chunkhash 值

### Contenthash
- 根据文件内容定义hash，文件内容不变，则 contenthash 不变

## DevServer
```
需要安装
npm i webpack-dev-server -D
```
### hot
- 默认情况下发现代码更新后通过自动刷新整个页面来实现实时预览，开启模块热替换功能后，将不再刷新整个页面的情况下通过新模块替换旧模块来做的实时预览
```js
devServer: {
    hot: true
}
```

### inline
- 配置自动刷新策略
1. `true` 在构建变化后的代码时通过代理客户端控制网页刷新
2. `false` 通过 `iframe`的方式运行要开发的网页，在构建变化后的代码时，通过刷新`iframe`来实现实时预览

### historyApiFallback
- 配置用了`HTML5 History API`的单页应用，这类单页应用要求服务器在针对任何路由都返回一个 `HTML` 文件，如：`http:xxx/user` 和 `http:xxx/home` 都返回 `index.html` 文件，浏览器端的`JavaScript`代码会从`URL`里解析出当前页面的状态，显示对应的页面
```js
// 这会导致任何请求都返回 index.html 文件，只能用于只有一个HTML文件的应用
historyApiFallback: true,

// 如果由多个单页应用组成，则需要根据不同的请求返回不同的HTML文件：
historyApiFallback: {
    rewrites: [
            // user 开头返回user.html
            { from: /^\/user/, to: '/user.html' },
            // game 开头返回 game.html
            { from: /^\/game/, to: '/game.html' },
            // 其它返回 index.html
            { from: /./, to: '/index.html' },
    ]
}
```

### contentBase
- 配置 `DevServer HTTP` 服务器的文件根目录， 默认情况下为当前的执行目录，通常为项目根目录，如果想把项目根目录下的`public`目录设置成`DecServer`服务器的文件根目录：
```js
devServer: {
    contentBase: path.join(__dirname, 'public')
}
```

### headers
- 配置在`HTTP`响应中注入一些`HTTP`响应头
```js
devServer: {
    headers: {
        'x-foo': 'bar'
    }
}
```

### host
- 配置服务监听地址
```js
// 默认值：
devServer: {
    host: 127.0.0.1
}
```

### port
- 配置服务监听端口
```js
// 默认值：
devServer: {
    port: 8080, // 8080被占用，就使用8081，8081被占用，就使用8082，以此类推
}
```

### allowedHosts
- 配置白名单列表，只有`HTTP`请求的`HOST`在列表里才正常返回
```js
devServer: {
    allowedHosts: [
            'host.com',
            'sub.host.com',
            '.host2.com', // host2.com 和 所有的子域名 *.host2.com 都将匹配
    ]
}
```

### disableHostCheck
- 配置是否关闭用于`DNS`重新绑定的`HTTP`请求的`HOST`检测，默认只接收来自本地的请求，关闭后可接收来自任意的`HOST`请求

### https
- 默认使用`HTTP`服务，可以使用`HTTPS`服务
```js
devServer: {
    https: true, // 切换成HTTPS服务，自动生成一份证书
}

// 如果想用自己的证书：
devServer: {
    https: {
        key: fs.readFileSync('path/to/server.key'),
        cert: fs.readFileSync('path/to/server.crt'),
        ca: fs.readFileSync('path/to/server.ca.pem'),
    }
}
```

### clientLogLevel
- 配置客户端的日志等级，(影响我们在浏览器开发者工具控制台看到的日志内容)，枚举类型，取值：`none、error、warning、info`，默认 `info` 输出所有类型的日志，设置为`none`不输出任何日志

### compress
- 是否启用`Gzip`压缩，`Boolean`类型，默认`false`

### open
- 第一次构建完成的时候是否自动打开浏览器，`Boolean`类型，默认`false`

## 其它配置项
### Target
 让`webpack`构建出针对不同运行环境的代码，取值如下：
|       target值         |               描述              |
|       :---:            |              :---:             |
|       web             |   针对浏览器(默认)，所有代码都集中在一个文件里     |
|       node            |   针对Node.js, 使用require语句加载Chunk代码     |
|       async-node      |   针对Node.js, 异步加载Chunk代码                |
|       webworker       |   针对WebWorker                                |
|       electron-main   |   针对Electron 主线程                           |
|       electron-renderer|  针对Electron 渲染进程                         |
例如：在设置`target: 'node'`时，在源代码中导入`node.js`原生模块的语句`require('fs')`将会被保留，`fs`模块的内容不会被打包到`Chunk`里

### Devtool
- 配置如何生成`Source Map` 默认`false`，即不生成`Source Map`， 如果想生成：
```js
module.exports = {
    devtool: 'source-map'
}
```

### Watch
- `webpack`的监听模式支持监听文件更新，在文件发生变化时重新编译，在使用`webpack`时，监听模式默认是关闭的，如果想打开：
```js
module.exports = {
    watch: true
}
// 使用 DevServer 时， 默认是开启的
```

### WatchOptions
- 监听模式配置项
```js
module.exports = {
    watch: true, // 只有开启监听，监听配置项才有意义
    watchOptions: {
        // 不监听的文件或文件夹，支持正则匹配，默认为空
        ignored: /node_modules/,
        // 监听到变化后等300ms再去执行，放置重新编译频率太高，默认300ms
        aggregateTimeout: 300,
        // 判断文件是否变化是通过不停的询问系统指定文件有没有变化实现的，默认每秒询问1000次 
        poll: 1000,
    }
}
```

### Externals
- 配置那些文件不用被打包，`webpack`在打包时可以忽略它们，看下面案例：
```js
// 比如在使用了jQuery
import $ from 'jquery'

module.exports = {
    externals: {
        // 将导入语句里的 jquery 替换成 运行环境里的全局变量 jQuery
        jquery: 'jQuery'
    }
}
```

### ResolveLoader
- 配置如何寻找`loader`
```js
// 默认如下：
module.exports = {
    resolveLoader: {
        modules: ['node_modules'], // 去哪个目录下寻找loader
        extensions: ['.js', '.json'], // 入口文件的后缀
        mainFields: ['loader', 'main'], // 指明入口文件位置的字段
    }
}
```

## 整体配置结构

## 多种配置类型






<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

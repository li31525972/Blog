# 使用案例
- 案例使用`webpack`版本：`^5.53.0`
- 案例使用`webpack-cli`版本：`^4.8.0`

## 入口
### 单入口
```javascript
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```

### 多入口
```javascript
const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```

## loader
### 解析js
- 安装`babel-loader`
```
npm install @babel/core @babel/preset-env babel-loader -D
```
- 使用：项目根目录创建`.babelrc`文件
```babelrc
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
- `webpack.config.js`添加loader
```
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /.js$/, use: "babel-loader" }
        ]
    }
}
```
### 解析`react`语法
- 安装
```
yarn add @babel/preset-react -D
```
- 使用: `.babelrc`文件添加`@babel/preset-react`
```babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```
- `webpack.config.js`添加loader
```
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /.js$/, use: "babel-loader" }
        ]
    }
}
```

### 解析css
- 安装`style-loader css-loader`
```
yarn add style-loader css-loader -D
```
- `webpack.config.js`添加loader
```
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /.js$/, use: "babel-loader" },
            // loader 是从右向左依次执行
            { test: /.css$/, use: ['style-loader', 'css-loader'] }
        ]
    }
}
```
### 解析less
- 安装`style-loader css-loader less less-loader`
```
yarn add style-loader css-loader less less-loader -D
```
- `webpack.config.js`添加loader
```
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /.js$/, use: "babel-loader" },
            // loader 是从右向左依次执行
            { test: /.css$/, use: ['style-loader', 'css-loader'] },
            { test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
        ]
    }
}
```

### 解析文件、图片、字体
#### file-loader
- 安装`file-loader`
```
yarn add file-loader -D
```
- `webpack.config.js`添加loader
```
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            // 解析图片
            { test: /.(png|jpg|jpeg|gif)$/, use: 'file-loader' },
            // 解析字体
            { test: /.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' }
        ]
    }
}
```

#### url-loader
- 可以将一些小文件图片进行base64转换
- 安装`url-loader`
```
yarn add url-loader -D
```
- `webpack.config.js`添加loader
```
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
            test: /.(png|jpg|jpeg|gif)$/, 
            use: [
                {
                    loader: 'url-loader',
                    // 将小于10240字节(10KB)的图片进行base64转换
                    options: {
                        limit: 10240
                    }
                }
            ]
            },
        ]
    }
}
```

## 文件监听
### 添加启动参数
```json
{
  "scripts": {
    "watch": "webpack --watch"
  }
}
```
### 配置文件开启
```javascript
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    watch: true
}
```

## 热更新
```json
{
  "scripts": {
    "dev": "webpack serve --open"
  }
}
```
- `webpack.config.js`安装`html-webpack-plugin`
```javascript
"use strict";
const path = require('path')
// 1. 引入 webpack html-webpack-plugin
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        // 2. 使用 HtmlWebpackPlugin  webpack.HotModuleReplacementPlugin
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    // 3. devServer hot:true
    devServer: {
        hot: true
    }
}
```

## 文件指纹
- `hash`和整个项目的构建有关，只要项目文件有修改，整个项目构建的hash值就会更改
- `Chunkhash`和webpack打包的chunk有关，不同的entry会生成不同的 chunkhash 值
- `Contenthash`根据文件内容定义hash，文件内容不变，则 contenthash 不变

- 添加指纹只在生产环境去看
```json
{
  "scripts": {
    "dev": "webpack serve --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```
- `webpack.prod.js`
```javascript
"use strict";
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {test: /.js$/, use: "babel-loader"},
            // loader 是从右向左依次执行
            /**
             * style-loader 是将css注入到style中
             * MiniCssExtractPlugin 是将css提取出来
             * MiniCssExtractPlugin和style-loader会冲突
             */
            {test: /.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']},
            {test: /.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']},
            {
                test: /.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // [ext] 文件后缀
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin()
    ]
}
```
## 文件压缩
### html
- 安装`html-webpack-plugin`
```
yarn add html-webpack-plugin -D
```
```javascript
"use strict";
const path = require('path')
// html-webpack-plugin 支持文件压缩
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "index.html"
        })
    ]
}
```
### css
- 安装`optimize-css-assets-webpack-plugin`(当前已被弃用)
```
yarn add optimize-css-assets-webpack-plugin
```
- `webpack.prod.js`
```javascript
"use strict";
const path = require('path')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin()
    ]
}
```
### js
- `webpack.prod.js`中`mdoe`定义为`production`会自动开启`js`压缩

## 自动清理构建目录
- 安装`clean-webpack-plugin`
```
yarn add clean-webpack-plugin -D
```
- `webpack.config.js`
```javascript
"use strict";
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```

## css3自动补全
- 安装`postcss-loader autoprefixer`
- [autoprefixer npm地址](https://www.npmjs.com/package/autoprefixer)
```
yarn add postcss-loader autoprefixer -D
```

1. `webpack.prod.js`
```javascript
"use strict";
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            // 添加 postcss-loader
            {
                test: /.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}
```
2. 添加`postcss.config.js`
```javascript
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```
3. 添加`.browserslistrc`文件
- [Browserslist github地址](https://github.com/browserslist/browserslist)
```
# default Browserslist 的默认浏览器
defaults
# 全球使用统计选择的浏览器版本
> 1%
# 每个浏览器的最后 2 个版本
last 2 versions
```

## px转rem
### `px2rem-loader`
- 安装`px2rem-loader lib-flexible`
```
yarn add px2rem-loader -D
yarn add lib-flexible -S
```
- `webpack.config.js`
```javascript
"use strict";
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader', {
                    loader: "px2rem-loader",
                    options: {
                        // 1rem大小 相当于设计稿
                        remUnit: 37.5,
                        // rem后多少位小数点
                        remPrecision: 8
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ]
}
```
- 入口文件`index.js`引入`lib-flexible`
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import 'lib-flexible'
import './styles/index.less'
import logo from './static/images/logo.jpeg'

class App extends React.Component {

    render() {
        return (
            <div className='red'>
                测试react热更新
                <img src={logo} alt=""/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 多页面应用打包方案
- 安装`glob`
```
yarn add glob -D
```
- `webpack.config.js`
```javascript
"use strict";
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const glob = require('glob')

const setMap = () => {
    const entry = {}
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'))

    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/pages\/(.*)\/index\.js/)
        const pageName = match && match[1]

        entry[pageName] = entryFile
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: `src/pages/${pageName}/index.html`,
            filename: `${pageName}.html`,
            chunks: [pageName]
        }))
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMap()
module.exports = {
    mode: 'production',
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    plugins: [
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
}
```

## 开启sourcemap
```javascript
"use strict";
const path = require('path')
module.exports = {
    mode: 'production',
    entry: 'src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    devtool: 'source-map'
}
```
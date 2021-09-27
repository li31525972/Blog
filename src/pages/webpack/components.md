# 打包组件
## 简单示例
1. 安装`webpack webpack-cli`
```
yarn add webpack webpack-cli -D
```
2. `webpack.config.js`
```javascript
'use strict'
// webpack v5+ 以上内置 terser-webpack-plugin 否则需手动安装
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: {
        // 非压缩版
        'add-number': './src/index.js',
        // 压缩版
        'add-number.min': './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: {
            // 库的名称
            name: 'addNumber',
            // 库的使用方式
            type: 'umd',
            // 指定哪一个导出应该被暴漏为一个库
            export: 'default'
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                // include 匹配参与压缩的文件
                include: /\.min\.js$/ig,
            })
        ]
    }
}
```
3. 到`./src/index.js`写该库的功能
```javascript
export default function add(a, b) {
    return a + b
}
```
4. `package.json`
```json
{
  "name": "webpack-components",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "terser-webpack-plugin": "^5.2.4",
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0"
  }
}
```
5. 添加对`package.json`中的定义的入口`main`对应的`index.js`文件
```javascript
// 当用户在不同的环境下使用不同的代码
if (process.env.NODE_ENV == 'production') {
    module.exports = require('./dist/add-number.min.js')
} else {
    module.exports = require('./dist/add-number.js')
}
```
6. 现在就可以`npm publish`发布到`npm`上面了(前提：你要有npm账号)






<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>
# Express

## 安装`express`
- `cnpm i express`

## 快速搭建模板

### express-generator
1. 安装`express-generator`
- `sudo npm install express-generator -g`

2. 创建模板
- `express 项目名称`

## 路由

### path
```js
const express = require('express') // 导入 express

const app = express()

app.get('/', (req, res) => {
    res.end('hello')
})

app.listen(8088, () => {
    
})
```

### Router
```js
const express = require('express') // 导入 express
const app = express()
const Router = express.Router()

Router.get('/', (req, res) => {
    res.end('hello')
})
app.use('/post', Router)
```


### route
```js
const express = require('express') // 导入 express

const app = express()

// RESTFUL api 设计方式
app.route('/article')
    .get((req, res) => {
        res.end('hello')
    })
    .post((req, res) => {
        res.end('hello')
    })
```

### 路由参数


## 中间件



<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

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
    res.send('hello')
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
    res.send('hello')
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
        res.send('hello')
    })
    .post((req, res) => {
        res.send('hello')
    })
```

### 路由模块拆分
```js
// index.js
const express = require('express')

const app = express()

const router = require('./router.js')
app.use(router)

app.listen(8088, (req, res) => {
    
})


// router.js
const express = require('express')
// 创建路由对象
const router = express.Router()

router.get('/index', (req, res) => {
    
})

router.post('/list', (req, res) => {
    
})

module.exports = router
```

### 路由参数
#### query
- 接收get请求参数
```js
const express = require('express')

const app = express()

app.get('/getInfo', (req, res) => {
    console.log(req.query);
})

app.get('/list/:id/:name', (req, res) => {
    console.log(req.params.id);
    console.log(req.params.name);
})

app.listen(8080, (req, res) => {
    
})
```


#### body-parser
- 用于接收`post`方式传递的表单数据
#### 安装
```xlsx
cnpm i body-parser -S
```

#### 使用
```js
// 加载 body-parser 模块
const bodyParser = require('body-parser')

// 注册为中间件 注册成功之后post表单提交的数据就会挂载到 req.body 对象上
app.use(bodyParser.urlencoded({ extended: false }))
```



## 中间件

## mysql
- 安装 `cnpm i mysql -S`

```js
// 加载 mysql 模块
const mysql = require('mysql')

// 创建 mysql 链接对象
const conn = mysql.createConnection({
    host: '127.0.0.1', // IP地址
    user: 'root', // 用户名
    password: '123456', // 密码
    database: 'aaaa', // 数据库名称
    port: 3306, // 端口号，如果mysql使用默认的3306可以不用设置该项
})

// 链接mysql服务器
conn.connect()

// 执行sql语句
const sql = `select * from 表名`

/**
* 参数：
*   1. 要执行的SQL语句
*   2. 占位符数据(可选)
*   3. SQL执行完毕后出发的回调函数，有3个参数：
*       1. err 错误对象
*       2. result 查询结果
*       3. fields 数据表的字段信息，一般不用
*/
conn.query(sql, (err, result) => {
    if (err) {
        return err
    }
    console.log(result)
})

// 关闭SQL链接
conn.end()
```

## 跨域解决方案
### CORS
```js
cnpm i cors -S

const cors = require('cors')

const config = {
    origin: 'http://127.0.0.1:4000', // 允许访问的外部网站地址，不设置都可以使用
}
// 注册为中间件
app.use(cors(config))
```

## cookie

### 读取
```js
app.get('/index', (req, res) => {
    console.log(req.headers.cookie) // 字符串类型的 id=1;name=小明
})

// 使用node querystring模块
const qs = require('querystring')
app.get('/index', (req, res) => {
    /**
    * 参数：
    *   1. 要拆解的字符串
    *   2. 第一次拆分的分隔符
    *   3. 第二次拆分的分隔符
    *   4. 拆分过后的结果对象
    */
    let cookies = qs.parse(req.headers.cookie, ';', '=')
    console.log(cookies);
})
```


### 设置
```js
app.get('/index', (req, res) => {
    // 单个cookie
    res.setHeader('Set-Cookie', 'id=1')
    
    // 多个cookie 的设置方式
    // 1.
    res.setHeader('Set-Cookie', ['id=1', 'name=小明'])
    
    // 2. 下面就不能用 res.send()了， 需要使用 res.end()
    res.writeHeader(200, {
        'Set-Cookie': ['id=1', 'name=小明']
    })
    
    // 3. express 提供的
    res.set('Set-Cookie', ['id=1', 'name=小明'])
    
    // 设置有效期 (有效期1小时)
    let time = new Date(Date.now() + 3600000).toUTCString()
    res.set('Set-Cookie', [`id=1;expires=${time}`, 'name=小明'])
    
    res.send()
})
```

## session
### 读取
```js
app.get('/index', (req, res) => {
    console.log(req.session)
})
```


### 设置
```js
const session = require('express-session')

app.use(session({
    secret: 'xxxx', // 加密字符串
    resave: false, // 强制保存session即使它没有变化
    saveUninitialized: false, // 强制将未初始化的session存储
}))

app.get('/index', (req, res) => {
    req.session.isLogin = true
    req.session.users = {
        id: 111,
        name: '小明',
    }
    
    res.end()
})
```


### 删除
```js
app.get('/destory', (req, res) => {
    // 一次性清空所有session
    res.session.destroy()
})
```

## express常用模块
### sendFile()
```js
const express = require('express')
const path = require('path')

const app = express()

// 示例1
app.get('/index', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            return res.end('404 not Found')
        }
        
    })
})


// 示例2
const config = {
    root: __dirname
}
app.get('/list', (req, res) => {
    res.sendFile('index.html', config, (err) => {
        return res.send(err)
    })
})



app.listen(8088, () => {
    console.log('服务器开启了')
})
```

### 托管静态资源
```js
const express = require('express')
const app = express()

// url地址中以 /public 开头的， 都去 ./public 目录查找、读取文件并返回给浏览器
app.use('/public', express.static('./public'))
```




<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

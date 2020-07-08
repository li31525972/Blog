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




<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

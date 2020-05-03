# ES5 基本

## 基本概念

### 数据类型
- `undefined` - 值未定义
- `null` - 空对象指针
```js
var a = null
console.log(typeof a) // 'object'
```
- `boolean` - 布尔值
- `string` - 字符串
- `number` - 数值
- `object` - 数组
- `function` - 函数

### 操作符
- 普通操作符 `+` `-` `*` `/`

- 一元操作符 `++` `--` `+` `-`
```js
var a = 1
++a
--a
a = +a // 1
a = -a // -1
// + - 会进行隐式的数据类型转换，将字符串类型的数值和布尔值转换为数值，其它转换为NaN
```
- 位操作符
```js
// 以后添加

```
- 逻辑操作符 `!` `&&` `||`

- 关系操作符 `>`  `<`  `>=`  `<=`

- 相等操作符 `==`  `===`  `!=`
```js
// == 先进行数据类型转换再判断值
// === 直接判断值，不会进行隐式的数据类型转换
```
- 条件操作符 -> 三元表达式
```js
var a = 10
var b = a > 1 ? 100 : 1000
```

- 赋值操作符 `+=` `-=` `*=` `/=` `%=` `<<=` `>>=` `>>>=`

### 循环、判断语句
- `if`
- `do-while`
- `while`
- `for`
- `for-in`
- `label` 自行百度一下
- `break`
- `continue`
- `with` 严格模式下不能使用，视为语法错误
- `switch`

## 函数
### 基本用法
```js
function fun() {} // 没有重载(多次声明，后面覆盖前面的)
let fun = function() {}
// 可以通过 arguments 来访问匿名参数， 是一个数组
// 两种函数创建的区别，在js文件预解析阶段用表达式创建的函数只会提升变量，那么在这个表达式上面调用这个函数就会报错
```
### 属性
- `length` 表示函数的命名参数的个数
- `prototype` 访问原型，<font color='red'><b>不可通过for-in枚举</b></font>

### 方法
- `apply()` 在特定的作用域中调用函数，参数：
1. 在其中运行函数的作用域(this指向)
2. 参数数组，可以是Array的实例，也可以是arguments对象

- `call()` 在特定的作用域中调用函数，参数：
1. 在其中运行函数的作用域(this指向)
2. 参数，多个参数使用,号分隔

- `bind()` 创建一个函数的实例，其this值绑定到传给`bind()`函数的值

### 递归
- 递归函数是一个在函数通过名字调用自身的情况下构成的，先看案例
```js
    function count(num) {
        if (num <= 1) {
            return 1
        } else {
            return num * count(num - 1)
        }
    }
    // 这是一个典型的递归阶乘函数，虽然这个函数没什么问题，但是下面的代码却可能导致出错
    console.log(count(5)) // 120
    var cur = count
    count = null
    console.log(cur(4)) // Uncaught TypeError: count is not a function
```
- 那么怎么解决呢？`arguments.callee` 可以解决这个问题，`arguments.callee` 是一个指向正在执行的函数的指针, 可以用它来实现对函数的递归调用
```js
    function count(num) {
        if (num <= 1) {
            return 1
        } else {
            return num * arguments.callee(num - 1)
        }
    }
    console.log(count(5)) // 120
    var cur = count
    count = null
    console.log(cur(4)) // 24
```

- 但是在严格模式下不能通过脚本访问 `arguments.callee` ， 访问这个属性会导致错误，不过可以通过函数表达式来达成同样的结果
```js
    let count = function f(num) {
        if (num <= 1) {
            return 1
        } else {
            return num * f(num - 1)
        }
    }
    console.log(count(5)) // 120
    var cur = count
    count = null
    console.log(cur(4)) // 24
``` 

### 闭包
- 闭包是指什么？闭包是指有权访问另一个函数作用域中的变量的函数, 那么闭包的作用是什么呢？ 显而易见，就是延长变量的生命周期了。。简单的闭包案例：
```js
    function a(num) {
        var count = 10

        // 在这个函数的内部调用了另一个作用域中的count，这样就形成了闭包
        return function() {
            return count + num
        }
    }

    let b = a(5)
    console.log(b())
```
<font color='red'><b>闭包的实战使用案例还是挺多的，个人对他的使用场景大概就是在 调用了某个原生或者插件函数时，向这个函数内添加自己的参数，具体实现可以参考 `Array 的 sort 方法`</b></font>

### 闭包的弊端
- 一般的函数执行完毕后，局部活动对象都会被销毁，内存中只保存全局作用域的变量对象 但是向上面的例子，当函数执行完毕后，因为匿名函数内部调用了外部函数的变量不会销毁，需要执行完毕后手动销毁
```js
    function a(num) {
        var count = 10

        return function() {
            return count + num
        }
    }

    let b = a(5)
    console.log(b())
    a = null // 销毁闭包
```

- 除此之外还会引发什么问题呢？ <font color='red'><b>内存泄漏！</b></font>， 具体来说，如果闭包的作用域中保存着一个 `HTML` 元素， 那么该元素将无法被销毁，举例：
```js
    function handleClick() {
        var element = document.querySelector('div')

        element.onclick = function() {
            console.log(element.id)
        }
    }
```

- 怎么解决呢？ 往下看：
```js
    function handleClick() {
        var element = document.querySelector('div')
        var id = element.id
        element.onclick = function() {
            console.log(id)
        }

        element = null
    }
```
- 通过把`element.id`的一个副本保存在一个变量中，并且在闭包中引用了该变量消除了循环引用，但是仅仅做到这一点还不能解决内存泄漏的问题，必须要记住：闭包会引用包含函数的整个活动对象，而其中也包含着`element`，因此，有必要将`element`置为`null`

## 变量、作用域和内存

### 变量类型
- 基本类型 `Undefined` `Null` `Boolean` `String` 和 `Number`
- 引用类型 `Object` `Array`
```js
// 创建Object实例的方式
var obj = new Object()
var obj = {}

// 创建数组的方式
var list = new Array()
var list = []
```

### 类型检测
- `typeof` 用来判断基本类型，不能判断引用类型的数据
```js
        let a = 10
        let b = 'ss'
        let c = false
        let d
        let e = [1,2,3]
        let f = { name: '小明' }
        console.log(typeof a) // number
        console.log(typeof b) // string
        console.log(typeof c) // boolean
        console.log(typeof d) // undefined
        console.log(typeof e) // object
        console.log(typeof f) // object
        console.log(typeof g) // undefined
```

- `instanceof` 可以用来判断是否是引用类型
```js
        // 判断是不是某个类型
        let arr = [1,2,3,4]
        let obj = { name: '小明' }
        console.log(arr instanceof Array) // true
        console.log(arr instanceof Object) // true
        console.log(obj instanceof Array) // false
        console.log(obj instanceof Object) // true
```

- `hasOwnProperty()` 检测一个对象是否包含某个方法或属性，会查找原型链
```js
    function Per() {
        this.name = '11'
    }
    
    let per = new Per()
    console.log(per.hasOwnProperty('name')) // true
```

- `Array.isArray()` 用来判断是不是数组
```js
        let arr = [1,2,3,4]
        console.log(Array.isArray(arr)) // true
```

- 最终解决方案 `Object.prototype.toString.call().slice(8, -1)`
```js
        let arr = [1,2,3,4]
        let obj = { name: '小明' }
        let a = '222'
        console.log(Object.prototype.toString.call(a).slice(8, -1)) // String
        console.log(Object.prototype.toString.call(arr).slice(8, -1)) // Array
        console.log(Object.prototype.toString.call(obj).slice(8, -1)) // Object
```
<font color='red'>为什么不直接使用obj.toString()方法呢，这是因为toString为Object的原型方法，
而Array和Function都是Object的实例，都重写了toString()方法，那么直接使用的时候调用的就是重写后的toString方法，
因此想要得到对象的具体类型时，需要调用Object的原型上的toString()方法</font>

## 垃圾回收机制

### 标记清除(常用)
- 垃圾收集器在运行的时候会给存储在内存中的变量添加标记，然后，去掉环境中的变量以及环境中的变量引用的变量标记，而之后的变量就视为准备删除的变量，
原因是环境中的变量以及无法访问到这些变量了，最后垃圾收集器完成内存清除工作，销毁那些带标记的值并回收他们所占用的内存空间

### 引用计数(不常用)
- 跟踪记录每个值被引用的次数，当声明了一个变量并赋予一个引用类型值，则该值的引用次数为1，如果同一个值又赋给了另一个变量，那么引用次数加1，
反之，当包含这个值的变量又取得了另外一个值，那么引用次数减1，当这个值的引用次数为0时，则说明没有办法再访问这个值了，
当垃圾收集器再次运行的时候，会完成清除工作，销毁该值并回收该值所占用的内存




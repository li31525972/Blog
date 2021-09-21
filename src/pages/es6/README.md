# ES6基本语法

## let 和 const 命令
- `let` 和 `const` 声明的变量都只在块级作用域下有用
- `let` 用来声明变量
- `const` 用来声明常量，不可修改，注意：引用类型的值不能改变指针，指针内部可以修改

## 解构赋值
- 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符。
- 规则：只要等号右边的值不是对象或数组，就先将其转为对象，由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错


### 数组解构赋值
```js
    let [a, b, c, d] = [1, 2, 3, 4]
    console.log(a) // 1
    console.log(b) // 2
    console.log(c) // 3
    console.log(d) // 4
    // 如果解构不成功，那么值为 undefined
    // 如果等号两边数据类型不成功，那么就会报错, 如：
    let [a] = 1
    let [a] = {}
```

### 对象解构赋值
```js
    let obj = {
        a: 1,
        b: 2,
        c: 3
    }
    // 变量必须与属性同名才能取到正确的值
    let { a, b, c } = obj
    // 如果不一致需要这么写：
    let { a: d, b, c} = obj 
    console.log(a) // 1
    console.log(b) // 2
    console.log(c) // 3
```

### 默认值
```js
// 数组
let [a = 10, b, c, d] = [1, 2, 3, 4]

// 对象
    let obj = {
        a: 1,
        b: 2,
        c: 3
    }
    let { a = 10, b, c } = obj
```
<font color='red'><b>注意：只有当解构的值`===`严格等于`undefined`时默认值会生效</b></font>

## 函数扩展
### 参数默认值
```js
function test(a = 1) {
    console.log(a)
}

test() // 1
```

### 解构赋值默认值
```js
function test({ a = 1, b }) {
  console.log(a, b)
}
test() // 报错

test({}) // 1 undefined 

function test({ a = 1, b } = {}) {
  console.log(a, b)
}
test() // 1 undefined 
```
### 参数默认值的位置
```js
function f(x = 1, b) {
  console.log(x, b)
}
f(2) // 2 undefined

f(undefined, 2) // 1 2   注意：null就不能触发默认值的效果
```

### 函数的length属性
- 指定了默认值以后，函数的`length`将会失真
```js
(function (a) {}).length // 1
(function (a = 1) {}).length // 0
(function (a = 1, b) {}).length // 0 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数
(function (a, b = 1) {}).length // 1
(function (...args) {}).length // 0
```
### 作用域
- 一旦设置了参数的默认值，函数进行声明初始化时，参数就会形成一个单独的作用域`context`，等到初始化结束后，这个作用域就会消失，不设置默认参数是不会形成的
```js
let x = 1
function f(x, y = x) {
  console.log(y)
}
f(2) // 2  访问的是

function f1(x = y, y) {
  console.log(x)
}
f1(1) // 1 这种写法没有任何意义，传值的时候直接就给x了
f1(undefined, 2) // 这么写就会报错，初始化的时候找不到y

function f2(y = x) {
  console.log(y)
}
f2() // 1 调用的是全局属性x的值，在很多js框架中都是这么实现的函数默认参数，比如事件的 event 参数？

function f3( x = y ) {
  console.log(x)
}
f3() // x = y 相当于 let x = y 由于找不到y就会报错

// 如果函数的参数是一个函数，那么该函数也会遵守这个规则

```
#### 复杂的例子
```js
let x = 1
function f(x, y = () => { x = 2 }) {
  var x = 3
  y()
  console.log(x)
}
f() // 3
console.log(x) // 1

/*
* 讲解：在上面代码中，函数f的参数形成了一个单独的作用域，声明了变量x,y，f函数内部声明的var x = 3 和参数x没有任何关系
* 而y 的默认参数又是一个函数，函数里面对x进行了改写，改写的是f函数的参数x
* */

```
### rest参数
- 用于获取函数的多余参数，就不需要使用`arguments`对象了
```js
function f(...values) {
  let sum = 0
  console.log(values);
  for (let val of values) {
      sum += val
  }
  return sum
}
f(1,2,3,4,5) // 15 注意：rest参数之后不能有其他参数，否则就会报错
```

### 严格模式
- `ES5`开始，函数内部可以设定严格模式
```js
function f() {
  'use strict'
  // ...
}
```
- `ES6`做了一点修改，规定函数只要使用了默认值、结构赋值或者扩展运算符，那么函数内部就不能显式的设定为严格模式，否则就会报错
```js
// 报错
function f(a = 1) {
  'use strict'
}

// 报错
function f1({ a, b }) {
  'use strict'
}

// 报错
function f2(...values) {
  'use strict'
}

/*
* 这样规定的原因是：函数内部的严格模式同样适用于函数体和函数参数，但是函数执行时先执行函数参数再执行函数体
* 这样就有一个不合理的地方，只有从函数体才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行
* 解决方法：1. 全局设定严格模式  2. 把函数包装在一个立即执行函数里边
* */
```

### name属性
- 函数的`name`属性返回函数的函数名，如果将一个匿名函数赋值给了一个变量，ES5的name属性返回空字符串，ES6返回变量名

### 箭头函数
#### 基本用法
```js
let f = v => v

// 如果不需要参数或者有多个参数，用()代表参数部分
let f = () => 5
let f = (a, b) => a + b

// 如果箭头函数返回一个对象，必须在对象外面加上()
let f = (a, b) => ({ a, b })
```
#### 注意事项
1. 函数体内的`this`对象是定义时所在的对象，不是使用时所在的对象
2. 不可以当做构造函数，也就是说，不能使用`new`命令，否则会抛出错误
3. 不可以使用`arguments`对象，该对象在函数体内不存在，如果要用，使用`rest`参数代替
4. 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数

## 对象的扩展



<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

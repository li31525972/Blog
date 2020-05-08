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



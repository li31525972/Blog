# javascript 对象

## Array 对象

### push()
- 向数组的末尾添加数据,可以接收多个参数
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.push(8)
    console.log(count) // 6 返回数组的长度
    console.log(list) // [1, 2, 3, 4, 5, 8]
```

### unshift()
- 向数组的开头添加数据,可以接收多个参数
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.unshift(8)
    console.log(count) // 6 返回数组的长度
    console.log(list) // [8, 1, 2, 3, 4, 5]
```

### pop()
- 删除数组的最后一项
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.pop()
    console.log(count) // 5 返回删除后的项
    console.log(list) // [1, 2, 3, 4]
```

### shift()
- 删除数组的第一项
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.shift()
    console.log(count) // 1 返回删除后的项
    console.log(list) // [2, 3, 4, 5]
```

### reverse()
- 翻转数组项的顺序
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.reverse()
    console.log(count) //  [5, 4, 3, 2, 1] 返回翻转后的数组
    console.log(list) //  [5, 4, 3, 2, 1]
```

### sort()
- 对数组进行排序
```js
    // 默认情况下，会调用每个数组项的 toString() 方法，然后比较得到字符串
    let list = [1, 10, 3, 15, 5]
    let count = list.sort()
    console.log(count) // [1, 10, 15, 3, 5] 返回排序后的数组
    console.log(list) // [1, 10, 15, 3, 5]
    
    // sort() 支持传入一个函数，该函数接收2个参数，1.下一项 2.当前项
    let list = [1, 10, 3, 15, 5]
    let count = list.sort( function(a, b) {
        // a - b 升序  b - a 倒序
        return a - b 
    })
    console.log(count) // [1, 3, 5, 10, 15] 返回排序后的数组
    console.log(list) // [1, 3, 5, 10, 15]
```

## Boolean 对象


## Date 对象


## Math 对象


## Number 对象


## String 对象


## RegExp 对象


## Error 对象


## 全局属性/函数

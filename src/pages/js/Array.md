# Array

## ES5

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
    
    // 那么在实战当中数组的值都是对象怎么用呢？可以这么写，先封装一个闭包函数：
    function createComparison(name) {
        return function(obj1, obj2) {
            let value1 = obj1[name]
            let value2 = obj2[name]
            return value1 - value2
            // 或者 return value2 - value1
        }
    }
    
    // 最后直接调用数组方法
    data.sort(createComparison('name'))
```

### concat()
- 合并两个或多个数组， <font color='red'><b>不改变原数组</b></font>
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.concat(7, 8)
    console.log(count) // [1, 2, 3, 4, 5, 7, 8] 合并后的结果
    console.log(list) // [1, 2, 3, 4, 5] 不改变原数组
```

### slice()
- 返回开始和结束之间的项，不包括结束位置，参数：
1. `start` 开始位置
2. `end` 结束位置，可以为负数，负数从后面查找
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.slice(1, 2)
    console.log(count) // [2] 返回的值为一个新数组
    console.log(list) // [1, 2, 3, 4, 5]
```

### splice()
- 从数组中添加或删除元素，<font color='red'><b>改变原数组</b></font>，参数：
1. `start` 开始位置
2. `number` 删除的个数
3. 替换元素，可以是多个
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.splice(1, 2, '1', '2', '3')
    console.log(count) // [2, 3] 返回删除的元素
    console.log(list) // [1, "1", "2", "3", 4, 5] 操作后的数组
```

### indexOf()
- 正序查找元素的索引
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.indexOf(1)
    let nocount = list.indexOf(6)
    console.log(count) // 0 查到
    console.log(nocount) // -1 没查到
```

### lastIndexOf()
- 倒序查找元素的索引
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.lastIndexOf(1)
    let nocount = list.lastIndexOf(6)
    console.log(count) // 0 查到
    console.log(nocount) // -1 没查到
```

### every()
- 检测数组的每个元素是否都符合条件
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.every(function(item) {
        return item > 0
    })
    console.log(count) // true
    
    let count = list.every(function(item) {
        return item > 1
    })
    console.log(count) // false
```

### filter()
- 检测数组元素，返回符合条件的元素组成的数组
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.filter(function(item) {
        return item > 1
    })
    console.log(count) // [2, 3, 4, 5]
    
    let count = list.filter(function(item) {
        return item > 6
    })
    console.log(count) // []
```

### forEach()
- 数组每个元素都执行一次回调函数, 参数：
1. `item` 当前项
2. `index` 当前项的索引
3. `arr` 当前项所属数组
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.forEach(function(item) {
        item = item + 10
    })
    console.log(count) // undefined 没有返回值
    console.log(list) // [1, 2, 3, 4, 5] 不改变原数组
    
    // 要改变原数组要这么做
    let count = list.forEach(function(item, index, arr) {
        arr[index] = item + 10
    })
    console.log(count) // undefined 没有返回值
    console.log(list) // [11, 12, 13, 14, 15]
```

### some()
- 检测数组中是否有元素满足指定条件，有一个就返回true
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.some(function(item) {
        return item > 1
    })
    console.log(count) // true
    
    let count = list.some(function(item) {
        return item > 5
    })
    console.log(count) // false
```

### map()
- 对数组的每一项运行指定的函数，返回每次函数调用的结果组成的数组，<font color='red'><b>不改变原数组</b></font>
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.map(function(item) {
        return item += 10
    })
    console.log(count) // [11, 12, 13, 14, 15] 返回的结果
    console.log(list) // [1, 2, 3, 4, 5] 原数组
```

### reduce()
- 正序将数组元素计算为一个值，参数：
1. `prev` 前一个值
2. `cur` 当前值
3. `index` 当前索取
4. `arr` 数组对象
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.reduce(function(prev, cur, index, arr) {
        return prev + cur
    })
    console.log(count) // 15 
```

### reduceRight()
- 倒序将数组元素计算为一个值，参数：
1. `prev` 前一个值
2. `cur` 当前值
3. `index` 当前索取
4. `arr` 数组对象
```js
    let list = [1, 2, 3, 4, 5]
    let count = list.reduceRight(function(prev, cur, index, arr) {
        return prev + cur
    })
    console.log(count) // 15 
```

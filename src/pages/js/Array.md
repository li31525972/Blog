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
<font color='red'><b>`ES5`常用来复制克隆数组的方法</b></font>

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

## ES6

### Array.from()
- 将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
- 怎么区别什么是不是伪数组？就看能否使用数组的方法
```js
    function func(name, age, sex) {
        let arg = arguments
        // console.log(arg.join('')) // 报错

        arg = Array.from(arg)
        console.log(arg.join('')) // 张三201
        console.log(arg)
    }

    func('张三', 20, '1')
```

<font color='red'><b>实际应用中，常见的类似数组的对象是 DOM 操作返回的 `NodeList` 集合，以及函数内部的`arguments`对象。Array.from都可以将它们转为真正的数组。</b></font>

### Array.of()
- `Array.of`方法用于将一组值，转换为数组。弥补了`Array()`或`new Array()`的不足, 总是返回一个数组
```js
    console.log(new Array()) // []
    console.log(new Array(2)) // [empty × 2]
    console.log(new Array(2, 3)) // [2, 3]
    console.log(Array.of()) // []
    console.log(Array.of(undefined)) // [undefined]
    console.log(Array.of(1)) // [1]
    console.log(Array.of(1, 3)) // [1, 3]
```

### copyWithin()
- 将制定位置的项复制到其它位置，会覆盖原有成员，返回当前数组，<font color='red'>会改变原数组</font>，参数：
1. `target`（必需）：从该位置开始替换数据。如果为负值，表示倒数。
2. `start`（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
3. `end`（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
```js
    console.log([1, 2, 3, 4, 5].copyWithin(0, 3)) // [4, 5, 3, 4, 5]
```

### find()
- 找出第一个符合条件的数组成员，参数为回调函数，所有数组成员依次执行该函数，直到找到第一个返回为`true`的成员，返回返回该成员，没有找到返回`undefined`
```js
    let list = [1, 2, 3, 4, 5]
    let row = list.find(item => {
        return item > 3
    })
    console.log(row) // 4
```

### findIndex()
- 和 `find()` 类似， 返回第一个符合条件成员的位置，都不符合，返回 `-1`
```js
    let list = [1, 2, 3, 4, 5]
    let row = list.findIndex(item => {
        return item > 3
    })
    console.log(row) // 3
```

### fill()
- 使用给定值，填充一个数组，<font color='red'>会改变原数组</font>, 参数：
1. 给定的值
2. 可选，开始位置
3. 可选，结束位置(不包含该位置)
```js
    let list = [1, 2, 3, 4, 5]
    
    console.log(list.fill('s', 2, 4)) // [1, 2, "s", "s", 5]
    console.log(list) // [1, 2, "s", "s", 5]
```

### entries()
- 返回键值对的遍历器对象 `Array Iterator {}`

### keys()
- 返回键的遍历器对象 `Array Iterator {}`

### values()
- 返回值的遍历器对象 `Array Iterator {}`

### includes()
- 表示某个数组是否包含给定的值，与字符串的`includes`方法类似。
```js
    let list = [1, 2, 3, 4, 5]
    
    console.log(list.includes(2)) // true
    console.log(list.includes(7)) // false
```

### flat()
- 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。参数：
1. 可选，想要拉平的层数，默认为 1， 如果想不管多少层都拉平，用 `Infinity` 关键字作为参数
```js
    let newArr = [1, 2, 3, [4, [5, [6, [7, [8, [9, [10, 11]]]]]]]]
    
    console.log(newArr.flat()) // [1, 2, 3, 4, Array(2)]
    console.log(newArr.flat(2)) // [1, 2, 3, 4, 5, Array(2)]
    console.log(newArr.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```


### flatMap()
- `flatMap()`方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组。
- `flatMap()`只能展开一层数组。参数：
1. 当前项
2. 当前项位置
3. 原数组
```js
    let newArr = [1, 2, 3, [4, [5, [6, [7, [8, [9, [10, 11]]]]]]]]

    let list = newArr.flatMap(item => {
        return item += 10 
    })
    
    console.log(list) // [11, 12, 13, "4,5,6,7,8,9,10,1110"] 没有拉平的变成了字符串？
    console.log(newArr) // [1, 2, 3, Array(2)]
```

# API

## 选择元素

### select
- 返回匹配选择器的第一个元素
```js
// 可选择的有 标签、类、id、以及已经被选中的元素等
d3.select('body')

// 已经被选中的元素：
let wrap = document.getElementById('wrap')
d3.select(wrap)

// 如果是多个选中的元素,使用selectAll：
let wrap = document.querySelectorAll('div')
d3.selectAll(wrap)
```

### selectAll
- 返回匹配选择器的所有元素
```js
d3.selectAll('svg')

// 选择body元素下的所有div
d3.select('body').selectAll('div')
```

## 查看选择集状态

### empty
- 如果选择集为空返回true，不为空返回false
```js
d3.selectAll('div').empty()
```

### node
- 返回选择集里第一个非空元素，如果选择集为空，返回`null`
```js
d3.selectAll('div').node()
```

### size
- 返回选择集中元素个数
```js
d3.selectAll('div').size()
```

## 设置和获取属性

### 设置属性 attr
```js
d3.select('div').attr('id', 'xxx')
```

### 设置class
```js
// 1. 使用attr设置，但是当需要根据条件设置是否开启类名就不行了
d3.select('div').attr('class', 'xxx')

// 2. classed 第二个参数是一个判断条件
d3.select('div').classed('xxx', false) // 不开启 xxx 类
d3.select('div').classed('xxx', true) // 开启 xxx 类
// 也可以这么写
d3.select('div').classed({ 'red': true, 'size': true })
// 或者 用空格分开在一起
d3.select('div').classed('red size', true) 
```

### 设置 style
```js
d3.select('div').style('color', 'red').style('font-size', '16px')
// 或者
d3.select('div').style({ "color": 'red', 'font-size': '16px' })

// 如果只有一个参数，那么返回该样式的值
d3.select('div').style('color')
```

### 设置获取表单value值 property
- 不能用`attr`获取的都可以用`property`获取
```js
// 一个值为获取，两个值未设置
d3.select('input').property('value', '张三')
```


### 获取属性 attr
```js
d3.select('div').attr('id')
```

### 获取文本内容 text
```js
d3.select('span').text()
```

### 获取HTML内容 html
```js
d3.select('div').html()
```

## 添加、插入、删除元素
### 末尾添加 append
```js
// name 为元素名称
d3.select('div').append(name)
```

### 指定元素之前插入 insert
```js
// before 为css选择器名称
d3.select('div').insert(name, 'before')
```

### 删除元素 remove
```js
d3.select('div').remove()
```

## 数据绑定
### datum
- 为选择集的每一个元素绑定相同的数据，用的比较少
```html
<div class="wrap">
    <p>111</p>
    <p>222</p>
    <p>333</p>
</div>
```
```js
let p = d3.select('.wrap').selectAll('p')
p.datum(88) // 为选择集绑定数据
console.log(p);
console.log(p.datum()); // 没有参数返回绑定的数据

p.datum(88).text((data,index) => data) // 绑定数值 88 到选择集上替换内容
```

### data
- 将数组各项分别绑定到选择集的各元素上，可以指定绑定的规则
```html
<div class="wrap">
    <p>111</p>
    <p>222</p>
    <p>333</p>
</div>
```
```js
let list = [1,2,5]
let p = d3.select('.wrap').selectAll('p')
let update = p.data(list)
update.text((data,index) => data) // 直接修改内容
console.log(update); // 返回一个对象，对象中有很多方法
console.log(update.enter())
console.log(update.exit())
```
- `update`数组长度 = 选择集元素数量
- `enter`数组长度 > 选择集元素数量
- `exit`数组长度 < 选择集元素数量

## 选择集的处理
### enter 处理方法
- 当数组的数据比选择集的元素多时，处理方法就是添加元素
```js
        let list = [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' },
            { id: 3, name: '王五' },
            { id: 4, name: '赵六' },
        ]
        let p = d3.select('.wrap').selectAll('p')
        let update = p.data(list)
        update.text((data,index) => data.name)
        let enter = update.enter()
        enter.append('p').text(data => data.name)
```

### exit 处理方法
- 当数据的数据比选择集的元素少时，使用remove()删除即可
```js
        let list = [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' },
        ]
        let p = d3.select('.wrap').selectAll('p')
        let update = p.data(list)
        update.text((data,index) => data.name)
        let exit = update.exit()
        exit.remove()
```
### 处理模板
```js
        let list = [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' },
            { id: 3, name: '王五' },
            { id: 4, name: '赵六' },
        ]
        let p = d3.select('.wrap').selectAll('p')
        
        // 绑定数据返回 update、enter、exit部分
        let update = p.data(list)
        let enter = update.enter()
        let exit = update.exit()
        // update处理方法
        update.text((data,index) => data.name)
        // enter部分处理方法
        enter.append('p').text(data => data.name)
        // exit部分处理方法
        exit.remove()
```
### 过滤器 filter

### 排序 sort
- 默认使用 `d3.ascending`

### each
- 对选择集的各元素分别处理

### call
- 将选择集自身作为参数，传递给某一函数
```js
d3.select('.wrap').selectAll('p').call(myfunc) // 常用于拖拽、缩放等操作
```

## 数组排序
### 递增 ascending(a,b)
```js
let list = [11, 22, 33, 24, 54, 36]
list.sort(d3.ascending)
console.log(list);
```
### 递减 descending(a,b)
```js
let list = [11, 22, 33, 24, 54, 36]
list.sort(d3.descending)
console.log(list);
```
## 数组求值
### 最小值 min
```js
let list = [11, 22, 33, 24, 54, 36]
d3.min(list)
```

### 最大值 max
```js
let list = [11, 22, 33, 24, 54, 36]
d3.max(list)
```

### 最小值和最大值 extend
- 相当于分别调用`min`和`max`返回值是一个数组，第一项是最小值，第二项是最大值
```js
let list = [11, 22, 33, 24, 54, 36]
d3.extend(list) // [11, 54]
```
<font color="red"><b>以上三个函数的参数有两个，必选参数`array`和可选参数`accessor`,其中`array`中的`undefined`会自动被忽略</b></font>
```js
let list = [11, 22, 33, 24, 54, 36]
let min = d3.min(list, d => d*10) // 110
let max = d3.max(list, d => d*10) // 540
let extend = d3.extend(list, d => d*10) // [110, 540]
```
- 在指定了`accessor`的情况下，先调用此函数，最后在调用最大值最小值的函数

### 求和 sum
- 数组为空返回`0`
```js
let list = [11, 22, 33, 24, 54, 36]
d3.sum(list)
```

### 求平均值 mean
- 数组为空返回`undefined`
```js
let list = [11, 22, 33, 24, 54, 36]
d3.mean(list)
```
<font color="red"><b>以上两个函数的参数有两个，必选参数`array`和可选参数`accessor`,其中`array`中的`undefined`和`NaN`会自动被忽略</b></font>

### 中间值 median
- 求数组的中间值，如果数组为空，返回`undefined`

### 求p分为点值 quantile
- 求取p分为点的值，p的范围为`[0,1]`，数组需先递增排序

### 求方差 variance
- 求方差

### 求标准差 deviation
- 求标准差

<font color="red"><b>方差和标准差用于度量随机变量和均值之间的偏离程度，在概率统计中经常用到，其中标准差是方差的二次方根，这两个值越大，表示此随机变量偏离均值的程度越大</b></font>

### 获取数组项左边的位置 bisectLeft
- 获取某数组项左边的位置
```js
let list = [11, 22, 33, 24, 54, 36]
let left = d3.bisectLeft(list.sort(d3.ascending), 24) // 获取24左边的位置
list.splice(left, 0, 36) // 在24左边位置插入36
console.log(list); // [11, 22, 36, 24, 33, 36, 54]
```

### 获取数组项右边的位置 bisect
- 获取某数组项右边的位置，和`bisectLeft`类似，获取的是右边的位置

### 获取数组项右边的位置 bisectRight
- 获取数组项右边的位置，和`bisectLeft`类似，获取的是右边的位置

## 操作数组
### shuffle 随机排列
- 随机排列数组
```js
let list = [11, 22, 33, 24, 54, 36]
d3.shuffle(list)
```

### merge 合并数组
- 将两个数组合并
```js
let list = d3.merge([[1,9], [2,4,6]])
console.log(list) // [1, 9, 2, 4, 6]
```

### pairs 返回邻接的数组
- 返回邻接的数组对
```js
let list = [11, 22, 33, 24, 54, 36]
let newList = d3.pairs(list)
console.log(newList)
/**
* [Array(2), Array(2), Array(2), Array(2), Array(2)]
* 0: (2) [11, 22]
  1: (2) [22, 33]
  2: (2) [33, 24]
  3: (2) [24, 54]
  4: (2) [54, 36]
*/

```

### range 返回等差数列
- `d3.range([start,]stop[,step])`
- `start`开始位置，默认为`0`
- `stop`为正，则最后的值小于`stop`，为负则最后的值大于`stop`
- `step`差，默认为`1`
```js
        let list = d3.range(10)
        let list1 = d3.range(2,10)
        let list2 = d3.range(2,10,2)
        console.log(list); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        console.log(list1); // [2, 3, 4, 5, 6, 7, 8, 9]
        console.log(list2); // [2, 4, 6, 8]
```

### permute 指定索引排序
- 根据指定的索引号数组返回排列后的数组，原数组不变
```js
let list = ['张三', '李四', '王五']
console.log(d3.permute(list, [1,0,2])) // ["李四", "张三", "王五"]
```

### zip 用多个数组制作数组的数组
- 用多个数组制作数组的数组，参数是多个数组，输出二维数组：
```js
        let list = [1,2,3]
        let list1 = [4,5,6]
        let list2 = [7,8,9]
        let result = d3.zip(list,list1,list2)
        console.log(result)
        /*
        * [
        *   [1, 4, 7]
            [2, 5, 8]
            [3, 6, 9]
          ]
          可以看到，参数的每个第i项变成了新数组的第i项
        * */
```
### transpose 求转置矩阵
- 将矩阵的行换成相应的列，得到的矩阵即转置矩阵
```js
        let list = [1,2,3]
        let list1 = [4,5,6]
        let list2 = [7,8,9]
        let result = d3.transpose([list,list1,list2])
        console.log(result)
        /*
        * [
        *   [1, 4, 7]
            [2, 5, 8]
            [3, 6, 9]
        * ]
        * */
```

## 映射
### map 构造映射
- 构造映射，第一个参数是源数组，第二个参数是映射的`key`
```js
        let list = [
            { name: '111', id: 1 },
            { name: '222', id: 2 },
            { name: '333', id: 3 },
        ]
        let result = d3.map(list, data => data.id)
        console.log(result) // [1, 2, 3]
```

### has 判断是否存在指定的`key`



























<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

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









































<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

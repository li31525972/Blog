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
```












































<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

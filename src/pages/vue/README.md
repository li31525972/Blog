# 基础部分

## 简介
`Vue`是一套用于构建页面的渐进式框架，何为渐进式？ 可以理解为按需引入功能，不像jQuery一样一下全部引入

## 模板语法
### 插值
```vue
<span>{{ msg }}</span>
<span v-text="msg"></span>
<span v-html="msg"></span>
```
### 指令
```vue
属性绑定
<div v-bind:id="dynamicId"></div>
简写：<div :id="dynamicId"></div>

事件绑定
<a v-on:click="doSomething">...</a>
<a @click="doSomething">...</a>

条件渲染
<p v-if="seen">现在你看到我了</p> // 可以 v-if v-else-if v-else
<p v-show="seen">现在你看到我了</p>
v-if根据表达式的值的真假添加/移除元素
v-show根据表达式的值的真假显示/隐藏元素

列表渲染
<li v-for="(item, i) in items" :key="item.message">{{ item.message }}</li> // 数组
<div v-for="(value, name, i) in obj">{{ name }}: {{ value }}</div> // 对象
key的作用，如果不加key那么数据发生变化的时候不会移动DOM元素来进行匹配数据项的顺序

```
## 修饰符
### 事件修饰符
- .stop 阻止单击事件继续传播 相当于 event.stopPropagation()
- .prevent 阻止事件的默认行为 相当于 event.preventDefault()
- .capture 官网介绍：即内部元素触发的事件先在此处理，然后才交由内部元素进行处理， ？？？
- .self 只有在当前元素上面触发的时候，不是从内部的元素上面触发
- .once 只触发一次，没有想到使用的场景。。。
- .passive 滚动事件触发，非滚动完成触发，不能和.prevent一起使用，不阻止事件的默认行为

### 按键修饰符
- .keyup.enter Enter键触发
- .keyup.tab
- .keyup.delete
- .keyup.esc
- .keyup.space
- .keyup.up
- .keyup.down
- .keyup.left
- .keyup.right
- .keyup.13 // 按键值
<font color='red'><div>.esc和方向键在IE9中key值不一样，请使用别名</div></font>

### 系统修饰符
- .keyup.ctrl
- .keyup.alt
- .keyup.shift
- .keyup.meta // 在 Mac上，meta 对应 command 键 (⌘)。在 Windows上 meta 对应 Windows 徽标键 (⊞)


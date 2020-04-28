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
<font color='red'><b>注意：当v-if和v-else中的元素是一样的时候请加key, 默认情况下，Vue在元素一样的时候不会进行元素的替换，而是修补元素，替换不一样的部分。[详情请看官网介绍](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)</b></font>

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

### 鼠标按钮修饰符
- .left
- .right
- .middle

### 表单修饰符
- .lazy // v-model在输入框默认使用的是input事件触发，加上.lazy转为change事件
- .number // 自动将用户的输入值转为数值类型
- .trim // 过滤用户输入的收尾空白字符

### 其它修饰符
- .exact // 排它效果，只能用规定的事件触发
- .native // 原生事件修饰符
- .sync  // 类似v-model [详情请看官网介绍](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

## 计算属性和侦听器
### 计算属性 computed
```vue
computed: {
    fullName () {} // 默认情况只有getter
    fullName: {
        get() {},
        set() {}, // 再需要的时候你也可以提供一个setter
    }
}
```
<font color='red'><p>注意：计算属性是基于他们的响应式依赖进行缓存的，只有相关响应式依赖发生改变才会重新计算</p></font>


### 侦听器 watch
官网介绍比较适合进行异步操作，这是computed无法做到的
[详情请看官网](https://cn.vuejs.org/v2/api/#vm-watch) 
```vue
watch: {
    question (newValue, oldValue) {
        // 一般操作可以放在这里
    },
    
    question: {
        <!--里面支持一个回调-->
        handler(newValue, oldValue) {
            
        },
        <!--下面有一些可选的配置项-->
        deep: true, // 监听对象内部值的变化，注意：监听数组不需要这么做
        immediate: true, // 立即以question当前值发生回调 
    }
}
```

### 计算属性 vs 监听器
<font color='red'><h4>优缺点以及注意事项</h4></font>
- `watch`在页面初始化的时候是不会触发内部的方法，只有加载完毕才会去监听，比如在组件内部监听了一个对象，当初始化这个对象传入这个组件的时候，watch还没有挂载，是不会触发内部方法的

## class与style绑定
### class
```vue
<!--active为一个变量，变量的值是一个类名， 用来动态的切换类名-->
<div v-bind:class="active"></div>
<!--active是一个类名，isActive是一个变量或表达式，根据这个变量的值来确定是否使用这个类名-->
<div v-bind:class="{ active: isActive }"></div>
<!--数组语法-->
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<!--在数组中使用对象形式-->
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### style
```vue
<!--基本使用：使用驼峰式或kebab-case方式-->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<!--多重值方式-->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

```

<font color='red'><p>注意：应尽量避免使用style，可以用class实现的就不用style</p></font>

## 过渡、动画

## 组件
### 全局组件
```vue
Vue.component('组件名', 组件)
```
<font color='red'><b>注意：应尽量避免使用全局组件, 原因如下：</b><p>1. 当webpack进行打包的时候如果没有使用这个组件，但是也会打包进去，增加文件的体积，造成用户下载的js文件无谓的加大</p><p>2. 从开发角度来看，使用全局组件不利于查找，于开发、维护人员来说，你这样真的好吗？</p></font>

### 局部组件
```vue
var ComponentA = { /* ... */ } 或者 import ComponentA from './ComponentA.vue'
<!--然后在 components 选项中定义你想要使用的组件：-->
new Vue({
  el: '#app',
  components: {
    ComponentA,
  }
})

```
如果局部注册每次需要引入一大堆组件，怎么解决方便使用呢？请看下章介绍

### 局部组件一次引入多个方式
```vue
在components文件夹下创建一个index.js文件，然后将所有公共组件在这里导入导出，如：
export { default as CommonTable } from './CommonTable'
export { default as CommonForm } from './CommonForm'

在Vue文件中使用时
import { CommonTable, CommonForm } from '@/components'

components: {
    CommonTable,
    CommonForm
}
```

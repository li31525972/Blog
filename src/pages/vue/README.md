# 基础知识

## 简介
`Vue`是一套用于构建页面的渐进式框架，何为渐进式？ 可以理解为按需引入功能，不像jQuery一样一下全部引入

## 虚拟DOM
- `Vue`通过建立一个虚拟DOM来追踪自己要如何改变真实DOM
```vue
return createElement('h1', this.blogTitle)
```
`createElement` 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 `createNodeDescription`，
因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，
也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。
[选自官网](https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM)

## 模板语法
### 插值
```vue
<span>{{ msg }}</span>
<!--更新元素的 textContent。-->
<span v-text="msg"></span>
<!--更新元素的 innerHTML。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。-->
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
<font color='red'><b>注意：当v-if和v-else中的元素是一样的时候请加key, 
默认情况下，Vue在元素一样的时候不会进行元素的替换，而是修补元素，替换不一样的部分。
[详情请看官网介绍](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)</b></font>

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
<font color='red'><p>注意：计算属性是基于他们的响应式依赖进行缓存的，只有相关响应式依赖发生改变才会重新计算，对于数组的更新检测，Vue改写了数组的几个方法以支持检测[详情请看官网](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)</p></font>


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
- 一般而言计算属性用于数组，监听器用于对象

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
### 单文件组件
```vue
<template></template>
<script ></script>
<style></style>

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
### props
```vue
<!--基础使用，实战当中不建议这么使用-->
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
<!--在实战当中需要进行类型检测，从而在使用的时候出现错误可以在控制台提示用户, 支持的类型有-->
String、Number、Boolean、Array、Object、Date、Function、symbol

props: {
    propA: {
        type: Number, // 多个类型 [String, Number]
        required: false, // 是否必传
        default: 100, // 或者可以是一个自定义验证函数
    }
}

```
<font color='red'><b>注意：prop是在组件实例创建之前验证的，所以实例的property是不可用的</b></font>

## 可复用性&组合
### 混入
- 混入提供了一种非常灵活的方式，来分发Vue组件中的可复用功能，一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有的混入对象的选项都将被混合到该组件本身的选项
```vue
var mixins = {
    created(){},
    methods: {}
    ...
}
```
- 当组件和混入对象含有同名选项时， 这些选项将以恰当的方式进行合并(以组件优先)
- 同名的钩子函数将合并为一个数组，都将被调用，注意：混入对象的钩子在组件自身的钩子之前调用
- Vue.extend() 也使用同样的策略进行合并。

### 全局混入
```vue
Vue.mixin() // 不推荐使用、实战当中没有找到非它不可的应用场景
```

### 自定义选项合并策略
```vue
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```
- 目前没有用到过，[使用请看官网](https://cn.vuejs.org/v2/guide/mixins.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5)

### 自定义指令
- 全局指令
```vue
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

- 局部指令
```vue
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```
<font color='red'><b>个人觉得：全局指令可以使用，具体打包的时候是否每个js文件都有有待研究</b></font>
- 钩子函数
```vue
directives: {
    focus: {
        <!--只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。-->
        bind(el, binding, vnode){
        },
        
        <!--被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。-->
        inserted(el, binding, vnode) {
        },
        
        <!--所在组件的vNode更新时调用，但是可能发生在其子 VNode 更新之前。-->
        update(el, binding, vnode, oldVnode){ 
        },
        
        <!--指令所在组件的VNode及其子VNode全部更新后调用-->
        componentUpdated(el, binding, vnode, oldVnode){
        },
        
        <!--只调用一次，指令与元素解绑时调用-->
        unbind(el, binding, vnode){
        },
    }
}
```
参数详解[请看官网](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)

- 指令传参
1. `v-pin="200"`  通过`binding.value`获取
2. `v-pin:[direction]="200"`  通过`binding.arg`获取direction， 通过`binding.value`获取值
3. `v-demo="{ color: 'white', text: 'hello!' }"`  对象形式 `binding.value.color`来获取

<font color='red'>
<b>指令在实战当中主要用在什么场景呢，细想多年开发经验 -> 操作DOM</b>
<p>1. 像官网例子操作表单的焦点事件</p>
<p>2. 项目当中使用的动态数据权限</p>
<p>3. 防抖节流实现等等</p>
<p>注意：个人觉得防抖节流的实现还是应该在封装的ajax上面做处理，毕竟DOM操作是最耗资源的(请自行查找DOM操作成本)</p>
</font>

### 过滤器
- 过滤器可以用在两个地方：双花括号插值和 v-bind 表达式
```vue
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

- 全局过滤器
```vue
<!--过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。-->
Vue.filter('过滤器名称', 过滤函数)

<!--过滤器可以串联-->
{{ message | filterA | filterB }}

```

- 局部过滤器
```vue
filters: {
  过滤器名称: function (value) {} // 过滤器函数
}
```

### 渲染函数&JSX
```vue
{
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
```
- `createElement` 参数
```vue
createElement(
    <!--{String | Object | Function} 一个HTML标签名、组件选项对象或者resolve了上述任何一种的一个async函数-->
    'div',
    <!--一个与模板中 attribute 对应的数据对象。可选。-->
    {
        <!--与 `v-bind:class` 的 API 相同，-->
        'class': {},
        <!--与 `v-bind:style` 的 API 相同，-->
        'style': {},
        <!--普通的 HTML attribute-->
        'attrs': {
            id: 'foo'
        },
        <!--组件 prop-->
        props: {},
        <!--DOM property-->
        domProps: {},
        <!--事件监听，不再支持如 `v-on:keyup.enter` 这样的修饰器，需要在处理函数中手动检查 keyCode。-->
        on: {
            click: this.clickHandler
        },
        <!--仅用于组件，用于监听原生事件，而不是组件内部使用-->
        <!--`vm.$emit` 触发的事件。-->
        nativeOn: {
            click: this.nativeClickHandler
        },
        <!--自定义指令。注意，你无法对 `binding` 中的 `oldValue`-->
        <!--赋值，因为 Vue 已经自动为你进行了同步。-->
        directives: [
            {
                name: 'my-custom-directive',
                value: '2',
                expression: '1 + 1',
                arg: 'foo',
                modifiers: {
                    bar: true
                }
            }
        ],
        <!--作用域插槽的格式为-->
        <!--{ name: props => VNode | Array<VNode> }-->
        scopedSlots: {
            default: props => createElement('span', props.text)
        },
        <!--如果组件是其它组件的子组件，需为插槽指定名称-->
        slot: 'name-of-slot',
        <!--其它特殊顶层 property-->
        key: 'myKey',
        ref: 'myRef',
        <!--如果你在渲染函数中给多个元素都应用了相同的 ref 名，-->
        <!--那么 `$refs.myRef` 会变成一个数组。-->
        refInFor: true,
    },
    <!--子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，-->
    ['子节点内容'],
)
```
- 渲染函数的事件&按键修饰符
[请看官网介绍](https://cn.vuejs.org/v2/guide/render-function.html#%E4%BA%8B%E4%BB%B6-amp-%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- 插槽
```vue
<!--基础用法，通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组：-->
createElement('div', this.$slots.default)

<!--也可以通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数-->
render: function (createElement) {
  <!--`<div><slot :text="message"></slot></div>`-->
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.message
    })
  ])
}
<!--如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据对象中的 scopedSlots 字段：-->
render: function (createElement) {
  <!--`<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`-->
  return createElement('div', [
    createElement('child', {
      <!--在数据对象中传递 `scopedSlots`-->
      <!--格式为 { name: props => VNode | Array<VNode> }-->
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}

```
[函数式组件请看官网](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)


## 插件

### 使用插件
- 使用插件，通过全局方法`Vue.use()`使用插件，需要在 `new Vue()`之前完成，
- Vue.js 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use()。然而在像 CommonJS 这样的模块环境中，你应该始终显式地调用 Vue.use()：
```vue
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')

// 不要忘了调用此方法
Vue.use(VueRouter)
```
### 开发插件
- Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
```vue
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

## 响应式原理
[请看官网介绍](https://cn.vuejs.org/v2/guide/reactivity.html)这里不做原理性的介绍


## 全局配置
全新内容请看[官网](https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE)
###  silent 取消Vue所有的日志与警告
```vue
Vue.config.cilent = true
```
<font color='red'>生产环境取消：Vue.config.cilent = process.env.NODE_ENV === 'production'</font>

### optionMergeStrategies 自定义选项的混入策略
```vue
Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
  return child + 1
}
```
<font color='red'>没有用到过</font>

### devtools 是否允许 vue-devtools 检查代码。
```vue
<!--开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查。-->
Vue.config.devtools = true

```
<font color='red'>为了数据安全考虑，在生产环境不使用</font>

### errorHandler 错误拦截
```vue
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
```

### warnHandler 警告拦截
```vue
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
```
### keyCodes 自定义按键别名
```vue
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}
```

### performance 性能追踪
```vue
<!--设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器上。-->
Vue.config.performance = true
```

### productionTip 生产提示
```vue
<!--设置为 false 以阻止 vue 在启动时生成生产提示。-->
Vue.config.productionTip = false

```
## 全局API
全新内容请看[官网](https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API)
### Vue.extend( options )
```vue
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
<!--创建 Profile 实例，并挂载到一个元素上。-->
new Profile().$mount('#mount-point')
```
### Vue.nextTick
```vue
<!--Vue.nextTick( [callback, context] )-->
<!--修改数据-->
vm.msg = 'Hello'
<!--DOM 还没有更新-->
Vue.nextTick(function () {
  <!--DOM 更新了-->
})

<!--作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)-->
Vue.nextTick()
  .then(function () {
    <!--DOM 更新了-->
  })
```
### Vue.set
```vue
<!--向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')-->
<!--Vue.set( target, propertyName/index, value )-->
Vue.set(this.xxx, key, value)
```

### Vue.delete
```vue
<!--Vue.delete( target, propertyName/index )-->
Vue.delete(this.xxx, key/index)
```
### Vue.compile( template )
```vue
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```
### Vue.observable( object )
```vue
<!--在 Vue 2.x 中，被传入的对象会直接被 Vue.observable 变更，所以如这里展示的，它和被返回的对象是同一个对象。在 Vue 3.x 中，则会返回一个可响应的代理，而对源对象直接进行变更仍然是不可响应的。因此，为了向前兼容，我们推荐始终操作使用 Vue.observable 返回的对象，而不是传入源对象。-->
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```

### Vue.version 版本号
```vue
let version = Vue.version
```

## 生命周期钩子
### beforeCreate
- 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

### created
- 实例创建完毕后调用

### beforeMount
- 在挂载开始之前调用

### mounted
- 实例挂载后调用，这时候el已经被新创建的vm.$el替换了。
<font color='red'><b>注意：mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick：</b></font>
```vue
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

### beforeUpdate
- 数据更新前调用

### updated
- 数据更新后调用
<font color='red'><b>注意：避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。</b></font>

### beforeDestory
- 实例销毁之前调用，这时实例仍然可用

### destroyed
- 实例销毁后调用

### errorCaptured
- 子组件错误拦截

### activated
- `keep-alive`缓存的组件激活时调用

### deactivated
- `keep-alive`缓存的组件停用时调用

## 组合
### parent
- 指定已创建的实例之父实例，子实例可以用 `this.$parent` 访问父实例
<font color='red'><b>注意：应急方法，不推荐使用</b></font>

### extends
```vue
<!--允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。-->
var CompA = { ... }

// 在没有调用 `Vue.extend` 时候继承 CompA
var CompB = {
  extends: CompA,
  ...
}

```

### provide / inject
- 详情请看[官网](https://cn.vuejs.org/v2/api/#provide-inject)
<font color='red'><b>注意：provide 和 inject 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。</b></font>

## 其他
### name
- 允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。

### delimiters
```vue
<!--改变纯文本插入分隔符。这个选项只在完整构建版本中的浏览器内编译时可用。-->
new Vue({
  delimiters: ['${', '}']
})

// 分隔符变成了 ES6 模板字符串的风格

```
### functional
- 使组件无状态 (没有 data) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使它们渲染的代价更小。

### model 
- 允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，
但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。
```vue
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  },
  // ...
})

<my-checkbox v-model="foo" value="some value"></my-checkbox>

<!--上述代码相当于：-->
<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>

```
### inheritAttrs
- 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。
而通过 (同样是 2.4 新增的) 实例 property $attrs 可以让这些 attribute 生效，且可以通过 v-bind 显性的绑定到非根元素上。

<font color='red'><p>注意：这个选项不影响 class 和 style 绑定。</p></font>

### comments
- 当设为 true 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们。(这个选项只在完整构建版本中的浏览器内编译时可用。)

## 实例
### vm.$data
- Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问。

### vm.$props
- 当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问。

### vm.$el
- Vue 实例使用的根 DOM 元素。

### vm.$options
- 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
```vue
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // => 'foo'
  }
})
```
### vm.$parent
- 父实例，如果当前实例有的话。

### vm.$root
- 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。
  
### vm.$children
- 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，
考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。

### vm.$slots
- 用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。
default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。

### vm.$scopedSlots
- 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。

### vm.$refs
- 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

### vm.$isServer
- 当前 Vue 实例是否运行于服务器。

### vm.$attrs
- 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，
这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

### vm.$listeners
- 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

### vm.$on( event, callback )
- 监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。

### vm.$once( event, callback )
- 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
<font color='red'><p>没有用到过</p></font>

### vm.$off( [event, callback] )
- 移除自定义事件监听器。
- 如果没有提供参数，则移除所有的事件监听器；
- 如果只提供了事件，则移除该事件所有的监听器；
- 如果同时提供了事件与回调，则只移除这个回调的监听器。

### vm.$emit( eventName, […args] )
- 触发当前实例上的事件。附加参数都会传给监听器回调。

### vm.$mount( [elementOrSelector] )
- 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
- 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
- 这个方法返回实例自身，因而可以链式调用其它实例方法。

### vm.$forceUpdate()
- 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

### vm.$nextTick( [callback] )
- 参考`Vue.nextTick()`

### vm.$destroy()
- 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
- 触发 beforeDestroy 和 destroyed 的钩子。
<font color='red'><p>注意：最好使用 v-if 和 v-for 指令以数据驱动的方式控制子组件的生命周期。</p></font>

## 其它指令
### v-pre
- 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

### v-cloak
- 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，
这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

### v-once
- 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于<font color='red'><b>优化更新性能</b></font>。

## 特殊属性 attribute
### key
- key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，
Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，
它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
```vue
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```
- 当 `text` 发生改变时，`<span>` 总是会被替换而不是被修改，因此会触发过渡。
  
### ref
- ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，
引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- 关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$refs 也不是响应式的，
因此你不应该试图用它在模板中做数据绑定。

### is
- 用于动态组件且基于 DOM 内模板的限制来工作。
```vue
<!-- 当 `currentView` 改变时，组件也跟着改变 -->
<component v-bind:is="currentView"></component>

<!-- 这样做是有必要的，因为 `<my-row>` 放在一个 -->
<!-- `<table>` 内可能无效且被放置到外面 -->
<table>
  <tr is="my-row"></tr>
</table>
```

## 内置组件
### component
- 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。
```vue
<!-- 动态组件由 vm 实例的 `componentId` property 控制 -->
<component :is="componentId"></component>

<!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
<component :is="$options.components.child"></component>
```

### transition
- `<transition>` 元素作为单个元素/组件的过渡效果。`<transition>` 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在可被检查的组件层级中。
1. props
- `name` - string，用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为 .fade-enter，.fade-enter-active 等。默认类名为 "v"
- `appear` - boolean，是否在初始渲染时使用过渡。默认为 false。
- `css` - boolean，是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。
- `type` - string，指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。
- `mode` - string，控制离开/进入过渡的时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时进行。
- `duration` - number | { enter: number, leave: number } 指定过渡的持续时间。默认情况下，Vue 会等待过渡所在根元素的第一个 transitionend 或 animationend 事件。
- `enter-class` - string
- `leave-class` - string
- `appear-class` - string
- `enter-to-class` - string
- `leave-to-class` - string
- `appear-to-class` - string
- `enter-active-class` - string
- `leave-active-class` - string
- `appear-active-class` - string

2. event
- `before-enter`
- `before-leave`
- `before-appear`
- `enter`
- `leave`
- `appear`
- `after-enter`
- `after-leave`
- `after-appear`
- `enter-cancelled`
- `leave-cancelled` (v-show only)
- `appear-cancelled`


### transition-group
没有使用过，请看[官网](https://cn.vuejs.org/v2/api/#transition-group)

### keep-alive
- props
include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例。

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，
`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。
当组件在 `<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
```vue
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```
<font color='red'><b>在 2.2.0 及其更高版本中，`activated` 和 `deactivated` 将会在 `<keep-alive>` 树内的所有嵌套组件中触发。</b></font>

### slot
- `<slot>` 元素作为组件模板之中的内容分发插槽。`<slot>` 元素自身将被替换。
```vue
<!--props-->
name - string，用于命名插槽。

```

# 文件加载部分
- `dist/vue.runtime.esm.js`加载的时候是用了这个文件，可以去到这个里面去看
- 这部分仅仅只是文件加载，只需要看加载的时候对`Vue`的扩展，不需要看实现

## 源码目录介绍
```
|-- dist                编译后的js文件
|-- examples            官方提供的Vue使用例子
|-- flow                Facebook推出的一款JavaScript静态类型检查器，和typescript类似
|-- packages            ssr渲染、Vue模板编译、weex模板编译
|-- scripts             打包脚本的一些配置
|-- src                 Vue核心源码目录
    |-- compiler        编译相关代码
        |-- components  内置组件代码
        |-- global-api  全局API代码
        |-- instance    实例化相关代码
        |-- observer    响应式数据相关
        |-- util        工具方法
        |-- vdom        虚拟dom相关代码
    |-- core            核心代码
    |-- platforms       跨平台代码
        |-- web         web端
        |-- weex        native端
    |-- server          服务端渲染相关代码
    |-- sfc             转换.vue后缀单文件
    |-- shared          全局共享的变量/方法
|-- test                测试用例
|-- types               typescript的类型配置
|-- .babelrc.js         babel配置选项
|-- .editorconfig       文本编码配置文件
|-- .eslintignore       eslint规则忽略文件
|-- .eslintrc.js        eslint配置文件
|-- .flowconfig         flow配置文件
```

## 入口文件
- 从下面源码可以看出该文件定义了`Vue`并且执行了几个`init`方法，最后将`Vue`导出
```js
// 执行了 src/core/instance/index.js
// 源码部分
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// Vue的本质是一个Class，new Vue 就是创建一个Vue的实例
function Vue (options) {
    // 在非生产环境并且当前this是Vue的实例，抛出错误信息：Vue是一个构造函数，应该使用' new '关键字调用它
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    // 同时执行this._init()这个初始化的方法 并将options传入
  this._init(options)
  /*
  *     this._init()是Vue原型上的一个方法，那么这个方法是什么时候定义的呢？
  *     看上面的源码部分，该文件在加载的时候执行了一堆的 mixin, 而 this._init() 原型方法就是在 initMixin(Vue) 中定义的 
  * */ 
}
// 原型上添加 _init 方法 
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

## initMixin
- 该方法文件加载的时候做的事情就比较简单了，就是为Vue的原型添加了`_init`方法，内部的代码不会执行
```js
function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        
    }
}
```

## stateMixin
- 主要改写`Vue`原型上的`$data、$props`的`get、set`方法，定义了`$set、$delete、$watch`方法
```js
export function stateMixin(Vue) {
    // 定义 dataDef 对象，改写 dataDef 对象的 get 方法，访问它就是访问 dataDef 的 _data 属性
    const dataDef = {}
    dataDef.get = function () {
        return this._data
    }
        
    // 定义 propsDef 对象，改写 propsDef 对象的 get 方法，访问它就是访问 propsDef 的 _props 属性
    const propsDef = {}
    propsDef.get = function () {
        return this._props
    }
    // 开发环境改写 dataDef 的 set 属性 propsDef 的 set 属性
    if (process.env.NODE_ENV !== 'production') {
        // 当为 dataDef 重新赋值的时候抛出一个错误信息：避免替换实例根元素
        dataDef.set = function () {
            warn(
                    'Avoid replacing instance root $data. ' +
                    'Use nested data properties instead.',
                    this
            )
        }
        // 当为 propDef 赋值的时候抛出错误信息：$props 是一个只读属性
        propsDef.set = function () {
            warn(`$props is readonly.`, this)
        }
    }
    // 改写Vue 原型的 $data 属性，当赋值的时候抛出错误信息： 避免替换实例根元素
    Object.defineProperty(Vue.prototype, '$data', dataDef)
    // 改写Vue 原型的 $props 属性，当赋值的时候抛出错误信息： $props 是一个只读属性
    Object.defineProperty(Vue.prototype, '$props', propsDef)
    
    // 重新定义原型上的 $set、$delete 和 $watch 
    Vue.prototype.$set = set // 函数
    Vue.prototype.$delete = del // 函数
    
    // 函数内部不用看
    Vue.prototype.$watch = function ( expOrFn, cb, options) {
        const vm = this
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {}
        options.user = true
        const watcher = new Watcher(vm, expOrFn, cb, options)
        if (options.immediate) {
            try {
                cb.call(vm, watcher.value)
            } catch (error) {
                handleError(error, vm, `callback for immediate watcher "${ watcher.expression }"`)
            }
        }
        return function unwatchFn() {
            watcher.teardown()
        }
    }
}
```


## eventsMixin
- 为`Vue`的原型添加了`$on、$once、$off、$emit`方法
```js
function eventsMixin(Vue) {
    const hookRE = /^hook:/
    Vue.prototype.$on = function () {}
    Vue.prototype.$once = function () {}
    Vue.prototype.$off = function () {}
    Vue.prototype.$emit = function () {}
}
```

## lifecycleMixin
- 为`Vue`的原型添加`_update、$forceUpdate、$destroy`方法
```js
function lifecycleMixin(Vue) {
    Vue.prototype._update = function () {}
    Vue.prototype.$forceUpdate = function () {}
    Vue.prototype.$destroy = function () {}
}
```

## renderMixin
```js
function renderMixin(Vue) {
    // 这个 installRenderHelpers 做了什么看下面 installRenderHelpers 介绍
    installRenderHelpers(Vue.prototype)
    
    Vue.prototype.$nextTick = function () {}
    Vue.prototype._render = function () {}
}
```

### installRenderHelpers
- 为`Vue`的原型添加了一系列的属性和方法
```js
export function installRenderHelpers (target) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
}
```

## initGlobalAPI
- 初始化全局API，为`Vue`添加静态属性和方法，插件安装，全局组件注册、全局混入
```js
// 入口文件为：src/core/global-api/index.js
export function initGlobalAPI(Vue) {
    // config
    const configDef = {}
    configDef.get = () => config
    if (process.env.NODE_ENV !== 'production') {
        configDef.set = () => {
            warn(
                    'Do not replace the Vue.config object, set individual fields instead.'
            )
        }
    }
    // 改写Vue config属性的 get set 方法
    Object.defineProperty(Vue, 'config', configDef)
    
    // 定义属性 util set delete nextTick observable options
    Vue.util = {
        warn,
        extend,
        mergeOptions,
        defineReactive
    }
    
    Vue.set = set
    Vue.delete = del
    Vue.nextTick = nextTick
    
    // 2.6 explicit observable API
    Vue.observable = (obj) => {
        observe(obj)
        return obj
    }
    
    Vue.options = Object.create(null)
    // Vue options 添加 components filters directives 属性
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })
    
    // Vue 挂载到 options._base 上面
    Vue.options._base = Vue
    
    // 将 keep-alive 组件添加到全局组件上
    extend(Vue.options.components, builtInComponents)
    
    // 为`Vue`添加`use`方法，第三方插件注册
    initUse(Vue)
    // 为 Vue 添加静态方法 mixin
    initMixin(Vue)
    // 为`Vue`添加静态方法`extend`
    initExtend(Vue)
    initAssetRegisters(Vue)
}

function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to
}
```

### initUse
- 为`Vue`添加`use`方法，第三方插件注册
```js
function initUse(Vue) {
    Vue.use = function (plugin) {
        // 获取当前插件
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        // 插件中存在当前插件直接返回
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }
        
        // 将插件的参数从伪数组转化为真数组
        const args = toArray(arguments, 1)
        // 将Vue 存到 args 里
        args.unshift(this)
        // 判断插件是否有 install 方法并且调用，将参数重新返回去，并且将 Vue 放在第一个参数
        if (typeof plugin.install === 'function') {
            
            plugin.install.apply(plugin, args)
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args)
        }
        // 存储当前插件，return Vue
        installedPlugins.push(plugin)
        return this
    }
}

// 第一个参数是插件本身，所以不需要
function toArray(list, start) {
    start = start || 0
    let i = list.length - start
    const ret = new Array(i)
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret
}
```

### initMixin
```js
function initMixin(Vue) {
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin)
        return this
    }
}
```

### initExtend
- 为`Vue`添加静态方法`extend`
```js
export function initExtend(Vue) {
    
    Vue.cid = 0
    let cid = 1

    Vue.extend = function (extendOptions) {
        
    }
}
```

### initAssetRegisters
- 为`Vue`添加静态方法 `component、filter、directive` 
```js
export function initAssetRegisters(Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(type => {
        Vue[type] = function (id, definition) {
            
        }
    })
}
```


<font color="red"><b>总结：文件加载的时候为`Vue`的原型扩展了一系列的属性和方法，有：`_init、$data、$props、$watch、$on、$once、$off、$emit、$nextTick、_render、_o、_n、_s、...`等等</b></font>









<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

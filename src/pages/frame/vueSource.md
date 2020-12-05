# Vue 源码解析

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

## new Vue初始化部分
- 在`new Vue`的时候发生了什么呢？ 看源码
### 源码
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

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

## initMixin
### 源码解析
```js

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

// Vue初始化方法，接收一个参数Vue
export function initMixin (Vue: Class<Component>) {
    // 在Vue的原型上面添加一个方法 _init， 该方法主要做一系列的初始化事情
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    // 在非生产环境 并且 config.performance为true(开启性能追踪) 并且 当前浏览器支持 performance API时，开启性能追踪
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    vm._isVue = true
    // 合并 options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
        /*
        * 
        * */
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    // 如果不是生产环境执行 initProxy
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
        // 生产环境将 vm_renderProxy 指向当前 vm
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm) // 初始化生命周期
    initEvents(vm) // 初始化事件中心
    initRender(vm) // 初始化 render
    callHook(vm, 'beforeCreate') // 调用当前实例的 beforeCreate钩子函数
    initInjections(vm) // resolve injections before data/props
    initState(vm) // 初始化属性 data、methods等
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    // 在非生产环境 并且 config.performance为true(开启性能追踪) 并且 当前浏览器支持 performance API时，开启性能追踪
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    // 判断是否传入el
    if (vm.$options.el) {
        // 挂载el
      vm.$mount(vm.$options.el)
    }
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}

```

### initLifecycle 初始化生命周期
```js
// vm 当前文件的实例
initLifecycle(vm)


```

### initEvents 初始化事件中心
```js
// vm 当前文件的实例
initEvents(vm)


```

### initRender 初始化render
```js
// vm 当前文件的实例
initRender(vm)


```

### callHook 
```js
// vm 当前文件的实例
callHook(vm, 'beforeCreate')


```

### initInjections 
```js
// vm 当前文件的实例
initInjections(vm)


```

### initState 初始化state
```js
// vm 当前文件的实例
initState(vm)

export function initState(vm: Component) {
    // 创建一个观察者
    vm._watchers = []
    const opts = vm.$options
    // 如果定义props初始化props
    if (opts.props) {
        initProps(vm, opts.props)
    }
    // 如果定义methods初始化methods
    if (opts.methods) {
        initMethods(vm, opts.methods)
    }
    // 如果定义data初始化data
    if (opts.data) {
        initData(vm)
    } else {
        
        observe(vm._data = {}, true /* asRootData */)
    }
    // 如果定义computed初始化computed
    if (opts.computed) {
        initComputed(vm, opts.computed)
    }
    // nativeWatch = ({}).watch Firefox has a "watch" function on Object.prototype... 火狐在Object.prototype上面有watch?
    // 如果定义watch并且当前的属性的watch和火狐上面watch不是指向同一个？ 初始化watch
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}


// 初始化props
function initProps(vm: Component, propsOptions: Object) {
    const propsData = vm.$options.propsData || {}
    const props = vm._props = {}
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    const keys = vm.$options._propKeys = []
    const isRoot = !vm.$parent
    // root instance props should be converted
    if (!isRoot) {
        toggleObserving(false)
    }
    for (const key in propsOptions) {
        keys.push(key)
        const value = validateProp(key, propsOptions, propsData, vm)
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            const hyphenatedKey = hyphenate(key)
            if (isReservedAttribute(hyphenatedKey) ||
                    config.isReservedAttr(hyphenatedKey)) {
                warn(
                        `"${ hyphenatedKey }" is a reserved attribute and cannot be used as component prop.`,
                        vm
                )
            }
            defineReactive(props, key, value, () => {
                if (!isRoot && !isUpdatingChildComponent) {
                    warn(
                            `Avoid mutating a prop directly since the value will be ` +
                            `overwritten whenever the parent component re-renders. ` +
                            `Instead, use a data or computed property based on the prop's ` +
                            `value. Prop being mutated: "${ key }"`,
                            vm
                    )
                }
            })
        } else {
            defineReactive(props, key, value)
        }
        // static props are already proxied on the component's prototype
        // during Vue.extend(). We only need to proxy props defined at
        // instantiation here.
        if (!(key in vm)) {
            proxy(vm, `_props`, key)
        }
    }
    toggleObserving(true)
}


// 初始化data
function initData(vm: Component) {
    // 获取实例配置中的data，就是new Vue 时候传入的data
    let data = vm.$options.data
    /**
    * 判断data是不是一个函数，如果是函数那么 call一下这个data，改变他的this指向，指向vm
    * 如果不是一个函数那么判断data是否存在，存在直接使用data，不存在使用空对象
    * 最后将值赋值给vm._data 和 data
    */
    data = vm._data = typeof data === 'function'
                      ? getData(data, vm)
                      : data || {}
                      
            // isPlainObject 判断传入的参数是不是一个对象          
    if (!isPlainObject(data)) {
        // 如果不是对象，那么赋值data为一个对象，并且如果不是生产环境那么就抛出一个警告信息：data函数应该返回一个对象
        data = {}
        process.env.NODE_ENV !== 'production' && warn(
                'data functions should return an object:\n' +
                'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
                vm
        )
    }
    // proxy data on instance
    // 拿到data的key、以及props和methods
    const keys = Object.keys(data)
    const props = vm.$options.props
    const methods = vm.$options.methods
    let i = keys.length
    // 遍历data中的key 进行对比
    while (i--) {
        const key = keys[i]
        // 判断当前如果不是生产环境
        if (process.env.NODE_ENV !== 'production') {
            // methods存在并且当前的key 在methods中也有，那么抛出一个警告信息：方法(key)已经被定义为一个属性
            if (methods && hasOwn(methods, key)) {
                warn(
                        `Method "${ key }" has already been defined as a data property.`,
                        vm
                )
            }
        }
        // props存在并且props的实例当中有当前这个key，抛出一个警告信息：当前这个key已经在prop中存在，请使用prop默认值
        if (props && hasOwn(props, key)) {
            process.env.NODE_ENV !== 'production' && warn(
                    `The data property "${ key }" is already declared as a prop. ` +
                    `Use prop default value instead.`,
                    vm
            )
            /*
            *   src/core/util/lang.js
            * isReserved 检测当前这个key是不是以 $或者_开头
            * export function isReserved (str: string): boolean {
                const c = (str + '').charCodeAt(0)
                return c === 0x24 || c === 0x5F
              }
            * */
        } else if (!isReserved(key)) {
            // 如果不是以$或者_开头，那么代理当前的key到 vm的_data上面
            proxy(vm, `_data`, key)
            
            // 为什么在.vue文件当中访问 this.xxx 就可以访问到data中的属性呢？
            // function proxy(target: Object, sourceKey: string, key: string) {
            //    访问当前的key的是否从当前的vm上面的_data上面获取
            //      也就是访问data中的属性的时候 this[key] 访问的其实是 this._data[key], 
            //     sharedPropertyDefinition.get = function proxyGetter() {
            //         return this[sourceKey][key]
            //     }
            //      修改值的时候修改vm._data[key]
            //     sharedPropertyDefinition.set = function proxySetter(val) {
            //         this[sourceKey][key] = val
            //     }
            //         将当前的key定义在 vm 上，
            //     Object.defineProperty(target, key, sharedPropertyDefinition)
            // }
            
            // const sharedPropertyDefinition = {
            //     enumerable: true, // 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
            //     configurable: true, // 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
            //     get: noop, // 空对象
            //     set: noop // 空对象
            // }
        }
    }
    // observe data
    // 对data 进行响应式处理
    observe(data, true /* asRootData */)
}

```

### initProvide 
```js
// vm 当前文件的实例
initProvide(vm)


```

### callHook 
```js
// vm 当前文件的实例
callHook(vm, 'created')


```

### initProxy
- 就是使用了`Proxy`API
- [MDN官网 Proxy](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/proxy)
- [阮一峰老师的讲解](https://es6.ruanyifeng.com/#docs/proxy)
```js
// 入口文件为 src/core/instance/proxy.js

    /*
    * 查看浏览器对于API的支持
    * */
    function isNative(Ctor: any): boolean {
        return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    }

    // 判断 Proxy 是否存在，并且当前环境支持 Proxy
    const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy)

    initProxy = function initProxy(vm) {
        // 判断当前环境是否支持Proxy，如果支持就会对实例进行代理
        if (hasProxy) {
            // determine which proxy handler to use
            // 获取当前实例的Options
            const options = vm.$options
            // 
            const handlers = options.render && options.render._withStripped
                    ? getHandler
                    : hasHandler
            // 这里定义的 _renderProxy 就是对 vm 进行了一层拦截，当访问 vm 的时候，去执行后面的 handlers 里面重新定义的方法
            vm._renderProxy = new Proxy(vm, handlers)
        } else {
            // 这一层是指当前环境没有 Proxy 或者是当前环境不支持 Proxy API时，将 _renderProxy 指向当前 vm
            vm._renderProxy = vm
        }
    }
    
    
    const hasHandler = {
        // 拦截 key in target 的操作，返回一个布尔值。
        has(target, key) {
            // 当前的 key 是否存在 目标对象 上
            const has = key in target
            /*
            * 
            * allowedGlobals 用来判断当前变量是否合法(是否是Vue内部保留关键字) 返回 Boolean 值
            * isAllowed 是关键字 或者 key是字符串 并且 _ 开头 并且 在 $data 上面没有定义
            * */
            const isAllowed = allowedGlobals(key) || (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data))
            
            if (!has && !isAllowed) {
                // key 在 target.$data 存在抛出错误信息：当前的key 在渲染期间使用但是没有在 实例上面定义
                if (key in target.$data) warnReservedPrefix(target, key)
                // 否则抛出错误信息：key 不是在实例上面定义的，不是响应式的，请在实例当中定义
                else warnNonPresent(target, key)
            }
            return has || !isAllowed
        }
    }

    const getHandler = {
        get(target, key) {
            if (typeof key === 'string' && !(key in target)) {
                if (key in target.$data) warnReservedPrefix(target, key)
                else warnNonPresent(target, key)
            }
            return target[key]
        }
    }
```



## $mount 源码解析
- `$mount`方法的实现是和平台、构建方式都相关的

### compiler版本
- 下面为web平台下的`compiler`版本的`$mount`实现
```js
// 源码入口文件为 src/platforms/web/entry-runtime-with-compiler.js

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

// 根据ID查询HTML元素，返回HTML元素
const idToTemplate = cached(id => {
    const el = query(id)
    return el && el.innerHTML
})

// 这里获取了Vue原型上面的$mount方法缓存到mount上，这个原型上面的方法是在 上面 import Vue from './runtime/index' 文件里定义的
// 可以去 ./runtime/index 文件去看，这里为什么要重新定义呢？是因为 runtime-only 版本没有下面的逻辑
const mount = Vue.prototype.$mount
// 重新定义Vue原型上面的$mount方法  vm.$mount(vm.$options.el)访问的就是这个方法
Vue.prototype.$mount = function (
        // 对传入的参数进行处理
        el?: string | Element, // el 可以是一个字符串或者是一个元素
        hydrating?: boolean
): Component {
    /*
    * return 出一个 element 元素
    * function query(el: string | Element): Element {
          // 如果el是字符串
          if (typeof el === 'string') {
              // 调用原生api document.querySelector方法获取文档中的el元素
              const selected = document.querySelector(el)
              // 如果el元素不存在，并且不是生产环境抛出警告：找不到元素 el, 同时创建一个空div return出去
              if (!selected) {
                  process.env.NODE_ENV !== 'production' && warn(
                          'Cannot find element: ' + el
                  )
                  return document.createElement('div')
              }
          // 如果存在return文档中的这个元素
              return selected
          } else {
              // 如果不是字符串，直接return出去这个dom对象，也就是说el参数可以是一个字符串或者dom对象
              return el
          }
      }
    * */
    // 这里是 判断el 有值那么执行 query方法，看上面
    el = el && query(el)
    
    /* istanbul ignore if */
    // 如果el是body或者html，抛出一个错误信息：不能将Vue挂载到 html或者body上面
    if (el === document.body || el === document.documentElement) {
        process.env.NODE_ENV !== 'production' && warn(
                `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
    }
    // 拿到当前实例的$options
    const options = this.$options
    // resolve template/el and convert to render function
    // 判断有没有render方法，如果没有render函数那么进入下面的操作
    if (!options.render) {
        // 获取template元素
        let template = options.template
        // 如果template元素存在
        if (template) {
            
            // 判断template是不是一个字符串
            if (typeof template === 'string') {
                // 判断template的第一个字符是不是`#`
                if (template.charAt(0) === '#') {
                    // idToTemplate 根据参数template调用query查询dom元素，返回innerHTML
                    template = idToTemplate(template)
                    /* istanbul ignore if */
                    // 如果不是生产环境并且template不存在，抛出一个错误信息：在options.template模板元素没有找到
                    if (process.env.NODE_ENV !== 'production' && !template) {
                        warn(
                                `Template element not found or is empty: ${ options.template }`,
                                this
                        )
                    }
                }
                // 根据nodeType判断template是不是一个节点
            } else if (template.nodeType) {
                // 如果是一个节点就将当前节点的innerHTML赋值给template
                template = template.innerHTML
            } else {
                // 否则在非生产环境下抛出一个错误信息：template是一个无效的模板选项
                if (process.env.NODE_ENV !== 'production') {
                    warn('invalid template option:' + template, this)
                }
                return this
            }
            
        // 如果el存在，
        } else if (el) {
            // 获取当前el序列化后的HTML片段赋值给template
            template = getOuterHTML(el)
            
            // 返回序列化后的HTML片段(dom字符串)
            // function getOuterHTML(el: Element): string {
            //      outerHTML属性获取描述元素（包括其后代）的序列化HTML片段。它也可以设置为用从给定字符串解析的节点替换元素。
            //      判断el是否存在outerHTML 有直接返回el.outerHTML
            //     if (el.outerHTML) {
            //         return el.outerHTML
            //     } else {
            //          没有就创建一个div将el元素克隆之后放入到这个div里同时 返回div的 innerHTML
            //         const container = document.createElement('div')
            //         container.appendChild(el.cloneNode(true))
            //         return container.innerHTML
            //     }
            // }
        }
        
        if (template) {
            /* istanbul ignore if */
            // 在非生产环境 并且 config.performance为true(开启性能追踪) 并且 当前浏览器支持 performance API时，开启性能追踪
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
                mark('compile')
            }
            
            const { render, staticRenderFns } = compileToFunctions(template, {
                outputSourceRange: process.env.NODE_ENV !== 'production',
                shouldDecodeNewlines,
                shouldDecodeNewlinesForHref,
                delimiters: options.delimiters,
                comments: options.comments
            }, this)
            options.render = render
            options.staticRenderFns = staticRenderFns
            
            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
                mark('compile end')
                measure(`vue ${ this._name } compile`, 'compile', 'compile end')
            }
        }
    }
    // return 调用缓存下来的$mount方法，同时将this指向当前实例，将el、hydrating传入进去
    return mount.call(this, el, hydrating)
}

export default Vue
```


### `runtime-only`版本`$mount`
```js
// 入口文件路径为 src/platforms/web/runtime/index.js
import Vue from 'core/index'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
    query,
    mustUseProp,
    isReservedTag,
    isReservedAttr,
    getTagNamespace,
    isUnknownElement
} from 'web/util/index'

// public mount method
Vue.prototype.$mount = function (
        el?: string | Element,
        hydrating?: boolean
): Component {
    // 对el进行判断
    el = el && inBrowser ? query(el) : undefined
    return mountComponent(this, el, hydrating)
}


function mountComponent(
        vm: Component,
        el: ?Element,
        hydrating?: boolean
): Component {
    // 将传入的el挂载到 vm.$el 上面
    vm.$el = el
    // 判断当前实例上面是否存在render函数
    if (!vm.$options.render) {
        /*
        * return 出一个内容是当前参数的虚拟dom
        * const createEmptyVNode = (text: string = '') => {
        *     创建一个虚拟dom
              const node = new VNode() // VNode 是一个自定义的虚拟dom的一个类
              node.text = text
              node.isComment = true
              return node
           }
        * */
        vm.$options.render = createEmptyVNode
        // 判断当前环境是不是非生产环境
        if (process.env.NODE_ENV !== 'production') {
            /* istanbul ignore if */
            // 当前实例template存在并且template第一个字符是# 或者 当前实例el存在 或者 传入的el存在，抛出错误信息：
            /*
            * '您使用的是仅运行时构建的Vue模板' + '编译器不可用。可以将模板预编译为' + 渲染函数，或使用编译器包含的构建。
            * 意思就是说 在使用了编译阶段运行的runtime-only版本时候，只能使用render函数进行构建，不支持 el 和 template选项
            * */
            if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                    vm.$options.el || el) {
                warn(
                        'You are using the runtime-only build of Vue where the template ' +
                        'compiler is not available. Either pre-compile the templates into ' +
                        'render functions, or use the compiler-included build.',
                        vm
                )
            } else {
                // 以上情况都不存在，抛出错误信息：因为没有定义模板或者render函数组件挂载失败
                warn(
                        'Failed to mount component: template or render function not defined.',
                        vm
                )
            }
        }
    }
    // 调用当前实例的钩子函数 beforeMount
    callHook(vm, 'beforeMount')

    let updateComponent
    /* istanbul ignore if */
    // 在非生产环境 并且 config.performance为true(开启性能追踪) 并且 当前浏览器支持 performance API时，开启性能追踪
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        updateComponent = () => {
            const name = vm._name
            const id = vm._uid
            const startTag = `vue-perf-start:${ id }`
            const endTag = `vue-perf-end:${ id }`

            mark(startTag)
            const vnode = vm._render()
            mark(endTag)
            measure(`vue ${ name } render`, startTag, endTag)

            mark(startTag)
            vm._update(vnode, hydrating)
            mark(endTag)
            measure(`vue ${ name } patch`, startTag, endTag)
        }
    } else {
        updateComponent = () => {
            /*
            * vm.render() 渲染出一个VNode，
            * hydrating false
            * vm._update 是在文件加载的时候在 src/core/instance/index.js 入口文件执行的 lifecycleMixin(Vue) 中挂载到 vm上面的
            * */
            vm._update(vm._render(), hydrating)
        }
    }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    /*
    * Watcher 这是一个渲染的 watcher 类， 定义在 src/core/observer/watcher.js 文件中，可以看下面 watcher 源码解析
    * vm 当前实例
    * updateComponent 函数，内部是一个Vue执行更新的一个函数
    * noop 一个空函数
    * {}, 一个配置项
    * true 是否是一个渲染函数
    * */
    new Watcher(vm, updateComponent, noop, {
        before() {
            if (vm._isMounted && !vm._isDestroyed) {
                callHook(vm, 'beforeUpdate')
            }
        }
    }, true /* isRenderWatcher */)
    hydrating = false

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
        vm._isMounted = true
        callHook(vm, 'mounted')
    }
    return vm
}

```

## watcher 
- `Vue`观察者模式的一个类
```js
import {
    warn,
    remove,
    isObject,
    parsePath,
    _Set as Set,
    handleError,
    noop
} from '../util/index'

import { traverse } from './traverse'
import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget } from './dep'

import type { SimpleSet } from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
    vm: Component;
    expression: string;
    cb: Function;
    id: number;
    deep: boolean;
    user: boolean;
    lazy: boolean;
    sync: boolean;
    dirty: boolean;
    active: boolean;
    deps: Array<Dep>;
    newDeps: Array<Dep>;
    depIds: SimpleSet;
    newDepIds: SimpleSet;
    before: ?Function;
    getter: Function;
    value: any;
    
    constructor(
            vm: Component, // vm 当前的实例
            expOrFn: string | Function, // 
            cb: Function, // 回调
            options?: ?Object, // 配置项 
            isRenderWatcher?: boolean // 是否是一个 渲染 watcher
    ) {
        this.vm = vm
        // 如果当前是渲染watcher，那么在vm._watcher 上面绑定当前的this
        if (isRenderWatcher) {
            vm._watcher = this
        }
        // push到所有的vm._watchers 里边
        vm._watchers.push(this)
        // 如果传入了options，对options做处理
        if (options) {
            this.deep = !!options.deep // 将options中的值转化为一个Boolean值
            this.user = !!options.user // 将options中的值转化为一个Boolean值
            this.lazy = !!options.lazy // 将options中的值转化为一个Boolean值
            this.sync = !!options.sync // 将options中的值转化为一个Boolean值
            this.before = options.before // 将options中传入的before函数挂载到 当前this上面
        } else {
            // 将deep、user、lazy、sync赋值为false
            this.deep = this.user = this.lazy = this.sync = false
        }
        this.cb = cb
        this.id = ++uid // uid for batching
        this.active = true
        this.dirty = this.lazy // for lazy watchers
        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()
        // 生产环境 对expOrFn进行 toString， 否则置空
        this.expression = process.env.NODE_ENV !== 'production'
                          ? expOrFn.toString()
                          : ''
        /*
         * expOrFn 如果是函数 赋值到当前this的getter上面，初始化的时候肯定是函数
         */
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            // 否则使用parsePath 进行转换，这个主要是用来 做 watch 监听属性的`a.b.c`的
            this.getter = parsePath(expOrFn)
            // expOrFn如果不是`a.b.c`这种格式，那么抛出一个错误信息：watcher只接受简单的`.`分隔路径 
            if (!this.getter) {
                this.getter = noop
                process.env.NODE_ENV !== 'production' && warn(
                        `Failed watching path: "${ expOrFn }" ` +
                        'Watcher only accepts simple dot-delimited paths. ' +
                        'For full control, use a function instead.',
                        vm
                )
            }
        }
        this.value = this.lazy
                     ? undefined
                     : this.get()
    }
    
    // const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F
    -\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
    // const bailRE = new RegExp(`[^${ unicodeRegExp.source }.$_\\d]`)
    // 
    // export function parsePath(path: string): any {
    //     if (bailRE.test(path)) {
    //         return
    //     }
    //     const segments = path.split('.')
    //     return function (obj) {
    //         for (let i = 0; i < segments.length; i++) {
    //             if (!obj) {
    //                 return
    //             }
    //             obj = obj[segments[i]]
    //         }
    //         return obj
    //     }
    // }
    
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get() {
        pushTarget(this)
        let value
        const vm = this.vm
        try {
            value = this.getter.call(vm, vm)
        } catch (e) {
            if (this.user) {
                handleError(e, vm, `getter for watcher "${ this.expression }"`)
            } else {
                throw e
            }
        } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value)
            }
            popTarget()
            this.cleanupDeps()
        }
        return value
    }
    
    /**
     * Add a dependency to this directive.
     */
    addDep(dep: Dep) {
        const id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }
    
    /**
     * Clean up for dependency collection.
     */
    cleanupDeps() {
        let i = this.deps.length
        while (i--) {
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }
    
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    update() {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true
        } else if (this.sync) {
            this.run()
        } else {
            queueWatcher(this)
        }
    }
    
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run() {
        if (this.active) {
            const value = this.get()
            if (
                    value !== this.value ||
                    // Deep watchers and watchers on Object/Arrays should fire even
                    // when the value is the same, because the value may
                    // have mutated.
                    isObject(value) ||
                    this.deep
            ) {
                // set new value
                const oldValue = this.value
                this.value = value
                if (this.user) {
                    try {
                        this.cb.call(this.vm, value, oldValue)
                    } catch (e) {
                        handleError(e, this.vm, `callback for watcher "${ this.expression }"`)
                    }
                } else {
                    this.cb.call(this.vm, value, oldValue)
                }
            }
        }
    }
    
    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
    evaluate() {
        this.value = this.get()
        this.dirty = false
    }
    
    /**
     * Depend on all deps collected by this watcher.
     */
    depend() {
        let i = this.deps.length
        while (i--) {
            this.deps[i].depend()
        }
    }
    
    /**
     * Remove self from all dependencies' subscriber list.
     */
    teardown() {
        if (this.active) {
            // remove self from vm's watcher list
            // this is a somewhat expensive operation so we skip it
            // if the vm is being destroyed.
            if (!this.vm._isBeingDestroyed) {
                remove(this.vm._watchers, this)
            }
            let i = this.deps.length
            while (i--) {
                this.deps[i].removeSub(this)
            }
            this.active = false
        }
    }
}
```

## render
```js
// 入口文件为 src/core/instance/render.js
// 会在Vue的入口文件加载时执行 renderMixin(Vue)

function renderMixin(Vue: Class<Component>) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype)
    
    Vue.prototype.$nextTick = function (fn: Function) {
        return nextTick(fn, this)
    }
    
    Vue.prototype._render = function (): VNode {
        const vm: Component = this
        // 从当前实例拿到 render 函数，这个函数可以通过用户自己写，或者是编译生成
        const { render, _parentVnode } = vm.$options
        
        if (_parentVnode) {
            vm.$scopedSlots = normalizeScopedSlots(
                    _parentVnode.data.scopedSlots,
                    vm.$slots,
                    vm.$scopedSlots
            )
        }
        
        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode
        // render self
        let vnode
        try {
            // There's no need to maintain a stack because all render fns are called
            // separately from one another. Nested component's render fns are called
            // when parent component is patched.
            currentRenderingInstance = vm
            /*
            * vm._renderProxy 定义在 init 方法里边
            * vm.$createElement 是在执行init的时候执行的 initRender 的时候定义的
            * */
            vnode = render.call(vm._renderProxy, vm.$createElement)
        } catch (e) {
            // 通过全局错误钩子抛出错误信息用以让用户收集处理
            handleError(e, vm, `render`)
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            // 当开发环境并且存在 renderError 那么会使用这个方法去查询 VNode 版本去对 VNode 进行降级
            if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
                try {
                    
                    vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
                } catch (e) {
                    handleError(e, vm, `renderError`)
                    vnode = vm._vnode
                }
            } else {
                vnode = vm._vnode
            }
        } finally {
            currentRenderingInstance = null
        }
        // 如果获取到的VNode 是单个节点，那么获取他数组内的元素
        if (Array.isArray(vnode) && vnode.length === 1) {
            vnode = vnode[0]
        }
        // 如果 获取到的 vnode 不是 VNode 的实例
        if (!(vnode instanceof VNode)) {
            // 在开发环境并且 vnode 是一个数组，抛出错误信息：每个根节点只能有一个 VNode
            if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
                warn(
                        'Multiple root nodes returned from render function. Render function ' +
                        'should return a single root node.',
                        vm
                )
            }
            // 对 vnode 赋值一个 空的 VNode
            vnode = createEmptyVNode()
        }
        // set parent
        vnode.parent = _parentVnode
        // 最后将 vnode 返回出去
        return vnode
    }
}
```

## Virtual DOM

### 真实DOM
```js
var span = document.querySelector('span')
var str = ''
for (var key in span) { 
    str += key + '' 
}
console.log(str)
// titlelangtranslatedirhiddenaccessKeydraggablespellcheckautocapitalizecontentEditableisContentEditableinputModeoffsetParentoffsetTopoffsetLeftoffsetWidthoffsetHeightstyleinnerTextouterTextonabortonbluroncanceloncanplayoncanplaythroughonchangeonclickoncloseoncontextmenuoncuechangeondblclickondragondragendondragenterondragleaveondragoverondragstartondropondurationchangeonemptiedonendedonerroronfocusonformdataoninputoninvalidonkeydownonkeypressonkeyuponloadonloadeddataonloadedmetadataonloadstartonmousedownonmouseenteronmouseleaveonmousemoveonmouseoutonmouseoveronmouseuponmousewheelonpauseonplayonplayingonprogressonratechangeonresetonresizeonscrollonseekedonseekingonselectonstalledonsubmitonsuspendontimeupdateontoggleonvolumechangeonwaitingonwebkitanimationendonwebkitanimationiterationonwebkitanimationstartonwebkittransitionendonwheelonauxclickongotpointercaptureonlostpointercaptureonpointerdownonpointermoveonpointeruponpointercancelonpointeroveronpointeroutonpointerenteronpointerleaveonselectstartonselectionchangeonanimationendonanimationiterationonanimationstartontransitionrunontransitionstartontransitionendontransitioncanceloncopyoncutonpastedatasetnonceautofocustabIndexattachInternalsblurclickfocusonpointerrawupdateenterKeyHintnamespaceURIprefixlocalNametagNameidclassNameclassListslotattributesshadowRootpartassignedSlotinnerHTMLouterHTMLscrollTopscrollLeftscrollWidthscrollHeightclientTopclientLeftclientWidthclientHeightattributeStyleMaponbeforecopyonbeforecutonbeforepasteonsearchelementTimingonfullscreenchangeonfullscreenerroronwebkitfullscreenchangeonwebkitfullscreenerroronbeforexrselectchildrenfirstElementChildlastElementChildchildElementCountpreviousElementSiblingnextElementSiblingafteranimateappendattachShadowbeforeclosestcomputedStyleMapgetAttributegetAttributeNSgetAttributeNamesgetAttributeNodegetAttributeNodeNSgetBoundingClientRectgetClientRectsgetElementsByClassNamegetElementsByTagNamegetElementsByTagNameNShasAttributehasAttributeNShasAttributeshasPointerCaptureinsertAdjacentElementinsertAdjacentHTMLinsertAdjacentTextmatchesprependquerySelectorquerySelectorAllreleasePointerCaptureremoveremoveAttributeremoveAttributeNSremoveAttributeNodereplaceWithrequestFullscreenrequestPointerLockscrollscrollByscrollIntoViewscrollIntoViewIfNeededscrollTosetAttributesetAttributeNSsetAttributeNodesetAttributeNodeNSsetPointerCapturetoggleAttributewebkitMatchesSelectorwebkitRequestFullScreenwebkitRequestFullscreenariaAtomicariaAutoCompleteariaBusyariaCheckedariaColCountariaColIndexariaColSpanariaCurrentariaDescriptionariaDisabledariaExpandedariaHasPopupariaHiddenariaKeyShortcutsariaLabelariaLevelariaLiveariaModalariaMultiLineariaMultiSelectableariaOrientationariaPlaceholderariaPosInSetariaPressedariaReadOnlyariaRelevantariaRequiredariaRoleDescriptionariaRowCountariaRowIndexariaRowSpanariaSelectedariaSetSizeariaSortariaValueMaxariaValueMinariaValueNowariaValueTextgetAnimationsreplaceChildrennodeTypenodeNamebaseURIisConnectedownerDocumentparentNodeparentElementchildNodesfirstChildlastChildpreviousSiblingnextSiblingnodeValuetextContentELEMENT_NODEATTRIBUTE_NODETEXT_NODECDATA_SECTION_NODEENTITY_REFERENCE_NODEENTITY_NODEPROCESSING_INSTRUCTION_NODECOMMENT_NODEDOCUMENT_NODEDOCUMENT_TYPE_NODEDOCUMENT_FRAGMENT_NODENOTATION_NODEDOCUMENT_POSITION_DISCONNECTEDDOCUMENT_POSITION_PRECEDINGDOCUMENT_POSITION_FOLLOWINGDOCUMENT_POSITION_CONTAINSDOCUMENT_POSITION_CONTAINED_BYDOCUMENT_POSITION_IMPLEMENTATION_SPECIFICappendChildcloneNodecompareDocumentPositioncontainsgetRootNodehasChildNodesinsertBeforeisDefaultNamespaceisEqualNodeisSameNodelookupNamespaceURIlookupPrefixnormalizeremoveChildreplaceChildaddEventListenerdispatchEventremoveEventListenertitle lang translate dir hidden accessKey draggable spellcheck autocapitalize contentEditable isContentEditable inputMode offsetParent offsetTop offsetLeft offsetWidth offsetHeight style innerText outerText onabort onblur oncancel oncanplay oncanplaythrough onchange onclick onclose oncontextmenu oncuechange ondblclick ondrag ondragend ondragenter ondragleave ondragover ondragstart ondrop ondurationchange onemptied onended onerror onfocus onformdata oninput oninvalid onkeydown onkeypress onkeyup onload onloadeddata onloadedmetadata onloadstart onmousedown onmouseenter onmouseleave onmousemove onmouseout onmouseover onmouseup onmousewheel onpause onplay onplaying onprogress onratechange onreset onresize onscroll onseeked onseeking onselect onstalled onsubmit onsuspend ontimeupdate ontoggle onvolumechange onwaiting onwebkitanimationend onwebkitanimationiteration onwebkitanimationstart onwebkittransitionend onwheel onauxclick ongotpointercapture onlostpointercapture onpointerdown onpointermove onpointerup onpointercancel onpointerover onpointerout onpointerenter onpointerleave onselectstart onselectionchange onanimationend onanimationiteration onanimationstart ontransitionrun ontransitionstart ontransitionend ontransitioncancel oncopy oncut onpaste dataset nonce autofocus tabIndex attachInternals blur click focus onpointerrawupdate enterKeyHint namespaceURI prefix localName tagName id className classList slot attributes shadowRoot part assignedSlot innerHTML outerHTML scrollTop scrollLeft scrollWidth scrollHeight clientTop clientLeft clientWidth clientHeight attributeStyleMap onbeforecopy onbeforecut onbeforepaste onsearch elementTiming onfullscreenchange onfullscreenerror onwebkitfullscreenchange onwebkitfullscreenerror onbeforexrselect children firstElementChild lastElementChild childElementCount previousElementSibling nextElementSibling after animate append attachShadow before closest computedStyleMap getAttribute getAttributeNS getAttributeNames getAttributeNode getAttributeNodeNS getBoundingClientRect getClientRects getElementsByClassName getElementsByTagName getElementsByTagNameNS hasAttribute hasAttributeNS hasAttributes hasPointerCapture insertAdjacentElement insertAdjacentHTML insertAdjacentText matches prepend querySelector querySelectorAll releasePointerCapture remove removeAttribute removeAttributeNS removeAttributeNode replaceWith requestFullscreen requestPointerLock scroll scrollBy scrollIntoView scrollIntoViewIfNeeded scrollTo setAttribute setAttributeNS setAttributeNode setAttributeNodeNS setPointerCapture toggleAttribute webkitMatchesSelector webkitRequestFullScreen webkitRequestFullscreen ariaAtomic ariaAutoComplete ariaBusy ariaChecked ariaColCount ariaColIndex ariaColSpan ariaCurrent ariaDescription ariaDisabled ariaExpanded ariaHasPopup ariaHidden ariaKeyShortcuts ariaLabel ariaLevel ariaLive ariaModal ariaMultiLine ariaMultiSelectable ariaOrientation ariaPlaceholder ariaPosInSet ariaPressed ariaReadOnly ariaRelevant ariaRequired ariaRoleDescription ariaRowCount ariaRowIndex ariaRowSpan ariaSelected ariaSetSize ariaSort ariaValueMax ariaValueMin ariaValueNow ariaValueText getAnimations replaceChildren nodeType nodeName baseURI isConnected ownerDocument parentNode parentElement childNodes firstChild lastChild previousSibling nextSibling nodeValue textContent ELEMENT_NODE ATTRIBUTE_NODE TEXT_NODE CDATA_SECTION_NODE ENTITY_REFERENCE_NODE ENTITY_NODE PROCESSING_INSTRUCTION_NODE COMMENT_NODE DOCUMENT_NODE DOCUMENT_TYPE_NODE DOCUMENT_FRAGMENT_NODE NOTATION_NODE DOCUMENT_POSITION_DISCONNECTED DOCUMENT_POSITION_PRECEDING DOCUMENT_POSITION_FOLLOWING DOCUMENT_POSITION_CONTAINS DOCUMENT_POSITION_CONTAINED_BY DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC appendChild cloneNode compareDocumentPosition contains getRootNode hasChildNodes insertBefore isDefaultNamespace isEqualNode isSameNode lookupNamespaceURI lookupPrefix normalize removeChild replaceChild addEventListener dispatchEvent removeEventListener "

// 从这里可以看出真实的DOM元素是非常庞大的，当我们频繁的去做DOM更新，会产生一定的性能问题

```
### VNode
- `Virtual DOM`就是用原生`JS`对象去描述一个`DOM`节点，`Vue`中是用`VNode`类去描述
- `VNode`只是用来映射真实`DOM`的渲染，不需要包含操作`DOM`的方法，因此它是非常轻量的
```js
// 入口文件为：src/core/vdom/vnode.js
// VNode 的定义
export default class VNode {
    constructor(tag, data, children, text, context, elm, componentOptions, asyncFactory) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.fnContext = undefined
        this.fnOptions = undefined
        this.fnScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }
    
    get child() {
        return this.componentInstance
    }
    
}
```

### createEmptyVNode
- 创建注释节点
```js
/*
* 创建一个注释节点
* 从内部的操作可以看出 text 对应的就是文本内容 
* isComment 固定值 true 
* */ 
const createEmptyVNode = text => {
    const node = new VNode()
    node.text = text
    node.isComment = true
    return node
}
```

### createTextVNode
- 创建文本节点
```js
/*
* 从上面的VNode的定义可以看出，createTextVNode 也只接受了一个参数 文本内容
* tag、data、children 都是 undefined
* */
function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}
```

### cloneVNode
- 克隆节点
```js
function cloneVNode(vnode) {
    const cloned = new VNode(
            vnode.tag, 
            vnode.data,
            vnode.children && vnode.children.slice(),
            vnode.text,
            vnode.elm,
            vnode.context,
            vnode.componentOptions,
            vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.fnContext = vnode.fnContext
    cloned.fnOptions = vnode.fnOptions
    cloned.fnScopeId = vnode.fnScpoeId
    cloned.asyncMeta = vnode.asyncMeta
    cloned.isCloned = true
    
    return cloned
}
```

## createElement
```js
// 入口文件为：src/core/vdom/create-element.js

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

// 将参数进行重载处理
export function createElement(
        context: Component, // vm 实例
        tag: any, // 标签
        data: any, // VNodeData
        children: any, // 子节点
        normalizationType: any, //
        alwaysNormalize: boolean //
): VNode | Array<VNode> {
    /*
    * 当data是数组 或者是基本类型对参数进行重载
    * */
    if (Array.isArray(data) || isPrimitive(data)) {
        normalizationType = children
        children = data
        data = undefined
    }
    // 手写的render函数做区分处理
    if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE
    }
    return _createElement(context, tag, data, children, normalizationType)
}

```


### _createElement
```js
export function _createElement(
        context: Component,
        tag?: string | Class<Component> | Function | Object,
        data?: VNodeData,
        children?: any,
        normalizationType?: number
): VNode | Array<VNode> {
    /*
    * data存在 并且 data.__ob__ 存在，抛出错误信息：VNodeData 不能是响应式的，返回一个 空VNode
    * */
    if (isDef(data) && isDef((data: any).__ob__)) {
        process.env.NODE_ENV !== 'production' && warn(
                `Avoid using observed data object as vnode data: ${ JSON.stringify(data) }\n` +
                'Always create fresh vnode data objects in each render!',
                context
        )
        // createEmptyVNode 可以理解为是一个注释节点
        return createEmptyVNode()
    }
    // 这个是判断 component 标签的 is 属性
    if (isDef(data) && isDef(data.is)) {
        tag = data.is
    }
    // 当这个 component is 属性是空的时候，返回一个 空VNode
    if (!tag) {
        return createEmptyVNode()
    }
    // 在开发环境对非基础类型的key做判断，抛出错误信息
    if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
        if (!__WEEX__ || !('@binding' in data.key)) {
            warn(
                    'Avoid using non-primitive value as key, ' +
                    'use string/number value instead.',
                    context
            )
        }
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) && typeof children[0] === 'function') {
        data = data || {}
        data.scopedSlots = { default: children[0] }
        children.length = 0
    }
    
    /*
    * 对手写的render的 children 做 递归处理 多维变一维
    * 对编译生成的render的 children 做 拉伸处理 二维变一维
    * */
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children)
    } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children)
    }
    let vnode, ns
    /*
    * 下面是创建 VNode 相关
    */
    // 标签名是字符串类型
    if (typeof tag === 'string') {
        let Ctor
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
        // 如果是原生标签
        if (config.isReservedTag(tag)) {
            // platform built-in elements
            if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
                warn(
                        `The .native modifier for v-on is only valid on components but it was used on <${ tag }>.`,
                        context
                )
            }
            // 创建一个Vue标签
            vnode = new VNode(config.parsePlatformTagName(tag), data, children,undefined, undefined, context)
            // 对组件进行解析
        } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
            // component
            vnode = createComponent(Ctor, data, context, children, tag)
        } else {
            // 没有识别的标签，创建一个VNode
            vnode = new VNode(tag, data, children,undefined, undefined, context)
        }
    } else {
        // 标签名是组件
        // direct component options / constructor
        vnode = createComponent(tag, data, context, children)
    }
    if (Array.isArray(vnode)) {
        return vnode
    } else if (isDef(vnode)) {
        if (isDef(ns)) {
            applyNS(vnode, ns)
        }
        if (isDef(data)) {
            registerDeepBindings(data)
        }
        return vnode
    } else {
        return createEmptyVNode()
    }
}
```

### simpleNormalizeChildren
```js
// 对 children 做处理，将数组降维处理，只拉平一次，也就是将二维数组变成一维
function simpleNormalizeChildren(children: any) {
    for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            /*
            * 相当于 [].cancat([0,1,[2,3],4])
            * cancat(连接一个或多个数组) 还能这么用？哎，孤陋寡闻了
            * */
            return Array.prototype.concat.apply([], children)
        }
    }
    return children
}
```

### normalizeChildren
```js
// 对于用户手写render的children做处理，返回一维数组
function normalizeChildren(children: any): ?Array<VNode> {
    // children是基础类型时 创建一个文本标签将children放到标签内
    return isPrimitive(children) ? [createTextVNode(children)] : 
            // 当children是数组时 对数组进行
           Array.isArray(children) ? normalizeArrayChildren(children) : undefined
}
```

### normalizeArrayChildren
- 对`children`进行递归处理成一维数组，并且对文本节点进行优化
```js
function normalizeArrayChildren(children: any, nestedIndex?: string): Array<VNode> {
    const res = []
    let i, c, lastIndex, last
    for (i = 0; i < children.length; i++) {
        c = children[i]
        // 当子元素是undefined 或者 null 或者 Boolean 类型 跳过
        if (isUndef(c) || typeof c === 'boolean') {
            continue
        }
        lastIndex = res.length - 1
        last = res[lastIndex]
        //  子元素是数组类型并且长度大于0 进行递归操作
        if (Array.isArray(c)) {
            if (c.length > 0) {
                c = normalizeArrayChildren(c, `${ nestedIndex || '' }_${ i }`)
                // merge adjacent text nodes
                // 当拉平过后的子元素的第一项和res里边的最后一项都是文本进行节点合并
                if (isTextNode(c[0]) && isTextNode(last)) {
                    res[lastIndex] = createTextVNode(last.text + (c[0]: any).text)
                    c.shift()
                }
                res.push.apply(res, c)
            }
            // 子元素是基础类型
        } else if (isPrimitive(c)) {
            // 当前数组最后一项是文本节点，进行节点合并
            if (isTextNode(last)) {
                
                res[lastIndex] = createTextVNode(last.text + c)
            } else if (c !== '') {
                // 直接push 一个 文本节点
                res.push(createTextVNode(c))
            }
        } else {
            if (isTextNode(c) && isTextNode(last)) {
                // 节点合并
                res[lastIndex] = createTextVNode(last.text + c.text)
            } else {
                // 对于嵌套循环类的key做默认处理
                if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
                    c.key = `__vlist${ nestedIndex }_${ i }__`
                }
                res.push(c)
            }
        }
    }
    
    return res
}
```

### isTextNode
```js
// 判断是否文本节点
function isTextNode(node): boolean {
    /*
    * isDef: v => v !== undefined && v !== null
    * isFalse: v === false
    * */
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}
```

## update
- `_update`是实例的一个私有方法，调用的时机有两个，一个是首次渲染，一个是数据更新
```js
// 入口文件：src/core/instance/lifecycle.js


```


## 性能埋点
### performance
- Vue 启用性能监控的属性
### mark
- 性能监控的实现，参考[Performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)
```js
import { inBrowser } from './env'

export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
    // inBrowser 检测是否是浏览器环境 window.performance 检测浏览器是否支持 performance
    const perf = inBrowser && window.performance
    /* istanbul ignore if */
    // 判断浏览器performance是否支持 mark、measure、clearMarks、clearMeasures
    if (
            perf &&
            perf.mark &&
            perf.measure &&
            perf.clearMarks &&
            perf.clearMeasures
    ) {
        /*
        * mark：根据给出 name 值，在浏览器的性能输入缓冲区中创建一个相关的timestamp
        * measure：在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 timestamp
        * clearMarks：将给定的 mark 从浏览器的性能输入缓冲区中移除。
        * */
        mark = tag => perf.mark(tag)
        measure = (name, startTag, endTag) => {
            perf.measure(name, startTag, endTag)
            perf.clearMarks(startTag)
            perf.clearMarks(endTag)
            // perf.clearMeasures(name)
        }
    }
}
```




<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

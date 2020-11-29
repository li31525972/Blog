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

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

### 解析
```js

// Vue的本质是一个Class，new Vue 就是创建一个Vue的实例
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 同时执行this._init()这个初始化的方法 并将options传入
  this._init(options) 
  /*
  *     this._init()是Vue原型上的一个方法，那么这个方法是什么时候定义的呢？
  *     看上面的源码部分，该文件在加载的时候执行了一堆的 mixin, 而 this._init() 原型方法就是在 initMixin(Vue) 中定义的 
  * */ 
  initMixin(Vue)
  stateMixin(Vue)
  eventsMixin(Vue)
  lifecycleMixin(Vue)
  renderMixin(Vue)
}

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
    /* istanbul ignore if */
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
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm) // 初始化生命周期
    initEvents(vm) // 初始化事件中心
    initRender(vm) // 初始化 render
    callHook(vm, 'beforeCreate') // 
    initInjections(vm) // resolve injections before data/props
    initState(vm) // 初始化属性 data、methods等
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
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

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el: Element): string {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}

Vue.compile = compileToFunctions

export default Vue
```


### `runtime-only`版本`$mount`
```js
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

```






<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

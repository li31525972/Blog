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
// src/core/instance/index.js
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

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
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
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
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








<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

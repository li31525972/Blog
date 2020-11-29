# Vue 源码面试题

## new Vue的时候都做了什么？
- 答：初始化的时候Vue调用了内部的_init初始化方法，该方法在当前实例上面定义了一个_uid, 合并options
- 接着调用初始化声明周期、初始化事件中心、初始化render等一系列函数
- 最后使用$mount挂载el
```js
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
```

## 为什么访问 this.xx 可以直接访问到data中的数据
- 答：Vue在初始化的时候会将当前的属性挂载到当前实例的_data上面，而访问的时候Vue其实是访问的vm._data[key]进行访问的
- 下面是源码部分
```js
proxy(vm, `_data`, key)
            
     function proxy(target: Object, sourceKey: string, key: string) {
        // 访问当前的key的是否从当前的vm上面的_data上面获取
        // 也就是访问data中的属性的时候 this[key] 访问的其实是 this._data[key], 
         sharedPropertyDefinition.get = function proxyGetter() {
             return this[sourceKey][key]
         }
         // 修改值的时候修改vm._data[key]
         sharedPropertyDefinition.set = function proxySetter(val) {
             this[sourceKey][key] = val
         }
         //    将当前的key定义在 vm 上，
         Object.defineProperty(target, key, sharedPropertyDefinition)
     }
            
     const sharedPropertyDefinition = {
         enumerable: true, // 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
         configurable: true, // 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
          get: noop, // 空对象
          set: noop // 空对象
      }
```


## $mount挂载的时候做了什么？
- 答：将传递进去的el进行转换，根据el获取dom元素，然后判断是否存在render函数，如果存在直接调用mount方法
-    如果不存在判断render 看实例上面是否存在template元素，存在根据template元素获取dom信息
-    如果不存在template 看上面是否获取到el的dom节点，根据el的dom节点获取序列化后dom片段
-    最后将为当前实例挂载render函数和staticRenderFns函数

<font color="red"><b>也就是说最后都是要经过render函数进行编译</b></font>
```js
// 具体代码请看$mount 源码解析
```




<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

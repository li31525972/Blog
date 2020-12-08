# 初始化数据、事件、声明周期等

## initLifecycle 初始化生命周期
```js
// vm 当前Vue的实例
function initLifecycle(vm) {
    // 获取当前实例的配置项
    const options = vm.$options
    
    /*
    * locate first non-abstract parent
    * parent 获取第一个 非抽象 父组件实例，Vue 中的抽象组件有 keep-alive transition，也就是说不获取他们
    * */
    let parent = options.parent
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }
    // 为当前实例声明 $parent 指向 父组件实例，父组件实例不存在指向 undefined
    vm.$parent = parent
    // 为当前实例声明 $root 指向 根组件实例$root，父组件实例$root不存在指向 当前实例
    vm.$root = parent ? parent.$root : vm
    
    // 为当前实例定义一系列属性
    vm.$children = [] // 当前实例的直接子组件
    vm.$refs = {} // 持有已注册过ref的所有子组件
    vm._watcher = null // 组件实例相应的 watcher 实例对象
    vm._inactive = null // 表示 keep-alive 中组件状态，如被激活，值为false 反之为 true
    vm._directInactive = false // 表示 keep-alive 中组件状态的属性
    vm._isMounted = false // 当前实例是否完成挂载
    vm._isDestroyed = false // 当前实例是否已经被销毁
    vm._isBeingDestroyed = false // 当前实例是否正在销毁，还没有销毁完成
}

```

## initEvents 初始化事件中心
```js
// vm 当前Vue的实例
function initEvents(vm) {
    /*
    * 为当前实例创建一个以null为原型的 _events 事件对象，_enents 保存的是父组件绑定在当前组件上的事件(vm.$on)注册的事件
    * 也就是子组件上面的 @click="xxx" @change="xxx"
    * vm._events = {
    *   click: [xxx],
    *   change: [xxx]
    * }
    * */
    vm._events = Object.create(null)
    // _hasHookEvent 表示父组件是否通过@hook：把钩子函数绑定在当前组件上
    vm._hasHookEvent = false
    
    /*
    * 这个也是初始化父组件绑定的事件， listeners 和上面 vm._events 一样
    * */
    const listeners = vm.$options._parentListeners
    // 如果listeners存在，执行下面的代码
    if (listeners) {
        updateComponentListeners(vm, listeners)
    }
}

/*
* vm 当前实例
* listeners 当前事件对象
* oldListeners 上次事件对象(初始化的时候没有传，证明这个updateComponentListeners会在其它地方被调用)
* */
function updateComponentListeners(vm, listeners, oldListeners) {
    // 缓存当前实例，执行updateListeners 方法，清除缓存
    target = vm
    updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
    target = undefined
}

// 添加事件函数
function add(event, fn) {
    target.$on(event, fn)
}
// 删除事件函数
function remove(event, fn) {
    target.$off(event, fn)
}

/*
* on 当时事件对象
* oldOn 上次事件对象
* add 添加事件函数
* remove 删除事件函数
* createOnceHandler 
* vm 当前实例
* */
function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
    let name, def, cur, old, event
    for (name in on) {
        def = cur = on[name]
        old = oldOn[name]
        event = normalizeEvent(name)
        
        /* istanbul ignore if 小程序环境 */
        if (__WEEX__ && isPlainObject(def)) {
            cur = def.handler
            event.params = def.params
        }
    
        // 当前事件函数是 undefined 或 null，抛出错误信息：无效的事件处理程序 event.name
        if (isUndef(cur)) {
            process.env.NODE_ENV !== 'production' && warn(
                    `Invalid handler for event "${ event.name }": got ` + String(cur),
                    vm
            )
        } else if (isUndef(old)) {
            if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur, vm)
            }
            if (isTrue(event.once)) {
                cur = on[name] = createOnceHandler(event.name, cur, event.capture)
            }
            add(event.name, cur, event.capture, event.passive, event.params)
        } else if (cur !== old) {
            old.fns = cur
            on[name] = old
        }
    }
    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name)
            remove(event.name, oldOn[name], event.capture)
        }
    }
}
```

## initRender 初始化render
```js
// vm 当前Vue的实例
initRender(vm)


```

## callHook 
```js
// vm 当前Vue的实例
callHook(vm, 'beforeCreate')


```

## initInjections 
```js
// vm 当前Vue的实例
initInjections(vm)


```

## initState 初始化state
```js
// vm 当前Vue的实例
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

## initProvide 
```js
// vm 当前Vue的实例
initProvide(vm)


```



























<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

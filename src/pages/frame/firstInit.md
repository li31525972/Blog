# new Vue 首次初始化
<font color="red"><b>本文件只看首次初始化的操作，其它略过</b></font>
- 从下面源码可以看出`new Vue`的时候就是执行了`Vue`原型上的`_init`方法
```js

// 执行了 src/core/instance/index.js
// 源码部分

// Vue的本质是一个Class，new Vue 就是创建一个Vue的实例
function Vue (options) {
    // 在非生产环境并且当前this是Vue的实例，抛出错误信息：Vue是一个构造函数，应该使用' new '关键字调用它
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    // 执行this._init()这个 Vue 原型上的方法 并将options传入
  this._init(options)
}
```

## _init
```js
Vue.prototype._init = function (options) {
        // 将当前实例缓存到 vm 上面
        const vm = this
        // 实例添加 _uid
        vm._uid = uid++
        
        let startTag, endTag
        /*
        * 在非生产环境 并且 config.performance为true(开启性能追踪) 并且 当前浏览器支持 performance API时，开启性能追踪
        * 性能数据相关先不看
        * */
        if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
            startTag = `vue-perf-start:${ vm._uid }`
            endTag = `vue-perf-end:${ vm._uid }`
            mark(startTag)
        }
        
        // 实例添加 _isVue 为 true
        vm._isVue = true
        /*
        * options._isComponent 为空 跳过
        * 组件 options 合并 先不看
        * */ 
        if (options && options._isComponent) {
            initInternalComponent(vm, options)
        } else {
            // 初始化 options 合并
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
        initRender(vm) // 初始化render
        callHook(vm, 'beforeCreate')
        initInjections(vm) // resolve injections before data/props
        initState(vm) // 初始化state
        initProvide(vm) // resolve provide after data/props
        callHook(vm, 'created')
        
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
            vm._name = formatComponentName(vm, false)
            mark(endTag)
            measure(`vue ${ vm._name } init`, startTag, endTag)
        }
        // 判断是否传入el
        if (vm.$options.el) {
            // 使用$mount挂载el
            vm.$mount(vm.$options.el)
        }
    }
```

### resolveConstructorOptions
```js
/*
* Ctor Vue
* */
function resolveConstructorOptions(Ctor) {
    // 缓存原型上面的options
    let options = Ctor.options
    // 判断原型上面的 super 不存在，跳过
    if (Ctor.super) {
        const superOptions = resolveConstructorOptions(Ctor.super)
        const cachedSuperOptions = Ctor.superOptions
        if (superOptions !== cachedSuperOptions) {
            
            Ctor.superOptions = superOptions
            
            const modifiedOptions = resolveModifiedOptions(Ctor)
            
            if (modifiedOptions) {
                extend(Ctor.extendOptions, modifiedOptions)
            }
            options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
            if (options.name) {
                options.components[options.name] = Ctor
            }
        }
    }
    // 返回 Vue 构造函数上面的 options
    return options
}
```

### mergeOptions
```js
function mergeOptions(parent, child, vm) {
    // check 组件 名称是否符合规则
    if (process.env.NODE_ENV !== 'production') {
        checkComponents(child)
    }
    
    // 组件 - 不看
    if (typeof child === 'function') {
        child = child.options
    }
    
    normalizeProps(child, vm)
    normalizeInject(child, vm)
    normalizeDirectives(child)
    
    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm)
        }
        if (child.mixins) {
            for (let i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm)
            }
        }
    }
    
    const options = {}
    let key
    for (key in parent) {
        mergeField(key)
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key)
        }
    }
    
    function mergeField(key) {
        const strat = strats[key] || defaultStrat
        options[key] = strat(parent[key], child[key], vm, key)
    }
    
    return options
}
```

#### checkComponents
```js
function checkComponents(options) {
    for (const key in options.components) {
        validateComponentName(key)
    }
}

/*
* check 组件名称是否符合规则
* */
function validateComponentName(name) {
    if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${ unicodeRegExp.source }]*$`).test(name)) {
        warn(
                'Invalid component name: "' + name + '". Component names ' +
                'should conform to valid custom element name in html5 specification.'
        )
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
        warn(
                'Do not use built-in or reserved HTML elements as component ' +
                'id: ' + name
        )
    }
}
```

#### normalizeProps
```js
function normalizeProps(options, vm) {
    // 获取 props 如果不存在直接 return
    const props = options.props
    if (!props) return
    
    
    const res = {}
    let i, val, name
    if (Array.isArray(props)) {
        i = props.length
        while (i--) {
            val = props[i]
            if (typeof val === 'string') {
                name = camelize(val)
                res[name] = { type: null }
            } else if (process.env.NODE_ENV !== 'production') {
                warn('props must be strings when using array syntax.')
            }
        }
    } else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key]
            name = camelize(key)
            res[name] = isPlainObject(val)
                    ? val
                    : { type: val }
        }
    } else if (process.env.NODE_ENV !== 'production') {
        warn(
                `Invalid value for option "props": expected an Array or an Object, ` +
                `but got ${ toRawType(props) }.`,
                vm
        )
    }
    options.props = res
}
```


















































<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>


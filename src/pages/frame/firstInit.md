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
            /*
            * 初始化 options 合并父组件和子组件的options
            * 策略为: 优先使用父组件的，具体源码看下发
            * */ 
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
        // 缓存当前实例到 _self 上面
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

## resolveConstructorOptions
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

## mergeOptions
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
    // 抹平`props`的异常，如：`props`里边定义了两个相同的`key`之类的，将值放在 `child.props` 上面
    normalizeProps(child, vm)
    // 抹平`inject`的异常
    normalizeInject(child, vm)
    // 初始化指令
    normalizeDirectives(child)
    
    // 首次加载跳过
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
    // 合并父组件options上的字段
    for (key in parent) {
        mergeField(key)
    }
    // 合并子组件上面在父组件上面不存在的字段
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key)
        }
    }
    
    var strats = config.optionMergeStrategies // optionMergeStrategies: Object.create(null)
    // 合并字段 当前实例上存在用当前的否则用父组件的
    function mergeField(key) {
        const strat = strats[key] || defaultStrat
        options[key] = strat(parent[key], child[key], vm, key)
    }
    // 将合并后的 options 返回
    return options
}
```
#### defaultStrat
- 当前实例上存在用当前的否则用父组件的
```js
var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
           ? parentVal
           : childVal
};
```

### checkComponents
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

### normalizeProps
- 处理`props`的异常，缓存等，如：`props`里边定义了两个相同的`key`之类的
- 最后挂载到`options.props`上面
```js
function normalizeProps(options, vm) {
    // 获取 props 如果不存在直接 return
    const props = options.props
    if (!props) return
    
    
    const res = {}
    let i, val, name
    // 数组
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
        // 对象 - 首次进入这里
    } else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key]
            // camelize 将'is-show'转为'isShow'
            name = camelize(key)
            /*
            * 将val 的值进行转换为对象 存储到 res 当中
            * 
            * 如果在props里面定义{ str: 'str' } 结果是什么呢？ 
            * 结果是: str: {type: "str"}
            * */ 
            res[name] = isPlainObject(val)
                    ? val
                    : { type: val }
        }
        // 如果上面条件都不符合并且是开发环境，抛出错误信息：无效的props属性，需要一个数组或者对象
    } else if (process.env.NODE_ENV !== 'production') {
        warn(
                `Invalid value for option "props": expected an Array or an Object, ` +
                `but got ${ toRawType(props) }.`,
                vm
        )
    }
    // 挂载到 options.props 上面
    options.props = res
}
```
#### isPlainObject
```js
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
}
```

#### camelize
```js
function cached(fn) {
    // 创建一个缓存对象
    const cache = Object.create(null)
    return (function cachedFn(str) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    })
}

var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
    })
});
```

### normalizeInject
- 抹平`inject`异常
```js
function normalizeInject(options, vm) {
    // 首次加载 inject 是空 直接return 下边不用看
    const inject = options.inject
    if (!inject) {
        return
    }
    const normalized = options.inject = {}
    if (Array.isArray(inject)) {
        for (let i = 0; i < inject.length; i++) {
            normalized[inject[i]] = { from: inject[i] }
        }
    } else if (isPlainObject(inject)) {
        for (const key in inject) {
            const val = inject[key]
            normalized[key] = isPlainObject(val)
                              ? extend({ from: key }, val)
                              : { from: val }
        }
    } else if (process.env.NODE_ENV !== 'production') {
        warn(
                `Invalid value for option "inject": expected an Array or an Object, ` +
                `but got ${ toRawType(inject) }.`,
                vm
        )
    }
}
```
### normalizeDirectives
- 初始化指令
```js
function normalizeDirectives(options) {
    const dirs = options.directives
    if (dirs) {
        for (const key in dirs) {
            const def = dirs[key]
            if (typeof def === 'function') {
                dirs[key] = { bind: def, update: def }
            }
        }
    }
}
```

## initProxy
- 初始化`Proxy`
```js
// hasProxy 当前环境存在并且当前环境支持 isNative为判断原生支持属性的方法
var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

function initProxy(vm) {
        if (hasProxy) {
            // 获取当前实例的 options
            var options = vm.$options;
            // 首次初始化时不存在 render(还没有initRender) handlers = hasHandler
            var handlers = options.render && options.render._withStripped
                           ? getHandler
                           : hasHandler;
            // 将当前实例代理到当前实例的 _renderProxy 上面
            vm._renderProxy = new Proxy(vm, handlers);
        } else {
            // 否则将 _renderProxy 指向当前实例
            vm._renderProxy = vm;
        }
    };
```
### hasHandler
```js
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
```













































<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>


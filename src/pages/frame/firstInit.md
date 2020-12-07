# new Vue 首次初始化
<font color="red"><b>本文件只看首次初始化执行的操作，其它略过</b></font>
- 从下面源码可以看出`new Vue`的时候就是执行了`Vue`原型上的`_init`方法
```js

// 执行了 src/core/instance/index.js
// 源码部分
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
            * 合并策略可以看合并配置
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
        callHook(vm, 'beforeCreate') // 调用钩子函数 beforeCreate
        initInjections(vm) // 初始化 inject
        initState(vm) // 初始化state
        initProvide(vm) // 初始化 provide
        callHook(vm, 'created') // 调用钩子函数 create
        
        /*
        * 性能监控埋点
        * */
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

<font color="red"><b>总结：在初始化的时候`new Vue`的时候执行了原型上面的`_init`方法，该方法内部首先声明实例`_uid`, 
性能监控埋点、合并配置项、初始化声明周期、事件中心、`render`，调用当前实例的钩子函数`beforeCreate`( 因为还没有初始化实例的状态所以这个钩子内是无法访问组件的状态的 )，初始化`inject、state、provide`，调用钩子函数`created`( 这里的时候，组件的状态已经初始化好了，所以在这个钩子内就可以访问实例的状态 )，最后挂载`dom`</b></font>

















<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>


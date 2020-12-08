# 合并配置项

## mergeOptions 源码
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
    // 这里用`for in`进行遍历`parent`，并将`parent`对象的`key`作为参数传递给`mergeField`，那么`key`是什么？回想一下使用`Vue`的时候
    /*
    * export default {
          name: '',
          components: {},
          data(){},
          methods: {},
      }
    * */
    // 那么这里的`key`就是`name、components、data、methods`，可以理解为`Vue`提供的选项的名字
    for (key in parent) {
        mergeField(key)
    }
    // 遍历`child`, 多了一个判断，`!hasOwn(parent, key)`，`hasOwn`函数用来判断第二个参数`key`是否是在第一个参数的原型上，也就是说同样的选项在`parent`上已经出现就不再调用`mergeField`了
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key)
        }
    }
    
    // strats(选项合并策略对象) 包含 一系列的Vue提供的选项的名字，如：钩子函数、全局指令、组件、过滤器、属性等等， 可以看文件初始化部分
    /*
    * defaultStart 函数 当前实例上存在用当前的否则用父组件的
    * defaultStart = (a, b) => b === undefined ? a : b
    * */ 
    // 合并字段 当前实例上存在用当前的否则用父组件的
    function mergeField(key) {
        // 声明了一个常量`start`，是通过指定的`key`访问`starts`得到，当访问的属性不存在时，使用`defaultStrat`
        const strat = strats[key] || defaultStrat
        // 通过不同的key 使用不同的策略合并函数，具体有哪些，看下面讲解
        options[key] = strat(parent[key], child[key], vm, key)
    }
    // 将合并后的 options 返回
    return options
}
```
---
## strats.el 和 strats.propsData
```js
if (process.env.NODE_ENV !== 'production') {
    strats.el = strats.propsData = function (parent, child, vm, key) {
        // 判断是否传递`vm`参数，这里就可以根据 vm 判断是跟组件还是子组件
        if (!vm) {
            // 抛出一个错误信息：`el`或`propsData`选项只能在使用`new`操作符创建实例的时候可用
            warn(
                    `option "${ key }" can only be used during instance ` +
                    'creation with the `new` keyword.'
            )
        }
        return defaultStrat(parent, child)
    }
}
```

- 那么这个`vm`哪来的呢？
- 回顾一下`mergeOptions`声明与初始化调用的传参：
```js
// 声明
function mergeOptions(parent, child, vm) {}

// 调用
vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm)
```
- 从上面代码可以看出，`vm`声明为`mergeOptions`的第三个形参，而在初始化调用的时候传入了`vm`，这个`vm`是`Vue`的实例，那么是不是也就意味着在子组件进行合并调用`mergeOptions`的时候就是：`mergeOptions(parent, child)`就可以了？我们接着往下看：
- 在`if`的判断下面，直接调用了`defaultStrat`并且返回
```js
return defaultStrat(parent, child)
```

### defaultStrat
```js
// 定义文件为：src/core/util/options.js
const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal
}
```

- `defaultStrat`从命名定义可以看出来是一个默认策略，他的逻辑很简单，只要子选项不是`undefined`那么就使用子选项，否则就使用父选项

<font color="red"><b>但是这里需要注意的是`starts.el`和`starts.propsData`只是在非生产环境进行定义了， 而在生产环境访问是`undefined`，在开发环境将直接使用默认策略函数`defaultStrat`</b></font>
```js
const strat = strats[key] || defaultStrat
```
- 

## starts.data
- 下面来看`data`的合并策略，首先给`starts`策略对象上声明`data`策略函数，用来处理`data`选项
```js
strats.data = function ( parentVal: any, childVal: any, vm?: Component): ?Function {
    // vm 不存在 直接 调用并返回 mergeDataOrFn(parentVal, childVal, vm)
    if (!vm) {
        // data 存在并且 不是 函数 抛出错误信息：data 选项应该是一个函数，并且返回 复选项的 data
        if (childVal && typeof childVal !== 'function') {
            process.env.NODE_ENV !== 'production' && warn(
                    'The "data" option should be a function ' +
                    'that returns a per-instance value in component ' +
                    'definitions.',
                    vm
            )
            
            return parentVal
        }
        // 调用并返回 mergeDataOrFn(parentVal, childVal)，注意：这里和 下面少传了一个 vm 参数
        return mergeDataOrFn(parentVal, childVal)
    }
    
    return mergeDataOrFn(parentVal, childVal, vm)
}

// 从上面代码可以看出 starts.data 最终都是调用了 mergeDataOrFn 函数，只不过是 根组件比子组件多了一个 vm 参数
```
### mergeDataOrFn
```js
export function mergeDataOrFn(parentVal: any, childVal: any, vm?: Component): ?Function {
    /*
    * in a Vue.extend merge, both should be functions 
    * 选项是在调用 Vue.extend 函数时进行合并处理的，此时父子 data 选项都应该是函数。
    */
    if (!vm) {
        // 子组件合并
        // 子组件选项不存在返回父组件 父组件不存在返回子组件
        if (!childVal) {
            return parentVal
        }
        if (!parentVal) {
            return childVal
        }
        // 当parentVal和childVal都存在时，
        // 我们需要返回一个函数，该函数返回
        // 两种功能的合并结果...无需
        // 在这里检查parentVal是否是一个函数，因为
        // 它必须是传递先前合并的函数。
        return function mergedDataFn() {
            /*
            * 调用并返回mergeData 参数有两个，当 childVal 和 parentVal 都是函数调用该函数，第一个参数是 this
            * 不是函数直接作为参数进行传递
            * */
            return mergeData(
                    typeof childVal === 'function' ? childVal.call(this, this) : childVal,
                    typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
            )
        }
    } else {
        // 父组件合并 直接返回一个函数
        return function mergedInstanceDataFn() {
            // instance merge
            const instanceData = typeof childVal === 'function'
                                 ? childVal.call(vm, vm)
                                 : childVal
            const defaultData = typeof parentVal === 'function'
                                ? parentVal.call(vm, vm)
                                : parentVal
            if (instanceData) {
                return mergeData(instanceData, defaultData)
            } else {
                return defaultData
            }
        }
    }
}


/*
* 从上面代码也就可以看出最终都是返回了 一个函数，也就是
* options[key] = strat(parent[key], child[key], vm, key)
* options[key] 的值是这个返回的函数
* */
```
<font color="red"><b>总结：父选项和子选项都是返回一个函数</b></font>

### mergeData
```js
function mergeData(to: Object, from: ?Object): Object {
    // from 不存在直接返回 to
    if (!from) return to
    let key, toVal, fromVal

    // 浏览器支持 Symbol 和 Reflect.ownKeys 使用 Reflect.ownKeys 获取form的key数组，否则使用 Object.keys 获取 from 的key数组
    const keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from)

    
    for (let i = 0; i < keys.length; i++) {
        key = keys[i]
        // in case the object is already observed...
        if (key === '__ob__') continue
        toVal = to[key]
        fromVal = from[key]
        // 如果 key 在 to 上面不存在，则用 set 函数将 to 对象设置 key 的值为 fromVal
        if (!hasOwn(to, key)) {
            set(to, key, fromVal)
            
        //    如果子选项和父选项不一样又都是一个对象，则递归合并
        } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
            mergeData(toVal, fromVal)
        }
    }
    // 将合并后的子选项返回
    return to
}
```


## 钩子函数合并策略
```js
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})

// 看下 LIFECYCLE_HOOKS 的定义， 定义在文件 src/shared/constants.js
const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]

// 也就是说上面这些钩子函数使用的是相同的 合并策略mergeHook，在看一下 mergeHook
/*
* 从参数上面的定义上面来看，接收两个参数，
* 第一个参数 parentVal 数组类型，里面的每一项都是函数
* 第二个参数 childVal 函数类型或者数组类型，数组内每一项都是函数
* 最终return 一个 数组，里面每一项都是函数
* */ 
function mergeHook(parentVal: ?Array<Function>, childVal: ?Function | ?Array<Function>): ?Array<Function> {
    /*
            * 这个看起来有点绕
            * 拆分来看 第一步是 childVal 是否存在，不存在使用 parentVal ，
            * 然后再看 childVal 存在 看一下 parentVal 是否存在，存在将 parentVal 和 childVal 合并为一个数组
            * parentVal 不存在，看下 childVal 是否是数组，如果是直接使用，如果不是转化为数组
            * 
            * 换种写法理解一下：
            * let res
            * if (childVal) {
            *   if (parentVal) {
            *       parentVal = parentVal.concat(childVal) 
            *   } else {
            *       if (Array.isArray(childVal)) {
            *           parentVal = childVal
            *       } else {
            *           parentVal = [childVal]
            *       }
            *   }
            * 
            * } else {
            *   res = parentVal
            * }
            * 
            * childVal 存在并且 parentVal 存在 将childVal 和 parentVal 合并为一个数组
            * childVal 存在并且 parentVal 不存在 将 childVal 转化为数组返回
            * childVal 不存在 返回 parentVal
            * childVal 不存在 并且 parentVal 不存在 返回 undefined
            * */
    const res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal
    // 当res 存在 调用并返回 dedupeHooks 否则直接return
    return res ? dedupeHooks(res) : res
}

// 将同名的钩子函数合并为一个，返回合并后的数组
function dedupeHooks(hooks) {
    const res = []
    for (let i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i])
        }
    }
    return res
}
```
<font color="red"><b>总结：将父选项和子选项合并为一个数组，数组内相同的选项使用父选项的，比如：在使用混入的时候，如果父组件存在就用父组件的</b></font>

## 全局(指令、过滤器、组件)合并
```js
ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets
})

// 先看 ASSET_TYPES 的定义
const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
// 也就是添加了 starts.components starts.directives starts.filters 使用同一个合并策略 mergeAssets
/*
* 接下来看下  mergeAssets 参数有4个
* parentVal 父选项
* childVal 子选项
* vm 当前实例
* key 
* 
* @return Object
*/
function mergeAssets(parentVal: ?Object, childVal: ?Object, vm?: Component, key: string): Object {
    /*
    * Object.create(parentVal) 和 Object.create(null) 有什么区别呢？这里略讲一下：
    * let obj = Object.create(parentVal) 创建出来的对象的 __proto__ 指向了 parentVal 也就是 obj.__proto__ = parentVal
    * Object.create(null) 是没有任何属性的
    * */
    // 以parentVal为原型创建一个合并配置对象，如果parentVal 不存在 以 null 为原型创建
    const res = Object.create(parentVal || null)
    // 当子选项不存在 直接返回 合并配置对象
    if (childVal) {
        // 在开发环境并且 childVal 不是一个Object类型，抛出错误信息：childVal需要是一个Object类型
        process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm)
        
        /*
        * 最后调用 extend，将children的选项合并到 res 上面 返回合并后的结果
        * */
        return extend(res, childVal)
    } else {
        return res
    }
}

function extend(to: Object, _from: ?Object): Object {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to
}
```
<font color="red"><b>总结：`components firectives filters`是以父选项为原型创建一个对象，将子选项合并到这个对象上，这样就既可以访问子选项，又能访问父选项</b></font>

## watch 合并
```js
strats.watch = function (parentVal: ?Object, childVal: ?Object, vm?: Component, key: string): ?Object {
    /*
    * work around Firefox's Object.prototype.watch... 
    * 用来处理火狐浏览器 Object原型上有watch方法时， 将  parentVal childVal 都置空
    * */
    if (parentVal === nativeWatch) parentVal = undefined
    if (childVal === nativeWatch) childVal = undefined
    /* istanbul ignore if */
    // 以parentVal为原型创建一个对象，火狐环境或者childVal不存在直接返回
    if (!childVal) return Object.create(parentVal || null)
    
    // 非生产环境下check childVal上面有没有key这个属性 没有抛出错误信息：无效的选项 key, 需要一个对象 
    if (process.env.NODE_ENV !== 'production') {
        assertObjectType(key, childVal, vm)
    }
    
    if (!parentVal) return childVal
    // 将 parentVal 上的属性合并到 ret 上
    const ret = {}
    extend(ret, parentVal)
    
    //遍历子选项
    for (const key in childVal) {
        // 获取缓存对象中是否有当前key的值
        let parent = ret[key]
        // 获取子选项的值
        const child = childVal[key]
        // 如果 parent 存在并且不是数组，转化为数组
        if (parent && !Array.isArray(parent)) {
            parent = [parent]
        }
        // 将当前项和父选项进行合并为一个数组
        ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child]
    }
    // 将合并后的配置项返回
    return ret
}
```
<font color="red"><b>总结：`watch`合并是将父选项和子选项合并为一个数组</b></font>


## props methods inject computed
```js
strats.props = strats.methods = strats.inject = strats.computed = 
    function (parentVal, childVal, vm, key) {
        // 开发环境判断子选项是不是Object类型
        if (childVal && process.env.NODE_ENV !== 'production') {
            assertObjectType(key, childVal, vm)
        }
        // 父选项不存在直接返回子选项，下面无需再执行
        if (!parentVal) {
            return childVal
        }
        // 将父选项和子选项合并到一个对象里并返回
        const ret = Object.create(null)
        extend(ret, parentVal)
        if (childVal) {
            extend(ret, childVal)
        }
        return ret
}
```
<font color="red"><b>总结：`props methods inject computed`使用相同的合并策略，同名都是使用子选项的</b></font>

## provide
```js
strats.provide = mergeDataOrFn
// mergeDataOrFn ？有没有熟悉的感觉，这不是和 data 一样的策略合并函数吗？
/*
* strats.data = function(){
*   return mergeDataOrFn()
* }
* 而 provide 是直接使用 mergeDataOrFn
* */

```
<font color="red"><b>总结：`provide`使用的是和`data`一样的合并策略</b></font>


<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

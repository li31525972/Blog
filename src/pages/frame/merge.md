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
            return mergeData(
                    typeof childVal === 'function' ? childVal.call(this, this) : childVal,
                    typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
            )
        }
    } else {
        // 父组件合并
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
```















<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

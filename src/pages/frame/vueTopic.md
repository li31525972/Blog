# Vue 源码面试题

## new Vue的时候都做了什么？
- 调用了Vue原型上的_init初始化方法，先合并options
- 接着初始化生命周期
- 初始化事件中心
- 初始化render函数
- 触发`beforeCreate`钩子函数
- 初始化`inject`
- 初始化`state`
- 初始化`provide`
- 触发`created`钩子函数
- 最后使用$mount挂载el


## 为什么访问 this.xx 可以直接访问到data中的数据
- Vue在初始化执行`initState`时候会将`data`里的属性挂载到当前实例的`_data`上面，而访问的时候`Vue`其实是访问的`vm._data[key]`进行访问的
- 将`methods`挂载到当前`vm`上面，同时使用`bind`函数将该函数的`this`指向当前的`vm`
- 将`props`挂载到`vm._props`, 
- 将`computed`挂载到`vm._computedWatchers`上面
- 将`watch`挂载到`vm.$watch`上面


## $mount挂载的时候做了什么？
> `compiler`版本
- 判断是否当前实例是否存在`render`函数
- 如果不存在`render`函数，那么就去获取`template`，
- 如果不存在`template` 根据`el`获取`template`
- 再将获取到`template`编译为`render`函数

<font color="red"><b>也就是说最后都是要经过render函数进行编译</b></font>

- 拿到`render`函数之后就会调用`mount`方法
- `mount`方法会创建一个渲染`watcher`执行`Vue`原型上的更新视图的`_update`方法
- `_update`会调用`render`方法生成`VNode`，进行视图更新

## 为什么要使用`Virtual DOM`
- `Virtual DOM`就是用原生`JS`对象去描述一个`DOM`节点，`Vue`中是用`VNode`类去描述
- `VNode`只是用来映射真实`DOM`的渲染，不需要包含操作`DOM`的方法，因此它是非常轻量的



<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

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







<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

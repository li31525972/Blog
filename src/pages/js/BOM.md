# BOM 对象
- `BOM` 提供了很多对象，用于访问浏览器的功能，这些功能与任何网页内容无关

## Window 对象
- `BOM` 的核心对象是 `window`， 它表示一个浏览器的实例，在浏览器中，`window`对象具有双重角色，可以通过`JavaScript`访问浏览器窗口的一个接口，又是`ECMAScript`规定的 `Global` 对象， 因此有权可以访问全局变量方法

### 全局作用域
- 所有在全局作用域中声明的变量、方法都会变成 `window` 对象的属性和方法，那么它与直接在 `window` 上定义的属性和方法之间有没有区别？有什么区别呢？
1. 全局变量和方法不可以通过 `delete` 操作符进行删除，而 `window` 上的可以
2. 直接访问未声明的变量会抛出错误，但是通过 `window` 对象，会返回 `undefined`

### 窗口关系及框架
- 没用过

### 窗口位置
1. `screenLeft` 相对于屏幕左边的位置， Firefox是 `screenX`
2. `screenTop` 相对于屏幕上边的位置， Firefox是 `screenY`
- 使用下列代码可以兼容获取屏幕位置：
```js
var left = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX
var top = (typeof window.screenTop == 'number') ? window.screenTop : window.screenY
```
- 窗口移动
```js
// 将窗口移动到屏幕左上角
window.moveTo(0, 0)

// 将窗口向下移动100像素
window.moveBy(0, 100)
```
- `moveTo` 接收的是新位置的 `x` 和 `y` 坐标值
- `moveBy` 接收的是水平和垂直方向移动的像素

### 窗口大小


## Navigator 对象


## Screen 对象


## History 对象


## Location 对象


## 存储对象

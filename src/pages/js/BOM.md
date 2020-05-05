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
- 获取窗口大小的四个属性 `innerWidth` `innerHeight` `outerWidth` `outerHeight`
- IE9+、Safari和Firefox中 `outerWidth` `outerHeight` 返回浏览器窗口大小，在Opera中表示页面视图容器的大小，而 `innerWidth` `innerHeight` 表示页面视图区的大小(减去边框宽度)
- 在Chrome中，这4个值返回相同的值(视图大小非浏览器窗口大小)
- 也可以通过DOM获取页面可见区域的大小
```js
    let pageWidth = window.innerWidth
    let pageHeight = window.innerHeight
    
    // 判断取到的值不是数值时，使用DOM方法获取视图区域大小
    if (typeof pageWidth !== 'number') {
        // 判断当前页面是不是标准模式
        if (document.compatMode === 'CSS1Compat') {
            pageWidth = document.documentElement.clientWidth
            pageHeight = document.documentElement.clientHeight
        } else {
            pageWidth = document.body.clientWidth
            pageHeight = document.body.clientHeight
        }
    }
```
- 使用 `resizeTo()` `resizeBy()` 方法可以用来修改浏览器窗口的大小
- `resizeTo()` 接收浏览器窗口的新宽度和新高度
- `resizeBy()` 接收新窗口和原窗口的宽度和高度之差
```js
window.resizeTo(100, 100)

window.resizeBy(200, 200)
```
<font color='red'><b>总结：好像在实战当中没有找到使用它的场景</b></font>

### 导航和打开窗口 window.open()
- 可以导航到一个特定的`URL`， 也可以打开一个新的浏览器窗口，接收4个参数：
1. `URL`
2. 窗口目标，已有窗口或框架的名称如： `target="topFrame"`，也可以是下列特殊窗口名称：`_self` `_parent` `_top` `_blank`
3. 一个特性字符串, 如果第二个参数不是一个已经存在的窗口或框架，那么就会根据第三个参数的值创建一个新窗口或标签页，如果没有传入第三个参数，那么就会打开一个全部默认的浏览器窗口，不打开新窗口下忽略第三个参数，参数选项：
- `fullscreen` yes或no  表示浏览器窗口是否最大化，(仅限IE？)摘自`JavaScript高程`
- `height` 数值 新窗口的高度，不能小于100
- `width` 数值 新窗口的宽度，不能小于100
- `top` 数值 新窗口的上坐标，不能是负值
- `left` 数值 新窗口的左坐标，不能是负值
- `location` yes或no 是否在浏览器窗口中显示地址栏，不同浏览器默认值不同，效果也不同，可能是隐藏，也可能是禁用
- `menubar` yes或no 是否在浏览器窗口中显示菜单栏，默认 `no`
- `resizable` yes或no 是否可以通过拖拽浏览器窗口边框改变其大小，默认 `no`
- `scrollbars` yes或no 视口中显示不下是否可以滚动，默认 `no`
- `status` yes或no 是否显示状态栏， 默认 `no`
- `toolbar` yes或no 是否显示工具栏， 默认 `no`
4. 布尔值，新页面是否取代浏览器历史记录中当前加载页面
- 示例：
```js
let win = window.open('http://www.baidu.com/', '', 'height=400, width=400, top=100, left=100')
// 但是大多数浏览器都内置有窗口屏蔽程序， 即使没有用户也可能安装其他的带有屏蔽程序的工具，可以通过返回值进行判断，如：
if (win == null) {
    // 检测到被屏蔽了又能如何呢？    
}


// 可以使用close()方法关闭这个窗口，如：
win.close() // 但是实战当中有什么具体的应用场景呢？暂未发现
```

## Location 对象
- 最有用的`BOM`对象之一，它是一个特别的对象，既是`window`的属性，也是`document`的属性，也就是说`window.location`和`document.location`是引用的同一个对象
### hash
- URL中#号后面的字符，没有返回空字符串

### host
- 返回服务器名称和端口号

### port
- 返回端口号

### hostname
- 返回不带端口号的服务器名称

### href
- 返回当前页面的完整URL

### pathname
- 返回URL中的目录或文件名(就是路径)

### protocol
- 返回页面使用的协议，如：`http` `https`

### search
- 返回URL中的查询字符串，这个字符串以 `?` 开头

### assign()
- 接收一个字符串地址，`location.href`也会调用该方法

### replace() 
- 切换当前浏览器位置，不会生成新的浏览器记录

### reload() 
- 重新加载当前显示的页面, 包含一个布尔参数，表示是否从服务器加载不使用缓存


## History 对象
- 保存用户的历史记录，常用方法：
1. `go()` 参数是数值，正值表示前进负值表示后退
2. `back()` 后退
3. `forward()` 前进
- 属性
1. `length` 历史记录的数量

## Navigator 对象
- 没用过，有空添加


## Screen 对象
- 没用过，有空添加



## 存储对象

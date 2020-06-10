# DOM 对象

## DOM元素获取

### 根据ID获取节点
```js
// 严格匹配大小写，没有找到返回 null, 如果有多个返回第一个
let div = document.getElementById('mydiv') 
```

### 根据标签名称获取元素
```js
    // 获取页面上的所有div， 返回一个数组，没有返回空数组
    let div = document.getElementsByTagName('div')
    
    // 获取页面的所有元素
    let div = document.getElementsByTagName('*')
    
    let first = div.item(0) // 可以获取数组里的第一项
```

### 根据name值获取节点
```js
    // 获取页面上的所有div， 返回一个数组，没有返回空数组
    let div = document.getElementsByName('to')
```

### querySelector
```js
        // querySelector()方法接收一个css选择符，返回第一个匹配的元素
        <div class="mydiv" id="box" sign="logo"></div>
        console.log(document.querySelector('div')) // 根据标签
        console.log(document.querySelector('#box')) // 根据ID
        console.log(document.querySelector('.mydiv')) // 根据class
        console.log(document.querySelector('div.mydiv')) // 根据标签+class
```

### querySelectorAll
```js
    // querySelectorAll()方法获取所有匹配到的元素，返回一个(nodeList)伪数组
    console.log(document.querySelectorAll('div'))
```

## DOM节点操作(增删改查)

### document.createElement()
```js
    // 创建一个节点，参数为标签名称，只有一个参数
    document.createElement('div')
```

### appendChild()
- 向元素的末尾添加一个节点
```js
    // 参数：要添加的元素
    let mybox = document.getElementById('box')
    let box = document.createElement('div')
    box.innerText = '333'

    mybox.appendChild(box)
```

### removeChild()
- 删除这个节点
```js
    // 参数：要删除的元素
    let mybox = document.getElementById('box')
    mybox.removeChild(mybox.childNodes[0])
```

### insertBefore
- 向指定位置前边插入一个元素
```js
    // 参数： 1. 要插入的元素
            2. 被插入的元素，指定null插入到最后和appeldChild()效果一样
    let mybox = document.getElementById('box')
    mybox.insertBefore(box, null)
```

### replaceChild()
- 替换节点
```js
    // 参数： 1. 要被替换的节点
    //      2. 替换的节点(不可为空)
    let mybox = document.getElementById('box')
    let box = document.createElement('div')

    mybox.replaceChild(box, mybox.firstChild)
```

### cloneNode
- 克隆节点
```js
    // 参数：false 只复制当前节点，不复制子节点 默认值：false
    //     true  复制当前节点及子节点
    let mybox = document.getElementById('box')
    let list = mybox.cloneNode(true)
    console.log(list)
    mybox.appendChild(list)
    // 就是是深度复制，也不会复制添加在DOM节点中的JavaScript属性，但是IE可以
```

### insertAdjacentHTML
- 向指定位置添加一个元素
```js
    // 参数：“beforebegin”， 向指定元素前面添加一个元素，同级元素
    //     “afterend”, 向指定元素后面添加一个元素，同级元素
    //     "afterbegin", 作为第一个子元素插入
    //     “beforeend”, 作为最后一个子元素插入
    <ul class="ul">
        <li>111</li>
        <li class="box">222</li>
        <li>333</li>
    </ul>
    let box = document.querySelector('.box');
    box.insertAdjacentHTML("beforebegin", "<li>444</li>");
    box.insertAdjacentHTML("afterend", "<li>444</li>");
    box.insertAdjacentHTML("afterbegin", "<li>444</li>");
    box.insertAdjacentHTML("beforeend", "<li>444</li>");
```

## document操作

### 文档模式
- `document.compatMode` 用来判断页面是标准模式还是混杂模式，标准`CSS1Compat` 混杂`BackCompat`

### 获取整个页面文档
- 就是整个HTML
```js
    let html = document.documentElement // 所有浏览器都支持
```

### 获取body
```js
    let body = document.body // 所有浏览器都支持
```

### 获取 <!DOCTYPE html>
```js
    // 浏览器对其的支持差别太大， 没什么用处
    let doctype = document.doctype
```

### 获取和设置title
```js
    // 获取内容
    let title = document.title
    // 设置内容
    document.title = 'demo'
```

### 获取完整的URL
```js
    let url = document.URL
```

### 获取域名
```js
    let domain = document.domain
```

## DOM样式和属性

### 获取、设置元素的ID
```js
    let name = document.getElementById('box')
    name.id // 获取
    name.id = 'BOX' // 设置
```

### 获取、设置元素类名 class
```js
    let name = document.getElementById('box')
    name.className  // 获取
    name.className = 'mydiv' // 设置
```

### 行内样式
```js
    // style的属性使用驼峰命名法
    let box = document.getElementById("box");
    console.log(box.style.backgroundColor) // 获取背景颜色，如果没有style特性，会返回一些默认的值(可查看js高程314页)
    box.style.backgroundColor = "red" // 设置背景为红色
```

### getElementsByClassName
- 获取带有指定类的元素节点, 类名的先后顺序没关系
```js
    <div class="username current"></div>
    let element = document.getElementsByClassName('username current')

    console.log(element)
```

### classList
- `HTML5` 提供的用于操作类名的方式
```js
    <div class="username current"></div>
    let element = document.querySelector('div')

    console.log(element.classList) // ['username', 'current']
```
- 同时提供了几个操作类名的方法
1. `add()` 将给定的字符串值添加到列表中，如果存在就不添加
2. `contains()` 列表中是否存在给定的值，返回布尔值
3. `remove()` 从列表中删除给定的值
4. `toggle()` 如果列表中存在给定的值则删除，不存在则添加

### getAttribute
- 获取元素的特性
```js
    // ⚠️： 特性是不分大小写的，如ID和id是一样的， 另只有获取style返回的是文本，而通过属性获取的是对象，另根据规范自定义特性需要加上data-前缀，只有在获取自定义的特性的时候才会使用这种方法
    // 参数：要获取的特性名称(只有一个参数)
        <div class="mydiv" id="box" sign="logo"></div>
            let div = document.getElementById('box')
            console.log(div.getAttribute('id'))
            console.log(div.getAttribute('class'))
            console.log(div.getAttribute('sign'))
```

### setAttribute
- 设置元素的特性
```js
    // setAttribute()以指定的值替换现有的值，如果特性不存在，创建并设置相应的值
    // 参数： 1. 要替换的特性
    //         2. 要替换的值
            
            let div = document.getElementById('box')
            div.setAttribute('sign', 'sign')
            或者可以 div.sign = 'sign' 必须要有这个sign特性才能成功
            console.log(div)
```

### removeAttribute
- 移除元素的特性
```js
    // removeAttribute()方法将指定的特性从元素上面移除
    let div = document.getElementById('box')
    div.removeAttribute('sign')
    console.log(div)
```

## 元素大小位置

### offsetWidth 
- 获取元素的宽度，获取的是内容、内边距和边框的宽度，只能读，不能修改。
```js
    // 语法：元素.offsetWidth;
    // 如：  var x = box1.offsetWidth;  注意：返回的是一个数字，可以直接进行计算
```

### offsetHeight
- 获取元素的高度，获取的是内容、内边距和边框的高度，只能读，不能修改。
```js
    // 语法：元素.offsetHeight;
    // 如：  var y = box1.offsetHeight; ⚠️注意：返回的是一个数字，可以直接进行计算
```

### offsetParent
- 获取当前元素的定位父元素
```js
    // 语法：元素.offsetParent;
    // 如： var a = box1.offsetParent;
    // 注意：获取的是与当前元素最近的有定位的父元素。如果所有的父元素都没有定位，则返回body.
```

### offsetLeft
- 当前元素与其定位的父元素的偏移量
```js
    // 语法：元素.affsetLeft;
    // 如：  var x = box1.affsetLeft;
    // 注意：获取的是准确的值，没有像素。
```

### offsetTop
- 当前元素与其定位的父元素的偏移量
```js
    // 语法：元素.affsetTop;
    // 如：  var y = box1.affsetTop;
    // 注意：获取的是准确的值，没有像素。
```


### clientWidth
- 元素的可见宽度，获取的是内容和内边距的宽度，不包含边框，只能读，不能修改。
```js
    // 语法：元素.clientWidth
    // 如： var x = box1.clientWidth; ⚠️注意：返回的是一个数字，可以直接进行计算
    // 注意：如果其父元素生成了滚动条，那么会减去滚动条的宽度。
```

### clientHeight
- 元素的可见高度，获取的是内容和内边距的高度，不包含边框，只能读，不能修改。
```js
    // 语法：元素.clientHeight
    // 如： var y = box1.clientHeight; ⚠️注意：返回的是一个数字，可以直接进行计算
    // 注意：如果其父元素生成了滚动条，那么会减去滚动条的高度。
```

### offsetX
- 事件对象，鼠标的位置
```js
    // 语法：event.offsetX;   
    // 如：  var x = event.offsetX; 注意：返回的是一个数字，可以直接进行计算
```

### offsetY
- 事件对象，鼠标的位置
```js
    // 语法：event.offsetY;
    // 如：  var y = event.offsetY; 注意：返回的是一个数字，可以直接进行计算
```

### scrollWidth
- 获取元素整个滚动区域的宽度
```js
    // 语法：元素.scrollWidth;
    // 如：  var x = box1.scrollWidth;
```

### scrollHeight
- 获取元素整个滚动区域的高度
```js
    // 语法：元素.scrollHeight;
    // 如：  var y = box1.scrollHeight;
```

### scrollLeft
- 获取当前元素水平向左滚动的距离，就是水平滚动条滚动的距离
```js
    // 语法：元素.scrollLeft;
    // 如：  var x = box1.scrollLeft;
```

### scrollTop
- 获取当前元素水平向下滚动的距离，就是垂直滚动条滚动的距离
```js
    // 语法：元素.scrollTop;
    // 如：  var y = box1.scrollTop;
```

## 事件
- 事件太多了，没有的自行查找吧，有空慢慢添加

### UI事件
1. `onload` 当页面完全加载完毕触发
2. `onunload` 当页面完全卸载时触发
3. `onerror` 当发生 `JavaScript` 错误时触发
4. `onresize` 当窗口或框架的大小变化时触发
5. `onscroll` 当用户滚动带滚动条的元素时触发

### 焦点事件
1. `onblur` 失去焦点时触发
2. `onfocus` 获取焦点时触发

### 鼠标事件
1. `onclick` 点击事件
2. `ondblclick` 双击事件
3. `onmousedown` 鼠标按下事件
4. `onmouseenter` 鼠标移动到元素上
5. `onmouseleave` 鼠标离开事件
6. `onmousemove` 鼠标在元素内部移动触发
7. `onmouseup` 鼠标抬起事件
8. `onmouseover` 鼠标移到某元素之上
9. `onmouseout` 鼠标从某元素移开

### 拖动事件
1. `ondrag` 该事件在元素正在拖动时触发
2. `ondragend` 该事件在用户完成元素的拖动时触发
3. `ondragenter` 该事件在拖动的元素进入放置目标时触发
4. `ondragleave` 该事件在拖动元素离开放置目标时触发
5. `ondragover` 该事件在拖动元素在放置目标上时触发
6. `ondragstart` 该事件在用户开始拖动元素时触发
7. `ondrop` 该事件在拖动元素放置在目标区域时触发

### 滚轮事件
1. ``

### 键盘事件
1. `onkeydown` 某个键盘按键被按下
2. `onkeypress` 某个键盘按键被按下并松开
3. `onkeyup` 某个键盘按键被松开

### 剪贴板事件
1. `oncopy` 该事件在用户拷贝元素内容时触发
2. `oncut` 该事件在用户剪切元素内容时触发
3. `onpaste` 该事件在用户粘贴元素内容时触发

### 地址栏事件
1. `hashchange` url发生改变事件

### 过渡事件 transitionend
1. `event` 有3个与该事件有关的属性
- `propertyName` 结束过渡的css属性的名称
- `pseudoElement` 应用过渡效果的伪元素，前面有两个冒号，如果过渡效果应用到常规dom节点上，返回空字符串
- `elapsedTime` 过渡持续的时间，单位是秒
```js
document.querySelector('div').addEventListener('transitionend', event => {
    console.log(event)
})
```

### 动画事件
1. `animationstart` 动画开始事件
2. `animationiteration` 在两次迭代之间触发
3. `animationend` 动画结束时触发
- `event` 有3个只读属性和过渡事件 `transitionend` 一样


### 多媒体事件

### 注册事件
```js
    // 对象名.事件名 = function(){};
    // 如果一个对象绑定了多次事件，那么后面的会层叠掉前面的点击事件。
```

### 事件监听
1. `addEventListener` 绑定事件， IE为`attachEvent`
2. `removeEventListener` 解绑事件，匿名函数无法解除，IE为`detachEvent`(IE没有第三个参数)
- 参数：
1. 要处理的事件名
2. 执行的函数
3. 布尔值，`true`表示捕获阶段调用，`false`表示冒泡阶段调用，默认`false`
```js
    // 对象名.addEventListener('click',function(){}); 
    // 兼容chrome IE8及以下不支持，事件可以累加，事件不加on，里边的this指向事件源
    // 对象名.attachEvent('onclick',function(){});    
    // 兼容IE，事件也可以累加，但是是倒序，里边的this指向window。
    // 兼容写法：if (对象名.addEventListener){
    //     对象名.addEventListener('click',function(){});
    //     } else {
    //     对象名.attachEvent('onclick',function(){});    兼容IE
    //     }
```

### preventDefault()
- 阻止事件的默认行为

### stopPropagation()
- 阻止事件冒泡






<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

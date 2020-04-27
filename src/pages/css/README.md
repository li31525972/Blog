# css 部分

## 加载方式
link标签、style元素、@import指令

### link标签
```css
<link rel="stylesheet" type="text/css" href="index.css" media="all">
```
- link标签必须放在head元素中，不能放在其他元素中， 属性：
1. `rel`是relation关系的简称，这里指定的关系是stylesheet
2. `type`属性的值始终未text/css, 说明通过link标签加载的数据类型
3. `href`样式表的URL
4. `media`它的值是一个或多个媒体描述符，后文详细说明
- <font color="red"><b>
注意：一个文档可以关联多个样式表，如果是这样，那么最初显示文档时只会使用rel属性为stylesheet的link标签连接的样式表
</b></font>

### style元素
```css
<style type="text/css">...</style>
```
- style元素为嵌入式样式表， 可以直接包含应用到文档上的样式，也可以通过@import指令引入外部样式表

### @import方式

- 声明必须放在所有样式的开头，此外并无限制

### 行内样式
```css
<p style="color: red;">文本</p>
```
<font color="red"><b>注意：通常不建议使用，一旦使用那么css的很多重要优点都不存在了，例如集中管理样式，控制文档或整个网站的外观</b></font>


## 浏览器内核

|   内核     |  代表浏览器    |  厂商前缀  |
|   :---:    |  :---:       |  :---:    |
|  Trident   |       IE     |     -ms-   |
|  Blink     |   Chrome     |  -webkit-  |
|  Gecko     |    Firefox   |     -moz-  |

<font color="red"><b>注意：在目前主流框架中如Vue、React中不需要添加，打包时会自动生成</b></font>


## 盒模型
<img src="/box-normal.jpg"/>
<img src="/box-ie.jpg"/>

### css设置盒模型
```css
box-sizing: 'content-box'; // 默认
box-sizing: 'border-box'; // IE盒模型
```

## 选择器

1. 标签选择器：`p`选择所有的p元素
2. 类选择器：`.info`选择所有类名为info的元素
3. id选择器：`#box`选择所有id为box的元素
4. 并集选择器：`div, p`选择所有的div和p元素
5. 后代选择器：`div p`选择div下所有的p元素
6. 子级选择器： `div > p`选择所有父级是div元素的p元素
7. 相邻选择器：`div + p`选择所有紧接着div之后的p元素
8. 属性选择器：
```css
[title]选择所有带有title属性的元素
[type='text']选择所有使用type='text'的元素
[class~=box1]选择所有class中包含box1类名的元素
[class^=box]选择所有类名以box开头的元素
[class$=x1]选择所有类名以x1为结尾的元素，注意：[class$=1]这样匹配数字是无效的
[class*=ox] 选择所有类名中带有ox字符的元素
```
9. 伪类选择器：
```css
链接伪类
a:link 选择所有未访问的链接
a:visited 选择所有访问过得链接
a:active 选择活动链接
a:hover 选择鼠标停留在链接上面时

表单伪类
input:focus 选择具有焦点的输入元素
input:disabled 选择每一个禁用的输入元素
input:checked 选择每一个选中的输入元素 // 单选多选
input:enabled 选择每一个已启用的输入元素
:valid 用于匹配输入值为合法的元素
:invalid 用于匹配输入值非法的元素

其他伪类
p:empty 选择每个没有任何子级的p元素(包括文本节点) 

```

10. 伪元素选择器
- ::before 在元素的内容前面插入新内容
- ::after 在元素的内容后面插入新内容
```css
<h1>标题</h1>
h1::before {
    content: '111'
}
h1::after {
    content: '222'
}
显示结果：111标题222

::selection 选择元素中被用户选中或处于高亮状态的部分
::placeholder 选择所有表单元素中具有提示信息的元素

滚动条伪元素
::-webkit-scrollbar    //滚动条整体部分
::-webkit-scrollbar-button   //滚动条两端的按钮
::-webkit-scrollbar-track   // 外层轨道
::-webkit-scrollbar-track-piece    //内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-thumb //滚动条里面可以拖动的那个
::-webkit-scrollbar-corner   //边角
::-webkit-resizer   ///定义右下角拖动块的样式

```
<font color="red"><b>伪类和伪元素的区别：伪类用于选择DOM树之外的信息，`:visited, :active`包含满足一定逻辑条件的DOM树中的元素, `:first-child, :target`</b></font>


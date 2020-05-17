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

## 长度单位
### 绝对长度单位
- in 英寸
- cm 厘米
- mm 毫米
- q 四分之一毫米
- pc 派卡(印刷术语)
- px 像素(常用)

### 分辨率单位
- dpi 点每英寸(在长为一英寸的范围能显示的点数)
- dpcm 点每厘米，和dpi类似，不过范围是1厘米
- dppx 点每像素， 每个px单位显示的点数，从css3开始，1dppx相当于96dpi
<font color="red"><b>这些单位只能在媒体查询中使用</b></font>

### 相对长度单位
- em 1em等于父元素的font-size属性值，如果font-size等于14，那么1em就为14px
- rem 和em类似，不过是相对于根元素(html)的font-size
- ex 有兴趣可以自行百度
- ch css3新加的，IE显示不对，有兴趣可自行百度

### 视区单位
- vw 视区宽度单位
- vh 视区高度单位
<font color="red"><b>计算方式：除以100，如果视区的宽度或高度为900px, 那么1vw或1vh就等于9px</b></font>
- vmin 视区尺寸最小值单位(取vm和vh中最小的那个)
- vmax 视区尺寸最大值单位(取vm和vh中最大的那个)

### 计算值 calc()
- 支持加减乘除，和数学运算方式一样

## 颜色
### 具名颜色
- color: red; 

### 十六进制
- color: #fff;

### RGB
- color: rgb(255,255,255)
- 值可以是整数(0 - 255)，也可以是百分比(0 - 100%)

### RGBa
- color: rgba(255,255,255, .3)
- 和rgb类似，最后一个值为透明度

### HSL
- css3新加
- color: hsl(色相，饱和度，明度)
- 色相(0 - 360), 饱和度和明度(0 - 100%)

### HSLa
- 和hsl类似，最后一个值为透明度

## 字体 font
- font: font-style, font-weight, font-size, font-family
```css
{
    font: normal 400 16px '微软雅黑';
}
```
### font-family
```css
{
    font-family: xxx;
}
```

### font-style
- 字体风格 常规(normal)、斜体(italic)、倾斜体(oblique)，默认值normal
```css
{
    font-style: normal;
}
```
### 字重 font-weight
- 字号字重, 取值范围100 - 900
- 400相当于normal
- 500相当于medium
- 600-700对应bold
- 800-900对应bolder
```css
{
    font-weight: 400;
}
```
<font color="red"><b>请使用数值类型，英文类型请自行查看浏览器机制</b></font>
### 字号 font-size
```css
{
    font-size: 16px;
}
```
### 字体拉伸 font-stretch
```css
{
    font-stretch: normal;
}
```
<font color="red"><b>macOS和iOS不支持</b></font>

### @font-face
```css
@font-face {
    font-family: 'iconfont';
    src: url('xxx.otf')
}
```
- 支持的字体 eot、otf、svg、ttf、woff

### 字距 font-kerning
```css
/*取值 auto | normal | none */
{
    /* none 忽略字距信息*/
    font-kerning: none; 
    /*normal 浏览器正常处理*/
    font-kerning: normal;
    /* auto 默认值 由用户代理选则最合适的处理方式，由所用字体决定*/
    font-kerning: auto;
}

```
### 字体变形 font-variant
```css
/*取值 css2: normal | small-caps */
{
    /* normal 普通形式 */
    font-normal: normal;
    /* small-caps 使用小号大写字母 */
    font-normal: small-caps;
}

/*css3取值(相当多)*/

```

## 文本属性
### 文本缩进 text-indent
```css
{
    /* 继承：是 */
    /* 动画性：是 */
    /*将元素的文本缩进指定的长度，可以是负值，注意：不能用于行内元素和置换元素(如图片等)*/
    text-indent: 3em; /* 取值可以是任何长度单位 */
}
```
### 文本对齐 text-align
```css
/* 取值：start | end | left | right | center | justify | match-parent | start end */
/* 适用于：块级元素 */
/* 继承：是 */
/* 动画性：否 */
{
    /* left 左对齐 纵向书写语言起始对齐 css2 默认值 */
    text-align: left;
    /* right 右对齐 纵向书写语言终边对齐 */
    text-align: right;
    /* center 居中对齐 */
    text-align: center;
    /* 起始对齐 css3 默认值 */
    text-align: start;
    /* end 终边对齐 */
    text-align: end;
    /* justify 两端对齐 */
    text-align: justify;
    text-align: justify-all;
    /* match-parent 与父元素保持一致 作用基本被 inherit 涵盖了 */
    text-align: match-parent;
    text-align: unset;
}

```
### 对齐最后一行 text-align-last
```css

```

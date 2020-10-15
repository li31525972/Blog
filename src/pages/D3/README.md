# D3.js

## 简介
### D3
- D3是一个`JavaScript`函数库，用来做数据可视化的

### D3的优势
1. <strong>`D3能够将数据和DOM绑定在一起`</strong>，使得数据和图形形成一个整体，既图形中有数据，数据中有图形，那么在生成图形或更改图形时，就可以方便的根据数据进行操作，并且，当数据更改之后，图形的更新也非常方便。
2. <strong>`数据转换和绘制是独立的`</strong>，将数据变成图表，需要不少数学算法，一些可视化库的做法是：提供一个函数`drawPie()`，输入数据，直接绘制出饼状图，D3的做法是，提供一个函数`computePie()`可将数据转换成饼状图的数据，然后开发者使用自己喜欢的方式绘制图形，看起来好像变麻烦了，但是在图形非常复杂的时候，直接绘制的饼图往往达不到要求，细微的部分没有办法更改，将两者分开，就极大地提高了自由度，以至于开发者甚至可以使用其它的图形库来显示D3计算的数据。
3. <strong>`代码简洁`</strong>，`jQuery`是网页开发中很常用的库，其链式语法被很多人喜爱，D3也采用了这种语法，能够一个函数套一个函数，使得代码很简洁
4. <strong>`大量布局`</strong>，饼状图、树形图、打包图、矩阵树形图等，D3将大量复杂的算法封装成一个一个布局，能够适用于各种图表的制作
5. <strong>`基于SVG，缩放不会损失精度`</strong>，SVG是可缩放的矢量图形，D3大部分是在SVG上绘制的，并且提供了大量的图形生成器，使得在SVG上绘制图形变得简单，另外，由于SVG是矢量图，所以放大缩小不会有精度损失

## [SVG参考手册](https://www.runoob.com/svg/svg-reference.html)
## 图形元素
- svg是指可缩放矢量图形，是用于描述二维矢量图形的一种图形格式，由万维网联盟制定的开放标准，SVG使用了XML格式来定义图形，除了IE8之前的版本外绝大部分浏览器都支持SVG，可将SVG文本直接嵌入HTML中显示，D3十分适合在SVG中绘制图形
```html
<svg width="400" height="400" version="1.2" xmlns="http://www.w3.org/2007/XMLSchema-versioning"></svg>
```
*   `width`表示绘制区域的宽度
*   `height`表示绘制区域的高度
*   `version`表示SVG的版本号
*   `xmlns`表示命名空间
--- 
需要绘制的图形都要添加到这一组`<svg></svg>`之间，SVG中预定义了7种形状元素分别为：`矩形<rect>、圆形<circle>、椭圆<ellipse>、线段<line>、折线<polyline>、多边形<polygon>、路径<path>`，这些元素中表示形状的参数各不相同，但也有一些共同的属性，下面介绍这些元素的参数和示例。

### 矩形 `<rect>`
参数：
*   `x`矩形左上角的x坐标
*   `y`矩形左上角的y坐标
*   `width`矩形的宽度
*   `height`矩形的高度
*   `rx`对于圆角矩形，指定椭圆在x方向的半径
*   `ry`对于圆角矩形，指定椭圆在y方向的半径
```html
<svg width="400" height="400" version="1.2">
    <rect x="20" y="20" width="100" height="100" style="fill: #000;"></rect>
</svg>
```

### 圆形 `<circle>`
参数：
*   `cx`圆心的x坐标
*   `cy`圆心的y坐标
*   `r`圆的半径
```html
<circle cx="100" cy="100" r="50" style="fill: #EBEEF5;"></circle>
```

### 椭圆 `<ellipse>`
*   `cx`圆心的x坐标
*   `cy`圆心的y坐标
*   `rx`椭圆的水平半径
*   `ry`椭圆的垂直半径
```html
<ellipse cx="100" cy="100" rx="50" ry="100" style="fill: #aacc33"></ellipse>
```

### 线段 `<line>`
参数：
*   `x1`起始的x坐标
*   `y1`起始的y坐标
*   `x2`终点的x坐标
*   `y2`终点的y坐标
```html
<line x1="100" x2="400" y1="100" y2="180" style="fill: #000; stroke: black;"></line>
```

### 折线 `<polyline>`
>   折线和多边形的参数是一样的，都只有一个points参数，这个参数的值是一系列的点坐标，不同之处是多边形会将终点和起点连接起来，而折线不连接，默认的背景色都是黑色

参数：
*   `points`一系列的点坐标
```html
<polyline points="100,20 20,90, 60,160 140,160 180,90"
                      style="fill: transparent; stroke: black; stroke-width: 3;"></polyline>
```

### 多边形 `<polygon>`
参数：`points`一系列的点坐标
```html
<polygon points="100,20 20,90, 60,160 140,160 180,90"
                      style="fill: transparent; stroke: black; stroke-width: 3;"></polygon>
```

### 路径 `<path>`
>   `<path>`标签的功能最丰富，前面列举的图形都可以用路径制作出来，与折线类似，也是通过给出一系列点坐标来绘制，在D3
中绘制地图时，会经常用到此标签，其用法是：给出一个坐标点，在坐标点前面添加一个英文字母，表示是如何运动到此坐标点的，英文字母按照功能可分为五类

参数：
####   移动类
*   `M = moveto`将画笔移动到指定坐标

#### 直线类
*   `L = lineto`画直线到指定坐标
*   `H = horizontal lineto`画水平直线到指定坐标
*   `V = vertical lineto`画垂直直线到指定坐标

#### 曲线类
*   `C = curveto`画三次贝塞尔曲线径两个指定控制点到达终点坐标
*   `S = shorthand/smooth curveto`与前一条三次贝塞尔曲线相连，第一个控制点为前一条曲线第二个控制点的对称点，只需输入第二个控制点和终点，即可绘制一个三次贝塞尔曲线
*   `Q = quadratiic Bezier curveto`画二次贝塞尔曲线径一个指定控制点到达终点坐标
*   `T = Shorthand/smooth quadratic Bezier curveto`与前一条二次贝塞尔曲线相连，控制点为前一条二次贝塞尔曲线控制点的对称点，只需输入终点，即可绘制一个二次贝塞尔曲线

#### 弧线类
*   `A = elliptical arc`画椭圆曲线到指定坐标
> ####  弧线是根据椭圆来绘制的，参数较多
> * `rx`椭圆x方向的半轴大小
> * `ry`椭圆y方向的半轴大小
> * `x-axis-rotation`椭圆的x轴与水平轴顺时针方向的夹角
> * `large-arc-flag`有两个值(1：大角度弧线、0：小角度弧线)
> * `sweep-flag`有两个值(1：顺时针至终点、0：逆时针到终点)
> * `x`终点x坐标
> * `y`终点y坐标

#### 闭合类
*   `Z = closepath`绘制一条直线连接终点和起点，用来封闭图形
> 上述命令都是用大写英文字母表示，表示坐标系中的绝对坐标，也可用小写英文字母，表示的是相对坐标(相对当前画笔所在点)

```html
<!--绘制直线-->
<path d="M30,100 L270,300 M30,100 H270 M30,100 V300" style="stroke: black; stroke-width: 3;"></path>
<!--绘制三次贝塞尔曲线-->
<path d="M30,100 C100,20 190,20 270,100 S400,180 450,100"style="fill: white; stroke: black; stroke-width: 3;"></path>
<!--绘制两次贝塞尔曲线-->
<path d="M30,100 Q190,20 270,100 T450,100"style="fill: white; stroke: black; stroke-width: 3;"></path>

```

### 文字 `<text>`
> #### 在SVG中可以使用`<text>`标签绘制文字，属性如下：
> * `x`文字位置的x坐标
> * `y`文字位置的y坐标
> * `dx`相对于当前位置在x方向上平移的距离(值为正则往右，负则往左)
> * `dy`相对于当前位置在y方向上平移的距离(值为正则往下，负则往上)
> * `textLength`文字的显示长度(不足则拉长，足则压缩)
> * `rotate`旋转角度(顺时针为正，逆时针为负)

```html
<text x="100" y="100" dx="-5" dy="5" rotate="0" textLength="30">
                <tspan style="fill: red;">D3</tspan>demo
            </text>
<!--如果要单独定义样式 使用`tspan`标签-->
```

### 样式
1. 使用类名
```html
<style>
.newline {
    stroke: black;
    stroke-width: 3;
}
</style>

<line class="newline"></line>

```

2. 直接在标签中指定样式
```html
<line x1="100" x2="400" y1="100" y2="180" fill="#000" stroke="black"></line>
```

3. 合并写
```html
<line x1="100" x2="400" y1="100" y2="180" style="fill: #000; stroke: black;"></line>
```

#### 常见的样式
> * `fill`填充色，改变文字`<text>`的颜色也用这个
> * `stroke`轮廓线的颜色
> * `stroke-width`轮廓线的宽度
> * `stroke-linecap`线头终点的样式，圆角、直角等
> * `stroke-dasharray`虚线的样式
> * `opacity`透明度，0.0位完全透明，1.0位完全不透明
> * `font-family`字体
> * `font-size`字体大小
> * `font-weight`字体粗细，有`normal、bold、bolder、lighter可选`
> * `font-style`字体的样式，斜体等
> * `text-decoration`上划线、下划线等













<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

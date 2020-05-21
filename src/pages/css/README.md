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
- 如果只有一行，那么比`text-align`的优先级高
```css
/* 取值： auto | start | end | left | right | center | justify */
/* 适用于：块级元素 */
/* 继承：是 */
/* 动画性：否 */
{
    /* auto */
    text-align-last: auto;
    /* start 起始位置对齐 */
    text-align-last: start;
    /* end 终边位置对齐 */
    text-align-last: end;
    /* left 左对齐 */
    text-align-last: left;
    /* right 右对齐 */
    text-align-last: right;
    /* center 居中对齐 */
    text-align-last: center;
    /* justify 两端对齐 */
    text-align-last: justify;
}
```

### 行高 line-height
```css
/* 取值：长度和百分数 | normal | inherit  */
/* 适用于：所有元素 */
/* 继承：是 */
/* 动画性：是 */
{
    /* normal 用户代理自动计算 */
    line-height: normal;
    /* inherit 继承父元素，默认会自动继承 */
    line-height: inherit;
}

```

### 对齐方式 vertical-align
```css
/* 取值：baseline | middle | bottom | text-bottom | sub | super | top | text-top  */
/* 适用于：行内元素和单元格 */
/* 继承：否 */
/* 动画性：否 */
{
    /* baseline 基线对齐 默认值 */
    vertical-align: baseline;
    /* middle 中线对齐 */
    vertical-align: middle;
    /* bottom 底部对齐 */
    vertical-align: bottom;
    /* text-bottom 相对于文本的底部对齐 */
    vertical-align: text-bottom;
    /* sub 下标对齐 */
    vertical-align: sub;
    /* super 上标对齐 */
    vertical-align: super;
    /* top 顶部对齐 */
    vertical-align: top;
    /* text-top 相对于文本的顶部对齐 */
    vertical-align: text-top;
}

```
### 单词间距 word-spacing
```css
/* 取值：长度单位 | normal  */
/* 适用于：所有元素 */
/* 继承：是 */
/* 动画性：是 */
{
    /* normal 绝对长度0 */
    word-spacing: normal;
    word-spacing: 0.5em;
}

```

### 字符间距 letter-spacing
```css
/* 取值：长度单位 | normal  */
/* 适用于：所有元素 */
/* 继承：是 */
/* 动画性：是 */
{
    /* normal 绝对长度0 */
    letter-spacing: normal;
}

```

### 文本转换 text-transform
```css
/* 取值：uppercase | lowercase | capitalize | none  */
/* 适用于：所有元素 */
/* 继承：是 */
/* 动画性：否 */
{
    /* none 默认值，不对文本做任何修改 */
    text-transform: none;
    /* uppercase 把文本转换成大写字母  */
    text-transform: uppercase;
    /* lowercase 把文本转换成小写字母 */
    text-transform: lowercase;
    /* capitalize 把每个单词的首字母变成大写字母 */
    text-transform: capitalize;
}

```

### 文本装饰 text-decoration
```css
/* 取值：underline | overline | line-through | blink | none  */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* none 去掉文本的装饰效果 */
    text-decoration: none;
    /* underline 为元素添加下划线 */
    text-decoration: underline;
    /* overline 为元素上方添加线 */
    text-decoration: overline;
    /* line-through 删除线 */
    text-decoration: line-through;
    /* blink 让文本一闪一闪 */
    text-decoration: blink;
}

```

### 空白 white-space
```css
/* 取值： normal | nowrap | pre | pre-wrap | pre-line  */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* normal 将空白压缩成一个空格，默认值 */
    white-space: normal;
    /* nowrap 禁止元素中的文本换行 */
    white-space: nowrap;
    /* pre 空白不会被忽略 */
    white-space: pre;
    /* pre-wrap 空白保留，正常换行 */
    white-space: pre-wrap;
    /* pre-line 空白压缩，正常换行 */
    white-space: pre-line;
}

```
## 元素
1. 非置换元素，如：p
2. 置换元素， 如：img、input
3. 根元素，html
4. 块级元素，如：div
5. 行内元素，如： span、strong
6. 行内块元素，如：img

### 显示方式 display
```css
/* 取值：   */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* block 转为块级元素 */
    display: block;
    /* block 转为行内元素 */
    display: inline;
    /* block 转为行内块元素 */
    display: inline-block;
}

```
## 边框 border
```css
/* 简写：border-width border-style border-color */
{
    border: 1px solid #ccc;
}

```

### 边框样式 border-style
```css
/* 取值： none | hidden | solid | dotted | dashed | double | groove | ridge | inset | outset | inherit */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* none 取消边框样式 */
    border-style: none;
    /* hidden 等价于none，在表格上有区别 */
    border-style: hidden;
    /* solid 实线 */
    border-style: solid;
    /* dotted 点线 */
    border-style: dotted;
    /* dashed 虚线 */
    border-style: dashed;
    /* double 双实线 */
    border-style: double;
    /* groove 内凹边框 */
    border-style: groove;
    /* ridge 内凹边框 */
    border-style: ridge;
    /* inset 内凹边框 */
    border-style: inset;
    /* outset 内凹边框 */
    border-style: outset;
}

```
### 边框宽度 border-width
```css
/* 取值： thin | medium | thick | 长度 */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：是 */
```

### 边框颜色 border-color
```css
/* 取值： <color> | transparent */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：是 */
{
    /* transparent 透明边框 */
    border-color: transparent;
    /* 任意颜色值 */
    border-color: red;
}

```
### 边框圆角 border-radius
```css
/* 取值： 绝对长度或百分数 */
/* 适用于：除表格元素的所有元素 */
/* 继承：否 */
/* 动画性：是 */
{
    border-radius: 5px;
    border-radius: 50%;
}

```
## 颜色、背景和渐变
### 前景色 color
```css
/* 取值： <color> */
/* 适用于：所有元素 */
/* 继承：是 */
/* 动画性：是 */
{
    color: red;
    color: #fff;
    color: rgb(255,255,0);
    color: rgba(255,255,0, .3);
}

```
<font color='red'>注意：边框没有设置颜色，默认用文本颜色</font>

### 背景色 background-color
```css
/* 取值： <color> | transparent */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：是 */
{
    /* transparent 透明 */
    background-color: transparent;
}

```

### 背景裁剪 background-clip
```css
/* 取值： border-box(默认值) | padding-box | content-box */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* border-box 默认 */
    background-clip: border-box;
    /* padding-box 边框内 */
    background-clip: padding-box;
    /* content-box 内容区内 */
    background-clip: content-box;
}

```
### 背景图 background-image
```css
/* 取值： <image> | none */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* none 默认值，不放任何背景图 */
    background-image: none;
    /* url() 图片路径 */
    background-image: url('./..');
}

```

### 背景定位 background-position
```css
/* 取值： <position> | left | right | top | bottom | 长度 | 百分比 */
/* 初始值：0%(横向位置) 0%(纵向位置)  */
/* 适用于：块级元素和置换元素 */
/* 继承：否 */
/* 动画性：是 */
{
    /* center 背景图居中显示， 只声明一个纵向位置默认为 50%(center) */
    background-position: center;
}

```

### 背景重复 background-repeat
```css
/* 取值： repeat | no-repeat | space | round */
/* 初始值：repeat 如果有两个值 第一个横向 第二个纵向  */
/* 适用于：块级元素和置换元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* repeat 无限平铺 */
    background-repeat: repeat;
    /* no-repeat 不平铺 */
    background-repeat: no-repeat;
    /* space 横向纵向均匀分布 */
    background-repeat: space;
    /* round 重复平铺 自动缩放图形 */
    background-repeat: round;
}

```

### 背景定位 background-attachment
```css
/* 取值： scroll | fixed | local */
/* 初始值：scroll */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* scroll 随滚动条滚动 */
    background-attachment: scroll;
    /* fixed 固定，不受滚动影响 */
    background-attachment: fixed;
    /* local 随内容一起滚动 */
    background-attachment: local;
}

```

### 背景图大小 background-size
```css
/* 取值： auto | <length> */
/* 初始值：auto */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：是 */
{
    /* auto 自动计算 */
    background-size: auto;
    /* 第一个横向尺寸 第二个纵向尺寸 */
    background-size: 400px 400px;
}

```
<font color='red'>背景的各个属性都支持多个值，以，分隔</font>

### 背景简写 background
```css
{
    /**
    * 简写规则：
    * 1. size 必须紧随 position后面 / 隔开
    * 2. 横向在前 纵行在后
     */
    background: url('./xx') top left/50% 50% padding-box white no-repeat fixed border-box;
}
```
### 线性渐变 linear-gradient()
```css
{
    /* 开始颜色 - 中间可以有任意个颜色 - 结尾颜色 默认方向从上到下 */
    background-image: linear-gradient(blue, red);
    /* 指明某一条边时需要关键字 to 从左到右 */
    background-image: linear-gradient(to right, blue, red);
    /* 从左上到右下 */
    background-image: linear-gradient(to right bottom, blue, red);
    /* 旋转90° */
    background-image: linear-gradient(90deg, blue, red);
    /* 每个多远放一个色标 violet 渐变到末尾 */
    background-image: linear-gradient(90deg, blue, green 20%, yellow 40%, white 60%, red 80%, violet);
}
```
### 径向渐变 radial-gradient()
```css
{
    /* 圆形的径向渐变 从内而外 */
    background-image: radial-gradient(blue, red);
    /* 一个值为圆形 */
    background-image: radial-gradient(100px, blue, red);
    /* 两个值为椭圆形 */
    background-image: radial-gradient(100px 200px, blue, red);
    /* 百分比值 */
    background-image: radial-gradient(50% 20%, blue, red);
}
```
## 阴影

### 文本阴影 text-shadow
```css
/* 取值： none | 一个可选的颜色和三个长度值，最后一个长度值可选  */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：是 */
{
    /* none 取消阴影 */
    text-shadow: none;
    /* 阴影颜色 横向偏移 纵向偏移 模糊半径(可选) */
    text-shadow: red 5px 5px 2px;
}

```
<font color='red'>注意：大量阴影或模糊半径较大会损耗性能，由其是低功耗和CPU能力有限的情况下(如移动设备)</font>

### 盒子阴影 box-shadow
```css
/* 取值： none |   */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：是 */
{
    /* 下偏移 右偏移 颜色 */
    box-shadow: 4px 4px rgba(0, 0, 0, .5);
    /* 下偏移 右偏移 模糊距离 颜色 */
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .5);
    /* 下偏移 右偏移 模糊距离 阴影距离 颜色 */
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, .5);
    /* inset(内凹阴影) 下偏移 右偏移 模糊距离 阴影距离 颜色 */
    box-shadow: inset 4px 4px 4px 4px rgba(0, 0, 0, .5);
}

```
## 溢出、裁剪和可见
### 溢出裁剪 overflow
```css
/* 取值： visible | hidden | scroll | auto  */
/* 初始值：visible */
/* 适用于：块级元素和置换元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* visible 默认值，超出内容可见 */
    overflow:visible;
    /* hidden 超出部分裁剪 */
    overflow:hidden;
    /* scroll 超出部分生成滚动条 */
    overflow:scroll;
    /* auto 在超出时生成滚动条 */
    overflow:auto;
}

```
### 可见性 visibility
```css
/* 取值： visible | hidden | collapse  */
/* 初始值：visible */
/* 适用于：所有元素 */
/* 继承：是 */
/* 动画性：否 */
{
    /* visible 默认值，元素可见 */
    visibility: visible;
    /* hidden 元素不可见 */
    visibility: hidden;
    /* collapse 表格使用，非表格和hidden一样 */
    visibility: collapse;
}

```

## 浮动和定位
### 浮动 float
```css
/* 取值： left | right | none */
/* 初始值：none */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    float: left;
}

```
### 清除浮动 clear
```css
/* 取值： left | right | both | none */
/* 初始值：none */
/* 适用于：块级元素 */
/* 继承：否 */
/* 动画性：否 */
```
### 浮动形状 shape-outside
```css
/* 取值： basic-shape | shape-box | image | none */
/* 初始值：none */
/* 适用于：浮动元素 */
/* 继承：否 */
/* 动画性：<basic-shape> */
{
    /* 让内容挨着图像可见的部分流动，如果图像有透明部分，那么内容将流入透明的部分 */
    shape-outside: url("./xx");
    /* basic-shape 取值：inset() | circle() | ellipse() | polygon() */
    /* shape-box 取值：margin-box | border-box | padding-box | content-box */
    
    /* 把形状框内缩10px */
    shape-outside: inset(10px); /* inset(10px 10px 10px 10px) 上右下左顺序 */
    /* 把形状框以什么样的盒子内缩10px */
    shape-outside: inset(10px) padding-box;
}

```
### 透明图像定义形状 shape-image-threshold
```css

```
### 形状添加外边距 shape-margin
```css

```

### 定位 position
```css
/* 取值： static | relative | absolute | fixed | sticky */
/* 初始值：static */
/* 适用于：所有元素 */
/* 继承：否 */
/* 动画性：否 */
{
    /* static 默认正常值 */
    position: static;
    /* relative 相对定位 相对于自身 */
    position:relative;
    /* absolute 绝对定位 相对于有定位的父元素 */
    position: absolute;
    /* fixed 固定定位 相对于浏览器窗口 */
    position: fixed;
    /* sticky 粘带定位，参考QQ音乐里歌手列表上拉字母定位 */
    position: sticky;
}

```
### 偏移属性 
```css
/* 属性： top | left | right | bottom */
/* 取值： length | auto */
/* 初始值：auto */
/* 适用于：定位元素 */
/* 继承：否 */
/* 动画性：<length>是 */
```

### z轴位置 z-index
```css
/* 取值： <integer> | auto */
/* 初始值：auto */
/* 适用于：定位元素 */
/* 继承：否 */
/* 动画性：是 */
/* 值大的元素会覆盖其他元素 */

```

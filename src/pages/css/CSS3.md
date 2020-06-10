# CSS3
## 弹性盒 flex
- 弹性元素是什么 弹性容器的子元素被称为弹性元素
- 弹性元素的特性 外边距不重叠、float和clear对弹性元素不起作用
- 但是绝对定位就对弹性元素起作用
### 弹性盒类型
```css
/* 两种类型：1. flex  2. inline-flex */
/* 只有直接子元素受影响 */
{
    display: flex;
    display: inline-flex;
}

```
### 布局方式 flex-direction
```css
/* 取值：row | row-reverse | column | column-reverse */
/* 初始值：row */
/* 继承性：否 */
/* 动画性：否 */
{
    /* row 从左到右 */
    flex-direction: row;
    /* row-reverse 从右到左 */
    flex-direction: row-reverse;
    /* column 从上到下 */
    flex-direction: column;
    /* column-reverse 从下到左 */
    flex-direction: column-reverse;
}

```
### 换行 flex-wrap
```css
/* 取值：nowrap | wrap | wrap-reverse */
/* 初始值：nowrap */
/* 继承性：否 */
/* 动画性：否 */
{
    /* nowrap 默认值，在一行显示，不换行 */
    flex-wrap: nowrap;
    /* wrap 超出正常换行 */
    flex-wrap: wrap;
    /* wrap-reverse 换行，换行后第二行在上 */
    flex-wrap: wrap-reverse;
}

```
### 弹性流 flex-flow
- 相当于`flex-direction` 和 `flex-wrap` 的简写
```css
/* 取值：<flex-direction> | <flex-wrap> */
/* 初始值：row nowrap */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 从左到右 超出换行 */
    flex-flow: row wrap;
}

```
### flex主轴对齐 justify-content
- 弹性容器在主轴方向如何分布子元素
```css
/* 取值：flex-start | flex-end | center | space-between | space-around | space-evenly */
/* 初始值：flex-start */
/* 适用于：弹性容器 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* flex-start 默认值，从开始位置开始 */
    justify-content: flex-start;
    /* flex-end 从结束位置开始 */
    justify-content: flex-end;
    /* center 居中显示 */
    justify-content: center;
    /* space-between 左边居左，右边居右，其余中间等距离分配 */
    justify-content: space-between;
    /* space-around 按外边距分配？ */
    justify-content: space-around;
    /* space-evenly 平均分配 */
    justify-content: space-evenly;
}

```
### flex垂轴对齐 align-items
- 弹性容器在垂轴方向如何分布子元素
```css
/* 取值：flex-start | flex-end | center | baseline | stretch */
/* 初始值：stretch */
/* 适用于：弹性容器 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* stretch 拉伸 同时对齐起边和终边 */
    align-items: stretch;
    /* flex-start 起边对齐 */
    align-items: flex-start;
    /* flex-end 终边对齐 */
    align-items: flex-end;
    /* center 居中对齐 */
    align-items: center;
    /* baseline 第一个子元素的基线对齐 */
    align-items: baseline;
}

```
### 弹性元素对齐方式 align-self
- 在单个弹性元素上用来覆盖`align-items`的值
```css
/* 取值：auto | flex-start | flex-end | center | baseline | stretch */
/* 初始值：auto */
/* 适用于：弹性元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* auto 默认继承父元素的align-items的值 */
    align-self: auto;
    /* flex-start 起边对齐 */
    align-self: flex-start;
    /* flex-end 终边对齐 */
    align-self: flex-end;
    /* center 居中对齐 */
    align-self: center;
    /* baseline 基线对齐 */
    align-self: baseline;
    /* stretch 拉伸对齐 */
    align-self: stretch;
}

```
### 内容对齐 align-content
- 在弹性容器的垂轴方向上对齐各弹性元素，对禁止换行以及只有一行的弹性容器没有影响
- 和`justify-content`差不多，只是换成垂轴
```css
/* 取值：flex-start | flex-end | center | space-between | space-around | space-evenly | stretch */
/* 初始值：stretch */
/* 适用于：分为多行显示的弹性容器 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* flex-start 起边对齐 */
    align-content: flex-start;
    /* flex-end 终边对齐 */
    align-content: flex-end;
    /* center 居中对齐 */
    align-content: center;
    /* space-between 起边靠起边 终边靠终边 中间等分 */
    align-content: space-between;
    /* space-around 边距等分 */
    align-content: space-around;
    /* space-evenly  */
    align-content: space-evenly;
    /* stretch 自动拉伸占满 */
    align-content: stretch;
}

```
### flex属性
```css
/* 取值：<flex-grow> | <flex-shrink> | <flex-basis> | none */
/* 初始值：0 1 auto */
/* 适用于：弹性元素 */
/* 继承性：否 */
/* 动画性：参见各单独属性 */
```

### 弹性元素增大 flex-grow
```css
/* 取值：number(负数无效，大于等于0，可以是小数) */
/* 初始值：0 */
/* 适用于：弹性元素 */
/* 继承性：否 */
/* 动画性：是 */
{
    /* 只为单独某一个弹性元素设置时，当弹性容器宽度还有剩余，那么设置的这个弹性元素将占满剩余的 */
    flex-grow: 1;
}

```
### 弹性元素缩减 flex-shrink
```css
/* 取值：number(负数无效，大于等于0，可以是小数) */
/* 初始值：1 */
/* 适用于：弹性元素 */
/* 继承性：否 */
/* 动画性：是 */
{
    /* 只为单独某一个弹性元素设置时，当弹性容器宽度不够，那么设置的这个弹性元素将缩减多少 */
    flex-grow: 1;
}
```
### 弹性元素默认尺寸 flex-basis
```css
/* 取值：content | 长度值 */
/* 初始值：auto */
/* 适用于：弹性元素 */
/* 继承性：否 */
/* 动画性：<width> */
{
    /* content 浏览器多数不支持 微软Edge支持 */
    flex-basis: content;
}

```
### 弹性元素排列顺序 order
- 改变弹性元素的显示顺序，不改变源码
- 小数在前，大数在后 负数在0的前面，大于0在0的后面
```css
/* 取值：<integer> */
/* 初始值：0 */
/* 适用于：弹性元素 */
/* 继承性：否 */
/* 动画性：是 */
{
    order: -1;
}

```
<font color='red'>运用当中如果有排序，那么是不是就可以用它呢？css实现？但是，注意：如果是用tab键进行选择元素的话是不受影响的，还是按照代码顺序</font>




## 变形 transform
```css
/* 取值：<transform-list> | none */
/* 初始值：none */
/* 继承性：否 */
/* 动画性：作为一种变形 */

```

### 坐标系
- x轴(横轴)
- y轴(纵轴)
- z轴(深度轴)和`z-index`类似

### 平移函数 translate
- `translateX()` x轴移动
- `translateY()` y轴移动
- `translateZ()` z轴移动
- `translate3d()` 简写
```css
{
    transform: translateX(100px);
    transform: translateY(100px);
    transform: translateZ(100px);
    /* translate3d() 参数必须是3个值，否则无效， z轴不能是百分比值 */
    transform: translate3d(100px, 200px, 100px);
}
```

### 缩放 scale
- `scaleX()` x轴缩放
- `scaleY()` y轴缩放
- `scaleZ()` z轴缩放
- `scale()` x轴和y轴同时缩放
- `scale3d()` 简写
```css
{
    /* x轴缩放0.5倍 */
    transform: scaleX(0.5);
    transform: scaleY(0.5);
    transform: scaleZ(0.5);
    /* 一个参数同时缩放宽高 */
    transform: scale(0.5, 0.4);
    /* scale3d() 参数必须是3个值，否则无效 */
    transform: scale3d(0.5, 0.4, 1);

}
```
### 旋转 rotate
- `rotateX()` X轴旋转
- `rotateY()` Y轴旋转
- `rotateZ()` Z轴旋转
- `rotate()` 2d旋转
- `rotate3d()` 3d旋转
- 参数只有一个，角度，如： `100deg`
```css
{
/* 取值：deg | grad | rad | turn */
    /* x轴旋转90度 */
    transform: rotateX(90deg);
    /* y轴旋转90度 */
    transform: rotateY(90deg);
    /* z轴旋转90度 */
    transform: rotateZ(90deg);
    /* 2d旋转 和rotateZ 效果一样 */
    transform: rotate(90deg);
    /* 3d旋转 前三个参数为 x y z 第四个参数为角度值, 例子中以z轴旋转90度 */
    transform: rotate3d(0, 0, 1, 45deg);
}
```
### 倾斜 skew
- `skewX()` x轴倾斜
- `skewY()` y轴倾斜
- `skew()` 2d倾斜
```css
{
    /* x轴倾斜 */
    transform: skewX(45deg);
    /* y轴倾斜 */
    transform: skewY(45deg);
    /* 2d倾斜 */
    transform: skew(45deg, 50deg);
}
```
### 深度 perspective
- `perspective()`
- 值越大越接近眼前, 必须是正数，不能是0
- 对目标元素
```css
{
    transform: perspective(200px);
}
```
### 移动原点 transform-origin
- 以什么位置为中心展开变形移动
```css
/* 取值：left | center | right | top | bottom | length */
/* 初始值：50% 50% */
/* 适用于：任何可变形的元素 */
/* 继承性：否 */
/* 动画性：<length>, <percentage> */
{
    transform-origin: 50px 100px;
}

```
### 变形方式 transform-style
```css
/* 取值：flat | preserve-3d */
/* 初始值：flat */
/* 适用于：任何可变形的元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    transform-style: preserve-3d;
}

```
### 视域 perspective
- 值越大越接近眼前, 必须是正数，不能是0
- 对目标元素的所有子元素有效
```css
/* 取值：none | <length> */
/* 初始值：none */
/* 适用于：任何可变形的元素 */
/* 继承性：否 */
/* 动画性：是 */
{
    perspective: 1000px;
}

```
### 视域原点 perspective-origin
- `perspective` 属性为 `none` 的时候该属性无效
```css
/* 取值：left | center | right | top | bottom | length */
/* 初始值：50% 50% */
/* 适用于：任何可变形的元素 */
/* 继承性：否 */
/* 动画性：<length>, <percentage> */
{
    perspective-origin: 50% 0;
}

```
### 背面 backface-visibility
- 元素的背面朝向我们时，是否渲染背面
```css
/* 取值：visible | hidden */
/* 初始值：visible */
/* 适用于：任何可变形的元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* visible 默认值 显示 */
    backface-visibility: visible;
    /* 隐藏 */
    backface-visibility: hidden;
}

```

## 过渡 transition
```css
/* 取值：transition-property transition-duration transition-timing-function transition-delay */
{
    /* 过渡属性 过渡时间 过渡速度 过渡延时 */
    transition: all 200ms ease-in 50ms;
}

```
### 受过渡影响的属性 transition-property
```css
/* 取值：none(禁用过渡效果) | all | <property-name> */
/* 初始值：all */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 属性值为以逗号分隔的属性列表或者是all，分隔的属性列表中也可以包含all */
    transition-property: all;
}

```
### 过渡持续时间 transition-duration
```css
/* 取值：<time> */
/* 初始值：0s */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 不能为负值 时间单位为 秒s 毫秒ms */
    transition-duration: 1s;
}

```
### 过渡速度 transition-timing-function
```css
/* 取值：<timing-function> */
/* 初始值：ease */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 下面为常用取值： */
    /* ease 慢速开始 然后加速， 再慢下来， 结束时特别慢 */
    transition-timing-function: ease;
    /* linear 保持相同的速度 */
    transition-timing-function: linear;
    /* 慢速开始，然后加速 */
    transition-timing-function: ease-in;
    /* 快速开始，然后减速 */
    transition-timing-function: ease-out;
    /* ease-in-out 和 ease 类似，中间较快，两端很慢，但不同速 */
    transition-timing-function: ease-in-out;
    /* 整个过渡都处在最终关键帧上 */
    transition-timing-function: step-start;
    /* 整个过渡都处在初始关键帧上 */
    transition-timing-function: step-end;
    /* 显示n个固定镜头，其中第一个固定镜头占整个过渡的百分之n */
    transition-timing-function: steps(5, start);
    /* 显示n个固定镜头，前百分之n的事件处于初始值状态 */
    transition-timing-function: steps(5, end);
    /* cubic-bezier() 三次方贝塞尔曲线 */
    transition-timing-function: cubic-bezier(0.47, 0, 0.75, 0.715);
}

```
### 延迟过渡 transition-delay
```css
/* 取值：<time> */
/* 初始值：0s */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 1s后开始过渡，可以是负值，也可以是一组以逗号分隔的值，对应每个要过渡的属性 */
    transition-delay: 1s;
}

```


## 动画 animation
- 用 `@keyframes` 为动画起名，名字不能以数字或两个连字符以及关键字(关键字自己查)开头
- 动画持续时间内的时间点可以是百分数也可以是 `from` 或 `to` 关键字
```css
div {
    animation-name: animation_ident;
}

@keyframes animation_ident {
    from {
    
    }
    to {
    
    }
}
@keyframes animation_ident {
    0% {
    
    }
    50% {
    
    }
    100% {
    
    }
}

```
### 指定动画名称 animation-name
```css
/* 取值：none | 动画名 */
/* 初始值：none */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 如果规定多个动画，以逗号分隔 */
    animation-name: animation_ident;
}

```
### 动画时长 animation-duration
```css
/* 取值：<time> */
/* 初始值：0s */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 动画循环一次所用时间 */
    animation-duration: 1s;
}

```
### 动画循环次数 animation-iteration-count
```css
/* 取值：<number> | infinite */
/* 初始值：1 */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* infinite 一直循环， 如果值是负值或者0等无效数值，将重置为1 */
    animation-iteration-count: infinite;
}

```
### 动画方向 animation-direction
```css
/* 取值：normal | reverse | alternate | alternate-reverse */
/* 初始值：normal */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* normal 默认值 从0%-100% */
    animation-direction: normal;
    /* 逆转动画方向 从100%-0% */
    animation-direction: reverse;
    /* 第一次及后续奇数次 从0%-100% 第二次及后续偶数 从100%-0% */
    animation-direction: alternate;
    /* 第一次及后续奇数次 从100%-0% 第二次及后续偶数 从0%-100% */
    animation-direction: alternate-reverse;
}

```
### 动画延迟 animation-delay
- 延迟播放动画
```css
/* 取值：<time> */
/* 初始值：0s */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* 延时2s开始播放 */
    animation-delay: 2s;
    /* 如果为负值时，如果播放总时间为10s 那么-2s大概是从20%处开始播放 */
    animation-delay: -2s;
}

```
### 动画速度 animation-timing-function
- 参考：过渡速度 `transition-timing-function`

### 动画播放状态 animation-play-state
```css
/* 取值：running | paused */
/* 初始值：running */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* running 正常播放 */
    animation-play-state: running;
    /* paused 动画暂停 */
    animation-play-state: paused;
}

```
### 动画模式 animation-fill-mode
- 定义动画播放结束后是否应用原来的属性值，默认情况下动画所做的改变只在播放过程中有效
```css
/* 取值：none | forwards | backwards | both */
/* 初始值：none */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
{
    /* none 动画不播放没有效果 */
    animation-fill-mode: none;
    /* 在动画所有循环播放结束后将属性应用到元素上 */
    animation-fill-mode: forwards;
    /* 在动画应用到元素上的那一刻就起作用，不等延时结束 */
    animation-fill-mode: backwards;
    /* 包含 forwards 和 backwards 两个的效果 */
    animation-fill-mode: both;
}

```
### 动画简写 animation
```css
/* 取值 持续时间 动画速度 动画延时 播放次数 动画方向 播放状态 动画模式 动画名称 */
/* 初始值：0s ease 0s 1 normal none running none */
/* 适用于：所有元素 以及 :before 和 :after 伪元素 */
/* 继承性：否 */
/* 动画性：否 */
```


## 滤镜、混合、裁剪和遮罩

### 滤镜 filter
```css
/* 取值：none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | sepia() | saturate() | url() */
/* 初始值：none */
/* 适用于：所有元素 */
/* 继承性：否 */
/* 动画性：是 */

```
### 高斯模糊 blur()
- 使用高斯模糊对元素的内容做模糊处理，标准偏差由`<length>`值定义，0不做处理，不能为负值

### 透明度 opacity()
- 透明度滤镜，和`opacity`属性相似，0表示完全透明，1或100%不做改动
- 可以和`opacity`属性同时使用，得到双重透明效果

### alpha投影 drop-shadow()
- `dorp-shadow(<length>{2,3} <color>?)`
- 创建与元素的`alpha`通道形状一致的投影，带模糊效果，可以指定颜色，长度和颜色的处理和`box-shadow`一样

### 灰色滤镜 grayscale()
- 把元素的颜色变成指定的灰色，值为0时，没变化， 1或100%时完全变成灰色

### 褐色滤镜 sepia()
- 把元素的原色变成指定的墨色调，等价于`#704214`或`rgba(122,66,20)` 0没有变化，1或100%时完全变成褐色

### 反相滤镜 invert()
- 把元素的所有颜色做反相处理，值为0时，没变化， 1或100%时完全反相，0.5或50%得到均匀的灰色

### 旋转色相 hue-rotate()
- 在色轮上旋转色相 值为`xxdeg`

### 亮度 brightness()
- 调整元素上颜色的亮度，0为纯黑色，1或100%没有变化

### 对比度 contrast()
- 调整元素上颜色的对比度，对比度越高，越容易区分颜色，0为纯灰色，1或100%没有变化

### 饱和度 saturate()
- 调整元素上颜色的饱和度，饱和度越高，颜色越鲜艳， 0为没有饱和度，灰色效果，1或100%没有任何变化，允许使用大于1或100%的值，得到的结果是过度饱和

### SVG滤镜 url()
- 
```css
{
    /* 基本语法： 具体值请自行查询 */
    filter: url(filters.svg#rough);
}
```


## 媒体查询 @media
### 媒体使用方式
```html
<link rel="stylesheet" type="text/css" media="screen, speech">
```
```css
@import url(xxx.css) screen;
@import url(xxx.css) speech;
```
<font color='red'>如果不设置媒体信息，那么将用于所有媒体</font>

### 媒体类型
1. `all` 所有能呈现内容的媒体
2. `print` 打印机打印的文档或者是打印预览
3. `screen` 呈现文档的屏幕媒体，如电脑显示器或手持设备
4. `speech` 语音合成器，屏幕阅读器或其它音频渲染设备

### 逻辑关键字
1. `and` 把两个或更多的媒体特性连在一起，每个特性都是true结果才是true
2. `not` 对查询的结果取反，所有条件都满足，不应用样式 注意：`not`只能用在媒体查询开头
```css
@media not print and (min-device-width: 500px) {}
```
3. `,` 不支持`or` 用逗号分隔多个查询
4. `only` 唯一目的保证向后兼容性，在不支持媒体查询的旧浏览器中隐藏样式表
```css
/* 例如：只在支持媒体查询的浏览器中应用样式表 */
@import url(xxx.css) only all; /* 在支持媒体查询的浏览器中only将被忽略 */

```
### 特性描述符
1. `width` `min-width` `max-width` 
- 用户代理显示区域的宽度
2. `height` `min-height` `max-height`
- 用户代理显示区域的高度
3. `device-width` `min-device-width` `max-device-width`
- 屏幕的宽度
4. `device-height` `min-device-height` `max-device-height`
- 屏幕的高度
5. `aspect-ratio` `min-aspect-ratio` `max-aspect-ratio`
- 媒体特性的宽度和高度的比值(视区的宽高比)，如 `16/9`
6. `device-aspect-ratio` `min-device-aspect-ratio` `max-device-aspect-ratio`
- 屏幕宽度和屏幕高度的比值，如 `16/9`
7. `color` `min-color` `max-color`
- 判断输出设备是否支持彩色显示，只要设备有色彩深度，`color` 就起作用，(min-color: 4)表示每个色彩分量至少有4位，不支持返回0
8. `color-index` `min-color-index` `max-color-index`
- 指输出设备色彩搜寻列表共有多少颜色，不支持色彩搜寻列表的设备返回0
9. `monochrome` `min-monochrome` `max-monochrome`
- 判断显示屏是不是单色的，数值表示在输出设备的帧缓冲器中每像素有多少位，非单色设备返回0
10. `resolution` `min-resolution` `max-resolution`
- 输出设备的分辨率，值不能为负或0, 如：`100dpi` 或 `100dpcm`
11. `orientation`
- 取值：`portrait | landscape` 用户代理的显示区域放置的方向
12. `scan`
- 取值：`progressive | interlace` 输出设备使用的扫描方式
13. `grid`
- 取值：`0 | 1` 判断是否为基于栅格的输出设备


## 栅格布局



<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

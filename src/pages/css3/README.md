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
- `rotateX()`
- `rotateY()`
- `rotateZ()`
- `rotate()`
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

## 过渡

## 动画

## 滤镜、混合、裁剪和遮罩

## 媒体查询

## 栅格布局


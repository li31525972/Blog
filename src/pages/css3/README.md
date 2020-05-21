# CSS3
## 弹性盒 flex
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

```



## 变形

## 过渡

## 动画

## 滤镜、混合、裁剪和遮罩

## 媒体查询

## 栅格布局


# SCSS

## 变量
### 变量基本语法
```scss
/* 变量以 $ 符号开头 */
$width: 100px;
```
### 多值变量
```scss
// 多值变量， 可以通过 nth($paddings, 1)获取某一个， 索引从1开始
$paddings: 5px 5px 10px 10px;
```
### 设置多变量
```scss
$bg-colors: (success: #DFF008, info: #D9EDF7, warning: #FCF8E3, danger: #F2DEDE);
// 使用方式：background-color: map-get($bg-colors, info);
```
### 变量定义 !default
```scss
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}
// 编译为:
#main {
  content: "First content";
  new-content: "First time reference"; 
}

```

### 选择器或属性名中使用变量
- 通过 `#{}` 插值语句
```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```


## 数据类型
### 数字
- `1, 2, 10px`

### 字符串
- 有引号与无引号字符串 `"foo", 'bar', baz`

### 颜色
- `blue, #ccc, rgb() rgba()`

### 布尔值 
- `true, false`

### 空值
- `null`

### 数组
- 用空格或逗号作为分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`

### 对象maps
- 相当于JS的object `(key1: value1, key2: value2)`


## 嵌套
### 基本语法
```scss
a {
    color: red;
    &:hover {
        color: blue;
    }
}
```
### 属性嵌套
- 属性嵌套， 针对属性中带 `-` 的，可以写成对象的写法
```scss
body {
    font: {
        size: 20px;
        weight: 700;
    }
}
```

### 跳出嵌套
- 跳出嵌套， 使用 `@at-root`
```scss
body {
    color: #666;
    @at-root .container {
        color: #000;
    }
}
```

## 继承 @extend
```scss
a {
    color: red;
    &:hover {
        color: blue;
    }
}
// 继承多个 @extend a, b;
.link {
    @extend a;
    color: orange;
}
```
<font color='red'>注意： media里面不能继承外面的属性</font>


## 运算
### 数字运算
- `+, -, *, /, %` 如果必要会在不同单位间转换值。

### 关系运算
- `<, >, <=, >=` 也可用于数字运算，相等运算 `==, !=` 可用于所有数据类型。

### 颜色运算
- 颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值：
```scss
p {
  color: #010203 + #040506;
}
// 计算 01 + 04 = 05 02 + 05 = 07 03 + 06 = 09，然后编译为
p {
  color: #050709;
}

```
### 字符串运算
- `+` 可用于连接字符串
```scss
p {
  cursor: e + -resize;
}
// 编译为
p {
  cursor: e-resize; 
}
// 注意，如果有引号字符串（位于 + 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 + 左侧）连接有引号字符串，运算结果则没有引号。
// 在有引号的文本字符串中使用 #{} 插值语句可以添加动态的值：
p:before {
  content: "I ate #{5 + 10} pies!";
}

```
### 布尔运算
- 支持布尔型的 `and` `or` 以及 `not` 运算。

### 圆括号
- 圆括号可以用来影响运算的顺序：
```scss
p {
  width: 1em + (2em * 3);
}
// 编译为
p {
  width: 7em; 
}

```


## 插值 #{}
- 如果需要使用变量，同时又要确保 `/` 不做除法运算而是完整地编译到 `CSS` 文件中，只需要用 `#{}` 插值语句将变量包裹。
```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
// 编译为
p {
  font: 12px/30px; 
}

```

## 指令


## 函数

### mixin
```scss
@mixin cont($color: red, $fontSize: 14px) {
    color: $color;
    font-size: $fontSize;
}
body {
    // 按照参数的顺序使用
    @include cont(blue, 16px);
    // 单独使用一个参数
    @include cont($fontSize: 22px);
}
```

## 循环
### @for
```scss
//循环 through包括10  to不包括10
@for $i from 1 through 10 {
    span {
        width: 10% * $i;
    }
}

$i: 1;
```

### @each循环
```scss
// 第一种key形式
$k: 1;
@each $c in blue, red, green {
    .div#{$k}{
        color: $c;
    }
    $k: $k + 1;
}

// 第二种 key,value形式 可以写成(default: blue, info: green, dangger: red)
@each $key, $color in (default, blue), (info, green), (dangger, red) {
    .text-#{$key}{
        color: $color;
    }
}
```


## 输出格式

## @import

### 基本使用
- `Sass` 拓展了 `@import` 的功能，允许其导入 `SCSS` 或 `Sass` 文件。被导入的文件将合并编译到同一个 `CSS` 文件中，另外，被导入的文件中所包含的变量或者混合指令 `(mixin)` 都可以在导入的文件中使用。
- 通常，`@import` 寻找 `Sass` 文件并将其导入，但在以下情况下，`@import` 仅作为普通的 `CSS` 语句，不会导入任何 `Sass` 文件。
```scss
// 文件拓展名是 .css
// 文件名以 http:// 开头；
// 文件名是 url()；
// @import 包含 media queries。
```
### 分音 (Partials)
- 如果需要导入 `SCSS` 或者 `Sass` 文件，但又不希望将其编译为 `CSS`，只需要在文件名前添加下划线，这样会告诉 `Sass` 不要编译这些文件，但导入语句中却不需要添加下划线。
- 例如，将文件命名为 `_colors.scss`，便不会编译 `_colours.css` 文件。
```scss
@import "colors";
// 上面的例子，导入的其实是 _colors.scss 文件

```
<font color='red'>注意，不可以同时存在添加下划线与未添加下划线的同名文件，添加下划线的文件将会被忽略。</font>

### 嵌套 @import
- 假设 `example.scss` 文件包含以下样式：
```scss
.example {
  color: red;
}
//然后导入到 #main 样式内
#main {
  @import "example";
}
//将会被编译为
#main .example {
  color: red;
}
```


## 其它
### 占位选择器
```scss
// 如果没有用到， 那么不会生成css
%a {
    color: red;
    &:hover {
        color: blue;
    }
}

.link {
    @extend %a;
    color: orange;
}
```

## 应用案例

### 适配
```scss
//使用媒体查询来适配  目标适配主流设备
$deviceWidth:320px,350px,360px,375px,384px,400px,411px,414px,424px,480px,540px,600px,640px,750px;
//初始的rem基准值  一般100px好算    把设计稿当做初始设备 对应给的HTML字体大小 初始的rem基准值
$bs:100px;
//把设计稿当做初始设备
$psdW:750px;
//设备的种类
$len:length($deviceWidth);

@mixin adapter($i: 1) {
    @for $i from 1 through $len {
        @media screen and (min-width: nth($deviceWidth,$i)) {
            html{
                font-size: nth($deviceWidth,$i) / $psdW * $bs;
            }
        }
    }
}

@include adapter(1)
```

### 处理2倍图3倍图
```scss
@mixin bg-image($url) {
  background-image: url($url + "@2x.png");
  @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
    background-image: url($url + "@3x.png")
  }
}
```





<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

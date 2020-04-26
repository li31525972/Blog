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



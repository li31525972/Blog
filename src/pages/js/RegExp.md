# RegExp
## 基本语法
```js
    let reg = new RegExp('\\w+')
    let reg = /\w+/
```
## 修饰符
- `g` 表示全局匹配
- `i` 表示不区分大小写匹配
- `m` 表示多行匹配

## 方括号
### `[abc]` 
- 匹配方括号之间的任何字符
```js
    let str = 'abcd'
    let reg = /[abc]/
    console.log(reg.test(str)) // true
    
    let reg = /[abcdefg]/
    console.log(reg.test(str)) // true
```
### `[^abc]` 
- 匹配任何不在方括号之间的字符
```js
    let str = 'abcd'
    let reg = /[^abcdefg]/
    console.log(reg.test(str)) // false
    
    let reg = /[^ab]/
    console.log(reg.test(str)) // true
```
### `[0-9]` 
- 匹配任何从0-9之间的数字
```js
    let str = 20
    let reg = /[0-9]/
    console.log(reg.test(str)) // true
    
    let reg = /[3-9]/
    console.log(reg.test(str)) // false
```
### `[a-z]` 
- 匹配任何从小写a到小写z之间的字符
```js
    let str = 'aa'
    let reg = /[a-z]/
    console.log(reg.test(str)) // true
    
    let str = 'A'
    let reg = /[a-z]/
    console.log(reg.test(str)) // false
```
### `[A-Z]` 
- 匹配任何大写A到大写Z之间的字符
```js
    let str = 'A'
    let reg = /[A-Z]/
    console.log(reg.test(str)) // true
    
    let str = 'a'
    let reg = /[A-Z]/
    console.log(reg.test(str)) // false
```
### `[A-z]` 
- 匹配任何从大写A到小写z之间的字符
```js
    let str = 'a'
    let reg = /[A-z]/
    console.log(reg.test(str)) // true
```
### `(a|b)` 
- 匹配任何指定的选项
```js
    let str = 'a'
    let reg = /([A-Z]|[a-z])/
    console.log(reg.test(str)) // true
```

## 元字符
###  `.` 
- 匹配单个字符，除了换行和行结束符

### `\w` 
- 匹配单词字符

### `\W` 
- 匹配非单词字符

### `\d` 
- 匹配数字

### `\D` 
- 匹配非数字字符

### `\s` 
- 匹配空白字符

### `\S` 
- 匹配非空白字符

### `\b` 
- 匹配单词边界

### `\B` 
- 匹配非单词边界

### `\O` 
- 匹配NULL字符

### `\n` 
- 匹配换行符

### `\f` 
- 匹配换页符

### `\r` 
- 匹配回车符

### `\t` 
- 匹配制表符

### `\v` 
- 匹配垂直制表符

### `\xxx` 
- 匹配以八进制数 xxx 规定的字符。

### `\xdd` 
- 匹配以十六进制数 dd 规定的字符。

### `\uxxxx` 
- 匹配以十六进制数 xxxx 规定的 Unicode 字符。

## 量词
### `n+` 
- 匹配任何包含至少一个 n 的字符串。

### `n*` 
- 匹配任何包含零个或多个 n 的字符串。

### `n?` 
- 匹配任何包含零个或一个 n 的字符串。

### `n{X}` 
- 匹配包含 X 个 n 的序列的字符串。

### `n{X,}` 
- X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。

### `n{X,y}` 
- X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。

### `n$` 
- 匹配任何结尾为 n 的字符串。

### `^n` 
- 匹配任何开头为 n 的字符串。

### `?=n` 
- 匹配任何其后紧接指定字符串 n 的字符串。

### `?!n` 
- 匹配任何其后没有紧接指定字符串 n 的字符串。

## 方法
### exec
- 检索字符串中指定的值。返回找到的值，并确定其位置。

### test
- 检索字符串中指定的值。返回 true 或 false。

### toString
- 返回正则表达式的字符串。

### search
- 检索与正则表达式相匹配的值。

### match
- 找到一个或多个正则表达式的匹配。

### replace
- 替换与正则表达式匹配的子串。

### split
- 把字符串分割为字符串数组。

## 属性
### global
- 判断是否设置了 "g" 修饰符
```js
    let reg = /([A-Z]|[a-z])/
    console.log(reg.global) // false
```

### ignoreCase
- 判断是否设置了 "i" 修饰符
```js
    let reg = /([A-Z]|[a-z])/
    console.log(reg.ignoreCase) // false
```

### lastIndex
- 用于规定下次匹配的起始位置
```js
    let reg = /([A-Z]|[a-z])/
    console.log(reg.lastIndex) // 0
```

### multiline
- 判断是否设置了 "m" 修饰符
```js
    let reg = /([A-Z]|[a-z])/
    console.log(reg.multiline) // false
```

### source
- 返回正则表达式的匹配模式
```js
    let reg = /([A-Z]|[a-z])/
    console.log(reg.source) // ([A-Z]|[a-z])
```



<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

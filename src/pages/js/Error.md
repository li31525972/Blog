# 错误处理和调试

## 错误类型

### Error
- 基类型，其它所有的错误都是继承该类型，很少见，主要用于开发人员抛出自定义错误

### EvalError
- 在使用 `eval()` 函数发生异常时抛出，简单的说就是没有把 `eval` 当成函数使用就会抛出错误, 如：
```js
// Uncaught TypeError: eval is not a constructor
new eval()
```

### RangeError
- 数值超出相应范围时触发


### ReferenceError
- 在找不到对象的情况下触发，通常为访问不存在的变量时触发
```js
// Uncaught ReferenceError: a is not defined
console.log(a)
```


### SyntaxError
- 当把语法错误的 `JavaScript` 字符串传入 `eval()` 函数时触发


### TypeError
- 在变量中保存着意外的类型时，或者访问不存在的方法时都会导致这个错误，一般是由于在执行特定于类型的操作时，变量的类型并不符合要求所致


### URIError
- 在使用 `encodeURI` 或 `decodeURI` 而 `URI` 格式不正确时，会导致这种错误


## 错误处理

### try-catch
```js
    try {
        // 可能会导致错误的代码
    } catch(error) {
        // 在错误发生时怎么处理
    }
```

## 错误监听
```js
window.onerror = function(message, url, line) {
    
}
```



<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

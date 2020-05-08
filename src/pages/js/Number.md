# Number
## ES5
### toFixed()
- 按照指定的小数位返回数值的字符串表示，<font color='red'><b>经常用于做金钱的显示</b></font>
```js
    let str = 10
    console.log(str.toFixed(2)) // 10.00 
```

## ES6
### Number.isFinite()
- `Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。
  

### Number.isNaN()
- `Number.isNaN()`用来检查一个值是否为`NaN`。

### Number.parseInt()
- 和`ES5`的全局方法`parseInt()`一样，只不过移植到`Number`对象上

### Number.parseFloat()
- 和`ES5`的全局方法`parseFloat()`一样，只不过移植到`Number`对象上

### Number.isInteger()
- `Number.isInteger()`用来判断一个数值是否为整数。

### Number.EPSILON
- `JavaScript` 能够表示的最小精度

### Number.isSafeInteger()
- 表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

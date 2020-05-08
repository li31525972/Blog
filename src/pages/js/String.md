# String

## ES5
### charAt()
- 返回在指定位置的字符。
```js
    let str = 'abcdefg'

    console.log(str.charAt(2)) // c
```

### charCodeAt()
- 返回在指定的位置的字符的 `Unicode` 编码。
```js
    let str = 'abcdefg'

    console.log(str.charCodeAt(2)) // 99
```

### concat()
- 连接两个或更多字符串，并返回新的字符串。
```js
    let str = 'abcdefg'

    console.log(str.concat('ssss')) // abcdefgssss
    console.log(str) // abcdefg
```

### String.fromCharCode()
- 将 Unicode 编码转为字符。
```js
    console.log(String.fromCharCode(99)) // c
```

### indexOf()
- 返回某个指定的字符串值在字符串中首次出现的位置。
```js
    let str = 'abcdefg'

    console.log(str.indexOf('c')) // 2
    console.log(str.indexOf('v')) // -1
```

### lastIndexOf()
- 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。
```js
    let str = 'abcdefg'

    console.log(str.lastIndexOf('c')) // 2
    console.log(str.lastIndexOf('v')) // -1
```

### match()
- 查找找到一个或多个正则表达式的匹配。

### replace()
- 在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。参数：
1. 要替换的字符串或正则表达式，请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。
2. 替换的文本
```js
    let str = 'abcdefg'

    console.log(str.replace('ab', 'ss')) // sscdefg
    console.log(str) // abcdefg
```

### search()
- 查找与正则表达式相匹配的值。参数：
1. 查找的字符串或正则表达式
```js
    let str = 'abcdefg'

    console.log(str.search('cd')) // 2 返回查找到的起始位置，没找到返回 -1
```

### slice()
- 	提取字符串的片断，并在新的字符串中返回被提取的部分。参数：
1. 开始位置
2. 可选参数：结束位置(不包含该位置)， 不传则到结尾，如果为负数，从字符串尾部算起
```js
    let str = 'abcdefg'

    console.log(str.slice(2)) // cdefg
    console.log(str.slice(2, 5)) // cde
    console.log(str.slice(2, -1)) // cdef
    console.log(str) // abcdefg
```

### split()
- 	把字符串分割为字符串数组。参数：
1. 可选，字符串或正则表达式
2. 可选，返回的数组的最大长度，没有指定该参数，不考虑它的长度
```js
    let str = 'abcdefg'

    console.log(str.split()) // ["abcdefg"]
    console.log(str.split('')) // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(str.split('c')) // ["ab", "defg"]
    console.log(str.split('', 3)) // ["a", "b", "c"]
    console.log(str) // abcdefg
```

### substr()
- 从起始索引号提取字符串中指定数目的字符。参数：
1. 开始位置，为负数从尾部算起
2. 可选，长度，不传则返回到字符串尾部
```js
    let str = 'abcdefg'

    console.log(str.substr(2)) // cdefg
    console.log(str.substr(-3)) // efg
    console.log(str.substr(-3, 2)) // ef
    console.log(str) // abcdefg
```

### substring()
- 	提取字符串中两个指定的索引号之间的字符(不包括结束位置)。参数：
1. 开始位置，非负整数
2. 结束位置，非负整数
```js
    let str = 'abcdefg'

    console.log(str.substring(2)) // cdefg
    console.log(str.substring(2, 5)) // cde
    console.log(str) // abcdefg
```

### toLowerCase()
- 把字符串转换为小写。
```js
    let str = 'abcDefg'

    console.log(str.toLowerCase()) // abcdefg
```

### toUpperCase()
- 	把字符串转换为大写。
```js
    let str = 'abcDefg'

    console.log(str.toUpperCase()) // ABCDEFG
```

### trim()
- 	去除字符串两边的空白
```js
    let str = '  abcDefg  '

    console.log(str.trim()) // 'abcDefg'
```


## ES6

### String.fromCodePoint()
- 用于从 `Unicode` 码点返回对应字符，可以识别大于0xFFFF的字符，弥补了`String.fromCharCode()`方法的不足
```js
String.fromCharCode(0x20BB7)
```

### String.raw()
- 该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
```js
console.log(String.raw`Hi\n${2+3}!`) // Hi\n5!
```

### codePointAt()
- `codePointAt()`方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

### narmalize()
- `normalize()`方法，用来将字符的不同表示方法统一为同样的形式，这称为 `Unicode` 正规化。

### includes()
- 返回布尔值，表示是否找到了参数字符串。第二个参数为开始搜索的位置
```js
    let str = 'abcdefg'

    console.log(str.includes('bcd')) // true
```

### startsWith()
- 表示参数字符串是否在原字符串的头部。第二个参数为开始搜索的位置
```js
    let str = 'abcdefg'

    console.log(str.includes('ab')) // true
```

### endsWith()
- 表示参数字符串是否在原字符串的尾部。第二个参数为开始搜索的位置
```js
    let str = 'abcdefg'

    console.log(str.endsWith('fg')) // true
```

### repeat()
- `repeat`方法返回一个新字符串，表示将原字符串重复n次。
```js
    let str = 'abcdefg'

    console.log(str.repeat(3)) // abcdefgabcdefgabcdefg
```

### padStart()
- 如果某个字符串不够指定长度，会在头部补全。
```js
    let str = 'abcdefg'

    console.log(str.padStart(10, 'vv')) // vvvabcdefg
```

### padEnd()
- - 如果某个字符串不够指定长度，会在尾部补全。
```js
    let str = 'abcdefg'

    console.log(str.padEnd(10, 'vv')) // abcdefgvvv
```

### trimStart()
- `trimStart()`消除字符串头部的空格，不会改变原始字符串，别名：`trimLeft`
```js
    let str = '   abcdefg   '

    console.log(str.trimStart()) // 'abcdefg   '
```

### trimEnd()
- `trimEnd()`消除尾部的空格。不会改变原始字符串，别名：`trimRight`
```js
    let str = '   abcdefg   '

    console.log(str.trimEnd()) // '   abcdefg'
    console.log(str)  // '   abcdefg   '
```
<font color='red'><b>和ES5的`trim()`相比，功能单一了，没有遇到具体的使用场景</b></font>


### matchAll()
- `matchAll()`方法返回一个正则表达式在当前字符串的所有匹配，

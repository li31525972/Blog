# 类基础
## 私有属性
- 私有属性和私有方法只有在类的内部才可以访问
```js
function Shape() {
    var name = 'Shape'
    var getName = function() {
        console.log(name) // 'Shape'
    }
    getName()
}
var shape = new Shape()
console.log(shape.name, shape.getName()) // 'undefined' 'Error'
```
## 公有属性
- 公有属性和公有方法可以在类的内部使用，也可以通过实例化对象使用
```js
function Shape() {
    this.name = 'Shape'
    this.getName = function() {
        console.log(this.name)
    }
    this.getName()
}
var shape = new Shape()
console.log(shape.name, shape.getName())
```

## Map类的实现
```js
function JMap() {
    var list = {}
    this.set = function(key, value) {
        list[key] = value
        return this
    }
    this.get = function(key) {
        if (list[key]) {
            return list[key]
        }
        return null
    }
    this.has = function(key) {
        if (list[key]) {
            return true
        }
        return false
    }
    this.remove = function(key) {
        if (list[key]) {
            delete list[key]
            return true
        }
        return false
    }
    this.clear = function() {
        list = {}
        return this
    }
    this.forEach = function(fn) {
        for (var key in list) {
            fn(key, list[key])
        }
    }
}
var list = new JMap()
list.set('1', [0, 1]).set('3', { name: '111' })
list.forEach((key, value) => {
    console.log(key, value)
})
```

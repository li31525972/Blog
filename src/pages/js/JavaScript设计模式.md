# JavaScript设计模式

## 创建型设计模式

### 简单工厂模式

1. 通过类实例化对象创建，这些类继承同一个父类，父类原型上的方法是可以共享的

```javascript
function Alert() {
  console.log('alert')
}
function confirm() {
  console.log('confirm')
}
function Prompt() {
  console.log('Prompt')
}
function Message(name) {
	switch(name) {
    case 'alert':
      return new Alert()
    case 'confirm':
      return new Confirm()
    case 'Prompt':
      return new Prompt
  }  
}
var message = new Message('alert')
console.log(message)
```

2. 通过寄生的方式创建的对象都是新的个体，他们的方法不能共用

```javascript
function Message(name) {
	var a = new Object()
  a.name = name
  a.show = function() {
    console.log(this.name)
  }
  return a
}
var message = Message('confirm')
message.show()
console.log(message)
```



### 工厂方法模式
```js
function Message() {
    if (!(this instanceof Message)) {
        return new Message()
    }
}
Message.prototype = {
    Alert: function() {
        console.log('Alert')
    },
    confirm: function() {
        console.log('confirm')
    }
}

var demo = new Demo()
demo.alert()
```

### 抽象工厂模式
- 当在大型应用当中，总有子类去继承父类，这些父类会定义一下方法，但是没有具体的实现，那么一旦用子类创建了一个对象，该对象总是应该具备一些必要的方法，如果这些必要的方法没有去重写实现，那么就会调用父类的方法，可以得到父类友好的提示
```js
function Message(subClass, supType) {
    if (typeof Message[supType] === 'function') {
        var F = function() {}
        F.prototype = new Message[supType]()
        subClass.prototype = new F()
        subClass.constructor = subClass
    } else {
        throw new Error('未创建该抽象类')
    }
}
Message.alert = function() {}
Message.alert.prototype = {
    show: function() {
         throw new Error('抽象方法不能调用！')
    },
    hidden: function() {
         throw new Error('抽象方法不能调用！')
    }
}
function alert() {}
Message(alert, 'alert')
var alert1 = new alert()
alert1.show()
```

### 建造者模式
- 一般工厂方法追求的是创建的结果，而建造者模式不仅仅可以得到创建的结果，更参与了建造的过程
```js
function Human(name, sex) {
	this.name = name
	this.sex = sex || '保密'
}
Human.prototype = {
	getName: function() {
		return this.name
	},
	getSex: function() {
		return this.sex
	}
}
function Work() {}
function Person(options) {
	var _preson = new Human(options.name, options.sex)
	_preson.work = new Work(options.work)
	return _preson
}
let person = new Person({ name: 'xiao ming' })
console.log(person)
```

### 原型模式

### 单例模式
- 保证一个类仅有一个实例，并提供一个全局的访问点(在下一次获取该类的实例的时候，直接返回之前创建的对象)
#### 简单的单例模式
```js
// 这种简单的单例可以定义命名空间、管理代码库的各个模块
var element = {
    utils: {
        method1: function() {},
        method2: function() {}
    },
    ajax: {
        get: function() {},
        post: function() {}
    }
}
// 那么我们想用公共的方法、ajax时候就是这样：
element.utils.method1()
element.ajax.get()
```
#### 单例模式-闭包
```js
// 在es6之前管理常量最长用的方法，因为没有给予赋值变量的方法，只提供了获取变量的方法，从而实现常量的需求
var Config = (function() {
  var conf = {
      name: '小明',
      role: 'admin'
  }
  return {
      // 取值方法
      get(name) {
          return conf[name]
      }
  }
})()
Config.get('name')
```
#### 惰性单例
```js
var Config = (function() {
  var instance = null
  function init() {
      return {
          name: '小明',
          role: 'admin'
      }
  }
  return function() {
    if (!instance) {
         instance = init()
    }
    return instance
  }
})()
console.log(Config().name)
```

## 结构性设计模式

### 外观模式
- 为一组复杂的子系统接口提供一个统一的接口,是对接口方法的外层包装，以供上层代码调用
```js
function addEvent(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false)
    } else if (element.attachEvent) {
        element.attachEvent('on'+ type, fn)
    } else {
        element['on' + type] = fn
    }
}
```
### 适配器模式

### 代理模式

### 装饰者模式

### 桥接模式

### 组合模式

### 享元模式

## 行为型设计模式

### 模板方法模式

### 观察者模式

### 状态模式

### 策略模式

### 职责链模式

### 命令模式

### 访问者模式

### 中介者模式

### 备忘录模式

### 迭代器模式

### 解释器模式



## 技巧型设计模式

### 链模式

### 委托模式

### 数据访问对象模式

### 节流模式

### 简单模板模式

### 惰性模式

### 参与者模式

### 等待者模式

## 架构型设计模式

### 同步模块模式

### 异步模块模式

### widget模式

### MVC模式

### MVP模式

### MVVM模式


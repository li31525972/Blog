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

### 抽象工厂模式

### 建造者模式

### 原型模式

### 单例模式

## 结构性设计模式

### 外观模式

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


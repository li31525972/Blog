# 面向对象
## 概念
- 面向对象的语言都有一个标志，那就是他们都有类的概念，而通过类可以创建任意个具有相同属性和方法的对象，`javascript`中没有类的概念，所以他的对象也和基于类的语言中的对象有所不同，`JavaScript`的对象为无序属性的集合，其属性可以包含基本值、对象、或者函数
- 每个对象都是基于一个引用类型创建的，这个引用类型可以是原生类型，也可以是开发者定义的类型

## 属性类型
```js
let Per = {
    name: '小明’
}
```
- [[Configurable]] 表示能否通过delete删除属性重新定义属性，例子中为true
- [[Enumerable]] 表示能否通过for-in循环返回属性，例子中为true，<font color='red'><b>注意：不是所有浏览器都照此实现</b></font>
- [[Writable]] 表示能否修改属性的值， 例子中为true
- [[Value]] 包含这个属性的数据值，读取属性的时候从这里读，写入的时候将新值保存在这个位置，默认值为undefined


- 要修改属性的特性，只能用<font color='red'><b>Object.defineProperty()</b></font>方法，这个方法接收三个参数：
    1. 属性的对象
    2. 属性的名字
    3. 描述符对象(描述符对象的属性必须是：Configurable、Enumerable、Writable和Value)
```js
    // 定义一个对象
    let Per = {
        name: '小明',
        sayhi() {
            alert(this.name)
        }
    }
    Object.defineProperty(Per, 'name', {
        writable: false, // 设置为不可修改对象的值
        configurable: false, // 设置属性不能删除
        enumerable: false, // 设置为不能for-in循环出属性
        value: '小红'
    })
    Per.name = '小兰'
    console.log(Per.name); // 小红
    Per = {
        name: '小白'
    }
    console.log(Per.name) // 小白 对象的指针修改了
```

## 创建对象
### 工厂模式
- 有兴趣自行百度，基本不用

### 构造函数模式
```js
    function Person(name, age) {
        this.name = name
        this.age = age

        this.sayName = function() {
            return this.name
        }
    }

    let person1 = new Person('小明', 18)
    let person2 = new Person('小红', 20)
    console.log(person1.name, person1.age, person1.sayName()) // 小明 18 小明
    console.log(person2.name, person2.age, person2.sayName()) // 小红 20 小红
```
<font color='red'><b>构造函数和普通函数的区别就是只能通过 `new` 操作符创建实例</b></font>, 以这种方式调用构造函数实际上会经历以下4个步骤：
1. 创建一个空对象
2. 将构造函数的作用域赋给新对象(因此this就指向了这个新对象)
3. 执行构造函数内的代码(为新对象添加属性和方法)
4. 返回新对象

<font color='red'><b>创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，这正是构造函数胜过工厂模式的地方</b></font>

### 原型模式
- 构造函数也能满足需求，为什么要用原型模式？ 向上面的代码中构造函数内有个sayName函数，但是person1和person2中的两个`sayName`方法<font color='red'><b>不是同一个 `Function` 实例，`ECMAScript`中函数也是对象</b></font>，因此每实例化一个对象，可以这么理解：
```js
    function Person(name, age) {
        this.name = name
        this.age = age

        this.sayName = new Function() // 每次都新建一个函数
    }
```
创建两个完成同样任务的`Function`实例没有必要，况且有this对象在，根本不用在执行代码前将函数绑定到特定对象上面，那么怎么解决呢？
```js
    function Person(name, age) {
        this.name = name
        this.age = age

        this.sayName = sayName
    }

    function sayName() {
        return this.name
    }
```

上面例子中将`sayName`方法转移到了构造函数的外部，等于设置成了全局的`sayName`函数，这样一来person1和person2就共享了同一个`Function`实例，可是新问题又来了，在全局中定义的函数实际上只是被某个对象调用，让这个全局函数有点名不符实，更让人无法接受的是：如果对象需要定义很多方法，那么就需要定义很多个全局函数，
那么这个构造函数就没有丝毫封装性可言了，好在原型模式提供了解决的方法，请看下面 `prototype` 章节

### 原型模式的问题
- 原型模式省略了构造函数传递初始化参数这一环节，结果所有的实例在默认情况下会取得相同的属性和方法，虽然有些不方便，但不是最大的问题，最大的问题是由其共享的本性导致的共享引用类型的数据
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.list = [1, 2]
    let person1 = new Person()
    person1.list.push(3)
    let person2 = new Person()
    console.log(person1.list) // [1, 2, 3]
    console.log(person2.list) // [1, 2, 3]
    
```
- 如果初衷就是要所有的实例，那么这个结果没问题，一般实例都要有属于自己的属性，那么这个就是个问题了，解决方案 -> 请看组合使用构造函数和原型模式

### 组合使用构造函数和原型模式
- <font color='red'><b>最常用的创建自定义类型的方式</b></font>
```js
    function Person(name, age, list) {
        this.name = name
        this.age = age
        this.list = list
    }
    Person.prototype.sayName = function() {
        return this.name
    }
    let person1 = new Person('小明', 18, [1, 2])
    let person2 = new Person('小红', 20, [3, 4, 5])
    console.log(person1) // {name: "小明", age: 18, list: Array(2)}
    console.log(person2) // {name: "小红", age: 20, list: Array(3)}
```
- 每个实例都会有自己的一份实例属性的副本，同时又共享着对方法的引用
- <font color='red'><b>这种构造函数和原型混合的模式，是目前使用最广泛的一种创建自定义类型的方法，可以说就是定义引用类型的默认模式</b></font>


## 原型属性和方法

### prototype
- 每个函数都有一个<b>`prototype`</b>原型属性，这个属性时一个指针，指向一个对象，使用原型对象的好处是可以让所有的对象实例共享它所包含的属性和方法，这样就不必再构造函数内部定义对象实例的信息，而是可以将这些信息直接添加到原型对象中，举例：
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    console.log(person1.name, person1.age, person1.sayName()) // 小明 18 小明
```
- 向上面所示，我们将 `sayName` 方法直接添加到了 `Person` 的 `prototype` 属性中， 构造函数变成了一个空函数，即使这样，我们也可以通过调用构造函数创建实例，而且新实例当中也会包含同样的属性和方法，但是与构造函数不同的是，所有的实例访问的都是同一个属性和 `sayName` 方法, <font color='red'>虽然所有的对象实例都可以访问原型上的属性和方法，但是不能通过对象实例重写原型中的值，只会屏蔽覆盖</font>,看下面例子：
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    let person2 = new Person()

    person1.name = '小红'
    person1.age = 20
    console.log(person1.name, person1.age) // 小红 20 实例属性
    console.log(person2.name, person2.age) // 小明 18 原型属性
```
- 当代码搜索对象的某个属性的时候会先搜索对象的实例，如果有就返回，如果没有就搜索原型，每当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中的同名属性，换句话说就是只会阻止我们访问那个属性，不会修改原型上的属性， 但是使用 <font color='red'><b>delete</b></font> 操作符可以删除实例属性，让我们重新访问原型属性：
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    let person2 = new Person()

    person1.name = '小红'
    person1.age = 20
    delete person1.name
    console.log(person1.name, person1.age) // 小明 20
    console.log(person2.name, person2.age) // 小明 18
```

- 简洁语法
```js
    function Person() {}
    Person.prototype = {
        name: '小明',
        age: 18
    }
    // 注意：constructor 的值改变了，不在指向 Person 而是指向新的对象，怎么解决呢？
    Person.prototype = {
        constructor: Person,
        name: '小明',
        age: 18
    }
    // 但是这样会导致它的 Enumerable 属性设为false，默认情况下，原生的 constructor 属性是不可枚举的，如果兼容 ECMAScript5的jsvascript引擎，可以试一试 Object.defineProperty()
```

### hasOwnProperty()
- 使用 `hasOwnProperty()` 方法可以检测一个属性或方法是存在于实例中还是原型中
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    let person2 = new Person()

    person1.name = '小红'
    person1.age = 20
    console.log(person1.hasOwnProperty('name')) // true
    console.log(person2.hasOwnProperty('name')) // false
```

### in
- 判断一个属性是否存在于实例或原型中
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    let person2 = new Person()

    person1.name = '小红'
    person1.age = 20
    console.log('name' in person1) // true
    console.log('name' in person2) // true
    console.log('name1' in person1) // false
```

### constructor
- 所有的原型对象会自动获得一个 `constructor` 属性，这个属性包含一个指向 `prototype` 属性所在函数的指针，会返回当前对象原型创建的函数
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    console.log(Person.prototype.constructor) // Person() {}
```

### isPrototypeOf()
- 虽然在所有的实例中都无法访问到 `prototype`，但是可以通过 `isPrototypeOf` 来判断对象之间是否存在引用：
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    console.log(person1.name, person1.age, person1.sayName())
    console.log(Person.prototype.isPrototypeOf(person1)) // true
```
- `person1` 内部有一个指针指向了 `Person.prototype` 那么就返回 true

### getPrototypeOf()
- 该方法返回 `prototype` 的值
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    console.log(Object.getPrototypeOf(person1))
    // 相当于 Person.prototype
```

### keys()
- 返回对象上所有可枚举的实例属性
```js
    function Person() {}
    Person.prototype.name = '小明'
    Person.prototype.age = 18
    Person.prototype.sayName = function() {
        return this.name
    }

    let person1 = new Person()
    let person2 = new Person()

    person1.name = '小红'
    console.log(Object.keys(person1)) // ["name"]
```

## 类属性
### 私有属性
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
### 公有属性
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

### Map类的实现
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
## 类方法
### 静态属性、方法
- 在构造函数本身上添加的属性或方法称之为静态属性和静态方法，只能通过构造函数去调用，不能通过实例调用
```js
function Person() {}
Person.title = '1'
Person.showTitle = function() {
    console.log(this.title)
}
console.log(Person.title) // '1'
Person.showTitle() // '1'

var person = new Person()
console.log(person.title) // 'undefined'
person.showTitle() // 'Error'
```
### 实例属性、方法
- 在构造函数中通过`this`添加的属性和方法，只能通过实例才能访问
```js
function Person() {
    this.title = '2'
    this.showTitle = function() {
        console.log(this.title)
    }
}
console.log(Person.title) // 'undefined'
Person.showTitle() // 'Error'
var person = new Person()
console.log(person.title) // '2'
person.showTitle() // '2'
```
### 原型属性、方法
- 构造函数通过`prototype`定义在原型上面的属性和方法称之为原型属性、方法，原型属性和原型方法构造函数和实例都可以访问
```js
function Person() {}
Person.prototype.title = '2'
Person.prototype.showTitle = function() {
    console.log(this.title)
}
console.log(Person.prototype.title) // '2'
Person.prototype.showTitle() // '2'

var person = new Person()
console.log(person.title) // '2'
person.showTitle() // '2'
```

## `{}`空类
### 访问原型
- 空类的原型可以通过`Object.getPrototypeOf()`访问，也可以通过`__proto__`访问
```js
var person = {}
Object.getPrototypeOf(person).title = '1'
person.__proto__.showTitle = function() {
    console.log(this.title)
}

console.log(person.title) // '1'
person.showTitle() // '1'
```

## 继承和原型链
### 继承概念
- 大多数语言的都支持两种继承方式：接口继承和实现继承，在 `ECMAScript` 因为没有函数签名，无法实现接口继承，只支持实现继承，而实现继承主要靠原型链来实现

### 继承的简单案例
```js
function Person() {
    this.title = '1'
    this.showTitle = function() {
        console.log(this.title)
    }
}
function Student() {
    this.level = 1
    this.showLevel = function() {
        console.log(this.level)
    }
}
Student.prototype = new Person()
// 修正 Student 构造函数的指向
Student.prototype.constructor = Student

var person = new Person()
var student = new Student()

person.constructor.prototype.hi = function() {
    console.log('hi')
}
// 如果不修正指向 那么 student.constructor 将指向 Person
student.constructor.prototype.show = function() {
    console.log('show')
}
console.log(student.hi) // 'hi'
console.log(student.show) // 'show'
console.log(person.hi) // 'hi'
console.log(person.show) // 'Error'
```
### 继承封装
```js
function extend(subClass, supClass) {
    var F = function() {}
    F.prototype = supClass.prototype
    
    subClass.prototype = new F()
    subClass.prototype.constructor = subClass
    
    subClass.supClass = supClass.prototype
    if (supClass.prototype.constructor = Object.prototype.constructor) {
        supClass.prototype.constructor = supClass
    }
}
function Teacher(name, book) {
    Teacher.supClass.constructor.call(this, name)
    this.book = book
    this.getName = function() {
        return this.name
    }
}
extend(Teacher, Person)
var teacher = new Teacher('张三', '体育')
teacher.getName()
```
### 组合继承
- 最常用的继承方式
```js
    function A(name) {
        this.name = name
    }

    function B(name, age) {
        A.call(this, name)
        this.age = age
    }
    B.prototype = new A()
    B.prototype.constructor = B

    let person1 = new B('小明', 20)
    let person2 = new B('小红', 18)
    console.log(person1) // {name: "小明", age: 20}
    console.log(person2) // {name: "小红", age: 18}
```
#### 优点
1. 子类可以向父类传参
2. 实例可以既传承父类实例的属性和方法，也可以继承原型上的属性和方法
3. 多个实例之间不存在公用父类的引用属性的问题
#### 缺点
1. 当多次调用父类的构造函数，将生成多分实例

### 原型式继承
- 请自行百度搜索

### 寄生式继承
- 请自行百度搜索

### 寄生组合式继承
- 请自行百度搜索

### 原型链概念
- 利用原型让一个引用类型继承另一个引用类型的属性和方法，举例：让一个原型对象等于另一个类型的实例，那么此时的原型对象包含一个指向和另一个原型的指针，相应的，另一个原型中也包含一个指向和另一个构造函数的指针，层层递进，构成了实例于原型的链条， 这就是原型链的基本概念
```js
    function A(name) {
        this.name = name
    }

    function B(age) {
        this.age = age
    }
    B.prototype = new A('小明')

    let person = new B(20)
    console.log(person) // person 继承了 B， B继承了A
```




1<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

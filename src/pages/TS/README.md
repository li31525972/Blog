# TypeScript
## 基本类型
1. `boolean`
2. `null`
3. `undefined`
4. `number`
5. `string`
6. `symbol`
7. `object`

### 变量声明
```typescript
// boolean 布尔类型
let flag: boolean = false
// number 数值类型
let a: number = 1
// string 字符串类型
let name: string = '小明'
// undefined 
let sex: undefined = undefined
// null
let str: null = null
// Array 数组类型
let list: number[] = [1, 2, 3]
// 数组泛型 Array<元素类型>
let list: Array<number> = [1, 2, 3]
```
### 类型断言
```typescript
let str: any = 'this is a string'

// 第一种 使用<>
let strLength: number = (<string>str).length

// 第二种 关键字 as
let strLength: number = (str as string).length
```
<font color='red'>两种形式是等效的，具体使用哪一种，看个人偏好</font>

### 泛型
1. 泛型函数
```typescript
function hello<T>(arg: T): T {
    return arg
}
// 给hello函数添加了泛型变量T，T代表用户即将传入的类型，最后还使用T作为返回值的类型

// 使用方式：
let output = hello<string>('hello')
// 这里明确指定 T 是string类型，并将它作为参数传递给函数，如果要使用number类型，在<>中写入number即可
```
2. 泛型变量
```typescript
// 看上面的hello函数，如果需要用到arg的长度时，就会出错
function hello<T>(arg: T): T {
    console.log(arg.length) // Error: T doesn't have .length 
    return arg
}
// 报错没有length属性，(如果是数值类型的)，那么就可以用泛型数组来解决
function hello<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
// 或者用Array
function hello<T>(arg: Array<T>): Array<T> {
    console.log(arg.length)
    return arg
}
```

### 枚举 enum
1. 数字枚举
```typescript
enum order{
    start = 1,
    unpaid,
    shipping,
}
// 当只写start=1时，后面的枚举变量就是递增的
// 如果变量的值都不写呢，start的值就是0了，后面的依次递增
```
<font color='red'><p>通常这样写，是不关心变量的具体值的，我们只知道这些值是不同的</p></font>
2. 字符串枚举
```typescript
enum order{
    start = 'a',
    unpaid = 'b',
    shipping = 'c',
}
// 在字符串枚举中，所有成员必须都是字符串字面量，并且必须手动初始化
```
3. 反向映射
```typescript
enum Enum{
    A
}
const count = Enum.A // 0
const constName = Enum[0]

```
4. 注意事项
```typescript
// 在枚举类型中的值必须是确定的，比如：这样的写法是不允许的
enum Example{
    A = hello(), // Error
    B,
}

```

### symbol
```typescript
// 和 JavaScript 一样
const symboll = Symbol('hello')

const obj = {
    [symboll]: 'value'
}
```

### iterator 和 generator

## 高级类型
### interface
- `interface` 关键字可以用于描述对象的结构
```typescript
interface A {
    a: number,
    b: string,
    c: number[]
}
// 表达对象的类型是 interface 最常用的场景
```

### 交叉类型
- 交叉类型是指将多个对象类型合并为一个新的对象类型
```typescript
// 基本案例：
interface A {
    d: number,
    e: string,
}
interface B {
    f: string,
    g: string
}
type C = A & B
let c: C
// type 用来声明类型变量

// 如果交叉类型有属性冲突时：
interface A {
    d: number,
    e: string,
}
interface B {
    d: string,
    g: string
}
type C = A & B
let c: C
c.d = 1
// d无论如何赋值都不能通过类型检查，那么怎么解决呢？请看下面的联合类型

```

### 联合类型
- 联合类型用于把值区分为不同的类型
- 联合类型表示一个变量可以是几种类型之一，用 `|` 分隔每个类型，看下面案例：
```typescript
let str: string | number | boolean // 多种类型的变量声明

// interface 相关
interface A {
    d: number,
    e: string,
}
interface B {
    d: string,
    g: string
}
type C = A | B
let c: C
c.d = 1
// 当属性冲突时这样就能通过类型检查了
```

### 类型保护
- 要实现类型保护，只需要定义一个函数就行，但返回值必须是一个主谓宾语句，如下所示：
```typescript
function isTeacher(person: Teacher | Student): person is Teacher {
    return (<Teacher>person).teach !== undefined
}
// 例子中，person is Teacher 就是类型保护语句

// 看下面完整示例：
interface Teacher {
    teach(): void
}
interface Student {
    learn(): void
}
function getPerson(): Teacher | Student {
  return {} as Teacher
}
const person = getPerson()

function isTeacher(person: Teacher | Student): person is Teacher {
    return (<Teacher>person).teach !== undefined
}
if (isTeacher(person)) {
    person.teach()
} else {
    person.learn()
}
```

### 类型区分

### typeof
- 类型保护
```typescript
function isString(str: number | string): str is string {
    return typeof str === 'string'
}
// TypeScript 会将 typeof str = 'string' 为一种类型保护
// 注意：typeof在 TypeScript 只有在匹配基本类型时，才会启用类型保护
```

### instanceof
- `instanceof` 相较于 `typeof` 其类型保护更为精细，是通过构造函数来区分类型的一种方式
```typescript
interface Person {
    talk(): void
}
class Teacher implements Person {
    constructor(name: string) {}
    talk() {
        
    }
}
class Student implements Person {
    constructor(name: string, age: number){}
    talk() {
        
    }
}

function getPerson() {
    return Math.random() < 0.5 ? new Teacher('小明') : new Student('小红', 18)
}

const person = getPerson()

if (person instanceof Teacher) {
    person // Teacher
}
if (person instanceof Student) {
    person // Student
}

// 看上面 instanceof 在类型的使用上，与 typeof 相比，可以将类作为比较对象从而实现类型保护
```

### 类型别名
- 类型别名就是给一个类型起一个新的名字
```typescript
type age = number
// 类型别名也可以是泛型
type Person<T> = { age: T }

// 也可以使用类型别名在属性里引用自己，很像递归：
type Person<T> = {
    name: T,
    mothor: Person<T>
}
```

### 字面量类型
```typescript
// 简单案例：
type Profession = 'teacher'

// 通常结合联合类型使用：
type Profession = 'teacher' | 'doctor' | 'student'

// 当然数字字面量类型也是可以的，和上面一致
```

### 可选参数和可选属性
- 使用了 `--strictNullChecks`，可选参数会被自动地加上 `| undefined`:
```typescript
// 可选参数
function f(x: number, y?: number) {
    return x + (y || 0)
}
// 可选属性
class C {
    a: number;
    b?: number;
}
```

### 索引类型

### 映射类型
- 一个常见的任务是将一个已知的类型每个属性变为可选的
```typescript
interface Person {
    name?: string,
    age?: number
}

// 或者要一个只读版本
interface PersonReadonly {
    readonly name: string,
    readonly age: number
}

// 在映射类型里，新类型以相同的形式去转换旧类型里的每个属性，示例：
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}
// 使用：
type PersonReadonly = Readonly<Person>
```

### 类型推导

## 函数
- 和 `JavaScript` 一样，`TypeScript` 函数可以创建有名字的函数和匿名函数。 你可以随意选择适合应用程序的方式，不论是定义一系列API函数还是只使用一次的函数。
### 定义函数
- 函数类型包含两部分：参数类型和返回值类型。
```typescript
function add(x: number, y: number): number {
    return x + y;
}
```
<font color='red'>我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 `TypeScript` 能够根据返回语句自动推断出返回值类型，因此我们通常省略它。</font>

### 参数
```typescript
// 可选参数：
function f(x: number, y?: number) {
    return x + (y || 0)
}

// 默认参数：
function f(x: number, y = 0) {
    return x + (y || 0)
}
```

### 重载

## 接口 interface
### 接口定义
```typescript
interface Person {
    name: string; // 必传
    age?: number; // 可选
    readonly sex: string; // 只读
    [propName: string]: any; // 任意数量的其它属性
}
```

### 函数类型
```typescript
// 定义函数接口
interface searchFunc {
    (source: string, str: string): boolean
}
// 使用
let mySearch: searchFunc = function(src: string, str: string): boolean {
    return src.includes(str)
}
```

### 可索引类型 Array
```typescript
interface stringArray {
    [index: number]: string
}

let newArray: stringArray = ['1', '2']
let str: string = newArray[0]
```

### 继承接口
```typescript
// 定义接口
interface Person {
    name: string;
}
interface Teacher {
    age: number;
}

// 继承接口
interface Man extends Person {
  sex: string
}

// 继承多个接口
interface Man extends Person, Teacher {
    stature: number
}
```

## 类
### 类定义
```typescript
class Message {
    msg: string;
    constructor(message: string) {
        this.msg = message
    }
    getMsg() {
        return `hello ${this.msg}`
    }
}

let message = new Message('word')
```

### 实现接口
- 接口描述了类的公共部分，不会检查类是否具有某些私有成员
- 用接口来明确的强制一个类去符合某种规则，示例：
```typescript
interface Person {
    name: string; // 类属性
    getName(name: string): string // 类方法
}

class Man implements Person {
    name: string;
    constructor(name: string, y: number) {
        this.name = name
    }
    getName(name:string): string {
        return this.name
    }
}
```

### 类继承
```typescript
class Message {
    msg: string;
    constructor(message: string) {
        this.msg = message
    }
    getMsg() {
        return `hello ${this.msg}`
    }
}

class MessageError extends Message {
    color: string;
    constructor(name: string) {
        super(name)
    }
}
// 使用 extends 关键字创建了一个 Message 的子类 MessageError
// 派生类包含了一个构造函数，它必须调用super， 并会执行基类的构造函数
// 在构造函数里访问this属性之前一定要执行 super
```

### 只读属性 readonly
```typescript
class Person {
    readonly name: string;
}
```

### 静态属性 static
```typescript
class Person {
    static name: string;
}
```

### 抽象类

## 命名空间 namespace
### 单文件命名空间
```typescript
namespace PersonAll {
    export interface Teacher {
      
    }
    export interface Student {
      
    }
    export class L implements Teacher, Student {
        
    }
}
```

### 多文件命名空间
```typescript
// a.ts
namespace Teacher {
    
}

// b.ts
namespace Student {
    
}

// 涉及多文件时，必须确保所有编译后的代码都被加载了
// 加载方式有2两种：
// 1. 把所有的编译文件输出为一个文件
// 2. 通过 script 标签把所有生成的js文件按照顺序引入进来
```

### 别名
- 简化命名空间操作的方法
```typescript
namespace Teacher {
    
}

import person = Teacher
```


### 外部命名空间
```typescript
declare namespace Person {
    
}

declare var teacher: Person;
```


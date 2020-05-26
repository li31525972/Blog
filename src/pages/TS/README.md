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

```
3. 反向映射
```typescript

```
4. 注意事项
```typescript
// 在枚举类型中的值必须是确定的，比如：这样的写法是不允许的

```

### symbol

### iterator 和 generator

## 高级类型
### interface

### 交叉类型

### 联合类型

### 类型保护

### 类型区分

### typeof

### instanceof

### 类型别名

### 字面量类型

### 索引类型

### 映射类型

### 类型推导

## 函数
### 定义函数

### 参数

### 回调函数

### promise

### async 和 await

### 重载

## 接口
### 接口定义

### 函数类型

### 可索引类型

### 继承接口

## 类
### 类定义

### 实现接口

### 继承

### 存储器

### 只读属性

### 类函数和静态函数

### 抽象类

## 命名空间
### 单文件命名空间

### 多文件命名空间

### 别名

### 外部命名空间

## 模块
### 导出与导入

### 生成模块

### 外部模块

# 数据结构
- 数据结构，对应英文单词是`data structure`，是数据的组织、管理和存储格式，其使用目的是为了高效的访问和修改数据, 数据结构的组成方式有：
3. 栈和队列
4. 散列表
1. 线性结构
2. 树
3. 图
4. 其他数据结构

## 线性结构
### 数组
- 优势： 数组拥有非常高效的随机访问能力，只要给出下标，就可以用常量时间找到对应元素，有一种高效查找元素的算法叫做二分查找，就是利用了数组的这个优势
- 劣势： 在插入和删除元素方面由于数组元素连续紧密的存储在内存中，插入、删除元素都会导致大量元素的被迫移动，影响效率


### 链表
- 优势：在元素的更新、插入、删除的操作时间复杂度是O(1)
- 劣势：在元素的查找方面，时间复杂度是O(n)

### 栈
- 栈是一种遵从后进先出原则的有序集合，新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端称作栈底，在栈里新元素靠近栈顶，旧元素都接近栈底，栈的基本操作为入栈和出栈


#### 栈的应用
- 栈的输出顺序和输入顺序相反，所以栈通常用于对历史的回溯，也就是逆流而上追溯历史，比较著名的应用场景就是面包屑导航，接下来看具体实现的例子：
```js
// 创建一个类表示栈
class Stack {
    // 各种属性和方法的声明
    constructor() {
        // 保存栈里的元素
        this.items = []
    }
    /**
    * 接下来是为栈声明的一些方法
    */
    // 添加一个或多个新元素到栈顶
    push(value) {
    	this.items.push(value)
    }
    // 移除栈顶的元素，同时返回被移除的元素
    pop() {
    	this.items.pop()
    }
    // 返回栈顶的元素，不对栈做任何修改
    peek() {
    	return this.items[this.items.length - 1]
    }
    // 判断栈里有没有元素，有返回true没有返回false
    isEmpty() {
    	return this.items.length > 0
    }
    // 移除栈里的所有元素
    clear() {
    	this.items = []
    }
    // 返回栈里的元素个数
    size() {
    	return this.items.length
    }
    // 打印栈中的元素
    print() {
    	console.log(this.items)
    }
}

let stack = new Stack()
stack.push(1)
console.log(stack.peek())
console.log(stack.size())
console.log(stack.isEmpty())

stack.clear()
stack.print()
```

### 队列
- 队列中的元素只能先入先出，基本操作为入队和出队，对于链表实现的队列操作和栈是差不多的，但是对数组实现的方式

#### 队列的应用
- 队列的输出顺序和输入顺序相同，所以队列通常用于对历史的回放，也就是按照历史顺序，把历史重演一遍，例如网络爬虫实现网站抓取时，也是把待抓取的网站URL存入队列中，再按照存入队列的顺序来依次抓取和解析的，接下来看具体实现的例子：
```js
// 创建一个类表示队列
class Queue {
	// 各种属性和方法的声明
	constructor() {
		// 保存队列里的元素
		this.items = []
	}
	// 添加新的项
	push(value) {
		this.items.push(value)
	}
	// 移除队列的第一项
	shift() {
		return this.items.shift()
	}
	// 返回队列里的第一个元素，队列不做任何变动
	front() {
		return this.items[0]
	}
    // 判断队列里有没有元素，有返回true没有返回false
    isEmpty() {
    	return this.items.length > 0
    }
    // 移除队列里的所有元素
    clear() {
    	this.items = []
    }
    // 返回队列里的元素个数
    size() {
    	return this.items.length
    }
    // 打印队列中的元素
    print() {
    	console.log(this.items)
    }
}

let queue = new Queue()
queue.push(1)
queue.print()
console.log(queue.shift())
queue.print()
```

### 双端队列

### 优先队列
- 优先队列不再遵循先入先出的原则，而是分为两种情况
1. 最大优先队列， 无论入队顺序如何，都是当前最大的元素优先出队
2. 最小优先队列， 无论入队顺序如何，都是当前最小的元素优先出队

#### 优先队列的实现
1. 最大堆的堆顶是整个堆中的最大元素
2. 最小堆的堆顶是整个堆中的最小元素

- 因此，可以用最大堆来实现最大优先队列，用最小堆实现最小优先队列


### 散列表
- 散列表也叫哈希列表，这种数据结构提供了键和值的映射关系，只要给出一个Key，就可以高效的查找到它所匹配的Value，时间复杂度接近于O(1)

#### 基本原理
- 散列表在本质上也是一个数组，通过哈希函数把Key和数组的下标进行转换。


## 非线性结构
### 树

### 二叉树

### 二叉堆

### 图

<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

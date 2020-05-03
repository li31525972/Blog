# Date
## parse()
- 根据指定日期字符串返回该日期相应的毫秒数
```js
    let now = new Date('2010-05-02')
    let cur = Date.parse('2010-05-02')
    console.log(now) // Sun May 02 2010 08:00:00 GMT+0800 (中国标准时间)
    console.log(cur) // 1272758400000
```

## UTC()
- 根据参数返回相应日期的毫秒数，<font color='red'><b>*号为必传项</b></font>,参数：
1. <font color='red'><b>*</b></font>年份
2. <font color='red'><b>*</b></font>月份(0-11)
3. 月中那一天(0-31)
4. 小时数(0-23)
5. 分钟
6. 秒
7. 毫秒
```js
    let now = Date.UTC(2010, 5, 2)
    console.log(now) // 1275436800000
```
## now()
- 获取当前时间的毫秒数
```js
    let now = Date.now()
    console.log(now) // 1588405202958

```

## getFullYear()
- 返回给定日期当前的年份
```js
    let cur = new Date().getFullYear()
    console.log(cur) // 2019
```

## getMonth()
- 返回给定日期当前的月份(月份为0-11)
```js
    let cur = new Date().getMonth()
    console.log(cur) // 7
```

## getDate()
- 返回指定日期当前几号
```js
    let cur = new Date().getDate()
    console.log(cur) // 2
```

## getDay()
- 返回给定日期当前是星期几
```js
    let cur = new Date().getDay()
    console.log(cur) // 6
```

## getHours()
- 返回给定日期当前的小时数(0-23)
```js
    let cur = new Date().getHours()
    console.log(cur) // 15
```

## getMinutes()
- 返回给定日期当前的分钟数
```js
    let cur = new Date().getMinutes()
    console.log(cur) // 58
```

## getSeconds()
- 返回给定时间当前的秒数
```js
    let cur = new Date().getSeconds()
    console.log(cur) // 20
```

## getTime()
- 返回指定日期相应的毫秒数
```js
    let cur = new Date().getTime()
    console.log(cur) // 1588405595285
    
    let cur = new Date('2010-05-01').getTime()
    console.log(cur) // 1272672000000
```

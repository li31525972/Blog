# axios

## 目录介绍
```
├── dist
│   ├── axios.js
│   ├── axios.map
│   ├── axios.min.js
│   └── axios.min.map
├── index.d.ts
├── index.js
├── lib
│   ├── adapters
│   │   ├── README.md
│   │   ├── http.js
│   │   └── xhr.js
│   ├── axios.js                        // 入口文件
│   ├── cancel
│   │   ├── Cancel.js
│   │   ├── CancelToken.js
│   │   └── isCancel.js
│   ├── core
│   │   ├── Axios.js
│   │   ├── InterceptorManager.js
│   │   ├── README.md
│   │   ├── buildFullPath.js
│   │   ├── createError.js
│   │   ├── dispatchRequest.js
│   │   ├── enhanceError.js
│   │   ├── mergeConfig.js
│   │   ├── settle.js
│   │   └── transformData.js
│   ├── defaults.js
│   ├── env
│   │   ├── README.md
│   │   └── data.js
│   ├── helpers
│   │   ├── README.md
│   │   ├── bind.js
│   │   ├── buildURL.js
│   │   ├── combineURLs.js
│   │   ├── cookies.js
│   │   ├── deprecatedMethod.js
│   │   ├── isAbsoluteURL.js
│   │   ├── isAxiosError.js
│   │   ├── isURLSameOrigin.js
│   │   ├── normalizeHeaderName.js
│   │   ├── parseHeaders.js
│   │   ├── spread.js
│   │   └── validator.js
│   └── utils.js
├── package.json
├── tsconfig.json
└── tslint.json
```

## 创建过程
```javascript

// 构造函数
function Axios(config) {
    this.defaults = config
    this.intercepters = {
        request: {},
        response: {}
    }
}

// 原型上面添加相关方法
Axios.prototype.request = function (config) {
    console.log('发送请求，请求类型为：' + config.method)
}

Axios.prototype.get = function (config) {
    console.log('GET')
}
Axios.prototype.post = function (config) {
    console.log('POST')
}


// 创建实例
function createInstance(defaultConfig) {
    // 创建一个实例对象
    const context = new Axios(defaultConfig)
    // 创建请求函数 -->   axios({})
    const instance = Axios.prototype.request.bind(context)

    // 将Axios原型上面的方法添加到 instance 函数上，同时将 this 指向为 context 实例上面
    Object.keys(Axios.prototype).forEach(key => {
        instance[key] = Axios.prototype[key].bind(context)
    })

    // 将实例上面的属性添加到 instance 函数上面
    Object.keys(context).forEach(key => {
        instance[key] = context[key]
    })

    instance.create = function (config) {
        return createInstance(Object.assign({}, defaultConfig, config))
    }

    // 返回 instance 对象
    return instance
}

const axios = createInstance({ method: 'get' })

console.dir(axios)
```




























<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>

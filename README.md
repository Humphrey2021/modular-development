<!-- const BLOGURL = https://github.com/Humphrey2021/modular-development/blob/main -->

# 模块化开发

模块化开发，是前端当下最重要的开发范式之一；模块化三个字其实只是一个思想

## 模块化的演变过程
代码参考`evolution`文件夹
### 阶段一：文件划分方式
基于文件的划分模块的方式

具体做法就是将每个功能及其相关状态数据各自单独放到不同的文件中，约定每个文件就是一个独立的模块，使用某个模块就是将这个模块引入到页面中，然后直接调用模块中的成员（变量 / 函数）

缺点十分明显：
1. 所有模块都直接在全局工作，没有私有空间，所有成员都可以在模块外部被访问或者修改，污染全局作用域
2. 而且模块一段多了过后，容易产生命名冲突
3. 无法管理模块与模块之间的依赖关系

### 阶段二：命名空间方式
每个模块只暴露一个全局对象，所有模块成员都挂载到这个对象中

具体做法就是在第一阶段的基础上，通过将每个模块「包裹」为一个全局对象的形式实现，有点类似于为模块内的成员添加了「命名空间」的感觉。

通过「命名空间」减小了命名冲突的可能，但是同样没有私有空间，所有模块成员也可以在模块外部被访问或者修改，而且也无法管理模块之间的依赖关系。

### 阶段三：
使用立即执行函数表达式（IIFE：Immediately-Invoked Function Expression）为模块提供私有空间

具体做法就是将每个模块成员都放在一个函数提供的私有作用域中，对于需要暴露给外部的成员，通过挂在到全局对象上的方式实现

有了私有成员的概念，私有成员只能在模块成员内通过闭包的形式访问。

### 阶段四：
利用 IIFE 参数作为依赖声明使用

具体做法就是在第三阶段的基础上，利用立即执行函数的参数传递模块依赖项。

这使得每一个模块之间的关系变得更加明显。

### 阶段五
出现了`CommonJs`，但这个规范是为`node`实现的。它是以同步的方式加载模块，所以在`node`中没有问题，但是在浏览器端可能就会出现问题
- 一个文件就是一个模块
- 每个模块都有单独的作用域
- 通过 module.exports 导出成员
- 通过 require 函数载入模块

接着就出了专门为浏览器设置的规范
> AMD(Asynchronous Module Definition) 异步的模块定义规范

主要实现是Require.js
```js
// 为当前模块提供私有空间
define('module1', ['jqurey', './module2'], function($, module2) {
    // 使用return向外部导出一些成员
    return {
        start: function () {
            $('body').animate({ margin: '200px' })
            module2()
        }
    }
})

// 载入一个模块
require(['./module1'], function (module1) {
    module1.start()
})
```
目前绝大多数第三方库都支持`AMD`规范，生态很完善，但依然会有相应的问题
- AMD使用起来相对复杂
- 模块JS文件请求频繁，导致页面效率低下

`requireJs`的出现为前端的模块化提供了一个标准

随后淘宝推出了 Sea.js + CMD (common module definition)
```js
// CMD 规范（类似 CommonJS 规范）
define(function (require, exprots, module) {
    var $ = require('jqurey')
    // 通过 exports 或者 module.exports 对外暴露成员
    module.exports = function () {
        console.log('module 2')
        $('body').append('<p>module2</p>')
    }
})
```

> 一切技术都是为了解决问题而出现的，在这个过程中，肯定是一步步完善，上面说的都是历史了，目前模块化的标准规范已经趋于成熟。

## 模块化标准规范 （模块化的最佳实践）

node 中使用 CommonJS

在浏览器中使用 ES Modules（最主流的前端模块化规范）

### ES Modules

#### 基本特性

- 自动采用严格始末，忽略`'use strict'`
- 每个`ESM`模块都是单独的私有作用域
- `ESM`是通过`CORS`其请求外部`JS`模块的
- `ESM`的`script`标签会延迟执行脚本

#### 导入和导出

##### 导出

###### 方式一：每一个需要导出的数据前加 export
```js
export var name = 'foo module'
export function hello () {
    console.log('hello')
}
export class Person {}
```
###### 方式二：在末尾统一导出
```js
var name = 'foo module'
function hello() {
    console.log('hello')
}
class Person { }
// 普通导出
export { name, hello, Person }
// 设置别名导出
export {
    name as fooName, // 可以通过 as 进行重命名，在接收的时候也需要写成对应的别名
    hello as fooHello,
    Person
}
// 设置默认导出某一项
export {
    name as default, // 默认导出
    hello,
    Person
}
// 针对这种导出，在引入的时候需要使用将default设置别名的方式获取
import { default as fooname } from 'module.js'
// 默认导出
export default name
// 针对这种导出，在引入的时候，可以直接设置别名导入
import xxx from 'module.js'
```

##### 导入

具体内容请看 [点击跳转](https://github.com/Humphrey2021/modular-development/blob/main/02-ESModules/03-import/app.js)

##### 导出导入成员
`import`和`export`组合使用

具体内容请看 [点击跳转](https://github.com/Humphrey2021/modular-development/blob/main/02-ESModules/04-export-import/app.js)

##### ES Modules in Browser
`Polyfill`兼容方案

es modules是在2014年提出来的，在早期的浏览器当中，并不支持这种特性
所以在使用 es modules 的时候，还是要考虑兼容性的问题
虽然在正常的开发中，都有构建工具可以将es6转换为es5，从而实现浏览器的兼容问题，但这里我们要说的是另外一种方案`Polyfill`

这个模块的名称叫做[`ES Module Loader`](https://github.com/ModuleLoader/browser-es-module-loader)
它其实就是一个`js`的文件，只需要将其引入到项目当中就可以了
我们可以通过[`unpkg`](https://unpkg.com/browser-es-module-loader)所提供的`CDN`服务,去拿到它的所有js文件。

具体实现请看 [点击跳转](https://github.com/Humphrey2021/modular-development/blob/main/02-ESModules/05-polyfill/index.html)

这种模式仅作为了解，在实际生产中使用这种方式，效率是比较低下的。

#### ES Module in node
`node`版本需要大于`8.5`
如果要在node中使用esmodule，需要做两件事情
1. 将文件的拓展名修改为`.mjs`
2. 启动node的时候需要添加一个`--experimental-modules`参数
这代表着启用一个esmodule的实验特性
```shell
node --experimental-modules index.mjs
```
tips: 启用最新的实验模块功能（已弃用）

- ES Modules 中可以导入 CommonJS 模块
- CommonJS 中不能导入 ES Modules 模块
- CommonJS 始终只会导出一个默认成员
- 注意 Import 不是解构导出对象

与CommonJS模块的差异

在nodejs中，CommonJS代码最终传入了这个函数,
在外侧包裹一个函数,
从而实现私有模块作用域.

```js
// nodejs 源码中的一段
let wrap = function (script) {
    return Module.wrapper[0] + script + Module.wrapper[1]
}
const wrapper = [
    '(function (exports, require, module, __filename, __dirname) {',
    '\n})'
]
```

进一步支持 ES Module

在`package.json`中添加`type`字段，值写为`module`，就可以将后缀`.mjs`修改为`.js`
如果需要在`type=module`的情况下继续使用`CommonJS`，需要将文件扩展名修改为`.cjs`

Babel兼容方案
具体实现请看 [点击跳转](https://github.com/Humphrey2021/modular-development/blob/main/03-es-module-in-node/05-babel)


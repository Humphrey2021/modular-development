// import { name } from './module' // 在原生中，不可以省略拓展名
import { name } from './module.js'
console.log(name)

// import { lowercase } from './utils' // 不可以省略index.js
import { lowercase } from './utils/index.js'
console.log(lowercase('HUMPHREY'))

// import { name } from 'module.js' // 不可以省略前面的 ./
import { name } from './module.js'
import { name } from '/03-import/module.js' // 可以写成绝对路径
import { name } from 'http://localhost:8080/03-import/module.js' //可以写成网址
console.log(name)

// --------------
// 只引入模块
import {} from './module.js'
// 可以简写成下面的写法
import './module.js'

// ---------------
// 导出所有成员
import * as module from './module.js'
console.log(module)
console.log(module.name)

// ---------------
// 动态导入模块
// 通过变量的方式，这是错误的！！！
// var modulePath = './module.js'
// import { name } from modulePath
// console.log(name)

// import 只能出现在最顶层！！！
// if (true) {
//   import { name } from './module.js'
// }

// 如果需要动态导入模块，可以使用 import 函数
import('./module.js').then(function (module) {
  console.log(module)
})

// ----------------
// 当模块中除了导出普通成员，还导出了默认成员，则可以使用以下两种方式获取
import { name, age, default as title } from './module.js'
import title, { name, age } from './module.js'
console.log(name, age, title)

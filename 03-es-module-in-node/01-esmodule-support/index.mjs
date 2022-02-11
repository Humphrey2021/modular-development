import { foo, bar } from './module.mjs'

console.log(foo, bar)

// import fs from 'fs'
// fs.writeFileSync('./foo.txt', 'es module working')

// 内置模块兼容了 ESModule 的提取成员方式
import { writeFileSync } from 'fs'
writeFileSync('./bar.txt', 'es module working')


import _ from 'lodash'

console.log(_.camelCase('ES Module'))

// 这样会报错，不支持，因为第三方模块都是导出默认成员
// import { camelCase } from 'ladash'
// console.log(camelCase('ES Module'))

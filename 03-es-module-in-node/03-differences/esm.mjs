// ESM 中没有 CommonJS 中的那些模块全局成员了

// console.log(import.meta.url)

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const __dirname = dirname(__filename)
console.log(__dirname)

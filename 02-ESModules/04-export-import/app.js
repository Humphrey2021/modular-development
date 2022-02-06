// export { foo, bar } from './module.js'
// console.log(foo, bar)

// 通过单个导入
// 这种模式相对而言会比较麻烦，如果有很多的时候
// import { Button } from './components/button'
// import { Avatar } from './components/avatar'

// console.log(Button, Avatar)

// 针对这种情况一般会在对应的目录下新建 index.js 文件，去集中导出
// 查看`./components/index.js`文件

import { Button, Avatar } from './components/index.js'
console.log(Button, Avatar)

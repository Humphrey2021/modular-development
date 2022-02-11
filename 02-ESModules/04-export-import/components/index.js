// import { Button } from './components/button.js'
// import { Avatar } from './components/avatar.js'

// export { Button, Avatar }

// 简化写法
// export { Button } from './components/button.js'
export { Avatar } from './components/avatar.js'
// 如果内部导出的是默认的成员,则需要使用重命名的方式
export { default as Button } from './components/button.js'

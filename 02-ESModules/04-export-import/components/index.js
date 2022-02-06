// import { Button } from './components/button.js'
// import { Avatar } from './components/avatar.js'

// export { Button, Avatar }

// 简化写法
// export { Button } from './components/button.js'
export { Avatar } from './components/avatar.js'
// 如果内部导出的是默认的成员,则需要使用重命名的方式
export { default as Button } from './components/button.js'

// 实际项目中如果很多文件时，其实这种方式依然会很复杂
// 这个时候可以使用 require.context 这个方法
// 后期会专门写一篇关于 require.context 的使用方法

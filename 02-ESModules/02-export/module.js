// 方式一：每一个需要导出的数据前加 export
// export var name = 'foo module'

// export function hello () {
//     console.log('hello')
// }

// export class Person {}

// 方式二：在末尾统一导出
var name = 'foo module'
function hello() {
    console.log('hello')
}
class Person { }
export { name, hello, Person }

export {
    name as fooName, // 可以通过 as 进行重命名，在接收的时候也需要写成对应的别名
    hello as default, // 默认导出
    Person
}
// export default name // 同样是默认导出
/**
 * 当设置默认导出时，在引入该模块的时候可以使用以下两种写法
 * 方法一：通过将 default 设置别名
 * import { default as xxx } from 'module.js'
 * 方法二：直接设置一个别名导入
 * import xxx form 'module.js'
 */

// 注意事项
// 1.语法
// 1.1. 导出的成员并不是字面量对象，虽然语法很像
// 1.2. 导入的时候，语法和es6的解构语法很像，但并不是解构
// 2. 在导出的过程中，导出的并不是成员的值，而是导出的是值存放的地址，这个时候在外部成员拿到这个成员，会受模块内部值的影响
// 3. 我们在外部导入一个模块成员过后，这个成员将会是一个只读的成员，不可以进行修改

// 我们可以通过这几个特点，去定义一些配置文件
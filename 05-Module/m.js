// 一、模块的导入和导出

// const age = 18
// const addFn = (x, y) => {
//   return x + y
// }
// module.exports = {
//   age,
//   addFn
// }

// 二、module

module.exports = 1111
console.log(module)

// 三、exports

// exports.name = '杜拉拉'

// 会改变内存指向
// exports = {
//   age: '23',
//   name: '杜拉拉'
// }

// 四、同步加载

// let name = '杜拉拉'
// let startTime = Date.now()
// while (Date.now() - startTime < 5000) { }

// module.exports = name
// console.log('m.js被加载导入了')

// console.log(require.main == module) // false，require.main指向了01-nodejs-commonjs，module指向自己
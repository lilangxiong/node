// 一、导入

// let obj = require('./m')

// console.log(obj)

// 二、module
let obj = require('./m')

// 三、exports
// let obj = require('./m')
// console.log(obj)


// 四、同步加载
// let obj = require('./m')
// console.log('01-nodejs-commonjs.js被执行了')
// console.log(obj)

// console.log(require.main == module)  // true require.main指向了01-nodejs-commonjs，module也指向01-nodejs-commonjs

// m.js被加载导入了
// 01-nodejs-commonjs.js被执行了
// 杜拉拉
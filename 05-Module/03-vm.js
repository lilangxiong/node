const fs = require('fs')
const vm = require('vm')

let content = fs.readFileSync('./test.txt', 'utf-8')
// console.log(content)

// eval
// 使用eval函数有个问题，如果变量之前已经被定义，这个时候如果eval里面又再次定义了相同变量名，会直接报错，不符合commonjs规范
// let age = 33
// eval(content)
// console.log(age)

// new Function 
// 如果是多参数的情况会很麻烦，还需要考虑如何拼装函数
// let age = 33
// let fn = new Function('age', 'return age + 1')
// console.log(fn(age))

// 无法使用外部的局部变量，但可以使用外部的全局变量(例如：定义age时不使用let、var、const)，同名变量实现了隔离
// let age = 33
// vm.runInThisContext(content)
// console.log(age) // 33

// vm.runInThisContext('age += 10')
// console.log(age) // ReferenceError: age is not defined

// vm.runInThisContext(content)
// console.log(age) // 18

age = 33
vm.runInThisContext('age += 10')
console.log(age) // 43

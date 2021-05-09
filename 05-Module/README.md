# 模块化

早期的Javascript语言没有模块化规范，模块化的实现方式：函数、对象、自执行函数。

前端开发为什么需要模块化？

- 命名冲突和污染

- 代码冗余，无效请求过多

- 文件间的依赖关系复杂

- 模块化是前端走向工程化的重要一环

模块就是小而精且利于维护的代码片段。


## 常见模块化规范

- commonjs规范

- AMD规范

- CMD规范

- ES Modules规范


## CommonJS规范

CommonJS是语言层面上的规范，当前主要用于Node.js。

CommonJS规范起初是为了弥补 JS 语言模块化缺陷。

CommonJS规定模块化分为以下三个部分：

- 模块引用

- 模块定义

- 模块标识

### NodeJS 与 CommonJS

- 任意一个文件就是一个模块，具有独立作用域

- 使用require导入其他模块

- 将模块ID传入require实现目标模块定位

### module属性

- 任意js文件就是一个模块，可以直接使用module属性

- id：返回模块标识符，一般是一个绝对路径

- filename：返回文件模块的绝对路径 

- loaded：返回布尔值，表示模块是否完成加载

- parent：返回对象，存放调用当前模块的模块

- children：返回数组，存放当前模块调用的其他模块

- exports：返回当前模块需要暴露的内容

- paths：返回数组，存放不同目录下的node_modules位置


modules.exports 与 exports 有何区别？

两者都可以导出模块，但我们不能直接给exports重新赋值，否则会改写其内存指向。如下图。

## require属性

- 基本功能是读入并且执行一个模块文件

- resolve：返回模块文件的绝对路径

- extensions：依据不同后缀名执行解析操作

- main：返回主模块对象


## Node.js 与 CommonJS

- 使用 module.exports 与 require 实现模块的导入和导出

- module的使用以及常见属性获取

```js
// m.js
module.exports = 1111
console.log(module)

// 01-nodejs-commonjs.js
let obj = require('./m')

// 结果
Module {
  id: '/Users/apple/Documents/code/node/05-Module/m.js',
  path: '/Users/apple/Documents/code/node/05-Module',
  exports: 1111,
  parent: Module {
    id: '.',
    path: '/Users/apple/Documents/code/node/05-Module',
    exports: {},
    parent: null,
    filename: '/Users/apple/Documents/code/node/05-Module/01-nodejs-commonjs.js',
    loaded: false,
    children: [ [Circular] ],
    paths: [
      '/Users/apple/Documents/code/node/05-Module/node_modules',
      '/Users/apple/Documents/code/node/node_modules',
      '/Users/apple/Documents/code/node_modules',
      '/Users/apple/Documents/node_modules',
      '/Users/apple/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  filename: '/Users/apple/Documents/code/node/05-Module/m.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/apple/Documents/code/node/05-Module/node_modules',
    '/Users/apple/Documents/code/node/node_modules',
    '/Users/apple/Documents/code/node_modules',
    '/Users/apple/Documents/node_modules',
    '/Users/apple/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```

- exports导出数据以及其与module.exports的区别

- CommonJS规范下的模块同步加载


## 模块分类以及加载过程

**模块分类**

- 内置模块

- 文件模块

**模块加载速度**

- 核心模块：Node源码编译时写入到二进制中

- 文件模块：代码运行时，动态加载

**加载流程**

- 路径分析：根据标识符确定模块位置

- 文件定位：确定目标模块中具体的文件以及文件类型

- 编译执行：采取对应的方式完成文件的编译执行

**路径分析之标识符**

- 路径标识符，例如：require('./m1.js')

- 非路径标识符，常见于核心模块，例如：require('fs')

```js
// 路径查找
id: '/Users/apple/Documents/code/node/05-Module/m.js'
// 非路径查找
paths: [
  '/Users/apple/Documents/code/node/05-Module/node_modules',
  '/Users/apple/Documents/code/node/node_modules',
  '/Users/apple/Documents/code/node_modules',
  '/Users/apple/Documents/node_modules',
  '/Users/apple/node_modules',
  '/Users/node_modules',
  '/node_modules'
]
```

**文件定位**

- 项目下存在m1.js模块，导入时使用require('m1')语法

- 没有后缀名时，按照以下顺序查找：m1.js --> m1.json --> m1.node

- 如果按照以上后缀顺序没有查找的文件，就认为是目录，当作是一个npm包来处理，然后查找package.json文件，使用JSON.parse()解析

- npm包按照以下后缀顺序查找：main.js --> main.json --> main.node

- 如果没有查找到main名称，就会将index作为目标模块中的具体文件名称，按照：js --> json --> node，继续查找

- 如果最后还是没有查找到，就会报错 cant found moudle 

**编译执行**

- 将某个具体类型的文件按照相应的方式进行编译和执行

- 创建新对象，按路径加载，完成编译执行

**JS文件的编译执行**

- 使用fs模块同步读入目标文件内容

- 对内容进行语法包装，生成可执行JS函数

- 调用函数时传入exports、module、require等属性值

**JSON文件的编译执行**

- 将读取到的内容通过JSON.parse()进行解析，赋值给exports对象

**缓存优先原则**

- 提高模块加载速度

- 当模块不存在，则执行一次完整的加载流程

- 模块加载完成之后，使用路径作为索引进行缓存

## vm模块

创建独立运行的沙箱环境。

```js
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
```

## 模块加载模拟

核心逻辑

- 路径分析

- 缓存优先

- 文件定位

- 编译执行

```js
const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = {}
}

Module._resolveFilename = function (filename) {
  // 利用path将filename转为绝对路径
  let absPath = path.resolve(__dirname, filename)
  console.log(absPath)

  // 判断当前路径对应的内容是否存在
  if (fs.existsSync(absPath)) {
    // 如果条件成立，说明内容是存在的
    return absPath
  } else {
    // 文件定位
    let suffix = Object.keys(Module._extensions)
    for (let i = 0; i < suffix.length; i++) {
      let newPath = absPath + suffix[i]
      if (fs.existsSync(newPath)) {
        return newPath
      }
    }
  }
  throw new Error(`${filename} is not exists`)
}

Module._extensions = {
  '.js'(module) {
    // 读取
    let content = fs.readFileSync(module.id, 'utf-8')

    // 包装
    content = Module.wrapper[0] + content + Module.wrapper[1]
    // console.log(content)

    // VM
    const compileFn = vm.runInThisContext(content)
    // console.log(compileFn)

    // 准备参数值
    let exports = module.exports
    let dirname = path.dirname(module.id)
    let filename = module.id

    // 调用
    compileFn.call(exports, exports, myRequire, module, filename, dirname)

  },
  '.json'(module) {
    // 读取
    let content = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
    module.exports = content
  }
}

Module.wrapper = [
  '(function (exports, require, module, __filename, __dirname) {',
  '})'
]

Module._cache = {}

Module.prototype.load = function () {
  let extname = path.extname(this.id)
  // console.log(extname)

  Module._extensions[extname](this)
}

function myRequire(filename) {
  // 1、绝对路径
  let mPath = Module._resolveFilename(filename)
  // console.log(mPath)

  // 2、缓存优先
  let cacheModule = Module._cache[mPath]
  if (cacheModule !== undefined) return cacheModule.exports

  // 3、创建控对象加载目标模块
  let module = new Module(mPath)

  // 4、缓存已加载过的模块
  Module._cache[mPath] = module

  // 5、执行加载（编译执行）
  module.load()

  // 6、返回数据
  return module.exports
}

let obj = myRequire('./v')
console.log(obj)
```
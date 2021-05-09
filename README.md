# node

## 适用场景

## Nodejs全局对象

- 与浏览器平台的window不完全相同

- Nodejs全局对象global上挂载了许多属性

- global 的根本作用是作为全局对象的宿主

- 全局对象可以看作是全局变量的宿主 

### 常见全局变量

- __filename: 返回正在执行的脚本文件的绝对路径

- __dirname: 返回正在执行脚本所在目录

- timer类函数: 执行顺序与事件循环间的关系

- process: 提供与当前进程互动的接口

- require: 实现模块的加载

- module、exports: 处理模块的导出

**默认情况下this是空对象，与global不一样**

### 全局变量process

- 获取进程信息

- 执行进程操作

1. 资源： 内存、cup
```js
// 内存
console.log(process.memoryUsage())
// 以下是输出
// {
//   rss: 17383424, // 常驻内存大小
//   heapTotal: 4210688, // 堆区大小
//   heapUsed: 2094208, // 实际使用的堆区大小
//   external: 634520 // 表示底层的c/c++所占内存大小
// }

// cup
console.log(process.cpuUsage())
// {
//   user: 35163, // 用户占用的cpu时间
//   system: 8314  // 系统占用的cpu时间
// }
```
2. 运行环境：运行目录、node环境、cpu架构、用户环境、系统平台

```js
// 运行目录
console.log(process.cwd())
// /Users/apple/Documents/code/node

// 获取node环境
console.log(process.version)
// v12.10.0
// {
//   node: '12.10.0',
//   v8: '7.6.303.29-node.16',
//   uv: '1.31.0',
//   zlib: '1.2.11',
//   brotli: '1.0.7',
//   ares: '1.15.0',
//   modules: '72',
//   nghttp2: '1.39.2',
//   napi: '4',
//   llhttp: '1.1.4',
//   http_parser: '2.8.0',
//   openssl: '1.1.1c',
//   cldr: '35.1',
//   icu: '64.2',
//   tz: '2019a',
//   unicode: '12.1'
// }
console.log(process.version)

// cpu架构
console.log(process.arch)
// x64

// 用户环境
console.log(process.env.NODE_ENV)

console.log(process.env.PATH)
// /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/apple/.rvm/bin:/Users/apple/.rvm/bin

console.log(process.env.HOME)
// /Users/apple

// 系统平台
console.log(process.platform)
// darwin

```
3. 运行状态：启动参数、PID、运行时间

```js
// 启动参数
console.log(process.argv)
// node process.js 1 2
// [
//   '/usr/local/bin/node',
//   '/Users/apple/Documents/code/node/process.js',
//   1,
//   2
// ]

// PID
console.log(process.pid)
// 1688

// 运行时间
console.log(process.uptime())
// 0.036130158
```
4. 事件

```js
  process.on('exit', (code) => {
    console.log('exit' + code)
  })
  process.on('beforeExit', (code) => {
    console.log('beforeExit' + code)
  })
  console.log('代码执行完了')
  // 代码执行玩了
  // beforeExit0
  // exit0

  // process.exit() // 可以手动退出
```

5. 标准输出、输入、错误

```js
// 标准输出
console.log = function (data) {
  process.stdout.write('--' + data + '\n')
}
console.log(11)
console.log(12)
// --11
// --12

const fs = require('fs')
fs.createReadStream('test.txt').pipe(process.stdout)
// test.txt： 1223
// terminal 输出： 1223

// 标准输入
process.stdin.pipe(process.stdout)
// terminal 输入： 1223
// terminal 输出： 1223

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
  let chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write('data' + chunk)
  }
})
// terminal 输入： 1223
// terminal 输出： data1223
```

## path

- 内置模块，require之后直接使用

- 用于处理文件/目录的路径

### path常见API

- basename() 获取路径中的基础名称

```js
/*
* 01 返回的就是接收路径中的最后一部分
* 02 第二个参数表示扩展名，如果没有设置则返回完整的带后缀文件名称
* 03 如果设置了第二个参数，但是在当前路径中没被匹配到，则第二个参数会被忽略
* 04 处理目录路径的时候，如果结尾处有路径分割符，则也会被忽略掉
*/
console.log(__filename)
// /Users/apple/Documents/code/node/path.js
console.log(path.basename(__filename))
// path.js
console.log(path.basename(__filename), '.js')
// path
console.log(path.basename(__filename), '.css')
// path.js
console.log(path.basename('/a/b/c'))
// c
console.log(path.basename('/a/b/c/'))
// c
```

- dirname() 获取路径中的目录名称

```js
/*
* 01 返回路径中最后一个部分的上一层目录所在路径
*/
console.log(path.dirname(__filename))
// /Users/apple/Documents/code/node
console.log(path.dirname('/a/b/c'))
// /a/b
console.log(path.dirname('/a/b/c/'))
// /a/b
```

- extname() 获取路径中的扩展名称

```js
/* 
* 01 返回路径中相应文件的后缀名
* 02 如果路径中存在多个点，它匹配的是最有一个点，到结尾的内容
*/
console.log(path.extname(__filename))
// .js
console.log(path.extname('/a/b'))
// 
console.log(path.extname('/a/b/index.html.js.css'))
// .css
console.log(path.extname('/a/b/index.'))
// .
```

- isAbsoute() 获取路径是否是绝对路径

```js
console.log(path.isAbsolute('a'))
// false
console.log(path.isAbsolute('/a'))
// true
console.log(path.isAbsolute('///a'))
// true
console.log(path.isAbsolute(''))
// false
console.log(path.isAbsolute('.'))
// false
console.log(path.isAbsolute('../bar'))
// false
```

- join() 拼接多个路径片段

```js
console.log(path.join('a/b', 'c', 'index.html'))
// a/b/c/index.html
console.log(path.join('/a/b', 'c', 'index.html'))
// /a/b/c/index.html
console.log(path.join('/a/b', 'c', '../', 'index.html'))
// /a/b/index.html
console.log(path.join('/a/b', 'c', './', 'index.html'))
// /a/b/c/index.html
console.log(path.join('/a/b', 'c', '/', 'index.html'))
// /a/b/c/index.html
console.log(path.join('/a/b', 'c', '', 'index.html'))
// /a/b/c/index.html
console.log(path.join(''))
// .
```

- resolve() 返回绝对路径

```js
/*
* resovle([from], to)
*/
console.log(path.resolve())
// /Users/apple/Documents/code/node
console.log(path.resolve('a', 'b'))
// /Users/apple/Documents/code/node/a/b
console.log(path.resolve('a', '/b'))
// /b
console.log(path.resolve('/a', 'b'))
// /a/b
console.log(path.resolve('/a', '/b'))
// /b
console.log(path.resolve('index.html'))
// /Users/apple/Documents/code/node/index.html
```

- parse() 解析路径

```js
/* 
* 01 接收一个路径，返回一个对象，包含不同的信息：root、dir、base、ext、name
*/
console.log(path.parse('/a/b/c/index.html'))
// {
//   root: '/', // 根路径
//   dir: '/a/b/c', // 文件路径
//   base: 'index.html', // 完整的文件名称
//   ext: '.html', // 文件后缀
//   name: 'index' // 文件名
// }
console.log(path.parse('/a/b/c'))
// { 
//   root: '/', 
//   dir: '/a/b', 
//   base: 'c', 
//   ext: '', 
//   name: 'c' 
// }
console.log(path.parse('/a/b/c/'))
// { 
//   root: '/', 
//   dir: '/a/b', 
//   base: 'c', 
//   ext: '', 
//   name: 'c' 
// }
console.log(path.parse('./a/b/c/'))
// { 
//   root: '/', 
//   dir: './a/b', 
//   base: 'c', 
//   ext: '', 
//   name: 'c' 
// }
```

- format() 序列化路径

```js
const obj = path.parse('./a/b/c/')
console.log(path.format(obj))
// ./a/b/c
```

- normalize() 规范化路径

```js
console.log(path.normalize(''))
// .
console.log(path.normalize('a/b/c/d'))
// a/b/c/d
console.log(path.normalize('a///b/c../d'))
// a/b/c../d
console.log(path.normalize('a/\\/b/c\\/d'))
// a/\/b/c\/d
console.log(path.normalize('a/\b/c\\/d'))
// a/c\/d
```

## Buffer

- Buffer让Javascript在Nodejs平台下可以操作二进制

Javascript语言起初是服务于浏览器平台的，因此在js内部主要操作的数据是字符串。 

Nodejs平台下Javascript可实现IO操作，例如文本读写，网络文件的传输等。IO行为操作的是二进制数据。 

Stream流操作不是Nodejs独创的，流操作配合管道实现数据分段传输，数据的端到端传输会有生产者和消费者，生产和消费往往存在等待的过程，产生等待时数据存放在哪里？

答案是Buffer缓冲区。

- Nodejs中Buffer是一片内存空间

- Buffer是V8之外的内存，不占据V8堆内存的大小 

- Buffer内存的使用由Node来控制，由V8的GC回收

![Buffer-1](./img/Buffer-1.png)

### 创建Buffer实例

- alloc：创建指定字节大小的buffer

```js
Buffer.alloc(10) // 10个字节的buffer
// <Buffer 00 00 00 00 00 00 00 00 00 00>
```

- allocUnsafe：创建指定大小的buffer（不安全）
```js
Buffer.allocUnsafe(10) // 10个字节的buffer，不保证内存空间的连续性
//  <Buffer 00 00 00 00 00 00 00 00 90 a4>
```

- from：接收数据，创建buffer

```js
// 接收一个数据源，用于创建一个已有大小的buffer
// 第一个参数：字符串、数组、本身就是buffer数据
// 第二个参数：编码，默认utf8
Buffer.from('1')
// <Buffer 31>
Buffer.from('中')
// <Buffer e4 b8 ad>
Buffer.from([1, 2, 3])
// <Buffer 01 02 03>
Buffer.from([1, 2, '中'])
// 预期输出：<Buffer 01 02 e4 b8 ad>，utf8编码下，‘中’字占三个字节
// 实际输出： <Buffer 01 02 00>
// 原因：由于编码问题，数组中的‘中’是无法被直接识别的，如果要被识别，需要先将‘中’字转为16进制
const b = Buffer.from([0xe4, 0xb8, 0xad])
b.toString()
// 中
```

### Buffer实例方法

- fill：使用数据填充buffer

```js
let buf = Buffer.alloc(6)
buf.fill('123')
console.log(buf)
// <Buffer 31 32 33 34 35 36>
console.log(buf.toString())
// 123123


let buf1 = Buffer.alloc(6)
buf1.fill('123456789') // 多余的会被抛弃
console.log(buf1)
// <Buffer 31 32 33 34 35 36>
console.log(buf1.toString())
// 123456

let buf2 = Buffer.alloc(6)
buf2.fill('123', 1) // 第二个参数表示从第几个字节开始填充
console.log(buf2)
// <Buffer 00 31 32 33 31 32>，注意第一个字节是00
console.log(buf2.toString())
// 12312

let buf3 = Buffer.alloc(6)
buf3.fill('123', 1, 3) // 第三个参数表示填充到从第几个字节结束
console.log(buf3)
// <Buffer 00 31 32 00 00 00>
console.log(buf3.toString())
// 12

let buf4 = Buffer.alloc(6)
buf4.fill(123) // 输入数字，其实是按照utf8编码表查找
console.log(buf4)
// <Buffer 7b 7b 7b 7b 7b 7b>
console.log(buf4.toString())
// {{{{{{
```

- write：向buffer中写入数据

```js
let wbuf = Buffer.alloc(6)
wbuf.write('123') // 不会填充，在内存空间大小内有多少写多少
console.log(wbuf)
// <Buffer 31 32 33 00 00 00>
console.log(wbuf.toString())
// 123

let wbuf1 = Buffer.alloc(6)
wbuf1.write('123', 1) // 第二个参数表示从第几个字节开始写入
console.log(wbuf1)
// <Buffer 00 31 32 33 00 00>
console.log(wbuf1.toString())
// 123

let wbuf2 = Buffer.alloc(6)
wbuf2.write('123', 1, 2) // 第三个参数表示填充到从第几个字节结束
console.log(wbuf2)
// <Buffer 00 31 32 00 00 00>
console.log(wbuf2.toString())
// 12
```

- toString：从buffer中提取数据 

```js
let tobuf = Buffer.from('四个汉字')
console.log(tobuf)
console.log(tobuf.toString())
// <Buffer e5 9b 9b e4 b8 aa e6 b1 89 e5 ad 97>
// 四个汉字

console.log(tobuf.toString('utf-8', 1)) // 设置为1，会出现乱码，因为一个中文占用3个字节
// ��个汉字

console.log(tobuf.toString('utf-8', 3)) // 设置为3，表示从第几个字节开始到结束的buffer转为字符串 
// 个汉字

console.log(tobuf.toString('utf-8', 3, 9))
// 个汉
```

- slice：截取buffer

```js
// 默认从头到尾截取
let slicebuf = Buffer.from('四个汉字')
let slicebuf2 = slicebuf.slice()
console.log(slicebuf2)
// <Buffer e5 9b 9b e4 b8 aa e6 b1 89 e5 ad 97>
console.log(slicebuf.toString())
// 四个汉字

let slicebuf3 = slicebuf.slice(3)
console.log(slicebuf3.toString())
// 个汉字

let slicebuf4 = slicebuf.slice(3, 9)
console.log(slicebuf4.toString())
// 个汉

let slicebuf5 = slicebuf.slice(-3)
console.log(slicebuf5.toString())
// 字
```

- indexOf：在buffer中查找数据

```js
let ofbuf = Buffer.from('爱前端，爱学习，事少钱多离家近')
console.log(ofbuf)
// <Buffer e7 88 b1 e5 89 8d e7 ab af ef bc 8c e7 88 b1 e5 ad a6 e4 b9 a0 ef bc 8c e4 ba 8b e5 b0 91 e9 92 b1 e5 a4 9a e7 a6 bb e5 ae b6 e8 bf 91>
console.log(ofbuf.indexOf('爱'))
// 0

console.log(ofbuf.indexOf('爱', 4)) // 指定查找的开始位置
// 12

console.log(ofbuf.indexOf('爱ab'))
// -1
```

- copy：拷贝buffer中的数据

 ```js
 let copybuf = Buffer.alloc(6)
let copybuf2 = Buffer.from('汉字')
copybuf2.copy(copybuf)
console.log(copybuf.toString())
// 汉字
console.log(copybuf2.toString())
// 汉字

let copybuf3 = Buffer.alloc(6)
copybuf2.copy(copybuf3, 3, 3, 6) // 第二个参数表示copybuf3从第几个字节开始存放，第三个参数表示从copybuf2第几个字节开始复制，第四个参数表示复制到copybuf2的第几个字节
console.log(copybuf3.toString())
// 字
```

### 自行实现split方法

```js
ArrayBuffer.prototype.split = function (sep) {
  let len = Buffer.from(sep).length
  let ret = []
  let start = 0
  let offser = 0

  while (offset = this.indexOf(sep, start) !== -1) {
    ret.push(this.slice(start, offset))
    start = offset + len
  }
  // ret.push(this.slice(start))
  return ret
}
```

## FS

fs是内置核心模块，提供文件系统操作的API。

![fs-1](./img/fs-1.png)

### FS基本操作类

- 用户对于文件所具备的操作权限：

![fs-2](./img/fs-2.png)

![fs-3](./img/fs-3.png)

常见flag操作符

  - r: 表示可读
  - w: 表示可写
  - s: 表示同步
  - +: 表示执行相反操作
  - x: 表示排它操作
  - a: 表示追加操作

fd就是操作系统分配给被打开文件的标识，由于0、1、2被标准输入输出、错误占用，所以从3开始

### FS常用API

- readFile：从指定文件中读取数据

```js
const fs = require('fs')
const path = require('path')

// 如果路径下的文件不存在，就会直接报错
fs.readFile(path.resolve('data.txt'), 'utf-8', (err, data) => {
  if (err) console.log(err)
  else console.log(data)
})
```

- writeFile：向指定文件中写入数据

```js
const fs = require('fs')
const path = require('path')

// 如果路径下的文件不存在，就会直接创建一个新的，如果是已有文件，会直接覆盖里面的内容
fs.writeFile('data.txt', 'hello node.js', {
  mode: 438, // 设置读写执行权限
  flog: 'r+', // 写入方式 ，不清空然后直接写入
  encoding: 'utf-8' // 字符编码集
}, (err,) => {
  if (err) console.log(err)
  else {
    fs.readFile('data.txt', 'utf-8', (err, data) => {
      console.log(data)
      // 123lo node.js
    })
  }
})
```

- appendFile：追加的方式向指定文件中写入数据

```js
fs.appendFile('data.txt', 'abc', (err,) => {
  if (err) console.log(err)
  else {
    fs.readFile('data.txt', 'utf-8', (err, data) => {
      console.log(data)
      // 123lo nodeabc
    })
  }
})
```

- copyFile：将某个文件中的数据拷贝到另一个文件

```js
fs.copyFile('data.txt', 'data1.txt', (err,) => {
  if (err) console.log(err)
  else {
    fs.readFile('data1.txt', 'utf-8', (err, data) => {
      console.log(data)
      // 123lo node.jsabcabc
    })
  }
})
```

- watchFile：对指定文件进行监控

```js
fs.watchFile('data.txt', { interval: 20 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了: ')
    fs.unwatchFile('data.txt')
  }
})
```

### 文件的打开与关闭

- open

```js
const fs = require('fs')
const path = require('path')

fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
  console.log('fd: ', fd)
})
// fd: 21
```

- close

```js
const fs = require('fs')
const path = require('path')

fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
  console.log('fd: ', fd)
  fs.close(fd, err => {
    console.log('关闭成功')
  })
})

// fd:  21
// 关闭成功
```

### 大文件读写操作

<img src="./img/fs-4.png" width="400" height="200">

使用readFile读取大文件，是通过内存一次性读取，容易出现内存被塞满溢出的情况。

解决方案是通过Buffer接收大文件内容，作为中转。

- read

```js
// read：所谓读操作就是将数据从磁盘文件中写入到 buffer 中
let buf = Buffer.alloc(10)

/*
* fd 定位到当前被打开的文件
* buf 表示当前缓冲区
* offset 表示当前从bufer的哪个位置开始执行写入
* len 表示当前写入的长度
* position 表示当前从文件的哪个位置开始读取
*/
fs.open('data.txt', 'r', (err, rfd) => {
  console.log(rfd)
  fs.read(rfd, buf, 1, 4, 2, (err, readBytes, buffer) => {
    console.log(readBytes)
    console.log(buffer)
    console.log(buffer.toString())

    fs.close(rfd, (err) => {
      if (!err) console.log('关闭成功')
      else console.log('关闭失败')
    })
  })
})
```

- write

```js
// write：读操作就是将 buffer 数据写入到磁盘文件中
let buf = Buffer.from('1234567890')

/*
* fd 定位到当前被打开的文件
* buf 表示当前缓冲区
* offset 表示当前从bufer的哪个位置开始执行写入
* len 表示当前写入的长度
* position 表示当前从文件的哪个位置开始读取，一般都是设置0，否则会出现乱码
*/
fs.open('b.txt', 'w', (err, wfd) => {
  console.log(wfd)
  fs.write(wfd, buf, 2, 4, 0, (err, written, buffer) => {
    console.log(written)
    console.log(buffer)
    console.log(buffer.toString())

    fs.close(wfd, (err) => {
      if (!err) console.log('关闭成功')
      else console.log('关闭失败')
    })
  })
})
```

### 自定义文件复制

```js
const fs = require('fs')

/*
* 01 打开 a 文件，利用 read 将数据保存到 buffer 中暂存
* 02 打开 b 文件，利用 write 将 buffer 中的数据写到 b 文件中
*/
let buf = Buffer.alloc(10)

// a.txt: 1234567890abcdef
// 01 打开指定文件
fs.open('a.txt', 'r', (err, rfd) => {
  // 02 打开 b 文件，用于执行数据写操作
  fs.open('b.txt', 'w', (err, wfd) => {
    // 03 从打开的文件中读取数据
    fs.read(rfd, buf, 0, 10, 0, (err, readBytes, buffer) => {
      fs.close(rfd, (err) => {
        if (!err) console.log('a.txt关闭成功')
        else console.log('a.txt关闭失败')
      })
      // 04 将 buffer 中的数据写入b.txt中
      fs.write(wfd, buf, 0, 10, 0, (err, written, buffer) => {
        console.log('写入成功')
        fs.close(wfd, (err) => {
          if (!err) console.log('b.txt关闭成功')
          else console.log('b.txt关闭失败')
        })
      })
    })
  })
})

// 02 数据的完整拷贝
fs.open('a.txt', 'r', (err, rfd) => {
  fs.open('b.txt', 'a+', (err, wfd) => {
    fs.read(rfd, buf, 0, 10, 0, (err, readBytes, buffer) => {
      fs.write(wfd, buf, 0, 10, 0, (err, written, buffer) => {
        fs.read(rfd, buf, 0, 5, 10, (err, readBytes, buffer) => {
          fs.write(wfd, buf, 0, 5, 10, (err, written, buffer) => {
            console.log('写入成功')
            fs.close(rfd, () => { })
            fs.close(wfd, () => { })
          })
        })
      })
    })
  })
})


// 03 数据的完整拷贝
const BUFFER_SIZE = buf.length
let readOffset = 0
fs.open('a.txt', 'r', (err, rfd) => {
  fs.open('b.txt', 'a+', (err, wfd) => {
    function next() {
      fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes, buffer) => {
        // 如果条件成立，说明内容读取完毕
        if (!readBytes) {
          fs.close(rfd, () => { })
          fs.close(wfd, () => { })
          console.log('拷贝完成')
          return
        }
        readOffset += BUFFER_SIZE
        fs.write(wfd, buf, 0, readBytes, (err, written, buffer) => {
          next()
        })
      })
    }
    next()
  })
})
```

### 目录操作

**常见目录操作API**

- access：判断文件或者目录是否有操作权限

```js
fs.access('a.txt', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('有操作权限')
  }
})
```

- stat：获取目录以及文件信息

```js
fs.stat('a.txt', (err, statObj) => {
  if (err) {
    console.log(err)
  } else {
    console.log(statObj.size)
    console.log(statObj.isFile())
    console.log(statObj.isDirectory())
  }
})
```

- mkdir：创建目录

```js
// 必须保证父级目录是存在的
fs.mkdir('a/b', (err, statObj) => {
  if (err) {
    console.log(err)
  } else {
    console.log('创建成功')
  }
})

// 如果想要实现递归创建所有目录，需要设置recursive为true
fs.mkdir('a/b/c', { recursive: true }, (err, statObj) => {
  if (err) {
    console.log(err)
  } else {
    console.log('递归创建成功')
  }
})
```

- rmdir：删除目录

```js
// 表示只是删除最后一级的c
fs.rmdir('a/b/c', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('删除成功')
  }
})

// 会报错，因为默认只能删除非空目录
fs.rmdir('a', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('删除成功')
  }
})

// // 如果要递归删除所有目录，需要设置recursive为true
fs.rmdir('a', { recursive: true }, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('递归删除成功')
  }
})
```

- readdir：读取目录中的内容

```js
// a/b/b.txt
// a/a.txt
fs.readdir('a', (err, files) => {
  if (err) {
    console.log(err)
  } else {
    console.log(files) // 结果：[a.txt, b]
  }
})
```

- unlink：删除指定文件

```js
fs.unlink('a/a.txt', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('删除成功')
  }
})
```

### 同步创建目录

```js
/**
 * 01 将来调用时需要接收类似于 a/b/c ，这样的路径，它们之间是采用 / 去行连接
 * 02 利用 / 分割符将路径进行拆分，将每一项放入一个数组中进行管理  ['a', 'b', 'c']
 * 03 对上述的数组进行遍历，我们需要拿到每一项，然后与前一项进行拼接 /
 * 04 判断一个当前对拼接之后的路径是否具有可操作的权限，如果有则证明存在，否则的话就需要执行创建
 */
const path = require('path')
const fs = require('fs')

function makeDirSync(dirPath) {
  let items = dirPath.split(path.sep)
  console.log(items)
  for (let i = 1; i <= items.length; i++) {
    const dir = items.slice(0, i).join(path.sep)
    console.log(dir)
    try {
      fs.accessSync(dir)
    } catch (err) {
      fs.mkdirSync(dir)
    }
  }
}

makeDirSync('a/b/c')
```

### 异步创建目录

```js
const path = require('path')
const fs = require('fs')

function makeDir(dirPath, cb) {
  let parts = dirPath.split(path.sep)
  let index = 1
  console.log(parts)

  function next() {
    if (index > parts.length) return cb && cb()

    let current = parts.slice(0, index++).join(path.sep)
    fs.access(current, err => {
      if (err) {
        fs.mkdir(current, next)
      } else {
        next()
      }
    })
  }

  next()

}

makeDir('a/b/c', () => {
  console.log('创建成功')
})


// 将 access 与 mkdir 处理成 async... 风格
const {promisify} = require('util')
const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

async function myMkdir (dirPath, cb) {
  let parts = dirPath.split(path.sep)
  for(let index = 1; index <= parts.length; index++) {
    let current = parts.slice(0, index).join(path.sep)
    try {
      await access(current)
    } catch (err) {
      await mkdir(current)
    }
  }
  cb && cb()
}

myMkdir('a/b/c', () => {
  console.log('创建成功')
})
```
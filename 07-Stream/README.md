# Stream

文件操作系统和网络模块实现了流接口。

Node.js中的流就是处理流式数据的抽象接口。

## 应用程序中为什么使用流来处理数据？

不使用流加载文件的痛点：

- 同步读取资源文件，用户需要等待数据读取完成

- 资源文件最终一次性加载到内存，开销较大

<img src="./image/stream-1.png" width="400" height="200">

流处理数据的优势：

- 时间效率：流的分段处理可以同时操作多个数据chunk

- 空间效率：同一时间流无需占据大的内存空间

<img src="./image/stream-2.png" width="400" height="200">

- 使用方便：流配合管理，扩展程序变得简单

<img src="./image/stream-3.png" width="900" height="250">

## Node.js中流的分类

- Readable：可读流，能够实现数据的读取

- Writeable：可写流，能够实现数据的写操作

- Duplex：双工流，即可读又可写，读写是独立的，读取的数据不能直接作为写操作的数据源

- Tranform：转换流，可读可写，还能实现数据转换，读写在底层是打通的

## Node.js流特点

- Steam模块实现了四个具体的抽象

- 所有流都继承自EventEmitter

```js
const fs = require('fs')

let rs = fs.createReadStream('./test.txt')
let ws = fs.createWriteStream('./test1.txt')

rs.pipe(ws)
```

## 可写流

### 自定义可读流

- 继承stream里的Readable

- 重写_read方法，调用push产出数据

```js
const { Readable } = require('stream')
// 自定义数据存放数据，模拟底层数据
let source = ['a', 'b', 'c', 'd']
// 自定义类继承 Readable
class MyReadable extends Readable {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    let data = this.source.shift() || null
    this.push(data)
  }
}

// 消费数据
let myReadable = new MyReadable(source)

myReadable.on('readable', () => {
  let data = null
  while ((data = myReadable.read()) !== null) {
    console.log(data.toString())
  }
})

myReadable.on('data', (data) => {
  console.log(data.toString())
})
```


### 自定义可读流问题

- 底层数据读取完成之后如何处理？

  数据读取完成之后可以给Readable push一个null

- 消费者如何读取可读流中的数据？

  通过Readable的readable、date事件消费数据

**消费数据为什么需要两种方式？**

  主要是满足两个场景：

    1、只需要读取某一段数据

    2、源源不断的读取完整的数据

  因此readable内部有两种模式：流动模式、暂停模式。两者的区别在于是否需要调用read方法来读取数据

  <img src="./image/stream-4.png" width="400" height="200">

### 消费数据

- readable事件：当流中存在可读取数据时触发，暂停模式

- data事件：当流中数据快传给消费者后触发，流动模式

### 可读流总结

- 明确数据产生与消费流程

- 利用API实现自定义的可读流

- 明确数据消费的事件使用

## 可写流

### 自定义可写流

- 继承 stream 模块的 Writeable

- 重写_write方法，调用write执行写入

```js
const { Writable } = require('stream')

class MyWritable extends Writable {
  constructor() {
    super()
  }

  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + '---')
    // 写完之后再调用 done
    process.nextTick(done)
  }
}

// 创建可写流用于消费数据
let myWritable = new MyWritable()

// 执行数据写入

myWritable.write('abc', 'utf-8', () => {
  console.log('写入成功了')
})
```


### 可写流事件

- pipe事件：可读流调用pipe()方法时触发

- unpipe事件：可读流调用unpipe()方法时触发

## 双工流和转换流

### 自定义双工流

- 继承Duplex类

- 重写_read方法，调用push生产数据

- 重写_write方法，调用write消费数据

```js
const { Readable, Writable, Duplex } = require('stream')

// 模拟底层数据源
let source = ['a', 'b', 'c ']

// 自定义双工流
class MyDuplex extends Duplex {
  constructor(options) {
    super(source, options)
    this.source = source
  }

  _read() {
    let data = this.source.shift() || null
    this.push(data)
  }

  _write(chunk, enc, next) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString()
    }
    process.stdout.write(chunk + '-------')
    // write完成之后才调用next，所以使用了nextTick
    process.nextTick(next)
  }
}

// 实例化
let myDuplex = new MyDuplex(source)

myDuplex.on('data', (chunk) => {
  console.log(chunk.toString())
})

myDuplex.write('测试数据', 'utf-8', (chunk) => {
  console.log('双工流测试可写操作')
})
```


### 自定义转换流

- 继承 Transform 类

- 重写 _transform 方法，调用 push 和 callback

- 重写_flush方法，处理剩余数据

```js
const { Transform } = require('stream')

class MyTransform extends Transform {
  constructor(options) {
    super()
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback(null)
  }
}

let myTransform = new MyTransform()

myTransform.write('a')

myTransform.on('data', (chunk) => {
  console.log(chunk.toString()) // A
})
```

## 文件可读流的创建和消费

```js
const fs = require('fs')

let rs = fs.createReadStream('test.txt', {
  flags: 'r', // 文件系统flag值，默认'r' http://nodejs.cn/api/fs.html#fs_file_system_flags
  encoding: null, // 编码格式，默认 null，Buffer形式
  fd: null, // 文件描述符， 默认 null
  mode: 438, // 用于设置文件模式（权限和粘滞位），但仅限于文件被创建时
  autoClose: true, // 默认 true，当 'error' 或 'end' 事件时，文件描述符会被自动地关闭。如果为false， 发生错误时文件描述符不会被关闭
  start: 0, // start 和 end 值，用于从文件中读取一定范围的字节，而不是读取整个文件，从0开始计数
  // end: 3, // 默认值: Infinity
  highWaterMark: 4 // 默认值: 64 * 1024
})

// rs.on('data', (chunk) => {
//   console.log(chunk.toString())
//   rs.pause() // 流动模式切换为暂停模式
//   setTimeout(
//     () => {
//       rs.resume() // 暂停模式切换为流动模式
//     },
//     1000
//   )
// })

rs.on('readable', () => {
  let data
  while ((data = rs.read(1)) !== null) {
    console.log(data.toString())
    console.log('缓冲区长度：', rs._readableState.length)
  }
})
// 1
// 缓冲区长度： 3
// 2
// 缓冲区长度： 2
// 3
// 缓冲区长度： 1
// 4
// 缓冲区长度： 0
// 5
// 缓冲区长度： 3
// 5
// 缓冲区长度： 2
// 6
// 缓冲区长度： 1
// 7
// 缓冲区长度： 0
// 8
// 缓冲区长度： 2
// 9
// 缓冲区长度： 1
// 0
// 缓冲区长度： 0
```

### 文件可读流事件

```js
const fs = require('fs')

let rs = fs.createReadStream('test.txt', {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3,
  highWaterMark: 4
})

let buffer = []
// 只要调用createReadStream就会触发open事件，不需要等待数据的传输
rs.on('open', (fd) => {
  console.log(fd, '文件打开了')
})

// 数据被消费之后才会触发
rs.on('close', () => {
  console.log('文件关闭了')
})

rs.on('end', () => {
  console.log('end 之后才处理数据：', Buffer.concat(buffer).toString())
  console.log('数据被清空了')
})

rs.on('error', (err) => {
  console.log('出错了')
})

rs.on('data', (chunk) => {
  buffer.push(chunk)
  console.log(chunk.toString())
})

// 21 文件打开了
// 1234
// 5567
// 890
// end 之后才处理数据： 12345567890
// 数据被清空了
// 文件关闭了
```
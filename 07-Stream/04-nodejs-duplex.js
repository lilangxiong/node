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
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

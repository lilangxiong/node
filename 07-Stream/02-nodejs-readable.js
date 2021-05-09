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
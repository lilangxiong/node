const fs = require('fs')
const EventEmitter = require('events')
const Queue = require('./12-one-way-linkedList')
const { darkslategray } = require('color-name')

class MyWriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.writeOffset = this.start
    this.writeing = false
    this.writelen = 0
    this.needDrain = false
    this.cache = new Queue()

    this.open()
  }

  open() {
    // 原声 fs.open
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) this.emit('error', err)
      // 正常打开文件
      this.fd = fd
      this.emit('open', fd)
    })
  }

  write(chunk, encoding, cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

    this.writelen += chunk.length

    let flag = this.writelen < this.highWaterMark
    this.needDrain = !flag

    if (this.writeing) {
      // 当前正在执行写入，所以内容应该排队
      this.cache.enQueue({ chunk, encoding, cb })
    } else {
      this.writeing = true
      // 当前不是正在写入那么就执行写入
      this._write(chunk, encoding, () => {
        cb && cb()
        // 清空队列的内容
        this._clearBuffer()
      })
    }

    return flag
  }

  _write(chunk, encoding, cb) {
    // open 是一个异步动作，有可能open还未成功，就已经在执行write了
    if (typeof this.fd !== 'number') {
      return this.once('open', () => { this._write(chunk, encoding, cb) })
    }

    fs.write(this.fd, chunk, this.start, chunk.length, this.write, (err, written) => {
      this.writeOffset += written
      this.writelen -= written
      cb && cb()
    })
  }

  _clearBuffer() {
    let data = this.cache.dlQueue()
    if (data) {
      this._write(data.element.chunk, data.element.encoding, () => {
        data.element.cb && data.element.cb()
        this._clearBuffer()
      })
    } else {
      // 需要发送drain事件
      if (this.needDrain) {
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
}

const ws = new MyWriteStream('test2.txt', {
  highWaterMark: 1
})

ws.on('open', (fd) => {
  console.log('open ---->', fd)
})

ws.write('1', 'utf-8', () => {
  console.log('ok1')
})

ws.write('10', 'utf-8', () => {
  console.log('ok2')
})
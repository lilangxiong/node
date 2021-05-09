function MyEvent() {
  this._events = Object.create(null)
}

MyEvent.prototype.on = function (type, callback) {
  if (this._events[type]) {
    this._events[type].push(callback)
  } else {
    this._events[type] = [callback]
  }
}

MyEvent.prototype.emit = function (type, ...args) {
  if (this._events[type] && this._events[type].length) {
    this._events[type].forEach(cb => {
      cb.call(this, ...args)
    })
  }
}


MyEvent.prototype.off = function (type, callback) {
  if (this._events[type] && this._events[type].length) {
    this._events[type] = this._events[type].filter(cb => {
      cb !== callback && cb.link !== callback
    })
  }
}

MyEvent.prototype.once = function (type, callback) {
  const fn = function (...args) {
    callback.call(this, ...args)
    this.off(type, callback)
  }
  fn.link = callback
  this.on(type, fn)
}

const ev = new MyEvent()

const fn = function (...data) {
  console.log('事件1执行了')
  console.log(data)
}
ev.on('事件1', fn)
// ev.once('事件1', fn)
ev.emit('事件1', 1)
// ev.off('事件1', fn)
ev.emit('事件1', 2)

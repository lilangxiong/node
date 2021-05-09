class PubSub {
  _events = []

  constructor() { }

  subscribe(type, callback) {
    if (this._events[type]) {
      this._events[type].push(callback)
    } else {
      this._events[type] = [callback]
    }
  }

  publish(type, ...args) {
    const cbs = this._events[type]
    if (cbs && cbs.length) {
      cbs.forEach(function (cb) {
        cb.call(this, ...args)
      })
    }
  }
}

const pubSub = new PubSub()

pubSub.subscribe('事件1', (...args) => {
  console.log('事件1执行了')
  console.log(args)
})

pubSub.publish('事件1', 1, 2, 3)
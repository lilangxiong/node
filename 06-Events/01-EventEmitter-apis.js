const EventEmitter = require('events')

const ev = new EventEmitter()

// // on
// ev.on('事件1'x, () => {
//   console.log('事件1执行了')
// })

// ev.on('事件1', () => {
//   console.log('事件1执行了----2')
// })

// // emit
// ev.emit('事件1')
// ev.emit('事件1')


// on
// ev.once('事件1', () => {
//   console.log('事件1执行了')
// })

// ev.once('事件1', () => {
//   console.log('事件1执行了----2')
// })

// // emit
// ev.emit('事件1')
// ev.emit('事件1')

// on
// const cbFn = (a, b) => {
//   console.log('事件1执行了')
//   console.log(a)
//   console.log(b)
// }

// const cbFn = (...args) => {
//   console.log('事件1执行了')
//   console.log(args)
// }

ev.on('事件1', function () {
  console.log(this)
})

ev.on('事件1', function () {
  console.log(this)
})


// ev.on('事件2', function () {
//   console.log(this)
// })

// emit
ev.emit('事件1', 1, 2)

// ev.off('事件1', cbFn)

ev.emit('事件1')


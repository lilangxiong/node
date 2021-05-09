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

// rs.on('readable', () => {
//   let data
//   while ((data = rs.read(1)) !== null) {
//     console.log(data.toString())
//     console.log('缓冲区长度：', rs._readableState.length)
//   }
// })
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
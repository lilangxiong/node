const fs = require('fs')

let ws = fs.createWriteStream('test1.txt', {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 4
})

// 写入的内容只能是字符串、buffer，否则会报错
ws.write('abc', () => {
  console.log('ok1')
})

ws.write('efg', () => {
  console.log('ok2')
})

ws.on('open', (fd) => {
  console.log('文件打开了', fd)
})

// close 是在数据写入操作全部完成之后才执行，以end方法调用作为完成标识
ws.on('close', () => {
  console.log('文件关闭了')
})

// ws.write的参数类型错误是直接抛出错误，无法被error事件捕捉的
ws.on('error', (err) => {
  console.log('出错了', err)
})

// end 执行之后就意味着数据写入操作完成
ws.end('hij') // end方法也可以传需要写入的内容

// 在end之后write会报错，并被捕捉到
ws.write('create an error')
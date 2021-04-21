const fs = require('fs')
const path = require('path')

// fs.readFile(path.resolve('data.txt'), 'utf-8', (err, data) => {
//   if (err) console.log(err)
//   else console.log(data)
// })

// fs.writeFile('data.txt', '123', {
//   mode: 438, // 设置读写执行权限
//   flag: 'r+', // 写入方式
//   encoding: 'utf-8' // 字符编码集
// }, (err,) => {
//   if (err) console.log(err)
//   else {
//     fs.readFile('data.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// })

// fs.appendFile('data.txt', 'abc', (err,) => {
//   if (err) console.log(err)
//   else {
//     fs.readFile('data.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// })

// fs.copyFile('data.txt', 'data1.txt', (err,) => {
//   if (err) console.log(err)
//   else {
//     fs.readFile('data1.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// })

fs.watchFile('data.txt', { interval: 20 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了: ')
    fs.unwatchFile('data.txt')
  }
})
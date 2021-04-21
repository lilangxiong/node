const fs = require('fs')
const path = require('path')

// fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
//   console.log('fd: ', fd)
// })


// fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
//   console.log('fd: ', fd)
//   fs.close(fd, err => {
//     console.log('关闭成功')
//   })
// })

let buf = Buffer.alloc(10)

// fs.open('data.txt', 'r', (err, rfd) => {
//   console.log(rfd)
//   fs.read(rfd, buf, 1, 4, 2, (err, readBytes, data) => {
//     console.log(readBytes)
//     console.log(data)
//     console.log(data.toString())
//   })
// })

buf = Buffer.from('1234567890')
fs.open('b.txt', 'w', (err, wfd) => {
  console.log(wfd)
  fs.write(wfd, buf, 2, 4, 0, (err, written, buffer) => {
    console.log(written)
    console.log(buffer)
    console.log(buffer.toString())
  })
})
const fs = require('fs')

/*
* 01 打开 a 文件，利用 read 将数据保存到 buffer 中暂存
* 02 打开 b 文件，利用 write 将 buffer 中的数据写到 b 文件中
*/
let buf = Buffer.alloc(10)

// a.txt: 1234567890abcdef
// 01 打开指定文件
// fs.open('a.txt', 'r', (err, rfd) => {
//   // 02 打开 b 文件，用于执行数据写操作
//   fs.open('b.txt', 'w', (err, wfd) => {
//     // 03 从打开的文件中读取数据
//     fs.read(rfd, buf, 0, 10, 0, (err, readBytes, buffer) => {
//       fs.close(rfd, (err) => {
//         if (!err) console.log('a.txt关闭成功')
//         else console.log('a.txt关闭失败')
//       })
//       // 04 将 buffer 中的数据写入b.txt中
//       fs.write(wfd, buf, 0, 10, 0, (err, written, buffer) => {
//         console.log('写入成功')
//         fs.close(wfd, (err) => {
//           if (!err) console.log('b.txt关闭成功')
//           else console.log('b.txt关闭失败')
//         })
//       })
//     })
//   })
// })

// 02 数据的完整拷贝
// fs.open('a.txt', 'r', (err, rfd) => {
//   fs.open('b.txt', 'a+', (err, wfd) => {
//     fs.read(rfd, buf, 0, 10, 0, (err, readBytes, buffer) => {
//       fs.write(wfd, buf, 0, 10, 0, (err, written, buffer) => {
//         fs.read(rfd, buf, 0, 5, 10, (err, readBytes, buffer) => {
//           fs.write(wfd, buf, 0, 5, 10, (err, written, buffer) => {
//             console.log('写入成功')
//             fs.close(rfd, () => { })
//             fs.close(wfd, () => { })
//           })
//         })
//       })
//     })
//   })
// })


// 03 数据的完整拷贝
const BUFFER_SIZE = buf.length
let readOffset = 0
fs.open('a.txt', 'r', (err, rfd) => {
  fs.open('b.txt', 'a+', (err, wfd) => {
    function next() {
      fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes, buffer) => {
        // 如果条件成立，说明内容读取完毕
        if (!readBytes) {
          fs.close(rfd, () => { })
          fs.close(wfd, () => { })
          console.log('拷贝完成')
          return
        }
        readOffset += BUFFER_SIZE
        fs.write(wfd, buf, 0, readBytes, (err, written, buffer) => {
          next()
        })
      })
    }
    next()
  })
})

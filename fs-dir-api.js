const fs = require('fs')

fs.access('a.txt', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('有操作权限')
  }
})


fs.stat('a.txt', (err, statObj) => {
  if (err) {
    console.log(err)
  } else {
    console.log(statObj.size)
    console.log(statObj.isFile())
    console.log(statObj.isDirectory())
  }
})

// 必须保证父级目录是存在的
fs.mkdir('a/b', (err, statObj) => {
  if (err) {
    console.log(err)
  } else {
    console.log('创建成功')
  }
})

// 如果想要实现递归创建所有目录，需要设置recursive为true
fs.mkdir('a/b/c', { recursive: true }, (err, statObj) => {
  if (err) {
    console.log(err)
  } else {
    console.log('递归创建成功')
  }
})

// 表示只是删除最后一级的c
fs.rmdir('a/b/c', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('删除成功')
  }
})

// 会报错，因为默认只能删除非空目录
fs.rmdir('a', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('删除成功')
  }
})

// // 如果要递归删除所有目录，需要设置recursive为true
fs.rmdir('a', { recursive: true }, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('递归删除成功')
  }
})

// a/b/b.txt
// a/a.txt
fs.readdir('a', (err, files) => {
  if (err) {
    console.log(err)
  } else {
    console.log(files) // 结果：[a.txt, b]
  }
})

fs.unlink('a/a.txt', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('删除成功')
  }
})
const path = require('path')
const fs = require('fs')

function makeDir(dirPath, cb) {
  let parts = dirPath.split(path.sep)
  let index = 1
  console.log(parts)

  function next() {
    if (index > parts.length) return cb && cb()

    let current = parts.slice(0, index++).join(path.sep)
    fs.access(current, err => {
      if (err) {
        fs.mkdir(current, next)
      } else {
        next()
      }
    })
  }

  next()

}

makeDir('a/b/c', () => {
  console.log('创建成功')
})
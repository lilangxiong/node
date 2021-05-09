const path = require('path')
const fs = require('fs')

function makeDirSync(dirPath) {
  let items = dirPath.split(path.sep)
  console.log(items)
  for (let i = 1; i <= items.length; i++) {
    const dir = items.slice(0, i).join(path.sep)
    console.log(dir)
    try {
      fs.accessSync(dir)
    } catch (err) {
      fs.mkdirSync(dir)
    }
  }
}

makeDirSync('a/b/c')
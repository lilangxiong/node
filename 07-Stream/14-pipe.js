const fs = require('fs')

const rs = fs.createReadStream('./test1.txt', {
  highWaterMark: 4
})

const ws = fs.createWriteStream('./test2.txt', {
  highWaterMark: 1
})
 
rs.pipe(ws)
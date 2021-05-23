/**
 * 写入方式
 * 1、一次性写入
 * 2、分批写入
 */
const fs = require('fs');

let ws = fs.createWriteStream('test3.txt', {
  highWaterMark: 3
});

let source = '测试而已'.split('');
let flag = true;

function executeWrite() {
  flag = true;
  while (source.length && flag) {
    flag = ws.write(source.shift());
  }
}

executeWrite()

ws.on('drain', () => {
  console.log('drain event')
  executeWrite()
})

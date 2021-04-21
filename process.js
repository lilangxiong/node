// console.log(process.memoryUsage())
// console.log(process.cpuUsage())
// console.log(process.cwd())
// console.log(process.version)
// console.log(process.versions)
// console.log(process.arch)
// console.log(process.env.NODE_ENV)
// console.log(process.env.PATH)
// console.log(process.env.HOME)
// console.log(process.platform)
// console.log(process.argv)
// console.log(process.pid)
// console.log(process.uptime())
// process.on('exit', (code) => {
//   console.log('exit' + code)
// })
// process.on('beforeExit', (code) => {
//   console.log('beforeExit' + code)
// })
// console.log('代码执行完了')
// console.log = function (data) {
//   process.stdout.write('==============' + data + '\n')
// }
// console.log(11)
// console.log(12)

// const fs = require('fs')
// fs.createReadStream('test.txt').pipe(process.stdout)

// process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
  let chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write('data' + chunk)
  }
})
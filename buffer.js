// const b1 = Buffer.alloc(10) // 10个字节的buffer
// console.log(b1)

// const b2 = Buffer.allocUnsafe(10) // 10个字节的buffer
// console.log(b2)

// const b3 = Buffer.from('1')
// console.log(b3)

// const b4 = Buffer.from('中')
// console.log(b4)

// const b5 = Buffer.from([1, 2, '中'])
// console.log(b5)

// const b6 = Buffer.from([0xe4, 0xb8, 0xad])
// console.log(b6)
// console.log(b6.toString())

// const b7 = Buffer.alloc(3)
// const b8 = Buffer.from(b7)

// console.log(b7)
// console.log(b8)

// b7[0] = 1

// console.log(b7)
// console.log(b8)

// let buf2 = Buffer.alloc(6)
// buf2.fill('123', 1)
// console.log(buf2)
// console.log(buf2.toString())

// let buf3 = Buffer.alloc(6)
// buf3.fill('123', 1, 3)
// console.log(buf3)
// console.log(buf3.toString())

// let buf4 = Buffer.alloc(6)
// buf4.fill(123)
// console.log(buf4)
// console.log(buf4.toString())

// let wbuf = Buffer.alloc(6)
// wbuf.write('123')
// console.log(wbuf)
// console.log(wbuf.toString())

// let wbuf1 = Buffer.alloc(6)
// wbuf1.write('123', 1)
// console.log(wbuf1)
// console.log(wbuf1.toString())

// let wbuf2 = Buffer.alloc(6)
// wbuf2.write('123', 1, 2)
// console.log(wbuf2)
// console.log(wbuf2.toString())

// let tobuf = Buffer.from('四个汉字')
// console.log(tobuf)
// console.log(tobuf.toString('utf-8', 3, 9))

// let slicebuf = Buffer.from('四个汉字')
// let slicebuf2 = slicebuf.slice()
// console.log(slicebuf)
// console.log(slicebuf2.toString())

// let slicebuf3 = slicebuf.slice(3)
// console.log(slicebuf3.toString())

// let slicebuf4 = slicebuf.slice(3, 9)
// console.log(slicebuf4.toString())

// let slicebuf5 = slicebuf.slice(-3)
// console.log(slicebuf5.toString())

// let ofbuf = Buffer.from('爱前端，爱学习，事少钱多离家近')
// console.log(ofbuf)
// console.log(ofbuf.indexOf('爱', 4))

let copybuf = Buffer.alloc(6)
let copybuf2 = Buffer.from('汉字')
copybuf2.copy(copybuf)
console.log(copybuf2.toString())
console.log(copybuf.toString())

let copybuf3 = Buffer.alloc(6)
copybuf2.copy(copybuf3, 3, 3, 6)
console.log(copybuf3.toString())

let slicebuf = Buffer.from('四个汉字')
let slicebuf4 = slicebuf.slice(3, 9)
console.log(slicebuf4.toString())
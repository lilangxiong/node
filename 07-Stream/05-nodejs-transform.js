const { Transform } = require('stream')

class MyTransform extends Transform {
  constructor(options) {
    super()
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback(null)
  }
}

let myTransform = new MyTransform()

myTransform.write('a')

myTransform.on('data', (chunk) => {
  console.log(chunk.toString())
})
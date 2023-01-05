console.log(exports)

console.log(module.exports)

console.log(exports == module.exports)

const username = "zx"

exports.username = username
exports.age = 20
exports.sayHello = () => {
  console.log("大家好")
}
// 最终最终向外共享的结果，永远只是module.exports所指向的对象！！
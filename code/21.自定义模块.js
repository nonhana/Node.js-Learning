// 在一个自定义模块中，默认情况下，module.exports={}

// 向module.exports对象上挂载username属性
module.exports.username = "周想"

module.exports.sayHello = function () {
  console.log("hello")
}

// 让module.exports指向一个全新的对象
module.exports = {
  nickname: "你好",
  sayHi() {
    console.log("Hi")
  }
}
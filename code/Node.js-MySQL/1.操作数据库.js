// 1.导入mysql模块
const mysql = require('mysql')
// 2.建立与MySQL数据库的链接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的ip地址
  user: 'root', // 登录数据库的账号
  password: '20021209xiang', // 登录数据库的密码
  database: 'my_db_01' // 指定要操作哪个数据库
})

// 测试mysql模块能否正常工作
/* db.query('select 1', (err, results) => {
  // mysql模块工作期间报错了
  if (err) return console.log(err.message)
  // 能够正常的执行SQL语句
  console.log(results)
}) */

// 查询users表中所有的数据
/* const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message)
  // 查询数据成功
  // 注意：如果执行的是select这个查询语句，则执行的结果是一个数组！
  console.log(results)
}) */

// 向users表中新增一条数据
/* const user = { username: "Spider-Man", password: "pcc123" }
// 定义待执行的SQL语句
// 注意：此处的?为占位符，用来被预填充
const sqlStr = 'insert into users (username,password) values(?,?)'
// 执行SQL语句
db.query(sqlStr, [user.username, user.password], (err, results) => {
  // 失败
  if (err) return console.log(err.message)
  // 成功
  if (results.affectedRows === 1) {
    // 注意：如果执行的是insert into插入语句，则results为一个对象
    // 可以通过affectedRows来判断插入是否成功
    console.log("插入数据成功！")
  }
}) */

// 演示插入数据的便捷方式(仅限于数据对象的每个属性和数据表的字段都一一对应的情况)
/* const user = { username: "Spider-Man2", password: "pcc4321" }
// 定义待执行的SQL语句
const sqlStr = 'insert into users set ?'
// 执行SQL语句
db.query(sqlStr, user, (err, results) => {
  // 失败
  if (err) return console.log(err.message)
  // 成功
  if (results.affectedRows === 1) {
    console.log("插入数据成功！")
  }
}) */

// 演示如何更新用户的信息
/* const user = { id: 5, username: "bubuji", password: "000" }
// 定义SQL语句
const sqlStr = 'update users set username=?,password=? where id=?'
// 执行SQL语句
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了update语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
  if (results.affectedRows === 1) {
    console.log("更新成功")
  }
}) */

// 演示如何快速更新用户的信息(原理和上面的便捷插入一样)
/* const user = { id: 5, username: "bubuji", password: "000" }
// 定义SQL语句
const sqlStr = 'update users set ? where id=?'
// 执行SQL语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了update语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
  if (results.affectedRows === 1) {
    console.log("更新数据成功")
  }
}) */

// 删除id为4的用户
/* const sqlStr = 'delete from users where id=?'
db.query(sqlStr, 4, (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了delete语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
  if (results.affectedRows === 1) {
    console.log("删除数据成功")
  }
}) */

// 标记删除id为4的用户
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr, [1, 3], (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了delete语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
  if (results.affectedRows === 1) {
    console.log("删除数据成功")
  }
})
# 数据库与身份认证

## 1. 数据库的基本概念

### 1.1 什么是数据库

数据库(database)是用来组织、存储和管理数据的仓库。

当今世界是一个充满着数据的互联网世界，充斥着大量的数据。数据的来源有很多，除了文本类型的数据，图像、音乐、声音都是数据。

为了方便管理互联网世界中的数据，就有了数据库管理系统的概念(简称：数据库)。用户可以对数据库中的数据进行**新增、查询、更新、删除**等操作。

### 1.2 常见的数据库及分类

市面上的数据库有很多种，最常见的数据库有如下几个：

- MySQL数据库(目前使用最广泛，流行度最高的开源免费数据库；Community+Enterprise)
- Oracle数据库(收费)
- SQL Server数据库(收费)
- MongoDB数据库(Community+Enterprise)

其中，MySQL、Oracle、SQL Server属于**传统型数据库**(又叫做：**关系型数据库**或**SQL数据库**)，这三者的设计理念相同，用法比较相似。

而MongoDB属于**新型数据库**(又叫做：**非关系型数据库**或**NoSQL数据库**)，它在一定程度上弥补了传统型数据库的缺陷。

### 1.3 传统型数据库的数据组织结构

数据的组织结构：指的就是数据以什么样的结构进行存储。

传统型数据库的数据组织结构和Excel中数据的组织结构比较类似。

1. Excel的数据组织结构

   每个Excel中，数据的组织结构分别为工作簿、工作表、数据行、列这四大部分组成。

   ![image-20230104113926241](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230104113926241.png)

2. 传统型数据库的数据组织结构

   在传统型数据库中，数据的组织结构分为数据库(database)、数据表(table)、数据行(row)、字段(field)。

   ![image-20230104114110275](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230104114110275.png)

3. 实际开发中库、表、行、字段之间的关系
   - 在实际项目开发中，一般情况下，每个项目都对应独立的数据库。
   - 不同的数据，要存储到数据库的不同表中。
   - 每个表中具体要存储哪些信息由字段来决定。
   - 表中的行，代表着每一条具体的数据。

## 2. 安装并配置MySQL

### 2.1 了解需要安装哪些MySQL相关的软件

对于开发人员来说，需要安装MySQL Server和MySQL Workbench这两个软件。

- MySQL Server：专门用来提供数据存储和服务的软件。
- MySQL Workbench：可视化的MySQL管理工具，通过它可以很方便的操作存储在MySQL Server中的数据。

ps：由于我之前已经装了这两个东西而且已经进行过相应的使用了，这边就不写怎么具体安装了，反正网上教程一查一大把；而且由于有关于SQL语句的知识我已经掌握的十分完善了(学校里面有专门的开SQL的课)，因此此处不再赘述有关于SQL语句的基本知识。

## 3. 在项目中操作MySQL

### 3.1 在项目中操作数据库的步骤

1. 安装操作MySQL数据库的第三方模块mysql
2. 通过mysql模块连接到MySQL数据库
3. 通过mysql模块执行SQL语句

![image-20230104135603279](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230104135603279.png)

### 3.2 安装与配置mysql模块

1. 安装mysql模块

   mysql是托管于npm上的第三方模块。它提供了在Node.js项目中链接和操作MySQL数据库的能力。

   想要在项目中使用它，需要先运行如下命令将mysql安装为项目的依赖包：

   ```js
   npm install mysql
   ```

2. 配置mysql模块

   在使用mysql模块操作MySQL数据库之前，必须先对mysql模块进行必要的配置，主要的配置步骤如下：

   ```js
   // 1.导入mysql模块
   const mysql = require('mysql')
   // 2.建立与MySQL数据库的链接关系
   const db = mysql.createPool({
     host: '127.0.0.1', // 数据库的ip地址
     user: 'root', // 登录数据库的账号
     password: '20021209xiang', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   ```

3. 测试mysql模块能否正常工作

   调用db.query()函数，指定要执行的SQL语句，通过回调函数拿到执行的结果：

   ```js
   // 测试mysql模块能否正常工作
   db.query('select 1', (err, results) => {
     // mysql模块工作期间报错了
     if (err) return console.log(err.message)
     // 能够正常的执行SQL语句
     console.log(results)
   })
   ```

### 3.3 使用mysql模块操作MySQL数据库

1. 查询数据

   查询users表中所有的数据(之前已经把这个表建好了，用MySQL Workbench)

   ```js
   // 查询users表中所有的数据
   const sqlStr = 'select * from users' // 定义要查询的sql语句
   db.query(sqlStr, (err, results) => {
     // 查询数据失败
     if (err) return console.log(err.message)
     // 查询数据成功
     // 注意：如果执行的是select这个查询语句，则执行的结果是一个对象的数组！
     console.log(results)
   })
   ```

2. 插入数据

   向users表中新增数据，其中username=Spider-Man，password为pcc321。示例代码如下：

   ```js
   // 向users表中新增一条数据
   const user = { username: "Spider-Man", password: "pcc123" }
   // 定义待执行的SQL语句
   // 注意：此处的?为占位符，用来被预填充，把数据对象的值依次丢进来
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
   })
   ```

3. 插入数据的便捷方式

   向表中新增数据时，**如果数据对象的每个属性和数据表的字段都一一对应**，则可以通过如下方式快速插入数据：

   ```js
   // 演示插入数据的便捷方式(仅限于数据对象的每个属性和数据表的字段都一一对应的情况)
   const user = { username: "Spider-Man2", password: "pcc4321" }
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
   })
   ```

4. 更新数据

   可以通过如下方式，更新表中的数据：

   ```js
   // 演示如何更新用户的信息
   const user = { id: 5, username: "bubuji", password: "000" }
   // 定义SQL语句
   const sqlStr = 'update users set username=?,password=? where id=?'
   // 执行SQL语句
   db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
     if (err) return console.log(err.message)
     // 注意：执行了update语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
     if (results.affectedRows === 1) {
       console.log("更新成功")
     }
   })
   ```

5. 更新数据的便捷方式

   更新表数据时，**如果数据对象的每个属性和数据表的字段一一对应**，可以通过如下方式快速更新表数据：

   ```js
   // 演示如何快速更新用户的信息(原理和上面的便捷插入一样)
   const user = { id: 5, username: "bubuji", password: "000" }
   // 定义SQL语句
   const sqlStr = 'update users set ? where id=?'
   // 执行SQL语句
   db.query(sqlStr, [user, user.id], (err, results) => {
     if (err) re urn console.log(err.message)
     // 注意：执行了update语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
     if (results.affectedRows === 1) {
       console.log("更新数据成功")
     }
   })
   ```

6. 删除数据

   在删除数据时，推荐根据id这样的唯一标识来删除数据。示例如下：

   ```js
   // 删除id为4的用户
   const sqlStr = 'delete from users where id=?'
   db.query(sqlStr, 4, (err, results) => {
     if (err) return console.log(err.message)
     // 注意：执行了delete语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
     if (results.affectedRows === 1) {
       console.log("删除数据成功")
     }
   })
   ```

7. 标记删除

   使用delete语句，会真正的把数据从表中删除掉。**为了避免误删，采用标记删除的形式来模拟删除的动作**。

   所谓的标记删除，就是在表中设置类似于status这样的字段，来**标记**这条数据是否被删除。

   当用户执行了删除的动作时，我们并没有执行delete这样的语句删数据，而执行的是update语句将其status标记为删除。

   ```js
   // 标记删除id为4的用户
   const sqlStr = 'update users set status=? where id=?'
   db.query(sqlStr, [1, 3], (err, results) => {
     if (err) return console.log(err.message)
     // 注意：执行了delete语句之后的results结果也是一个对象，用affectedRows判断更新是否成功
     if (results.affectedRows === 1) {
       console.log("删除数据成功")
     }
   })
   ```


## 4. 前后端的身份认证

### 4.1 Web开发模式

目前主流的Web开发模式有两种，分别是：

1. 基于服务端渲染的传统Web开发模式
2. 基于前后端分离的新型Web开发模式

1. 服务端渲染的传统Web开发模式

   概念：服务器发送给HTML页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不需要使用Ajax这样的技术来额外的请求数据。

2. 服务端渲染的传统Web开发模式的优点
   - 前端耗时少。因为服务器端直接负责动态HTML页面的生成，浏览器只需要负责渲染页面即可。
   - 有利于SEO。因为服务端响应完整的HTML页面内容，所以爬虫更方便的爬取信息，更有利于SEO。
3. 服务端渲染的传统Web开发模式的缺点
   - 占用服务器端资源。即服务器端完成HTML页面内容的拼接，如果请求较多，会对服务器造成一定的压力。
   - 不利于前后端分离，开发效率低下。服务器端渲染则会导致前后端无法分工合作，尤其是对于前端复杂度高的项目，非常的难以开发。

4. 基于前后端分离的新型Web开发模式

   前后端分离的概念：前后端分离的开发模式，依赖于Ajax技术的广泛应用。简而言之，前后端分离的Web开发模式就是**后端负责提供API接口，前端通过Ajax调用接口**的开发模式。

5. 基于前后端分离的新型Web开发模式的优点
   - 开发体验好。前端专注于UI页面的开发，后端专注于api的开发。
   - 用户体验好。Ajax可以轻松实现页面的局部刷新。
   - 减轻了服务器端的渲染压力。因为页面最终是在用户的浏览器中生成的。
6. 基于前后端分离的新型Web开发模式的缺点
   - 不利于SEO。因为完整的HTML页面需要在客户端拼接完成，所以爬虫无法爬取页面的有效信息。(解决方案：**利用Vue、React等前端框架的SSR技术能够很好的解决SEO问题！**)

### 4.2 身份认证

1. 什么是身份认证

   身份认证(Authentication)又称"身份验证"、"鉴权"，是指**通过一系列的手段，完成对用户身份的确认。**

2. 为什么需要身份认证

   身份认证的目的，是**为了确认当前所声称为某种身份的用户确实是所声称的用户。**

3. 不同开发模式下的身份认证

   对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案：

   1. 服务端渲染推荐使用Session认证机制
   2. 前后端分离推荐使用JWT认证机制

### 5.3 Session认证机制

1. HTTP协议的无状态性

   HTTP协议的无状态性，指的是客户端的每次HTTP请求都是独立的，连续多个请求之间没有直接的联系。服务器不会主动保留每次HTTP请求的状态。

2. 如何突破HTTP无状态限制

   ![image-20230104191322033](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230104191322033.png)

3. 什么是Cookie

   Cookie是存储在用户浏览器中的一段**不超过4KB的字符串**。它由**一个名称**、**一个值**和**其他几个用于控制Cookie有效期、安全性、适用范围的可选属性组成**。

   不同域名下的Cookie各自独立，每当客户端发起请求时，**会自动把当前域名下所有未过期的Cookie一同发送到服务器。**

   Cookie的几大特性：

   1. 自动发送
   2. 域名独立
   3. 过期时限
   4. 4KB限制

4. Cookie在身份认证中的作用

   客户端第一次请求服务器的时候，**服务器通过响应头的形式**，向客户端发送一个身份认证的Cookie，客户端会自动把将Cookie保存在浏览器中。

   随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的Cookie通过请求头的形式发送给服务器，服务器即可验明用户的身份。

   ![image-20230104201605633](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230104201605633.png)

5. Cookie不具有安全性

   由于Cookie是存储在浏览器中的，而且浏览器也提供了读写Cookie的API，因此Cookie很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据通过Cookie的形式发送给服务器。

6. 提高身份认证的安全性

   为了防止客户伪造会员卡，收银员在拿到会员卡后，可以**在收银机上进行刷卡认证**。只有收银机确认存在的会员卡才能被正常使用。

   ![image-20230104202359849](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230104202359849.png)

   这种**"会员卡"+"刷卡认证"**的设计理念就是Session认证机制的精髓。

7. Session的工作原理

   ![image-20230104202513303](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230104202513303.png)

### 5.4 在express中使用Session认证

1. 安装express-session中间件

   在express项目中，只需要安装express-session中间件即可在项目中使用session认证：

   ```js
   npm install express-session
   ```

2. express-session中间件安装成功后，需要通过app.use()来注册session中间件，示例代码如下：

   ```js
   // 导入express-session中间件
   const session = require('express-session')
   // 配置express-session中间件
   app.use(
     session({
       secret: 'nonhana',
       resave: false,
       saveUninitialized: true
     })
   )
   ```

3. 当express-session中间件配置成功之后，即可通过req.session来访问和使用session对象，从而存储用户的关键信息：

   ```js
   // 登录的API接口
   app.post('/api/login', (req, res) => {
     if (req.body.username != 'admin' || req.body.password != '123456') {
       return res.send({
         status: 1,
         msg: "登录失败"
       })
     }
     // 注意：只有成功配置了express-session这个中间件之后，才能够通过req.session属性访问
     req.session.user = req.body // 用户的信息
     req.session.isLogin = true // 用户的登录状态
     res.send({
       status: 0,
       msg: "登录成功"
     })
   })
   ```

4. 从session中取数据

   可以直接从req.session对象上获取之前存储的数据，示例代码如下：

   ```js
   // 获取用户姓名的接口
   app.get('/api/username', (req, res) => {
     // 从session中获取用户的名称
     if (!req.session.isLogin) {
       return res.send({
         status: 1,
         msg: "have not logined"
       })
     }
     // 成功后从session中取数据并返回
     res.send({
       status: 0,
       msg: "success",
       username: req.session.user.username
     })
   })
   ```

5. 清空session

   调用req.session.destory()函数，即可清空服务器保存的session信息。

   ```js
   // 退出登录的接口
   app.post('/api/logout', (req, res) => {
     // 退出登录后调用req.session.destroy()清空session的信息
     req.session.destroy()
     res.send({
       status: 0,
       msg: "logout!"
     })
   })
   ```


### 5.5 JWT认证机制

1. 了解Session认证的局限性

   Session认证机制需要配合Cookie才能实现。由于**Cookie默认不支持跨域访问**，因此**当涉及到前端跨域请求后端接口的时候需要做很多额外的配置**，才能够实现跨域Session认证。

   注意：

   - 当前端请求后端接口不存在跨域问题的时候，推荐使用Session身份认证机制。
   - 当前端需要跨域请求后端接口的时候，不推荐使用Session身份认证机制，推荐使用JWT身份认证机制。

2. 什么是JWT

   JWT(英文全称：JSON Web Token)是目前最流行的跨域解决方案。

3. JWT的工作原理

   ![image-20230105101000188](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230105101000188.png)

   总结：用户的信息通过Token字符串的形式保存在客户端浏览器中，服务器通过还原Token字符串的形式来认证用户的身份。

4. JWT的组成部分

   JWT通常由三部分组成，分别是Header(头部)、Payload(有效荷载)、Signature(签名)。

   三者之间使用英文的"."分隔，格式如下：

   ```js
   Header.Payload.Signature
   ```

5. JWT的三个部分各自代表的含义

   - Payload部分才是真正的用户信息，他是用户信息经过加密处理之后生成的字符串
   - Header和SIgnature是安全性相关的部分，只是为了保证Token的安全性。

   ![image-20230105101621254](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230105101621254.png)

6. JWT的使用方式

   客户端收到服务器返回的JWT之后，通常会将它存储到localStorage或sessionStorage当中。

   此后，客户端每次与服务器通信，都要带上这个JWT字符串，从而进行身份验证。推荐的做法是把JWT放在HTTP请求头的Authorization字段中，格式如下：

   ```js
   Authorization:Bearer<token>
   ```

### 5.6 在express中使用JWT

1. 安装JWT相关的包

   运行如下命令，安装如下两个JWT相关的包：

   ```js
   npm install jsonwebtoken express-jwt
   ```

   其中：

   - jsonwebtoken用于生成JWT字符串
   - express-jwt用于将JWT字符串解析还原成JSON对象

2. 导入JWT相关的包

   使用require()函数导入JWT两个相关的包：

   ```js
   const jwt=require('jsonwebtoken')
   const expressJWT=require('express-jwt')
   ```

3. 定义secret秘钥

   为了保证JWT字符串的安全性，防止JWT字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的secret秘钥：

   1. 当生成JWT时，需要使用secret秘钥对用户的信息进行加密，卒子红得到加密好的JWT字符串
   2. 当把JWT字符串还原解析成JSON对象的时候，需要使用secret秘钥进行解密

   ```js
   const secretKey='zhouxiang non_hana <?/:_-=+>'
   ```

4. 在登录成功后生成JWT字符串

   **调用jsonwebtoken包提供的sign()方法**，将用户的信息加密成JWT字符串，响应给客户端：

   ```js
   // 登录接口
   app.post('/api/login', (req, res) => {
     const userinfo = req.body
     // 验证失败后返回失败的结果
     if (req.body.username !== "admin" || req.body.password !== "000000") {
       return res.send({
         status: 1,
         msg: "登录失败"
       })
     }
     // 验证成功后返回带有token的对象，调用jwt.sign()方法生成jwt字符串
     // 参数1：用户的信息对象
     // 参数2：加密的秘钥
     // 参数3：配置对象，可以配置当前token字符串。如此处配置expiresIn属性，表示该token的有效期为30s。
     const token = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
     res.send({
       status: 0,
       msg: "登录成功！",
       token: token
     })
   })
   ```

5. 将JWT字符串还原为JSON对象

   客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的Authorization字符安，将Token字符串发送到服务器进行身份认证。

   此时，服务器可以通过express-jwt这个中间件，自动将客户端发送过来的Token解析还原成JSON对象：

   ```js
   // 注册将JWT还原成JSON字符串的中间件
   // expressJWT配置对象的secret属性表示要解密的秘钥，其unless方法指明了不需要token鉴权的url
   app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
   ```

6. 使用req.auth获取用户信息

   当express-jwt这个中间件配置成功后，即可在那些有权限的接口中使用req.auth对象来访问从JWT字符串中解析出来的用户信息了，示例代码如下：

   ```js
   // 需要带权限访问的接口
   app.get('/admin/getinfo', (req, res) => {
     // 使用req.auth获取用户信息，使用data将用户信息发送给客户端
     console.log(req.auth)
     res.send({
       status: 200,
       message: '获取用户信息成功',
       data: req.auth
     })
   })
   ```

7. 捕获解析JWT失败后产生的错误

   当使用express-jwt解析token字符串时，如果客户端发送过来的token字符串过期或不合法， 会产生一个解析失败的错误且影响项目的正常运行。我们可以通过express的错误中间件来捕获这个错误并进行相关处理，示例代码如下：

   ```js
   // 定义全局的错误处理中间件
   app.use((err, req, res, next) => {
     // token解析失败的错误
     if (err.name === "UnauthorizedError") {
       return res.send({
         status: 1,
         msg: "无效的token"
       })
     }
     res.send({
       status: 1,
       msg: "未知的错误"
     })
   })
   ```

   

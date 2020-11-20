## Node 第 7 天

### 1.  学习目标

◆ 完成登录功能的开发

◆ 能够获取用户的信息并重置密码和头像



### 2. 登录功能

#### 2.1 实现步骤

1.  检测表单数据是否合法
2.  根据用户名查询用户的数据
3.  判断用户输入的密码是否正确
4.  生成 `JWT` 的 `Token` 字符串



#### 2.2 检测表单数据是否合法

1.  将  `/router/user.js` 中  登录 的路由代码修改进行修改

   ```js
   // 注册新用户
   router.post('/reguser', expressJoi(reg_login_schema), userHandle.regUser)
   
   // 登录功能
   router.post('/login', expressJoi(reg_login_schema), userHandle.login)
   ```

   

#### 2.3 根据用户名查询用户的数据

1.  接收表单的数据

   ```js
   // 接收表单传递过来的数据
   const userInfo = req.body
   ```

   

2.  定义 `sql` 语句

   ```js
   // 定义 sql 语句
   const sql = `select * from ev_users where username=?`
   ```

   

3.  执行 `sql` 语句，查询用户的数据

   ```js
   // 执行 sql 语句，根据用户名查询用户的信息
   db.query(sql, userInfo.username, (err, results) => {
     // 指定 sql 失败
     if (err) return res.cc(err)
     // 执行 sql 语句成功，但是获取到的数据条数不等于 1
     if (results.length !== 1) return res.cc('登录失败')
     // 判断用户名和密码是否正确
     res.send('login Ok')
   })
   ```



4.  完整代码

   ```js
   // 登录的处理函数
   exports.login = (req, res) => {
     // 接收表单传递过来的数据
     const userInfo = req.body
     // 定义 sql 语句
     const sql = `select * from ev_users where username=?`
     // 执行 sql 语句，根据用户名查询用户的信息
     db.query(sql, userInfo.username, (err, results) => {
       // 指定 sql 失败
       if (err) return res.cc(err)
       // 执行 sql 语句成功，但是获取到的数据条数不等于 1
       if (results.length !== 1) return res.cc('登录失败')
       // 判断用户名和密码是否正确
       res.send('login Ok')
     })
   }
   
   ```





#### 2.4 判断用户输入的密码是否正确

> 核心实现思路：调用  `bcrypt.compareSync(用户提交的密码, 数据库中的密码)` 方法比较密码是否一致，
>
> 返回值是布尔值（true 一致、false 不一致）



1.  实现代码

   ```js
   // 判断用户名和密码是否正确
   // 将用户输入的密码和数据库中存储的密码进行比较
   const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
   // 根据对比后的结果进行判断
   if (!compareResult) return res.cc('登录失败！')
   ```



2. 完整代码

   ```js
   // 登录的处理函数
   exports.login = (req, res) => {
     // 接收表单传递过来的数据
     const userInfo = req.body
     // 定义 sql 语句
     const sql = `select * from ev_users where username=?`
     // 执行 sql 语句，根据用户名查询用户的信息
     db.query(sql, userInfo.username, (err, results) => {
       // 指定 sql 失败
       if (err) return res.cc(err)
       // 执行 sql 语句成功，但是获取到的数据条数不等于 1
       if (results.length !== 1) return res.cc('登录失败')
   
       // 判断用户名和密码是否正确
       // 将用户输入的密码和数据库中存储的密码进行比较
       const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
       // 根据对比后的结果进行判断
       if (!compareResult) return res.cc('登录失败！')
       res.send('login Ok')
       
     })
   }
   ```

   



#### 2.5 分析生成 `Token` 字符串的步骤

1.  通过 `ES6` 的高级语法，快速剔除  `密码` 和  `头像` 的值
2.  运行如下的命令，安装生成 `Token` 字符串的包
3.  在  `/router_handler/user.js` 模块的头部区域，导入  `jsonwebtoken` 包
4.  创建  `config.js` 文件，并向外共享 加密 和 还原 `Token` 的  `jwtSecretKey` 字符串
5.  将用户信息对象加密成 `Token` 字符串
6.  将生成的 `Token` 字符串响应给客户端





#### 2.6 生成 `JWT` 的 `Token` 步骤

1.  通过 `ES6` 的高级语法，快速剔除  `密码` 和  `头像` 的值

   ```js
   // 登录成功以后，给用户返回 token 值
   // 剔除 user 返回的 头像和密码 信息，
   const user = { ...results[0], password: '', user_pic: '' }
   ```

   

2.  运行如下的命令，安装生成 `Token` 字符串的包

   ```js
   cnpm i jsonwebtoken@8.5.1 -S
   ```

   

3.  在  `/router_handler/user.js` 模块的头部区域，导入  `jsonwebtoken` 包

   ```js
   // 生成 Token 字符串
   const jwt = require('jsonwebtoken')
   ```

   

4.  创建  `config.js` 文件，并向外共享 加密 和 还原 `Token` 的  `jwtSecretKey` 字符串

   ```js
   // 全局配置文件
   
   module.exports = {
     // 加密和解密的 Token 密钥
     jwtSecretKey: 'itheima No1. ^_^',
     expiresIn: '10h' // 设置 token 有效期为 10 小时
   }
   
   ```

   

5.  将用户信息对象加密成 `Token` 字符串

   ```js
   // 导入配置文件
   const config = require('../config')
   ```

   ```js
   // 生成 Token 字符串内容
   const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
   
   ```

   

6.  将生成的 `Token` 字符串响应给客户端

   ```js
   // 将生成的 Token 字符串响应给客户端
   res.send({
     status: 0,
     message: '登录成功！',
     // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
     token: 'Bearer ' + tokenStr,
   })
   ```



7.  完整代码

   ```js
   /**
    * 定义和用户相关的路由处理函数，功 /router/user.js 模块尽心调用
    */
   
   // 导入数据库操作模块
   const db = require('../db/index')
   const bcrypt = require('bcryptjs')
   // 生成 Token 字符串
   const jwt = require('jsonwebtoken')
   // 导入配置文件
   const config = require('../config')
   
   // 注册用户的处理函数
   exports.regUser = (req, res) => {}
   
   // 登录的处理函数
   exports.login = (req, res) => {
     // 接收表单传递过来的数据
     const userInfo = req.body
     // 定义 sql 语句
     const sql = `select * from ev_users where username=?`
     // 执行 sql 语句，根据用户名查询用户的信息
     db.query(sql, userInfo.username, (err, results) => {
       // 指定 sql 失败
       if (err) return res.cc(err)
       // 执行 sql 语句成功，但是获取到的数据条数不等于 1
       if (results.length !== 1) return res.cc('登录失败')
   
       // 判断用户名和密码是否正确
       // 将用户输入的密码和数据库中存储的密码进行比较
       const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
       // 根据对比后的结果进行判断
       if (!compareResult) return res.cc('登录失败！')
   
       // 登录成功以后，给用户返回 token 值
       // 剔除 user 返回的 头像和密码 信息，
       const user = { ...results[0], password: '', user_pic: '' }
   
       // 生成 Token 字符串内容
       const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
   
       // 将生成的 Token 字符串响应给客户端
       res.send({
         status: 0,
         message: '登录成功！',
         // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
         token: 'Bearer ' + tokenStr,
       })
     })
   }
   
   ```

   



#### 2.7 配置解析 `Token` 的中间件

1.  运行如下的命令，安装解析 `Token` 的中间件

   ```js
   cnpm i express-jwt@5.3.3 -S
   ```

   

2.  在  `app.js` 中注册路由之前，配置解析 `Token` 的中间件

   ```js
   // 导入全局的配置文件
   const config = require('./config')
   // 解析 token 的中间件
   const expressJWT = require('express-jwt')
   // 使用 .unless 方法指定哪些接口不需要进行 Token 的身份认证
   app.use(expressJWT({ secret: config.jwtSecretKey })).unless({ path: [/^\/api\//] })
   
   // 导入并注册用户路由模块
   const userRouter = require('./router/user')
   app.use('/api', userRouter)
   ```

   

3.  在  `app.js` 中的  错误级别中间件 里面，捕获并处理 `Token` 认证失败后的错误

   ```js
   // 错误中间件
   app.use((err, req, res, next) => {
     // 数据验证失败
     if (err instanceof joi.ValidationError) return res.cc(err)
       
     // 在身份认证失败后，捕获并处理 Token 认证失败后的错误
     if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
       
     // 未知错误
     res.cc(err)
   })
   ```

   

### 3. 获取用户的基本信息

#### 3.1 实现步骤

1.  初始化 路由 模块
2.  初始化 路由处理函数 模块
3.  获取用户的基本信息



#### 3.2 初始化路由模块

1.  创建  `/router/userinfo.js` 路由模块，并初始化如下的代码结构

   ```js
   // 导入 express
   const express = require('express')
   const { route } = require('./user')
   // 创建路由对象
   const router = express.Router()
   
   // 获取用户的基本信息
   router.get('/userinfo', (req, res) => {
     res.send('ok')
   })
   
   // 向外共享路由对象
   module.exports = router
   
   ```

   

2.  在  `app.js` 中导入并使用个人中心的路由模块

   ```js
   // 导入并注册用户路由模块
   const userRouter = require('./router/user')
   // 导入并使用用户信息的路由模块
   const userinfoRouter = require('./router/userinfo')
   
   app.use('/api', userRouter)
   app.use('/my', userinfoRouter)
   ```



#### 3.3 初始化 路由处理函数 模块

1.  创建  `/router_handler/userinfo.js` 路由处理函数模块，并初始化如下的代码结构

   ```js
   // 创建用户基本信息的处理函数
   exports.getUserInfo = (req, res) => {
     res.send('Ok')
   }
   
   ```

   

2.  修改  `/router/userinfo.js`  中的代码

   ```js
   // 导入 express
   const express = require('express')
   const { route } = require('./user')
   // 创建路由对象
   const router = express.Router()
   // 导入用户信息的处理函数模块
   const userinfo_handler = require('../router_handler/userinfo')
   
   // 获取用户的基本信息
   router.get('/userinfo', userinfo_handler.getUserInfo)
   
   // 向外共享路由对象
   module.exports = router
   
   ```





#### 3.4 获取用户的基本信息

1.  在  `/router_handler/userinfo.js` 头部导入数据库操作模块

   ```js
   // 导入数据库操作模块
   const db = require('../db/index')
   ```

   

2.  定义 `SQL` 语句

   ```js
   // 定义查询用户信息的 sql 语句
   const sql = `select id, username, nickname, email, user_pic from ev_users where id=?
   ```

   

3.  调用  `db.query()` 执行 `SQL` 语句

   ```js
   // 调用 db.query() 执行 sql 语句
   db.query(sql, req.user.id, (err, results) => {
     // 执行 sql 语句失败
     if (err) return res.cc(err)
   
     // 执行的 sql 语句成功，但是查询的结果可能为空
     if (results.length !== 1) return res.cc('获取用户信息失败！')
   
     // 用户信息获取成功
     res.send({
       status: 0,
       message: '获取用户基本信息成功！',
       data: results[0],
     })
   })
   ```

   

4.  完成代码

   ```js
   // 导入数据库操作模块
   const db = require('../db/index')
   
   // 创建用户基本信息的处理函数
   exports.getUserInfo = (req, res) => {
     // 定义查询用户信息的 sql 语句
     const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
   
     // 调用 db.query() 执行 sql 语句
     db.query(sql, req.user.id, (err, results) => {
       // 执行 sql 语句失败
       if (err) return res.cc(err)
   
       // 执行的 sql 语句成功，但是查询的结果可能为空
       if (results.length !== 1) return res.cc('获取用户信息失败！')
   
       // 用户信息获取成功
       res.send({
         status: 0,
         message: '获取用户基本信息成功！',
         data: results[0],
       })
     })
   }
   
   ```

   



### 4. 更新用户的基本信息

#### 4.1 实现步骤

1.  定义路由和处理函数
2.  验证表单数据
3.  实现更新用户基本信息的功能



#### 4.2 定义路由和处理函数

1.  在  `/router/userinfo.js` 模块中，新增  更新用户基本信息 的路由

   ```js
   // 更新用户的基本信息
   router.post('/userinfo', userinfo_handler.updateUserInfo)
   ```

   

2.  在  `/router_handler/userinfo.js` 模块中，定义并向外共享  更新用户基本信息 的路由处理函数

   ```js
   // 更新用户基本信息的处理函数
   exports.updateUserInfo = (req, res) => {
     res.send('Ok')
   }
   ```

   

#### 4.3 定义验证规则对象

1.  在  `/schema/user.js` 验证规则模块中，定义  `id` ， `nickname` ， `email` 的验证规则

   ```js
   // 定义 id, nickname, emial 的验证规则
   const id = joi.number().integer().min(1).required()
   const nickname = joi.string().required()
   const email = joi.string().email().required()
   ```

   

2.  并使用 `exports` 向外共享如下的  验证规则对象

   ```js
   // 更新用户基本信息的验证规则对象
   exports.update_userinfo_schema = {
     body: {
       id,
       nickname,
       email,
     }
   }
   ```



3.  完整代码

   ```js
   // /schema/user.js
   
   const joi = require('@hapi/joi')
   
   // 验证用户名、密码的规则
   const username = joi.string().alphanum().min(1).max(10).required()
   const password = joi.string().pattern(/^[\S]{6,12}$/).required()
   
   // 定义 id, nickname, emial 的验证规则
   const id = joi.number().integer().min(1).required()
   const nickname = joi.string().required()
   const email = joi.string().email().required()
   
   // 登录和注册表单的验证规则对象
   exports.reg_login_schema = {
     // 表示需要对 req.body 中的数据进行验证
     body: {
       username,
       password,
     }
   }
   
   // 更新用户基本信息的验证规则对象
   exports.update_userinfo_schema = {
     body: {
       id,
       nickname,
       email,
     }
   }
   
   ```

   



#### 4.4 验证数据规则的合法性

1.  在  `/router/userinfo.js` 模块中，导入验证数据合法性的中间件

   ```js
   // 导入验证数据合法性的中间件
   const expressJoi = require('@escook/express-joi')
   ```

   

2.  在 `/router/userinfo.js` 模块中，导入需要的验证规则对象

   ```js
   // 导入验证数据合法性的中间件
   const expressJoi = require('@escook/express-joi')
   // 导入需要的验证规则对象
   const { update_userinfo_schema } = require('../schema/user')
   ```

   

3.  在 `/router/userinfo.js` 模块中，修改  更新用户的基本信息 的路由如下

   ```js
   // 更新用户的基本信息
   router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
   
   ```



4.  完整代码

   ```js
   // /router/userinfo.js
   
   // 导入 express
   const express = require('express')
   const { route } = require('./user') 
   // 导入验证数据合法性的中间件
   const expressJoi = require('@escook/express-joi')
   // 导入需要的验证规则对象
   const { update_userinfo_schema } = require('../schema/user')
   
   // 创建路由对象
   const router = express.Router()
   // 导入用户信息的处理函数模块
   const userinfo_handler = require('../router_handler/userinfo')
   
   // 获取用户的基本信息
   router.get('/userinfo', userinfo_handler.getUserInfo)
   // 更新用户的基本信息
   router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
   
   // 向外共享路由对象
   module.exports = router
   
   ```

   



#### 4.4 实现更新用户基本信息的功能

1.  定义待执行的 `SQL` 语句

   ```js
   // 定义更新用户信息的 sql 语句
   const sql = `update ev_users set ? where id=?`
   
   ```

   

2.  调用 `db.query()` 执行 `SQL` 语句并传参

   ```js
   // 调用 db.query() 执行 sql 语句
   db.query(sql, [req.body, req.body.id], (err, results) => {
     // 执行 sql 语句失败
     if (err) return res.cc(err)
   
     // 执行 sql 语句成功，但影响函数不为 1、
     if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
   
     // 修改用户信息成功
     return res.cc('修改用户基本信息成功！', 0)
   })
   ```

   

3.  完整代码

   ```js
   // 更新用户基本信息的处理函数
   exports.updateUserInfo = (req, res) => {
     // 定义更新用户信息的 sql 语句
     const sql = `update ev_users set ? where id=?`
   
     // 调用 db.query() 执行 sql 语句
     db.query(sql, [req.body, req.body.id], (err, results) => {
       // 执行 sql 语句失败
       if (err) return res.cc(err)
   
       // 执行 sql 语句成功，但影响函数不为 1、
       if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
   
       // 修改用户信息成功
       return res.cc('修改用户基本信息成功！', 0)
     })
   }
   ```

   

### 5. 重置密码

#### 5.1 实现步骤

1.  定义路由和处理函数
2.  验证表单数据
3.  实现重置密码的功能



#### 5.2 定义路由和处理函数

1.  在 `/router/userinfo.js` 模块中，新增  重置密码 的路由

   ```js
   // 重置密码的路由
   router.post('/updatepwd', userinfo_handler.updatePassword)
   ```

   

2. 在  `/router_handler/userinfo.js` 模块中，定义并向外共享  重置密码 的路由处理函数

   ```js
   // 重置密码的处理函数
   exports.updatePassword = (req, res) => {
     res.send('ok')
   }
   ```



#### 5.3 验证数据表单

> 核心验证思路：旧密码与新密码，必须符合密码的验证规则，并且新密码不能与旧密码一致

1.  在  `/schema/user.js` 模块中，使用  `exports` 向外共享如下的  验证规则对象

   - `joi.ref('oldPwd')` 表示 `newPwd` 的值必须和 `oldPwd` 的值保持一致
   - `joi.not(joi.ref('oldPwd'))` 表示 `newPwd` 的值不能等于 `oldPwd` 的值
   - `.concat()` 用于合并 `joi.not(joi.ref('oldPwd'))` 和 `password` 这两条验证规则

   ```js
   // 重置密码验证规则对象
   exports.update_password_schema = {
     body: {
       oldPwd: password,
       newPwd: joi.not(joi.ref('oldPwd')).concat(password),
     }
   }
   
   ```

   

2.  在  `/router/userinfo.js` 模块中，导入需要的验证规则对象

   ```js
   // 导入需要的验证规则对象
   const { update_userinfo_schema, update_password_schema } = require('../schema/user')
   ```

   

3.  并在  重置密码的路由 中，使用  update_password_schema 规则验证表单的数据

   ```js
   // 重置密码的路由
   router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
   ```





#### 5.4  实现重置密码的功能

1.  根据  `id` 查询用户是否存在

   ```js
   // 重置密码的处理函数
   exports.updatePassword = (req, res) => {
     // 执行根据 id 查询用户数据的 SQL 语句
     const sql = `select * from ev_users where id=?`
   
     // 执行 SQL 语句查询用户是否存在
     db.query(sql, req.user.id, (err, results) => {
       // 执行 SQL 语句失败
       if (err) return res.cc(err)
   
       // 判断结果是否存在
       if (results.length !== 1) return res.cc('用户不存在！')
   
       // 判断用户输入的旧密码是否正确
       res.cc('ok')
     })
   }
   
   ```



#### 5.5 判断提交的 旧密码 是否正确

1.  在头部区域导入 `bcryptjs` 

   ```js
   const bcrypt = require('bcryptjs')
   ```

   

2.  使用 `bcrypt.compareSync(提交的密码，数据库中的密码)` 方法验证密码是否正确

   - `compareSync()` 函数的返回值为布尔值，`true` 表示密码正确，`false` 表示密码错误

   ```js
   // 判断用户输入的旧密码是否正确
   const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
   if (!compareResult) return res.cc('旧密码错误！')
   ```

   

3.  完整密码

   ```js
   // 重置密码的处理函数
   exports.updatePassword = (req, res) => {
     // 执行根据 id 查询用户数据的 SQL 语句
     const sql = `select * from ev_users where id=?`
   
     // 执行 SQL 语句查询用户是否存在
     db.query(sql, req.user.id, (err, results) => {
       // 执行 SQL 语句失败
       if (err) return res.cc(err)
   
       // 判断结果是否存在
       if (results.length !== 1) return res.cc('用户不存在！')
   
       // 判断用户输入的旧密码是否正确
       const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
       if (!compareResult) return res.cc('旧密码错误！')
   
       res.cc('ok')
     })
   }
   
   ```

   





#### 5.6 实现重置密码的功能

1.  定义更新用户密码的 `SQL` 语句

   ```js
   // 定义更新密码的 SQL 语句
   const sql = `update ev_users set password=? where id=?`
   ```

   

2.  对新密码进行加密处理

   ```js
   // 对新密码进行加密处理
   const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
   ```

   

3.  执行 `SQL` 语句

   ```js
   // 执行 SQL 语句，根据 id 更新用户的密码
   db.query(sql, [newPwd, req.user.id], (err, results) => {
     //语句执行失败
     if (err) return res.cc(err)
   
     // 语句执行成功，但是影响行数不等于 1
     if (results.affectedRows !== 1) return res.cc('更新密码失败！')
     
     // 更新密码成功
     res.cc('更新密码成功！', 0)
   })
   ```

   

4.  完整代码

   ```js
   // 重置密码的处理函数
   exports.updatePassword = (req, res) => {
     // 执行根据 id 查询用户数据的 SQL 语句
     const sql = `select * from ev_users where id=?`
   
     // 执行 SQL 语句查询用户是否存在
     db.query(sql, req.user.id, (err, results) => {
       // 执行 SQL 语句失败
       if (err) return res.cc(err)
   
       // 判断结果是否存在
       if (results.length !== 1) return res.cc('用户不存在！')
   
       // 判断用户输入的旧密码是否正确
       const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
       if (!compareResult) return res.cc('旧密码错误！')
   
       // 定义更新密码的 SQL 语句
       const sql = `update ev_users set password=? where id=?`
   
       // 对新密码进行加密处理
       const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
       
       // 执行 SQL 语句，根据 id 更新用户的密码
       db.query(sql, [newPwd, req.user.id], (err, results) => {
         //语句执行失败
         if (err) return res.cc(err)
   
         // 语句执行成功，但是影响行数不等于 1
         if (results.affectedRows !== 1) return res.cc('更新密码失败！')
         
         // 更新密码成功
         res.cc('更新密码成功！', 0)
       })
     })
   }
   
   ```

   

### 6.  更换头像

#### 6.1 实现步骤

1.  定义路由和处理函数
2.  验证表单数据
3.  实现更新用户头像的功能



#### 6.2 定义路由和处理函数

1.  在 `/router/userinfo.js` 模块中，新增  更新用户头像 的路由

   ```js
   // 更新用户头像的路由
   router.post('/update/avatar', userinfo_handler.updateAvatar)
   ```

   

2.  在  `/router_handler/userinfo.js` 模块中，定义并向外共享  更新用户头像 的路由处理函数

   ```js
   // 更新用户头像的处理函数
   exports.updateAvatar = (req, res) => {
    res.send('ok')
   }
   ```





#### 6.3 验证表单数据

1.  在 `/schema/user.js` 验证规则模块中，定义  avatar 的验证规则

   - `dataUri()` 指的是如下格式的字符串数据
   - `data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=`

   ```js
   // 验证头像数据
   const avatar = joi.string().dataUri().required()
   
   // 验证规则对象 - 更新头像
   exports.update_avatar_schema = {
     body: {
       avatar
     }
   }
   
   ```

   

2.  并使用 `exports` 向外共享如下的  验证规则对象

   ```js
   // 导入需要的验证规则对象
   const { update_avatar_schema } = require('../schema/user')
   
   // 更新用户头像的路由
   router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)
   ```





#### 6.4  实现更新用户头像的操作

1.  定义更新用户头像的 `SQL` 语句

   ```js
   const sql = 'update ev_users set user_pic=? where id=?'
   ```

   

2.  调用 `db.query()` 执行 `SQL` 语句，更新对应用户的头像

   ```js
   // 更新用户头像的处理函数
   exports.updateAvatar = (req, res) => {
     // 更新用户头像的 sql 字段
     const sql = 'update ev_users set user_pic=? where id=?'
   
     db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
       // SQL 语句失败
       if (err) return res.cc(err)
   
       // SQL 语句成功，但是影响行数不等于 1
       if (results.affectedRows !== 1) return res.cc('更新头像失败！')
   
       // 更新用户头像成功
       return res.cc('更新头像成功！', 0)
     })
   }
   
   ```

   


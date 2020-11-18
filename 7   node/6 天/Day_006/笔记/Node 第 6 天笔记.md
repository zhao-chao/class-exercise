## Node 第 6 天

### 1.  学习目标

◆ 前后端的身份认证

◆ 能够了解 Session 的实现原理

◆ 能够了解 JWT 的实现原理

◆ 大事件项目初始化

◆ 大事件注册新用户功能



### 2.  web 开发模式

#### 2.1  主流的两种开发模式

1.  基于**服务端渲染**的传统 Web 开发模式
2.  基于**前后端分离**的新型 Web 开发模式



#### 2.2 了解服务端渲染的概念以及优缺点

1.  服务端渲染的概念：服务器发送给客户端的 `HTML` 页面，是在**服务器通过字符串的拼接动态生成的**。因此，客户端不需要使用 Ajax 这样的技术额外请求页面的数据

   <img src="./images/Day_006/001 - 服务端渲染的 Web 开发模式.png" style="zoom:67%;" />

   

2.  服务端渲染的优点

   - **前端耗时少**。因为服务器端负责动态生成 HTML 内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电

   - **有利于SEO**。因为服务器端响应的是完整的 HTML 页面内容，所以爬虫更容易爬取获得信息，更有利于SEO

     

3. 服务端渲染的缺点

   - **占用服务器端资源**。即服务器端完成 HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力
   - **不利于前后端分离，开发效率低**。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发





#### 2.3 了解前后端分离的概念以及优缺点

1.  前后端分离的概念：前后端分离的开发模式，**依赖于 Ajax 技术的广泛应用**。简而言之，前后端分离的 Web 开发模式，就是**后端只负责提供 API 接口，前端使用 Ajax 调用接口**的开发模式

   

2.  前后端分离的优点

   - **开发体验好**。前端专注于 UI 页面的开发，后端专注于api 的开发，且前端有更多的选择性

   - **用户体验好**。Ajax 技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新

   - **减轻了服务器端的渲染压力**。因为页面最终是在每个用户的浏览器中生成的

     

3.  前后端分离的缺点

   - **不利于 SEO**。因为完整的 HTML 页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。（解决方案：利用 Vue、React 等前端框架的 **SSR** 技术能够很好的解决 SEO 问题！）



 

#### 2.4 如何选择 Web 开发模式

1.   **不谈业务场景而盲目选择使用何种开发模式都是耍流氓**

   - 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的 `SEO`，则这时我们就需要使用服务器端渲染

   - 而类似后台管理项目，交互性比较强，不需要考虑 `SEO`，那么就可以使用前后端分离的开发模式

     

2.  另外，具体使用何种开发模式并不是绝对的，为了**同时兼顾**了**首页的渲染速度**和**前后端分离的开发效率**，一些网站采用了首屏服务器端渲染 + 其他页面前后端分离的开发模式





### 3.  身份认证

#### 3.1  什么是身份认证

1.  身份认证，又称 ”身份验证“，”鉴权“，是指通过一定的手段，完成对用户身份的确认，例如：
   - 各大网站的手机验证码登录
   - 邮箱密码登录
   - 二维码登录



#### 3.2 为什么需要身份认证

1.  身份认证的目的，是为了**确认当前所声称为某种身份的用户，确实是所声称的用户**

   - 例如：你去找快递员取快递，你要怎么证明这份快递是你的

     

2.  不同开发模式下的身份认证

   - 对于**服务端渲染**和**前后端分离**这两种开发模式来说，分别有着不同的身份认证方案
     - **服务端渲染** 推荐使用 **Session 认证机制**
     - **前后端分离**推荐使用 **JWT 认证机制**





### 4.  session

#### 4.1 了解 HTTP 协议的无状态性

1. HTTP 协议的无状态性，指的是客户端的**每次 HTTP 请求都是独立的**，连续多个请求之间没有直接的关系，**服务器不会主动保留每次 HTTP 请求的状态**

   <img src="./images/Day_006/002 - http协议无状态性.png" style="zoom:67%;" />



#### 4.2 如何突破 HTTP 无状态的限制

1. 对于超市来说，为了方便收银员在进行结算时给 `VIP` 用户打折，超市可以为每个 `VIP` 用户发放会员卡

   <img src="./images/Day_006/003 - 突破 HTTP 无状态的限制.png" style="zoom:67%;" />

   
   
2. 注意：现实生活中的会员卡身份认证方式，在 `Web` 开发中的专业术语叫做 `Cookie`





#### 4.3 什么是 Cookie

1.  `Cookie` 是**存储在用户浏览器中的一段不超过 4 KB 的字符串**。它由一个**名称**（Name）、一个**值**（Value）和其它几个用于控制 Cookie **有效期**、**安全性**、**使用范围**的**可选属性**组成
2.  不同域名下的 Cookie 各自独立，每当客户端发起请求时，会**自动**把**当前域名下**所有**未过期的 Cookie** 一同发送到服务器
3.  `Cookie` 的几大特性
   - 自动发送
   - 域名独立
   - 过期时限
   - 4KB 限制



#### 4.4 Cookie 在身份认证中的作用

1.  客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 `Cookie`，客户端会自动将 `Cookie` 保存在浏览器中。

2.  随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 `Cookie`，通过请求头的形式发送给服务器，服务器即可验明客户端的身份

   <img src="./images/Day_006/004 - Cookie 在身份认证中的作用.png" style="zoom:67%;" />



#### 4.5  Cookie 不具有安全性

1. 由于 `Cookie` 是存储在浏览器中的，而且浏览器也提供了读写 `Cookie` 的 `API`，因此 `Cookie` 很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据通过 `Cookie` 的形式发送给浏览器

   

2.  **注意：千万不要使用 Cookie 存储重要且隐私的数据！** 比如用户的身份信息、密码等

   

<img src="./images/Day_006/005 - Cookie 不具有安全性.png" style="zoom:67%;" />





#### 4.6 提高身份认证的安全性

1.  为了防止客户伪造会员卡，收银员在拿到客户出示的会员卡之后，可以在收银机上进行刷卡认证。只有收银机确认存在的会员卡，才能被正常使用

   <img src="./images/Day_006/006 - 提高身份认证的安全性.png" style="zoom:67%;" />

   
   
2.  这种“会员卡 + 刷卡认证”的设计理念，就是 `Session` 认证机制的精髓



#### 4.7 Session 的工作原理

<img src="./images/Day_006/007 - Session 的工作原理.png" style="zoom:67%;" />





#### 4.8 安装并 express-session 中间件

1.  安装 `express-session`

   ```js
   cnpm i express-session --save
   ```

   

2.  配置 `express-session` 中间件

   - `express-session` 中间件安装成功后，需要通过 `app.use()` 来注册 `session` 中间件

     <img src="./images/Day_006/008 - 配置 express-session 中间件.png" style="zoom:67%;" />

     

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：请配置 Session 中间件
   const session = require('express-session')
   app.use(
     session({
       secret: 'itheima',
       resave: false,
       saveUninitialized: true,
     })
   )
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // 登录的 API 接口
   app.post('/api/login', (req, res) => {})
   
   // 获取用户姓名的接口
   app.get('/api/username', (req, res) => {})
   
   // 退出登录的接口
   app.post('/api/logout', (req, res) => {})
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```



#### 4.9  向 session 中存数据

1.  当 `express-session` 中间件配置成功后，即可通过 `req.session` 来访问和使用 `session` 对象，从而存储用户的关键信息

2.  示例

   <img src="./images/Day_006/009 - 向 session 中存数据.png" style="zoom:67%;" />

   
   
3. 案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：请配置 Session 中间件
   const session = require('express-session')
   app.use(
     session({
       secret: 'itheima',
       resave: false,
       saveUninitialized: true,
     })
   )
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // 登录的 API 接口
   app.post('/api/login', (req, res) => {
     // 判断用户提交的登录信息是否正确
     if (req.body.username !== 'admin' || req.body.password !== '000000') {
       return res.send({ status: 1, msg: '登录失败' })
     }
   
     // TODO_02：请将登录成功后的用户信息，保存到 Session 中
     // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
     req.session.user = req.body // 用户的信息
     req.session.islogin = true // 用户的登录状态
   
     res.send({ status: 0, msg: '登录成功' })
   })
   
   // 获取用户姓名的接口
   app.get('/api/username', (req, res) => { })
   
   // 退出登录的接口
   app.post('/api/logout', (req, res) => { })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 4.10 从 session 中取数据

1.  可以直接从 `req.session` 对象上获取之前存储的数据

2.  示例

   <img src="./images/Day_006/010 - 从 session 中取数据.png" style="zoom:67%;" />

   
   
3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：请配置 Session 中间件
   const session = require('express-session')
   app.use(
     session({
       secret: 'itheima',
       resave: false,
       saveUninitialized: true,
     })
   )
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // 登录的 API 接口
   app.post('/api/login', (req, res) => {
     // 判断用户提交的登录信息是否正确
     if (req.body.username !== 'admin' || req.body.password !== '000000') {
       return res.send({ status: 1, msg: '登录失败' })
     }
   
     // TODO_02：请将登录成功后的用户信息，保存到 Session 中
     // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
     req.session.user = req.body // 用户的信息
     req.session.islogin = true // 用户的登录状态
   
     res.send({ status: 0, msg: '登录成功' })
   })
   
   // 获取用户姓名的接口
   app.get('/api/username', (req, res) => {
     // TODO_03：请从 Session 中获取用户的名称，响应给客户端
     if (!req.session.islogin) {
       return res.send({ status: 1, msg: 'fail' })
     }
     res.send({
       status: 0,
       msg: 'success',
       username: req.session.user.username,
     })
   })
   
   // 退出登录的接口
   app.post('/api/logout', (req, res) => { })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 4.11 清空 session

1.  调用 `req.session.destroy()` 函数，即可清空服务器保存的 `session` 信息

2.  实例

   <img src="./images/Day_006/011 - 清空 session.png" style="zoom:67%;" />

   
   
3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：请配置 Session 中间件
   const session = require('express-session')
   app.use(
     session({
       secret: 'itheima',
       resave: false,
       saveUninitialized: true,
     })
   )
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // 登录的 API 接口
   app.post('/api/login', (req, res) => {
     // 判断用户提交的登录信息是否正确
     if (req.body.username !== 'admin' || req.body.password !== '000000') {
       return res.send({ status: 1, msg: '登录失败' })
     }
   
     // TODO_02：请将登录成功后的用户信息，保存到 Session 中
     // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
     req.session.user = req.body // 用户的信息
     req.session.islogin = true // 用户的登录状态
   
     res.send({ status: 0, msg: '登录成功' })
   })
   
   // 获取用户姓名的接口
   app.get('/api/username', (req, res) => {
     // TODO_03：请从 Session 中获取用户的名称，响应给客户端
     if (!req.session.islogin) {
       return res.send({ status: 1, msg: 'fail' })
     }
     res.send({
       status: 0,
       msg: 'success',
       username: req.session.user.username,
     })
   })
   
   // 退出登录的接口
   app.post('/api/logout', (req, res) => {
     // TODO_04：清空 Session 信息
     req.session.destroy()
     res.send({
       status: 0,
       msg: '退出登录成功',
     })
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 4.12 演示 session 案例效果

```html
<!-- index.html 页面 -->

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>后台主页</title>
  <script src="./jquery.js"></script>
</head>

<body>
  <h1>首页</h1>

  <button id="btnLogin">退出登录</button>

  <script>
    $(function () {
      // 初始化方法
      function init() {
        $.ajax({
          url: '/api/username',
          type: 'get',
          success: (data) => {
            // console.log(data)
            if (!data.status) {
              alert('欢迎登录：' + data.username)
            } else {
              alert('您尚未登录，请登录后在执行此操作！')
              window.location.href = '/login.html'
            }
          }
        })
      }
      init()

      // 退出登录
      $('#btnLogin').click(() => {
        $.ajax({
          url: '/api/logout',
          type: 'post',
          success: (data) => {
            if (!data.status) {
              alert(data.msg)
              window.location.href = '/login.html'
            }
          }
        })
      })

    })
  </script>
</body>

</html>
```

```html
<!-- login.html 页面 -->

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>登录页面</title>
  <script src="./jquery.js"></script>
</head>

<body>
  <!-- 登录表单 -->
  <form id="form1">
    <div>账号：<input type="text" name="username" autocomplete="off"> </div>
    <div>密码：<input type="password" name="password" autocomplete="off"></div>
    <button>登录</button>
  </form>

  <script>
    $(function () {
      $('button').click((e) => {
        // 阻止默认行为
        e.preventDefault()
        // 获取需要传递的参数
        const params = $('#form1').serialize()
        // 发送 ajax 
        $.ajax({
          url: '/api/login',
          type: 'post',
          data: params,
          success: (data) => {
            window.location.href = '/index.html'
          }
        })
      })
    })
  </script>
</body>

</html>
```



### 5.  jwt

#### 5.1  了解 Session 认证的局限性

1.  `Session` 认证机制需要配合 `Cookie` 才能实现。由于 `Cookie` 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 `Session` 认证
2.  注意：
   - 当前端请求后端接口**不存在跨域问题**的时候，**推荐使用 Session** 身份认证机制
   - 前端**需要跨域请求后端接口**的时候，不推荐使用 Session 身份认证机制，**推荐使用 JWT 认证机制**

3.  什么是 JWT
   - `JWT`（英文全称：`JSON Web Token`）是目前最流行的跨域认证解决方案





#### 5.2  JWT 的工作原理

1.  用户的信息通过 `Token` 字符串的形式，保存在客户端浏览器中
2.  服务器通过还原 `Token` 字符串的形式来认证用户的身份

<img src="./images/Day_006/012 - JWT 的工作原理.png" style="zoom:67%;" />





#### 5.3  JWT 的组成部分

1.  `JWT` 通常由三部分组成，分别是 `Header`（头部）、`Payload`（有效荷载）、`Signature`（签名）

2.  三者之间使用英文的“.”分隔，格式如下

   <img src="./images/Day_006/012 - JWT 的组成部分.png" style="zoom:67%;" />

   

3.  下面是 `JWT` 字符串的示例

   <img src="./images/Day_006/013 -  JWT 的组成部分.png" style="zoom:67%;" />



4.  `JWT` 的三个组成部分，从前到后分别是 `Header`、`Payload`、`Signature`

   - `Payload` 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串

   - `Header` 和 `Signature` 是安全性相关的部分，只是为了保证 `Token` 的安全性

     <img src="./images/Day_006/014 - JWT 的三个部分各自代表的含义.png" style="zoom:67%;" />





#### 5.4  JWT 的使用方式

1.  客户端收到服务器返回的 `JWT` 之后，通常会将它储存在 `localStorage` 或 `sessionStorage` 中

2.  此后，客户端每次与服务器通信，都要带上这个 `JWT` 的字符串，从而进行身份认证。推荐的做法是把` JWT` 放在 `HTTP` 请求头的 `Authorization` 字段中

   <img src="./images/Day_006/015 - JWT 的使用方式.png" style="zoom:67%;" />





#### 5.5 安装并导入 JWT 相关的包

##### 5.5.1 安装 JWT 相关的包

1.  运行如下命令，安装如下两个 JWT 相关的包

   ```js
   cnpm i jsonwebtoken express-jwt -S
   ```

   <img src="./images/Day_006/016 - 安装 JWT 相关的包.png" style="zoom:67%;" />

   

2.  其中

   - `jsonwebtoken` 用于生成 `JWT` 字符串
   - `express-jwt` 用于将 `JWT` 字符串解析还原成 `JSON` 对象



##### 5.5.2  导入 JWT 相关的包

1. 使用 `require()` 函数，分别导入 `JWT` 相关的两个包

   

2. 实例

   

   <img src="./images/Day_006/017 - 导入 JWT 相关的包.png" style="zoom:67%;" />

   

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
   const jwt = require('jsonwebtoken')
   const expressJWT = require('express-jwt')
   
   // 允许跨域资源共享
   const cors = require('cors')
   app.use(cors())
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 5.6  定义 secret 密钥

1.  为了保证 `JWT`字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 `secret` 密钥

   - 当生成 `JWT` 字符串的时候，需要使用 `secret` 密钥对用户信息进行加密，最终得到加密好的 JWT 字符串

   - 当把 `JWT` 字符串解析还原成 `JSON` 对象的时候，需要使用 `secret` 密钥进行解密

     

   <img src="./images/Day_006/018 - 定义 secret 密钥.png" style="zoom:67%;" />

2.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
   const jwt = require('jsonwebtoken')
   const expressJWT = require('express-jwt')
   
   // 允许跨域资源共享
   const cors = require('cors')
   app.use(cors())
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
   const secretKey = 'itheima No1 ^_^'
   
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 5.7  在登录成功后生成 JWT 字符串

1.  调用 `jsonwebtoken` 包提供的 `sign()` 方法，将用户的信息加密成 `JWT` 字符串，响应给客户端

2.  示例

   <img src="./images/Day_006/019 - 在登录成功后生成 JWT 字符串.png" style="zoom:67%;" />

   

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
   const jwt = require('jsonwebtoken')
   const expressJWT = require('express-jwt')
   
   // 允许跨域资源共享
   const cors = require('cors')
   app.use(cors())
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
   const secretKey = 'itheima No1 ^_^'
   
   // 登录接口
   app.post('/api/login', function (req, res) {
     // 将 req.body 请求体中的数据，转存为 userinfo 常量
     const userinfo = req.body
     // 登录失败
     if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
       return res.send({
         status: 400,
         message: '登录失败！',
       })
     }
     // 登录成功
     // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
     // 参数1：用户的信息对象
     // 参数2：加密的秘钥
     // 参数3：配置对象，可以配置当前 token 的有效期
     // 记住：千万不要把密码加密到 token 字符中
     const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
     res.send({
       status: 200,
       message: '登录成功！',
       token: tokenStr, // 要发送给客户端的 token 字符串
     })
   })
   
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 5.8  将 JWT 字符串还原为 JSON 对象

1.  客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 `Authorization` 字段，将 `Token` 字符串发送到服务器进行身份认证

2.  此时，服务器可以通过 `express-jwt` 这个中间件，自动将客户端发送过来的  `Token` 解析还原成 `JSON` 对象

3.  示例

   <img src="./images/Day_006/020 - 将 JWT 字符串还原为 JSON 对象.png" style="zoom:67%;" />

   

4.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
   const jwt = require('jsonwebtoken')
   const expressJWT = require('express-jwt')
   
   // 允许跨域资源共享
   const cors = require('cors')
   app.use(cors())
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
   const secretKey = 'itheima No1 ^_^'
   
   // TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
   // 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
   app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
   
   // 登录接口
   app.post('/api/login', function (req, res) {
     // 将 req.body 请求体中的数据，转存为 userinfo 常量
     const userinfo = req.body
     // 登录失败
     if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
       return res.send({
         status: 400,
         message: '登录失败！',
       })
     }
     // 登录成功
     // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
     // 参数1：用户的信息对象
     // 参数2：加密的秘钥
     // 参数3：配置对象，可以配置当前 token 的有效期
     // 记住：千万不要把密码加密到 token 字符中
     const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
     res.send({
       status: 200,
       message: '登录成功！',
       token: tokenStr, // 要发送给客户端的 token 字符串
     })
   })
   
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 5.9  使用 req.user 获取用户信息

1.  当 `express-jwt` 这个中间件配置成功之后，即可在那些有权限的接口中，使用 `req.user` 对象，来访问从 `JWT` 字符串中解析出来的用户信息了

2.  实例

   <img src="./images/Day_006/021 - 使用 req.user 获取用户信息.png" style="zoom:67%;" />

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
   const jwt = require('jsonwebtoken')
   const expressJWT = require('express-jwt')
   
   // 允许跨域资源共享
   const cors = require('cors')
   app.use(cors())
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
   const secretKey = 'itheima No1 ^_^'
   
   // TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
   // 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
   app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
   
   // 登录接口
   app.post('/api/login', function (req, res) {
     // 将 req.body 请求体中的数据，转存为 userinfo 常量
     const userinfo = req.body
     // 登录失败
     if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
       return res.send({
         status: 400,
         message: '登录失败！',
       })
     }
     // 登录成功
     // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
     // 参数1：用户的信息对象
     // 参数2：加密的秘钥
     // 参数3：配置对象，可以配置当前 token 的有效期
     // 记住：千万不要把密码加密到 token 字符中
     const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
     res.send({
       status: 200,
       message: '登录成功！',
       token: tokenStr, // 要发送给客户端的 token 字符串
     })
   })
   
   // 这是一个有权限的 API 接口
   app.get('/admin/getinfo', function (req, res) {
     // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
     console.log(req.user)
     res.send({
       status: 200,
       message: '获取用户信息成功！',
       data: req.user, // 要发送给客户端的用户信息
     })
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```





#### 5.10 捕获解析 JWT 失败后产生的错误

1.  当使用 `express-jwt` 解析 `Token` 字符串时，如果客户端发送过来的 `Token` 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行

2.  可以通过 `Express` 的错误中间件，捕获这个错误并进行相关的处理

3.  示例

   <img src="./images/Day_006/022 - 捕获解析 JWT 失败后产生的错误.png" style="zoom:67%;" />

   

4.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
   const jwt = require('jsonwebtoken')
   const expressJWT = require('express-jwt')
   
   // 允许跨域资源共享
   const cors = require('cors')
   app.use(cors())
   
   // 托管静态页面
   app.use(express.static('./pages'))
   // 解析 POST 提交过来的表单数据
   app.use(express.urlencoded({ extended: false }))
   
   // TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
   const secretKey = 'itheima No1 ^_^'
   
   // TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
   // 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
   app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
   
   // 登录接口
   app.post('/api/login', function (req, res) {
     // 将 req.body 请求体中的数据，转存为 userinfo 常量
     const userinfo = req.body
     // 登录失败
     if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
       return res.send({
         status: 400,
         message: '登录失败！',
       })
     }
     // 登录成功
     // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
     // 参数1：用户的信息对象
     // 参数2：加密的秘钥
     // 参数3：配置对象，可以配置当前 token 的有效期
     // 记住：千万不要把密码加密到 token 字符中
     const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
     res.send({
       status: 200,
       message: '登录成功！',
       token: tokenStr, // 要发送给客户端的 token 字符串
     })
   })
   
   // 这是一个有权限的 API 接口
   app.get('/admin/getinfo', function (req, res) {
     // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
     console.log(req.user)
     res.send({
       status: 200,
       message: '获取用户信息成功！',
       data: req.user, // 要发送给客户端的用户信息
     })
   })
   
   // TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
   app.use((err, req, res, next) => {
     // 这次错误是由 token 解析失败导致的
     if (err.name === 'UnauthorizedError') {
       return res.send({
         status: 401,
         message: '无效的token',
       })
     }
     res.send({
       status: 500,
       message: '未知的错误',
     })
   })
   
   // 调用 app.listen 方法，指定端口号并启动web服务器
   app.listen(80, function () {
     console.log('Express server running at http://127.0.0.1:80')
   })
   
   ```

   

### 6. 项目初始化

#### 6.1  项目概述

1.  [在线笔记与文档](http://www.escook.cn:8088/#/)
2. [需要完成的大事件功能](https://www.showdoc.cc/escook?page_id=3707158761215217)
3. 本地笔记与文档，在 `ppt` 文件夹中，`ev_api_server.pdf`



#### 6.2 创建项目

1.  新建  `api_server` 文件夹作为项目根目录，并在项目根目录中运行如下的命令，初始化包管理配置文件

   ```js
   npm init -y
   ```

   

2.  运行如下的命令，安装特定版本的  `express`

   ```js
   npm i express@4.17.1
   ```

   

3.  在项目根目录中新建  `app.js` 作为整个项目的入口文件，并初始化如下的代码

   ```js
   // 导入 express 模块
   const express = require('express')
   
   // 创建 express 的服务器实例
   const app = express()
   
   // 在此处进行功能开发
   
   // 指定端口并启动 web 服务器
   app.listen(8000, () => {
     console.log('api server running at http://127.0.0.1:8000')
   })
   
   ```



#### 6.3 配置 cors 跨域和解析表单数据的中间件

##### 6.3.1 配置 cors 跨域

1.  运行如下的命令，安装  `cors` 中间件

   ```js
   cnpm i cors@2.8.5 --save
   ```

   

2.  在  `app.js` 中导入并配置  `cors` 中间件

   ```js
   // 导入 express 模块
   const express = require('express')
   
   // 创建 express 的服务器实例
   const app = express()
   
   // 导入 cors 中间件
   const cors = require('cors')
   // 将 cors 注册为全局中间件
   app.use(cors)
   
   // 指定端口并启动 web 服务器
   app.listen(8000, () => {
     console.log('api server running at http://127.0.0.1:8000')
   })
   
   ```

   

##### 6.3.2 配置解析表单数据的中间件

1.  配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件

   ```js
   app.use(express.urlencoded({ extended: false }))
   ```

2.  完整代码

   ```js
   // 导入 express 模块
   const express = require('express')
   
   // 创建 express 的服务器实例
   const app = express()
   
   // 导入 cors 中间件
   const cors = require('cors')
   // 将 cors 注册为全局中间件
   app.use(cors)
   
   // 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
   app.use(express.urlencoded({ extended: false }))
   
   // 指定端口并启动 web 服务器
   app.listen(8000, () => {
     console.log('api server running at http://127.0.0.1:8000')
   })
   
   ```



#### 6.4 初始化路由相关的文件夹

1.  在项目根目录中，新建  `router` 文件夹，用来存放所有的 路由 模块

   - 路由模块中，只存放客户端的请求与处理函数之间的映射关系

     

2.  在项目根目录中，新建  `router_handler` 文件夹，用来存放所有的  路由处理函数模块

   - 路由处理函数模块中，专门负责存放每个路由对应的处理函数



#### 6.5 初始化用户路由模块

1.  在 `router` 文件夹中，新建 `user.js` 文件，作为用户的路由模块

   ```js
   // router --> user.js
   
   const express = require('express')
   // 创建路由对象
   const router = express.Router()
   
   // 注册新用户
   router.post('/reguser', (req, res) => {
     res.send('reguser Ok')
   })
   
   // 登录
   router.post('/login', (req, res) => {
     res.send('Login Ok')
   })
   
   // 将路由对象共享出去
   module.exports = router
   
   ```

   

2.  在  `app.js` 中，导入并使用  用户路由模块

   ```js
   // 导入 express 模块
   const express = require('express')
   
   // 创建 express 的服务器实例
   const app = express()
   
   // 导入 cors 中间件
   const cors = require('cors')
   // 将 cors 注册为全局中间件
   app.use(cors)
   
   // 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
   app.use(express.urlencoded({ extended: false }))
   
   // 导入并注册用户路由模块
   const userRouter = require('./router/user')
   app.use('/api', userRouter)
   
   // 指定端口并启动 web 服务器
   app.listen(8000, () => {
     console.log('api server running at http://127.0.0.1:8000')
   })
   
   ```

   

#### 6.6  抽离用户路由模块中的处理函数

>  目的：为了保证  **路由模块** 的纯粹性，所有的  **路由处理函数** ，必须抽离到对应的  **路由处理函数模块** 中



1.  在  `/router_handler/user.js` 中，使用  `exports` 对象，分别向外共享如下两个路由处理函数

   ```js
   /**
    * 定义和用户相关的路由处理函数，功 /router/user.js 模块尽心调用
    */
   
   // 注册用户的处理函数
   exports.regUser = (req, res) => {
     res.send('reguser Ok')
   }
   
   // 登录的处理函数
   exports.login = (req, res) => {
     res.send('login Ok')
   }
   
   ```

   

2.  将  `/router/user.js` 中的代码修改为如下结构

   ```js
   const express = require('express')
   // 创建路由对象
   const router = express.Router()
   
   // 导入用户路由处理函数模块
   const userHandle = require('../router_handler/user')
   
   // 注册新用户
   router.post('/reguser', userHandle.regUser)
   // 登录功能
   router.post('/login', userHandle.login)
   
   // 将路由对象共享出去
   module.exports = router
   
   ```





### 7.  注册新用户

#### 7.1 创建用户表

1.  在  `my_db_01` 数据库中，新建  `ev_users` 表

   <img src="./images/Day_006/023 - 创建用户表.png" style="zoom:80%;" />

   
   

#### 7.2 安装配置 mysql 模块

> 在 API 接口项目中，需要安装并配置  mysql 这个第三方模块，来连接和操作 MySQL 数据库



1.  安装 `mysql` 模块

   ```js
   npm i mysql@2.18.1
   ```

   

2.  在项目根目录中新建  `/db/index.js` 文件，在此自定义模块中创建数据库的连接对象

   ```js
   // 导入 mysql 模块
   const mysql = require('mysql')
   
   // 创建数据库连接对象
   const db = mysql.createPool({
     host: '127.0.0.1',
     user: 'root',
     password: 'admin123',
     database: 'my_db_01'
   })
   
   // 向外共享 db 数据库连接对象
   module.exports = db
   
   ```

   

#### 7.3 检测表单数据是否合法

##### 7.3.1 注册功能实现步骤

1.  检测表单数据是否合法
2.  检测用户名是否被占用
3.  对密码进行加密处理
4.  插入新用户



##### 7.3.2 检测表单数据是否合法

1.  判断用户名和密码是否为空

   ```js
   // 注册用户的处理函数
   exports.regUser = (req, res) => {
     // 获取到客户端提高到服务器的用户信息
     const userinfo = req.body
   
     // 对表单中的数据进行合法性校验
     if (!userinfo.username || !userinfo.password) {
       return res.send({ status: 1, message: '用户名和密码不正确' })
     }
     
     res.send('reguser Ok')
   }
   ```

   

#### 7.4 检测用户名是否合法

1.  导入数据库操作模块

   ```js
   // 导入数据库操作模块
   const db = require('../db/index')
   ```

   

2.  定义 SQL 语句

   ```js
     // 定义 sql 语句
     const sql = `select * from ev_users where username=?`
   ```

   

3.  执行 SQL 语句并根据结果判断用户名是否被占用

   ```js
   db.query(sql, userinfo.username, (err, results) => {
       // 执行 sql 语句失败
       if (err) {
         return res.send({ status: 1, message: err.message })
       }
   
       // 用户名被占用
       if (results.length > 0) {
         return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
       }
   
       // 用户名可用，继续后续流程
   })
   ```

   

4.  完整代码

   ```js
   // 导入数据库操作模块
   const db = require('../db/index')
   
   // 注册用户的处理函数
   exports.regUser = (req, res) => {
     // 获取到客户端提高到服务器的用户信息
     const userinfo = req.body
   
     // 对表单中的数据进行合法性校验
     if (!userinfo.username || !userinfo.password) {
       return res.send({ status: 1, message: '用户名和密码不正确' })
     }
   
     // 定义 sql 语句
     const sql = `select * from ev_users where username=?`
     // 执行 sql 语句并根据结果判断用户名是否被占用
     db.query(sql, userinfo.username, (err, results) => {
       // 执行 sql 语句失败
       if (err) {
         return res.send({ status: 1, message: err.message })
       }
   
       // 用户名被占用
       if (results.length > 0) {
         return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
       }
   
       // 用户名可用，继续后续流程
     })
   
     res.send('reguser Ok')
   }
   ```

   

#### 7.5 对密码进行加密处理

##### 7.5.1 什么需要对密码进行加密以及 bcryptjs 的优点

1.  为了保证密码的安全性，不建议在数据库以  **明文** 的形式保存用户密码，推荐对密码进行 **加密存储**
2.  在当前项目中，使用  `bcryptjs` 对用户密码进行加密，优点：
   - 加密之后的密码，无法被逆向破解
   - 同一明文密码多次加密，得到的加密结果各不相同，保证了安全性



##### 7.5.2 使用 bcryptjs 对密码进行加密

1.  安装指定版本的  `bcryptjs `

   ```js
   cnpm i bcryptjs@2.4.3 -S
   ```

   

2.  在  `/router_handler/user.js` 中，导入  `bcryptjs`

   ```js
   const bcrypt = require('bcryptjs')
   ```

   

3.  在注册用户的处理函数中，确认用户名可用之后，调用 `bcrypt.hashSync` (明文密码, 随机盐的长度) 方法，对用户的密码进行加密处理

   ```js
   // 注册用户的处理函数
   exports.regUser = (req, res) => {
     
      // coding……
       
     db.query(sqlStr, userinfo.username, (err, results) => {
       // 执行 sql 语句失败
       if (err) {
         return res.send({ status: 1, message: err.message })
       }
   
       // 用户名被占用
       if (results.length > 0) {
         return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
       }
   
       // 用户名可用，继续后续流程
       console.log(userinfo)
       // 对用户的密码，进行 bcrype 加密，返回值是加密以后的密码字符串
       userinfo.password = bcrypt.hashSync(userinfo.password, 10)
       console.log(userinfo)
       res.send('reguser Ok')
     })
   }
   ```

   

#### 7.6 插入新用户

1.  定义插入用户的 `SQL` 语句

   ```js
   const sql = 'insert into ev_users set ?'
   ```

   

2.  调用 `db.query()` 执行 `SQL` 语句，插入新用户

   ```js
   // 注册用户的处理函数
   exports.regUser = (req, res) => {
      
     // coding…… 
       
     // 执行 sql 语句并根据结果判断用户名是否被占用
     db.query(sqlStr, userinfo.username, (err, results) => {
       // 执行 sql 语句失败
       if (err) {
         return res.send({ status: 1, message: err.message })
       }
   
       // 用户名被占用
       if (results.length > 0) {
         return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
       }
   
       // 用户名可用，继续后续流程
       // 对用户的密码，进行 bcrype 加密，返回值是加密以后的密码字符串
       userinfo.password = bcrypt.hashSync(userinfo.password, 10)
   
       // 定义插入用户的 SQL 语句 
       const sql = 'insert into ev_users set ?'
   
       // 调用 db.query() 执行 SQL 语句
       db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
         // 判断 sql 语句是否执行成功
         if (err) return res.send({ status: 1, message: err.message })
         // 判断影响行数是否为 1
         if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
         // 注册成功
         res.send({ status: 0, message: '注册成功' })
       })
     })
   }
   ```

   



### 8.  优化

#### 8.1  优化 res.send() 代码

> 在处理函数中，需要多次调用 **res.send()** 向客户端响应  **处理失败** 的结果，为了简化代码，可以手动封装一个 res.cc() 函数

1.   在 `app.js`  中，所有路由之前，声明一个全局中间件，为 `res` 对象挂载一个 `res.cc()` 函数

   ```js
   // coding……
   
   // 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
   app.use(express.urlencoded({ extended: false }))
   
   // 在所有路由之前，封装 res.cc 函数
   app.use((req, res, next) => {
     // status 的默认值为 1，表示失败的情况
     // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
     res.cc = (err, status = 1) => {
       res.send({
         status,
         message: err instanceof Error ? err.message : err
       })
     }
   
     next()
   })
   
   // 导入并注册用户路由模块
   const userRouter = require('./router/user')
   app.use('/api', userRouter)
   
   // coding……
   ```

   

2.  将 `router_handle/user.js` 中的文件修改成 `res.cc` 的方式

   ```js
   /**
    * 定义和用户相关的路由处理函数，功 /router/user.js 模块尽心调用
    */
   
   // 导入数据库操作模块
   const db = require('../db/index')
   const bcrypt = require('bcryptjs')
   
   // 注册用户的处理函数
   exports.regUser = (req, res) => {
     // 获取到客户端提高到服务器的用户信息
     const userinfo = req.body
     console.log(userinfo.username)
   
     // 对表单中的数据进行合法性校验
     if (!userinfo.username || !userinfo.password) {
       return res.cc('用户名和密码不正确')
     }
   
     // 定义 sql 语句
     const sqlStr = 'select * from ev_users where username=?'
     // 执行 sql 语句并根据结果判断用户名是否被占用
     db.query(sqlStr, userinfo.username, (err, results) => {
       // 执行 sql 语句失败
       if (err) {
         return res.cc(err)
       }
   
       // 用户名被占用
       if (results.length > 0) {
         return res.cc('用户名被占用，请更换其他用户名')
       }
   
       // 用户名可用，继续后续流程
       // 对用户的密码，进行 bcrype 加密，返回值是加密以后的密码字符串
       userinfo.password = bcrypt.hashSync(userinfo.password, 10)
   
       // 定义插入用户的 SQL 语句 
       const sql = 'insert into ev_users set ?'
   
       // 调用 db.query() 执行 SQL 语句
       db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
         // 判断 sql 语句是否执行成功
         if (err) return res.cc(err)
         // 判断影响行数是否为 1
         if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
         // 注册成功
         res.send({ status: 0, message: '注册成功' })
       })
     })
   }
   
   // 登录的处理函数
   exports.login = (req, res) => {
     res.send('login Ok')
   }
   
   ```

   



#### 8.2  了解数据验证的原则

> 表单验证的原则：前端验证为辅，后端验证为主，后端永远不要相信前端提交过来的任何内容



1.  在实际开发中，前后端都需要对表单的数据进行合法性的验证，而且，**后端做为数据合法性校验的最后一个关口**，在拦截非法数据方面，起到了至关重要的作用
2.  单纯的使用  `if...else...` 的形式对数据合法性进行验证，效率低下、出错率高、维护性差。因此，
   推荐使用第三方数据验证模块，来降低出错率、提高验证的效率与可维护性，让后端程序员把更多的精
   力放在核心业务逻辑的处理上





#### 8.3 介绍如何定义验证规则对象

1.  安装 `@hapi/joi` 包，为表单中携带的每个数据项，定义验证规则

   ```js
   cnpm install @hapi/joi@17.1.0 -S
   ```

   

2.  安装 `@escook/express-joi` 中间件，来实现自动对表单数据进行验证的功能

   ```js
   cnpm i @escook/express-joi -S
   ```

   

3.  相关验证规则的含义

   ```js
   /**
   * string() 值必须是字符串
   * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
   * min(length) 最小长度
   * max(length) 最大长度
   * required() 值是必填项，不能为 undefined
   * pattern(正则表达式) 值必须符合正则表达式的规则
   */
   
   var getUsersSchema = {
     limit: expressJoi.Joi.types.Number().integer().min(1).max(25),
     offset: expressJoi.Joi.types.Number().integer().min(0).max(25),
     name: expressJoi.Joi.types.String().alphanum().min(2).max(25)
   }
   ```

   



#### 8.4 了解如何使用数验证的中间件

1.  在路由中使用局部中间件
2.  在局部中间件中通过 `expressJoi(userSchema)`  的方式调用中间件进行参数验证
3.  验证通过以后，将结果转交给后面的回调函数
4. 验证失败以后，就会报一个全局的错误，只需要在错误级别中间件捕获错误，然后做下一步处理





#### 8.5 定义验证规则模块

1.  新建  `/schema/user.js` 用户信息验证规则模块，并初始化代码

   ```js
   const joi = require('@hapi/joi')
   
   /**
   * string() 值必须是字符串
   * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
   * min(length) 最小长度
   * max(length) 最大长度
   * required() 值是必填项，不能为 undefined
   * pattern(正则表达式) 值必须符合正则表达式的规则
   */
   
   // 验证用户名、密码的规则
   const username = joi.string().alphanum().min(10).max(10).required()
   const passoword = joi.string().pattern(/^[\S]{6, 12}$/).required()
   
   // 登录和注册表单的验证规则对象
   exports.reg_login_schema = {
     // 表示需要对 req.body 中的数据进行验证
     body: {
       username,
       passoword
     }
   }
   
   ```

   



#### 8.6 实现对表单数据验证方式的改造

1.  将原始的 `if` 验证方式注释

   ```js
   // 对表单中的数据进行合法性校验
   // if (!userinfo.username || !userinfo.password) {
   //   // return res.send({ status: 1, message: '用户名和密码不正确' })
   //   return res.cc('用户名和密码不正确')
   // }
   
   ```

   

2.  在 `router.js` 中导入验证数据的中间件以及验证规则对象，在需要验证的路由中使用局部中间件添加校验规则

   ```js
   const express = require('express')
   // 创建路由对象
   const router = express.Router()
   
   // 导入用户路由处理函数模块
   const userHandle = require('../router_handler/user')
   
   // 1. 导入验证表单数据的中间件
   const expressJoi = require('@escook/express-joi')
   // 2. 导入需要的验证规则对象
   const { reg_login_schema } = require('../schema/user')
   
   // 注册新用户
   router.post('/reguser', expressJoi(reg_login_schema), userHandle.regUser)
   // 登录功能
   router.post('/login', userHandle.login)
   
   // 将路由对象共享出去
   module.exports = router
   
   ```

   

3.  验证可能会失败，所以在全局进行捕获

   ```js
   // 错误中间件
   app.use((err, req, res, next) => {
     // 数据验证失败
     if (err instanceof joi.ValidationError) return res.cc(err)
     // 未知错误
     res.cc(err)
   })
   
   ```

   










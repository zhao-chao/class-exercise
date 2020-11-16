## Node 第 5 天

### 1.  学习目标

◆ 能够知道如何配置 MySQL 数据库环境

◆ 能够认识并使用常见的 SQL 语句操作数据库

◆ 能够在项目中操作 MySQL 数据库



### 2. 数据库的基本概念

#### 2.1 什么是数据库

1.  数据库（database）是用来组织、存储和管理数据的仓库
2.  为了方便管理互联网世界中的数据，就有了数据库管理系统的概念（简称：数据库）。用户可以对数据库中的数据进行新增、查询、更新、删除等操作



#### 2.2 常见的数据库以及分类

1.  常见的数据库分类下面几种
   - `MySQL` 数据库（目前使用最广泛、流行度最高的开源免费数据库；`Community` + `Enterprise`）
   - `Oracle` 数据库（收费）
   - `SQL Server` 数据库（收费）
   - `Mongodb` 数据库 (`Community` + `Enterprise`)



 	2.  数据库分类
      - 传统数据库(关系型数据库或SQL数据库)
        - MySQL、Oracle、SQL Server，这三者的设计理念相同，用法比较类似
      - 新型数据库(非关系数据库或NoSQL数据库)
        - Mongodb，它在一定程度上弥补了传统型数据库的缺陷



#### 2.3 传统型数据库的数据组织结构

1.  在传统的类型的数据库中，数据的组织结构分为数据库(`database`)、数据表(`table`)、数据行(`row`)、字段(`field`) 这 4 大部分组成

   <img src="./images/Day_005/001 - 传统型数据库中的数据组织结构.png" style="zoom:67%;" />

2.  概念对象

   - **数据库**类似于 Excel 的**工作簿**
   - **数据表**类似于 Excel 的**工作表**
   - **数据行**类似于 Excel 的**每一行数据**
   - **字段类**似于 Excel 的**列**
   - 每个字段都有对应的数据类型



#### 2.4  实际开发中库、表、行、字段的关系

1.  在实际项目开发中，一般情况下，每个项目都对应独立的数据库
2.  不同的数据，要存储到数据库的不同表中，例如：用户数据存储到 users 表中，图书数据存储到 books 表中
3.  每个表中具体存储哪些信息，由字段来决定，例如：我们可以为 users 表设计 id、username、password 这 3 个字段
4.  表中的行，代表每一条具体的数据







### 3. 安装 MySQL

#### 3.1 了解需要安装哪些 `MySQL` 相关的软件

1.  对于开发人员来说，只需要安装 `MySQL Server` 和 `MySQL Workbench` 这两个软件，就能满足开发的需要了
   - `MySQL Server`：专门用来提供数据存储和服务的软件
   - `MySQL Workbench`：可视化的 `MySQL` 管理工具，通过它，可以方便的操作存储在 MySQL Server 中的数据



#### 3.2 `MySQL` 在 `Mac` 环境下的安装

1.  在 `Mac` 环境下安装 `MySQL` 的过程比 `Windows` 环境下的步骤简单很多
   -  先运行 `mysql-8.0.19-macos10.15-x86_64.dmg`这个安装包，将 `MySQL Server` 安装到 `Mac` 系统
   -  再运行 `mysql-workbench-community-8.0.19-macos-x86_64.dmg` 这个安装包，将可视化的 `MySQL Workbench` 工具安装到 `Mac` 系统
   - 具体的安装教程，可以参考 `素材 -> MySQL for Mac ->安装教程 - Mac系统安装MySql -> README.md`



#### 3.3 `MySQL` 在 `Windows` 环境下的安装

1.  在 `Windows` 环境下安装 `MySQL`，只需要运行 `mysql-installer-community-8.0.19.0.msi`  这个安装包，就能一次性将 `MySQL Server `和 `MySQL Workbench` 安装到自己的电脑上
2. 具体的安装教程，可以参考 `素材 -> MySQL for Windows ->安装教程 - Windows系统安装MySql -> README.md`





### 4. MySQL 的基本使用

#### 4.1 使用 `MySQL Workbench` 管理数据库

1.  点击 `window` 键，找到所有应用，找到安装的 `MySQL Workbench`，点击即可

2.  按照图示连接数据库

   <img src="./images/Day_005/002 - 连接数据库.png" style="zoom:67%;" />





#### 4.2 了解主界面的组成部分

1.  从上到下，从左到右依次是

   - 菜单栏
   - 工具栏
   - 数据库列表
   - 代码编辑区域
   - 信息区域
   - 输出区域

2.  图示组成部分以及如何设置界面

   <img src="./images/Day_005/003 - 了解主界面的组成部分.png" style="zoom:67%;" />





#### 4.3 创建数据库

1.  创建数据库的步骤

   - 点击创建库的按钮

   - 填写数据库的名称

   - 点击 `Apply` 按钮，创建数据库

2.  创建数据库图示

   <img src="./images/Day_005/004 - 创建数据库.png" style="zoom:67%;" />



#### 4.4 创建数据表

1.  点击 `Table` 表右键，出现弹框 `create Table` 即可创建数据表

2.  创建数据表图示

   <img src="./images/Day_005/0067 - 创建数据表.png" style="zoom: 80%;" />





#### 4.5 设计表的字段名称和数据类型

1.  根据图示设计字段名称

   <img src="./images/Day_005/0067 - 创建数据表.png" style="zoom: 80%;" />

   
   
   

2.  `DataType` 常见的数据类型：

   - `int` 整数
   - `varchar(len)` 字符串
   - `tinyint(1)`布尔值





#### 4.6  设置字段的特殊标识

1.  设置字段的特殊标识

   - `PK`（`Primary Key`）        --- 主键、唯一标识
   - `NN`（`Not Null`）              --- 值不允许为空
   - `UQ`（`Unique`）                  --- 值唯一
   - `AI`（`Auto Increment`）  --- 值自动增长

   

2.  根据图示设置字段的特殊标识

<img src="./images/Day_005/007 - 创建数据表.png" style="zoom: 80%;" />





#### 4.7  向表中写入数据

1.  按照图示想表中写入数据

   <img src="./images/Day_005/008 - 向表中写入数据.png" style="zoom:80%;" />







### 5.  SQL 语句

#### 5.1 什么是 SQL

1.  `SQL` 是 **结构化查询语言**，专门用来**访问和处理数据库的编程语言**。能够让我们以编程的形式，操作数据库里面的数据
2. 三个关键点：
   - `SQL` 是一门**数据库编程语言**
   - 使用 `SQL` 语言编写出来的代码，叫做 **SQL 语句**
   - `SQL` 语言只能在关系型数据库中使用（例如 `MySQL`、`Oracle`、`SQL Server`）。非关系型数据库（例如 `Mongodb`）不支持 `SQL` 语言



#### 5.2 SQL 能做什么

1.  从数据库中查询数据
2.  向数据库中插入新的数据
3.  更新数据库中的数据
4.  从数据库删除数据
5.  可以创建新数据库
6.  可在数据库中创建新表
7.  可在数据库中创建存储过程、视图



#### 5.3 SQL 的 SELECT 语句

##### 5.3.1 语法介绍

1.  `SELECT` 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。语法格式如下

<img src="./images/Day_005/009 - SELECT 语句.png" style="zoom: 67%;" />



2.  注意：**SQL 语句中的关键字对大小写不敏感**。`SELECT` 等效于 `select`，`FROM` 等效于 `from`

3.  注意：**在执行语句的时候，需要选择默认的数据库，双击选择指定的数据库即可**

   ```js
   select * from users LIMIT 0, 1000	Error Code: 1046. No database selected Select the default DB to be used by double-clicking its name in the SCHEMAS list in the sidebar.	0.000 sec
   ```

   



##### 5.3.2 演示两种  SELECT 语句

1.   查询所有列写法

   - 从 `users` 表中选取所有的列，可以使用符号 `*` 取代列的名称

     <img src="./images/Day_005/010 - 查询所有列写法.png" style="zoom:67%;" />

     
     
- 案例代码
   
  ```sql
     -- 通过 * 把 users 表中的所有的数据查询出来
     
     select * from users
     ```
   
  
   
2.  `SELECT 列名称` 示例

   -  如需获取名为 `username` 和 `password` 的列的内容（从名为 `users` 的数据库表），请使用下面的 SELECT 语句

     <img src="./images/Day_005/011 - select 列名称.png" style="zoom:67%;" />

     

   - 案例代码

     ```sql
     -- 多列之间，使用英文逗号进行分隔
     
     select username, password from users
     ```



#### 5.4 SQL 的 INSERT INTO 语句

1.  语法

   `INSERT INTO` 语句用于向数据表中插入新的数据行，语法格式如下:

   <img src="./images/Day_005/012 - INSERT INTO 语句.png" style="zoom:67%;" />

   

   

2.  案例代码

   - 注意：新的数据需要加上引号，否则会报错

   ```sql
   insert into users (username, password) values ('mz', '123456')
   ```

   



#### 5.5 SQL 的 UPDATE 语句

1.  语法

   `Update` 语句用于修改表中的数据。语法格式如下

   <img src="./images/Day_005/013 - SQL 的 UPDATE 语句.png" style="zoom:67%;" />

   

2. 案例代码

   - **多个被更新的列之间， 使用英文的逗号进行分隔**
   - **where 后面跟着的是更新的条件**
   - **注意： 初学者经常忘记提供更新的 where 条件，这样会导致整张表的数据都被更新，一定要慎重**

   ```sql
   update users set password=654321 where id=4
   ```

   ```sql
   update users set password=888888, status=1 where id=4
   ```





#### 5.6  SQL 的 DELETE 语句

1.  语法

   - DELETE 语句用于删除表中的行

   <img src="./images/Day_005/014 - DELETE 语句用于删除表中的行.png" style="zoom:67%;" />

   

2.  案例代码

   - **注意： 初学者经常忘记提供更新的 where 条件，这样会导致整张表的数据都被更新，一定要慎重**

   ```js
   delete from users where id=4
   ```



#### 5.7 WHERE 子句

1.  `WHERE` 子句用于限定选择的标准。在 `SELECT`、`UPDATE`、`DELETE` 语句中，皆可使用 `WHERE` 子句来限定选择的标准

   <img src="./images/Day_005/015 - WHERE 子句.png" style="zoom:80%;" />

   

2.  可在 `WHERE` 子句中使用的运算符

   - 注意：在某些版本的 `SQL` 中，操作符 `<>` 可以写为 `!=`

   <img src="./images/Day_005/016 - WHERE 子句.png" style="zoom:80%;" />

   

   

3.  可以通过 `WHERE` 子句来限定 `SELECT` 的查询条件

   ```sql
   -- 查询 id 为 1 的所有用户
   select * from users where id=1
   
   -- 查询 id 大于 2 的所有用户
   select * from users where id>2
   
   --查询 username 不等于 admin 的所有用户
   select * from users where username<>'zs'
   ```



#### 5.8 SQL 的 AND 和 OR 运算符

1.  `AND` 和 `OR` 可在 `WHERE` 子语句中把两个或多个条件结合起来

2.  `AND` 表示必须同时满足多个条件，相当于 `JavaScript` 中的 `&&` 运算符，例如 `if (a !== 10 && a !== 20)`

3.  `OR` 表示只要满足任意一个条件即可，相当于 `JavaScript` 中的 `||` 运算符，例如 `if(a !== 10 || a !== 20)`

4.  案例代码

   ```sql
   -- and
   -- 使用 AND 来显示所有 status 为 0，并且 id 小于 3 的用户
   
   select * from users where status=0 and id<3
   ```

   ```sql
   -- or
   -- 使用 OR 来显示所有 status 为 1，或者 username 为 zs 的用户
   
   select * from users where status=0 or username='zs'
   ```





#### 5.9 SQL 的 ORDER BY 子句

1.  语法

   - `ORDER BY` 语句用于根据指定的列对结果集进行排序
   - `ORDER BY` 语句默认按照升序对记录进行排序，`ASC` 关键字代表升序排序
   - 如果您希望按照降序对记录进行排序，可以使用 `DESC` 关键字

2.  `ORDER BY` 子句 - 升序排序

   对 `users` 表中的数据，按照 `status` 字段进行升序排序

   ```sql
   -- 下面这两条 SQL 语句是等价的，
   -- 因为 order by 默认进行升序排序
   -- 其中，ASC 关键字代表升序排序
   
   -- select * from users order by status
   select * from users order by status asc
   ```

   

3.  `ORDER BY` 子句 – 降序排序

   对 users 表中的数据，按照 id 字段进行降序排序

   ```sql
   -- desc 代表降序排序
   
   select * from users order by status desc
   ```





#### 5.10 ORDER BY 子句 – 多重排序

1.  对 `users` 表中的数据，先按照 `status` 字段进行降序排序，再按照 `username` 的字母顺序，进行升序排序

2.  案例代码

   ```sql
   select * from users order by status desc, username asc
   ```





#### 5.11 SQL 的 COUNT(*) 函数

1.  `COUNT(*)` 函数用于返回查询结果的总数据条数

   <img src="./images/Day_005/017-count.png" style="zoom:67%;" />

   
   
2.  案例语法

   ```sql
   select count(*) from users
   ```

   ```sql
   -- 查询 users 表中 status 为 0 的总数据条数
   
   select count(*) from users wheres status=0
   ```



#### 5.12 使用 AS 为列设置别名

如果希望给查询出来的列名称设置别名，可以使用 `AS` 关键字

```sql
-- 将列名从 count(*) 修改为 total

select count(*) as total from users where status=0
```

```sql
-- 将列名 username 改为 uname， password 改为 upwd

select username as uname, password as upwd from users
```



#### 5.13 保存和打开 sql 文件

1.  保存 `sql`文件

   <img src="./images/Day_005/018 - 保存sql文件.png" style="zoom: 67%;" />

   
   
2.  打开 `sql` 文件

   <img src="./images/Day_005/019- 打开sql文件.png" style="zoom: 67%;" />





### 6. MySQL 模块

#### 6.1 在项目中操作数据库的步骤

1. 安装操作 `MySQL` 数据库的第三方模块（`mysql`）

2.  通过 `mysql` 模块连接到 `MySQL` 数据库

3.  通过 `mysql` 模块执行 `SQL` 语句

   <img src="./images/Day_005/020 - 在项目中操作数据库的步骤.png" style="zoom:67%;" />



#### 6.2 安装与配置 mysql 模块

##### 6.2.1 安装 mysql 模块

`mysql` 模块是托管于 `npm` 上的第三方模块。它提供了在 `Node.js` 项目中连接和操作 `MySQL` 数据库的能力。想要在项目中使用它，需要先运行如下命令，将 `mysql` 安装为项目的依赖包

```js
cnpm i mysql -S
```



##### 6.2.2 配置 mysql 模块

在使用 `mysql` 模块操作 `MySQL` 数据库之前，必须**先对 `mysql `模块进行必要的配置**，主要的配置步骤如下

```js
// 1. 导入 mysql 模块
var mysql  = require('mysql')

// 2. 建立与 mysql 数据库的连接
var db = mysql.createPool({
  host: '127.0.0.1',  // 数据库的 ip 地址
  user: 'root', // 登录数据库的账号
  password: 'toor', // 登录数据库的密码
  database: 'my_db_01' // 指定要操作哪个数据库
})
```





#### 6.3 测试 mysql 模块能否正常工作

1.  调用 `db.query()` 函数，指定要执行的 `SQL` 语句，通过回调函数拿到执行的结果

2.  图示

   <img src="./images/Day_005/021-测试 mysql 模块能否正常工作.png" style="zoom:67%;" />

   
   
3.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 测试 mysql 模块能够正常运行
   db.query('select 1', (err, results) => {
     // mysql 模块如果错误，err 中会返回错误信息
     if (err) return console.log(err.message)
   
     // 能够成功的执行 SQL 语句
     console.log(results)
   })
   ```

   



#### 6.4 使用 select 语句查询数据

1.  需求：查询 users 表中所有的数据

2.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 3. 查询 users 表中所有的用户数据
   db.query('select * from users', (err, results) => {
     // 查询失败
     if (err) return console.log(err.message)
   
     // 查询成功
     console.log(results)
   })
   ```

   



#### 6.5 使用 insert into 语句插入数据

1.  需求： 向 `users` 表中新增数据， 其中 `username` 为 `Spider-Man`，`password` 为 `pcc321`

2.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 3. 声明要插入到 users 表中的数据对象
   const user = { username: 'tom', password: '123456' }
   // 4. 待执行的 sql 语句，其中英文的 ? 表示占位符
   const sqlstr = 'insert into users (username, password) values (?, ?)'
   
   // 5. 使用数组的形式，依次为 ？ 占位符指定具体的值
   db.query(sqlstr, [user.username, user.password] ,(err, results) => {
     // 插入失败
     if (err) return console.log(err.message)
   
     // 插入成功
     if (results.affectedRows === 1) { console.log('插入数据成功') }
   })
   ```

   



#### 6.6 id 的唯一性

1.  插入数据后，发现数据的 `id` 存在间隔
2.  之前存在，后来被删除了，那么在新增数据以后，即使这个 `id` 被删了，这个  `id` 也不会被占用



#### 6.7 插入数据的便捷方式

1.  向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据

2.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 3. 声明要插入到 users 表中的数据对象
   const user = { username: 'jerry', password: '123456' }
   // 4. 待执行的 sql 语句，其中英文的 ? 表示占位符
   const sqlstr = 'insert into users set ?'
   
   // 5. 使用数组的形式，依次为 ？ 占位符指定具体的值
   db.query(sqlstr, user ,(err, results) => {
     // 插入失败
     if (err) return console.log(err.message)
   
     // 插入成功
     if (results.affectedRows === 1) { console.log('插入数据成功') }
   })
   ```

   

#### 6.8 使用 update 语句更新数据

1.  需求：更新表中的数据

2.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 3. 声明要插入到 users 表中的数据对象
   const user = { id: 7, username: 'spike', password: '123000' }
   // 4. 待执行的 sql 语句
   const sqlstr = 'update users set username=?, password=? where id=?'
   
   // 5. 调用 db.query() 执行 SQL 语句的同时，使用数组依次为占位符指定具体的值
   db.query(sqlstr, [user.username, user.password, user.id] ,(err, results) => {
     // 更新失败
     if (err) return console.log(err.message)
   
     // 更新成功
     if (results.affectedRows === 1) { console.log('更新数据成功') }
   })
   ```



#### 6.9 更新数据的便捷方式

1.  更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速更新表数据

2.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 3. 声明要插入到 users 表中的数据对象
   const user = { id: 7, username: 'spike', password: '123000' }
   // 4. 待执行的 sql 语句
   const sqlstr = 'update users set ? where id=?'
   
   // 5. 调用 db.query() 执行 SQL 语句的同时，使用数组依次为占位符指定具体的值
   db.query(sqlstr, [user, user.id] ,(err, results) => {
     // 更新失败
     if (err) return console.log(err.message)
   
     // 更新成功
     if (results.affectedRows === 1) { console.log('更新数据成功') }
   })
   ```

   



#### 6.10 使用 delete 语句删除数据

1.  在删除数据时，推荐根据 `id` 这样的唯一标识，来删除对应的数据

2.  **注意：如果 sql 语句中有多个占位符，则必须使用数据为每个占位符指定具体的值，如果 sql 语句中只有一个占位符，则可以省略**

3.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 3. 要执行的 sql 语句
   const sqlstr = 'delete from users where id=?'
   
   // 2. 调用 db.query() 执行 SQL 语句的同时，为占位符指定具体的值
   // 注意：如果 sql 语句中有多个占位符，则必须使用数据为每个占位符指定具体的值
   // 如果 sql 语句中只有一个占位符，则可以省略
   db.query(sqlstr, 7 ,(err, results) => {
     // 删除失败
     if (err) return console.log(err.message)
   
     // 删除成功
     if (results.affectedRows === 1) { console.log('删除数据成功') }
   })
   ```

   





#### 6.11 标记删除

1.  使用 `DELETE` 语句，会把真正的把数据从表中删除掉

2. 为了保险起见，推荐使用**标记删除**的形式，来**模拟删除的动作**

   - 标记删除，就是在表中设置类似于 **status** 这样的**状态字段**，来**标记**当前这条数据是否被删除

3.  当用户执行了删除的动作时，我们并没有执行 `DELETE` 语句把数据删除掉，而是执行了 `UPDATE` 语句，将这条数据对应
   的 `status` 字段标记为删除即可

4.  案例代码

   ```js
   // 1. 导入 mysql 模块
   var mysql  = require('mysql')
   // 2. 建立与 mysql 数据库的连接
   var db = mysql.createPool({
     host: '127.0.0.1',  // 数据库的 ip 地址
     user: 'root', // 登录数据库的账号
     password: 'toor', // 登录数据库的密码
     database: 'my_db_01' // 指定要操作哪个数据库
   })
   
   // 3. 要执行的 sql 语句
   const sqlstr = 'update users set status=1 where id=?'
   
   // 2. 调用 db.query() 执行 SQL 语句的同时，为占位符指定具体的值
   db.query(sqlstr, 1 ,(err, results) => {
     // 删除失败
     if (err) return console.log(err.message)
   
     // 删除成功
     if (results.affectedRows === 1) { console.log('删除数据成功') }
   })
   ```

   
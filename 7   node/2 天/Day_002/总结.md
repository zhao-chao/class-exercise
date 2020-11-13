## 了解断言

```javascript
// 断言：断定符合/不符合某规则
const str = 'hello world';
/* // ?= 先行断言（零宽度正预测先行断言），零宽度：只匹配规则，不匹配内容
// ?= 必须是
const reg = /\w+(?=\s)/;

const result = reg.exec(str)[0];
console.log(result); */

// ?! 先行否定断言
// ?！不是
/* const reg = /\w+(?!\s)/;
const result = reg.exec(str)[0];
console.log(result); // hell */

// 后行断言
// ?<= 必须是
/* const reg = /(?<=\s)\w+/;
const result = reg.exec(str)[0];
console.log(result); // world */

// 后行否定断言
// ?<! 不是
const reg = /(?<!\s)\w+/;
const result = reg.exec(str)[0];
console.log(result); // hello
```

## 了解一下概念

HTTP 协议、Node HTTP 模块、服务器、DNS 服务器、IP、域名、端口号

## 创建 Web 服务器

```javascript
// Step1 导入 HTTP 模块
const http = require('http');

// Step2 根据 HTTP 模块创建服务器对象
const server = http.createServer();

// Step3 监听客户端的请求
server.on('request', (req, res) => {
    // 只要客户端有请求过来就会走这里
    // req 是一个请求对象
    // res 是一个响应对象
    res.end('hello world'); // 往客户端发送一个 'hello world'
});

// Step4 监听端口
server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'));
```

## 需要掌握的 req 和 res 相关的属性或方法

- req.url，请求地址

- req.method，请求方式

- res.setHeader('Content-Type', 'text/html; charset=utf8'); 可以设置响应头信息

- res.end()，响应内容

## 模块化

主要解决了两个问题

1. 命名冲突

2. 文件依赖关系不明确

```javascript
// calc.js
const a = 18;

// module.exports 是内置的对象
// module.exports.username = 'ifer';

const sum = (a, b) => a + b;

module.exports.sum = sum;
module.exports.a = a;
```

```javascript
// test.js
// 拿到的 calc 就是 calc.js 中的 module.exports 这个对象
const calc = require('./calc');

// 这里的 a 和 calc.js 中的 a 没有任何关系
const a = 8888;

const r = calc.sum(12, 1);
console.log(r); // 13

console.log(calc.a, a); // 18, 8888
```

```javascript
node test.js
```

**exports 是 module.exports 的一个引用，模块导出的结果最终以 module.exports 为准！**

```javascript
// 记住最佳实践
module.exports = {
    username: 'xxx',
    show: function() {}
};

exports.username = 'xxx';
exports.show = function() {};
```

## 提高包的下载速度

```bash
<!-- 下面操作不能很慢的话，手机连接自己的热点进行，记得把网线拔了 -->

npm i nrm -g // 全局安装 nrm，nrm 是管理包的镜像的一个命令行工具，注意这一步可能有点慢！

nrm -V // 检测 nrm 是否安装成功，如果出来版本号证明安装成功

nrm ls // 查看当前处于那个下载地址

nrm use taobao // 切换下载地址是淘宝服务器，重要！

nrm ls // 再次查看型号（*）是否处于 taobao 上

npm i moment // 随便下个包测试下，现在下载的 moment 就是从国内的 taobao 服务器上下载的啦~速度很快
```

- package-lock.json

锁定包的版本、提高下次下载包的下载速度
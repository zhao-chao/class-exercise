## Node 是什么

是基于 Chrome V8 引擎的 JS 运行环境

## 常见命令

```bash
进入到某个目录：cd 路径

返回上一层路径：cd ..

查看当前目录下文件：ls

清屏：ctrl + L 或者 cls 或者 clear

清除当前的命令行：esc

自动补全路径：tab

查看之前输入过的命令：上箭头
```

## 读取文件

```javascript
// fs(File System) 是系统（Node）内置的模块
const fs = require('fs');

// 路径、读取的编码、回调函数
fs.readFile('./test.txt', 'utf8', (err, data) => {
    // 如果说有错误，就输出错误信息，后面代码就不再走了
    // if (err !== null) return console.log('读取失败', err);
    if (err) return console.log('读取失败', err);
    // 走到这里说明没有错误，直接输出结果
    console.log(data);
});
```

## 写入文件

```javascript
// fs(File System) 是系统（Node）内置的模块
const fs = require('fs');

// 路径、写入的内容、回调函数
fs.writeFile('./test.txt', 'hello world', err => {
    // 如果说有错误，就输出错误信息，后面代码就不再走了
    if (err) return console.log('写入失败');
    // 走到这里说明没有错误，直接提示成功信息
    console.log('写入成功！');
});
```

## 成绩加工

```javascript
const fs = require('fs');

// 1. 读取文件
fs.readFile('./成绩.txt', 'utf8', (err, data) => {
    if (err) return console.log('读取失败', err);
    // 读取成功，data => '红=99 小白=100 小黄=70 小黑=66 小绿=88'
    // 2. 加工文件
    // console.log(data.replace(/=/g, ':')); // 红:99 小白:100 小黄:70 小黑:66 小绿:88
    // console.log(data.replace(/=/g, ':').replace(/\s/g, '\n'));
    const result = data.replace(/=/g, ':').replace(/\s/g, '\n');
    // 3. 写入文件
    fs.writeFile('./成绩-ok.txt', result, err => {
        if (err) return console.log('写入失败', err);
        console.log('写入成功！');
    });
});
```

## fs 读写文件时候的路径问题

读写文件时，写的相对路径是相对于`当前命令行的工作目录`，而非当前文件！

```javascript
const fs = require('fs');
const path = require('path');

// 先拼接成一个绝对路径
const absolutePath = path.join(__dirname, '成绩.txt');
// 这里就可以使用绝对路径了，好处是任何命令行目录下执行都不会出错
fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) return console.log('读取失败', err);
    console.log(data);
});
```

## 了解两个方法

- path.basename()，获取一串地址当中的文件名部分

- path.extname()，获取一串地址中的文件名后缀

## 最后一个案例要掌握的方法

- reg.test(str)，匹配

- reg.exec(str)，提取

- str.match(reg)，字符串也可以配置正则使用，提取

- str.replace(reg, 内容)，替换

```javascript
// 了解
const fs = require('fs');

function skill() {
    fs.writeFile('./test.txt', 'hello', {
        flag: 'a'
    }, err => {
        if (err) return console.log(err.message);
        console.log('写入成功');
        skill();
    });
}
skill();
```
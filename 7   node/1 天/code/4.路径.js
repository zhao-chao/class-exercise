const fs = require('fs')
const path = require('path')

// 使用 path.join() 做路径分割
fs.readFile(path.join(__dirname, 'files', '成绩.txt'), 'utf8', function (
	err,
	data
) {
	// 判断 err 对象是否为 null
	if (err) {
		return console.log('文件读取失败：', err.message)
	}

	console.log('文件读取成功，内容是：', data)
})

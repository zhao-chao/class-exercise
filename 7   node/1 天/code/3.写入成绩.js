const fs = require('fs')

fs.readFile(
	'C:\\Users\\赵超\\Desktop\\课堂练习\\7   node\\1 天\\code\\files\\成绩.txt',
	'utf8',
	function (err, dataStr) {
		if (err) {
			return console.log('打印失败')
		}

		const arrOld = dataStr.split(' ')
		const arrNew = []
		arrOld.forEach((item) => {
			arrNew.push(item.replace('=', ':'))
		})
		const newStr = arrNew.join('\r\n')
		fs.writeFile('./files/4.成绩ok121.txt', newStr, (err) => {
			if (err) return console.log('失败')
			console.log('成功')
		})
	}
)

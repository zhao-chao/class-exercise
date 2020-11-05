const fs = require('fs')

fs.writeFile('./files/2.txt', '112211', function (err) {
	if (err) {
		console.log('失败')
	}
})

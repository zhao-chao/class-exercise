const fs = require('fs')

fs.readFile('./files/1.txt', 'utf8', function (err, data) {
	console.log(err)
	console.log('------------------')
	console.log(data)
})
